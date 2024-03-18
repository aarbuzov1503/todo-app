(function () {

  // Создаем массив для хранения дел
  let todos = [];

  // функция создания заголовка
  function createAppTitle(title) {

    //создание заголовка
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  //создание формы
  function createTodoItemForm() {
    let form = document.createElement('form');              //элемент формы
    let input = document.createElement('input');          // элемент инпута
    let buttonWrapper = document.createElement('div');        //добавление блока
    let button = document.createElement('button');         //добавление кнопки
    form.classList.add('input-group', 'mb-3');          //присвоение классов форме
    input.classList.add('form-control');           //присвоение класса инпуту
    input.placeholder = 'Название нового дела';         //присвоение подсказки для инпута
    buttonWrapper.classList.add('input-group-append');    //присвоение класса блоку кнопки
    button.classList.add('btn', 'btn-primary');    //присвоение класса для кнопки
    button.textContent = 'Добавить дело';    //присвоение текста для кнопки

    // Установка атрибута disabled, если поле ввода пустое
    button.disabled = true;


    buttonWrapper.append(button);    //добавление кнопки в дерево
    form.append(input);    //добавление инпута в дерево
    form.append(buttonWrapper);    //добавление формы в дерево


    // Добавление обработчика события input на поле ввода
    input.addEventListener('input', function () {
      button.disabled = input.value === '';
    });


    return {
      form,
      input,
      button,
    };

  }

  //создание списка формы
  function createTodoList() {
    let list = document.createElement('ul');

    //присвоение класса списку
    list.classList.add('list-group');
    return list;

  }

  //функция создания дела
  function createTodoItem({ name, done }) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // Добавляем класс "list-group-item-success", если задача выполнена
    if (done) {
      item.classList.add('list-group-item-success');
    }

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  // Функция поиска максимального id в массиве дел
  function getMaxId() {
    let maxId = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id > maxId) {
        maxId = todos[i].id;
      }
    }
    return maxId;
  }

  // Функция добавления элементов в дерево
  document.addEventListener('DOMContentLoaded', function () {

    let container = document.getElementById('todo-app');

    let todoAppTitle = createAppTitle('Список дел');
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);


    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      }

      let maxId = getMaxId();    // Получаем максимальное значение id
      // Создаем объект дела с полями name, done и id
      let todo = {
        id: maxId + 1,
        name: todoItemForm.input.value,
        done: false,
      };
      todos.push(todo);    // Добавляем объект дела в массив дел


      // ЭТА ФУНКЦИЯ СОХРАНЯЕТ МАССИВ

      // используем метод setItem()
      // объекта localStorage, чтобы сохранить данные в LocalStorage.
      // преобразуем данные в формат JSON с помощью функции JSON.stringify().

      function saveListToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
      }

      saveListToLocalStorage('todos', todos); // ЭТОТ КОД ВЫЗЫВАЕТ ФУНКЦИЮ СОХРАНЕНИЯ МАССИВА

      let todoItem = createTodoItem(todo);    // Создаем элемент списка дела



      // Добавляем обработчики событий на кнопки элемента списка
      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
        // Изменение статуса задачи в массиве
        let todoObj = todos.find(item => item.id === todo.id);
        if (todoObj) {
          todoObj.done = !todoObj.done;
          //  для изменения статуса дела
          saveListToLocalStorage('todos', todos);
          todos[index].done = true;
        }
      });

      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          // Удаление задачи из массива
          todos = todos.filter(item => item.id !== todo.id);

          // При удалении дела из списка удалить из хранилища
          saveListToLocalStorage('todos', todos);
          todos.splice(index, 1);
        }
        console.log('Обновлённый массив :' + todos);
      });

      todoList.append(todoItem.item);
      todoItemForm.input.value = '';

      console.log(todos);
    });
  });

})();



      // ЭТА ФУНКЦИЯ ВЫПОЛНЯЕТ ВОЗВРАТ СОХРАНЁННЫХ ДАННЫХ МАССИВА
      function loadListFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
      }

      // Загрузка данных из LocalStorage
      todos = JSON.parse(localStorage.getItem('todos') || '[]');

      // ЭТОТ КОД ВЫПОЛНЯЕТ ВЫЗОВ ФУНКЦИИ ВОЗВРАТА СОХРАНЁННЫХ ДАННЫХ МАССИВА
      let loadedTodos = loadListFromLocalStorage('todos');
