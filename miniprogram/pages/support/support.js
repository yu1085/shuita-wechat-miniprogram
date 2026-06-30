const app = getApp();

Page({
  data: {
    serviceAccount: app.globalData.serviceAccount,
    feedbackItems: [
      '注册手机号或用户 ID',
      '问题发生时间',
      '相关页面截图',
      '简要问题描述'
    ]
  },

  copyServiceAccount() {
    app.copyText(this.data.serviceAccount, '公众号名称已复制');
  }
});
