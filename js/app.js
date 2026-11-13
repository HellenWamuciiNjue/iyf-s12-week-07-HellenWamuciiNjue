import { state } from "./state.js";
import { loadFilter, loadTodos, saveTodos } from "./storage.js";
import { getElements } from "./todo-dom.js";
import { bindEvents } from "./todo-events.js";

// Add the Week 7 submission checklist once without replacing existing user tasks.
const CHECKLIST_KEY = "week7-submission-checklist-v1";
const submissionChecklist = [
  { id: 7001, text: "[COMPLETED] Build the Week 7 To-Do app and practice files", completed: true },
  { id: 7002, text: "[COMPLETED] Publish and test the working GitHub Pages demo", completed: true },
  { id: 7003, text: "[COMPLETED] Add automated tests and the quality-check workflow", completed: true },
  { id: 7004, text: "[COMPLETED] Make multiple meaningful commits", completed: true },
  { id: 7005, text: "[COMPLETED] Create my refactor/modules pull request", completed: true },
  { id: 7006, text: "[COMPLETED] Leave three inline code-review comments on my partner's PR", completed: true },
  { id: 7007, text: "[COMPLETED] Submit a general review on my partner's PR", completed: true },
  { id: 7008, text: "[IN PROGRESS] Get my own pull request reviewed and merged", completed: false },
  {
    id: 7009,
    text: "[WAITING FOR PARTNER] Ask Stephen to resolve the merge conflicts and respond to the review comments",
    completed: false,
  },
  {
    id: 7010,
    text: "[IN PROGRESS] Confirm the collaborator invitations are accepted and both partners have access",
    completed: false,
  },
  { id: 7011, text: "[TO DO] Submit my Week 7 GitHub repository link in Google Classroom", completed: false },
  { id: 7012, text: "[TO DO] Final check that node_modules is not committed to the repository", completed: false },
];

const elements = getElements();
state.todos = loadTodos();

let checklistAdded = false;
try {
  checklistAdded = localStorage.getItem(CHECKLIST_KEY) === "added";
} catch {
  // Continue with the checklist if browser storage is unavailable.
}

if (!checklistAdded) {
  const existingIds = new Set(state.todos.map((todo) => todo.id));
  const newTasks = submissionChecklist.filter((todo) => !existingIds.has(todo.id));
  state.todos = [...state.todos, ...newTasks];
  saveTodos(state.todos);
  try {
    localStorage.setItem(CHECKLIST_KEY, "added");
  } catch {
    // The app remains usable if browser storage is unavailable.
  }
}

state.currentFilter = loadFilter();
bindEvents(elements, state);
