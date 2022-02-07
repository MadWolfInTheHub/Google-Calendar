import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

let day = new Date();


function renderCurrentMonth() {
  displayedMonthElem.textContent = getDisplayedMonth(day);
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
}

const onChangeWeek = (event) => {
  const changeWeek = event.target.getAttribute('data-direction');
  const week = 7;
  const date = getItem('displayedWeekStart').getDate();
  const month = getItem('displayedWeekStart').getMonth();
  const year = getItem('displayedWeekStart').getFullYear();
  const newDay = getItem('displayedWeekStart');
  const renewcalandar = () => {
    day = newDay;
    renderWeek();
    renderHeader();
    renderCurrentMonth();
  }
  if (changeWeek === null) return;
  
  if (changeWeek === 'today') {
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
    renewcalandar();
  }
  
  if (changeWeek === 'prev') {
    setItem('displayedWeekStart', getStartOfWeek(new Date(year, month, date - week)));
    renewcalandar();
  }
  
  if (changeWeek === 'next') {
    setItem('displayedWeekStart', getStartOfWeek(new Date(year, month, date + week)));
    renewcalandar();
  }
/*   const iscurrentDate = event.target.hasAttribute('data-direction', 'today');
  const ispreviousWeek = event.target.hasAttribute('data-direction', 'prev');
  const isnextWeek = event.target.hasAttribute('data-direction', 'next'); */

  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
