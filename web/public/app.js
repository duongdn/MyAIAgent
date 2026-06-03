'use strict';

// ── State ──────────────────────────────────────────────────────────────────
let allSkills = [];
let selectedSkill = null;
let activeRunId = null;
let activeEventSource = null;

// ── DOM refs ───────────────────────────────────────────────────────────────
const skillListEl    = document.getElementById('skillList');
const skillSearchEl  = document.getElementById('skillSearch');
const activeBadgeEl  = document.getElementById('activeSkillBadge');
const argsInputEl    = document.getElementById('argsInput');
const runBtnEl       = document.getElementById('runBtn');
const stopBtnEl      = document.getElementById('stopBtn');
const clearBtnEl     = document.getElementById('clearBtn');
const copyBtnEl      = document.getElementById('copyBtn');
const terminalEl     = document.getElementById('terminal');
const statusTextEl   = document.getElementById('statusText');
const costTextEl     = document.getElementById('costText');
const durationTextEl = document.getElementById('durationText');

// Chat DOM refs
const chatPanelEl    = document.getElementById('chatPanel');
const chatToggleBtnEl= document.getElementById('chatToggleBtn');
const closeChatBtnEl = document.getElementById('closeChatBtn');
const clearChatBtnEl = document.getElementById('clearChatBtn');
const chatMessagesEl = document.getElementById('chatMessages');
const chatInputEl    = document.getElementById('chatInput');
const sendBtnEl      = document.getElementById('sendBtn');

// ── Skill loading ──────────────────────────────────────────────────────────

async function loadSkills() {
  try {
    const res = await fetch('/api/skills');
    allSkills = await res.json();
    renderSkillList(allSkills);
  } catch (err) {
    skillListEl.innerHTML = `<div class="loading-skills" style="color:#f87171">Failed to load skills: ${err.message}</div>`;
  }
}

function renderSkillList(skills) {
  if (!skills.length) {
    skillListEl.innerHTML = '<div class="loading-skills">No skills found</div>';
    return;
  }

  skillListEl.innerHTML = skills.map(skill => `
    <div class="skill-item${selectedSkill?.id === skill.id ? ' active' : ''}"
         data-id="${skill.id}"
         data-name="${escHtml(skill.name)}"
         title="${escHtml(skill.description)}">
      <div class="skill-name">${escHtml(skill.name.replace('me:', ''))}</div>
      <div class="skill-desc">${escHtml(skill.description)}</div>
    </div>
  `).join('');

  skillListEl.querySelectorAll('.skill-item').forEach(el => {
    el.addEventListener('click', () => selectSkill(el.dataset.id, el.dataset.name));
  });
}

function selectSkill(id, name) {
  selectedSkill = { id, name };
  activeBadgeEl.textContent = `/${name}`;
  activeBadgeEl.classList.remove('empty', 'running');
  runBtnEl.disabled = activeRunId !== null;

  skillListEl.querySelectorAll('.skill-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });
}

// ── Filter ─────────────────────────────────────────────────────────────────

skillSearchEl.addEventListener('input', () => {
  const q = skillSearchEl.value.trim().toLowerCase();
  const filtered = q
    ? allSkills.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    : allSkills;
  renderSkillList(filtered);
});

// ── Run / Stop ─────────────────────────────────────────────────────────────

runBtnEl.addEventListener('click', startRun);
stopBtnEl.addEventListener('click', stopRun);
clearBtnEl.addEventListener('click', clearTerminal);
copyBtnEl.addEventListener('click', copyOutput);

argsInputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !runBtnEl.disabled) startRun();
});

async function startRun() {
  if (!selectedSkill || activeRunId) return;

  const args = argsInputEl.value.trim();

  runBtnEl.disabled = true;
  stopBtnEl.classList.remove('hidden');
  activeBadgeEl.classList.add('running');
  setStatus('Running…');
  costTextEl.classList.add('hidden');
  durationTextEl.classList.add('hidden');

  appendPromptLine(selectedSkill.name, args);
  appendSpinner();

  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skillName: selectedSkill.name, args }),
    });
    const { runId, error } = await res.json();
    if (error) throw new Error(error);

    activeRunId = runId;
    openEventStream(runId);
  } catch (err) {
    finishRun(false);
    appendLine('term-stderr', `Error: ${err.message}`);
  }
}

async function stopRun() {
  if (!activeRunId) return;
  try {
    await fetch(`/api/run/${activeRunId}`, { method: 'DELETE' });
  } catch (_) {}
}

function openEventStream(runId) {
  if (activeEventSource) activeEventSource.close();

  const es = new EventSource(`/api/run/${runId}/stream`);
  activeEventSource = es;

  es.onmessage = (e) => {
    if (!e.data) return;
    const ev = JSON.parse(e.data);
    handleStreamEvent(ev, runId);
  };

  es.onerror = () => {
    es.close();
    if (activeRunId === runId) finishRun(false);
  };
}

function handleStreamEvent(ev, runId) {
  removeSpinner();

  switch (ev.type) {
    case 'init':
      break;

    case 'started':
      break;

    case 'text':
      renderMarkdownText(ev.text);
      break;

    case 'tool':
      appendLine('term-tool', `${ev.name}: ${ev.summary || ''}`);
      appendSpinner();
      break;

    case 'stderr':
      if (ev.text.trim()) appendLine('term-stderr', ev.text.trim());
      break;

    case 'result':
      break;

    case 'done': {
      removeSpinner();
      const ok = ev.code === 0 || ev.code === null;
      const dur = ev.durationMs ? `${(ev.durationMs / 1000).toFixed(1)}s` : '';
      appendDoneBanner(ok, dur);
      if (activeRunId === runId) finishRun(ok, ev);
      break;
    }

    case 'raw':
      if (ev.text.trim()) appendLine('term-text', ev.text);
      break;

    default:
      break;
  }
  scrollToBottom();
}

function finishRun(ok, ev) {
  activeRunId = null;
  if (activeEventSource) { activeEventSource.close(); activeEventSource = null; }
  runBtnEl.disabled = !selectedSkill;
  stopBtnEl.classList.add('hidden');
  activeBadgeEl.classList.remove('running');
  setStatus(ok ? 'Done' : 'Stopped');

  if (ev?.durationMs) {
    durationTextEl.textContent = `${(ev.durationMs / 1000).toFixed(1)}s`;
    durationTextEl.classList.remove('hidden');
  }
}

// ── Terminal rendering ─────────────────────────────────────────────────────

function clearTerminal() {
  terminalEl.innerHTML = '';
}

function appendPromptLine(skillName, args) {
  const now = new Date().toLocaleTimeString();
  const cmd = args ? `/${skillName} ${args}` : `/${skillName}`;
  const div = document.createElement('div');
  div.className = 'term-prompt';
  div.innerHTML = `<span class="prompt-skill">${escHtml(cmd)}</span><span class="prompt-time">${now}</span>`;
  terminalEl.appendChild(div);
}

let spinnerEl = null;

function appendSpinner() {
  removeSpinner();
  const div = document.createElement('div');
  div.className = 'term-spinner';
  div.id = 'termSpinner';
  div.innerHTML = '<span class="spinner-dot"></span><span class="spinner-dot"></span><span class="spinner-dot"></span><span>Running…</span>';
  spinnerEl = div;
  terminalEl.appendChild(div);
  scrollToBottom();
}

function removeSpinner() {
  const el = document.getElementById('termSpinner');
  if (el) el.remove();
  spinnerEl = null;
}

function appendLine(className, text) {
  const div = document.createElement('div');
  div.className = `term-line ${className}`;
  div.textContent = text;
  terminalEl.appendChild(div);
}

function appendDoneBanner(ok, duration) {
  const div = document.createElement('div');
  div.className = `term-done ${ok ? 'success' : 'error'}`;
  div.textContent = ok
    ? `✓ Completed${duration ? ` in ${duration}` : ''}`
    : `✗ Stopped${duration ? ` after ${duration}` : ''}`;
  terminalEl.appendChild(div);
}

function renderMarkdownText(text) {
  const parts = text.split(/(```[\s\S]*?```)/g);

  for (const part of parts) {
    if (part.startsWith('```')) {
      const inner = part.replace(/^```[^\n]*\n?/, '').replace(/```$/, '');
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = inner;
      pre.appendChild(code);
      pre.className = 'term-text';
      terminalEl.appendChild(pre);
    } else if (part.trim()) {
      const lines = part.split('\n');
      let buffer = '';

      for (const line of lines) {
        if (/^#{1,3} /.test(line)) {
          flushBuffer();
          const level = line.match(/^(#{1,3}) /)[1].length;
          const div = document.createElement('div');
          div.className = 'term-text';
          const hdr = document.createElement(`h${level}`);
          hdr.textContent = line.replace(/^#{1,3} /, '');
          div.appendChild(hdr);
          terminalEl.appendChild(div);
        } else {
          buffer += line + '\n';
        }
      }
      flushBuffer();

      function flushBuffer() {
        if (!buffer.trim()) { buffer = ''; return; }
        const div = document.createElement('div');
        div.className = 'term-text';
        div.innerHTML = inlineFormat(buffer.trimEnd());
        terminalEl.appendChild(div);
        buffer = '';
      }
    }
  }
}

function inlineFormat(text) {
  return escHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function scrollToBottom() {
  terminalEl.scrollTop = terminalEl.scrollHeight;
}

// ── Copy output ────────────────────────────────────────────────────────────

function copyOutput() {
  const text = terminalEl.innerText;
  navigator.clipboard.writeText(text).then(() => {
    copyBtnEl.textContent = '✓';
    setTimeout(() => { copyBtnEl.textContent = '⎘'; }, 1500);
  });
}

// ── Status bar ─────────────────────────────────────────────────────────────

function setStatus(msg) {
  statusTextEl.textContent = msg;
}

// ── Keyboard shortcuts ─────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    skillSearchEl.focus();
    skillSearchEl.select();
  }
  if (e.key === 'Escape') {
    if (activeRunId) { stopRun(); }
    else if (document.activeElement === skillSearchEl) { skillSearchEl.value = ''; renderSkillList(allSkills); }
  }
});

// ── Chat panel toggle ──────────────────────────────────────────────────────

function openChat() {
  chatPanelEl.classList.remove('hidden');
  chatToggleBtnEl.classList.add('active');
  chatInputEl.focus();
}

function closeChat() {
  chatPanelEl.classList.add('hidden');
  chatToggleBtnEl.classList.remove('active');
}

chatToggleBtnEl.addEventListener('click', () => {
  chatPanelEl.classList.contains('hidden') ? openChat() : closeChat();
});
closeChatBtnEl.addEventListener('click', closeChat);

// ── Chat ───────────────────────────────────────────────────────────────────

/** @type {{ role: 'user'|'assistant', content: string }[]} */
let chatHistory = [];
let chatRunId = null;
let chatEventSource = null;

function appendChatMessage(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `chat-msg chat-msg-${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  if (text) bubble.innerHTML = inlineFormat(escHtml(text));
  wrap.appendChild(bubble);
  chatMessagesEl.appendChild(wrap);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  return bubble;
}

async function sendChatMessage() {
  const msg = chatInputEl.value.trim();
  if (!msg || chatRunId) return;

  chatInputEl.value = '';
  chatInputEl.style.height = 'auto';

  // Remove welcome hint on first message
  const hint = chatMessagesEl.querySelector('.chat-hint');
  if (hint) hint.remove();

  appendChatMessage('user', msg);

  const botBubble = appendChatMessage('assistant', '');
  botBubble.innerHTML = '<span class="chat-cursor"></span>';

  let fullText = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg, history: chatHistory }),
    });
    const { runId, error } = await res.json();
    if (error) throw new Error(error);

    chatRunId = runId;
    sendBtnEl.disabled = true;

    const es = new EventSource(`/api/run/${runId}/stream`);
    chatEventSource = es;

    es.onmessage = (e) => {
      if (!e.data) return;
      const ev = JSON.parse(e.data);

      if (ev.type === 'text') {
        fullText += ev.text;
        botBubble.innerHTML = inlineFormat(escHtml(fullText)) + '<span class="chat-cursor"></span>';
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
      } else if (ev.type === 'done') {
        botBubble.innerHTML = inlineFormat(escHtml(fullText || '(no response)'));
        chatHistory.push({ role: 'user', content: msg });
        chatHistory.push({ role: 'assistant', content: fullText });
        finishChat();
      }
    };

    es.onerror = () => {
      es.close();
      if (!fullText) botBubble.textContent = '(error)';
      else botBubble.innerHTML = inlineFormat(escHtml(fullText));
      finishChat();
    };
  } catch (err) {
    botBubble.textContent = `Error: ${err.message}`;
    finishChat();
  }
}

function finishChat() {
  chatRunId = null;
  if (chatEventSource) { chatEventSource.close(); chatEventSource = null; }
  sendBtnEl.disabled = false;
  chatInputEl.focus();
}

sendBtnEl.addEventListener('click', sendChatMessage);

chatInputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
});

chatInputEl.addEventListener('input', () => {
  chatInputEl.style.height = 'auto';
  chatInputEl.style.height = Math.min(chatInputEl.scrollHeight, 160) + 'px';
});

clearChatBtnEl.addEventListener('click', () => {
  chatHistory = [];
  chatMessagesEl.innerHTML = '<div class="chat-hint">Ask me anything while your skill runs…</div>';
});

// ── Init ───────────────────────────────────────────────────────────────────
loadSkills();
