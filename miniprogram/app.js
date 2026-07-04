App({
  globalData: {
    appName: '水獭智聊服务助手',
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
