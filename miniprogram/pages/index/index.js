const app = getApp();

Page({
  data: {
    appName: app.globalData.appName,
    officialUrl: app.globalData.officialUrl,
    apkUrl: app.globalData.apkUrl,
    serviceAccount: app.globalData.serviceAccount
  },

  copyOfficialUrl() {
    app.copyText(this.data.officialUrl, '下载页已复制');
  },

  copyApkUrl() {
    app.copyText(this.data.apkUrl, 'APK 链接已复制');
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
