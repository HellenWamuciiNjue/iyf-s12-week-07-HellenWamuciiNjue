export function createTodo(text, id) {
  const clean = String(text).trim();
  return clean ? { id, text: clean, completed: false } : null;
}

// Keep ID generation in the pure-logic module so restored tasks cannot collide.
export function getNextTodoId(todos) {
  const highestId = todos.reduce(
    (maximum, todo) =>
      Number.isSafeInteger(todo.id) ? Math.max(maximum, todo.id) : maximum,
    0,
  );
  return highestId + 1;
}

export function filterTodos(todos, filter = "all") {
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return [...todos];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

export function deleteTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function editTodo(todos, id, text) {
  const clean = String(text).trim();
  return clean
    ? todos.map((todo) => (todo.id === id ? { ...todo, text: clean } : todo))
    : [...todos];
}

export function clearCompleted(todos) {
  return todos.filter((todo) => !todo.completed);
}

export function countActive(todos) {
  return todos.filter((todo) => !todo.completed).length;
}

// Pure function used in Lesson 14.3 debugging practice.
export function calculateOrderTotal(items) {
  if (!Array.isArray(items)) throw new TypeError("Items must be an array");
  const total = items.reduce((sum, item) => {
    if (
      !item ||
      !Number.isFinite(item.price) ||
      !Number.isFinite(item.quantity) ||
      item.price < 0 ||
      item.quantity < 0
    ) {
      throw new TypeError("Each item needs a valid non-negative price and quantity");
    }
    return sum + item.price * item.quantity;
  }, 0);
  return total > 100 ? total * 0.9 : total;
}
