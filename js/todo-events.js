import {
  clearCompleted,
  createTodo,
  deleteTodo,
  editTodo,
  getNextTodoId,
  toggleTodo,
} from "./todo-logic.js";
import { saveFilter, saveTodos } from "./storage.js";
import { render } from "./todo-dom.js";

export function bindEvents(el, state) {
  let nextId = getNextTodoId(state.todos);

  const update = () => {
    saveTodos(state.todos);
    render(el, state, actions);
  };

  const actions = {
    save(id, text) {
      state.todos = editTodo(state.todos, id, text);
      state.editingId = null;
      update();
    },
    cancel() {
      state.editingId = null;
      render(el, state, actions);
    },
  };

  el.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const todo = createTodo(el.input.value, nextId);
    if (!todo) {
      el.error.textContent = "Type a task first.";
      el.input.focus();
      return;
    }
    nextId += 1;
    state.todos = [...state.todos, todo];
    el.error.textContent = "";
    el.input.value = "";
    update();
    el.input.focus();
  });

  el.list.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) return;
    const id = Number(item.dataset.id);
    if (event.target.closest(".delete")) state.todos = deleteTodo(state.todos, id);
    else if (event.target.classList.contains("toggle")) state.todos = toggleTodo(state.todos, id);
    else return;
    update();
  });

  el.list.addEventListener("dblclick", (event) => {
    if (!event.target.classList.contains("todo-text")) return;
    const item = event.target.closest(".todo-item");
    if (item) {
      state.editingId = Number(item.dataset.id);
      render(el, state, actions);
    }
  });

  el.filters.forEach((button) =>
    button.addEventListener("click", () => {
      state.currentFilter = button.dataset.filter;
      saveFilter(state.currentFilter);
      render(el, state, actions);
    }),
  );

  el.clear.addEventListener("click", () => {
    state.todos = clearCompleted(state.todos);
    update();
  });

  render(el, state, actions);
}
