const eventExample = {
  id: 0.7520027086457333, // id понадобится для работы с событиями
  title: 'Title',
  description: 'Some description',
  start: new Date(),
  end: new Date(),
};
let storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
  // хранит массив всех событий
  events: [eventExample],
  // это все данные, которые вам нужно хранить для работы приложения
};


export const setItem = (key, value) => {
  // ф-ция должна устанавливать значения в объект storage
  Object.assign(storage, { [key]: value });
  console.log(storage);
};

export const getItem = (key) => storage[key];
  // ф-ция должна возвращать по ключу значения из объекта storage
  

// пример объекта события
