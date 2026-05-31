// cloudfunctions/sendReminder/index.js
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

// 格式化日期为 YYYY-MM-DD
const formatDate = (date) => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// 计算下次扣款日期 (对齐客户端 date.js 算法逻辑)
const calculateNextPaymentDate = (firstDateStr, cycle) => {
  if (!firstDateStr) return '';
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let tempDate = new Date(firstDateStr);
  if (isNaN(tempDate.getTime())) {
    tempDate = new Date();
  }
  const tempDateZero = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());

  if (tempDateZero >= today) {
    return formatDate(tempDate);
  }

  let safetyCount = 0;
  while (tempDateZero < today && safetyCount < 1000) {
    safetyCount++;
    if (cycle === 'week') {
      tempDate.setDate(tempDate.getDate() + 7);
    } else if (cycle === 'month') {
      tempDate.setMonth(tempDate.getMonth() + 1);
    } else if (cycle === 'quarter') {
      tempDate.setMonth(tempDate.getMonth() + 3);
    } else if (cycle === 'year') {
      tempDate.setFullYear(tempDate.getFullYear() + 1);
    } else {
      break;
    }
    tempDateZero.setTime(Date.UTC(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()));
  }
  return formatDate(tempDate);
};

exports.main = async (event, context) => {
  try {
    const now = new Date();
    const todayStr = formatDate(now);
    
    // 计算 3 天后的扣款截止目标日期
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const targetDateStr = formatDate(threeDaysLater);

    console.log(`Starting scheduled checker. Range: [${todayStr} ~ ${targetDateStr}]`);

    // 1. 高性能查询：直通索引，查找 nextPaymentDate 在扣款提醒区间内的记录
    const { data: directMatches } = await db.collection('subscriptions')
      .where({
        purchaseType: 'sub',
        isRemind: true,
        nextPaymentDate: _.gte(todayStr).and(_.lte(targetDateStr))
      })
      .get();

    console.log(`Direct nextPaymentDate query hits: ${directMatches.length}`);

    // 2. 兼容性查询（懒迁移）：针对历史未存入该字段的旧记录
    const { data: legacyRecords } = await db.collection('subscriptions')
      .where({
        purchaseType: 'sub',
        isRemind: true,
        nextPaymentDate: _.exists(false)
      })
      .get();

    console.log(`Legacy records to scan & lazy-migrate: ${legacyRecords.length}`);

    const allMatchedSubscriptions = [...directMatches];
    const migrationPromises = [];

    // 处理未迁移的历史账单
    for (const item of legacyRecords) {
      if (item.firstDate && item.cycle) {
        const nextPaymentDate = calculateNextPaymentDate(item.firstDate, item.cycle);
        
        if (nextPaymentDate) {
          // 异步写回数据库，持久化补齐字段，下次巡检将直接命中直达索引！
          const updatePromise = db.collection('subscriptions').doc(item._id).update({
            data: { nextPaymentDate: nextPaymentDate }
          }).then(() => {
            console.log(`Lazy-migrated subscription ${item._id} with nextPaymentDate: ${nextPaymentDate}`);
          }).catch(err => {
            console.error(`Failed to lazy-migrate subscription ${item._id}:`, err);
          });
          migrationPromises.push(updatePromise);

          // 比对是否属于 3 天内的提醒区间
          if (nextPaymentDate >= todayStr && nextPaymentDate <= targetDateStr) {
            allMatchedSubscriptions.push({
              ...item,
              nextPaymentDate: nextPaymentDate
            });
          }
        }
      }
    }

    // 并行执行老数据回写
    if (migrationPromises.length > 0) {
      await Promise.all(migrationPromises);
    }

    console.log(`Total matched subscriptions for reminders: ${allMatchedSubscriptions.length}`);

    const tasks = [];

    // 巡检发送消息模板
    for (const item of allMatchedSubscriptions) {
      // 提取用户的 openid，若记录未绑定 openid 则从上下文中获取兜底
      const openid = item._openid || (context.userInfo ? context.userInfo.openId : null);
      if (!openid) {
        console.warn(`Skipping message for ${item._id} due to missing OpenID`);
        continue;
      }

      const nextPayDate = item.nextPaymentDate || item.firstDate;

      const promise = cloud.openapi.subscribeMessage.send({
        touser: openid,
        templateId: 'oQ_WbG11JmLmLLHzX7jrkkfCq5p1TlFgP1S9pDDrHt4',
        page: 'pages/index/index',
        data: {
          thing1: { value: item.appName.slice(0, 20) }, // 限制20字以内
          amount2: { value: item.currency + Number(item.price).toFixed(2) },
          time3: { value: nextPayDate }
        }
      }).then(res => {
        console.log(`Successfully sent reminder message to user ${openid} for bill ${item._id}`);
        return { success: true };
      }).catch(err => {
        console.error(`Failed to send message to user ${openid} for bill ${item._id}:`, err);
        return { success: false, error: err };
      });
      tasks.push(promise);
    }

    const results = await Promise.all(tasks);
    const successCount = results.filter(r => r.success).length;

    return {
      success: true,
      scannedLegacyCount: legacyRecords.length,
      matchedCount: allMatchedSubscriptions.length,
      sentSuccessCount: successCount
    };

  } catch (err) {
    console.error('sendReminder execution failed with critical error:', err);
    return { success: false, error: err };
  }
};