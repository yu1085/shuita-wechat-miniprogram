App({
  globalData: {
    appName: '水獭智聊',
    officialUrl: 'https://chenhuiint.com/phone.html?inlet=mini&from=wechat',
    apkUrl: 'https://chenhuiint.com/downloads/Ohters.apk?v=20260510-1',
    serviceAccount: '水獭智聊'
  },

  copyText(text, title) {
    wx.setClipboardData({
      data: text,
      success() {
        wx.showToast({
          title: title || '已复制',
          icon: 'success'
        });
      }
    });
  }
});
