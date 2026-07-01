const app = getApp();

Page({
  data: {
    appName: app.globalData.appName,
    officialUrl: app.globalData.officialUrl,
    serviceAccount: app.globalData.serviceAccount
  },

  copyOfficialUrl() {
    app.copyText(this.data.officialUrl, '官方页面已复制');
  },

  goInstall() {
    wx.navigateTo({
      url: '/pages/install/install'
    });
  },

  goSupport() {
    wx.navigateTo({
      url: '/pages/support/support'
    });
  }
});
