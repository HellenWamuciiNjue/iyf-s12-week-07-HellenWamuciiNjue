// ============================================
// LESSON 9 — CLASSWORK EXERCISE: dom.js (Tasks 9.1–9.4)
// Copy dom-practice.html AND this file into the root of iyf-s12-week-05-{username}.
// Live Server → open dom-practice.html → F12 → Console.
//
// RULES: querySelector by default · textContent for text · classList for looks
//        (no element.style) · const/let only
// ============================================

// small helper: logs ✓ or ✗ so you can check yourself
const check = (label, ok) => console.log(`${ok ? "✓" : "✗"} ${label}`);


// ============================================
// STEP 1 — Task 9.1: select TEN ways. Store each in a const, then log it.
// ============================================
// TODO 1  the h1
const mainTitle = document.querySelector("h1");
console.log("TODO 1 - h1 element:", mainTitle);

// TODO 2  all elements with class "content"
const contentParagraphs = document.getElementsByClassName("content");
console.log("TODO 2 - elements with class 'content':", contentParagraphs);

// TODO 3  the form with id "contact-form" (use getElementById — no #)
const standardContactForm = document.getElementById("contact-form");
console.log("TODO 3 - form with id 'contact-form':", standardContactForm);

// TODO 4  the email input INSIDE the form (one querySelector with a descendant selector)
const emailInputInsideForm = document.querySelector("#contact-form #email");
console.log("TODO 4 - email input inside form:", emailInputInsideForm);

// TODO 5  all list items in the nav
const navigationListItems = document.querySelectorAll(".nav-list li");
console.log("TODO 5 - all list items in nav:", navigationListItems);

// TODO 6  the first .nav-link
const initialLinkPointer = document.querySelector(".nav-link");
console.log("TODO 6 - first .nav-link element:", initialLinkPointer);

// TODO 7  the last paragraph in the article   (hint: p:last-of-type)
const articleFinalParagraph = document.querySelector("article p:last-of-type");
console.log("TODO 7 - last paragraph in article:", articleFinalParagraph);

// TODO 8–10  three more of your own — e.g. the submit button, every h2 in main, the footer
const pageActionSubmitButton = document.getElementById("submit-btn"); // 8
const sectionalHeadingsInMain = document.querySelectorAll("main h2");   // 9
const pageFooterSection = document.querySelector("footer");            // 10
console.log("TODO 8 - Submit Button element:", pageActionSubmitButton);
console.log("TODO 9 - All H2 components inside main:", sectionalHeadingsInMain);
console.log("TODO 10 - Page Footer component:", pageFooterSection);

// Then: what does document.querySelector(".does-not-exist") return? Log it.
const elementSearchFallback = document.querySelector(".does-not-exist");
console.log("document.querySelector('.does-not-exist') output outcome:", elementSearchFallback); // Will output null

// And:  turn your nav items NodeList into an array of their text with [...list].map()
const navigationArrayTextStrings = [...navigationListItems].map(item => item.textContent.trim());
console.log("Array text structure layout transformation values:", navigationArrayTextStrings);


// ============================================
// STEP 2 — Task 9.2: traverse. Say the route out loud before you write it.
// ============================================
// TODO 1  from the header, find the nav inside it
const masterHeaderTag = document.getElementById("main-header");
console.log("Traverse 1 (nav located inside header component):", masterHeaderTag.querySelector("nav"));

// TODO 2  from the first .nav-link, get its parent li
console.log("Traverse 2 (parent li wrapper of initial link link):", initialLinkPointer.parentElement);

// TODO 3  from the article, get its next sibling (should be a section)
const textArticleBox = document.querySelector("article");
console.log("Traverse 3 (next sequential element sibling of article):", textArticleBox.nextElementSibling);

// TODO 4  from the ul, get all its child li elements
const orderedNavListUl = document.querySelector(".nav-list");
console.log("Traverse 4 (all node children inside wrapper ul):", orderedNavListUl.children);

// TODO 5  from the footer, go up to the body
console.log("Traverse 5 (parent node layer of footer context):", pageFooterSection.parentElement);

// TODO 6  from the first .nav-link, use closest() to reach the header
console.log("Traverse 6 (closest header element layer climb path):", initialLinkPointer.closest("#main-header"));


// ============================================
// STEP 3 — Task 9.3: change things
// ============================================
// TODO 1  change the h1 text to something of yours
mainTitle.textContent = "Hellen's Structured DOM Performance Laboratory";

// TODO 2  point the first .nav-link at https://mozilla.org, open in a new tab
//         (target="_blank" and rel="noopener")
initialLinkPointer.setAttribute("href", "https://mozilla.org");
initialLinkPointer.setAttribute("target", "_blank");
initialLinkPointer.setAttribute("rel", "noopener");

// TODO 3  read the article's data-id and data-category with dataset; add data-status="reviewed"
console.log("Target Article original dataset entry identification ID:", textArticleBox.dataset.id);
console.log("Target Article original dataset entry identification Category:", textArticleBox.dataset.category);
textArticleBox.dataset.status = "reviewed";

// TODO 4  add the class "highlight" to the first .content paragraph,
//         toggle "accent" on the second — NO element.style
const structuralParagraphOne = document.querySelector(".content");
if (structuralParagraphOne) {
    structuralParagraphOne.classList.add("highlight");
}
const structuralParagraphTwo = document.querySelector("article p:nth-of-type(2)");
if (structuralParagraphTwo) {
    structuralParagraphTwo.classList.toggle("accent");
}

// TODO 5  THE INJECTION DEMO — run these two lines and watch:
const userInput = `<img src="x" onerror="alert('hacked!')">`;
const targetUnsafeZone = document.getElementById("unsafe");
const targetSafeZone = document.getElementById("safe");

if (targetUnsafeZone && targetSafeZone) {
    // 1. Fire innerHTML immediately to let your instructor see the pop-up warning alert box show up
    targetUnsafeZone.innerHTML = userInput;   
    
    // 2. Use a delay callback timer so the safe plain-text demonstration displays right after clicking OK
    setTimeout(() => {
        targetSafeZone.textContent = userInput;   
    }, 1000);
}

// Write one sentence in a comment: which one would you use for a user's comment, and why?
// COMMENT ANSWER: I would use textContent for a user's comment because it automatically deactivates structural elements and parses scripts into raw, unexecutable string characters, completely securing the application layout against Cross-Site Scripting (XSS) attacks.


// ============================================
// STEP 4 — Task 9.4: create, remove, clone
// ============================================
// TODO 1  write addNavItem(text, href): creates <li><a class="nav-link" href=…>text</a></li>
//         and appends it to .nav-list. Use textContent for the text.
function addNavItem(text, href) {
    const trackingLiNode = document.createElement("li");
    const structuralAnchorNode = document.createElement("a");
    
    structuralAnchorNode.className = "nav-link";
    structuralAnchorNode.setAttribute("href", href);
    structuralAnchorNode.textContent = text;
    
    trackingLiNode.appendChild(structuralAnchorNode);
    
    const contextListUl = document.querySelector(".nav-list");
    if (contextListUl) {
        contextListUl.appendChild(trackingLiNode);
    }
}
addNavItem("Blog", "#blog");
addNavItem("Portfolio", "#portfolio");

// TODO 2  create a paragraph and insert it BEFORE the article's first paragraph
const generatedNoticePara = document.createElement("p");
generatedNoticePara.textContent = "✨ Notice Tracker: This dynamic information box element node was successfully inserted ahead of reading modules.";
generatedNoticePara.classList.add("highlight");
if (textArticleBox && structuralParagraphOne) {
    textArticleBox.insertBefore(generatedNoticePara, structuralParagraphOne);
}

// TODO 3  clone the first nav li (deep), change its text to "Cloned", prepend it to the list
const genericFirstNavLi = document.querySelector(".nav-list li");
if (genericFirstNavLi) {
    const deeplyCopiedCloneLi = genericFirstNavLi.cloneNode(true);
    const underlyingAnchorTag = deeplyCopiedCloneLi.querySelector("a");
    if (underlyingAnchorTag) {
        underlyingAnchorTag.textContent = "Cloned Link Target";
    }
    if (orderedNavListUl) {
        orderedNavListUl.prepend(deeplyCopiedCloneLi);
    }
}

// TODO 4  remove the footer
if (pageFooterSection) {
    pageFooterSection.remove();
}


// ============================================
// Automated Workspace Health Checks Run Verification Metrics
// ============================================
console.log("\n--- Structural Workspace Verification Diagnostics ---");
check("Title elements renamed successfully", mainTitle.textContent === "Hellen's Dynamic DOM Performance Laboratory");
check("Footer item dropped completely from markup profile", document.querySelector("footer") === null);

// ============================================
// FORM SUBMISSION HANDLING (Task 9.3 Custom Interaction)
// ============================================
if (standardContactForm) {
    standardContactForm.addEventListener("submit", (event) => {
        // 1. Stop the page from refreshing automatically!
        event.preventDefault(); 
        
        // 2. Read what the user typed into the inputs
        const userName = document.getElementById("name").value.trim();
        const userEmail = emailInputInsideForm.value.trim();
        
        // 3. Validation: If fields are empty, alert a warning notice
        if (userName === "" || userEmail === "") {
            alert("⚠️ Form Submission Error: Please fill in both your Name and Email fields before submitting!");
        } else {
            // 4. Success: Throw the custom completion alert your teacher wants to see!
            alert(`🎉 Form Submitted Successfully!\n\nHello ${userName}, your assignment hooks are working flawlessly. We captured your email: ${userEmail}`);
            
            // Optional: Clear out the form inputs after successful submission
            standardContactForm.reset();
        }
    });
}
