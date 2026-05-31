/**
 * utils/date.js
 * 有数记账簿高精度日期与扣款周期计算组件
 */

/**
 * 根据起始扣费日和周期，计算出距离今天最近的当前或未来第一个扣费日
 * @param {string} firstDateStr - 首期扣款日期 (YYYY-MM-DD)
 * @param {string} cycle - 周期 ('week' | 'month' | 'quarter' | 'year')
 * @returns {string} - 下次扣款日期 (YYYY-MM-DD)
 */
function calculateNextPaymentDate(firstDateStr, cycle) {
  if (!firstDateStr) return '';
  
  const now = new Date();
  // 设为今日的 00:00:00，避免时分秒干扰对比
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  let tempDate = new Date(firstDateStr);
  if (isNaN(tempDate.getTime())) {
    // 容错兜底
    tempDate = new Date();
  }
  
  const tempDateZero = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());

  // 1. 如果扣费起始日就是在未来，则最近扣款日就是起始日本身
  if (tempDateZero >= today) {
    return formatDateString(tempDate);
  }
  
  // 2. 否则，基于首款日期不断累加周期，直到大于等于今天
  let safetyCount = 0; // 安全哨兵，防止死循环
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
      break; // custom 或未知周期不执行累加
    }
    // 更新零点比对日期
    tempDateZero.setTime(Date.UTC(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()));
    // 注意：JS Date setMonth/setDate 会自动进位
  }
  
  return formatDateString(tempDate);
}

/**
 * 格式化 Date 对象为 YYYY-MM-DD 字符串
 * @param {Date} date - 目标日期对象
 * @returns {string} - 格式化结果 (YYYY-MM-DD)
 */
function formatDateString(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

module.exports = {
  calculateNextPaymentDate,
  formatDateString
};
