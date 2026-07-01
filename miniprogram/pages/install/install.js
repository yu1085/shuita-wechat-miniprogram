const app = getApp();

Page({
  data: {
    officialUrl: app.globalData.officialUrl,
    steps: [
      '复制官方页面链接。',
      '使用手机系统浏览器打开官方页面。',
      '查看页面中的服务说明。',
      '按页面提示完成后续操作。',
      '如遇登录或认证问题，请通过客服入口反馈。'
    ]
  },

  copyOfficialUrl() {
    app.copyText(this.data.officialUrl, '官方页面已复制');
  }
});
