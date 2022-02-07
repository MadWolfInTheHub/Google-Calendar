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
  displayedMonthElem.innerHTML = '';
  displayedMonthElem.textContent = getDisplayedMonth(day);
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
}

const onChangeWeek = (event) => {
  const changeWeek = event.target.getAttribute('data-direction');
  const date = getItem('displayedWeekStart').getDate();
  const month = getItem('displayedWeekStart').getMonth();
  const year = getItem('displayedWeekStart').getFullYear();
  const newDay = getItem('displayedWeekStart');
  console.log(changeWeek)
  if (changeWeek === null) return;
  
  if (changeWeek === 'today') {
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
    renderWeek();
    renderHeader();
    day = getItem('displayedWeekStart');
    renderCurrentMonth();
  }
  
  if (changeWeek === 'prev') {
    setItem('displayedWeekStart', getStartOfWeek(new Date(year, month, date - 7)));
    renderWeek();
    renderHeader();
    day = getItem('displayedWeekStart');
    renderCurrentMonth();
  }
  
  if (changeWeek === 'next') {
    setItem('displayedWeekStart', getStartOfWeek(new Date(year, month, date + 7)));
    console.log(getItem('displayedWeekStart').getDate() + 7);
    renderWeek();
    renderHeader();
    day = getItem('displayedWeekStart');
    renderCurrentMonth();
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
