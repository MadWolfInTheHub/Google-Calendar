import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { renderWeek } from '../calendar/calendar.js'
import { openModal } from '../common/modal.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
const dateInput = document.querySelector(`input[name='date']`);
const startTimeInput = document.querySelector(`input[name='startTime']`);
const endTimeInput = document.querySelector(`input[name='endTime']`);

const formater = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const getTime = (date) => formater.format(date);


function handleEventClick(event) {
  const isEvent = event.target.closest('.event');
  const displayedWeek = getItem('displayedWeekStart');
  const choosedDate = event.target.closest('.calendar__day').getAttribute(`data-day`)
  const eventTimePeriod = document.querySelector('.event-time');
  const check = () => {
    eventTimePeriod.textContent = `${startTimeInput.value} - ${endTimeInput.value}`;
  }

  startTimeInput.addEventListener('change', check);
  endTimeInput.addEventListener('change', check);

  if (!isEvent) {
    let hour = event.target.getAttribute(`data-time`);
    dateInput.value = new Date(`${displayedWeek.getFullYear()}-${displayedWeek.getMonth() + 1}-${choosedDate}`).toLocaleDateString('en-CA');
    if (Number(hour) < 10) {
      hour = '0' + event.target.getAttribute(`data-time`);
      startTimeInput.value = hour + ':00';
      endTimeInput.value = hour === '09' ? (Number(hour) + 1) + ':00' : '0' + (Number(hour) + 1) + ':00';
      openModal();
      return;
    }
    startTimeInput.value = hour + ':00';
    endTimeInput.value = (Number(hour) + 1) + ':00';
    openModal();
    return;
  }

  
  const eventCoordinates = isEvent.getBoundingClientRect();
  const eventId = isEvent.getAttribute('data-event-id');
  setItem('eventIdToDelete', `${eventId}`)
  openPopup(eventCoordinates.x, (eventCoordinates.y + eventCoordinates.height))
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
}

function removeEventsFromCalendar() {
  setItem('events', [])
  // ф-ция для удаления всех событий с календаря
}

const createEventElement = (event) => {

  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
};

export const renderEvents = () => {
  const eventArr = getItem('events');
  const displayedWeek = getItem('displayedWeekStart');
  const weekEnd = shmoment(displayedWeek).add('days', 7).result();
  const events = eventArr
  .filter(el => {

    if (displayedWeek.getTime() < el.start.getTime() && el.start.getTime() < weekEnd.getTime() === true) {
      return el;
    }
  })
  .map(({id, title, description, start, end}) => {
    const date = document.querySelector(`.calendar__day[data-day='${start.getDate()}']`);
    const time = date.querySelector(`.calendar__time-slot[data-time='${start.getHours()}']`);
    time.classList.add('event__container')

    const eventHeight = () => {
      const diff = end.getTime() - start.getTime();
      const result = (diff / 1000) / 60;
      return result;
    }

    const eventItemEL = document.createElement('div');
    eventItemEL.classList.add('event');
    eventItemEL.style.marginTop = `${start.getMinutes()}px`;
    eventItemEL.style.height = `${eventHeight()}px`;
    eventItemEL.setAttribute('data-event-id', `${id}`)
    
    const eventTitle = document.createElement('div');
    eventTitle.classList.add('event__title');
    eventTitle.innerHTML = `${title}`
    
    const eventTime = document.createElement('div');
    eventTime.classList.add('event__time');
    eventTime.innerHTML = `${getTime(start)} - ${getTime(end)}`

    const eventDescription = document.createElement('div');
    eventDescription.classList.add('event__description');
    eventDescription.innerHTML = `${description}`;
    
    eventItemEL.append(eventTitle, eventTime, eventDescription);
    time.append(eventItemEL)
    
    return time;

  })
  /* return events; */
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
};

function onDeleteEvent() {
  const minTimeToStart = 1000 * 15;
  const event = getItem('events');
  const eventIdToDelete = Number(getItem('eventIdToDelete'))
  const eventToCheck = event.filter(el => el.id === eventIdToDelete);

  if(eventToCheck[0].start.getTime() > minTimeToStart) {
    alert('You can not delete the event which is about to start in less then 15 min!');
    return;
  }

  const filterEvents = event.filter(el => el.id !== eventIdToDelete);
  setItem('events', filterEvents);
  closePopup();
  renderWeek();
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
}

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
weekElem.addEventListener('click', createEventElement);


// timer 
const hour = 60;
const clockHeight = () => (new Date().getHours() * hour) + new Date().getMinutes()

export const clock = () => {
  const clockLine = document.createElement('div');
  clockLine.classList.add('clockline');
  clockLine.style.marginTop = `${clockHeight()}px`;
  clockLine.style.height = '1px';
  clockLine.style.width = '80px';
  clockLine.style.backgroundColor = 'red';
  clockLine.style.position = 'absolute';

  weekElem.append(clockLine)
}
