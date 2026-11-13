import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateOrderTotal,
  clearCompleted,
  countActive,
  createTodo,
  deleteTodo,
  editTodo,
  filterTodos,
  toggleTodo,
} from "../js/todo-logic.js";

const todos = [
  { id: 1, text: "Learn JS", completed: false },
  { id: 2, text: "Submit", completed: true },
  { id: 3, text: "Test", completed: false },
];

test("createTodo trims and rejects blank input", () => {
  assert.deepEqual(createTodo(" Read ", 4), { id: 4, text: "Read", completed: false });
  assert.equal(createTodo(" ", 5), null);
});
test("filters return expected tasks", () => {
  assert.equal(filterTodos(todos).length, 3);
  assert.deepEqual(filterTodos(todos, "active").map((todo) => todo.id), [1, 3]);
  assert.deepEqual(filterTodos(todos, "completed").map((todo) => todo.id), [2]);
});
test("toggle changes selected task without mutating source", () => {
  const result = toggleTodo(todos, 1);
  assert.equal(result[0].completed, true);
  assert.equal(todos[0].completed, false);
  assert.notEqual(result, todos);
});
test("delete removes selected task without mutating source", () => {
  assert.deepEqual(deleteTodo(todos, 2).map((todo) => todo.id), [1, 3]);
  assert.equal(todos.length, 3);
});
test("edit trims text and ignores blank values", () => {
  assert.equal(editTodo(todos, 1, " New ")[0].text, "New");
  assert.deepEqual(editTodo(todos, 1, " "), todos);
});
test("clearCompleted keeps active tasks", () => {
  assert.deepEqual(clearCompleted(todos).map((todo) => todo.id), [1, 3]);
});
test("countActive counts unfinished tasks and handles an empty list", () => {
  assert.equal(countActive(todos), 2);
  assert.equal(countActive([]), 0);
});
test("order total debugging exercise calculates the expected 69", () => {
  const order = [
    { name: "Book", price: 15, quantity: 2 },
    { name: "Pen", price: 3, quantity: 5 },
    { name: "Notebook", price: 8, quantity: 3 },
  ];
  assert.equal(calculateOrderTotal(order), 69);
});
test("order total applies 10 percent discount above 100", () => {
  assert.equal(calculateOrderTotal([{ price: 60, quantity: 2 }]), 108);
});
test("order total handles empty and invalid inputs", () => {
  assert.equal(calculateOrderTotal([]), 0);
  assert.throws(() => calculateOrderTotal("not an array"), TypeError);
  assert.throws(() => calculateOrderTotal([{ price: -1, quantity: 2 }]), TypeError);
});
