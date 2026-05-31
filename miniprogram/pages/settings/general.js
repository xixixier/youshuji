// pages/settings/general.js
Page({
  data: {
    currencies: ['￥ (人民币)', '$ (美元)', '€ (欧元)', '£ (英镑)'],
    currencyIndex: 0,
    selectedCategory: '影音娱乐'
  },

  onLoad() {
    this.loadSettings();
  },

  vibrate() {
    wx.vibrateShort({ type: 'light' });
  },

  // 从本地存储读取设置
  loadSettings() {
    const symbol = wx.getStorageSync('currencySymbol') || '￥';
    const category = wx.getStorageSync('defaultCategory') || '影音娱乐';
    
    const symbolIndexMap = { '￥': 0, '$': 1, '€': 2, '£': 3 };
    const currencyIndex = symbolIndexMap[symbol] !== undefined ? symbolIndexMap[symbol] : 0;

    this.setData({
      currencyIndex,
      selectedCategory: category
    });
  },

  // 变更货币
  onCurrencyChange(e) {
    this.vibrate();
    this.setData({ currencyIndex: parseInt(e.detail.value) });
  },

  // 变更分类偏好
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.vibrate();
    this.setData({ selectedCategory: category });
  },

  // 清空本地缓存
  clearLocalSettings() {
    this.vibrate();
    wx.showModal({
      title: '确认清空',
      content: '这将清空所有本地偏好设置和缓存信息。注意：您的账单数据储存在微信云开发数据库中，不会受到影响。',
      confirmColor: '#D83B01',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          this.loadSettings();
          wx.showToast({
            title: '缓存已成功清除',
            icon: 'success'
          });
        }
      }
    });
  },

  // 保存设置到本地存储
  handleSave() {
    this.vibrate();
    
    const symbols = ['￥', '$', '€', '£'];
    const selectedSymbol = symbols[this.data.currencyIndex];
    
    wx.setStorageSync('currencySymbol', selectedSymbol);
    wx.setStorageSync('defaultCategory', this.data.selectedCategory);

    wx.showToast({
      title: '偏好设置已保存',
      icon: 'success'
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
