// pages/edit/edit.js
const dateUtils = require('../../utils/date.js');
const appLibrary = require('../../utils/appLibrary.js');
const db = require('../../utils/db.js');

Page({
  data: {
    // 账单记录编辑状态
    id: '', // 账单 ID
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
    brandColor: '',
    firstChar: '数',
    
    // 智能品牌库自动匹配徽标
    matchedBadge: null,
    iconSvg: '',
    iconPic: '',

    // 高保真分类图标渲染数组
    categoriesWithSvg: []
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id });
      this.fetchSubscription(options.id);
      this.loadUserCategories();
    } else {
      wx.showToast({ title: '账单标识错误', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
    }
  },

  // 震动反馈
  vibrate() {
    wx.vibrateShort({ type: 'light' });
  },

  // 核心工具：计算并刷新分类高保真 SVG 图标集 (支持动态反色选中)
  updateCategorySvgs(categories = this.data.categories, selected = this.data.selectedCategory) {
    const list = categories.map(cat => {
      const isActive = cat === selected;
      const svg = appLibrary.getCategoryIcon(cat, isActive);
      const iconBase64 = appLibrary.svgToBase64(svg);
      return {
        name: cat,
        iconPic: 'data:image/svg+xml;base64,' + iconBase64
      };
    });
    this.setData({
      categories,
      selectedCategory: selected,
      categoriesWithSvg: list
    });
  },

  // 动态加载用户已创建的所有独特分类 (采用高可靠降级数据库)
  loadUserCategories() {
    db.collection('subscriptions').get().then(res => {
      const savedCats = res.data.map(item => item.category).filter(Boolean);
      const uniqueCats = Array.from(new Set([...this.data.categories, ...savedCats]));
      this.updateCategorySvgs(uniqueCats, this.data.selectedCategory);
    }).catch(err => {
      console.warn('加载分类失败，使用默认列表:', err);
      this.updateCategorySvgs(this.data.categories, this.data.selectedCategory);
    });
  },

  // 获取账单单条数据详情
  fetchSubscription(id) {
    wx.showLoading({ title: '账单数据拉取中...' });
    
    db.collection('subscriptions').doc(id).get()
      .then(res => {
        const data = res.data;
        const cycleMap = ['week', 'month', 'quarter', 'year'];
        let cycleIndex = cycleMap.indexOf(data.cycle || 'month');
        if (cycleIndex === -1) cycleIndex = 1;
        
        // 匹配品牌
        const matched = appLibrary.matchApp(data.appName || '');
        const computedIcon = matched ? matched.iconSvg : appLibrary.generateFallbackSvg(data.appName || '', data.brandColor || '');
        const iconBase64 = appLibrary.svgToBase64(computedIcon);
        const iconPic = matched && matched.iconUrl ? matched.iconUrl : ('data:image/svg+xml;base64,' + iconBase64);
        
        this.setData({
          appName: data.appName || '',
          price: data.price ? Number(data.price) : '',
          cycleIndex: cycleIndex,
          firstDate: data.firstDate || '',
          purchaseType: data.purchaseType || 'sub',
          isRemind: data.isRemind !== false,
          remark: data.remark || '',
          brandColor: data.brandColor || '',
          firstChar: data.firstChar || '数',
          matchedBadge: matched,
          iconSvg: computedIcon,
          iconBase64: iconBase64,
          iconPic: iconPic
        });

        // 加载完成后刷新分类高保真 SVG 列表
        this.updateCategorySvgs(this.data.categories, data.category || '影音娱乐');
        wx.hideLoading();
      })
      .catch(err => {
        console.error('拉取账单详情失败:', err);
        wx.hideLoading();
        wx.showToast({ title: '数据拉取失败', icon: 'none' });
        setTimeout(() => wx.navigateBack(), 1500);
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
      const iconPic = matched.iconUrl ? matched.iconUrl : ('data:image/svg+xml;base64,' + appLibrary.svgToBase64(matched.iconSvg));
      this.setData({
        price: matched.defaultPrice,
        matchedBadge: matched,
        iconSvg: matched.iconSvg,
        iconBase64: appLibrary.svgToBase64(matched.iconSvg),
        iconPic: iconPic
      });
      // 自动切换至匹配到的分类，并刷新高亮
      this.updateCategorySvgs(list, matched.category);
    } else {
      const fallbackSvg = appLibrary.generateFallbackSvg(val, this.data.brandColor || '');
      const iconBase64 = appLibrary.svgToBase64(fallbackSvg);
      this.setData({
        matchedBadge: null,
        iconSvg: fallbackSvg,
        iconBase64: iconBase64,
        iconPic: 'data:image/svg+xml;base64,' + iconBase64
      });
      // 保持分类不变，仅刷新分类图标
      this.updateCategorySvgs(this.data.categories, this.data.selectedCategory);
    }
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.vibrate();
    this.updateCategorySvgs(this.data.categories, category);
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
            this.updateCategorySvgs(list, newCat);
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

  // 提交更新账单记录到云端（透明双轨防灾）
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
      wx.showToast({ title: '请选择首期扣款日', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '正在保存修改...' });

    const cycleMap = ['week', 'month', 'quarter', 'year'];
    const cycleCode = cycleMap[this.data.cycleIndex];
    
    // 如果是买断制，没有自动续款时间，下次付款日直接为首期扣款日即可
    const nextPaymentDate = this.data.purchaseType === 'sub' 
      ? dateUtils.calculateNextPaymentDate(this.data.firstDate, cycleCode)
      : this.data.firstDate;

    // 首字母提取
    let firstChar = this.data.firstChar || '数';
    if (this.data.matchedBadge) {
      firstChar = this.data.matchedBadge.initialChar;
    } else if (appName && (!this.data.firstChar || this.data.firstChar === '数')) {
      firstChar = appName.substring(0, 2);
    }
    
    const updateData = {
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
      brandColor: this.data.matchedBadge ? this.data.matchedBadge.brandColor : (this.data.brandColor || ''),
      firstChar: firstChar
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

  // 永久删除该账单记录（透明双轨防灾）
  handleDelete() {
    this.vibrate();
    wx.showModal({
      title: '永久删除账单',
      content: `您确定要永久删除 [${this.data.appName || '此笔订阅'}] 吗？此操作将无法撤回，所有账簿分析将自动重算。`,
      confirmColor: '#A64030', // 统一为高雅陶土红
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '账单移除中...' });
          
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
