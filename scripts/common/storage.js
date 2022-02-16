/* const eventExample = {
  id: 0.7520027086457333, // id понадобится для работы с событиями
  title: 'Title',
  description: 'Some description',
  start: new Date(),
  end: new Date(),
}; */
let storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
  // хранит массив всех событий
  events: [/* eventExample */],
  // это все данные, которые вам нужно хранить для работы приложения
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => JSON.parse(localStorage.getItem(key));
export const getDisplayedWeekStart = () => new Date(JSON.parse(localStorage.getItem('displayedWeekStart')));
  

// пример объекта события
