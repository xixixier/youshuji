Component({
  options: {
    addGlobalClass: true
  },
  data: {
    selected: 0,
    color: "#8C9691", // Moss Gray (inactive)
    selectedColor: "#1C3D32", // Forest Pine Green (active)
    list: [
      {
        pagePath: "/pages/index/index",
        iconClass: "icon-home",
        text: "首页"
      },
      {
        pagePath: "/pages/stat/stat",
        iconClass: "icon-stat",
        text: "分析"
      },
      {
        pagePath: "/pages/profile/profile",
        iconClass: "icon-user",
        text: "我的"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      
      // Haptic feedback
      wx.vibrateShort({ type: 'light' });
      
      wx.switchTab({
        url,
        success: () => {
          this.setData({
            selected: data.index
          });
        }
      });
    }
  }
});
