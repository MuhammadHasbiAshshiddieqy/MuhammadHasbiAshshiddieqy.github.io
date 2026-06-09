// ── Lazy-load fase ───────────────────────────────────────────────────────────
var FASE_FILES = {
  'i0':'fase0.html', 'i1':'fase1.html', 'i2':'fase2.html',
  'i3':'fase3.html', 'i4':'fase4.html', 'i5':'fase5.html'
};
// map fase id → container id
var FASE_CONTAINERS = {
  'i0':'fase0-container','i1':'fase1-container','i2':'fase2-container',
  'i3':'fase3-container','i4':'fase4-container','i5':'fase5-container'
};
var loadedFases = {};   // fase id → Promise
var pendingAction = null; // action to run after load

function loadFase(faseId) {
  if (loadedFases[faseId]) return loadedFases[faseId];
  var container = document.getElementById(FASE_CONTAINERS[faseId]);
  if (!container) return Promise.resolve();
  loadedFases[faseId] = fetch(FASE_FILES[faseId])
    .then(function(r){ return r.text(); })
    .then(function(html){
      container.innerHTML = html;
      injectNavBars();
    });
  return loadedFases[faseId];
}

// ── Sidebar toggle (mobile) ──────────────────────────────────────────────────
function toggleSB(){
  var s=document.getElementById('sidebar'),o=document.getElementById('overlay');
  s.classList.toggle('open');o.classList.toggle('open');
}

// Map accordion id → fase-intro page id
var PHASE_INTRO_MAP = {'i0':'fi0','i1':'fi1','i2':'fi2','i3':'fi3','i4':'fi4','i5':'fi5'};

function sp(el,itemsId){
  var items=document.getElementById(itemsId),wasOpen=items.classList.contains('open');
  document.querySelectorAll('.sits').forEach(function(i){i.classList.remove('open');});
  document.querySelectorAll('.sph').forEach(function(p){p.classList.remove('active');});
  if(!wasOpen){
    items.classList.add('open');
    el.classList.add('active');
    var fiId = PHASE_INTRO_MAP[itemsId];
    if (fiId) {
      loadFase(itemsId).then(function(){ goToPage(fiId); });
    }
  }
}

// ── Topic focus mode ─────────────────────────────────────────────────────────
var TOPICS = [
  's0a',                                                            // 0     (fase 0, 1 topik)
  's1a','s1b','s1c','s1d','s1e','s1f','s1g','s1h','s1i',          // 1–9   (fase 1, 9 topik)
  's2a','s2b','s2c','s2d','s2e','s2f','s2g','s2h','s2i','s2j',    // 10–19 (fase 2, 10 topik)
  's3a','s3b','s3c','s3d','s3e','s3f','s3g',                       // 20–26 (fase 3, 7 topik)
  's4a','s4b','s4c','s4d','s4e','s4f','s4g','s4h','s4i','s4j','s4k', // 27–37 (fase 4, 11 topik)
  's5a','s5b','s5c','s5d','s5f','s5e'                              // 38–43 (fase 5, 6 topik)
];

var TOPIC_LABELS = {
  's0a':'0.1 Agent Pertama dalam 5 Menit',
  's1a':'1.1 LLM sebagai Reasoning Engine',
  's1b':'1.2 Agent vs Chatbot vs Pipeline',
  's1c':'1.3 ReAct, CoT, & ToT Patterns',
  's1d':'1.4 Tool Calling Fundamentals',
  's1e':'1.5 Autonomy Spectrum',
  's1f':'1.6 KV Cache & Prompt Caching',
  's1g':'1.7 Token Counting & Context Budget',
  's1h':'1.8 System Prompt Engineering',
  's1i':'1.9 Prompt Injection & Adversarial Input',
  's2a':'2.1 Agent Harness & Orchestration Loop',
  's2b':'2.2 Memory Systems',
  's2c':'2.3 Tool Registry & Schema Design',
  's2d':'2.4 Context Management',
  's2e':'2.5 Planning & Task Decomposition',
  's2f':'2.6 Structured Output & Robust Parsing',
  's2g':'2.7 RAG & Semantic Retrieval',
  's2h':'2.8 Agent Checkpointing & Resume',
  's2i':'2.9 Streaming Response Handling',
  's2j':'2.10 Session & Conversation Management',
  's3a':'3.1 Orchestrator-Subagent Pattern',
  's3b':'3.2 Parallelism & Fan-Out/Fan-In',
  's3c':'3.3 MCP — Model Context Protocol',
  's3d':'3.4 Agent Design Patterns',
  's3e':'3.5 Komunikasi & State Sharing',
  's3f':'3.6 Agent Handoff & Trust Boundary',
  's3g':'3.7 Agent-to-Agent Protocol & Negotiation',
  's4a':'4.1 Error Handling & Retry Strategies',
  's4b':'4.2 Observability & Distributed Tracing',
  's4c':'4.3 Latency & Cost Optimization',
  's4d':'4.4 Safety & Guardrails',
  's4e':'4.5 Testing & Evals Framework',
  's4f':'4.6 Rate Limiting & Backpressure',
  's4g':'4.7 Deployment Patterns',
  's4h':'4.8 Context Engineering',
  's4i':'4.9 Agent Evaluation Taxonomy',
  's4j':'4.10 Production Checklist',
  's4k':'4.11 CI/CD & Prompt Versioning',
  's5a':'5.1 Bedah Arsitektur OpenClaw',
  's5b':'5.2 Computer Use Agent',
  's5c':'5.3 Coding Agent Architecture',
  's5d':'5.4 Framework Landscape 2026',
  's5f':'5.5 Voice & Multimodal Agent',
  's5e':'5.6 Checklist Keahlian Agent Engineer'
};

var PHASE_MAP = {
  's0a':'i0',
  's1a':'i1','s1b':'i1','s1c':'i1','s1d':'i1','s1e':'i1','s1f':'i1','s1g':'i1','s1h':'i1','s1i':'i1',
  's2a':'i2','s2b':'i2','s2c':'i2','s2d':'i2','s2e':'i2','s2f':'i2','s2g':'i2','s2h':'i2','s2i':'i2','s2j':'i2',
  's3a':'i3','s3b':'i3','s3c':'i3','s3d':'i3','s3e':'i3','s3f':'i3','s3g':'i3',
  's4a':'i4','s4b':'i4','s4c':'i4','s4d':'i4','s4e':'i4','s4f':'i4','s4g':'i4','s4h':'i4','s4i':'i4','s4j':'i4','s4k':'i4',
  's5a':'i5','s5b':'i5','s5c':'i5','s5d':'i5','s5f':'i5','s5e':'i5'
};
var PHASE_NUMS = {'i0':'0','i1':'1','i2':'2','i3':'3','i4':'4','i5':'5'};

var currentIdx = 0;

var PHASE_LAST  = {0:'fi1', 9:'fi2', 19:'fi3', 26:'fi4', 37:'fi5'};
var PHASE_FIRST = {0:'home', 1:'fi1', 10:'fi2', 20:'fi3', 27:'fi4', 38:'fi5'};
var PAGE_LABELS = {'home':'Beranda','fi0':'Fase 0 — Mulai Cepat','fi1':'Fase 1 — Fondasi','fi2':'Fase 2 — Architecture','fi3':'Fase 3 — Multi-Agent','fi4':'Fase 4 — Production','fi5':'Fase 5 — Build Agent'};

// ── Inject nav bars (called after each fase load) ────────────────────────────
function injectNavBars() {
  TOPICS.forEach(function(id, idx) {
    var el = document.getElementById(id);
    if (!el || el.querySelector('.topic-nav')) return; // skip jika sudah ada
    var isVeryLast = idx === TOPICS.length - 1;

    var nextPageId = PHASE_LAST[idx];
    var prevPageId = PHASE_FIRST[idx];

    var nextLabel, nextBtn;
    if (isVeryLast) {
      nextLabel = 'Selesai!';
      nextBtn = '<button class="tnbtn primary" onclick="goToPage(\'home\')">Kembali ke Beranda ↺</button>';
    } else if (nextPageId) {
      nextLabel = PAGE_LABELS[nextPageId];
      nextBtn = '<button class="tnbtn primary" onclick="goToPage(\'' + nextPageId + '\')">Selanjutnya →</button>';
    } else {
      nextLabel = TOPIC_LABELS[TOPICS[idx+1]];
      nextBtn = '<button class="tnbtn primary next-btn-t" data-idx="' + idx + '">Selanjutnya →</button>';
    }

    var prevBtn;
    if (prevPageId) {
      prevBtn = '<button class="tnbtn" onclick="goToPage(\'' + prevPageId + '\')">← Sebelumnya</button>';
    } else if (idx > 0) {
      prevBtn = '<button class="tnbtn prev-btn" data-idx="' + idx + '">← Sebelumnya</button>';
    } else {
      prevBtn = '<button class="tnbtn" disabled>← Sebelumnya</button>';
    }

    var nav = document.createElement('div');
    nav.className = 'topic-nav';
    nav.innerHTML =
      '<div class="topic-nav-info">'
      + '<div class="topic-nav-counter">Topik ' + (idx+1) + ' / ' + TOPICS.length + '</div>'
      + '<div class="topic-nav-title">' + nextLabel + '</div>'
      + '</div>'
      + '<div class="topic-nav-btns">'
      + prevBtn
      + nextBtn
      + '</div>';
    el.appendChild(nav);
  });
}

// ID semua "halaman" selain TOPICS (home + fase intro)
var PAGES = ['home','glossary','fi0','fi1','fi2','fi3','fi4','fi5'];
var PAGE_HOME_IDS = ['home','glossary'];

function hideAll() {
  PAGE_HOME_IDS.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.remove('page-home--active');
  });
  PAGES.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.remove('fase-intro--active');
  });
  TOPICS.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.remove('sub--active');
  });
  document.querySelectorAll('.cs').forEach(function(s){ s.style.display='none'; });
}

function goToPage(pageId) {
  hideAll();
  var el = document.getElementById(pageId);
  if (!el) return;
  if (PAGE_HOME_IDS.indexOf(pageId) !== -1) {
    el.classList.add('page-home--active');
  } else {
    el.classList.add('fase-intro--active');
    var parentSection = el.closest('.cs');
    if (parentSection) parentSection.style.display = 'block';
  }
  history.replaceState(null,'','#'+pageId);
  document.querySelector('.main').scrollTo({top:0,behavior:'smooth'});
  window.scrollTo({top:0,behavior:'smooth'});
}

function goTo(idx) {
  if (idx < 0 || idx >= TOPICS.length) return;
  var nextId = TOPICS[idx];
  var faseId = PHASE_MAP[nextId];

  loadFase(faseId).then(function(){
    hideAll();
    var el = document.getElementById(nextId);
    if (!el) return;
    el.classList.add('sub--active');
    currentIdx = idx;

    var parentSection = el.closest('.cs');
    if (parentSection) parentSection.style.display = 'block';

    document.querySelector('.main').scrollTo({top:0,behavior:'smooth'});
    window.scrollTo({top:0,behavior:'smooth'});

    history.replaceState(null,'','#'+nextId);

    document.querySelectorAll('.sit').forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href')==='#'+nextId);
    });

    if (faseId) {
      document.querySelectorAll('.sits').forEach(function(i){i.classList.remove('open');});
      document.querySelectorAll('.sph').forEach(function(p){p.classList.remove('active');});
      var grp = document.getElementById(faseId);
      if (grp) { grp.classList.add('open'); grp.previousElementSibling.classList.add('active'); }
      var pv = document.getElementById('pv');
      if (pv) pv.textContent = PHASE_NUMS[faseId]||'1';
    }

    el.querySelectorAll('.cbar-fill').forEach(function(bar){
      var tw = bar.style.getPropertyValue('--tw') || bar.getAttribute('data-tw');
      if (!bar.getAttribute('data-tw')) bar.setAttribute('data-tw', bar.style.width||tw);
      bar.style.width='0';
      setTimeout(function(){ bar.style.transition='width 1.2s cubic-bezier(.4,0,.2,1)'; bar.style.width=bar.getAttribute('data-tw')||tw; },80);
    });
  });
}

// Button click delegation
document.addEventListener('click', function(e){
  var pb = e.target.closest('.prev-btn');
  var nb = e.target.closest('.next-btn-t');
  if (pb) goTo(parseInt(pb.dataset.idx)-1);
  if (nb) goTo(parseInt(nb.dataset.idx)+1);
});

// Sidebar link clicks
document.querySelectorAll('.sit').forEach(function(a){
  a.addEventListener('click', function(e){
    e.preventDefault();
    var id = a.getAttribute('href').replace('#','');
    var idx = TOPICS.indexOf(id);
    if (idx >= 0) goTo(idx);
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
  });
});

// Init: read hash → home / fase-intro / topic
(function(){
  var hash = location.hash.replace('#','');

  document.querySelectorAll('.cs').forEach(function(s){ s.style.display='none'; });

  if (!hash || hash === 'home') {
    goToPage('home');
  } else if (PAGES.indexOf(hash) >= 0) {
    // fase intro: perlu load fase dulu
    var faseId = null;
    Object.keys(PHASE_INTRO_MAP).forEach(function(k){
      if (PHASE_INTRO_MAP[k] === hash) faseId = k;
    });
    if (faseId) {
      loadFase(faseId).then(function(){ goToPage(hash); });
    } else {
      goToPage(hash);
    }
  } else {
    var startIdx = TOPICS.indexOf(hash);
    if (startIdx < 0) startIdx = 0;
    goTo(startIdx);
  }
})();
