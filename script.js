// ESTADO DO PROTÓTIPO
let currentBaseFontSize = 18;
let isLoggedIn = true;

// NAVEGAÇÃO ENTRE AS SEÇÕES DA SPA
function navigateTo(viewId) {
  const sections = document.querySelectorAll('.view-section');
  sections.forEach(section => section.classList.remove('active-view'));

  const targetSection = document.getElementById(viewId);
  if (targetSection) {
    targetSection.classList.add('active-view');
  }

  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    if (btn.getAttribute('data-target') === viewId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const mobileNav = document.getElementById('mainNav');
  if (mobileNav.classList.contains('open')) {
    mobileNav.classList.remove('open');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CONTROLE DE MENU MOBILE
function toggleMobileMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('open');
}

// ACESSIBILIDADE: AJUSTE DE FONTE
function adjustFontSize(delta) {
  currentBaseFontSize += delta * 2;
  if (currentBaseFontSize < 16) currentBaseFontSize = 16;
  if (currentBaseFontSize > 24) currentBaseFontSize = 24;
  document.documentElement.style.setProperty('--base-font-size', currentBaseFontSize + 'px');
  showToast(`Tamanho da fonte ajustado para ${currentBaseFontSize}px`);
}

// ACESSIBILIDADE: ALTO CONTRASTE
function toggleContrast() {
  document.body.classList.toggle('high-contrast');
  const isHigh = document.body.classList.contains('high-contrast');
  showToast(isHigh ? 'Modo Alto Contraste ativado' : 'Modo padrão restaurado');
}

// GERENCIAMENTO DE MODAIS
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// FEEDBACK TOAST VISUAL
function showToast(message) {
  const toast = document.getElementById('toastFeedback');
  const toastText = document.getElementById('toastMessage');
  toastText.innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

// SIMULAÇÃO DO CADASTRO
function handleRegister(e) {
  e.preventDefault();
  const nome = document.getElementById('cadNome').value;
  closeModal('modalCadastro');
  showToast(`Bem-vindo(a), ${nome}! Seu cadastro foi concluído com sucesso.`);
  
  const greetingEl = document.querySelector('.user-welcome-info h2');
  if (greetingEl) greetingEl.innerText = `Olá, ${nome}! 👋`;
  navigateTo('view-jornada');
}

// SIMULAÇÃO DO LOGIN
function handleLogin(e) {
  e.preventDefault();
  closeModal('modalLogin');
  showToast('Login realizado com sucesso! Carregando seu progresso.');
  navigateTo('view-jornada');
}

// FILTRO DE CURSOS
function filterCourses(category, btnElement) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  const cards = document.querySelectorAll('.course-card');
  cards.forEach(card => {
    if (category === 'todos' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// INSCREVER-SE EM CURSOS
function enrollCourse(courseName) {
  showToast(`Inscrição confirmada no curso: "${courseName}"! Adicionado à sua Jornada.`);
}

// ALTERNAR ABAS NA SEÇÃO 4 (MENTORIAS / VAGAS)
function switchOpportunitiesTab(tab) {
  const mentoresContent = document.getElementById('mentoresContent');
  const vagasContent = document.getElementById('vagasContent');
  const tabMentoresBtn = document.getElementById('tabMentoresBtn');
  const tabVagasBtn = document.getElementById('tabVagasBtn');

  if (tab === 'mentores') {
    mentoresContent.style.display = 'grid';
    vagasContent.style.display = 'none';
    tabMentoresBtn.classList.add('active');
    tabVagasBtn.classList.remove('active');
  } else {
    mentoresContent.style.display = 'none';
    vagasContent.style.display = 'grid';
    tabVagasBtn.classList.add('active');
    tabMentoresBtn.classList.remove('active');
  }
}

// SOLICITAR MENTORIA
function requestMentorship(mentorName) {
  showToast(`Solicitação enviada para o mentor ${mentorName}. Entraremos em contato via WhatsApp.`);
}

// CANDIDATAR-SE À VAGA
function applyToJob(jobTitle) {
  showToast(`Candidatura enviada para a vaga "${jobTitle}"! A empresa parceira receberá seu currículo.`);
}

// PRÉVIA DE CURRÍCULO
function generateResumePreview() {
  openModal('modalResume');
}

// Fechar modais clicando fora do card
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Tecla ESC para fechar modais
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal-overlay.active');
    openModals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = 'auto';
  }
});