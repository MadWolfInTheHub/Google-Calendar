import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  const timeScale = document.querySelector('.calendar__time-scale');
  const calendarTimeEl = createNumbersArray(1, 24).map(el => {
   /*  el < 12 ? el + ' am' : el + ' pm'; */
    const timeSlot = document.createElement('div');
    timeSlot.classList.add('time-slot');
    timeSlot.setAttribute('data-time', `${el}`);

    const time = document.createElement('div');
    time.classList.add('time-slot__time');
    time.append(el);

    timeSlot.append(time);

    return timeSlot;
  }) 

  timeScale.append(...calendarTimeEl);
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
};
