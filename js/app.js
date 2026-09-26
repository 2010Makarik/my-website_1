document.addEventListener('DOMContentLoaded', () => {
  // Переключение табов в Блоке 3
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

// Логика работы квиза
const totalSteps = 7;
let currentStep = 1;

const currentStepEl = document.getElementById('quiz-current-step');
const progressFill = document.getElementById('quiz-progress-fill');
const prevBtn = document.getElementById('quiz-prev-btn');
const nextBtn = document.getElementById('quiz-next-btn');
const steps = document.querySelectorAll('.quiz__step');

function updateQuizUI() {
  // Переключение активного шага
  steps.forEach(step => {
    step.classList.remove('active');
    if (parseInt(step.dataset.step) === currentStep) {
      step.classList.add('active');
    }
  });

  // Обновление счетчика и шкалы
  currentStepEl.textContent = currentStep;
  progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

  // Управление кнопками
  prevBtn.disabled = currentStep === 1;

  if (currentStep === totalSteps) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'block';
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

// Функция открытия модального окна
function openModal(planName = 'Общая консультация') {
  if (modalPlanInput) modalPlanInput.value = planName;
  modal.classList.add('active');
}

// Функция закрытия модального окна
function closeModal() {
  modal.classList.remove('active');
}

// Привязка кнопок «Записаться» на странице к модальному окну
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('select-plan-btn') || e.target.classList.contains('btn-modal')) {
    e.preventDefault();
    const plan = e.target.dataset.plan || 'Консультация';
    openModal(plan);
  }
});

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

// Обработка отправки формы в модальном окне
const modalForm = document.getElementById('modal-form');
if (modalForm) {
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Ваша заявка принята. Юрист свяжется с вами в течение 10 минут.');
    closeModal();
    modalForm.reset();
  });
}

// Маска для автоматического форматирования номера телефона (8 888 888 88 88)
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    // Настройка подсказки в поле ввода
    input.placeholder = '8 999 123 45 67';

    input.addEventListener('input', (e) => {
      let inputVal = input.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
      let formattedVal = '';

      if (!inputVal) {
        input.value = '';
        return;
      }

      // Если ввод начинается с 7, 8 или 9 — приводят первую цифру к 8
      if (['7', '8', '9'].includes(inputVal[0])) {
        if (inputVal[0] === '9') inputVal = '8' + inputVal;
        
        const firstDigit = '8';
        formattedVal = firstDigit;

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
        // Если ввод начинается с другой цифры
        formattedVal = inputVal.substring(0, 11);
      }

      input.value = formattedVal;
    });

    // Очистка поля при стирании клавишей Backspace
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value.replace(/\D/g, '').length === 1) {
        input.value = '';
      }
    });
  });
}

// Запуск маски после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  initPhoneMask();
});


// Обработка формы в контактах
const footerForm = document.getElementById('footer-form');
if (footerForm) {
  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо за обращение! Мы перезвоним вам в течение 5 минут.');
    footerForm.reset();
  });
}
// Переключение табов в Блоке "Процедуры и тарифы"
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.dataset.tab; // phys, jur или tariffs

    // Снимаем active со всех кнопок и контентов
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // Активируем нужную кнопку и нужную таблицу
    btn.classList.add('active');
    const activeContent = document.getElementById(`tab-${targetTab}`);
    if (activeContent) {
      activeContent.classList.add('active');
    }
  });
});




