const FAQS = [
  {
    id: 1,
    category: '登录',
    question: '收不到短信验证码怎么办？',
    answer: '请确认手机号填写正确、手机信号正常且未开启短信拦截。等待一分钟后重新获取；连续多次失败时，建议记录发生时间并通过客服反馈。',
    keywords: '验证码 短信 手机号 登录 收不到'
  },
  {
    id: 2,
    category: '登录',
    question: '提示账号或密码错误怎么办？',
    answer: '先检查输入法状态、大小写和首尾空格，再尝试通过绑定手机号找回密码。不要向任何人提供短信验证码或完整密码。',
    keywords: '账号 密码 错误 找回 登录'
  },
  {
    id: 3,
    category: '认证',
    question: '认证资料如何准备？',
    answer: '请使用真实、清晰且在有效期内的资料，确保姓名、证件号码和证件有效期与原件一致，照片四角完整、文字无遮挡。',
    keywords: '认证资料 实名 证件 照片 有效期'
  },
  {
    id: 4,
    category: '认证',
    question: '人脸核验无法完成怎么办？',
    answer: '请在光线均匀的环境中操作，保持正脸完整入镜，不佩戴帽子、口罩或深色眼镜，并确认相机权限已开启。',
    keywords: '人脸 核验 相机 权限 认证'
  },
  {
    id: 5,
    category: '资料',
    question: '资料审核未通过怎么办？',
    answer: '先查看页面显示的具体驳回原因，再逐项核对资料真实性、清晰度和字段一致性。重新提交前建议保留驳回页面截图。',
    keywords: '审核未通过 驳回 资料 截图'
  },
  {
    id: 6,
    category: '资料',
    question: '如何修改已经提交的资料？',
    answer: '审核中的资料通常不能直接修改。请等待当前审核结束；如页面提供撤回入口，可撤回后修改，具体以页面提示为准。',
    keywords: '修改 撤回 已提交 资料 审核中'
  },
  {
    id: 7,
    category: '客服',
    question: '向客服反馈时需要提供什么？',
    answer: '建议提供问题类型、发生时间、相关页面截图和简要描述。请勿发送登录密码、短信验证码等敏感信息。',
    keywords: '客服 反馈 截图 时间 描述'
  },
  {
    id: 8,
    category: '客服',
    question: '客服入口在哪里？',
    answer: '返回首页进入“反馈信息整理”，填写问题描述并生成反馈摘要，然后点击“联系在线客服”即可。',
    keywords: '客服入口 在线客服 联系 反馈'
  }
];

Page({
  data: {
    categories: ['全部', '登录', '认证', '资料', '客服'],
    activeCategory: '全部',
    searchValue: '',
    filteredFaqs: FAQS,
    expandedId: 0,
    resultCount: FAQS.length
  },

  onLoad(options) {
    if (options.q) {
      const searchValue = decodeURIComponent(options.q);
      this.setData({ searchValue }, () => this.filterFaqs());
    }
  },

  handleSearch(event) {
    this.setData({ searchValue: event.detail.value }, () => this.filterFaqs());
  },

  clearSearch() {
    this.setData({ searchValue: '' }, () => this.filterFaqs());
  },

  selectCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.category }, () => this.filterFaqs());
  },

  toggleFaq(event) {
    const id = Number(event.currentTarget.dataset.id);
    this.setData({ expandedId: this.data.expandedId === id ? 0 : id });
  },

  filterFaqs() {
    const keyword = this.data.searchValue.trim().toLowerCase();
    const category = this.data.activeCategory;
    const filteredFaqs = FAQS.filter((item) => {
      const categoryMatched = category === '全部' || item.category === category;
      const text = `${item.question} ${item.answer} ${item.keywords}`.toLowerCase();
      return categoryMatched && (!keyword || text.includes(keyword));
    });

    this.setData({
      filteredFaqs,
      resultCount: filteredFaqs.length,
      expandedId: 0
    });
  },

  goDiagnose() {
    wx.navigateTo({ url: '/pages/diagnose/diagnose' });
  }
});
