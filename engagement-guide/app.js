// =============================================================================
// APP.JS - THE AI ENGAGEMENT GUIDE'S SCRIPT
//
// This file makes the page work: it builds the question cards from the data
// files, keeps the guide up to date as choices change, and handles copying,
// sharing, and downloading.
//
// To change any WORDING, edit the data files (options-data.js, course-data.js,
// rationale-data.js) instead. You can edit this file too, and saving it never
// breaks the page's security settings - the page trusts any script stored in
// this folder.
//
// The sections are numbered and labeled, so you can find your way around.
// =============================================================================

(function () {
    "use strict";

    // =================================================================
    // 1. SETTINGS
    // =================================================================

    // The image-export library, loaded only when someone downloads a PNG.
    // "integrity" is a fingerprint of the exact file: if the file were
    // ever changed by someone else, the browser would refuse to run it.
    const PNG_LIBRARY = {
        src: "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
        integrity: "sha384-ZZ1pncU3bQe8y31yfZdMFdSpttDoPmOZg2wguVK9almUodir1PghgT0eY7Mrty8H"
    };

    // The video shown in the Info window
    const INFO_VIDEO = "https://docs.google.com/videos/d/1qhSSQgAohVCxIsrJn4jvxepKfUUEvuGGjPUF27xaGZg/play";

    // The longest text accepted in any typed box (also limits shared links)
    const MAX_TEXT = 1500;

    // The Assignment Level questions, and the data they come from.
    // "type" is "checkbox" (choose any) or "radio" (choose one).
    // (The Course Level tab works differently: see section 6b.)
    const QUESTIONS = {
        assignment: [
            { key: "useCases",      type: "checkbox" },
            { key: "documentation", type: "checkbox" }
        ]
    };

    // Limits for the Course Level editor (also limits shared links)
    const MAX_TITLE = 200;
    const MAX_SECTIONS = 15;
    const MAX_SECTION_TEXT = 4000;

    // =================================================================
    // 2. SMALL HELPERS
    // =================================================================

    const $ = (selector, root) => (root || document).querySelector(selector);
    const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

    // Make an element. Text is always added as plain text (textContent),
    // so nothing anyone types can ever be treated as code.
    function make(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined && text !== null) element.textContent = text;
        return element;
    }

    // Draw an icon from icons.js. The drawings are fixed, trusted content
    // from that file, never anything a user typed.
    function drawIcon(name, className) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        svg.setAttribute("class", className || "ui-icon");
        svg.innerHTML = ICONS[name] || ICONS["circle-help"];
        return svg;
    }

    // Fill every <span data-icon="..."> placeholder on the page with its icon
    function fillIconPlaceholders(root) {
        $$("[data-icon]", root).forEach(function (spot) {
            spot.replaceWith(drawIcon(spot.dataset.icon));
        });
    }

    // Tell screen reader users about something that just happened
    function announce(message) {
        const status = $("#status");
        status.textContent = "";
        setTimeout(function () { status.textContent = message; }, 50);
    }

    // Briefly change a button's label (for example to "Copied")
    function flashLabel(button, message) {
        const label = $(".button-label", button) || button;
        if (!label.dataset.original) label.dataset.original = label.textContent;
        label.textContent = message;
        announce(message);
        clearTimeout(label.resetTimer);
        label.resetTimer = setTimeout(function () {
            label.textContent = label.dataset.original;
        }, 2000);
    }

    // Keep typed text within a sensible size
    function cleanText(value) {
        return String(value || "").slice(0, MAX_TEXT);
    }

    // =================================================================
    // 3. CHECK THE DATA FILES
    // If a data file has a typo, show a plain-language warning instead
    // of a blank page.
    // =================================================================
    const problems = [];
    if (typeof ICONS !== "object") problems.push("icons.js");
    if (typeof OPTIONS_DATA !== "object") problems.push("options-data.js");
    if (typeof COURSE_DATA !== "object") problems.push("course-data.js");
    if (typeof RATIONALE_DATA !== "object") problems.push("rationale-data.js");
    if (problems.length) {
        const box = $("#data-error");
        box.hidden = false;
        box.append(make("strong", "", "There is a problem loading " + problems.join(", ") + ". "));
        box.append(document.createTextNode(
            "This usually means a recent edit to that file is missing a comma, a quote mark, or a curly brace { }. " +
            "Compare your latest edit with the entries just above or below it, fix the file, and reload this page."));
        return;
    }

    // The data for each tab, by question key
    const DATA = {
        assignment: { useCases: OPTIONS_DATA.useCases, documentation: OPTIONS_DATA.documentation }
    };

    // =================================================================
    // 4. BUILD THE QUESTIONS
    // =================================================================

    // An icon for an option card or the guide, following the "Icons"
    // setting: an emoji, a drawn icon, or nothing.
    function optionIcon(option, style, className) {
        if (style === "none" || !option) return null;
        const holder = make("span", className);
        holder.setAttribute("aria-hidden", "true");
        if (style === "icons") {
            holder.append(drawIcon(option.icon, "ui-icon"));
        } else {
            holder.textContent = option.emoji || "";
        }
        return holder;
    }

    // One option card: a label wrapped around a real checkbox or radio
    function buildCard(option, inputName, type, idPrefix) {
        const card = make("label", "option-card");
        card.dataset.value = option.value;

        const input = make("input");
        input.type = type;
        input.name = inputName;
        input.value = option.value;
        if (option.exclusive) input.dataset.exclusive = "true";
        if (option.isOther) input.dataset.other = "true";
        card.append(input);

        const check = make("span", "card-check");
        check.setAttribute("aria-hidden", "true");
        check.append(drawIcon("check", "ui-icon"));
        card.append(check);

        card.append(make("span", "card-icon"));   // filled by refreshCardIcons()

        const text = make("span", "card-text");
        text.append(make("span", "card-title", option.title));
        if (option.description || option.example) {
            const description = make("span", "card-description", option.description || "");
            description.id = idPrefix + "-" + option.value + "-description";
            if (option.example) {
                description.append(" ");
                description.append(make("code", "", option.example));
            }
            text.append(description);
            input.setAttribute("aria-describedby", description.id);
        }
        card.append(text);
        return card;
    }

    // One question: a fieldset with a heading, the cards, and (if the
    // question has an "Other" card) a box for typing a custom option
    function buildQuestion(tab, question) {
        const data = DATA[tab][question.key];
        const id = tab + "-" + question.key;

        const fieldset = make("fieldset", "question");
        fieldset.id = id;
        fieldset.dataset.key = question.key;

        const legend = make("legend");
        legend.append(make("h2", "", data.question));
        fieldset.append(legend);
        fieldset.append(make("p", "question-hint", question.type === "radio" ? "Choose one." : "Choose all that apply."));

        const grid = make("div", "option-grid");
        data.options.forEach(function (option) {
            grid.append(buildCard(option, id, question.type, id));
        });
        fieldset.append(grid);

        if (data.options.some(function (o) { return o.isOther; })) {
            const box = make("div", "other-box");
            box.hidden = true;
            const label = make("label", "", data.otherLabel || "Describe it:");
            label.htmlFor = id + "-other-text";
            const area = make("textarea");
            area.id = id + "-other-text";
            area.rows = 3;
            area.maxLength = MAX_TEXT;
            area.dataset.otherFor = id;
            box.append(label, area);
            fieldset.append(box);
        }
        return fieldset;
    }

    // Preset reasons in the "No AI Use" and "Open Use" pop-ups
    function buildReasons(containerId, inputName, reasons) {
        const container = $("#" + containerId);
        reasons.forEach(function (reason, index) {
            const card = buildCard({ value: reason.text, title: reason.title, description: reason.text, emoji: "", icon: "" },
                inputName, "radio", inputName + index);
            card.querySelector(".card-icon").remove();
            container.append(card);
        });
    }

    QUESTIONS.assignment.forEach(function (q) { $("#assignment-questions").append(buildQuestion("assignment", q)); });
    buildCourseExamples();
    buildReasons("no-ai-reasons", "noAiReason", RATIONALE_DATA.noAiReasons);
    buildReasons("open-use-reasons", "openUseReason", RATIONALE_DATA.openUseRationales);
    fillIconPlaceholders(document);

    // =================================================================
    // 5. READING AND WRITING THE CHOICES
    // The checkboxes and boxes on the page are the record of what has
    // been chosen. These functions read them, and set them from a link.
    // =================================================================

    function inputsFor(tab, key) {
        return $$('input[name="' + tab + "-" + key + '"]');
    }

    // The values chosen for one question, in the order they appear
    function chosen(tab, key) {
        return inputsFor(tab, key).filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
    }

    function otherText(tab, key) {
        const area = $("#" + tab + "-" + key + "-other-text");
        return area ? area.value.trim() : "";
    }

    function settings() {
        return {
            iconStyle: ($('input[name="iconStyle"]:checked') || {}).value || "emoji",
            iconPosition: ($('input[name="iconPosition"]:checked') || {}).value || "beside"
        };
    }

    function reasonText(dialogId, inputName) {
        const typed = $("#" + dialogId + "-custom").value.trim();
        const picked = $('input[name="' + inputName + '"]:checked');
        return typed || (picked ? picked.value : "");
    }

    function currentTab() {
        return $("#tab-course").getAttribute("aria-selected") === "true" ? "course" : "assignment";
    }

    // Everything needed to rebuild this exact guide, for shared links
    function snapshot() {
        const state = { v: 3, tab: currentTab(), look: settings(), assignment: {}, course: courseSnapshot(), reasons: {} };
        QUESTIONS.assignment.forEach(function (q) {
            state.assignment[q.key] = { chosen: chosen("assignment", q.key), other: otherText("assignment", q.key) };
        });
        state.reasons = {
            noAiPicked: (($('input[name="noAiReason"]:checked') || {}).value) || "",
            noAiTyped: $("#no-ai-custom").value,
            openPicked: (($('input[name="openUseReason"]:checked') || {}).value) || "",
            openTyped: $("#open-use-custom").value
        };
        return state;
    }

    // Set the page from a saved state. Only values that really exist in
    // the data files are accepted, and typed text is limited in length,
    // so a tampered link cannot do anything unexpected.
    function restore(state) {
        if (!state || typeof state !== "object") return;
        const saved = state.assignment;
        if (saved && typeof saved === "object") {
            QUESTIONS.assignment.forEach(function (q) {
                const entry = saved[q.key];
                if (!entry || typeof entry !== "object") return;
                const wanted = Array.isArray(entry.chosen) ? entry.chosen.map(String) : [];
                inputsFor("assignment", q.key).forEach(function (input) {
                    input.checked = wanted.indexOf(input.value) !== -1;
                });
                const area = $("#assignment-" + q.key + "-other-text");
                if (area && typeof entry.other === "string") area.value = cleanText(entry.other);
            });
        }
        restoreCourse(state.course);
        const reasons = state.reasons || {};
        [["noAiReason", reasons.noAiPicked], ["openUseReason", reasons.openPicked]].forEach(function (pair) {
            $$('input[name="' + pair[0] + '"]').forEach(function (input) { input.checked = input.value === pair[1]; });
        });
        if (typeof reasons.noAiTyped === "string") $("#no-ai-custom").value = cleanText(reasons.noAiTyped);
        if (typeof reasons.openTyped === "string") $("#open-use-custom").value = cleanText(reasons.openTyped);
        const look = state.look || {};
        if (["emoji", "icons", "none"].indexOf(look.iconStyle) !== -1) $('input[name="iconStyle"][value="' + look.iconStyle + '"]').checked = true;
        if (["beside", "above"].indexOf(look.iconPosition) !== -1) $('input[name="iconPosition"][value="' + look.iconPosition + '"]').checked = true;
        if (state.tab === "course" || state.tab === "assignment") selectTab(state.tab, false);
    }

    // Links made by the earlier version of this tool used a different
    // format (?policy=...). This turns one of those into today's format.
    function restoreOldLink(encoded) {
        const old = JSON.parse(atob(encoded));
        restore({
            tab: "assignment",
            assignment: {
                useCases: { chosen: old.u || [], other: old.cu || "" },
                documentation: { chosen: old.d || [], other: old.cd || "" }
            },
            reasons: { noAiPicked: old.pr || "", noAiTyped: old.prt || "", openPicked: old.or || "", openTyped: old.ort || "" }
        });
    }

    // Turn a state into text for a link, and back. (Handles emoji and
    // other characters safely, which plain btoa() cannot.)
    function encodeState(state) {
        const bytes = new TextEncoder().encode(JSON.stringify(state));
        let binary = "";
        bytes.forEach(function (b) { binary += String.fromCharCode(b); });
        return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    function decodeState(text) {
        const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
        const bytes = Uint8Array.from(binary, function (c) { return c.charCodeAt(0); });
        return JSON.parse(new TextDecoder().decode(bytes));
    }

    // A link to this page that rebuilds the current guide
    function shareLink(guideOnly) {
        const url = new URL(window.location.href);
        url.search = "";
        url.hash = "";
        url.searchParams.set("guide", encodeState(snapshot()));
        if (guideOnly) url.searchParams.set("preview", "true");
        return url.toString();
    }

    // Keep the address bar up to date, so a refresh keeps your choices
    function updateAddressBar() {
        try {
            const url = new URL(window.location.href);
            url.searchParams.delete("policy");
            url.searchParams.set("guide", encodeState(snapshot()));
            window.history.replaceState(null, "", url);
        } catch (error) {
            // Some browsers do not allow this for pages opened from a file. That is fine.
        }
    }

    // =================================================================
    // 6. RULES BETWEEN CARDS
    // =================================================================

    // Cards marked "exclusive" (like "No AI Use") clear the other cards
    // in the same question, and choosing any other card clears them.
    function applyExclusive(changed) {
        const all = $$('input[name="' + changed.name + '"]');
        if (changed.type !== "checkbox") return;
        if (changed.checked && changed.dataset.exclusive) {
            all.forEach(function (input) { if (input !== changed) input.checked = false; });
        } else if (changed.checked) {
            all.forEach(function (input) { if (input.dataset.exclusive) input.checked = false; });
        }
    }

    // Dim the other cards while an exclusive card is chosen, show "Other"
    // boxes only when their card is chosen, and hide questions that do
    // not apply (for example, documentation when AI is not allowed).
    function refreshQuestions() {
        QUESTIONS.assignment.forEach(function (q) {
            const inputs = inputsFor("assignment", q.key);
            const exclusiveOn = inputs.some(function (i) { return i.checked && i.dataset.exclusive; });
            inputs.forEach(function (input) {
                input.closest(".option-card").classList.toggle("is-muted", exclusiveOn && !input.checked);
            });
            const otherInput = inputs.find(function (i) { return i.dataset.other; });
            const area = $("#assignment-" + q.key + "-other-text");
            if (otherInput && area) area.parentElement.hidden = !otherInput.checked;
        });

        // Assignment: no documentation question when AI is not allowed
        const noAi = chosen("assignment", "useCases").indexOf("prohibited") !== -1;
        $("#assignment-documentation").hidden = noAi;

        // Course: show the editor once an example has been chosen
        $("#course-editor").hidden = !chosenExample();
    }

    // Card icons follow the "Icons" setting too
    function refreshCardIcons() {
        const style = settings().iconStyle;
        const setIcon = function (name, option) {
            const input = $('input[name="' + name + '"][value="' + CSS.escape(option.value) + '"]');
            const spot = input.closest(".option-card").querySelector(".card-icon");
            spot.replaceChildren();
            const icon = optionIcon(option, style, "");
            if (icon) spot.append(...icon.childNodes);
            spot.hidden = !icon;
        };
        QUESTIONS.assignment.forEach(function (q) {
            DATA.assignment[q.key].options.forEach(function (option) { setIcon("assignment-" + q.key, option); });
        });
        COURSE_DATA.examples.forEach(function (example) { setIcon("course-example", example); });
        $("#icon-position").hidden = style === "none";
    }

    // =================================================================
    // 6b. COURSE LEVEL: EXAMPLES AND THE "MAKE IT YOURS" EDITOR
    // The instructor picks the example closest to their course. Its
    // title and sections are copied into the editor, where every part
    // can be changed, and the guide is built from the editor.
    // =================================================================
    let currentExample = null;   // the example the editor was filled from
    let pendingExample = null;   // an example waiting for "Replace them?"

    // The example cards (choose one), built from course-data.js
    function buildCourseExamples() {
        const fieldset = make("fieldset", "question");
        fieldset.id = "course-example";
        const legend = make("legend");
        legend.append(make("h2", "", COURSE_DATA.question));
        fieldset.append(legend);
        fieldset.append(make("p", "question-hint", COURSE_DATA.hint));
        const grid = make("div", "option-grid");
        COURSE_DATA.examples.forEach(function (example) {
            const card = buildCard({ value: example.value, emoji: example.emoji, icon: example.icon,
                title: example.title, description: example.summary }, "course-example", "radio", "course-example");
            if (example.basedOn) card.querySelector(".card-text").append(make("span", "card-source", "Based on: " + example.basedOn));
            grid.append(card);
        });
        fieldset.append(grid);
        $("#course-examples").append(fieldset);
    }

    function chosenExample() {
        const picked = $('input[name="course-example"]:checked');
        return picked ? COURSE_DATA.examples.find(function (e) { return e.value === picked.value; }) || null : null;
    }

    // An example, in the same shape as the editor's contents
    function exampleAsEditorText(example) {
        return {
            title: example.guideTitle || example.title,
            sections: (example.sections || []).map(function (s) {
                return { heading: s.heading || "", text: (s.lines || []).join("\n"), emoji: s.emoji || "", icon: s.icon || "info" };
            })
        };
    }

    function fillEditor(content) {
        $("#course-title").value = content.title;
        const list = $("#course-sections");
        list.replaceChildren();
        content.sections.forEach(function (section) { list.append(sectionEditor(section)); });
        numberSections();
    }

    function loadExample(example) {
        currentExample = example;
        fillEditor(exampleAsEditorText(example));
    }

    // One box for editing one section: a heading, its text, and a
    // Remove button. The section keeps its example's icon.
    function sectionEditor(section) {
        const box = make("fieldset", "section-editor");
        box.dataset.emoji = section.emoji || "ℹ️";
        box.dataset.icon = ICONS[section.icon] ? section.icon : "info";
        box.append(make("legend"));

        const top = make("div", "section-editor-top");
        const field = make("div");
        const heading = make("input", "section-heading");
        heading.type = "text";
        heading.maxLength = MAX_TITLE;
        heading.value = section.heading || "";
        field.append(make("label", "field-label", "Heading"), heading);
        const remove = make("button", "button button-secondary button-small remove-section");
        remove.type = "button";
        remove.append(drawIcon("trash-2"), make("span", "", "Remove"));
        top.append(field, remove);

        const text = make("textarea", "section-text");
        text.maxLength = MAX_SECTION_TEXT;
        text.value = section.text || "";
        text.rows = Math.min(10, Math.max(3, text.value.split("\n").length + 1));
        box.append(top, make("label", "field-label", "Text"), text);
        return box;
    }

    // Number the sections, and connect each label to its box
    function numberSections() {
        const boxes = $$("#course-sections .section-editor");
        boxes.forEach(function (box, i) {
            const n = i + 1;
            box.querySelector("legend").textContent = "Section " + n;
            const heading = box.querySelector(".section-heading");
            const text = box.querySelector(".section-text");
            const labels = box.querySelectorAll(".field-label");
            heading.id = "section-" + n + "-heading";
            text.id = "section-" + n + "-text";
            labels[0].htmlFor = heading.id;
            labels[1].htmlFor = text.id;
            box.querySelector(".remove-section").setAttribute("aria-label", "Remove section " + n);
        });
        $("#add-section").disabled = boxes.length >= MAX_SECTIONS;
    }

    function readEditor() {
        return {
            title: $("#course-title").value.trim(),
            sections: $$("#course-sections .section-editor").map(function (box) {
                return {
                    heading: box.querySelector(".section-heading").value.trim(),
                    text: box.querySelector(".section-text").value,
                    emoji: box.dataset.emoji,
                    icon: box.dataset.icon
                };
            })
        };
    }

    // True when the editor no longer matches the example it came from
    function hasChanges() {
        if (!currentExample) return false;
        const normal = function (content) {
            return JSON.stringify([content.title.trim(), content.sections.map(function (s) {
                return [s.heading.trim(), s.text.trim(), s.icon];
            })]);
        };
        return normal(readEditor()) !== normal(exampleAsEditorText(currentExample));
    }

    // For shared links: which example, plus the edits (only if there are
    // any, which keeps links short)
    function courseSnapshot() {
        return { example: currentExample ? currentExample.value : "", edited: hasChanges() ? readEditor() : null };
    }

    // From a shared link. Unknown examples are ignored, and every piece of
    // text is checked and limited in length, so a tampered link cannot do
    // anything unexpected.
    function restoreCourse(saved) {
        if (!saved || typeof saved !== "object") return;
        const example = COURSE_DATA.examples.find(function (e) { return e.value === saved.example; });
        if (!example) return;
        $$('input[name="course-example"]').forEach(function (input) { input.checked = input.value === example.value; });
        loadExample(example);
        const edited = saved.edited;
        if (!edited || typeof edited !== "object" || !Array.isArray(edited.sections)) return;
        fillEditor({
            title: String(edited.title || "").slice(0, MAX_TITLE),
            sections: edited.sections.slice(0, MAX_SECTIONS)
                .filter(function (s) { return s && typeof s === "object"; })
                .map(function (s) {
                    return {
                        heading: String(s.heading || "").slice(0, MAX_TITLE),
                        text: String(s.text || "").slice(0, MAX_SECTION_TEXT),
                        emoji: String(s.emoji || "").slice(0, 8),
                        icon: ICONS[s.icon] ? s.icon : "info"
                    };
                })
        });
    }

    // Choosing an example. If the editor has changes, ask before replacing them.
    $("#course-examples").addEventListener("change", function (event) {
        const example = chosenExample();
        if (!example || example === currentExample) return;
        if (hasChanges()) {
            pendingExample = example;
            // Keep the old example selected until the instructor decides
            $$('input[name="course-example"]').forEach(function (input) { input.checked = input.value === currentExample.value; });
            openDialog($("#replace-dialog"), event.target);
            return;
        }
        loadExample(example);
    });

    const replaceDialog = $("#replace-dialog");
    $("[data-keep]", replaceDialog).addEventListener("click", function () {
        pendingExample = null;
        replaceDialog.close();
    });
    $("[data-replace]", replaceDialog).addEventListener("click", function () {
        const example = pendingExample;
        pendingExample = null;
        replaceDialog.close();
        if (!example) return;
        $$('input[name="course-example"]').forEach(function (input) { input.checked = input.value === example.value; });
        loadExample(example);
        refreshAll();
        announce("Started from " + example.title);
    });
    // Esc means "keep my changes"
    replaceDialog.addEventListener("cancel", function () { pendingExample = null; });

    $("#add-section").addEventListener("click", function () {
        const box = sectionEditor({ heading: "", text: "", emoji: "ℹ️", icon: "info" });
        $("#course-sections").append(box);
        numberSections();
        box.querySelector(".section-heading").focus();
        refreshAll();
    });

    $("#undo-changes").addEventListener("click", function () {
        if (currentExample) loadExample(currentExample);
        refreshAll();
        announce("Your changes were undone");
    });

    $("#course-sections").addEventListener("click", function (event) {
        const remove = event.target.closest(".remove-section");
        if (!remove) return;
        const box = remove.closest(".section-editor");
        const next = box.nextElementSibling || box.previousElementSibling;
        box.remove();
        numberSections();
        // Put keyboard focus somewhere sensible, not lost at the top of the page
        (next ? next.querySelector(".section-heading") : $("#add-section")).focus();
        refreshAll();
        announce("Section removed");
    });

    // =================================================================
    // 7. WHAT THE GUIDE SAYS
    // Each tab turns its choices into a "guide": a title and a list of
    // blocks. Everything else (the preview, the downloads, the alt text)
    // is made from this one description, so they always match.
    //
    // A guide looks like:
    //   { level: "open" | "selective" | "none",
    //     title: "...", titleIcons: [option, ...],
    //     blocks: [ { kind: "paragraph", icon, text },
    //               { kind: "list", icon, heading, items: [ { icon, title, text, example } ] },
    //               { kind: "section", icon, heading, lines: [ "text", "- bullet" ] } ] }
    // ("list" blocks are used by the Assignment Level tab, and "section"
    // blocks by the Course Level tab.)
    // =================================================================

    // Icons used for headings in the guide (emoji + drawn icon)
    const HEADING_ICONS = {
        open:      { emoji: "✅", icon: "circle-check" },
        selective: { emoji: "⚠️", icon: "triangle-alert" },
        none:      { emoji: "🚫", icon: "ban" },
        allowed:   { emoji: "✔️", icon: "check" },
        document:  { emoji: "📝", icon: "file-pen-line" },
        other:     { emoji: "➕", icon: "plus" }
    };

    // The chosen cards of one question, as guide items
    function chosenItems(tab, key) {
        const data = DATA[tab][key];
        const picked = chosen(tab, key);
        const items = [];
        data.options.forEach(function (option) {
            if (picked.indexOf(option.value) === -1 || option.exclusive) return;
            if (option.isOther) {
                const typed = otherText(tab, key);
                if (typed) items.push({ icon: HEADING_ICONS.other, title: "", text: typed });
            } else {
                items.push({ icon: option, title: option.title, text: option.description || "", example: option.example || "" });
            }
        });
        return items;
    }

    function assignmentGuide() {
        const text = OPTIONS_DATA.guideText;
        const useCases = chosen("assignment", "useCases");
        let level = null;
        if (useCases.indexOf("prohibited") !== -1) level = "none";
        else if (useCases.indexOf("encouraged") !== -1) level = "open";
        else if (useCases.length) level = "selective";

        const docChoices = chosen("assignment", "documentation");
        const docItems = level === "none" ? [] : chosenItems("assignment", "documentation");
        const hasDocs = level !== "none" && docChoices.length > 0 && docChoices.indexOf("none") === -1;

        const guide = { level: level, title: "", titleIcons: [], blocks: [] };
        if (!level) {
            if (docItems.length) guide.blocks.push({ kind: "list", icon: HEADING_ICONS.document, heading: OPTIONS_DATA.documentation.guideHeading, items: docItems });
            return guide;
        }

        const titles = { open: text.openTitle, selective: text.selectiveTitle, none: text.noAiTitle };
        guide.title = titles[level] + (hasDocs ? (text.separator || " - ") + text.documentationTag : "");
        guide.titleIcons = [HEADING_ICONS[level]];
        if (hasDocs) guide.titleIcons.push(HEADING_ICONS.document);

        if (level === "open") {
            const why = reasonText("open-use", "openUseReason");
            guide.blocks.push({ kind: "paragraph", icon: HEADING_ICONS.open, text: text.openSentence + (why ? " " + why : "") });
        } else if (level === "none") {
            const why = reasonText("no-ai", "noAiReason");
            guide.blocks.push({ kind: "paragraph", icon: HEADING_ICONS.none, text: text.noAiSentence + (why ? " " + why : "") });
        } else {
            const items = chosenItems("assignment", "useCases");
            if (items.length) guide.blocks.push({ kind: "list", icon: HEADING_ICONS.allowed, heading: OPTIONS_DATA.useCases.guideHeading, items: items });
        }
        if (hasDocs && docItems.length) {
            guide.blocks.push({ kind: "list", icon: HEADING_ICONS.document, heading: OPTIONS_DATA.documentation.guideHeading, items: docItems });
        }
        return guide;
    }

    // The Course Level guide is whatever is in the editor right now
    function courseGuide() {
        const example = chosenExample();
        const guide = { level: null, title: "", titleIcons: [], blocks: [] };
        if (!example) return guide;
        const edited = readEditor();
        guide.level = ["none", "selective", "open"].indexOf(example.level) !== -1 ? example.level : "selective";
        guide.title = edited.title;
        guide.titleIcons = guide.title ? [example] : [];
        edited.sections.forEach(function (section) {
            const lines = section.text.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
            if (!section.heading && !lines.length) return;
            guide.blocks.push({ kind: "section", icon: { emoji: section.emoji, icon: section.icon }, heading: section.heading, lines: lines });
        });
        return guide;
    }

    function currentGuide() {
        return currentTab() === "course" ? courseGuide() : assignmentGuide();
    }

    // =================================================================
    // 8. SHOWING THE GUIDE
    // =================================================================

    // Build the guide as page elements. Used for the preview, the HTML
    // download, and the PNG picture.
    function guideElement(guide, look) {
        const root = make("article", "guide guide-icons-" + (look.iconStyle === "none" ? "none" : look.iconPosition));
        const style = look.iconStyle;

        if (!guide.title && !guide.blocks.length) {
            root.append(make("p", "guide-empty", "Choose options to build your AI Engagement Guide."));
            return root;
        }

        if (guide.title) {
            const header = make("header", "guide-title guide-level-" + guide.level);
            const icons = make("span", "guide-icons");
            guide.titleIcons.forEach(function (option) {
                const icon = optionIcon(option, style, "guide-icon");
                if (icon) icons.append(icon);
            });
            if (icons.childNodes.length) header.append(icons);
            header.append(make("h3", "", guide.title));
            root.append(header);
        }

        guide.blocks.forEach(function (block) {
            const section = make("section", "guide-block");
            if (block.kind === "paragraph") {
                const paragraph = make("p", "guide-paragraph");
                const icon = optionIcon(block.icon, style, "guide-icon");
                if (icon) paragraph.append(icon);
                paragraph.append(make("span", "", block.text));
                section.append(paragraph);
            } else if (block.kind === "section") {
                // A Course Level section: an optional heading, then
                // paragraphs, with "- " lines grouped into bullet lists
                if (block.heading) {
                    const heading = make("h4", "guide-block-heading");
                    const icon = optionIcon(block.icon, style, "guide-icon");
                    if (icon) heading.append(icon);
                    heading.append(make("span", "", block.heading));
                    section.append(heading);
                }
                let list = null;
                block.lines.forEach(function (line) {
                    if (isBullet(line)) {
                        if (!list) { list = make("ul", "guide-bullets"); section.append(list); }
                        list.append(make("li", "", bulletText(line)));
                    } else {
                        list = null;
                        section.append(make("p", "guide-section-text", line));
                    }
                });
            } else {
                const heading = make("h4", "guide-block-heading");
                const icon = optionIcon(block.icon, style, "guide-icon");
                if (icon) heading.append(icon);
                heading.append(make("span", "", block.heading));
                section.append(heading);

                const list = make("ul", "guide-list");
                block.items.forEach(function (item) {
                    const li = make("li", "guide-item");
                    const itemHeading = make("p", "guide-item-heading");
                    const itemIcon = optionIcon(item.icon, style, "guide-icon");
                    if (itemIcon) itemHeading.append(itemIcon);
                    if (item.title) {
                        itemHeading.append(make("span", "", item.title + ":"));
                        li.append(itemHeading);
                        if (item.text || item.example) li.append(itemText(item));
                    } else {
                        // A typed "Other" option: just its text, beside its icon
                        itemHeading.append(make("span", "", item.text));
                        li.append(itemHeading);
                    }
                    list.append(li);
                });
                section.append(list);
            }
            root.append(section);
        });
        return root;
    }

    // A line that starts with "- " (or "* " or "• ") is a bullet point
    function isBullet(line) {
        return /^[-*\u2022]\s+/.test(line);
    }

    function bulletText(line) {
        return line.replace(/^[-*\u2022]\s+/, "");
    }

    function itemText(item) {
        const text = make("p", "guide-item-text", item.text);
        if (item.example) {
            text.append(" ");
            text.append(make("code", "", item.example));
        }
        return text;
    }

    // The guide as plain text (used for copying, the .txt download, and
    // the alt text). Emoji are included only when "Emoji" is chosen.
    function guideAsText(guide, look) {
        const emoji = function (option) { return look.iconStyle === "emoji" && option && option.emoji ? option.emoji + " " : ""; };
        const lines = [];
        if (guide.title) lines.push(guide.titleIcons.map(emoji).join("") + guide.title, "");
        guide.blocks.forEach(function (block) {
            if (block.kind === "paragraph") {
                lines.push(emoji(block.icon) + block.text, "");
            } else if (block.kind === "section") {
                if (block.heading) lines.push(emoji(block.icon) + block.heading);
                block.lines.forEach(function (line) {
                    lines.push(isBullet(line) ? "  \u2022 " + bulletText(line) : line);
                });
                lines.push("");
            } else {
                lines.push(emoji(block.icon) + block.heading);
                block.items.forEach(function (item) {
                    const example = item.example ? " “" + item.example + "”" : "";
                    lines.push("  " + emoji(item.icon) + (item.title ? item.title + ": " + item.text + example : item.text));
                });
                lines.push("");
            }
        });
        return lines.filter(function (line, i, all) { return !(line === "" && all[i - 1] === ""); }).join("\n").trim();
    }

    function guideAsAltText(guide) {
        if (!guide.title && !guide.blocks.length) return "";
        const parts = ["AI Engagement Guide"];
        if (guide.title) parts.push(guide.title);
        guide.blocks.forEach(function (block) {
            if (block.kind === "paragraph") {
                parts.push(block.text);
            } else if (block.kind === "section") {
                if (block.heading) parts.push(block.heading);
                block.lines.forEach(function (line) { parts.push(isBullet(line) ? bulletText(line) : line); });
            } else {
                parts.push(block.heading);
                block.items.forEach(function (item) {
                    const example = item.example ? " “" + item.example + "”" : "";
                    parts.push(item.title ? item.title + ": " + item.text + example : item.text);
                });
            }
        });
        return parts.join(" | ");
    }

    function guideAsMarkdown(guide, look) {
        const emoji = function (option) { return look.iconStyle === "emoji" && option && option.emoji ? option.emoji + " " : ""; };
        // Stop typed text from being read as Markdown formatting
        const safe = function (text) { return String(text).replace(/([\\`*_{}\[\]<>#|])/g, "\\$1"); };
        const out = [];
        if (guide.title) out.push("# " + guide.titleIcons.map(emoji).join("") + safe(guide.title), "");
        guide.blocks.forEach(function (block) {
            if (block.kind === "paragraph") {
                out.push(emoji(block.icon) + safe(block.text), "");
            } else if (block.kind === "section") {
                if (block.heading) out.push("## " + emoji(block.icon) + safe(block.heading), "");
                block.lines.forEach(function (line, i) {
                    if (isBullet(line)) {
                        out.push("- " + safe(bulletText(line)));
                        if (!isBullet(block.lines[i + 1] || "")) out.push("");
                    } else {
                        out.push(safe(line), "");
                    }
                });
            } else {
                out.push("## " + emoji(block.icon) + safe(block.heading), "");
                block.items.forEach(function (item) {
                    const example = item.example ? " `" + item.example.replace(/`/g, "'") + "`" : "";
                    out.push("- " + emoji(item.icon) + (item.title ? "**" + safe(item.title) + ":** " + safe(item.text) + example : safe(item.text)));
                });
                out.push("");
            }
        });
        return out.join("\n").trim() + "\n";
    }

    // A complete web page of the guide, with the same look as the preview
    function guideAsHTMLDocument(guide, look) {
        const holder = make("div");
        holder.append(guideElement(guide, look));
        const css = $("#guide-styles").textContent;
        return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n" +
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
            "<title>AI Engagement Guide</title>\n<style>\nbody { margin: 2rem auto; max-width: 800px; padding: 0 1rem; }\n" +
            css + "\n</style>\n</head>\n<body>\n" + holder.innerHTML + "\n</body>\n</html>\n";
    }

    // The guide as formatted HTML for pasting into an LMS. Styles are
    // written on each element, because most LMS editors remove style sheets.
    function guideAsPasteHTML(guide, look) {
        const element = guideElement(guide, look);
        const styles = {
            ".guide": "font-family:Arial,sans-serif;line-height:1.55;color:#1f2937;",
            ".guide-title": "display:flex;align-items:center;gap:12px;margin:0 0 16px 0;padding:12px 16px;border-left:6px solid #0046ad;background:#f4f6fa;",
            ".guide-title h3": "margin:0;font-size:1.3em;",
            ".guide-icons": "display:flex;gap:6px;font-size:1.5em;",
            ".guide-block-heading": "display:flex;gap:8px;margin:0 0 6px 0;font-size:1.1em;",
            ".guide-paragraph": "display:flex;gap:8px;margin:0 0 12px 0;",
            ".guide-list": "list-style:none;margin:0 0 12px 0;padding:0 0 0 28px;",
            ".guide-item": "margin:0 0 10px 0;",
            ".guide-item-heading": "display:flex;gap:6px;margin:0;font-weight:bold;",
            ".guide-item-text": "margin:2px 0 0 0;",
            ".guide-section-text": "margin:0 0 8px 0;",
            ".guide-bullets": "margin:0 0 8px 0;padding-left:1.4em;",
            ".guide-icon svg": "width:1.1em;height:1.1em;"
        };
        Object.keys(styles).forEach(function (selector) {
            (element.matches(selector) ? [element] : []).concat($$(selector, element)).forEach(function (el) {
                el.setAttribute("style", (el.getAttribute("style") || "") + styles[selector]);
            });
        });
        return element.outerHTML;
    }

    // Rebuild the preview and the alt text
    function refreshGuide() {
        const guide = currentGuide();
        const look = settings();
        $("#guide").replaceChildren(guideElement(guide, look));
        const alt = guideAsAltText(guide);
        $("#alt-text").value = alt;
        $("#png-alt-text").value = alt;
        tellParentPage();
    }

    // Run after every change
    function refreshAll() {
        refreshQuestions();
        refreshGuide();
        updateAddressBar();
    }

    // =================================================================
    // 9. TABS (Assignment Level / Course Level)
    // Works with the mouse, and with the arrow keys as screen reader
    // users expect.
    // =================================================================
    const tabs = $$('[role="tab"]');

    function selectTab(name, moveFocus) {
        tabs.forEach(function (tab) {
            const isOn = tab.id === "tab-" + name;
            tab.setAttribute("aria-selected", isOn ? "true" : "false");
            tab.tabIndex = isOn ? 0 : -1;
            $("#" + tab.getAttribute("aria-controls")).hidden = !isOn;
            if (isOn && moveFocus) tab.focus();
        });
    }

    tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
            selectTab(tab.id.replace("tab-", ""), false);
            refreshAll();
        });
        tab.addEventListener("keydown", function (event) {
            let next = null;
            if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
            if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
            if (event.key === "Home") next = tabs[0];
            if (event.key === "End") next = tabs[tabs.length - 1];
            if (next) {
                event.preventDefault();
                selectTab(next.id.replace("tab-", ""), true);
                refreshAll();
            }
        });
    });

    // =================================================================
    // 10. RESPONDING TO CHOICES
    // =================================================================
    $(".questions").addEventListener("change", function (event) {
        const input = event.target;
        if (input.matches("input")) applyExclusive(input);

        // Choosing "No AI Use" or "Open Use" asks for a reason
        if (input.name === "assignment-useCases" && input.checked) {
            if (input.value === "prohibited") openDialog($("#no-ai-dialog"), input);
            if (input.value === "encouraged") openDialog($("#open-use-dialog"), input);
        }
        refreshAll();
    });

    $(".questions").addEventListener("input", function (event) {
        if (event.target.matches("textarea, input[type=text]")) refreshAll();
    });

    $(".display-options").addEventListener("change", function () {
        refreshCardIcons();
        refreshAll();
    });

    // =================================================================
    // 11. POP-UP WINDOWS
    // =================================================================
    let openedFrom = null;   // the button that opened a pop-up

    function openDialog(dialog, from) {
        openedFrom = from || document.activeElement;
        if (dialog.id === "info-dialog") {
            // Add the video only while the window is open (no Google
            // request unless someone opens it)
            const frame = make("iframe");
            frame.src = INFO_VIDEO;
            frame.title = "Video: About the AI Engagement Guide";
            frame.allow = "fullscreen; encrypted-media";
            $("#info-video").replaceChildren(frame);
        }
        dialog.showModal();
    }

    $$("dialog").forEach(function (dialog) {
        dialog.addEventListener("close", function () {
            if (dialog.id === "info-dialog") $("#info-video").replaceChildren();
            if (dialog.id === "embed-dialog") $("#embed-preview").removeAttribute("src");
            // Put keyboard focus back where it was before the window opened
            if (openedFrom && document.contains(openedFrom)) openedFrom.focus();
        });
        // Clicking the dimmed area outside the window closes it
        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) cancelOrClose(dialog);
        });
        $$("[data-close]", dialog).forEach(function (button) {
            button.addEventListener("click", function () { dialog.close(); });
        });
    });

    // The two reason windows: "Done" keeps the choice; "Cancel", the X,
    // Esc, or clicking outside unselects No AI Use / Open Use again.
    function setUpReasonDialog(dialogId, cardValue, inputName) {
        const dialog = $("#" + dialogId + "-dialog");
        const customBox = $("#" + dialogId + "-custom");

        function cancel() {
            const card = $('input[name="assignment-useCases"][value="' + cardValue + '"]');
            card.checked = false;
            $$('input[name="' + inputName + '"]').forEach(function (r) { r.checked = false; });
            customBox.value = "";
            dialog.close();
            refreshAll();
        }
        dialog.cancelChoice = cancel;
        $$("[data-cancel]", dialog).forEach(function (button) { button.addEventListener("click", cancel); });
        $("[data-done]", dialog).addEventListener("click", function () { dialog.close(); refreshAll(); });
        // Esc
        dialog.addEventListener("cancel", function (event) { event.preventDefault(); cancel(); });
        // Picking a preset clears the typed box, and typing clears the preset,
        // so only one reason appears in the guide
        dialog.addEventListener("change", function (event) {
            if (event.target.name === inputName) customBox.value = "";
            refreshAll();
        });
        customBox.addEventListener("input", function () {
            if (customBox.value.trim()) $$('input[name="' + inputName + '"]').forEach(function (r) { r.checked = false; });
            refreshAll();
        });
    }
    setUpReasonDialog("no-ai", "prohibited", "noAiReason");
    setUpReasonDialog("open-use", "encouraged", "openUseReason");

    function cancelOrClose(dialog) {
        if (dialog.cancelChoice) dialog.cancelChoice();
        else dialog.close();
    }

    $("#info-button").addEventListener("click", function () { openDialog($("#info-dialog"), this); });
    $("#share-button").addEventListener("click", function () { openDialog($("#share-dialog"), this); });

    // =================================================================
    // 12. COPYING
    // =================================================================

    // Copy plain text. The modern way works on secure (https) sites and
    // files on your computer; the older way is a backup.
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).catch(function () { return copyTheOldWay(text); });
        }
        return copyTheOldWay(text);
    }

    function copyTheOldWay(text) {
        return new Promise(function (resolve, reject) {
            const scratch = make("textarea");
            scratch.value = text;
            scratch.setAttribute("readonly", "");
            scratch.className = "visually-hidden";
            (document.querySelector("dialog[open]") || document.body).append(scratch);
            scratch.select();
            const worked = document.execCommand("copy");
            scratch.remove();
            if (worked) resolve(); else reject(new Error("copy failed"));
        });
    }

    // Copy formatted text (for pasting into an LMS), with plain text as a backup
    function copyFormatted(html, text) {
        if (navigator.clipboard && window.isSecureContext && typeof ClipboardItem !== "undefined") {
            return navigator.clipboard.write([new ClipboardItem({
                "text/html": new Blob([html], { type: "text/html" }),
                "text/plain": new Blob([text], { type: "text/plain" })
            })]).catch(function () { return copyText(text); });
        }
        return copyText(text);
    }

    function copied(button) {
        return function () { flashLabel(button, "Copied"); };
    }

    function notCopied() {
        announce("Sorry, that could not be copied. Please select the text and copy it yourself.");
    }

    $("#copy-button").addEventListener("click", function () {
        const guide = currentGuide();
        const look = settings();
        copyFormatted(guideAsPasteHTML(guide, look), guideAsText(guide, look)).then(copied(this), notCopied);
    });

    $("#copy-alt-button").addEventListener("click", function () {
        copyText($("#alt-text").value).then(copied(this), notCopied);
    });

    $("#png-copy-alt-button").addEventListener("click", function () {
        copyText($("#png-alt-text").value).then(copied(this), notCopied);
    });

    $("#copy-link-button").addEventListener("click", function () {
        copyText(shareLink($("#guide-only").checked)).then(copied(this), notCopied);
    });

    $("#embed-button").addEventListener("click", function () {
        const link = shareLink($("#guide-only").checked);
        const code = '<iframe src="' + link.replace(/"/g, "&quot;") + '" width="100%" height="600" style="border:none;" title="AI Engagement Guide"></iframe>';
        $("#embed-code").value = code;
        $("#embed-preview").src = link;
        $("#share-dialog").close();
        openDialog($("#embed-dialog"), $("#share-button"));
    });

    $("#copy-embed-button").addEventListener("click", function () {
        copyText($("#embed-code").value).then(copied(this), notCopied);
    });

    // =================================================================
    // 13. DOWNLOADS
    // =================================================================
    function fileName(extension) {
        return "ai-engagement-guide-" + currentTab() + "." + extension;
    }

    function download(content, name, type) {
        const link = make("a");
        link.href = URL.createObjectURL(new Blob([content], { type: type }));
        link.download = name;
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
    }

    // Load the image library the first time it is needed
    function loadPngLibrary() {
        if (window.html2canvas) return Promise.resolve();
        return new Promise(function (resolve, reject) {
            const script = make("script");
            script.src = PNG_LIBRARY.src;
            script.integrity = PNG_LIBRARY.integrity;
            script.crossOrigin = "anonymous";
            script.onload = resolve;
            script.onerror = reject;
            document.head.append(script);
        });
    }

    $$("[data-download]").forEach(function (button) {
        button.addEventListener("click", function () {
            const guide = currentGuide();
            const look = settings();
            const kind = button.dataset.download;
            if (kind === "html") download(guideAsHTMLDocument(guide, look), fileName("html"), "text/html");
            if (kind === "markdown") download(guideAsMarkdown(guide, look), fileName("md"), "text/markdown");
            if (kind === "text") download(guideAsText(guide, look) + "\n", fileName("txt"), "text/plain");
            if (kind !== "png") {
                announce("Download started");
                $("#share-dialog").close();
                return;
            }
            flashLabel(button, "Making the picture...");
            loadPngLibrary().then(function () {
                return window.html2canvas($("#guide"), { scale: 2, backgroundColor: "#ffffff", logging: false });
            }).then(function (canvas) {
                const link = make("a");
                link.download = fileName("png");
                link.href = canvas.toDataURL("image/png");
                link.click();
                $("#share-dialog").close();
                openDialog($("#png-dialog"), $("#share-button"));
            }).catch(function () {
                flashLabel(button, "Could not make the picture. Please try again.");
            });
        });
    });

    // =================================================================
    // 14. START OVER (clears the tab you are on)
    // =================================================================
    $("#restart-button").addEventListener("click", function () {
        const tab = currentTab();
        $$("#panel-" + tab + " input").forEach(function (input) { input.checked = false; });
        $$("#panel-" + tab + " textarea").forEach(function (area) { area.value = ""; });
        if (tab === "course") {
            currentExample = null;
            $("#course-sections").replaceChildren();
            $("#course-title").value = "";
        }
        if (tab === "assignment") {
            $$('input[name="noAiReason"], input[name="openUseReason"]').forEach(function (r) { r.checked = false; });
            $("#no-ai-custom").value = "";
            $("#open-use-custom").value = "";
        }
        refreshAll();
        announce("Your choices on this tab were cleared");
    });

    // =================================================================
    // 15. WHEN THIS PAGE IS EMBEDDED IN ANOTHER PAGE (an LMS)
    // Tell the outer page how tall this page is, so it can size the
    // frame, and share the guide's text with it. Nothing else is sent.
    // =================================================================
    const isEmbedded = window.self !== window.top;

    function tellParentPage() {
        if (!isEmbedded) return;
        window.parent.postMessage({ type: "resize", height: document.documentElement.scrollHeight }, "*");
        window.parent.postMessage({ type: "policyUpdate", policy: guideAsText(currentGuide(), settings()) }, "*");
    }

    window.addEventListener("message", function (event) {
        if (event.data && event.data.type === "getPolicy" && event.source) {
            event.source.postMessage({ type: "policyResponse", policy: guideAsText(currentGuide(), settings()) }, event.origin === "null" ? "*" : event.origin);
        }
    });

    // =================================================================
    // 16. START
    // =================================================================
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get("guide")) restore(decodeState(params.get("guide")));
        else if (params.get("policy")) restoreOldLink(params.get("policy"));
        if (params.get("preview") === "true") document.body.classList.add("guide-only");
    } catch (error) {
        // A damaged or very old link: start with a blank guide instead
    }
    refreshCardIcons();
    refreshAll();
})();
