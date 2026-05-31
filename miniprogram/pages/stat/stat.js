const appConfig = require('../../config/appConfig.js');

// 微软数据看板专用：静谧、高雅低饱和度商务配色系统
const CHART_COLORS = [
  '#107C41', // 微软数据绿 (主分类)
  '#2B3B4C', // 铅黛灰
  '#008272', // 钢青色
  '#A86400', // 暗金黄
  '#9C3B1E', // 枫叶赤
  '#512BD4', // 深黛蓝
  '#5C5C5C', // 中碳灰
  '#8A8A8A'  // 烟雾浅灰
];

Page({
  data: {
    currencySymbol: (appConfig && appConfig.DEFAULT_CURRENCY_SYMBOL) || '￥',
    totalMonthly: '0.00',
    totalYearly: '0.00',
    activeCount: 0,
    categoriesCount: 0,
    topCategoryName: '无',
    topCategoryPercent: 0,
    categoryStats: [],
    loading: true
  },

  onShow() {
    this.fetchAndCalculate();
  },

  // 震动反馈
  vibrate() {
    wx.vibrateShort({ type: 'light' });
  },

  // 命令条点击反馈
  showToastInfo() {
    this.vibrate();
    wx.showToast({
      title: '高精度财务模型已就绪',
      icon: 'none'
    });
  },

  fetchAndCalculate() {
    wx.showLoading({ title: '账单数据聚合中...' });
    const db = wx.cloud.database();
    
    db.collection('subscriptions').get()
      .then(res => {
        this.processData(res.data);
        wx.hideLoading();
      })
      .catch(err => {
        console.error('统计加载失败:', err);
        wx.hideLoading();
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
  },

  // 核心财务账单的月度折算与分类占比算法
  processData(list) {
    const now = new Date();
    let totalMonthly = 0;
    let activeCount = 0;
    const categoryMap = {};

    list.forEach(item => {
      // 判定排除已结束项目 (对齐首页规则)
      let isExpired = false;
      if (item.isCancelled) {
        isExpired = true;
      }
      if (item.purchaseType === 'sub' && item.cycle === 'custom' && item.endDate) {
        const endDateObj = new Date(item.endDate);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const end = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate());
        if (end < today) isExpired = true;
      }

      if (isExpired) return;

      // 月度折算公式
      let monthlyCost = 0;
      const price = Number(item.price) || 0;
      
      if (item.purchaseType === 'buyout') {
        // 买断制项目：按12个月折算平摊
        monthlyCost = price / 12; 
      } else {
        // 订阅制按周期进行数学折算
        switch(item.cycle) {
          case 'week': monthlyCost = price * 4.33; break; // 周转月 (1个月约4.33周)
          case 'month': monthlyCost = price; break;
          case 'quarter': monthlyCost = price / 3; break;
          case 'year': monthlyCost = price / 12; break;
          case 'custom': monthlyCost = price; break;
          default: monthlyCost = price;
        }
      }

      totalMonthly += monthlyCost;
      activeCount += 1;

      // 按分类名称聚合折算金额
      const category = item.category || '其他';
      categoryMap[category] = (categoryMap[category] || 0) + monthlyCost;
    });

    // 转换为数组并计算百分比
    const stats = Object.keys(categoryMap).map(cat => {
      const amount = categoryMap[cat];
      const percentage = totalMonthly > 0 ? (amount / totalMonthly * 100).toFixed(1) : 0;
      return {
        category: cat,
        amount: amount.toFixed(2),
        percentage: Number(percentage),
        width: 0, // 用于动画的宽度
        barColor: '#8A8A8A',
        percentText: `${Number(percentage).toFixed(1)}%`
      };
    });

    // 降序排序
    stats.sort((a, b) => b.percentage - a.percentage);

    // 装饰低饱和度色系
    const decoratedStats = stats.map((item, index) => {
      return {
        ...item,
        barColor: CHART_COLORS[index % CHART_COLORS.length]
      };
    });

    const top = decoratedStats[0];
    const totalYearly = totalMonthly * 12;

    this.setData({
      totalMonthly: totalMonthly.toFixed(2),
      totalYearly: totalYearly.toFixed(2),
      activeCount,
      categoriesCount: decoratedStats.length,
      topCategoryName: top ? top.category : '无',
      topCategoryPercent: top ? top.percentage : 0,
      categoryStats: decoratedStats,
      loading: false
    });

    // 开启精美渐进式动画
    setTimeout(() => {
      const animatedStats = decoratedStats.map(item => ({
        ...item,
        width: item.percentage
      }));
      this.setData({ categoryStats: animatedStats });
      this.animateDonut(animatedStats);
    }, 100);
  },

  // 精致环形图动态缓动动画
  animateDonut(stats) {
    if (!stats || stats.length === 0) return;
    const start = Date.now();
    const duration = 800; // 800毫秒平滑过渡

    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      // 缓动算法 (EaseOutQuart)
      const ease = 1 - Math.pow(1 - t, 4);
      this.drawDonut(stats, ease);
      if (t < 1) {
        setTimeout(tick, 16);
      }
    };

    tick();
  },

  // 微软扁平细线圆环 Canvas 绘制
  drawDonut(stats, progress = 1) {
    const ctx = wx.createCanvasContext('donutCanvas', this);
    const systemInfo = wx.getSystemInfoSync();
    const rpx = systemInfo.windowWidth / 750;

    const size = 360 * rpx; // 对齐 360rpx 的容器大小
    const cx = size / 2;
    const cy = size / 2;
    const lineWidth = 8 * rpx; // 8rpx 极细线段，高级感圆环核心
    const radius = (size / 2) - (12 * rpx);

    ctx.clearRect(0, 0, size, size);

    // 绘制底部静谧浅灰滑轨
    ctx.setLineWidth(lineWidth);
    ctx.setLineCap('round');
    ctx.setStrokeStyle('#EAEAEA');
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // 绘制彩色比例扇面 (保留 0.04 弧度的安全间隔 gap 提升设计感)
    let remaining = Math.PI * 2 * Math.max(0, Math.min(1, progress));
    let startAngle = -Math.PI / 2;
    const gap = 0.04;

    for (let i = 0; i < stats.length; i++) {
      const pct = Number(stats[i].percentage) || 0;
      const seg = (pct / 100) * Math.PI * 2;
      const draw = Math.min(seg, remaining);
      if (draw <= 0) break;

      const a0 = startAngle + gap;
      const a1 = startAngle + draw - gap;

      if (a1 > a0) {
        ctx.setStrokeStyle(stats[i].barColor || '#8A8A8A');
        ctx.beginPath();
        ctx.arc(cx, cy, radius, a0, a1);
        ctx.stroke();
      }

      startAngle += seg;
      remaining -= draw;
      if (remaining <= 0) break;
    }

    ctx.draw();
  }
});
