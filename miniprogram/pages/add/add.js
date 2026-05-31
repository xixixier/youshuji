// pages/add/add.js
const dateUtils = require('../../utils/date.js');
const appLibrary = require('../../utils/appLibrary.js');

Page({
  data: {
    // 账单记录表单字段
    selectedCategory: '影音娱乐',
    categories: ['影音娱乐', '实用工具', '学习办公', '游戏', '其他'],
    appName: '',
    price: '',
    cycleIndex: 1,
    cycles: ['每周', '每月', '每季度', '每年'],
    firstDate: '',
    
    // 新增核心高级字段
    purchaseType: 'sub', // 'sub' 订阅制 | 'buyout' 买断制
    isRemind: true,      // 是否开启到期提醒
    remark: '',          // 备注说明
    
    // 智能品牌库自动匹配徽标
    matchedBadge: null
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

    this.loadUserCategories();
  },

  // 震动反馈
  vibrate() {
    wx.vibrateShort({ type: 'light' });
  },

  // 动态加载用户已创建的所有独特分类 (避免死板固化)
  loadUserCategories() {
    const db = wx.cloud.database();
    db.collection('subscriptions').get().then(res => {
      const savedCats = res.data.map(item => item.category).filter(Boolean);
      const uniqueCats = Array.from(new Set([...this.data.categories, ...savedCats]));
      this.setData({
        categories: uniqueCats
      });
    }).catch(err => {
      console.warn('加载分类失败，使用默认列表:', err);
    });
  },

  // 键盘输入服务名称事件：智能匹配官方应用库
  onAppNameInput(e) {
    const val = e.detail.value;
    this.setData({ appName: val });

    const matched = appLibrary.matchApp(val);
    if (matched) {
      this.vibrate();
      const list = this.data.categories;
      if (!list.includes(matched.category)) {
        list.push(matched.category);
      }
      this.setData({
        categories: list,
        selectedCategory: matched.category,
        price: matched.defaultPrice,
        matchedBadge: matched
      });
    } else {
      this.setData({
        matchedBadge: null
      });
    }
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.vibrate();
    this.setData({ selectedCategory: category });
  },

  // ➕ 新建分类对话框 (带输入框的 Modal)
  showNewCategoryInput() {
    this.vibrate();
    wx.showModal({
      title: '新建账单分类',
      editable: true,
      placeholderText: '请输入新分类的名称',
      success: (res) => {
        if (res.confirm && res.content) {
          const newCat = res.content.trim();
          if (newCat) {
            this.vibrate();
            const list = this.data.categories;
            if (!list.includes(newCat)) {
              list.push(newCat);
            }
            this.setData({
              categories: list,
              selectedCategory: newCat
            });
            wx.showToast({
              title: `分类 "${newCat}" 已选择`,
              icon: 'none'
            });
          }
        }
      }
    });
  },

  // 账单制式选择：订阅制 vs 买断制
  onPurchaseTypeChange(e) {
    const type = e.currentTarget.dataset.type;
    this.vibrate();
    this.setData({
      purchaseType: type
    });
  },

  // 到期自动提醒 Switch 开关
  onRemindToggle(e) {
    this.vibrate();
    this.setData({
      isRemind: e.detail.value
    });
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
      wx.showToast({ title: '请选择付款日', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '账单安全存入中...' });

    const db = wx.cloud.database();
    const cycleMap = ['week', 'month', 'quarter', 'year'];
    const cycleCode = cycleMap[this.data.cycleIndex];
    
    // 如果是买断制，没有自动续款时间，下次付款日直接为首期扣款日即可
    const nextPaymentDate = this.data.purchaseType === 'sub' 
      ? dateUtils.calculateNextPaymentDate(this.data.firstDate, cycleCode)
      : this.data.firstDate;
    
    // 首字母提取
    let firstChar = '数';
    if (this.data.matchedBadge) {
      firstChar = this.data.matchedBadge.initialChar;
    } else if (appName) {
      // 提取中文前两个字或英文前两个字母作为高保真标志
      firstChar = appName.substring(0, 2);
    }
    
    const saveData = {
      appName: appName,
      category: this.data.selectedCategory,
      price: price,
      currency: '￥',
      purchaseType: this.data.purchaseType,
      cycle: this.data.purchaseType === 'sub' ? cycleCode : 'custom',
      firstDate: this.data.firstDate,
      nextPaymentDate: nextPaymentDate,
      isRemind: this.data.isRemind,
      remark: this.data.remark.trim(),
      brandColor: this.data.matchedBadge ? this.data.matchedBadge.brandColor : '',
      firstChar: firstChar,
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
