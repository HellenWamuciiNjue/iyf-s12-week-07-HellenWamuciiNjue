import { countActive, filterTodos } from "./todo-logic.js";

export function getElements() {
  return {
    form: document.querySelector("#todo-form"),
    input: document.querySelector("#todo-input"),
    error: document.querySelector("#form-error"),
    list: document.querySelector("#todo-list"),
    left: document.querySelector("#items-left"),
    total: document.querySelector("#task-total"),
    empty: document.querySelector("#empty-state"),
    filters: [...document.querySelectorAll(".filter")],
    clear: document.querySelector("#clear-completed"),
  };
}

function makeItem(todo, editingId, actions) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = String(todo.id);
  if (todo.completed) li.classList.add("completed");

  if (editingId === todo.id) {
    const input = document.createElement("input");
    let finished = false;
    input.className = "edit";
    input.value = todo.text;
    input.setAttribute("aria-label", "Edit task");
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !finished) {
        finished = true;
        actions.save(todo.id, input.value);
      }
      if (event.key === "Escape" && !finished) {
        finished = true;
        actions.cancel();
      }
    });
    input.addEventListener("blur", () => {
      if (!finished) {
        finished = true;
        actions.save(todo.id, input.value);
      }
    });
    li.append(input);
    requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
    return li;
  }

  const check = document.createElement("input");
  check.type = "checkbox";
  check.className = "toggle";
  check.checked = todo.completed;
  check.setAttribute("aria-label", "Complete task");

  const text = document.createElement("span");
  text.className = "todo-text";
  text.textContent = todo.text;

  const del = document.createElement("button");
  del.type = "button";
  del.className = "delete";
  del.textContent = "Delete";
  del.setAttribute("aria-label", `Delete ${todo.text}`);

  li.append(check, text, del);
  return li;
}

export function render(el, state, actions) {
  const visible = filterTodos(state.todos, state.currentFilter);
  el.list.replaceChildren(...visible.map((todo) => makeItem(todo, state.editingId, actions)));
  const activeCount = countActive(state.todos);
  el.left.textContent = `${activeCount} ${activeCount === 1 ? "item" : "items"} left`;
  el.total.textContent = `${state.todos.length} tasks`;
  el.empty.hidden = visible.length > 0;
  el.clear.disabled = !state.todos.some((todo) => todo.completed);
  el.filters.forEach((button) => {
    const active = button.dataset.filter === state.currentFilter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
