import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

let date = new Date();

function renderCurrentMonth() {
  displayedMonthElem.textContent = getDisplayedMonth(date);
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
}

const onChangeWeek = (event) => {
  const currentDate = ducument.hasAttribute('dataset.direction', "today");
  const previousWeek = document.querySelectorAll('.prev')
  const nextWeek = document.querySelectorAll('.next');
  console.log(currentDate)
 /*  console.log(previousWeek)
  console.log(nextWeek) */
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
