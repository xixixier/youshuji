const appConfig = require('../../config/appConfig.js');
const db = require('../../utils/db.js');
const appLibrary = require('../../utils/appLibrary.js');

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
    loading: true,

    // 多维度数据面板导航
    currentSection: 'composition', // 'composition' 构成 | 'trend' 趋势 | 'quota' 预算
    
    // 月度趋势数据
    trendList: [],
    activeTrendIndex: 0,

    // 预算定额数据
    budgetLimit: 200,
    budgetPercent: 0,
    budgetDiff: '0.00',
    budgetStatus: 'normal',
    savingRecommendations: []
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
    this.fetchAndCalculate();
  },

  // 震动反馈
  vibrate() {
    wx.vibrateShort({ type: 'light' });
  },

  // 切换多维度分栏选项卡
  switchSection(e) {
    const section = e.currentTarget.dataset.section;
    if (this.data.currentSection !== section) {
      this.vibrate();
      this.setData({ currentSection: section });
      if (section === 'composition') {
        // 延时重画 Canvas 确保布局完成渲染
        setTimeout(() => {
          this.animateDonut(this.data.categoryStats);
        }, 150);
      }
    }
  },

  // 切换选中趋势月
  selectTrendMonth(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.vibrate();
    this.setData({ activeTrendIndex: index });
  },

  // 拖动滑块实时计算预算水位线
  onBudgetSliderChange(e) {
    const val = parseInt(e.detail.value);
    this.vibrate();
    wx.setStorageSync('budgetLimit', val);
    this.setData({ budgetLimit: val });
    this.recalculateBudget(val);
  },

  onBudgetSliderInput(e) {
    const val = parseInt(e.detail.value);
    this.setData({ budgetLimit: val });
    this.recalculateBudget(val);
  },

  fetchAndCalculate() {
    wx.showLoading({ title: '账单数据聚合中...' });
    const budgetLimit = wx.getStorageSync('budgetLimit') || 200;
    this.setData({ budgetLimit });
    
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

  // 重新计算预算比率与水位线状态
  recalculateBudget(limit) {
    const total = Number(this.data.totalMonthly) || 0;
    const percent = limit > 0 ? (total / limit * 100).toFixed(1) : 0;
    const diff = Math.abs(limit - total).toFixed(2);
    const status = total > limit ? 'danger' : 'normal';
    
    this.setData({
      budgetPercent: Number(percent),
      budgetDiff: diff,
      budgetStatus: status
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

    // 计算高精度 6 个月趋势流量数据
    const trendList = this.calculateTrendData(list);

    // 筛选开支高、可进行财务优化的前 2 位订阅项目
    const activeItems = list.filter(item => {
      let isExpired = false;
      if (item.isCancelled) isExpired = true;
      if (item.purchaseType === 'sub' && item.cycle === 'custom' && item.endDate) {
        const end = new Date(item.endDate);
        if (end < now) isExpired = true;
      }
      return !isExpired;
    });

    const itemsWithCost = activeItems.map(item => {
      let monthlyCost = 0;
      const price = Number(item.price) || 0;
      if (item.purchaseType === 'buyout') {
        monthlyCost = price / 12;
      } else {
        switch(item.cycle) {
          case 'week': monthlyCost = price * 4.33; break;
          case 'month': monthlyCost = price; break;
          case 'quarter': monthlyCost = price / 3; break;
          case 'year': monthlyCost = price / 12; break;
          case 'custom': monthlyCost = price; break;
          default: monthlyCost = price;
        }
      }
      return {
        ...item,
        monthlyCost: monthlyCost
      };
    });

    itemsWithCost.sort((a, b) => b.monthlyCost - a.monthlyCost);
    const recommendations = itemsWithCost.slice(0, 2).map(item => {
      const cycleMap = { 'week': '周', 'month': '月', 'quarter': '季', 'year': '年', 'custom': '自定义' };
      const computedIcon = appLibrary.matchApp(item.appName) || { brandColor: '#8C9691' };
      const iconSvg = computedIcon.iconSvg || appLibrary.generateFallbackSvg(item.appName, item.brandColor || '');
      const iconBase64 = appLibrary.svgToBase64(iconSvg);
      const isWechatCdn = computedIcon.iconUrl && computedIcon.iconUrl.includes('weixin.qq.com');
      const iconPic = isWechatCdn ? computedIcon.iconUrl : ('data:image/svg+xml;base64,' + iconBase64);

      return {
        _id: item._id,
        appName: item.appName,
        monthlyCost: item.monthlyCost.toFixed(2),
        price: Number(item.price).toFixed(2),
        cycleCN: cycleMap[item.cycle] || '月',
        iconPic: iconPic,
        brandColor: item.brandColor || computedIcon.brandColor || '#8C9691'
      };
    });

    this.setData({
      trendList,
      savingRecommendations: recommendations
    });

    this.recalculateBudget(this.data.budgetLimit);

    // 仅在当前选项为构成时绘制圆环
    if (this.data.currentSection === 'composition') {
      setTimeout(() => {
        const animatedStats = decoratedStats.map(item => ({
          ...item,
          width: item.percentage
        }));
        this.setData({ categoryStats: animatedStats });
        this.animateDonut(animatedStats);
      }, 100);
    }
  },

  // 6 个月度趋势精确预测扣款流向算法
  calculateTrendData(list) {
    const monthsName = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const now = new Date();
    const trendList = [];
    
    for (let i = 0; i < 6; i++) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth(); // 0-11
      
      let monthlyTotal = 0;
      const billsInMonth = [];
      
      list.forEach(item => {
        let isExpired = false;
        if (item.isCancelled) isExpired = true;
        if (item.purchaseType === 'sub' && item.cycle === 'custom' && item.endDate) {
          const end = new Date(item.endDate);
          if (end < new Date(targetYear, targetMonth, 1)) isExpired = true;
        }
        
        if (isExpired) return;
        if (item.purchaseType === 'buyout') return; // 买断制属于单次不计入未来周期波动流量
        
        let isBilled = false;
        let billCount = 0;
        let billCost = 0;
        
        const firstDate = item.firstDate ? new Date(item.firstDate) : new Date();
        const price = Number(item.price) || 0;
        
        if (item.cycle === 'month') {
          if (new Date(targetYear, targetMonth, 1) >= new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)) {
            isBilled = true;
            billCount = 1;
            billCost = price;
          }
        } else if (item.cycle === 'week') {
          if (new Date(targetYear, targetMonth, 1) >= new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)) {
            isBilled = true;
            billCount = 4; // 按月折算4次扣费
            billCost = price * 4;
          }
        } else if (item.cycle === 'quarter') {
          if (new Date(targetYear, targetMonth, 1) >= new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)) {
            const diffMonths = (targetYear - firstDate.getFullYear()) * 12 + (targetMonth - firstDate.getMonth());
            if (diffMonths >= 0 && diffMonths % 3 === 0) {
              isBilled = true;
              billCount = 1;
              billCost = price;
            }
          }
        } else if (item.cycle === 'year') {
          if (new Date(targetYear, targetMonth, 1) >= new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)) {
            if (targetMonth === firstDate.getMonth()) {
              isBilled = true;
              billCount = 1;
              billCost = price;
            }
          }
        } else {
          if (new Date(targetYear, targetMonth, 1) >= new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)) {
            isBilled = true;
            billCount = 1;
            billCost = price;
          }
        }
        
        if (isBilled) {
          monthlyTotal += billCost;
          
          // 获取高保真官方图标
          const computedIcon = appLibrary.matchApp(item.appName) || { brandColor: '#8C9691' };
          const iconSvg = computedIcon.iconSvg || appLibrary.generateFallbackSvg(item.appName, item.brandColor || '');
          const iconBase64 = appLibrary.svgToBase64(iconSvg);
          const isWechatCdn = computedIcon.iconUrl && computedIcon.iconUrl.includes('weixin.qq.com');
          const iconPic = isWechatCdn ? computedIcon.iconUrl : ('data:image/svg+xml;base64,' + iconBase64);

          const cycleMap = { 'week': '周', 'month': '月', 'quarter': '季', 'year': '年', 'custom': '自定义' };

          billsInMonth.push({
            appName: item.appName,
            price: price.toFixed(2),
            cycleCN: cycleMap[item.cycle] || '月',
            billCost: billCost.toFixed(2),
            billCount: billCount,
            iconPic: iconPic,
            brandColor: item.brandColor || computedIcon.brandColor || '#8C9691'
          });
        }
      });
      
      trendList.push({
        monthLabel: `${targetMonth + 1}月`,
        monthName: monthsName[targetMonth],
        year: targetYear,
        total: monthlyTotal.toFixed(2),
        bills: billsInMonth
      });
    }
    
    return trendList;
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

    const size = 320 * rpx; // 精确对齐 320rpx 的 CSS 容器大小
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

    // 绘制彩色比例扇面 (保留 0.04 弧度的安全间隔 gap)
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
