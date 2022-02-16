import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const closeEventFormBtn = document.querySelector('.create-event__close-btn');
const submitBtn = document.querySelector('.event-form__submit-btn')

const titleInput = document.querySelector(`input[name='title']`);
const dateInput = document.querySelector(`input[name='date']`);
const startTimeInput = document.querySelector(`input[name='startTime']`);
const endTimeInput = document.querySelector(`input[name='endTime']`);
const descriptionInput = document.querySelector(`textarea[name='description']`);



function clearEventForm() {
  titleInput.value = '';
  dateInput.value = '';
  startTimeInput.value = '';
  endTimeInput.value = '';
  descriptionInput.value = '';
  // ф-ция должна очистить поля формы от значений
}

function onCloseEventForm() {
  const eventTimePeriod = document.querySelector('.event-time');
  eventTimePeriod.textContent = '-';
  clearEventForm()
  closeModal()
}

function onCreateEvent(event) {
  event.preventDefault();
  const events = getItem('events') || [];
  const newEvent = {
    id: Math.random(), // id понадобится для работы с событиями
    title: `${titleInput.value}`,
    description: `${descriptionInput.value}`,
    start: new Date(`${dateInput.value}` + ` ${startTimeInput.value}`),
    end: new Date(`${dateInput.value}` + ` ${endTimeInput.value}`),
  };

/*   const startTime = new Date(el.start);
  const endTime = new Date(end.start); */

  const eventStartCheck = events.filter(el => new Date(el.start).getTime() < newEvent.start.getTime() && new Date(el.end).getTime() > newEvent.start.getTime())
  const eventEndCheck = events.filter(el => new Date(el.start).getTime() < newEvent.end.getTime() && new Date(el.end).getTime() > newEvent.end.getTime())
  const maxEventTime = 1000 * 60 * 60 * 6;
  
  if (eventStartCheck.length !== 0) {
    alert('You already have an event at this time!');
    return;
  }
  if (eventEndCheck.length !== 0) {
    alert('You already have an event at this time!');
    return;
  }

  if ((newEvent.end.getTime() - newEvent.start.getTime()) > maxEventTime) {
    alert('Max time of the event can not be 6 hours!')
    return;
  };

  if (eventStartCheck.length === 0) {
    events.push(newEvent)
    setItem('events', events);
    clearEventForm()
    onCloseEventForm();
    renderEvents();
  }
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
}

export function initEventForm() {
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
  submitBtn.addEventListener('click', onCreateEvent);
  // подпишитесь на сабмит формы и на закрытие формы
}
