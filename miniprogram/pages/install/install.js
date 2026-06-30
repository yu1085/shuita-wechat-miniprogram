const app = getApp();

Page({
  data: {
    officialUrl: app.globalData.officialUrl,
    apkUrl: app.globalData.apkUrl,
    steps: [
      '复制官方下载页链接。',
      '使用手机系统浏览器打开链接。',
      '点击下载 Android APK。',
      '根据系统提示允许安装来自浏览器的应用。',
      '安装完成后打开水獭智聊，按页面提示登录和认证。'
    ]
  },

  copyOfficialUrl() {
    app.copyText(this.data.officialUrl, '下载页已复制');
  },

  copyApkUrl() {
    app.copyText(this.data.apkUrl, 'APK 链接已复制');
  }
});
