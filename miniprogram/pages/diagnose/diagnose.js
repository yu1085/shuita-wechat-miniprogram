const ISSUE_TYPES = [
  {
    id: 'login',
    name: '无法登录',
    desc: '验证码、密码或登录环境异常',
    steps: [
      { id: 'phone', label: '已确认手机号填写正确' },
      { id: 'network', label: '已切换网络并重新尝试' },
      { id: 'sms', label: '已检查短信拦截和信号状态' },
      { id: 'restart', label: '已退出并重新打开应用' }
    ]
  },
  {
    id: 'certification',
    name: '认证失败',
    desc: '实名资料或人脸核验无法完成',
    steps: [
      { id: 'real', label: '资料内容与有效证件完全一致' },
      { id: 'clear', label: '证件照片清晰、完整且无遮挡' },
      { id: 'valid', label: '证件仍在有效期内' },
      { id: 'camera', label: '已开启相机权限并在明亮环境重试' }
    ]
  },
  {
    id: 'review',
    name: '资料被驳回',
    desc: '提交资料后收到审核未通过提示',
    steps: [
      { id: 'reason', label: '已查看并记录具体驳回原因' },
      { id: 'fields', label: '已逐项核对姓名、号码和有效期' },
      { id: 'photo', label: '已重新准备清晰的原件照片' },
      { id: 'screenshot', label: '已保存驳回页面截图' }
    ]
  },
  {
    id: 'other',
    name: '其他问题',
    desc: '页面异常、功能提示或未知问题',
    steps: [
      { id: 'reopen', label: '已关闭页面并重新进入' },
      { id: 'network', label: '已更换网络环境' },
      { id: 'time', label: '已记录问题发生时间' },
      { id: 'screenshot', label: '已保存相关页面截图' }
    ]
  }
];

Page({
  data: {
    issueTypes: ISSUE_TYPES,
    selectedId: '',
    selectedName: '',
    currentSteps: [],
    result: '',
    resultTitle: ''
  },

  selectIssue(event) {
    const selectedId = event.currentTarget.dataset.id;
    const issue = ISSUE_TYPES.find((item) => item.id === selectedId);
    this.setData({
      selectedId,
      selectedName: issue.name,
      currentSteps: issue.steps.map((step) => ({ ...step, checked: false })),
      result: '',
      resultTitle: ''
    });
  },

  updateChecklist(event) {
    const checkedIds = event.detail.value;
    const currentSteps = this.data.currentSteps.map((step) => ({
      ...step,
      checked: checkedIds.includes(step.id)
    }));
    this.setData({ currentSteps, result: '', resultTitle: '' });
  },

  generateResult() {
    if (!this.data.selectedId) {
      wx.showToast({ title: '请先选择问题类型', icon: 'none' });
      return;
    }

    const completed = this.data.currentSteps.filter((step) => step.checked);
    const pending = this.data.currentSteps.filter((step) => !step.checked);
    let resultTitle = '';
    let result = '';

    if (pending.length) {
      resultTitle = `还有 ${pending.length} 项建议检查`;
      result = pending.map((step, index) => `${index + 1}. ${step.label}`).join('\n');
    } else {
      resultTitle = '基础检查已完成';
      result = '如果问题仍未解决，请整理问题发生时间、页面截图和简要描述后联系在线客服。';
    }

    const diagnosis = {
      issue: this.data.selectedName,
      completed: completed.map((step) => step.label),
      pending: pending.map((step) => step.label),
      result
    };
    wx.setStorageSync('lastDiagnosis', diagnosis);
    this.setData({ resultTitle, result });
  },

  copyResult() {
    const text = `问题类型：${this.data.selectedName}\n${this.data.resultTitle}\n${this.data.result}`;
    getApp().copyText(text, '排查结果已复制');
  },

  goSupport() {
    wx.navigateTo({ url: '/pages/support/support' });
  },

  reset() {
    this.setData({
      selectedId: '',
      selectedName: '',
      currentSteps: [],
      result: '',
      resultTitle: ''
    });
  }
});
