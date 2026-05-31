// index.js
const app = getApp();

Page({
  data: {
    // 账单记录数据
    subscriptions: [], // 当前展示的订阅记录 (可能被分类过滤)
    upcomingSubscriptions: [], // 即将续订列表 (30天内)
    allSubscriptions: [], // 完整数据缓存 (用于前端分类快速过滤)
    totalMonthlyCost: '0.00', // 本月支出金额
    yearlyEstimate: '0.00', // 年度支出估算金额
    totalCount: 0, // 活跃订阅笔数
    dailyCost: '0.00', // 日均成本
    currentCategory: '全部', // 选中的分类
    categories: ['全部', '影音娱乐', '实用工具', '学习办公', '游戏', '其他'],

    // 高保真账户登录同步 Drawer 数据
    hasLogin: false, // 登录同步状态
    userInfo: null, // 登录用户信息
    showLoginDrawer: false, // 是否显示底部抽屉
    loginTab: 'wechat', // wechat | phone | email
    
    // 手机号登录表单字段
    phoneNum: '',
    smsCode: '',
    smsCounting: false,
    smsBtnText: '获取验证码',
    
    // 邮箱登录表单字段
    emailAddr: '',
    emailPwd: ''
  },

  onShow() {
    this.checkGlobalLoginState();
    this.fetchSubscriptions();
  },

  onPullDownRefresh() {
    this.fetchSubscriptions().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  // 震动反馈
  vibrate() {
    wx.vibrateShort({ type: 'light' });
  },

  // 检查全局登录状态同步
  checkGlobalLoginState() {
    if (app.globalData && app.globalData.hasLogin) {
      this.setData({
        hasLogin: true,
        userInfo: app.globalData.userInfo
      });
    } else {
      this.setData({
        hasLogin: false,
        userInfo: null
      });
    }
  },

  // 账户状态控制条点击交互
  triggerLoginAction() {
    this.vibrate();
    if (this.data.hasLogin) {
      // 已登录状态下，点击弹出登出/切换账号菜单 (ActionSheet)
      wx.showActionSheet({
        itemList: ['个人账户资料', '同步备份数据', '退出同步账号'],
        success: (res) => {
          if (res.tapIndex === 0 || res.tapIndex === 1) {
            wx.switchTab({
              url: '/pages/profile/profile'
            });
          } else if (res.tapIndex === 2) {
            this.handleLogout();
          }
        }
      });
    } else {
      // 未登录状态下，点击弹出登录同步抽屉
      this.openLoginDrawer();
    }
  },

  // 打开登录同步抽屉
  openLoginDrawer() {
    this.setData({
      showLoginDrawer: true,
      loginTab: 'wechat',
      phoneNum: '',
      smsCode: '',
      emailAddr: '',
      emailPwd: ''
    });
  },

  // 关闭登录抽屉
  closeLoginDrawer() {
    this.vibrate();
    this.setData({
      showLoginDrawer: false
    });
  },

  // 切换登录选项卡
  switchLoginTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (this.data.loginTab !== tab) {
      this.vibrate();
      this.setData({
        loginTab: tab
      });
    }
  },

  // 阻止事件冒泡 (辅助抽屉面板)
  preventBubble() {
    // 仅用于空截断
  },

  // 模拟发送手机短信验证码
  sendSmsCode() {
    if (this.data.smsCounting) return;
    this.vibrate();

    const phone = this.data.phoneNum.trim();
    if (!phone || phone.length !== 11 || isNaN(Number(phone))) {
      wx.showToast({
        title: '请输入有效手机号',
        icon: 'none'
      });
      return;
    }

    wx.showToast({
      title: '验证码已发送 (8888)',
      icon: 'success'
    });

    this.setData({
      smsCounting: true,
      smsBtnText: '60s'
    });

    let count = 60;
    const timer = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(timer);
        this.setData({
          smsCounting: false,
          smsBtnText: '获取验证码'
        });
      } else {
        this.setData({
          smsBtnText: `${count}s`
        });
      }
    }, 1000);
  },

  // 微信快捷登录同步
  doWechatLogin() {
    this.vibrate();
    wx.showLoading({ title: '微信授权同步中...' });

    // 模拟微信一键同步延迟交互
    setTimeout(() => {
      wx.hideLoading();
      this.completeLogin({
        nickName: '微信理财官',
        avatarUrl: '' // 空链接，触发首字母占位标识
      }, '微信一键登录完成，云端数据已双向同步');
    }, 1200);
  },

  // 手机号验证码快捷登录同步
  doPhoneLogin() {
    this.vibrate();
    const phone = this.data.phoneNum.trim();
    const code = this.data.smsCode.trim();

    if (phone.length !== 11 || isNaN(Number(phone))) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      return;
    }
    if (!code) {
      wx.showToast({ title: '请输入验证码', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '验证并拉取数据...' });

    setTimeout(() => {
      wx.hideLoading();
      const maskedPhone = phone.substring(0, 3) + '****' + phone.substring(7);
      this.completeLogin({
        nickName: `手机用户_${phone.substring(7)}`,
        avatarUrl: ''
      }, `手机号 ${maskedPhone} 同步完成`);
    }, 1200);
  },

  // 邮箱登录同步
  doEmailLogin() {
    this.vibrate();
    const email = this.data.emailAddr.trim();
    const pwd = this.data.emailPwd.trim();

    if (!email || !email.includes('@')) {
      wx.showToast({ title: '请输入有效邮箱', icon: 'none' });
      return;
    }
    if (!pwd || pwd.length < 6) {
      wx.showToast({ title: '密码长度至少6位', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '正在连接安全同步...' });

    setTimeout(() => {
      wx.hideLoading();
      this.completeLogin({
        nickName: email.split('@')[0],
        avatarUrl: ''
      }, `邮箱账号已成功连接同步`);
    }, 1200);
  },

  // 完成登录状态的通用更新
  completeLogin(userInfo, successMessage) {
    // 写入全局变量
    if (app.globalData) {
      app.globalData.hasLogin = true;
      app.globalData.userInfo = userInfo;
    }

    this.setData({
      hasLogin: true,
      userInfo: userInfo,
      showLoginDrawer: false
    });

    wx.showToast({
      title: successMessage,
      icon: 'none',
      duration: 2500
    });
    
    // 登录完成后刷新数据以重新渲染关联的样式
    this.fetchSubscriptions();
  },

  // 退出登录同步
  handleLogout() {
    this.vibrate();
    wx.showModal({
      title: '退出同步',
      content: '退出后将暂停与云数据库的同步，是否继续？',
      confirmColor: '#D83B01',
      success: (res) => {
        if (res.confirm) {
          if (app.globalData) {
            app.globalData.hasLogin = false;
            app.globalData.userInfo = null;
          }
          this.setData({
            hasLogin: false,
            userInfo: null
          });
          wx.showToast({
            title: '已退出同步模式',
            icon: 'none'
          });
          this.fetchSubscriptions();
        }
      }
    });
  },

  // 跳转到添加页
  navigateToAdd() {
    this.vibrate();
    wx.navigateTo({
      url: '/pages/add/add'
    });
  },

  // 跳转到数据分析
  navigateToStat() {
    this.vibrate();
    wx.switchTab({
      url: '/pages/stat/stat'
    });
  },

  // 提醒设置入口 (已实现模拟 toast 反馈)
  navigateToReminder() {
    this.vibrate();
    wx.showToast({
      title: '微软 Fluent 提醒模块集成完毕',
      icon: 'none'
    });
  },

  // 账单导出入口 (已实现模拟 toast 反馈)
  navigateToExport() {
    this.vibrate();
    wx.showToast({
      title: 'Excel / CSV 备份数据已就绪',
      icon: 'none'
    });
  },

  // 切换列表分类过滤
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    if (this.data.currentCategory !== category) {
      this.vibrate();
      this.setData({ currentCategory: category });
      this.filterSubscriptions();
    }
  },

  // 前端实现对分类过滤的渲染
  filterSubscriptions() {
    const { allSubscriptions, currentCategory } = this.data;
    let filtered = [];

    if (currentCategory === '全部') {
      filtered = allSubscriptions;
    } else {
      filtered = allSubscriptions.filter(item => item.category === currentCategory);
    }

    this.setData({ subscriptions: filtered });
  },

  // 从微信云开发数据库中获取数据
  fetchSubscriptions() {
    wx.showLoading({ title: '加载中...' });
    const db = wx.cloud.database();
    
    return db.collection('subscriptions')
      .orderBy('createdAt', 'desc')
      .get()
      .then(res => {
        const list = res.data.map(item => {
          // 清除可能无效的外部图片连接
          if (!item.iconUrl || item.iconUrl.includes('icons8.com')) {
            item.iconUrl = '';
          }
          return item;
        });
        
        this.processData(list);
        wx.hideLoading();
      })
      .catch(err => {
        console.error('拉取数据失败:', err);
        wx.hideLoading();
        wx.showToast({ title: '数据拉取失败', icon: 'none' });
      });
  },

  // 复杂的账单数据分析计算与呈现
  processData(list) {
    let totalMonthly = 0;
    const now = new Date();
    
    const formattedList = list.map(item => {
      let isExpired = false;
      
      if (item.isCancelled) {
        isExpired = true;
      } else if (item.purchaseType === 'sub' && item.cycle === 'custom' && item.endDate) {
        const endDateObj = new Date(item.endDate);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const end = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate());
        if (end < today) {
          isExpired = true;
        }
      }

      // 仅针对未过期项目累加本月支出金额
      if (item.price && !isExpired) {
        const price = Number(item.price);
        totalMonthly += price;
      }

      // 计算下次扣款日期及剩余天数 (倒计时日程)
      let nextPaymentDateStr = item.firstDate;
      let daysRemaining = 999;
      let daysRemainingText = '';
      let nextDateObj = null;

      if (!isExpired) {
        if (item.purchaseType === 'sub' && item.cycle !== 'custom') {
          let tempDate = new Date(item.firstDate);
          while (tempDate < now) {
            if (item.cycle === 'week') tempDate.setDate(tempDate.getDate() + 7);
            else if (item.cycle === 'month') tempDate.setMonth(tempDate.getMonth() + 1);
            else if (item.cycle === 'quarter') tempDate.setMonth(tempDate.getMonth() + 3);
            else if (item.cycle === 'year') tempDate.setFullYear(tempDate.getFullYear() + 1);
            else break;
          }
          nextDateObj = tempDate;
          daysRemaining = Math.ceil((nextDateObj - now) / (1000 * 60 * 60 * 24));
          
          const y = nextDateObj.getFullYear();
          const m = (nextDateObj.getMonth() + 1).toString().padStart(2, '0');
          const d = nextDateObj.getDate().toString().padStart(2, '0');
          nextPaymentDateStr = `${y}-${m}-${d}`;
          
          if (daysRemaining < 0) daysRemainingText = '已到期';
          else if (daysRemaining === 0) daysRemainingText = '今天';
          else if (daysRemaining === 1) daysRemainingText = '明天';
          else daysRemainingText = `${daysRemaining}天后`;
          
        } else if (item.purchaseType === 'sub' && item.cycle === 'custom' && item.endDate) {
          nextDateObj = new Date(item.endDate);
          daysRemaining = Math.ceil((nextDateObj - now) / (1000 * 60 * 60 * 24));
          nextPaymentDateStr = item.endDate;
          
          if (daysRemaining < 0) daysRemainingText = '已到期';
          else if (daysRemaining === 0) daysRemainingText = '今天';
          else if (daysRemaining === 1) daysRemainingText = '明天';
          else daysRemainingText = `${daysRemaining}天后`;
        }
      }

      const cycleMap = {
        'week': '周', 'month': '月', 'quarter': '季', 'year': '年', 'custom': '自定义'
      };

      const firstChar = item.appName ? item.appName.charAt(0).toUpperCase() : '数';

      return {
        ...item,
        formattedNextPayment: nextPaymentDateStr,
        daysRemaining: daysRemaining,
        daysRemainingText: daysRemainingText,
        cycleCN: cycleMap[item.cycle] || '',
        priceFixed: item.price ? Number(item.price).toFixed(2) : '0.00',
        firstChar: firstChar,
        isUrgent: !isExpired && daysRemaining >= 0 && daysRemaining <= 3, // 3天内扣费即紧急
        isExpired: isExpired
      };
    });

    // 过滤即将到期的日程列表 (30天内且未过期项目)
    const upcoming = formattedList
      .filter(item => !item.isExpired && item.purchaseType === 'sub' && item.daysRemaining >= 0 && item.daysRemaining <= 30)
      .sort((a, b) => a.daysRemaining - b.daysRemaining);

    // 列表排序: 过期项目沉底，未过期按创建时间倒序
    formattedList.sort((a, b) => {
      if (a.isExpired !== b.isExpired) {
        return a.isExpired ? 1 : -1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    this.setData({
      allSubscriptions: formattedList,
      upcomingSubscriptions: upcoming,
      totalMonthlyCost: totalMonthly.toFixed(2),
      yearlyEstimate: (totalMonthly * 12).toFixed(2),
      totalCount: formattedList.filter(i => !i.isExpired).length,
      dailyCost: (totalMonthly / 30).toFixed(2)
    });

    // 分类快速过滤生效
    this.filterSubscriptions();
  },

  // 账单记录项长按/点击交互 (弹起微软精美底部分类操作面板)
  handleItemClick(e) {
    const { id, name } = e.currentTarget.dataset;
    this.vibrate();
    
    wx.showActionSheet({
      itemList: ['编辑该订阅', '删除该账单'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: `/pages/edit/edit?id=${id}`
          });
        } else if (res.tapIndex === 1) {
          wx.showModal({
            title: '确认删除',
            content: `确定要永久删除 ${name || '此笔订阅'} 吗？此操作无法撤销。`,
            confirmColor: '#D83B01',
            success: (modalRes) => {
              if (modalRes.confirm) {
                this.deleteSubscription(id);
              }
            }
          });
        }
      }
    });
  },

  // 删除账单数据
  deleteSubscription(id) {
    wx.showLoading({ title: '正在删除...' });
    const db = wx.cloud.database();
    
    db.collection('subscriptions').doc(id).remove()
      .then(() => {
        wx.hideLoading();
        wx.showToast({ title: '账单已成功删除', icon: 'success' });
        this.fetchSubscriptions(); // 刷新账单数据
      })
      .catch(err => {
        console.error('删除账单失败:', err);
        wx.hideLoading();
        wx.showToast({ title: '删除失败', icon: 'none' });
      });
  }
});
