import './assets/styles/main.scss';
import TodoList from './todo';

class TodoApp extends TodoList {
  #list = {};

  constructor(form, list, todoInput, allBtn, completedBtn, uncompletedBtn, clearCompletedBtn) {
    super();

    this.#list = list;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      this.addTodo(todoInput.value);

      todoInput.value = '';
    });

    this.renderTodos();

    allBtn.addEventListener('click', () => {
      this.renderTodos();
    });

    completedBtn.addEventListener('click', () => {
      const todos = super.filterTodos('completed');
      this.renderTodos(todos);
    });

    uncompletedBtn.addEventListener('click', () => {
      const todos = super.filterTodos('uncompleted');
      this.renderTodos(todos);
    });
    clearCompletedBtn.addEventListener('click', () => {
      const todos = super.filterTodos('clear');
      this.renderTodos(todos);
    });
  }

  renderTodos(todos = this.todos) {
    this.#list.innerHTML = '';
    todos.forEach((todo) => {
      const todoLi = this.createTodo(todo);
      this.#list.appendChild(todoLi);
    });
  }

  addTodo(text) {
    super.addTodo(text);
    this.renderTodos();
  }

  removeTodo(id) {
    super.removeTodo(id);
    this.renderTodos();
  }

  checkTodo(id, isDone) {
    super.checkTodo(id, isDone);

    const todoLi = document.getElementById(id);

    if (isDone) {
      todoLi.classList.add('active');
    } else {
      todoLi.classList.remove('active');
    }
  }

  editTodo(id, text) {
    super.editTodo(id, text);
    this.renderTodos();
  }

  createTodo(todo) {
    const liElement = document.createElement('li');
    liElement.classList.add('todo-list__item', 'input-group', 'mb-3');
    liElement.id = todo.id;

    if (todo.isDone) {
      liElement.classList.add('active');
    }

    const todoItemInput = TodoApp.createTodoItemInput(todo.text);
    liElement.insertAdjacentElement('afterbegin', todoItemInput);
    todoItemInput.addEventListener('blur', (e) => {
      this.editTodo(todo.id, e.target.value);
      todoItemInput.readOnly = true;
    });

    const checkbox = TodoApp.createCheckbox(todo.isDone, (e) => {
      this.checkTodo(todo.id, e.target.checked);
    });

    liElement.insertAdjacentElement('afterbegin', checkbox);

    const editBtn = TodoApp.createEditButton(() => {
      todoItemInput.readOnly = false;
      todoItemInput.focus();
    });
    liElement.insertAdjacentElement('beforeend', editBtn);

    const deleteBtn = TodoApp.createDeleteButton(() => this.removeTodo(todo.id));
    liElement.insertAdjacentElement('beforeend', deleteBtn);

    return liElement;
  }

  static createTodoItemInput(todoText) {
    const input = document.createElement('input');
    input.value = todoText;
    input.classList.add('todo-list__input-text', 'form-control');
    input.readOnly = true;

    return input;
  }

  static createCheckbox(isDone, listener) {
    const checkboxWrapper = document.createElement('div');

    checkboxWrapper.classList.add('input-group-prepend');
    checkboxWrapper.innerHTML = `
      <div class="input-group-text">
        <label>
        <input type="checkbox" />
        <span></span>
      </label>
      </div>
    `;

    const checkbox = checkboxWrapper.querySelector('input');
    checkbox.checked = isDone;
    checkbox.addEventListener('input', listener);

    return checkboxWrapper;
  }

  static createDeleteButton(listener) {
    const button = document.createElement('button');

    button.classList.add('btn', 'btn-danger', 'btn-sm');
    button.innerHTML = '<span class="material-icons">delete_outline</span>';

    button.addEventListener('click', listener);

    return button;
  }

  static createEditButton(listener) {
    const editBtn = document.createElement('button');

    editBtn.classList.add('btn', 'btn-warning', 'btn-sm');
    editBtn.innerHTML = '<span class="material-icons">edit</span>';
    editBtn.addEventListener('click', listener);

    return editBtn;
  }
}

const todoForm = document.querySelector('.todo-app__form');
const todoFormInput = document.querySelector('.todo-app__input');
const todoList = document.querySelector('.todo-list');
const allBtn = document.querySelector('#all');
const completedBtn = document.querySelector('#completed');
const uncompletedBtn = document.querySelector('#uncompleted');
const clearCompletedBtn = document.querySelector('#clear');

// eslint-disable-next-line no-unused-vars
const todoApp = new TodoApp(
  todoForm,
  todoList,
  todoFormInput,
  allBtn,
  completedBtn,
  uncompletedBtn,
  clearCompletedBtn,
);
