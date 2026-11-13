# Day 5 — Week 6 Weather Dashboard Code Review

This Week 7 challenge is to review the **Weather Dashboard you built in Week 6**. The dashboard remains a Week 6 project in its original Week 6 repository. Do not describe it as a Week 5 project, and do not recreate or move the application into this Week 7 repository.

Use the checklist below against the actual Week 6 source code. Record only findings you have verified.

## Test cases
- [ ] Empty search: show a helpful validation message.
- [ ] Unknown city: show a not-found message.
- [ ] Network/API failure: show a retry-friendly error.
- [ ] Missing or unexpected API fields: avoid crashing.
- [ ] Repeated searches: ensure the latest result is displayed.
- [ ] Keyboard: search can be submitted without a mouse.
- [ ] Mobile layout: controls and results fit narrow screens.

## Code organization
- [ ] Separate API requests, DOM rendering and event handling where appropriate.
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
5. Add tests for formatting and validation helpers where appropriate.

## Review summary
Record the actual Week 6 files inspected, any issues you reproduced, and the improvements you proposed. Do not claim an issue exists unless you have verified it. Keep this review activity in Week 7; keep the Weather Dashboard application itself in Week 6.
