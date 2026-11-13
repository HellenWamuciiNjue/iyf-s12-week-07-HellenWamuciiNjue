# Day 5 — Weather Dashboard Code Review

Review the Week 5 Weather Dashboard before suggesting changes.

## Test cases
- [ ] Empty search: show a helpful validation message.
- [ ] Unknown city: show a not-found message.
- [ ] Network/API failure: show a retry-friendly error.
- [ ] Missing or unexpected API fields: avoid crashing.
- [ ] Repeated searches: ensure the latest result is displayed.
- [ ] Keyboard: search can be submitted without a mouse.
- [ ] Mobile layout: controls and results fit narrow screens.

## Code organization
- [ ] Separate API requests, DOM rendering and event handling.
- [ ] Use descriptive function and variable names.
- [ ] Avoid duplicated rendering or validation code.
- [ ] Keep API keys out of committed source code.
- [ ] Use safe text rendering for user-provided text.
- [ ] Handle loading and error states.

## Improvements to recommend
1. Add an accessible loading indicator.
2. Validate the search field before requesting data.
3. Handle HTTP errors and network failures.
4. Keep API and UI responsibilities separate.
5. Add tests for formatting and validation helpers.

## Review summary
Record the actual files inspected, issues reproduced, and improvements proposed. Do not claim an issue exists unless you have verified it.