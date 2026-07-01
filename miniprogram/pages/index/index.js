const app = getApp();

Page({
  data: {
    appName: app.globalData.appName,
    serviceAccount: app.globalData.serviceAccount
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
