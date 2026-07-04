const app = getApp();

function formatNow() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

Page({
  data: {
    feedbackTypes: ['登录问题', '认证问题', '资料审核', '页面异常', '其他问题'],
    typeIndex: 0,
    occurrenceTime: '',
    detail: '',
    diagnosisText: '',
    summary: ''
  },

  onShow() {
    const diagnosis = wx.getStorageSync('lastDiagnosis');
    if (diagnosis && diagnosis.issue) {
      const diagnosisText = `${diagnosis.issue}；${diagnosis.pending.length ? `仍有${diagnosis.pending.length}项待检查` : '基础检查已完成'}`;
      this.setData({ diagnosisText });
    }
  },

  changeType(event) {
    this.setData({ typeIndex: Number(event.detail.value), summary: '' });
  },

  inputTime(event) {
    this.setData({ occurrenceTime: event.detail.value, summary: '' });
  },

  inputDetail(event) {
    this.setData({ detail: event.detail.value, summary: '' });
  },

  generateSummary() {
    const detail = this.data.detail.trim();
    if (detail.length < 5) {
      wx.showToast({ title: '请至少填写5个字的问题描述', icon: 'none' });
      return;
    }

    const summary = [
      '【水獭智聊问题反馈】',
      `问题类型：${this.data.feedbackTypes[this.data.typeIndex]}`,
      `发生时间：${this.data.occurrenceTime.trim() || formatNow()}`,
      `自助排查：${this.data.diagnosisText || '尚未进行'}`,
      `问题描述：${detail}`,
      '附件提示：如有相关页面截图，请在客服会话中一并发送。'
    ].join('\n');

    this.setData({ summary });
  },

  copySummary() {
    app.copyText(this.data.summary, '反馈摘要已复制');
  },

  clearForm() {
    this.setData({
      typeIndex: 0,
      occurrenceTime: '',
      detail: '',
      summary: ''
    });
  },

  goDiagnose() {
    wx.navigateTo({ url: '/pages/diagnose/diagnose' });
  }
});
