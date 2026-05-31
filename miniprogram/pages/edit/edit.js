// pages/edit/edit.js
Page({
  data: {
    // 账单记录编辑状态
    id: '', // 账单 ID
    selectedCategory: '影音娱乐',
    appName: '',
    price: '',
    cycleIndex: 1,
    cycles: ['每周', '每月', '每季度', '每年'],
    firstDate: ''
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id });
      this.fetchSubscription(options.id);
    } else {
      wx.showToast({ title: '账单标识错误', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
    }
  },

  // 获取账单单条数据详情
  fetchSubscription(id) {
    wx.showLoading({ title: '账单数据拉取中...' });
    const db = wx.cloud.database();
    
    db.collection('subscriptions').doc(id).get()
      .then(res => {
        const data = res.data;
        const cycleMap = ['week', 'month', 'quarter', 'year'];
        let cycleIndex = cycleMap.indexOf(data.cycle || 'month');
        if (cycleIndex === -1) cycleIndex = 1;
        
        this.setData({
          selectedCategory: data.category || '影音娱乐',
          appName: data.appName || '',
          price: data.price ? Number(data.price) : '',
          cycleIndex: cycleIndex,
          firstDate: data.firstDate || ''
        });
        wx.hideLoading();
      })
      .catch(err => {
        console.error('拉取账单详情失败:', err);
        wx.hideLoading();
        wx.showToast({ title: '数据拉取失败', icon: 'none' });
        setTimeout(() => wx.navigateBack(), 1500);
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

  // 提交更新账单记录到云端
  handleUpdate() {
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
      wx.showToast({ title: '请选择起始扣费日期', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '正在保存修改...' });

    const db = wx.cloud.database();
    const cycleMap = ['week', 'month', 'quarter', 'year'];
    
    const updateData = {
      appName: appName,
      category: this.data.selectedCategory,
      price: price,
      currency: '￥',
      purchaseType: 'sub',
      cycle: cycleMap[this.data.cycleIndex],
      firstDate: this.data.firstDate,
      isRemind: true
    };

    db.collection('subscriptions').doc(this.data.id).update({
      data: updateData
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '账单修改已成功保存',
        icon: 'success'
      });
      
      // 成功延时回退并自动刷新上一页数据
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }).catch(err => {
      console.error('更新账单失败:', err);
      wx.hideLoading();
      wx.showToast({
        title: '保存失败，请重试',
        icon: 'none'
      });
    });
  },

  // 永久删除该账单记录
  handleDelete() {
    this.vibrate();
    wx.showModal({
      title: '永久删除账单',
      content: `您确定要永久删除 [${this.data.appName || '此笔订阅'}] 吗？此操作将无法撤回，所有账簿分析将自动重算。`,
      confirmColor: '#D83B01',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '账单移除中...' });
          const db = wx.cloud.database();
          
          db.collection('subscriptions').doc(this.data.id).remove()
            .then(() => {
              wx.hideLoading();
              wx.showToast({
                title: '账单记录已成功删除',
                icon: 'success'
              });
              
              // 成功延时回退并重载首页
              setTimeout(() => {
                wx.navigateBack();
              }, 1500);
            })
            .catch(err => {
              console.error('删除失败:', err);
              wx.hideLoading();
              wx.showToast({
                title: '删除失败，请重试',
                icon: 'none'
              });
            });
        }
      }
    });
  }
});
