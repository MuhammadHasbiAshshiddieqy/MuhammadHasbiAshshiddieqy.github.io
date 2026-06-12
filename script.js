// ── State kurikulum aktif ─────────────────────────────────────────────────────
var activeCurriculum = null; // 'agentic-ai' | 'language-model'

// ── Canvas HiDPI helper ───────────────────────────────────────────────────────
function fixCanvasDPI(canvas, logicalW, logicalH) {
  var dpr = window.devicePixelRatio || 1;
  canvas.width = logicalW * dpr;
  canvas.height = logicalH * dpr;
  canvas.style.width = logicalW + 'px';
  canvas.style.height = logicalH + 'px';
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx: ctx, W: logicalW, H: logicalH };
}

// ── Lazy-load (Agentic AI) ────────────────────────────────────────────────────
var FASE_FILES = {
  'i0':'topics/agentic-ai/fase0.html', 'i1':'topics/agentic-ai/fase1.html', 'i2':'topics/agentic-ai/fase2.html',
  'i3':'topics/agentic-ai/fase3.html', 'i4':'topics/agentic-ai/fase4.html', 'i5':'topics/agentic-ai/fase5.html'
};
var FASE_CONTAINERS = {
  'i0':'fase0-container','i1':'fase1-container','i2':'fase2-container',
  'i3':'fase3-container','i4':'fase4-container','i5':'fase5-container'
};

// ── Lazy-load (MLOps) ────────────────────────────────────────────────────────
var MLOPS_FASE_FILES = {
  'mlopsi1':'topics/mlops/fase1.html', 'mlopsi2':'topics/mlops/fase2.html',
  'mlopsi3':'topics/mlops/fase3.html', 'mlopsi4':'topics/mlops/fase4.html',
  'mlopsi5':'topics/mlops/fase5.html'
};
var MLOPS_FASE_CONTAINERS = {
  'mlopsi1':'mlopsfase1-container','mlopsi2':'mlopsfase2-container','mlopsi3':'mlopsfase3-container',
  'mlopsi4':'mlopsfase4-container','mlopsi5':'mlopsfase5-container'
};

// ── Lazy-load (AI Fundamentals) ──────────────────────────────────────────────
var AIF_FASE_FILES = {
  'aif0':'topics/ai-fundamentals/fase0.html', 'aif1':'topics/ai-fundamentals/fase1.html',
  'aif2':'topics/ai-fundamentals/fase2.html', 'aif3':'topics/ai-fundamentals/fase3.html',
  'aif4':'topics/ai-fundamentals/fase4.html', 'aif5':'topics/ai-fundamentals/fase5.html'
};
var AIF_FASE_CONTAINERS = {
  'aif0':'aiffase0-container','aif1':'aiffase1-container','aif2':'aiffase2-container',
  'aif3':'aiffase3-container','aif4':'aiffase4-container','aif5':'aiffase5-container'
};

// ── Lazy-load (Computer Vision) ──────────────────────────────────────────────
var CV_FASE_FILES = {
  'cvi0':'topics/computer-vision/fase0.html', 'cvi1':'topics/computer-vision/fase1.html',
  'cvi2':'topics/computer-vision/fase2.html', 'cvi3':'topics/computer-vision/fase3.html',
  'cvi4a':'topics/computer-vision/fase4a.html', 'cvi4b':'topics/computer-vision/fase4b.html',
  'cvi5':'topics/computer-vision/fase5.html'
};
var CV_FASE_CONTAINERS = {
  'cvi0':'cvfase0-container','cvi1':'cvfase1-container','cvi2':'cvfase2-container',
  'cvi3':'cvfase3-container','cvi4a':'cvfase4a-container','cvi4b':'cvfase4b-container',
  'cvi5':'cvfase5-container'
};

// ── Lazy-load (Language Model) ────────────────────────────────────────────────
var LM_FASE_FILES = {
  'lmi1':'topics/language-model/fase1.html', 'lmi2':'topics/language-model/fase2.html',
  'lmi3':'topics/language-model/fase3.html', 'lmi4':'topics/language-model/fase4.html',
  'lmi5':'topics/language-model/fase5.html', 'lmi6':'topics/language-model/fase6.html'
};
var LM_FASE_CONTAINERS = {
  'lmi1':'lmfase1-container','lmi2':'lmfase2-container','lmi3':'lmfase3-container',
  'lmi4':'lmfase4-container','lmi5':'lmfase5-container','lmi6':'lmfase6-container'
};

var loadedFases = {};

function loadFase(faseId) {
  if (loadedFases[faseId]) return loadedFases[faseId];
  var files = (activeCurriculum === 'language-model') ? LM_FASE_FILES : FASE_FILES;
  var containers = (activeCurriculum === 'language-model') ? LM_FASE_CONTAINERS : FASE_CONTAINERS;
  // cek kedua map karena faseId bisa dari salah satu
  var file = AIF_FASE_FILES[faseId] || MLOPS_FASE_FILES[faseId] || LM_FASE_FILES[faseId] || CV_FASE_FILES[faseId] || FASE_FILES[faseId];
  var containerId = AIF_FASE_CONTAINERS[faseId] || MLOPS_FASE_CONTAINERS[faseId] || LM_FASE_CONTAINERS[faseId] || CV_FASE_CONTAINERS[faseId] || FASE_CONTAINERS[faseId];
  if (!file || !containerId) return Promise.resolve();
  var container = document.getElementById(containerId);
  if (!container) return Promise.resolve();
  loadedFases[faseId] = fetch(file)
    .then(function(r){ return r.text(); })
    .then(function(html){
      var scripts = [];
      var cleaned = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, function(_, code) {
        scripts.push(code);
        return '';
      });
      container.innerHTML = cleaned;
      injectNavBars();
      setTimeout(function() {
        scripts.forEach(function(code) {
          var s = document.createElement('script');
          s.textContent = code;
          document.body.appendChild(s);
          document.body.removeChild(s);
        });
      }, 0);
    })
    .catch(function(err) {
      console.error('Gagal load fase:', file, err);
    });
  return loadedFases[faseId];
}

// ── Sidebar toggle ────────────────────────────────────────────────────────────
function toggleSB(){
  var s=document.getElementById('sidebar'),o=document.getElementById('overlay'),l=document.getElementById('layout');
  if(window.innerWidth<=768){
    s.classList.toggle('open');o.classList.toggle('open');
  } else {
    var isCollapsed=s.classList.toggle('collapsed');
    l.classList.toggle('layout--no-sidebar',isCollapsed);
  }
}

// ── Curriculum open/close ─────────────────────────────────────────────────────
function openCurriculum(id) {
  var label = id === 'language-model' ? 'Language Model Fundamentals'
    : id === 'mlops' ? 'MLOps & Model Deployment'
    : id === 'ai-fundamentals' ? 'AI Fundamentals dari Nol'
    : id === 'computer-vision' ? 'Computer Vision Mastery'
    : 'Agentic AI Mastery';
  enterCurriculum(id, label);
  var firstFase = id === 'language-model' ? 'lmi1' : id === 'mlops' ? 'mlopsi1' : id === 'ai-fundamentals' ? 'aif0' : id === 'computer-vision' ? 'cvi0' : 'i0';
  var startPage = id === 'language-model' ? 'lmfi1' : id === 'mlops' ? 'mlopsfi1' : id === 'ai-fundamentals' ? 'aifi0' : id === 'computer-vision' ? 'cvfi0' : 'fi0';
  loadFase(firstFase).then(function(){ goToPage(startPage); });
}

function showLanding() {
  activeCurriculum = null;
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('overlay');
  // Sembunyikan sidebar & overlay sekaligus
  sb.classList.remove('open');
  sb.classList.add('sidebar--hidden');
  ov.classList.remove('open');
  ov.style.display = 'none';
  hideAll();
  document.getElementById('landing').classList.add('landing--active');
  document.getElementById('layout').classList.add('layout--no-sidebar');
  document.getElementById('header-sub').innerHTML = (typeof t === 'function' ? t('header.sub') : 'Open Knowledge — AI &amp; Engineering');
  history.replaceState(null,'','#');
  document.querySelector('.main').scrollTo({top:0});
  document.querySelectorAll('.cs').forEach(function(s){ s.style.display='none'; });
  var ham = document.querySelector('.ham');
  if (ham) ham.classList.remove('ham--visible');
}

// ── Sidebar dinamis ───────────────────────────────────────────────────────────
function renderSidebar(curriculum) {
  var sc = document.getElementById('sidebar-content');
  if (curriculum === 'ai-fundamentals') {
    sc.innerHTML = [
      '<div class="sidebar-topic-label">AI Fundamentals dari Nol</div>',
      sbPhase('aif0','Fase 0 — Pengenalan AI','aifi0',[
        ['aif0a','0.1 Apa itu AI?'],
        ['aif0b','0.2 AI vs ML vs Deep Learning'],
        ['aif0c','0.3 Cara Mesin Belajar'],
        ['aif0d','0.4 Tiga Jenis Pembelajaran']
      ]),
      sbPhase('aif1','Fase 1 — ML Klasik','aifi1',[
        ['aif1a','1.1 Linear Regression'],
        ['aif1b','1.2 Logistic Regression'],
        ['aif1c','1.3 Decision Tree'],
        ['aif1d','1.4 Random Forest'],
        ['aif1e','1.5 SVM']
      ]),
      sbPhase('aif2','Fase 2 — Neural Networks','aifi2',[
        ['aif2a','2.1 Neuron Tiruan'],
        ['aif2b','2.2 Activation Functions'],
        ['aif2c','2.3 Backpropagation'],
        ['aif2d','2.4 ANN Interaktif']
      ]),
      sbPhase('aif3','Fase 3 — CNN','aifi3',[
        ['aif3a','3.1 Konvolusi & Filter'],
        ['aif3b','3.2 Feature Maps'],
        ['aif3c','3.3 Pooling'],
        ['aif3d','3.4 Arsitektur CNN']
      ]),
      sbPhase('aif4','Fase 4 — RNN & LSTM','aifi4',[
        ['aif4a','4.1 RNN & Vanishing Gradient'],
        ['aif4b','4.2 LSTM Memory Cell'],
        ['aif4c','4.3 Seq2Seq & Aplikasi']
      ]),
      sbPhase('aif5','Fase 5 — Transformer & LLM','aifi5',[
        ['aif5a','5.1 Attention Mechanism'],
        ['aif5b','5.2 Arsitektur Transformer'],
        ['aif5c','5.3 LLM & Pre-training'],
        ['aif5d','5.4 Peta Model Modern'],
        ['aif5e','5.5 Dari Sini, Ke Mana?']
      ])
    ].join('');
  } else if (curriculum === 'agentic-ai') {
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
        ['s5g','5.6 VLM Reasoning Engine'],
        ['s5h','5.7 Multimodal Tool Calling'],
        ['s5i','5.8 Vision Pipeline Orchestration'],
        ['s5e','5.9 Checklist Keahlian']
      ]),
      sbGlossary()
    ].join('');
  } else if (curriculum === 'mlops') {
    sc.innerHTML = [
      '<div class="sidebar-topic-label">MLOps & Model Deployment</div>',
      sbPhase('mlopsi1','Fase 1 — ML Pipeline','mlopsfi1',[
        ['mlops1z','1.0 Data Quality & Validation'],
        ['mlops1a','1.1 Kenapa MLOps?'],
        ['mlops1b','1.2 Data Versioning (DVC)'],
        ['mlops1c','1.3 Experiment Tracking (MLflow)'],
        ['mlops1d','1.4 Model Registry'],
        ['mlops1e','1.5 Pipeline Orchestration']
      ]),
      sbPhase('mlopsi2','Fase 2 — Model Serving','mlopsfi2',[
        ['mlops2a','2.1 Serving Fundamentals'],
        ['mlops2b','2.2 FastAPI untuk ML'],
        ['mlops2c','2.3 Triton Inference Server'],
        ['mlops2d','2.4 Model Optimization'],
        ['mlops2e','2.5 Serving Patterns']
      ]),
      sbPhase('mlopsi3','Fase 3 — Infrastructure','mlopsfi3',[
        ['mlops3a','3.1 Docker untuk ML'],
        ['mlops3b','3.2 Kubernetes untuk ML'],
        ['mlops3c','3.3 Ray Distributed'],
        ['mlops3d','3.4 Feature Store'],
        ['mlops3e','3.5 Cloud ML Platforms']
      ]),
      sbPhase('mlopsi4','Fase 4 — Monitoring','mlopsfi4',[
        ['mlops4a','4.1 ML Monitoring Fundamentals'],
        ['mlops4b','4.2 Evidently AI'],
        ['mlops4c','4.3 Prometheus & Grafana'],
        ['mlops4d','4.4 Alerting & Incident Response'],
        ['mlops4e','4.5 Retraining Triggers'],
        ['mlops4f','4.6 A/B Testing untuk ML'],
        ['mlops4g','4.7 Feedback Loops']
      ]),
      sbPhase('mlopsi5','Fase 5 — CI/CD & Checklist','mlopsfi5',[
        ['mlops5a','5.1 CI/CD untuk ML'],
        ['mlops5b','5.2 Model Testing Strategies'],
        ['mlops5c','5.3 Deployment Strategies'],
        ['mlops5d','5.4 Cost Optimization'],
        ['mlops5e','5.5 MLOps Maturity & Checklist']
      ])
    ].join('');
  } else if (curriculum === 'computer-vision') {
    sc.innerHTML = [
      '<div class="sidebar-topic-label">Computer Vision Mastery</div>',
      sbPhase('cvi0','Fase 0 — Pengenalan CV','cvfi0',[
        ['cv0a','0.1 Pengenalan Computer Vision']
      ]),
      sbPhase('cvi1','Fase 1 — Image Processing','cvfi1',[
        ['cv1a','1.1 Representasi Gambar & Piksel'],
        ['cv1b','1.2 Filter & Konvolusi Klasik'],
        ['cv1c','1.3 Edge Detection'],
        ['cv1d','1.4 Transformasi Geometris'],
        ['cv1e','1.5 Color Spaces & Histograms']
      ]),
      sbPhase('cvi2','Fase 2 — Deep Learning CV','cvfi2',[
        ['cv2a','2.1 CNN untuk Vision'],
        ['cv2b','2.2 Transfer Learning'],
        ['cv2c','2.3 Vision Transformer (ViT)'],
        ['cv2d','2.4 Data Augmentation'],
        ['cv2e','2.5 Loss Functions'],
        ['cv2f','2.6 Model Evaluation']
      ]),
      sbPhase('cvi3','Fase 3 — Detection & Segmentation','cvfi3',[
        ['cv3a','3.1 Object Detection Fundamentals'],
        ['cv3b','3.2 YOLO Family'],
        ['cv3c','3.3 Semantic Segmentation'],
        ['cv3d','3.4 Instance Segmentation'],
        ['cv3e','3.5 Keypoint & Pose Estimation']
      ]),
      sbPhase('cvi4a','Fase 4A — Vision Systems','cvfi4a',[
        ['cv4aa','4A.1 Model Optimization'],
        ['cv4ab','4A.2 Quantization & TensorRT'],
        ['cv4ac','4A.3 ONNX Deployment'],
        ['cv4ad','4A.4 Edge Deployment'],
        ['cv4ae','4A.5 Real-time Pipeline']
      ]),
      sbPhase('cvi4b','Fase 4B — Generative CV','cvfi4b',[
        ['cv4ba','4B.1 CLIP & VLM'],
        ['cv4bb','4B.2 Diffusion Models'],
        ['cv4bc','4B.3 Stable Diffusion'],
        ['cv4bd','4B.4 Image Editing'],
        ['cv4be','4B.5 Video Generation']
      ]),
      sbPhase('cvi5','Fase 5 — Production','cvfi5',[
        ['cv5a','5.1 CV System Design'],
        ['cv5b','5.2 Serving Vision Models'],
        ['cv5c','5.3 Monitoring & Drift'],
        ['cv5d','5.4 Anotasi & Active Learning'],
        ['cv5e','5.5 Checklist CV Engineer']
      ])
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
        ['lm4z','4.0 Data Curation untuk Pre-training'],
        ['lm4a','4.1 Pre-training LLM'],
        ['lm4b','4.2 BERT — Encoder LLM'],
        ['lm4c','4.3 GPT — Decoder LLM'],
        ['lm4d','4.4 Fine-tuning Strategies'],
        ['lm4e','4.5 RLHF & Alignment'],
        ['lm4f','4.6 LLM Evaluation']
      ]),
      sbPhase('lmi5','Fase 5 — Scaling & Produksi','lmfi5',[
        ['lm5a','5.1 Scaling Laws'],
        ['lm5b','5.2 Mixture of Experts'],
        ['lm5c','5.3 Inference Optimization'],
        ['lm5d','5.4 Multimodal LLM'],
        ['lm5e','5.5 Memilih LLM yang Tepat'],
        ['lm5f','5.6 Distributed Training']
      ]),
      sbPhase('lmi6','Fase 6 — Generative AI in Practice','lmfi6',[
        ['lm6a','6.1 Prompt Engineering'],
        ['lm6b','6.2 RAG'],
        ['lm6c','6.3 Function Calling'],
        ['lm6d','6.4 LLM Application Dev'],
        ['lm6e','6.5 Guardrails & Eval'],
        ['lm6f','6.6 LLM in Production']
      ])
    ].join('');
  }
  // rebind accordion events
  document.querySelectorAll('.sph').forEach(function(h){
    h.onclick = function(){
      var items = document.getElementById(h.dataset.target);
      if (!items) return;
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
      var allTopics = activeCurriculum === 'language-model' ? LM_TOPICS : activeCurriculum === 'mlops' ? MLOPS_TOPICS : activeCurriculum === 'ai-fundamentals' ? AIF_TOPICS : activeCurriculum === 'computer-vision' ? CV_TOPICS : TOPICS;
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

// ── AI FUNDAMENTALS Topics ────────────────────────────────────────────────────
var AIF_TOPICS = [
  'aif0a','aif0b','aif0c','aif0d',
  'aif1a','aif1b','aif1c','aif1d','aif1e',
  'aif2a','aif2b','aif2c','aif2d',
  'aif3a','aif3b','aif3c','aif3d',
  'aif4a','aif4b','aif4c',
  'aif5a','aif5b','aif5c','aif5d','aif5e'
];
var AIF_TOPIC_LABELS = {
  'aif0a':'0.1 Apa itu AI?','aif0b':'0.2 AI vs ML vs Deep Learning','aif0c':'0.3 Cara Mesin Belajar','aif0d':'0.4 Tiga Jenis Pembelajaran',
  'aif1a':'1.1 Linear Regression','aif1b':'1.2 Logistic Regression','aif1c':'1.3 Decision Tree','aif1d':'1.4 Random Forest','aif1e':'1.5 SVM',
  'aif2a':'2.1 Neuron Tiruan','aif2b':'2.2 Activation Functions','aif2c':'2.3 Backpropagation','aif2d':'2.4 ANN Interaktif',
  'aif3a':'3.1 Konvolusi & Filter','aif3b':'3.2 Feature Maps','aif3c':'3.3 Pooling','aif3d':'3.4 Arsitektur CNN',
  'aif4a':'4.1 RNN & Vanishing Gradient','aif4b':'4.2 LSTM Memory Cell','aif4c':'4.3 Seq2Seq & Aplikasi',
  'aif5a':'5.1 Attention Mechanism','aif5b':'5.2 Arsitektur Transformer','aif5c':'5.3 LLM & Pre-training','aif5d':'5.4 Peta Model Modern','aif5e':'5.5 Dari Sini, Ke Mana?'
};
var AIF_PHASE_MAP = {
  'aif0a':'aif0','aif0b':'aif0','aif0c':'aif0','aif0d':'aif0',
  'aif1a':'aif1','aif1b':'aif1','aif1c':'aif1','aif1d':'aif1','aif1e':'aif1',
  'aif2a':'aif2','aif2b':'aif2','aif2c':'aif2','aif2d':'aif2',
  'aif3a':'aif3','aif3b':'aif3','aif3c':'aif3','aif3d':'aif3',
  'aif4a':'aif4','aif4b':'aif4','aif4c':'aif4',
  'aif5a':'aif5','aif5b':'aif5','aif5c':'aif5','aif5d':'aif5','aif5e':'aif5'
};
var AIF_PHASE_NUMS = {'aif0':'0','aif1':'1','aif2':'2','aif3':'3','aif4':'4','aif5':'5'};
var AIF_PHASE_LAST  = {3:'aifi1', 8:'aifi2', 12:'aifi3', 16:'aifi4', 19:'aifi5'};
var AIF_PHASE_FIRST = {0:'aifhome', 4:'aifi1', 9:'aifi2', 13:'aifi3', 17:'aifi4', 20:'aifi5'};
var AIF_PAGE_LABELS = {'aifhome':'Beranda AI Fundamentals','aifi0':'Fase 0 — Pengenalan AI','aifi1':'Fase 1 — ML Klasik','aifi2':'Fase 2 — Neural Networks','aifi3':'Fase 3 — CNN','aifi4':'Fase 4 — RNN & LSTM','aifi5':'Fase 5 — Transformer & LLM'};
var AIF_PHASE_INTRO_MAP = {'aif0':'aifi0','aif1':'aifi1','aif2':'aifi2','aif3':'aifi3','aif4':'aifi4','aif5':'aifi5'};
var AIF_PAGES = ['aifi0','aifi1','aifi2','aifi3','aifi4','aifi5'];

// ── AGENTIC AI Topics ─────────────────────────────────────────────────────────
var TOPICS = [
  's0a',
  's1a','s1b','s1c','s1d','s1e','s1f','s1g','s1h','s1i',
  's2a','s2b','s2c','s2d','s2e','s2f','s2g','s2h','s2i','s2j',
  's3a','s3b','s3c','s3d','s3e','s3f','s3g',
  's4a','s4b','s4c','s4d','s4e','s4f','s4g','s4h','s4i','s4j','s4k',
  's5a','s5b','s5c','s5d','s5f','s5g','s5h','s5i','s5e'
];

var TOPIC_LABELS = {
  's0a':'0.1 Agent Pertama dalam 5 Menit',
  's1a':'1.1 LLM sebagai Reasoning Engine','s1b':'1.2 Agent vs Chatbot vs Pipeline','s1c':'1.3 ReAct, CoT, & ToT Patterns','s1d':'1.4 Tool Calling Fundamentals','s1e':'1.5 Autonomy Spectrum','s1f':'1.6 KV Cache & Prompt Caching','s1g':'1.7 Token Counting & Context Budget','s1h':'1.8 System Prompt Engineering','s1i':'1.9 Prompt Injection & Adversarial Input',
  's2a':'2.1 Agent Harness & Orchestration Loop','s2b':'2.2 Memory Systems','s2c':'2.3 Tool Registry & Schema Design','s2d':'2.4 Context Management','s2e':'2.5 Planning & Task Decomposition','s2f':'2.6 Structured Output & Robust Parsing','s2g':'2.7 RAG & Semantic Retrieval','s2h':'2.8 Agent Checkpointing & Resume','s2i':'2.9 Streaming Response Handling','s2j':'2.10 Session & Conversation Management',
  's3a':'3.1 Orchestrator-Subagent Pattern','s3b':'3.2 Parallelism & Fan-Out/Fan-In','s3c':'3.3 MCP — Model Context Protocol','s3d':'3.4 Agent Design Patterns','s3e':'3.5 Komunikasi & State Sharing','s3f':'3.6 Agent Handoff & Trust Boundary','s3g':'3.7 Agent-to-Agent Protocol & Negotiation',
  's4a':'4.1 Error Handling & Retry Strategies','s4b':'4.2 Observability & Distributed Tracing','s4c':'4.3 Latency & Cost Optimization','s4d':'4.4 Safety & Guardrails','s4e':'4.5 Testing & Evals Framework','s4f':'4.6 Rate Limiting & Backpressure','s4g':'4.7 Deployment Patterns','s4h':'4.8 Context Engineering','s4i':'4.9 Agent Evaluation Taxonomy','s4j':'4.10 Production Checklist','s4k':'4.11 CI/CD & Prompt Versioning',
  's5a':'5.1 Bedah Arsitektur OpenClaw','s5b':'5.2 Computer Use Agent','s5c':'5.3 Coding Agent Architecture','s5d':'5.4 Framework Landscape 2026','s5f':'5.5 Voice & Multimodal Agent','s5g':'5.6 VLM sebagai Reasoning Engine','s5h':'5.7 Multimodal Tool Calling','s5i':'5.8 Vision Pipeline Orchestration','s5e':'5.9 Checklist Keahlian Agent Engineer'
};

var PHASE_MAP = {
  's0a':'i0',
  's1a':'i1','s1b':'i1','s1c':'i1','s1d':'i1','s1e':'i1','s1f':'i1','s1g':'i1','s1h':'i1','s1i':'i1',
  's2a':'i2','s2b':'i2','s2c':'i2','s2d':'i2','s2e':'i2','s2f':'i2','s2g':'i2','s2h':'i2','s2i':'i2','s2j':'i2',
  's3a':'i3','s3b':'i3','s3c':'i3','s3d':'i3','s3e':'i3','s3f':'i3','s3g':'i3',
  's4a':'i4','s4b':'i4','s4c':'i4','s4d':'i4','s4e':'i4','s4f':'i4','s4g':'i4','s4h':'i4','s4i':'i4','s4j':'i4','s4k':'i4',
  's5a':'i5','s5b':'i5','s5c':'i5','s5d':'i5','s5f':'i5','s5g':'i5','s5h':'i5','s5i':'i5','s5e':'i5'
};
var PHASE_NUMS = {'i0':'0','i1':'1','i2':'2','i3':'3','i4':'4','i5':'5'};
var PHASE_LAST  = {0:'fi1', 9:'fi2', 19:'fi3', 26:'fi4', 37:'fi5'};
var PHASE_FIRST = {0:'home', 1:'fi1', 10:'fi2', 20:'fi3', 27:'fi4', 38:'fi5'};
var PAGE_LABELS = {'home':'Beranda','fi0':'Fase 0 — Mulai Cepat','fi1':'Fase 1 — Fondasi','fi2':'Fase 2 — Architecture','fi3':'Fase 3 — Multi-Agent','fi4':'Fase 4 — Production','fi5':'Fase 5 — Build Agent'};
var PHASE_INTRO_MAP = {'i0':'fi0','i1':'fi1','i2':'fi2','i3':'fi3','i4':'fi4','i5':'fi5'};

// ── MLOPS Topics ──────────────────────────────────────────────────────────────
var MLOPS_TOPICS = [
  'mlops1z',
  'mlops1a','mlops1b','mlops1c','mlops1d','mlops1e',
  'mlops2a','mlops2b','mlops2c','mlops2d','mlops2e',
  'mlops3a','mlops3b','mlops3c','mlops3d','mlops3e',
  'mlops4a','mlops4b','mlops4c','mlops4d','mlops4e','mlops4f','mlops4g',
  'mlops5a','mlops5b','mlops5c','mlops5d','mlops5e'
];
var MLOPS_TOPIC_LABELS = {
  'mlops1z':'1.0 Data Quality & Validation',
  'mlops1a':'1.1 Kenapa MLOps?','mlops1b':'1.2 Data Versioning','mlops1c':'1.3 Experiment Tracking','mlops1d':'1.4 Model Registry','mlops1e':'1.5 Pipeline Orchestration',
  'mlops2a':'2.1 Serving Fundamentals','mlops2b':'2.2 FastAPI untuk ML','mlops2c':'2.3 Triton Inference Server','mlops2d':'2.4 Model Optimization','mlops2e':'2.5 Serving Patterns',
  'mlops3a':'3.1 Docker untuk ML','mlops3b':'3.2 Kubernetes untuk ML','mlops3c':'3.3 Ray Distributed','mlops3d':'3.4 Feature Store','mlops3e':'3.5 Cloud ML Platforms',
  'mlops4a':'4.1 ML Monitoring Fundamentals','mlops4b':'4.2 Evidently AI','mlops4c':'4.3 Prometheus & Grafana','mlops4d':'4.4 Alerting & Incident Response','mlops4e':'4.5 Retraining Triggers','mlops4f':'4.6 A/B Testing untuk ML','mlops4g':'4.7 Feedback Loops',
  'mlops5a':'5.1 CI/CD untuk ML','mlops5b':'5.2 Model Testing Strategies','mlops5c':'5.3 Deployment Strategies','mlops5d':'5.4 Cost Optimization','mlops5e':'5.5 MLOps Maturity & Checklist'
};
var MLOPS_PHASE_MAP = {
  'mlops1z':'mlopsi1',
  'mlops1a':'mlopsi1','mlops1b':'mlopsi1','mlops1c':'mlopsi1','mlops1d':'mlopsi1','mlops1e':'mlopsi1',
  'mlops2a':'mlopsi2','mlops2b':'mlopsi2','mlops2c':'mlopsi2','mlops2d':'mlopsi2','mlops2e':'mlopsi2',
  'mlops3a':'mlopsi3','mlops3b':'mlopsi3','mlops3c':'mlopsi3','mlops3d':'mlopsi3','mlops3e':'mlopsi3',
  'mlops4a':'mlopsi4','mlops4b':'mlopsi4','mlops4c':'mlopsi4','mlops4d':'mlopsi4','mlops4e':'mlopsi4','mlops4f':'mlopsi4','mlops4g':'mlopsi4',
  'mlops5a':'mlopsi5','mlops5b':'mlopsi5','mlops5c':'mlopsi5','mlops5d':'mlopsi5','mlops5e':'mlopsi5'
};
var MLOPS_PHASE_NUMS = {'mlopsi1':'1','mlopsi2':'2','mlopsi3':'3','mlopsi4':'4','mlopsi5':'5'};
var MLOPS_PHASE_LAST  = {5:'mlopsfi2', 10:'mlopsfi3', 15:'mlopsfi4', 22:'mlopsfi5'};
var MLOPS_PHASE_FIRST = {0:'mlopshome', 6:'mlopsfi2', 11:'mlopsfi3', 16:'mlopsfi4', 23:'mlopsfi5'};
var MLOPS_PAGE_LABELS = {'mlopshome':'Beranda MLOps','mlopsfi1':'Fase 1 — ML Pipeline','mlopsfi2':'Fase 2 — Model Serving','mlopsfi3':'Fase 3 — Infrastructure','mlopsfi4':'Fase 4 — Monitoring','mlopsfi5':'Fase 5 — CI/CD & Checklist'};
var MLOPS_PHASE_INTRO_MAP = {'mlopsi1':'mlopsfi1','mlopsi2':'mlopsfi2','mlopsi3':'mlopsfi3','mlopsi4':'mlopsfi4','mlopsi5':'mlopsfi5'};

// ── LANGUAGE MODEL Topics ─────────────────────────────────────────────────────
var LM_TOPICS = [
  'lm1a','lm1b','lm1c','lm1d','lm1e','lm1f',
  'lm2a','lm2b','lm2c','lm2d','lm2e','lm2f',
  'lm3a','lm3b','lm3c','lm3d','lm3e',
  'lm4z','lm4a','lm4b','lm4c','lm4d','lm4e','lm4f',
  'lm5a','lm5b','lm5c','lm5d','lm5e','lm5f',
  'lm6a','lm6b','lm6c','lm6d','lm6e','lm6f'
];

var LM_TOPIC_LABELS = {
  'lm1a':'1.1 NLP Klasik','lm1b':'1.2 Representasi Teks','lm1c':'1.3 Word Embeddings','lm1d':'1.4 Language Modeling Klasik','lm1e':'1.5 Subword Tokenization','lm1f':'1.6 Evaluasi NLP',
  'lm2a':'2.1 Fondasi Neural Network','lm2b':'2.2 CNN untuk Teks','lm2c':'2.3 RNN & Vanishing Gradient','lm2d':'2.4 LSTM & GRU','lm2e':'2.5 Seq2Seq & Encoder-Decoder','lm2f':'2.6 Regularisasi & Training',
  'lm3a':'3.1 Attention Mechanism','lm3b':'3.2 Self-Attention','lm3c':'3.3 Multi-Head & Positional Encoding','lm3d':'3.4 Arsitektur Transformer','lm3e':'3.5 Varian Transformer',
  'lm4z':'4.0 Data Curation untuk Pre-training',
  'lm4a':'4.1 Pre-training LLM','lm4b':'4.2 BERT — Encoder LLM','lm4c':'4.3 GPT — Decoder LLM','lm4d':'4.4 Fine-tuning Strategies','lm4e':'4.5 RLHF & Alignment','lm4f':'4.6 LLM Evaluation',
  'lm5a':'5.1 Scaling Laws','lm5b':'5.2 Mixture of Experts','lm5c':'5.3 Inference Optimization','lm5d':'5.4 Multimodal LLM','lm5e':'5.5 Memilih LLM yang Tepat','lm5f':'5.6 Distributed Training',
  'lm6a':'6.1 Prompt Engineering','lm6b':'6.2 RAG','lm6c':'6.3 Function Calling','lm6d':'6.4 LLM Application Dev','lm6e':'6.5 Guardrails & Eval','lm6f':'6.6 LLM in Production'
};

var LM_PHASE_MAP = {
  'lm1a':'lmi1','lm1b':'lmi1','lm1c':'lmi1','lm1d':'lmi1','lm1e':'lmi1','lm1f':'lmi1',
  'lm2a':'lmi2','lm2b':'lmi2','lm2c':'lmi2','lm2d':'lmi2','lm2e':'lmi2','lm2f':'lmi2',
  'lm3a':'lmi3','lm3b':'lmi3','lm3c':'lmi3','lm3d':'lmi3','lm3e':'lmi3',
  'lm4z':'lmi4',
  'lm4a':'lmi4','lm4b':'lmi4','lm4c':'lmi4','lm4d':'lmi4','lm4e':'lmi4','lm4f':'lmi4',
  'lm5a':'lmi5','lm5b':'lmi5','lm5c':'lmi5','lm5d':'lmi5','lm5e':'lmi5','lm5f':'lmi5',
  'lm6a':'lmi6','lm6b':'lmi6','lm6c':'lmi6','lm6d':'lmi6','lm6e':'lmi6','lm6f':'lmi6'
};
var LM_PHASE_NUMS = {'lmi1':'1','lmi2':'2','lmi3':'3','lmi4':'4','lmi5':'5','lmi6':'6'};
// idx 0-5=lm1(6), 6-11=lm2(6), 12-16=lm3(5), 17-23=lm4(7), 24-29=lm5(6), 30-35=lm6(6)
var LM_PHASE_LAST  = {5:'lmfi2', 11:'lmfi3', 16:'lmfi4', 23:'lmfi5', 29:'lmfi6'};
var LM_PHASE_FIRST = {0:'lmhome', 6:'lmfi2', 12:'lmfi3', 17:'lmfi4', 24:'lmfi5', 30:'lmfi6'};
var LM_PAGE_LABELS = {'lmhome':'Beranda LM','lmfi1':'Fase 1 — NLP Klasik','lmfi2':'Fase 2 — Neural Network','lmfi3':'Fase 3 — Transformer','lmfi4':'Fase 4 — LLM','lmfi5':'Fase 5 — Scaling & Produksi','lmfi6':'Fase 6 — Generative AI in Practice'};
var LM_PHASE_INTRO_MAP = {'lmi1':'lmfi1','lmi2':'lmfi2','lmi3':'lmfi3','lmi4':'lmfi4','lmi5':'lmfi5','lmi6':'lmfi6'};

// ── COMPUTER VISION Topics ────────────────────────────────────────────────────
var CV_TOPICS = [
  'cv0a',
  'cv1a','cv1b','cv1c','cv1d','cv1e',
  'cv2a','cv2b','cv2c','cv2d','cv2e','cv2f',
  'cv3a','cv3b','cv3c','cv3d','cv3e',
  'cv4aa','cv4ab','cv4ac','cv4ad','cv4ae',
  'cv4ba','cv4bb','cv4bc','cv4bd','cv4be',
  'cv5a','cv5b','cv5c','cv5d','cv5e'
];
var CV_TOPIC_LABELS = {
  'cv0a':'0.1 Pengenalan Computer Vision',
  'cv1a':'1.1 Representasi Gambar & Piksel','cv1b':'1.2 Filter & Konvolusi Klasik','cv1c':'1.3 Edge Detection','cv1d':'1.4 Transformasi Geometris','cv1e':'1.5 Color Spaces & Histograms',
  'cv2a':'2.1 CNN untuk Vision','cv2b':'2.2 Transfer Learning & Fine-tuning','cv2c':'2.3 Vision Transformer (ViT)','cv2d':'2.4 Data Augmentation','cv2e':'2.5 Loss Functions untuk Vision','cv2f':'2.6 Model Evaluation & Metrics',
  'cv3a':'3.1 Object Detection Fundamentals','cv3b':'3.2 YOLO Family','cv3c':'3.3 Semantic Segmentation','cv3d':'3.4 Instance Segmentation (Mask R-CNN)','cv3e':'3.5 Keypoint Detection & Pose Estimation',
  'cv4aa':'4A.1 Model Optimization & Pruning','cv4ab':'4A.2 Quantization & TensorRT','cv4ac':'4A.3 ONNX & Cross-platform Deployment','cv4ad':'4A.4 Edge Deployment (Jetson, RPi)','cv4ae':'4A.5 Real-time Vision Pipeline',
  'cv4ba':'4B.1 CLIP & Vision-Language Models','cv4bb':'4B.2 Diffusion Models Fundamentals','cv4bc':'4B.3 Stable Diffusion & Fine-tuning','cv4bd':'4B.4 Image Editing & Inpainting','cv4be':'4B.5 Video Generation & Temporal Models',
  'cv5a':'5.1 End-to-end CV System Design','cv5b':'5.2 Serving Vision Models (Triton)','cv5c':'5.3 Monitoring & Drift Detection','cv5d':'5.4 Anotasi & Active Learning','cv5e':'5.5 Checklist CV Engineer'
};
var CV_PHASE_MAP = {
  'cv0a':'cvi0',
  'cv1a':'cvi1','cv1b':'cvi1','cv1c':'cvi1','cv1d':'cvi1','cv1e':'cvi1',
  'cv2a':'cvi2','cv2b':'cvi2','cv2c':'cvi2','cv2d':'cvi2','cv2e':'cvi2','cv2f':'cvi2',
  'cv3a':'cvi3','cv3b':'cvi3','cv3c':'cvi3','cv3d':'cvi3','cv3e':'cvi3',
  'cv4aa':'cvi4a','cv4ab':'cvi4a','cv4ac':'cvi4a','cv4ad':'cvi4a','cv4ae':'cvi4a',
  'cv4ba':'cvi4b','cv4bb':'cvi4b','cv4bc':'cvi4b','cv4bd':'cvi4b','cv4be':'cvi4b',
  'cv5a':'cvi5','cv5b':'cvi5','cv5c':'cvi5','cv5d':'cvi5','cv5e':'cvi5'
};
var CV_PHASE_NUMS = {'cvi0':'0','cvi1':'1','cvi2':'2','cvi3':'3','cvi4a':'4A','cvi4b':'4B','cvi5':'5'};
// PHASE_LAST: last global index before a phase boundary → page to go to
// idx 0=cv0a(1), 1-5=cv1(5), 6-11=cv2(6), 12-16=cv3(5), 17-21=cv4a(5), 22-26=cv4b(5), 27-31=cv5(5)
var CV_PHASE_LAST  = {0:'cvfi1', 5:'cvfi2', 11:'cvfi3', 16:'cvfi4a', 21:'cvfi4b', 26:'cvfi5'};
var CV_PHASE_FIRST = {0:'cvhome', 1:'cvfi1', 6:'cvfi2', 12:'cvfi3', 17:'cvfi4a', 22:'cvfi4b', 27:'cvfi5'};
var CV_PAGE_LABELS = {'cvhome':'Beranda CV','cvfi0':'Fase 0 — Pengenalan CV','cvfi1':'Fase 1 — Image Processing','cvfi2':'Fase 2 — Deep Learning CV','cvfi3':'Fase 3 — Detection & Segmentation','cvfi4a':'Fase 4A — Vision Systems','cvfi4b':'Fase 4B — Generative CV','cvfi5':'Fase 5 — Production'};
var CV_PHASE_INTRO_MAP = {'cvi0':'cvfi0','cvi1':'cvfi1','cvi2':'cvfi2','cvi3':'cvfi3','cvi4a':'cvfi4a','cvi4b':'cvfi4b','cvi5':'cvfi5'};
var CV_PAGES = ['cvhome','cvfi0','cvfi1','cvfi2','cvfi3','cvfi4a','cvfi4b','cvfi5'];

var currentIdx = 0;

// ── Inject nav bars ───────────────────────────────────────────────────────────
function injectNavBars() {
  var topics, phaseLastMap, phaseFirstMap, pageLabels;
  if (activeCurriculum === 'language-model') {
    topics = LM_TOPICS; phaseLastMap = LM_PHASE_LAST; phaseFirstMap = LM_PHASE_FIRST; pageLabels = LM_PAGE_LABELS;
  } else if (activeCurriculum === 'mlops') {
    topics = MLOPS_TOPICS; phaseLastMap = MLOPS_PHASE_LAST; phaseFirstMap = MLOPS_PHASE_FIRST; pageLabels = MLOPS_PAGE_LABELS;
  } else if (activeCurriculum === 'ai-fundamentals') {
    topics = AIF_TOPICS; phaseLastMap = AIF_PHASE_LAST; phaseFirstMap = AIF_PHASE_FIRST; pageLabels = AIF_PAGE_LABELS;
  } else if (activeCurriculum === 'computer-vision') {
    topics = CV_TOPICS; phaseLastMap = CV_PHASE_LAST; phaseFirstMap = CV_PHASE_FIRST; pageLabels = CV_PAGE_LABELS;
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
      nextLabel = (activeCurriculum === 'language-model' ? LM_TOPIC_LABELS : activeCurriculum === 'mlops' ? MLOPS_TOPIC_LABELS : activeCurriculum === 'ai-fundamentals' ? AIF_TOPIC_LABELS : activeCurriculum === 'computer-vision' ? CV_TOPIC_LABELS : TOPIC_LABELS)[topics[idx+1]] || '';
      nextBtn = '<button class="tnbtn primary next-btn-t" data-idx="'+idx+'">'+(t('nav.next')||'Selanjutnya →')+'</button>';
    }

    var prevBtn;
    if (prevPageId === 'home' || prevPageId === 'lmhome' || prevPageId === 'mlopshome' || prevPageId === 'aifhome' || prevPageId === 'cvhome') {
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
var LM_PAGES = ['lmfi1','lmfi2','lmfi3','lmfi4','lmfi5','lmfi6'];
var MLOPS_PAGES = ['mlopsfi1','mlopsfi2','mlopsfi3','mlopsfi4','mlopsfi5'];

function hideAll() {
  var allPageIds = AA_PAGES.concat(LM_PAGES).concat(MLOPS_PAGES).concat(AIF_PAGES).concat(CV_PAGES);
  allPageIds.forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.classList.remove('page-home--active'); el.classList.remove('fase-intro--active'); }
  });
  TOPICS.concat(LM_TOPICS).concat(MLOPS_TOPICS).concat(AIF_TOPICS).concat(CV_TOPICS).forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.remove('sub--active');
  });
  document.querySelectorAll('.cs').forEach(function(s){ s.style.display='none'; });
}

// ── goToPage ──────────────────────────────────────────────────────────────────
var HOME_PAGE_IDS = ['glossary'];

function goToPage(pageId, skipPush) {
  // cari fase yang harus di-load untuk page ini
  var faseId = null;
  Object.keys(PHASE_INTRO_MAP).forEach(function(k){ if (PHASE_INTRO_MAP[k] === pageId) faseId = k; });
  Object.keys(MLOPS_PHASE_INTRO_MAP).forEach(function(k){ if (MLOPS_PHASE_INTRO_MAP[k] === pageId) faseId = faseId || k; });
  Object.keys(LM_PHASE_INTRO_MAP).forEach(function(k){ if (LM_PHASE_INTRO_MAP[k] === pageId) faseId = k; });
  Object.keys(AIF_PHASE_INTRO_MAP).forEach(function(k){ if (AIF_PHASE_INTRO_MAP[k] === pageId) faseId = k; });
  Object.keys(CV_PHASE_INTRO_MAP).forEach(function(k){ if (CV_PHASE_INTRO_MAP[k] === pageId) faseId = k; });

  if (faseId) {
    loadFase(faseId).then(function(){
      _showPage(pageId, skipPush);
      // Auto-open sidebar submenu for this fase
      document.querySelectorAll('.sits').forEach(function(i){i.classList.remove('open');});
      document.querySelectorAll('.sph').forEach(function(p){p.classList.remove('active');});
      var grp = document.getElementById(faseId);
      if (grp) { grp.classList.add('open'); if (grp.previousElementSibling) grp.previousElementSibling.classList.add('active'); }
    });
  } else {
    _showPage(pageId, skipPush);
  }
}

function _showPage(pageId, skipPush) {
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
  if (!skipPush) history.pushState(null,'','#'+pageId);
  document.querySelector('.main').scrollTo({top:0,behavior:'smooth'});
  window.scrollTo({top:0,behavior:'smooth'});
}

// ── goTo ──────────────────────────────────────────────────────────────────────
function goTo(idx, skipPush) {
  var topics = activeCurriculum === 'language-model' ? LM_TOPICS : activeCurriculum === 'mlops' ? MLOPS_TOPICS : activeCurriculum === 'ai-fundamentals' ? AIF_TOPICS : activeCurriculum === 'computer-vision' ? CV_TOPICS : TOPICS;
  var phaseMap = activeCurriculum === 'language-model' ? LM_PHASE_MAP : activeCurriculum === 'mlops' ? MLOPS_PHASE_MAP : activeCurriculum === 'ai-fundamentals' ? AIF_PHASE_MAP : activeCurriculum === 'computer-vision' ? CV_PHASE_MAP : PHASE_MAP;
  var phaseNums = activeCurriculum === 'language-model' ? LM_PHASE_NUMS : activeCurriculum === 'mlops' ? MLOPS_PHASE_NUMS : activeCurriculum === 'ai-fundamentals' ? AIF_PHASE_NUMS : activeCurriculum === 'computer-vision' ? CV_PHASE_NUMS : PHASE_NUMS;
  var phaseIntroMap = activeCurriculum === 'language-model' ? LM_PHASE_INTRO_MAP : activeCurriculum === 'mlops' ? MLOPS_PHASE_INTRO_MAP : activeCurriculum === 'ai-fundamentals' ? AIF_PHASE_INTRO_MAP : activeCurriculum === 'computer-vision' ? CV_PHASE_INTRO_MAP : PHASE_INTRO_MAP;

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
    if (!skipPush) history.pushState(null,'','#'+nextId);

    document.querySelectorAll('.sit').forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href')==='#'+nextId);
    });

    if (faseId) {
      document.querySelectorAll('.sits').forEach(function(i){i.classList.remove('open');});
      document.querySelectorAll('.sph').forEach(function(p){p.classList.remove('active');});
      var grp = document.getElementById(faseId);
      if (grp) { grp.classList.add('open'); if (grp.previousElementSibling) grp.previousElementSibling.classList.add('active'); }
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
  hideAll();
  document.getElementById('landing').classList.remove('landing--active');
  document.getElementById('sidebar').classList.remove('sidebar--hidden');
  document.getElementById('layout').classList.remove('layout--no-sidebar');
  renderSidebar(id);
  document.getElementById('header-sub').textContent = label;
  var ham = document.querySelector('.ham');
  if (ham) ham.classList.add('ham--visible');
}

(function(){
  var hash = location.hash.replace('#','');
  document.querySelectorAll('.cs').forEach(function(s){ s.style.display='none'; });

  var lmTopicIdx = LM_TOPICS.indexOf(hash);
  var aaTopicIdx = TOPICS.indexOf(hash);
  var mlopsTopicIdx = MLOPS_TOPICS.indexOf(hash);
  var aifTopicIdx = AIF_TOPICS.indexOf(hash);
  var cvTopicIdx = CV_TOPICS.indexOf(hash);

  if (!hash || hash === 'landing') {
    document.getElementById('landing').classList.add('landing--active');
    document.getElementById('sidebar').classList.add('sidebar--hidden');
    var ham = document.querySelector('.ham'); if (ham) ham.classList.remove('ham--visible');
  } else if (aifTopicIdx >= 0) {
    enterCurriculum('ai-fundamentals','AI Fundamentals dari Nol');
    goTo(aifTopicIdx, true);
  } else if (AIF_PAGES.indexOf(hash) >= 0) {
    enterCurriculum('ai-fundamentals','AI Fundamentals dari Nol');
    var aifFaseId = null;
    Object.keys(AIF_PHASE_INTRO_MAP).forEach(function(k){ if (AIF_PHASE_INTRO_MAP[k]===hash) aifFaseId=k; });
    if (aifFaseId) loadFase(aifFaseId).then(function(){ goToPage(hash, true); });
    else goToPage(hash, true);
  } else if (cvTopicIdx >= 0) {
    enterCurriculum('computer-vision','Computer Vision Mastery');
    goTo(cvTopicIdx, true);
  } else if (CV_PAGES.indexOf(hash) >= 0) {
    enterCurriculum('computer-vision','Computer Vision Mastery');
    var cvFaseId = null;
    Object.keys(CV_PHASE_INTRO_MAP).forEach(function(k){ if (CV_PHASE_INTRO_MAP[k]===hash) cvFaseId=k; });
    if (cvFaseId) loadFase(cvFaseId).then(function(){ goToPage(hash, true); });
    else goToPage(hash, true);
  } else if (lmTopicIdx >= 0) {
    enterCurriculum('language-model','Language Model Fundamentals');
    goTo(lmTopicIdx, true);
  } else if (LM_PAGES.indexOf(hash) >= 0) {
    enterCurriculum('language-model','Language Model Fundamentals');
    var lmFaseId = null;
    Object.keys(LM_PHASE_INTRO_MAP).forEach(function(k){ if (LM_PHASE_INTRO_MAP[k]===hash) lmFaseId=k; });
    if (lmFaseId) loadFase(lmFaseId).then(function(){ goToPage(hash, true); });
    else goToPage(hash, true);
  } else if (aaTopicIdx >= 0) {
    enterCurriculum('agentic-ai','Agentic AI Mastery');
    goTo(aaTopicIdx, true);
  } else if (AA_PAGES.indexOf(hash) >= 0) {
    enterCurriculum('agentic-ai','Agentic AI Mastery');
    var faseId = null;
    Object.keys(PHASE_INTRO_MAP).forEach(function(k){ if (PHASE_INTRO_MAP[k]===hash) faseId=k; });
    if (faseId) loadFase(faseId).then(function(){ goToPage(hash, true); });
    else goToPage(hash, true);
  } else if (mlopsTopicIdx >= 0) {
    enterCurriculum('mlops','MLOps & Model Deployment');
    goTo(mlopsTopicIdx, true);
  } else if (MLOPS_PAGES.indexOf(hash) >= 0) {
    enterCurriculum('mlops','MLOps & Model Deployment');
    var mlopsFaseId = null;
    Object.keys(MLOPS_PHASE_INTRO_MAP).forEach(function(k){ if (MLOPS_PHASE_INTRO_MAP[k]===hash) mlopsFaseId=k; });
    if (mlopsFaseId) loadFase(mlopsFaseId).then(function(){ goToPage(hash, true); });
    else goToPage(hash, true);
  } else {
    document.getElementById('landing').classList.add('landing--active');
    document.getElementById('sidebar').classList.add('sidebar--hidden');
  }

  window.addEventListener('popstate', function() {
    var h = location.hash.replace('#','');
    if (!h || h === 'landing') { showLanding(); return; }
    var lmIdx = LM_TOPICS.indexOf(h), aaIdx = TOPICS.indexOf(h), mlIdx = MLOPS_TOPICS.indexOf(h), aifIdx = AIF_TOPICS.indexOf(h), cvIdx = CV_TOPICS.indexOf(h);
    if (aifIdx >= 0) {
      if (activeCurriculum !== 'ai-fundamentals') enterCurriculum('ai-fundamentals','AI Fundamentals dari Nol');
      goTo(aifIdx, true);
    } else if (cvIdx >= 0) {
      if (activeCurriculum !== 'computer-vision') enterCurriculum('computer-vision','Computer Vision Mastery');
      goTo(cvIdx, true);
    } else if (lmIdx >= 0) {
      if (activeCurriculum !== 'language-model') enterCurriculum('language-model','Language Model Fundamentals');
      goTo(lmIdx, true);
    } else if (aaIdx >= 0) {
      if (activeCurriculum !== 'agentic-ai') enterCurriculum('agentic-ai','Agentic AI Mastery');
      goTo(aaIdx, true);
    } else if (mlIdx >= 0) {
      if (activeCurriculum !== 'mlops') enterCurriculum('mlops','MLOps & Model Deployment');
      goTo(mlIdx, true);
    } else if (AIF_PAGES.indexOf(h) >= 0) {
      if (activeCurriculum !== 'ai-fundamentals') enterCurriculum('ai-fundamentals','AI Fundamentals dari Nol');
      goToPage(h, true);
    } else if (CV_PAGES.indexOf(h) >= 0) {
      if (activeCurriculum !== 'computer-vision') enterCurriculum('computer-vision','Computer Vision Mastery');
      goToPage(h, true);
    } else if (LM_PAGES.indexOf(h) >= 0) {
      if (activeCurriculum !== 'language-model') enterCurriculum('language-model','Language Model Fundamentals');
      goToPage(h, true);
    } else if (AA_PAGES.indexOf(h) >= 0) {
      if (activeCurriculum !== 'agentic-ai') enterCurriculum('agentic-ai','Agentic AI Mastery');
      goToPage(h, true);
    } else if (MLOPS_PAGES.indexOf(h) >= 0) {
      if (activeCurriculum !== 'mlops') enterCurriculum('mlops','MLOps & Model Deployment');
      goToPage(h, true);
    }
  });
})();
