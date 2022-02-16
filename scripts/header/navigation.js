import { getItem, setItem } from '../common/storage.js';
import { getDisplayedWeekStart } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

let day = new Date();


function renderCurrentMonth() {
  let day = getDisplayedWeekStart()
  displayedMonthElem.textContent = getDisplayedMonth(day);
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
}

const onChangeWeek = (event) => {
  const changeWeek = event.target.getAttribute('data-direction');
  const week = 7;
  const date = getDisplayedWeekStart().getDate();
  const month = getDisplayedWeekStart().getMonth();
  const year = getDisplayedWeekStart().getFullYear();
  const newDay = getDisplayedWeekStart();
  const renewcalandar = () => {
    day = newDay;
    renderHeader();
    renderWeek();
    renderCurrentMonth();
  }
  if (changeWeek === null) return;
  
  if (changeWeek === 'today') {
    day = new Date();
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
    renewcalandar(day);
  }
  
  if (changeWeek === 'prev') {
    setItem('displayedWeekStart', getStartOfWeek(new Date(year, month, date - week)));
    renewcalandar();
  }
  
  if (changeWeek === 'next') {
    setItem('displayedWeekStart', getStartOfWeek(new Date(year, month, date + week)));
    renewcalandar();
  }

  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
