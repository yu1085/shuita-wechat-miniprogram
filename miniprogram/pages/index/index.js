const app = getApp();

Page({
  data: {
    appName: app.globalData.appName,
    serviceAccount: app.globalData.serviceAccount,
    services: [
      {
        icon: '查',
        title: '帮助内容查询',
        desc: '搜索登录、认证和资料审核说明',
        url: '/pages/install/install'
      },
      {
        icon: '诊',
        title: '账号问题排查',
        desc: '按步骤检查并生成处理建议',
        url: '/pages/diagnose/diagnose'
      },
      {
        icon: '单',
        title: '反馈信息整理',
        desc: '生成完整反馈摘要后联系客服',
        url: '/pages/support/support'
      }
    ],
    commonQuestions: [
      { title: '收不到验证码怎么办？', query: '验证码' },
      { title: '认证资料如何准备？', query: '认证资料' },
      { title: '资料审核未通过怎么办？', query: '审核未通过' }
    ]
  },

  openService(event) {
    const { url } = event.currentTarget.dataset;
    wx.navigateTo({
      url
    });
  },

  startDiagnose() {
    wx.navigateTo({
      url: '/pages/diagnose/diagnose'
    });
  },

  searchQuestion(event) {
    const { query } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/install/install?q=${encodeURIComponent(query)}`
    });
  }
});
