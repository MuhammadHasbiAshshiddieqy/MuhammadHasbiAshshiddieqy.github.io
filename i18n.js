// i18n.js — bilingual support (ID / EN)
// Usage: data-i18n="key" on any element → innerHTML replaced on lang change
// For dynamic JS strings: t('key')

var I18N = {
  id: {
    // ── Header ──
    'header.sub':           'Open Knowledge — AI &amp; Engineering',
    'header.phase':         'Fase',

    // ── Sidebar ──
    'sidebar.back':         'Semua Topik',
    'sidebar.meet-team':    'Meet the Team',
    'sidebar.practitioners':'3 practitioners',

    // ── Landing hero ──
    'landing.tag':          'Open Knowledge · AI Research · Engineering',
    'landing.h1':           'Belajar <em>AI &amp; Engineering</em><br>dari Fondasi ke Production',
    'landing.desc':         'Catatan belajar yang dibuka ke publik — ditulis oleh praktisi yang membangun sistem AI nyata. Bukan sekadar tutorial, tapi benar-benar paham dari dalam.',

    // ── Topic cards ──
    'lm.label':             'Kurikulum 01',
    'lm.desc':              'Dari NLP klasik hingga modern LLM. Pelajari bagaimana language model bekerja dari dalam: tokenisasi, embedding, neural network, Transformer, pre-training, RLHF, dan scaling laws.',
    'lm.pill.phase':        '5 fase',
    'lm.pill.topic':        '27 topik',
    'lm.pill.week':         '~10 minggu',
    'lm.pill.code':         '25+ kode',
    'lm.cta':               'Buka →',

    'aa.label':             'Kurikulum 02',
    'aa.desc':              'Dari LLM fundamentals hingga production-grade agent. Pelajari cara membangun agent yang sesungguhnya bekerja — harness, memory, multi-agent, observability, dan deployment.',
    'aa.pill.phase':        '5 fase',
    'aa.pill.topic':        '44 topik',
    'aa.pill.week':         '~16 minggu',
    'aa.pill.code':         '30+ kode',
    'aa.cta':               'Buka →',

    'mlops.label':          'Kurikulum 03',
    'mlops.badge':          'Segera',
    'mlops.desc':           'Pipeline training, experiment tracking, model registry, serving infrastructure, monitoring drift, dan CI/CD untuk ML systems.',
    'mlops.pill':           'Dalam persiapan',
    'mlops.cta':            'Segera hadir',

    // ── Built by section ──
    'builtby.label':        'Built by',

    // ── Landing footer ──
    'footer.copy':          '© 2026 Principal Tech Wizard',
    'footer.team':          'Tim',
    'footer.about':         'Tentang',

    // ── Curriculum navigation (JS-injected) ──
    'nav.prev':             '← Sebelumnya',
    'nav.next':             'Selanjutnya →',
    'nav.home':             '← Beranda',
    'nav.start':            'Mulai',
    'nav.phase-start':      'Mulai Fase',
    'nav.topic':            'Topik',
    'nav.done':             'Selesai!',
    'nav.back-all':         'Kembali ke Semua Topik',

    // ── Sidebar fase labels (Agentic AI) ──
    'aa.phase0':            'Fase 0 — Fondasi',
    'aa.phase1':            'Fase 1 — Harness',
    'aa.phase2':            'Fase 2 — Memory & Tools',
    'aa.phase3':            'Fase 3 — Multi-Agent',
    'aa.phase4':            'Fase 4 — Production',

    // ── Sidebar fase labels (Language Model) ──
    'lm.phase1':            'Fase 1 — Linguistik & Representasi',
    'lm.phase2':            'Fase 2 — Neural Networks',
    'lm.phase3':            'Fase 3 — Transformer',
    'lm.phase4':            'Fase 4 — Pre-training & Fine-tuning',
    'lm.phase5':            'Fase 5 — LLM Modern',

    // ── About page ──
    'about.back':           '← Principal Tech Wizard',
    'about.tag':            'Principal Tech Wizard',
    'about.role':           'Backend Engineer · AI Builder · Knowledge Sharer',
    'about.section.about':  'Tentang',
    'about.section.focus':  'Area Fokus',
    'about.section.site':   'Tentang Situs Ini',
    'about.bio':            'Hasbi adalah <strong>backend engineer</strong> yang berspesialisasi dalam sistem scalable, arsitektur microservices, dan aplikasi berbasis AI. Fokus pekerjaannya adalah mengintegrasikan teknologi AI ke produk nyata, termasuk <strong>Retrieval-Augmented Generation (RAG)</strong>, <strong>AI agents</strong>, recommendation systems, dan workflow automation. Dengan semangat berbagi pengetahuan, ia aktif mengeksplorasi bagaimana AI modern dapat menciptakan dampak bisnis yang nyata dan meningkatkan produktivitas engineering.',
    'about.focus.systems':  'Scalable Systems',
    'about.focus.systems.d':'Microservices, distributed architecture, high-throughput backend',
    'about.focus.agents':   'AI Agents',
    'about.focus.agents.d': 'Agentic systems, tool use, multi-agent orchestration',
    'about.focus.rag':      'RAG Systems',
    'about.focus.rag.d':    'Retrieval-augmented generation, semantic search, vector DB',
    'about.focus.workflow':  'Workflow Automation',
    'about.focus.workflow.d':'AI-driven pipelines, recommendation systems, process optimization',
    'about.site.body':      '<a href="/" style="color:var(--accent);text-decoration:none;">Principal Tech Wizard</a> adalah situs pengetahuan terbuka — catatan dari sesi belajar mendalam, ditulis sebagai software engineer yang membangun produk nyata. Tersedia dua kurikulum: <strong style="color:var(--text);">Language Model Fundamentals</strong> (NLP → Transformer → LLM) dan <strong style="color:var(--text);">Agentic AI Mastery</strong> (agent harness → multi-agent → production).',
    'about.copy':           '© 2026 Muhammad Hasbi Ashshiddieqy',

    // ── Team page ──
    'team.back':            '← Principal Tech Wizard',
    'team.tag':             'Meet the Team',
    'team.h1':              'Dibangun oleh <em>praktisi</em>,<br>untuk praktisi',
    'team.desc':            'Peneliti dan engineer yang sehari-harinya membangun sistem AI nyata — dan berbagi apa yang mereka pelajari.',
    'team.faiz.role':       'AI Researcher · PhD Candidate at KAIST',
    'team.faiz.bio':        'Mengembangkan AI melalui penelitian, eksperimen, dan kolaborasi akademik di salah satu institusi AI terkemuka di Asia.',
    'team.usamah.role':     'AI Engineer · ML Systems Builder',
    'team.usamah.bio':      'Berpengalaman dalam AI/ML engineering, computer vision, LLM systems, dan deployment solusi AI dari riset ke production.',
    'team.hasbi.role':      'Backend Engineer · Applied AI Practitioner',
    'team.hasbi.bio':       'Membangun sistem backend scalable dan mengimplementasikan teknologi AI untuk memecahkan masalah bisnis nyata.',
    'team.copy':            '© 2026 Principal Tech Wizard',
    'team.footer.back':     '← Principal Tech Wizard',
  },

  en: {
    // ── Header ──
    'header.sub':           'Open Knowledge — AI &amp; Engineering',
    'header.phase':         'Phase',

    // ── Sidebar ──
    'sidebar.back':         'All Topics',
    'sidebar.meet-team':    'Meet the Team',
    'sidebar.practitioners':'3 practitioners',

    // ── Landing hero ──
    'landing.tag':          'Open Knowledge · AI Research · Engineering',
    'landing.h1':           'Learn <em>AI &amp; Engineering</em><br>from Foundations to Production',
    'landing.desc':         'Open learning notes — written by practitioners who build real AI systems. Not just tutorials, but deep understanding from the inside out.',

    // ── Topic cards ──
    'lm.label':             'Curriculum 01',
    'lm.desc':              'From classical NLP to modern LLMs. Learn how language models work from the inside: tokenization, embeddings, neural networks, Transformers, pre-training, RLHF, and scaling laws.',
    'lm.pill.phase':        '5 phases',
    'lm.pill.topic':        '27 topics',
    'lm.pill.week':         '~10 weeks',
    'lm.pill.code':         '25+ code',
    'lm.cta':               'Open →',

    'aa.label':             'Curriculum 02',
    'aa.desc':              'From LLM fundamentals to production-grade agents. Learn how to build agents that actually work — harness, memory, multi-agent, observability, and deployment.',
    'aa.pill.phase':        '5 phases',
    'aa.pill.topic':        '44 topics',
    'aa.pill.week':         '~16 weeks',
    'aa.pill.code':         '30+ code',
    'aa.cta':               'Open →',

    'mlops.label':          'Curriculum 03',
    'mlops.badge':          'Coming Soon',
    'mlops.desc':           'Training pipelines, experiment tracking, model registry, serving infrastructure, drift monitoring, and CI/CD for ML systems.',
    'mlops.pill':           'In preparation',
    'mlops.cta':            'Coming soon',

    // ── Built by section ──
    'builtby.label':        'Built by',

    // ── Landing footer ──
    'footer.copy':          '© 2026 Principal Tech Wizard',
    'footer.team':          'Team',
    'footer.about':         'About',

    // ── Curriculum navigation ──
    'nav.prev':             '← Previous',
    'nav.next':             'Next →',
    'nav.home':             '← Home',
    'nav.start':            'Start',
    'nav.phase-start':      'Start Phase',
    'nav.topic':            'Topic',
    'nav.done':             'Done!',
    'nav.back-all':         'Back to All Topics',

    // ── Sidebar fase labels (Agentic AI) ──
    'aa.phase0':            'Phase 0 — Foundations',
    'aa.phase1':            'Phase 1 — Harness',
    'aa.phase2':            'Phase 2 — Memory & Tools',
    'aa.phase3':            'Phase 3 — Multi-Agent',
    'aa.phase4':            'Phase 4 — Production',

    // ── Sidebar fase labels (Language Model) ──
    'lm.phase1':            'Phase 1 — Linguistics & Representation',
    'lm.phase2':            'Phase 2 — Neural Networks',
    'lm.phase3':            'Phase 3 — Transformer',
    'lm.phase4':            'Phase 4 — Pre-training & Fine-tuning',
    'lm.phase5':            'Phase 5 — Modern LLMs',

    // ── About page ──
    'about.back':           '← Principal Tech Wizard',
    'about.tag':            'Principal Tech Wizard',
    'about.role':           'Backend Engineer · AI Builder · Knowledge Sharer',
    'about.section.about':  'About',
    'about.section.focus':  'Focus Areas',
    'about.section.site':   'About This Site',
    'about.bio':            'Hasbi is a <strong>backend engineer</strong> specializing in scalable systems, microservices architecture, and AI-powered applications. His work focuses on integrating AI technologies into real-world products, including <strong>Retrieval-Augmented Generation (RAG)</strong>, <strong>AI agents</strong>, recommendation systems, and workflow automation. Passionate about knowledge sharing, he actively explores how modern AI can create practical business impact and improve engineering productivity.',
    'about.focus.systems':  'Scalable Systems',
    'about.focus.systems.d':'Microservices, distributed architecture, high-throughput backend',
    'about.focus.agents':   'AI Agents',
    'about.focus.agents.d': 'Agentic systems, tool use, multi-agent orchestration',
    'about.focus.rag':      'RAG Systems',
    'about.focus.rag.d':    'Retrieval-augmented generation, semantic search, vector DB',
    'about.focus.workflow':  'Workflow Automation',
    'about.focus.workflow.d':'AI-driven pipelines, recommendation systems, process optimization',
    'about.site.body':      '<a href="/" style="color:var(--accent);text-decoration:none;">Principal Tech Wizard</a> is an open knowledge site — notes from deep learning sessions, written as a software engineer building real products. Two curricula available: <strong style="color:var(--text);">Language Model Fundamentals</strong> (NLP → Transformer → LLM) and <strong style="color:var(--text);">Agentic AI Mastery</strong> (agent harness → multi-agent → production).',
    'about.copy':           '© 2026 Muhammad Hasbi Ashshiddieqy',

    // ── Team page ──
    'team.back':            '← Principal Tech Wizard',
    'team.tag':             'Meet the Team',
    'team.h1':              'Built by <em>practitioners</em>,<br>for practitioners',
    'team.desc':            'Researchers and engineers who spend their days building real AI systems — and share what they learn along the way.',
    'team.faiz.role':       'AI Researcher · PhD Candidate at KAIST',
    'team.faiz.bio':        'Advancing AI through research, experimentation, and academic collaboration at one of Asia\'s leading AI institutions.',
    'team.usamah.role':     'AI Engineer · ML Systems Builder',
    'team.usamah.bio':      'Experienced in AI/ML engineering, computer vision, LLM systems, and deploying AI solutions from research to production.',
    'team.hasbi.role':      'Backend Engineer · Applied AI Practitioner',
    'team.hasbi.bio':       'Building scalable backend systems and implementing AI technologies to solve real-world business problems.',
    'team.copy':            '© 2026 Principal Tech Wizard',
    'team.footer.back':     '← Principal Tech Wizard',
  }
};

// Current language — read from localStorage, default 'id'
var currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem('ptw-lang')) || 'id';

// Translate a key
function t(key) {
  var dict = I18N[currentLang] || I18N['id'];
  return dict[key] !== undefined ? dict[key] : (I18N['id'][key] || key);
}

// Apply all data-i18n attributes in DOM
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var val = t(key);
    if (val !== undefined) el.innerHTML = val;
  });
  // Update html lang attribute
  document.documentElement.lang = currentLang;
  // Update toggle button appearance
  var btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.querySelector('[data-lang-id]').style.opacity = currentLang === 'id' ? '1' : '0.4';
    btn.querySelector('[data-lang-en]').style.opacity = currentLang === 'en' ? '1' : '0.4';
  }
  // Re-render sidebar if a curriculum is active (picks up translated labels)
  if (typeof activeCurriculum !== 'undefined' && activeCurriculum && typeof renderSidebar === 'function') {
    renderSidebar(activeCurriculum);
  }
}

// Toggle language
function toggleLang() {
  currentLang = currentLang === 'id' ? 'en' : 'id';
  if (typeof localStorage !== 'undefined') localStorage.setItem('ptw-lang', currentLang);
  applyI18n();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyI18n);
} else {
  applyI18n();
}
