const KEY = "week7-todos-v1";
const FILTER_KEY = "week7-filter-v1";

export function loadTodos(storage = globalThis.localStorage) {
  try {
    const data = JSON.parse(storage?.getItem(KEY) ?? "[]");
    return Array.isArray(data)
      ? data.filter(
          (todo) =>
            todo &&
            Number.isInteger(todo.id) &&
            typeof todo.text === "string" &&
            typeof todo.completed === "boolean",
        )
      : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos, storage = globalThis.localStorage) {
  try {
    storage?.setItem(KEY, JSON.stringify(todos));
    return true;
  } catch {
    return false;
  }
}

export function loadFilter(storage = globalThis.localStorage) {
  try {
    const filter = storage?.getItem(FILTER_KEY);
    return ["all", "active", "completed"].includes(filter) ? filter : "all";
  } catch {
    return "all";
  }
}

export function saveFilter(filter, storage = globalThis.localStorage) {
  if (!["all", "active", "completed"].includes(filter)) return false;
  try {
    storage?.setItem(FILTER_KEY, filter);
    return true;
  } catch {
    return false;
  }
}
