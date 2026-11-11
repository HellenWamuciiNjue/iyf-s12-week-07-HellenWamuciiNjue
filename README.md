# Week 7 — JavaScript Best Practices: To-Do List Refactor

A modular refactor of the Week 5 interactive To-Do List. The original user-facing features are retained while application state, storage, business logic, DOM rendering, and event handling are separated into ES modules.

## Features
- Add, complete, delete, and edit tasks
- All, Active, and Completed filters
- Clear completed tasks and live remaining-task count
- Persistent tasks using localStorage
- Safe text rendering with textContent
- Modular JavaScript and automated unit tests
- ESLint 9 flat configuration

## Requirements
- Node.js 22 or 24
- npm

## Run locally
1. Clone this repository.
2. Run `npm install`.
3. Run `npm test` to execute the automated tests.
4. Run `npm run lint` to check code quality.
5. Open `index.html` with VS Code Live Server (or another local static server).

## Project structure
```
index.html
styles.css
js/
  app.js
  state.js
  storage.js
  todo-logic.js
  todo-dom.js
  todo-events.js
tests/
  todo-logic.test.js
daily-challenges/
  day-1.md ... day-5.md
eslint.config.js
package.json
```

## Week 5 continuity
This project is based on the Week 5 To-Do List and preserves its core interactions, including event delegation, filters, inline editing, and task counts. The Week 5 DOM practice exercise remains separate from the application refactor.

## Daily challenges
See the `daily-challenges/` folder for the five daily challenge files.

## Author
Hellen Wamucii Njue
