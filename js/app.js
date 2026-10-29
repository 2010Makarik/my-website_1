document.addEventListener('DOMContentLoaded', () => {
  // Переключение табов процедур
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // Логика квиза
  const totalSteps = 7;
  let currentStep = 1;

  const currentStepEl = document.getElementById('quiz-current-step');
  const progressFill = document.getElementById('quiz-progress-fill');
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const steps = document.querySelectorAll('.quiz__step');

  function updateQuizUI() {
    steps.forEach(step => {
      step.classList.remove('active');
      if (parseInt(step.dataset.step) === currentStep) {
        step.classList.add('active');
      }
    });

    if (currentStepEl) currentStepEl.textContent = currentStep;
    if (progressFill) progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

    if (prevBtn) prevBtn.disabled = currentStep === 1;

    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'block';
      }
    }
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateQuizUI();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateQuizUI();
      }
    });
  }

  // FAQ Аккордеон
  const faqQuestions = document.querySelectorAll('.faq__question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  });

  // Модальное окно
  const modal = document.getElementById('modal-consultation');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalPlanInput = document.getElementById('modal-plan-input');

  function openModal(planName = 'Общая консультация') {
    if (modalPlanInput) modalPlanInput.value = planName;
    if (modal) modal.classList.add('active');
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-plan-btn') || e.target.classList.contains('btn-modal')) {
      e.preventDefault();
      const plan = e.target.dataset.plan || 'Консультация';
      openModal(plan);
    }
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Обработка отправки форм
  const modalForm = document.getElementById('modal-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Спасибо! Ваша заявка принята. Юрист свяжется с вами в течение 10 минут.');
      closeModal();
      modalForm.reset();
    });
  }

  const heroForm = document.getElementById('hero-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
      heroForm.reset();
    });
  }

  const footerForm = document.getElementById('footer-form');
  if (footerForm) {
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Спасибо за обращение! Мы перезвоним вам в течение 5 минут.');
      footerForm.reset();
    });
  }

  const quizForm = document.getElementById('quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Расчет отправлен! Мы свяжемся с вами с вариантами договора.');
      quizForm.reset();
    });
  }

  // Маска для телефона
  function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('.phone-mask, input[type="tel"]');

    phoneInputs.forEach(input => {
      input.placeholder = '8 999 123 45 67';

      input.addEventListener('input', () => {
        let inputVal = input.value.replace(/\D/g, '');
        let formattedVal = '';

        if (!inputVal) {
          input.value = '';
          return;
        }

        if (['7', '8', '9'].includes(inputVal[0])) {
          if (inputVal[0] === '9') inputVal = '8' + inputVal;
          formattedVal = '8';

          if (inputVal.length > 1) {
            formattedVal += ' ' + inputVal.substring(1, 4);
          }
          if (inputVal.length >= 5) {
            formattedVal += ' ' + inputVal.substring(4, 7);
          }
          if (inputVal.length >= 8) {
            formattedVal += ' ' + inputVal.substring(7, 9);
          }
          if (inputVal.length >= 10) {
            formattedVal += ' ' + inputVal.substring(9, 11);
          }
        } else {
          formattedVal = inputVal.substring(0, 11);
        }

        input.value = formattedVal;
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.replace(/\D/g, '').length === 1) {
          input.value = '';
        }
      });
    });
  }

  initPhoneMask();
});
