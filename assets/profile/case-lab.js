(() => {
  const controls = document.getElementById('case-controls');
  if (!controls) return;

  const signals = {
    owner: {
      message: '林舟 → 值班 NPC「蓝箱按刚改的地址，现在发。」',
      evidence: '蓝箱对应 A17。林舟确认了改址后的第 2 版。',
    },
    vague: {
      message: '公共频道「东台那件可以先送了。」',
      decision: '先确定是哪件',
      reply: '蓝箱和铜匣都要去东台，你说的是哪件？',
      evidence: '改址后 A17、B08 都指向东台，地点无法唯一确定委托。',
    },
    relay: {
      message: '阿岑 → 值班 NPC「周屿那个铜匣，我替他确认，现在发吧。」',
      decision: '请求所有者确认',
      reply: '我记下了。周屿，你确认铜匣现在发往东台吗？',
      evidence: 'B08 的所有者是周屿。聊天记录中阿岑只负责催办。',
    },
    stale: {
      message: '林舟回复 18:42 的旧消息「对，照这条送南库。」',
      decision: '核对目的地版本',
      reply: '你后来把蓝箱改到了东台。现在是要改回南库，还是按东台发运？',
      evidence: '引用指向第 1 版，早于 18:45 生效的东台改址。需要明确当前意图。',
    },
  };

  const receipts = {
    ready: {
      decision: '提交一次发运',
      reply: '蓝箱送东台，我现在登记发运。',
      tool: 'submit(A17, v2, 东台)',
      update: 'A17 等待工具回执。B08 继续暂缓。',
      status: 'A17 尚未提交。',
    },
    pending: {
      decision: '查询原请求',
      reply: '我正在核对刚才那次发运申请，状态确认后再告诉你。',
      tool: 'lookup(A17, v2)',
      update: '继续跟踪同一次提交。B08 继续暂缓。',
      status: 'A17 等待回执。',
    },
    accepted: {
      decision: '报告已知状态',
      reply: '调度台已受理蓝箱送东台的请求，蓝箱正在等待发运。',
      tool: '无需调用',
      update: 'A17 已受理，等待发运。B08 继续暂缓。',
      status: 'A17 已受理，等待发运。',
    },
  };

  function render() {
    const signal = signals[document.getElementById('case-signal').value];
    const receipt = receipts[document.getElementById('case-receipt').value];
    const action = signal.decision ? {
      decision: signal.decision,
      reply: signal.reply,
      tool: '本轮无工具调用',
      update: receipt.status + ' B08 继续暂缓。',
    } : receipt;
    document.getElementById('case-message').textContent = signal.message;
    document.getElementById('case-evidence').textContent = signal.evidence;
    for (const field of ['decision', 'reply', 'tool', 'update']) {
      document.getElementById('case-' + field).textContent = action[field];
    }
  }

  controls.addEventListener('change', render);
  controls.hidden = false;
  render();
})();
