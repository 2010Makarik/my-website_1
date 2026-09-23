document.addEventListener('DOMContentLoaded', () => {
  let allCases = [];

  const tbody = document.getElementById('cases-tbody');
  const yearSelect = document.getElementById('filter-year');
  const amountSelect = document.getElementById('filter-amount');
  const searchInput = document.getElementById('search-case');

  // Загружаем данные из cases.json
  fetch('data/cases.json')
    .then(response => response.json())
    .then(data => {
      allCases = data;
      renderCases(allCases);
    })
    .catch(error => console.error('Ошибка загрузки базы дел:', error));

  // Отрисовка строк таблицы
  function renderCases(cases) {
    tbody.innerHTML = '';

    if (cases.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Дела не найдены</td></tr>';
      return;
    }

    cases.forEach(item => {
      const formattedAmount = new Intl.NumberFormat('ru-RU').format(item.debtWrittenOff) + ' руб.';
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${item.date}</td>
        <td>${item.client}</td>
        <td><strong>${item.caseNumber}</strong></td>
        <td>${item.duration}</td>
        <td>${formattedAmount}</td>
        <td><a href="${item.courtDecisionUrl}" target="_blank" class="link-court">Решение суда</a></td>
      `;
      
      tbody.appendChild(row);
    });
  }

  // Функция фильтрации
  function filterCases() {
    const selectedYear = yearSelect.value;
    const selectedAmount = amountSelect.value;
    const searchQuery = searchInput.value.toLowerCase().trim();

    const filtered = allCases.filter(item => {
      // Фильтр по году
      const itemYear = item.date.split('-')[0];
      const matchYear = selectedYear === 'all' || itemYear === selectedYear;

      // Фильтр по сумме
      let matchAmount = true;
      if (selectedAmount === 'up-to-1m') {
        matchAmount = item.debtWrittenOff < 1000000;
      } else if (selectedAmount === '1m-to-3m') {
        matchAmount = item.debtWrittenOff >= 1000000 && item.debtWrittenOff <= 3000000;
      } else if (selectedAmount === 'over-3m') {
        matchAmount = item.debtWrittenOff > 3000000;
      }

      // Поиск по № дела или ФИО
      const matchSearch = item.caseNumber.toLowerCase().includes(searchQuery) ||
                          item.client.toLowerCase().includes(searchQuery);

      return matchYear && matchAmount && matchSearch;
    });

    renderCases(filtered);
  }

  // Слушатели событий на фильтры
  yearSelect.addEventListener('change', filterCases);
  amountSelect.addEventListener('change', filterCases);
  searchInput.addEventListener('input', filterCases);
});