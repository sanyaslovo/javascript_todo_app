import uniqid from 'uniqid';

export default class TodoList {
  #todos = [];

  get todos() {
    return this.#todos;
  }

  set todos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    this.#todos = todos;
  }

  constructor() {
    const storageTodos = JSON.parse(localStorage.getItem('todos'));
    this.todos = storageTodos || [];
  }

  addTodo(text) {
    if (!text) {
      return;
    }
    const todo = {
      id: uniqid(),
      text,
      isDone: false,
    };
    this.todos.unshift(todo);
    this.renderTodos();
    localStorage.setItem('todos', JSON.stringify(this.todos));
    // eslint-disable-next-line consistent-return
    return todo;
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  checkTodo(id, isDone) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone,
        };
      }
      return todo;
    });
    this.todos = this.todos.sort((a, b) => a.isDone - b.isDone);
    this.renderTodos();
  }

  editTodo(id, text) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
  }

  filterTodos(filter) {
    if (filter === 'completed') {
      return this.todos.filter((todo) => todo.isDone);
    }

    if (filter === 'uncompleted') {
      return this.todos.filter((todo) => !todo.isDone);
    }

    if (filter === 'clear') {
      this.todos = this.todos.filter((todo) => !todo.isDone);
    }
    return this.todos;
  }
}
