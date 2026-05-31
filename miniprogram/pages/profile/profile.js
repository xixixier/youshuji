// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    // 账户数据状态
    hasLogin: false,
    userInfo: null,

    // 高保真同步登录抽屉
    showLoginDrawer: false,
    loginTab: 'wechat',
    
    // 手机号快捷登录表单
    phoneNum: '',
    smsCode: '',
    smsCounting: false,
    smsBtnText: '获取验证码',

    // 邮箱登录表单
    emailAddr: '',
    emailPwd: ''
  },

  onLoad() {
    this.checkGlobalLoginState();
  },

  onShow() {
    this.checkGlobalLoginState();
  },

  // 震动反馈
  vibrate() {
    wx.vibrateShort({ type: 'light' });
  },

  // 同步并获取全局登录状态
  checkGlobalLoginState() {
    if (app.globalData && app.globalData.hasLogin) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasLogin: true
      });
    } else {
      this.setData({
        userInfo: null,
        hasLogin: false
      });
    }
  },

  // 触发登录动作
  triggerLoginAction() {
    this.vibrate();
    this.openLoginDrawer();
  },

  // 打开登录抽屉
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

  // 阻止冒泡
  preventBubble() {
    // 仅用于阻止弹窗遮罩层冒泡
  },

  // 模拟手机号发送验证码
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

  // 微信快捷登录
  doWechatLogin() {
    this.vibrate();
    wx.showLoading({ title: '安全同步中...' });

    setTimeout(() => {
      wx.hideLoading();
      this.completeLogin({
        nickName: '微信理财官',
        firstChar: '微'
      }, '微信一键登录完成，数据已同步');
    }, 1200);
  },

  // 手机号登录同步
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

    wx.showLoading({ title: '验证并读取云端数据...' });

    setTimeout(() => {
      wx.hideLoading();
      this.completeLogin({
        nickName: `手机用户_${phone.substring(7)}`,
        firstChar: '手'
      }, `手机号 ${phone.substring(0, 3)}****${phone.substring(7)} 同步成功`);
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
      const prefix = email.split('@')[0];
      const char = prefix.charAt(0).toUpperCase();
      this.completeLogin({
        nickName: prefix,
        firstChar: char
      }, '邮箱账号同步绑定成功');
    }, 1200);
  },

  // 完成登录状态的通用更新
  completeLogin(userInfo, successMessage) {
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
      duration: 2000
    });
  },

  // 退出登录同步
  handleLogout() {
    this.vibrate();
    wx.showModal({
      title: '确认退出',
      content: '退出登录后将暂停云端数据同步，是否继续？',
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
            title: '已退出安全同步',
            icon: 'none'
          });
        }
      }
    });
  },

  // 一键注入预置示例账单 (高价值调试数据)
  loadSampleData() {
    this.vibrate();
    wx.showModal({
      title: '注入测试数据',
      content: '这将一键向您的有数记数据库注入 6 笔覆盖影音、工具、学习等典型订阅账单，是否继续？',
      success: (res) => {
        if (res.confirm) {
          this.addSampleData();
        }
      }
    });
  },

  addSampleData() {
    wx.showLoading({ title: '数据安全写入中...' });
    const db = wx.cloud.database();
    
    const sampleData = [
      {
        appName: 'Netflix Premium',
        category: '影音娱乐',
        price: 32,
        currency: '￥',
        purchaseType: 'sub',
        cycle: 'month',
        firstDate: '2026-06-15',
        isRemind: true,
        createdAt: db.serverDate()
      },
      {
        appName: 'Spotify Family',
        category: '影音娱乐',
        price: 15,
        currency: '￥',
        purchaseType: 'sub',
        cycle: 'month',
        firstDate: '2026-06-20',
        isRemind: true,
        createdAt: db.serverDate()
      },
      {
        appName: 'iCloud+ 50GB',
        category: '实用工具',
        price: 6,
        currency: '￥',
        purchaseType: 'sub',
        cycle: 'month',
        firstDate: '2026-06-10',
        isRemind: true,
        createdAt: db.serverDate()
      },
      {
        appName: 'Notion Pro',
        category: '实用工具',
        price: 8,
        currency: '￥',
        purchaseType: 'sub',
        cycle: 'month',
        firstDate: '2026-06-25',
        isRemind: true,
        createdAt: db.serverDate()
      },
      {
        appName: '微信读书年卡',
        category: '学习办公',
        price: 19,
        currency: '￥',
        purchaseType: 'sub',
        cycle: 'month',
        firstDate: '2026-06-05',
        isRemind: true,
        createdAt: db.serverDate()
      },
      {
        appName: 'Microsoft 365',
        category: '学习办公',
        price: 398,
        currency: '￥',
        purchaseType: 'sub',
        cycle: 'year',
        firstDate: '2026-08-01',
        isRemind: true,
        createdAt: db.serverDate()
      }
    ];

    let addedCount = 0;
    const addNext = (index) => {
      if (index >= sampleData.length) {
        wx.hideLoading();
        wx.showToast({
          title: `已注入 ${addedCount} 条 Fluent 账单`,
          icon: 'success'
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
        return;
      }
      
      db.collection('subscriptions').add({
        data: sampleData[index]
      }).then(() => {
        addedCount++;
        addNext(index + 1);
      }).catch(err => {
        console.error('注入失败:', err);
        addNext(index + 1);
      });
    };
    
    addNext(0);
  },

  // 页面导航路由
  navigateTo(e) {
    this.vibrate();
    const url = e.currentTarget.dataset.url;
    
    const existingPages = [
      '/pages/index/index',
      '/pages/stat/stat',
      '/pages/profile/profile',
      '/pages/add/add',
      '/pages/edit/edit'
    ];
    
    if (existingPages.includes(url)) {
      wx.navigateTo({
        url: url
      });
    } else {
      wx.showToast({
        title: '应用设置开发中 · 数据已加密',
        icon: 'none'
      });
    }
  }
});
