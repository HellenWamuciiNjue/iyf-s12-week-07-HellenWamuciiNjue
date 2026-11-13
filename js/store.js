// A tiny observable store: one state object and subscribed listeners.
export function createStore(initialState = {}) {
  let state = { ...initialState };
  const listeners = new Set();
  return {
    getState: () => ({ ...state }),
    setState(update) {
      state = { ...state, ...(typeof update === "function" ? update({ ...state }) : update) };
      listeners.forEach((listener) => listener({ ...state }));
      return { ...state };
    },
    subscribe(listener) {
      if (typeof listener !== "function") throw new TypeError("Subscriber must be a function");
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}