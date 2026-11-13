# Week 7 — JavaScript Best Practices

This repository extends the Week 5 To-Do List and demonstrates browser storage, modular JavaScript, centralized state, testing and code quality.

## Live Demo

Expected GitHub Pages URL (publish from Settings → Pages → Deploy from a branch → main → /root):
https://hellenwamuciiNjue.github.io/iyf-s12-week-07-HellenWamuciiNjue/

## Start here
- **Main To-Do List:** [Open the application](index.html)
- **Practice Labs:** [Notes, Session Storage contact form, Shopping Cart and Observer Pattern](labs.html)
- **Daily Challenges:** [Open the challenge index](daily-challenges/README.md)

## Main To-Do List
- Add, complete, edit and delete tasks.
- Filter All, Active and Completed tasks.
- Clear completed tasks and see the active-task count.
- Persist tasks and selected filter in localStorage.
- Render user text safely with textContent.

## Lesson 13 practice
- Notes App persists notes using JSON and localStorage.
- Contact form restores a sessionStorage draft and clears it after successful demo submission.
- Shopping Cart supports adding products, quantity changes, removal, totals, item count, clear cart and persistence.
- Observable store demonstrates centralized state, subscriptions and unsubscribe.

## Lesson 14 practice
- ES modules separate app setup, state, storage, DOM rendering, events and pure task logic.
- Pure functions are tested with Node's built-in test runner, including edge cases and non-mutation.
- The order-total debugging exercise is covered by tests.
- ESLint 9 uses flat configuration in eslint.config.js.
- Prettier is configured for consistent formatting.

## Daily challenges
See daily-challenges/README.md for all five challenges. Day 5 is a code-review exercise for the **Week 6 Weather Dashboard**; it is not a Week 5 or Week 7 application and is not duplicated in this repository.

## Setup and checks
Requires Node.js 22+ and npm.

```bash
npm install
npm test
npm run lint
npm run format:check
```

Open index.html and labs.html with VS Code Live Server or another local static server. GitHub Pages can be enabled in repository Settings → Pages, selecting the main branch and root folder.

## Week 5 continuity
The original Week 5 source files have been preserved unchanged in week5-original/: app.js, index.html, styles.css, dom-practice.html, dom.js and .gitignore. They are kept as a historical snapshot for comparison; the refactored Week 7 app is in the repository root and js/ folder.

Original Week 5 repository:
https://github.com/HellenWamuciiNjue/iyf-s12-week-05-HellenWamuciiNjue

## Week 6 reference
The Weather Dashboard belongs to Week 6 and should remain in its Week 6 repository. Week 7 Day 5 only asks you to review that existing project using the checklist; it does not move, copy or recreate the dashboard here.

## Collaboration
- Assigned partner: To be completed after confirming the Classroom assignment.
- Partner's pull request: To be added after it is received.
- My review of partner's repository: To be added after completing the assigned review.

## Author
Hellen Wamucii Njue
