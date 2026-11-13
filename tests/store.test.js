import test from "node:test";
import assert from "node:assert/strict";
import { createStore } from "../js/store.js";

test("store updates centralized state and notifies subscribers", () => {
  const store = createStore({ count: 0 });
  const received = [];
  store.subscribe((state) => received.push(state.count));
  store.setState({ count: 1 });
  store.setState((state) => ({ count: state.count + 1 }));
  assert.deepEqual(received, [1, 2]);
  assert.equal(store.getState().count, 2);
});
test("unsubscribe stops future notifications", () => {
  const store = createStore({ count: 0 });
  let calls = 0;
  const unsubscribe = store.subscribe(() => calls++);
  unsubscribe();
  store.setState({ count: 1 });
  assert.equal(calls, 0);
});
test("store does not mutate the initial object", () => {
  const initial = { count: 0 };
  const store = createStore(initial);
  store.setState({ count: 3 });
  assert.equal(initial.count, 0);
});