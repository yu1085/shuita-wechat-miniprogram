Page({
  data: {
    steps: [
      '阅读水獭智聊账号登录与认证说明。',
      '确认手机号、认证资料等信息真实有效。',
      '如页面提示需要补充资料，请按要求完成。',
      '遇到账号、认证、资料审核等问题，请进入客服页反馈。'
    ]
  },

  goSupport() {
    wx.navigateTo({
      url: '/pages/support/support'
    });
  }
});
