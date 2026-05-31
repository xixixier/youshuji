// pages/settings/general.js
const appLibrary = require('../../utils/appLibrary.js');

Page({
  data: {
    currencies: ['￥ (人民币)', '$ (美元)', '€ (欧元)', '£ (英镑)'],
    currencyIndex: 0,
    selectedCategory: '影音娱乐',
    categories: ['影音娱乐', '实用工具', '学习办公', '游戏', '其他'],
    categoriesWithSvg: []
  },

  onLoad() {
    this.loadSettings();
  },

  vibrate() {
    wx.vibrateShort({ type: 'light' });
  },

  // 核心微调：计算并更新分类 SVG 图标流式状态
  updateCategorySvgs(selected = this.data.selectedCategory) {
    const list = this.data.categories.map(cat => {
      const isActive = cat === selected;
      const svg = appLibrary.getCategoryIcon(cat, isActive);
      const iconBase64 = appLibrary.svgToBase64(svg);
      return {
        name: cat,
        iconPic: 'data:image/svg+xml;base64,' + iconBase64
      };
    });
    this.setData({
      selectedCategory: selected,
      categoriesWithSvg: list
    });
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
    
    this.updateCategorySvgs(category);
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
    this.updateCategorySvgs(category);
  },

  // 清空本地缓存
  clearLocalSettings() {
    this.vibrate();
    wx.showModal({
      title: '确认清空',
      content: '这将清空所有本地账单数据、偏好设置和缓存信息。注意：此操作将重置您的所有数据，是否继续？',
      confirmColor: '#A64030', // 陶土红
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
