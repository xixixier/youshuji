// pages/add/add.js
const dateUtils = require('../../utils/date.js');
const appLibrary = require('../../utils/appLibrary.js');
const db = require('../../utils/db.js');

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
    matchedBadge: null,
    iconSvg: '',
    iconPic: '',

    // 高保真矢量分类图标渲染数组
    categoriesWithSvg: []
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
      // 智能定位分类并刷新分类图标高亮
      this.updateCategorySvgs(list, matched.category);
    } else {
      const fallbackSvg = appLibrary.generateFallbackSvg(val, '');
      const iconBase64 = appLibrary.svgToBase64(fallbackSvg);
      this.setData({
        matchedBadge: null,
        iconSvg: fallbackSvg,
        iconBase64: iconBase64,
        iconPic: 'data:image/svg+xml;base64,' + iconBase64
      });
      // 仅重绘当前分类 SVG (保持选中不变)
      this.updateCategorySvgs(this.data.categories, this.data.selectedCategory);
    }
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.vibrate();
    this.updateCategorySvgs(this.data.categories, category);
  },

  // 🗑️ 删除自定义分类
  deleteCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.vibrate();
    
    const defaultCats = ['影音娱乐', '实用工具', '学习办公', '游戏', '其他'];
    if (defaultCats.includes(category)) {
      wx.showToast({
        title: '默认分类不可删除',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '删除自定义分类',
      content: `确定要删除分类 "${category}" 吗？删除后，所有使用该分类的账单都将自动归类到 "其他"。`,
      confirmColor: '#A64030', // 陶土红
      success: (res) => {
        if (res.confirm) {
          this.vibrate();
          
          // 1. 从列表中过滤移除
          const newList = this.data.categories.filter(c => c !== category);
          
          // 2. 如果删除的是当前选中的，切回 "其他"
          let selected = this.data.selectedCategory;
          if (selected === category) {
            selected = '其他';
          }
          
          // 3. 更新 UI
          this.updateCategorySvgs(newList, selected);

          // 4. 更新数据库关联的所有账单的分类为 "其他"
          wx.showLoading({ title: '正在清理关联账单...' });
          db.collection('subscriptions').get().then(subRes => {
            const matches = subRes.data.filter(sub => sub.category === category);
            if (matches.length === 0) {
              wx.hideLoading();
              wx.showToast({
                title: '分类已成功删除',
                icon: 'success'
              });
              return;
            }
            
            const updates = matches.map(sub => {
              return db.collection('subscriptions').doc(sub._id).update({
                data: { category: '其他' }
              });
            });
            
            Promise.all(updates).then(() => {
              wx.hideLoading();
              wx.showToast({
                title: '分类已删除，账单已重分类',
                icon: 'success'
              });
            }).catch(err => {
              console.error('更新账单分类关联失败:', err);
              wx.hideLoading();
              wx.showToast({
                title: '分类已删除，部分账单更新失败',
                icon: 'none'
              });
            });
          }).catch(err => {
            console.error('拉取账单以更新分类失败:', err);
            wx.hideLoading();
            wx.showToast({
              title: '分类已删除',
              icon: 'success'
            });
          });
        }
      }
    });
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

  // 提交并写入云开发数据库（透明双轨防灾）
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
      createdAt: new Date().toISOString()
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
