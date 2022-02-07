import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const generateDay = () => {
  // функция должна сгенерировать и вернуть разметку дня в виде строки
  // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
  const dayTimeScale = document.querySelector('.calendar__time-scale');
  const dayTimeEl = createNumbersArray(1, 24).map(el => {
    const dayTimeSlot = document.createElement('div');
    dayTimeSlot.classList.add('calendar__time-slot');
    dayTimeSlot.setAttribute('data-time', `${el}`);

    return dayTimeEl;
  }) 
  console.log(dayTimeScale.append(...dayTimeEl));
  console.log(generateDay());
};

export const renderWeek = () => {
  const calendarWeek = document.querySelector('.calendar__week');
  const startOfWeek = getItem('displayedWeekStart');
  const calendarDay = generateWeekRange(startOfWeek).map((el => {
    const date = el.getDate();
    
    const dayOfWeek = document.createElement("div");
    dayOfWeek.classList.add("calendar__day"); 
    dayOfWeek.setAttribute("data-day", `${date}`); 
    
    dayOfWeek
    return dayOfWeek;
  }));

  calendarWeek.append(...calendarDay);
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
};
