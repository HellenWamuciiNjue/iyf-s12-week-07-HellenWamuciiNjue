import { createStore } from "./store.js";

const readJSON = (key, fallback) => {
  try { const value = JSON.parse(localStorage.getItem(key) ?? "null"); return value ?? fallback; }
  catch { return fallback; }
};
const writeJSON = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage may be unavailable. */ } };

// Notes App — JSON serialization makes an array persistable.
const notesKey = "week7-notes";
let notes = readJSON(notesKey, []);
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const notesList = document.querySelector("#notes-list");
function renderNotes() {
  notesList.replaceChildren();
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = note;
    const remove = document.createElement("button");
    remove.type = "button"; remove.textContent = "Delete";
    remove.addEventListener("click", () => { notes = notes.filter((_, i) => i !== index); writeJSON(notesKey, notes); renderNotes(); });
    li.append(text, remove); notesList.append(li);
  });
}
noteForm.addEventListener("submit", (event) => {
  event.preventDefault(); const value = noteInput.value.trim(); if (!value) return;
  notes.push(value); writeJSON(notesKey, notes); noteInput.value = ""; renderNotes();
});
renderNotes();

// Contact form — sessionStorage is scoped to this browser tab session.
const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");
const sessionKey = "week7-contact-draft";
function saveDraft() {
  const values = Object.fromEntries(new FormData(contactForm).entries());
  try { sessionStorage.setItem(sessionKey, JSON.stringify(values)); } catch { /* Ignore unavailable storage. */ }
}
try {
  const draft = JSON.parse(sessionStorage.getItem(sessionKey) ?? "{}");
  Object.entries(draft).forEach(([name, value]) => { if (contactForm.elements[name]) contactForm.elements[name].value = value; });
} catch { sessionStorage.removeItem(sessionKey); }
contactForm.addEventListener("input", saveDraft);
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  sessionStorage.removeItem(sessionKey); contactForm.reset();
  contactStatus.textContent = "Thank you. Your contact form was submitted (demo).";
});

// Shopping cart — persisted as JSON, with quantity controls.
const products = [{ id: 1, name: "Notebook", price: 250 }, { id: 2, name: "Pen set", price: 120 }, { id: 3, name: "Water bottle", price: 650 }];
let cart = readJSON("week7-cart", []);
const productsEl = document.querySelector("#products");
const cartList = document.querySelector("#cart-list");
const summary = document.querySelector("#cart-summary");
function saveCart() { writeJSON("week7-cart", cart); renderCart(); }
products.forEach((product) => {
  const button = document.createElement("button"); button.type = "button";
  button.textContent = `Add ${product.name} — KSh ${product.price}`;
  button.addEventListener("click", () => {
    const existing = cart.find((item) => item.id === product.id);
    cart = existing ? cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...cart, { ...product, quantity: 1 }];
    saveCart();
  });
  productsEl.append(button, document.createElement("br"));
});
function renderCart() {
  cartList.replaceChildren();
  cart.forEach((item) => {
    const li = document.createElement("li");
    const label = document.createElement("span"); label.textContent = `${item.name} — KSh ${item.price} × ${item.quantity}`;
    const minus = document.createElement("button"); minus.type = "button"; minus.textContent = "−"; minus.setAttribute("aria-label", `Decrease ${item.name}`);
    minus.addEventListener("click", () => { cart = cart.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity - 1 } : entry).filter((entry) => entry.quantity > 0); saveCart(); });
    const plus = document.createElement("button"); plus.type = "button"; plus.textContent = "+"; plus.setAttribute("aria-label", `Increase ${item.name}`);
    plus.addEventListener("click", () => { cart = cart.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry); saveCart(); });
    const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "Remove";
    remove.addEventListener("click", () => { cart = cart.filter((entry) => entry.id !== item.id); saveCart(); });
    li.append(label, minus, plus, remove); cartList.append(li);
  });
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  summary.textContent = `${count} items · Total: KSh ${total.toLocaleString()}`;
}
document.querySelector("#clear-cart").addEventListener("click", () => { cart = []; saveCart(); });
renderCart();

// Observable centralized state demonstration.
const store = createStore({ updates: 0, message: "Store is ready." });
const output = document.querySelector("#store-output");
const unsubscribe = store.subscribe((state) => { output.textContent = state.message; });
document.querySelector("#notify-store").addEventListener("click", () => {
  const next = store.getState().updates + 1;
  store.setState({ updates: next, message: `Shared state updated ${next} time(s).` });
});
window.addEventListener("pagehide", unsubscribe, { once: true });