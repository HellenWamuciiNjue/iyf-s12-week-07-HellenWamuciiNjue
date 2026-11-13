// ============================================
// LESSON 10 — CLASSWORK EXERCISE: To-Do List (the Week 5 deliverable)
// index.html and styles.css are GIVEN. You write this file.
// ============================================

// ---------- DOM elements (given) ----------
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const formError = document.getElementById("form-error");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// ---------- State (given) ----------
const STORAGE_KEY = "week5-todos";  let todos = [];  try {     todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (error) {     todos = []; }  let currentFilter = "all"; let nextId = todos.reduce(     (max, todo) => Math.max(max, Number(todo.id) || 0), 0 ) + 1; let editingId = null;            // [{ id, text, completed }]
let currentFilter = "all"; // "all" | "active" | "completed"
let nextId = 1;
let editingId = null;      // Tracks which item is currently being edited


// ============================================
// STEP 1 — render the list from the array
// ============================================

// TODO 1a: createTodoElement(todo) returns an <li class="todo-item" data-id="…">
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.setAttribute("data-id", todo.id);
    
    if (todo.completed) {
        li.classList.add("completed");
    }

    // Check if this specific item is currently in double-click edit mode
    if (editingId === todo.id) {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit";
        editInput.value = todo.text;
        
        // Save updates on hitting Enter or blur; cancel on Escape
        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                saveEdit(todo.id, editInput.value);
            } else if (event.key === "Escape") {
                editingId = null;
                render();
            }
        });
        
        editInput.addEventListener("blur", () => {
            saveEdit(todo.id, editInput.value);
        });

        li.appendChild(editInput);
        
        // Auto-focus the input box as soon as it mounts on screen
        setTimeout(() => editInput.focus(), 0);
    } else {
        // Normal list viewing layout view
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "toggle";
        checkbox.checked = todo.completed;

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text; // Safe text rendering avoids XSS hooks

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete";
        deleteBtn.textContent = "✕";
        deleteBtn.setAttribute("aria-label", `Delete "${todo.text}"`);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
    }

    return li;
}

// Helper to save double-click inline text modifications cleanly
function saveEdit(id, newText) {
    const trimmed = newText.trim();
    const targetTodo = todos.find(t => t.id === id);
    
    if (targetTodo) {
        if (trimmed !== "") {
            targetTodo.text = trimmed;
        }
    }
    editingId = null;
    render();
}

// TODO 1b: visibleTodos() returns todos filtered by currentFilter
function visibleTodos() {
    if (currentFilter === "active") {
        return todos.filter(todo => !todo.completed);
    } else if (currentFilter === "completed") {
        return todos.filter(todo => todo.completed);
    }
    return todos; // Returns everything if filter status is "all"
}

// TODO 1c: render() — replace the list's children with the visible todos, then updateStats()
function render() {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

    todoList.replaceChildren(...visibleTodos().map(createTodoElement));
    updateStats();
}

// TODO 1d: updateStats() — "1 item left" / "3 items left" (watch the plural)
function updateStats() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    if (activeCount === 1) {
        itemsLeft.textContent = "1 item left";
    } else {
        itemsLeft.textContent = `${activeCount} items left`;
    }
}


// ============================================
// STEP 2 — add a task
// ============================================

// TODO 2a: addTodo(text) — push { id: nextId++, text, completed: false }, then render()
function addTodo(text) {
    todos.push({
        id: nextId++,
        text: text,
        completed: false
    });
    render();
}

// TODO 2b: listen for SUBMIT on the form
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents full browser page reload cycle refresh
    
    const rawValue = input.value.trim();
    if (rawValue === "") {
        formError.textContent = "Type a task first.";
    } else {
        formError.textContent = ""; // Reset application error field states
        addTodo(rawValue);
        input.value = "";
        input.focus();
    }
});


// ============================================
// STEP 3 — toggle and delete with ONE delegated listener
// ============================================

// TODO 3a: toggleTodo(id) and deleteTodo(id) — change the array, then render()
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
    }
    render();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
}

// TODO 3b: ONE click listener on todoList (Event Delegation model layout)
todoList.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) return;

    const id = Number(item.dataset.id);

    // Explicitly check for delete click triggers before modifying completed statuses
    if (event.target.classList.contains("delete")) {
        deleteTodo(id);
        return;
    }
    
    // Check if the click target isn't an input field while toggling completed classes
    if (!event.target.classList.contains("edit")) {
        toggleTodo(id);
    }
});


// ============================================
// STEP 4 — filters, stats, clear completed
// ============================================

// TODO 4a: filterTodos(filter) — set currentFilter; manage visual UI button attribute weights
function filterTodos(filter) {
    currentFilter = filter;
    
    filters.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
        } else {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        }
    });
    
    render();
}

// TODO 4b: a click listener on each filter button
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filterTodos(btn.dataset.filter);
    });
});

// TODO 4c: clearCompleted() — keep only !completed; render()
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    render();
}

clearCompletedBtn.addEventListener("click", clearCompleted);


// ============================================
// STEP 5 — BONUS: double-click to edit
// ============================================
todoList.addEventListener("dblclick", (event) => {
    if (event.target.classList.contains("todo-text")) {
        const item = event.target.closest(".todo-item");
        if (item) {
            editingId = Number(item.dataset.id);
            render();
        }
    }
});


// ---------- Initialize ----------
render();
