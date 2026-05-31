// cloudfunctions/sendReminder/index.js
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  try {
    const now = new Date();
    // 计算3天后的日期
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    
    // 格式化日期为 YYYY-MM-DD
    const formatDate = (date) => {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      return `${y}-${m}-${d}`;
    };

    const targetDateStr = formatDate(threeDaysLater);

    // 查询即将到期的订阅 (简单示例：直接匹配 endDate 或 nextPaymentDate)
    // 注意：实际生产中，nextPaymentDate 可能需要服务端定时任务每天更新计算，或者在存储时就计算好所有未来的扣费日。
    // 这里简化逻辑：假设我们只检查 endDate (自定义周期) 或者假设有字段 nextPaymentDate 存储了下次扣费日。
    // 由于之前前端逻辑是实时计算 nextPaymentDate，云函数无法直接查询计算字段。
    // 临时方案：查询 endDate 匹配的（针对自定义周期），或 purchaseType='sub' 的所有记录拉出来遍历计算。
    // 为避免拉取量过大，这里演示查询 endDate <= 3天后且 >= 今天的记录。
    
    // 实际上，更稳妥的方式是：在每次保存/更新时，将 nextPaymentDate 存入数据库。
    // 但为了不破坏现有结构，我们先只处理 'custom' 周期且 endDate 明确的情况，
    // 或者遍历所有订阅制数据（数据量不大时可行）。
    
    // 这里采用遍历所有订阅制数据的方法 (适用于小规模用户)
    const { data: subscriptions } = await db.collection('subscriptions')
      .where({
        purchaseType: 'sub',
        isRemind: true // 仅针对开启提醒的
      })
      .get();

    const tasks = [];

    for (const item of subscriptions) {
      // 计算剩余天数逻辑 (复用前端逻辑的简化版)
      let nextPaymentDate = null;
      
      if (item.cycle === 'custom' && item.endDate) {
        nextPaymentDate = new Date(item.endDate);
      } else if (item.firstDate) {
        // 简单推算：基于 firstDate 和 cycle 推算下一个日期
        let tempDate = new Date(item.firstDate);
        // 如果 firstDate 已经是未来，则它就是下次扣费日
        if (tempDate > now) {
          nextPaymentDate = tempDate;
        } else {
           // 否则累加直到超过现在
           while (tempDate < now) {
            if (item.cycle === 'month') tempDate.setMonth(tempDate.getMonth() + 1);
            else if (item.cycle === 'quarter') tempDate.setMonth(tempDate.getMonth() + 3);
            else if (item.cycle === 'year') tempDate.setFullYear(tempDate.getFullYear() + 1);
            else if (item.cycle === 'week') tempDate.setDate(tempDate.getDate() + 7);
            else break;
          }
          nextPaymentDate = tempDate;
        }
      }

      if (!nextPaymentDate) continue;

      // 计算天数差
      const diffTime = nextPaymentDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 命中 3 天内且未过期 (>=0)
      if (diffDays >= 0 && diffDays <= 3) {
        const promise = cloud.openapi.subscribeMessage.send({
          touser: item._openid, // 用户的 openid
          templateId: 'oQ_WbG11JmLmLLHzX7jrkkfCq5p1TlFgP1S9pDDrHt4',
          page: 'pages/index/index',
          data: {
            thing1: { value: item.appName.slice(0, 20) }, // 限制长度
            amount2: { value: item.currency + item.price },
            time3: { value: formatDate(nextPaymentDate) } // 到期时间
            // 注意：thing1, amount2, time3 必须与微信后台模板变量名一致
          }
        }).catch(err => {
          console.error('发送失败', item._id, err);
        });
        tasks.push(promise);
      }
    }

    await Promise.all(tasks);
    return { success: true, sentCount: tasks.length };

  } catch (err) {
    console.error(err);
    return { success: false, error: err };
  }
};