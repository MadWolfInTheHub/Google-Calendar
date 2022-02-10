import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

const formater = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const getTime = (date) => formater.format(date);


function handleEventClick(event) {
  const isEvent = event.target.closest('.event');
  const eventCoordinates = isEvent.getBoundingClientRect();

  if (!isEvent) {
    return;
  }
  const eventId = isEvent.getAttribute('data-event-id');
  setItem('eventIdToDelete', `${eventId}`)
  openPopup(eventCoordinates.x, (eventCoordinates.y + eventCoordinates.height))
  console.log(event.target.getBoundingClientRect())
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

    const eventItemEL = document.createElement('div');
    eventItemEL.classList.add('event');
    eventItemEL.setAttribute('data-event-id', `${id}`)
    
    const eventTitle = document.createElement('div');
    eventTitle.classList.add('event__title');
    eventTitle.innerHTML = `${title}`
    
    const eventTime = document.createElement('div');
    eventTime.classList.add('event__time');
    eventTime.innerHTML = `${getTime(start)} - ${getTime(end)}`

    const eventDescription = document.createElement('div');
    eventDescription.classList.add('.event__description');
    eventDescription.innerHTML = `${description}`;
    
    eventItemEL.append(eventTitle, eventTime, eventDescription);
    time.append(eventItemEL)
    
    return time;

  })
  return events;
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
};

function onDeleteEvent() {
  const eventIdToDelete = Number(getItem('eventIdToDelete'))
  const event = getItem('events');
  const filterEvents = event.filter(el => el.id !== eventIdToDelete);
  setItem('events', filterEvents);
  closePopup();
  renderEvents();
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);

weekElem.addEventListener('click', createEventElement);
