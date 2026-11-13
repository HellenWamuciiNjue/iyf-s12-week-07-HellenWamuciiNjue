import { state } from "./state.js";
import { loadFilter, loadTodos } from "./storage.js";
import { getElements } from "./todo-dom.js";
import { bindEvents } from "./todo-events.js";

const elements = getElements();
state.todos = loadTodos();
state.currentFilter = loadFilter();
bindEvents(elements, state);
