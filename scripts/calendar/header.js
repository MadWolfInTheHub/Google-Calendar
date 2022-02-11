import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const dateInput = document.querySelector(`input[name='date']`);
const startTimeInput = document.querySelector(`input[name='startTime']`);
const endTimeInput = document.querySelector(`input[name='endTime']`);


export const renderHeader = () => {
  const calanderWeekDays = document.querySelector('.calendar__header');
  calanderWeekDays.innerHTML = '';
  const startOfWeek = getItem('displayedWeekStart');
  const calendarDayEl = generateWeekRange(startOfWeek).map((el => {
    const day = daysOfWeek[el.getDay()];
    const date = el.getDate();
    
    const dayOfWeek = document.createElement("div");
    dayOfWeek.classList.add("calendar__day-label"); 
    dayOfWeek.setAttribute("data-day", `${date}`); 
    
    const calendarDay = document.createElement('div');
    calendarDay.classList.add('day-label__day-name');
    calendarDay.append(day);
    
    const calendarDate = document.createElement('div');
    calendarDate.classList.add('day-label__day-number');
    calendarDate.append(date);
    
    dayOfWeek.append(calendarDay, calendarDate);
    return dayOfWeek;
  }));
  calanderWeekDays.append(...calendarDayEl);
  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
};


const createbtn = document.querySelector('.create-event-btn');

const createEvent = (event) => {
  
  dateInput.value = new Date().toLocaleDateString('en-CA');
  startTimeInput.value = new Date().getHours() + ':' + new Date().getMinutes()
  endTimeInput.value = new Date().getHours() + ':' + new Date().getMinutes()
  openModal();
}

export const createeventBtn = () => {
 createbtn.addEventListener('click', createEvent);
}

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
