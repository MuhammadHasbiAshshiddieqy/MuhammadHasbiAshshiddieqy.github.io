// ── State kurikulum aktif ─────────────────────────────────────────────────────
var activeCurriculum = null; // 'agentic-ai' | 'language-model'

// ── Lazy-load (Agentic AI) ────────────────────────────────────────────────────
var FASE_FILES = {
  'i0':'topics/agentic-ai/fase0.html', 'i1':'topics/agentic-ai/fase1.html', 'i2':'topics/agentic-ai/fase2.html',
  'i3':'topics/agentic-ai/fase3.html', 'i4':'topics/agentic-ai/fase4.html', 'i5':'topics/agentic-ai/fase5.html'
};
var FASE_CONTAINERS = {
  'i0':'fase0-container','i1':'fase1-container','i2':'fase2-container',
  'i3':'fase3-container','i4':'fase4-container','i5':'fase5-container'
};

// ── Lazy-load (Language Model) ────────────────────────────────────────────────
var LM_FASE_FILES = {
  'lmi1':'topics/language-model/fase1.html', 'lmi2':'topics/language-model/fase2.html',
  'lmi3':'topics/language-model/fase3.html', 'lmi4':'topics/language-model/fase4.html',
  'lmi5':'topics/language-model/fase5.html'
};
var LM_FASE_CONTAINERS = {
  'lmi1':'lmfase1-container','lmi2':'lmfase2-container','lmi3':'lmfase3-container',
  'lmi4':'lmfase4-container','lmi5':'lmfase5-container'
};

var loadedFases = {};

function loadFase(faseId) {
  if (loadedFases[faseId]) return loadedFases[faseId];
  var files = (activeCurriculum === 'language-model') ? LM_FASE_FILES : FASE_FILES;
  var containers = (activeCurriculum === 'language-model') ? LM_FASE_CONTAINERS : FASE_CONTAINERS;
  // cek kedua map karena faseId bisa dari salah satu
  var file = LM_FASE_FILES[faseId] || FASE_FILES[faseId];
  var containerId = LM_FASE_CONTAINERS[faseId] || FASE_CONTAINERS[faseId];
  if (!file || !containerId) return Promise.resolve();
  var container = document.getElementById(containerId);
  if (!container) return Promise.resolve();
  loadedFases[faseId] = fetch(file)
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

// ── Curriculum open/close ─────────────────────────────────────────────────────
function openCurriculum(id) {
  var label = id === 'language-model' ? 'Language Model Fundamentals' : 'Agentic AI Mastery';
  enterCurriculum(id, label);
  var firstFase = (id === 'language-model') ? 'lmi1' : 'i0';
  var startPage = (id === 'language-model') ? 'lmfi1' : 'fi0';
  loadFase(firstFase).then(function(){ goToPage(startPage); });
}

function showLanding() {
  activeCurriculum = null;
  hideAll();
  document.getElementById('landing').classList.add('landing--active');
  document.getElementById('sidebar').classList.add('sidebar--hidden');
  document.getElementById('layout').classList.add('layout--no-sidebar');
  document.getElementById('header-sub').innerHTML = (typeof t === 'function' ? t('header.sub') : 'Open Knowledge — AI &amp; Engineering');
  history.replaceState(null,'','#');
  document.querySelector('.main').scrollTo({top:0});
  document.querySelectorAll('.cs').forEach(function(s){ s.style.display='none'; });
}

// ── Sidebar dinamis ───────────────────────────────────────────────────────────
function renderSidebar(curriculum) {
  var sc = document.getElementById('sidebar-content');
  if (curriculum === 'agentic-ai') {
    sc.innerHTML = [
      '<div class="sidebar-topic-label">Agentic AI Mastery</div>',
      sbPhase('i0','Fase 0 — Mulai Cepat','fi0',[
        ['s0a','0.1 Agent Pertama']
      ]),
      sbPhase('i1','Fase 1 — Fondasi LLM','fi1',[
        ['s1a','1.1 LLM sebagai Reasoning Engine'],
        ['s1b','1.2 Agent vs Chatbot vs Pipeline'],
        ['s1c','1.3 ReAct, CoT & ToT'],
        ['s1d','1.4 Tool Calling Fundamentals'],
        ['s1e','1.5 Autonomy Spectrum'],
        ['s1f','1.6 KV Cache & Prompt Caching'],
        ['s1g','1.7 Token Counting & Context Budget'],
        ['s1h','1.8 System Prompt Engineering'],
        ['s1i','1.9 Prompt Injection']
      ]),
      sbPhase('i2','Fase 2 — Architecture','fi2',[
        ['s2a','2.1 Agent Harness & Loop'],
        ['s2b','2.2 Memory Systems'],
        ['s2c','2.3 Tool Registry & Schema'],
        ['s2d','2.4 Context Management'],
        ['s2e','2.5 Planning & Decomposition'],
        ['s2f','2.6 Structured Output'],
        ['s2g','2.7 RAG & Semantic Retrieval'],
        ['s2h','2.8 Checkpointing & Resume'],
        ['s2i','2.9 Streaming'],
        ['s2j','2.10 Session Management']
      ]),
      sbPhase('i3','Fase 3 — Multi-Agent','fi3',[
        ['s3a','3.1 Orchestrator-Subagent'],
        ['s3b','3.2 Parallelism & Fan-Out'],
        ['s3c','3.3 MCP'],
        ['s3d','3.4 Design Patterns'],
        ['s3e','3.5 Komunikasi & State'],
        ['s3f','3.6 Agent Handoff'],
        ['s3g','3.7 Agent-to-Agent Protocol']
      ]),
      sbPhase('i4','Fase 4 — Production','fi4',[
        ['s4a','4.1 Error Handling & Retry'],
        ['s4b','4.2 Observability & Tracing'],
        ['s4c','4.3 Latency & Cost'],
        ['s4d','4.4 Safety & Guardrails'],
        ['s4e','4.5 Testing & Evals'],
        ['s4f','4.6 Rate Limiting'],
        ['s4g','4.7 Deployment Patterns'],
        ['s4h','4.8 Context Engineering'],
        ['s4i','4.9 Evaluation Taxonomy'],
        ['s4j','4.10 Production Checklist'],
        ['s4k','4.11 CI/CD & Prompt Versioning']
      ]),
      sbPhase('i5','Fase 5 — Build Agent','fi5',[
        ['s5a','5.1 Bedah OpenClaw'],
        ['s5b','5.2 Computer Use Agent'],
        ['s5c','5.3 Coding Agent'],
        ['s5d','5.4 Framework Landscape 2026'],
        ['s5f','5.5 Voice & Multimodal'],
        ['s5e','5.6 Checklist Keahlian']
      ]),
      sbGlossary()
    ].join('');
  } else {
    sc.innerHTML = [
      '<div class="sidebar-topic-label">Language Model Fundamentals</div>',
      sbPhase('lmi1','Fase 1 — NLP Klasik','lmfi1',[
        ['lm1a','1.1 NLP Klasik'],
        ['lm1b','1.2 Representasi Teks'],
        ['lm1c','1.3 Word Embeddings'],
        ['lm1d','1.4 Language Modeling Klasik'],
        ['lm1e','1.5 Subword Tokenization'],
        ['lm1f','1.6 Evaluasi NLP']
      ]),
      sbPhase('lmi2','Fase 2 — Neural Network','lmfi2',[
        ['lm2a','2.1 Fondasi Neural Network'],
        ['lm2b','2.2 CNN untuk Teks'],
        ['lm2c','2.3 RNN & Vanishing Gradient'],
        ['lm2d','2.4 LSTM & GRU'],
        ['lm2e','2.5 Seq2Seq & Encoder-Decoder'],
        ['lm2f','2.6 Regularisasi & Training']
      ]),
      sbPhase('lmi3','Fase 3 — Transformer','lmfi3',[
        ['lm3a','3.1 Attention Mechanism'],
        ['lm3b','3.2 Self-Attention'],
        ['lm3c','3.3 Multi-Head & Positional Encoding'],
        ['lm3d','3.4 Arsitektur Transformer'],
        ['lm3e','3.5 Varian Transformer']
      ]),
      sbPhase('lmi4','Fase 4 — LLM','lmfi4',[
        ['lm4a','4.1 Pre-training LLM'],
        ['lm4b','4.2 BERT — Encoder LLM'],
        ['lm4c','4.3 GPT — Decoder LLM'],
        ['lm4d','4.4 Fine-tuning Strategies'],
        ['lm4e','4.5 RLHF & Alignment']
      ]),
      sbPhase('lmi5','Fase 5 — Scaling & Produksi','lmfi5',[
        ['lm5a','5.1 Scaling Laws'],
        ['lm5b','5.2 Mixture of Experts'],
        ['lm5c','5.3 Inference Optimization'],
        ['lm5d','5.4 Multimodal LLM'],
        ['lm5e','5.5 Memilih LLM yang Tepat']
      ])
    ].join('');
  }
  // rebind accordion events
  document.querySelectorAll('.sph').forEach(function(h){
    h.onclick = function(){
      var items = document.getElementById(h.dataset.target);
      var fi = h.dataset.fi;
      var wasOpen = items.classList.contains('open');
      document.querySelectorAll('.sits').forEach(function(i){i.classList.remove('open');});
      document.querySelectorAll('.sph').forEach(function(p){p.classList.remove('active');});
      if (!wasOpen){
        items.classList.add('open');
        h.classList.add('active');
        if (fi) loadFase(h.dataset.faseId).then(function(){ goToPage(fi); });
      }
    };
  });
  // rebind topic links
  document.querySelectorAll('.sit').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var id = a.getAttribute('href').replace('#','');
      var allTopics = activeCurriculum === 'language-model' ? LM_TOPICS : TOPICS;
      var idx = allTopics.indexOf(id);
      if (idx >= 0) goTo(idx);
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('open');
    });
  });
}

function sbPhase(id, label, fi, items) {
  var faseId = id; // accordion id doubles as faseId key
  var links = items.map(function(it){
    return '<a class="sit" href="#'+it[0]+'">'+it[1]+'</a>';
  }).join('');
  return '<div class="sph" data-target="'+id+'" data-fi="'+fi+'" data-fase-id="'+faseId+'">'
    +'<span>'+label+'</span>'
    +'<svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
    +'</div>'
    +'<div class="sits" id="'+id+'">'+links+'</div>';
}

function sbGlossary() {
  return '<div style="padding:4px 16px 2px;"><a class="sit" style="display:block;padding:5px 0;font-size:11px;color:var(--text3);" href="#glossary" onclick="goToPage(\'glossary\');return false;">📖 Glosarium</a></div>';
}

// ── AGENTIC AI Topics ─────────────────────────────────────────────────────────
var TOPICS = [
  's0a',
  's1a','s1b','s1c','s1d','s1e','s1f','s1g','s1h','s1i',
  's2a','s2b','s2c','s2d','s2e','s2f','s2g','s2h','s2i','s2j',
  's3a','s3b','s3c','s3d','s3e','s3f','s3g',
  's4a','s4b','s4c','s4d','s4e','s4f','s4g','s4h','s4i','s4j','s4k',
  's5a','s5b','s5c','s5d','s5f','s5e'
];

var TOPIC_LABELS = {
  's0a':'0.1 Agent Pertama dalam 5 Menit',
  's1a':'1.1 LLM sebagai Reasoning Engine','s1b':'1.2 Agent vs Chatbot vs Pipeline','s1c':'1.3 ReAct, CoT, & ToT Patterns','s1d':'1.4 Tool Calling Fundamentals','s1e':'1.5 Autonomy Spectrum','s1f':'1.6 KV Cache & Prompt Caching','s1g':'1.7 Token Counting & Context Budget','s1h':'1.8 System Prompt Engineering','s1i':'1.9 Prompt Injection & Adversarial Input',
  's2a':'2.1 Agent Harness & Orchestration Loop','s2b':'2.2 Memory Systems','s2c':'2.3 Tool Registry & Schema Design','s2d':'2.4 Context Management','s2e':'2.5 Planning & Task Decomposition','s2f':'2.6 Structured Output & Robust Parsing','s2g':'2.7 RAG & Semantic Retrieval','s2h':'2.8 Agent Checkpointing & Resume','s2i':'2.9 Streaming Response Handling','s2j':'2.10 Session & Conversation Management',
  's3a':'3.1 Orchestrator-Subagent Pattern','s3b':'3.2 Parallelism & Fan-Out/Fan-In','s3c':'3.3 MCP — Model Context Protocol','s3d':'3.4 Agent Design Patterns','s3e':'3.5 Komunikasi & State Sharing','s3f':'3.6 Agent Handoff & Trust Boundary','s3g':'3.7 Agent-to-Agent Protocol & Negotiation',
  's4a':'4.1 Error Handling & Retry Strategies','s4b':'4.2 Observability & Distributed Tracing','s4c':'4.3 Latency & Cost Optimization','s4d':'4.4 Safety & Guardrails','s4e':'4.5 Testing & Evals Framework','s4f':'4.6 Rate Limiting & Backpressure','s4g':'4.7 Deployment Patterns','s4h':'4.8 Context Engineering','s4i':'4.9 Agent Evaluation Taxonomy','s4j':'4.10 Production Checklist','s4k':'4.11 CI/CD & Prompt Versioning',
  's5a':'5.1 Bedah Arsitektur OpenClaw','s5b':'5.2 Computer Use Agent','s5c':'5.3 Coding Agent Architecture','s5d':'5.4 Framework Landscape 2026','s5f':'5.5 Voice & Multimodal Agent','s5e':'5.6 Checklist Keahlian Agent Engineer'
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
var PHASE_LAST  = {0:'fi1', 9:'fi2', 19:'fi3', 26:'fi4', 37:'fi5'};
var PHASE_FIRST = {0:'home', 1:'fi1', 10:'fi2', 20:'fi3', 27:'fi4', 38:'fi5'};
var PAGE_LABELS = {'home':'Beranda','fi0':'Fase 0 — Mulai Cepat','fi1':'Fase 1 — Fondasi','fi2':'Fase 2 — Architecture','fi3':'Fase 3 — Multi-Agent','fi4':'Fase 4 — Production','fi5':'Fase 5 — Build Agent'};
var PHASE_INTRO_MAP = {'i0':'fi0','i1':'fi1','i2':'fi2','i3':'fi3','i4':'fi4','i5':'fi5'};

// ── LANGUAGE MODEL Topics ─────────────────────────────────────────────────────
var LM_TOPICS = [
  'lm1a','lm1b','lm1c','lm1d','lm1e','lm1f',
  'lm2a','lm2b','lm2c','lm2d','lm2e','lm2f',
  'lm3a','lm3b','lm3c','lm3d','lm3e',
  'lm4a','lm4b','lm4c','lm4d','lm4e',
  'lm5a','lm5b','lm5c','lm5d','lm5e'
];

var LM_TOPIC_LABELS = {
  'lm1a':'1.1 NLP Klasik','lm1b':'1.2 Representasi Teks','lm1c':'1.3 Word Embeddings','lm1d':'1.4 Language Modeling Klasik','lm1e':'1.5 Subword Tokenization','lm1f':'1.6 Evaluasi NLP',
  'lm2a':'2.1 Fondasi Neural Network','lm2b':'2.2 CNN untuk Teks','lm2c':'2.3 RNN & Vanishing Gradient','lm2d':'2.4 LSTM & GRU','lm2e':'2.5 Seq2Seq & Encoder-Decoder','lm2f':'2.6 Regularisasi & Training',
  'lm3a':'3.1 Attention Mechanism','lm3b':'3.2 Self-Attention','lm3c':'3.3 Multi-Head & Positional Encoding','lm3d':'3.4 Arsitektur Transformer','lm3e':'3.5 Varian Transformer',
  'lm4a':'4.1 Pre-training LLM','lm4b':'4.2 BERT — Encoder LLM','lm4c':'4.3 GPT — Decoder LLM','lm4d':'4.4 Fine-tuning Strategies','lm4e':'4.5 RLHF & Alignment',
  'lm5a':'5.1 Scaling Laws','lm5b':'5.2 Mixture of Experts','lm5c':'5.3 Inference Optimization','lm5d':'5.4 Multimodal LLM','lm5e':'5.5 Memilih LLM yang Tepat'
};

var LM_PHASE_MAP = {
  'lm1a':'lmi1','lm1b':'lmi1','lm1c':'lmi1','lm1d':'lmi1','lm1e':'lmi1','lm1f':'lmi1',
  'lm2a':'lmi2','lm2b':'lmi2','lm2c':'lmi2','lm2d':'lmi2','lm2e':'lmi2','lm2f':'lmi2',
  'lm3a':'lmi3','lm3b':'lmi3','lm3c':'lmi3','lm3d':'lmi3','lm3e':'lmi3',
  'lm4a':'lmi4','lm4b':'lmi4','lm4c':'lmi4','lm4d':'lmi4','lm4e':'lmi4',
  'lm5a':'lmi5','lm5b':'lmi5','lm5c':'lmi5','lm5d':'lmi5','lm5e':'lmi5'
};
var LM_PHASE_NUMS = {'lmi1':'1','lmi2':'2','lmi3':'3','lmi4':'4','lmi5':'5'};
var LM_PHASE_LAST  = {5:'lmfi2', 11:'lmfi3', 16:'lmfi4', 21:'lmfi5'};
var LM_PHASE_FIRST = {0:'lmhome', 6:'lmfi2', 12:'lmfi3', 17:'lmfi4', 22:'lmfi5'};
var LM_PAGE_LABELS = {'lmhome':'Beranda LM','lmfi1':'Fase 1 — NLP Klasik','lmfi2':'Fase 2 — Neural Network','lmfi3':'Fase 3 — Transformer','lmfi4':'Fase 4 — LLM','lmfi5':'Fase 5 — Scaling & Produksi'};
var LM_PHASE_INTRO_MAP = {'lmi1':'lmfi1','lmi2':'lmfi2','lmi3':'lmfi3','lmi4':'lmfi4','lmi5':'lmfi5'};

var currentIdx = 0;

// ── Inject nav bars ───────────────────────────────────────────────────────────
function injectNavBars() {
  var topics, phaseLastMap, phaseFirstMap, pageLabels;
  if (activeCurriculum === 'language-model') {
    topics = LM_TOPICS; phaseLastMap = LM_PHASE_LAST; phaseFirstMap = LM_PHASE_FIRST; pageLabels = LM_PAGE_LABELS;
  } else {
    topics = TOPICS; phaseLastMap = PHASE_LAST; phaseFirstMap = PHASE_FIRST; pageLabels = PAGE_LABELS;
  }

  topics.forEach(function(id, idx) {
    var el = document.getElementById(id);
    if (!el || el.querySelector('.topic-nav')) return;
    var isVeryLast = idx === topics.length - 1;
    var nextPageId = phaseLastMap[idx];
    var prevPageId = phaseFirstMap[idx];

    var nextLabel, nextBtn;
    if (isVeryLast) {
      nextLabel = t('nav.done') || 'Selesai!';
      nextBtn = '<button class="tnbtn primary" onclick="showLanding()">'+(t('nav.back-all')||'Kembali ke Semua Topik')+' ↺</button>';
    } else if (nextPageId) {
      nextLabel = pageLabels[nextPageId] || nextPageId;
      nextBtn = '<button class="tnbtn primary" onclick="goToPage(\''+nextPageId+'\')">'+(t('nav.next')||'Selanjutnya →')+'</button>';
    } else {
      nextLabel = (activeCurriculum === 'language-model' ? LM_TOPIC_LABELS : TOPIC_LABELS)[topics[idx+1]] || '';
      nextBtn = '<button class="tnbtn primary next-btn-t" data-idx="'+idx+'">'+(t('nav.next')||'Selanjutnya →')+'</button>';
    }

    var prevBtn;
    if (prevPageId === 'home' || prevPageId === 'lmhome') {
      prevBtn = '<button class="tnbtn" onclick="showLanding()">← '+(t('sidebar.back')||'Semua Topik')+'</button>';
    } else if (prevPageId) {
      prevBtn = '<button class="tnbtn" onclick="goToPage(\''+prevPageId+'\')">'+(t('nav.prev')||'← Sebelumnya')+'</button>';
    } else if (idx > 0) {
      prevBtn = '<button class="tnbtn prev-btn" data-idx="'+idx+'">'+(t('nav.prev')||'← Sebelumnya')+'</button>';
    } else {
      prevBtn = '<button class="tnbtn" disabled>'+(t('nav.prev')||'← Sebelumnya')+'</button>';
    }

    var nav = document.createElement('div');
    nav.className = 'topic-nav';
    nav.innerHTML =
      '<div class="topic-nav-info">'
      + '<div class="topic-nav-counter">'+(t('nav.topic')||'Topik')+' '+(idx+1)+' / '+topics.length+'</div>'
      + '<div class="topic-nav-title">'+nextLabel+'</div>'
      + '</div>'
      + '<div class="topic-nav-btns">'+prevBtn+nextBtn+'</div>';
    el.appendChild(nav);
  });
}

// ── hideAll ───────────────────────────────────────────────────────────────────
var AA_PAGES = ['glossary','fi0','fi1','fi2','fi3','fi4','fi5'];
var LM_PAGES = ['lmfi1','lmfi2','lmfi3','lmfi4','lmfi5'];

function hideAll() {
  var allPageIds = AA_PAGES.concat(LM_PAGES);
  allPageIds.forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.classList.remove('page-home--active'); el.classList.remove('fase-intro--active'); }
  });
  TOPICS.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.remove('sub--active');
  });
  LM_TOPICS.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.remove('sub--active');
  });
  document.querySelectorAll('.cs').forEach(function(s){ s.style.display='none'; });
}

// ── goToPage ──────────────────────────────────────────────────────────────────
var HOME_PAGE_IDS = ['glossary'];

function goToPage(pageId) {
  // cari fase yang harus di-load untuk page ini
  var faseId = null;
  Object.keys(PHASE_INTRO_MAP).forEach(function(k){ if (PHASE_INTRO_MAP[k] === pageId) faseId = k; });
  Object.keys(LM_PHASE_INTRO_MAP).forEach(function(k){ if (LM_PHASE_INTRO_MAP[k] === pageId) faseId = k; });

  if (faseId) {
    loadFase(faseId).then(function(){ _showPage(pageId); });
  } else {
    _showPage(pageId);
  }
}

function _showPage(pageId) {
  hideAll();
  var el = document.getElementById(pageId);
  if (!el) return;
  if (HOME_PAGE_IDS.indexOf(pageId) !== -1) {
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

// ── goTo ──────────────────────────────────────────────────────────────────────
function goTo(idx) {
  var topics = activeCurriculum === 'language-model' ? LM_TOPICS : TOPICS;
  var phaseMap = activeCurriculum === 'language-model' ? LM_PHASE_MAP : PHASE_MAP;
  var phaseNums = activeCurriculum === 'language-model' ? LM_PHASE_NUMS : PHASE_NUMS;
  var phaseIntroMap = activeCurriculum === 'language-model' ? LM_PHASE_INTRO_MAP : PHASE_INTRO_MAP;

  if (idx < 0 || idx >= topics.length) return;
  var nextId = topics[idx];
  var faseId = phaseMap[nextId];

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
      if (pv) pv.textContent = phaseNums[faseId]||'1';
    }

    el.querySelectorAll('.cbar-fill').forEach(function(bar){
      var tw = bar.style.getPropertyValue('--tw') || bar.getAttribute('data-tw');
      if (!bar.getAttribute('data-tw')) bar.setAttribute('data-tw', bar.style.width||tw);
      bar.style.width='0';
      setTimeout(function(){ bar.style.transition='width 1.2s cubic-bezier(.4,0,.2,1)'; bar.style.width=bar.getAttribute('data-tw')||tw; },80);
    });
  });
}

// ── Button delegation (prev/next) ─────────────────────────────────────────────
document.addEventListener('click', function(e){
  var pb = e.target.closest('.prev-btn');
  var nb = e.target.closest('.next-btn-t');
  if (pb) goTo(parseInt(pb.dataset.idx)-1);
  if (nb) goTo(parseInt(nb.dataset.idx)+1);
});

// ── Init ──────────────────────────────────────────────────────────────────────
function enterCurriculum(id, label) {
  activeCurriculum = id;
  document.getElementById('landing').classList.remove('landing--active');
  document.getElementById('sidebar').classList.remove('sidebar--hidden');
  document.getElementById('layout').classList.remove('layout--no-sidebar');
  renderSidebar(id);
  document.getElementById('header-sub').textContent = label;
}

(function(){
  var hash = location.hash.replace('#','');
  document.querySelectorAll('.cs').forEach(function(s){ s.style.display='none'; });

  var lmTopicIdx = LM_TOPICS.indexOf(hash);
  var aaTopicIdx = TOPICS.indexOf(hash);

  if (!hash || hash === 'landing') {
    document.getElementById('landing').classList.add('landing--active');
    document.getElementById('sidebar').classList.add('sidebar--hidden');
  } else if (lmTopicIdx >= 0) {
    enterCurriculum('language-model','Language Model Fundamentals');
    goTo(lmTopicIdx);
  } else if (LM_PAGES.indexOf(hash) >= 0) {
    enterCurriculum('language-model','Language Model Fundamentals');
    var lmFaseId = null;
    Object.keys(LM_PHASE_INTRO_MAP).forEach(function(k){ if (LM_PHASE_INTRO_MAP[k]===hash) lmFaseId=k; });
    if (lmFaseId) loadFase(lmFaseId).then(function(){ goToPage(hash); });
    else goToPage(hash);
  } else if (aaTopicIdx >= 0) {
    enterCurriculum('agentic-ai','Agentic AI Mastery');
    goTo(aaTopicIdx);
  } else if (AA_PAGES.indexOf(hash) >= 0) {
    enterCurriculum('agentic-ai','Agentic AI Mastery');
    var faseId = null;
    Object.keys(PHASE_INTRO_MAP).forEach(function(k){ if (PHASE_INTRO_MAP[k]===hash) faseId=k; });
    if (faseId) loadFase(faseId).then(function(){ goToPage(hash); });
    else goToPage(hash);
  } else {
    document.getElementById('landing').classList.add('landing--active');
    document.getElementById('sidebar').classList.add('sidebar--hidden');
  }
})();
