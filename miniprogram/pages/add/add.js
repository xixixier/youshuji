// pages/add/add.js
const dateUtils = require('../../utils/date.js');

Page({
  data: {
    // 账单记录表单字段
    selectedCategory: '影音娱乐',
    appName: '',
    price: '',
    cycleIndex: 1,
    cycles: ['每周', '每月', '每季度', '每年'],
    firstDate: ''
  },

  onLoad() {
    // 自动初始化下次扣款日期为今日 (标准易用性对齐)
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    this.setData({
      firstDate: todayStr
    });
  },

  // 震动反馈
  vibrate() {
    wx.vibrateShort({ type: 'light' });
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.vibrate();
    this.setData({ selectedCategory: category });
  },

  // 变更周期 Picker
  onCycleChange(e) {
    this.vibrate();
    this.setData({ cycleIndex: parseInt(e.detail.value) });
  },

  // 变更扣款起始日期 Picker
  onDateChange(e) {
    this.setData({ firstDate: e.detail.value });
  },

  // 提交并写入云开发数据库
  handleSave() {
    this.vibrate();
    
    const appName = this.data.appName.trim();
    const priceStr = this.data.price.toString().trim();
    const price = Number(priceStr);

    // 高精度表单输入完整性验证
    if (!appName) {
      wx.showToast({ title: '请输入账单服务名称', icon: 'none' });
      return;
    }
    if (!priceStr || isNaN(price) || price <= 0) {
      wx.showToast({ title: '请输入有效的金额', icon: 'none' });
      return;
    }
    if (!this.data.firstDate) {
      wx.showToast({ title: '请选择首期扣款日', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '账单安全存入中...' });

    const db = wx.cloud.database();
    const cycleMap = ['week', 'month', 'quarter', 'year'];
    const cycleCode = cycleMap[this.data.cycleIndex];
    const nextPaymentDate = dateUtils.calculateNextPaymentDate(this.data.firstDate, cycleCode);
    
    const saveData = {
      appName: appName,
      category: this.data.selectedCategory,
      price: price,
      currency: '￥',
      purchaseType: 'sub', // 默认为定期订阅制
      cycle: cycleCode,
      firstDate: this.data.firstDate,
      nextPaymentDate: nextPaymentDate,
      isRemind: true, // 默认开启提醒
      createdAt: db.serverDate()
    };

    db.collection('subscriptions').add({
      data: saveData
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '账单已成功入账',
        icon: 'success'
      });
      
      // 成功延时回退并自动重载首页列表
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }).catch(err => {
      console.error('账单保存失败:', err);
      wx.hideLoading();
      wx.showToast({
        title: '入账失败，请重试',
        icon: 'none'
      });
    });
  }
});
