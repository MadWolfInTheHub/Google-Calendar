import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';
import { createNumbersArray } from './common/createNumbersArray.js';
import { createeventBtn } from './calendar/header.js';
document.addEventListener('DOMContentLoaded', () => {
  // инициализация всех элементов
  renderTimescale();
  setItem('displayedWeekStart', getStartOfWeek(new Date()));
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
  createeventBtn();
  setInterval(() => {renderWeek()}, 60000); 
});

/* const autoRefresh = () => {
  window.location = window.location.href;
}

setInterval('autoRefresh()', 60000); */
