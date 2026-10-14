// =============================================================================
// APP.JS - THE AI CHALLENGE'S SCRIPT
//
// Builds a card for each challenge in index.html, opens and closes the
// pop-up window, and adds Copy buttons to sample prompts.
//
// You can edit this file freely: the page's security settings trust any
// script stored in this folder, so saving changes here never breaks the page.
// To change the challenges themselves, edit index.html (section 4).
// =============================================================================

    // The parts of the page this script works with
    const challenges = document.querySelectorAll("template.challenge");
    const cardList = document.getElementById("challenge-list");
    const dialog = document.getElementById("challenge-dialog");
    const dialogTitle = document.getElementById("dialog-title");
    const dialogBody = document.getElementById("dialog-body");
    const copyStatus = document.getElementById("copy-status");

    // The two icons used on the Copy buttons (a clipboard, and a tick
    // shown for a moment after copying). These are fixed drawings
    // written here, not text from anywhere else.
    const COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    const DONE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12l5 5L20 6"></path></svg>';

    // Remembers which card opened the pop-up, so focus can go back to it
    let openedFrom = null;

    // ---------------------------------------------------------------
    // 1. Make a card for each challenge, numbered in the order they
    //    appear in the file. Text is added with textContent, which
    //    always treats it as plain text (never as code).
    // ---------------------------------------------------------------
    challenges.forEach(function (challenge, index) {
        const number = index + 1;
        const info = challenge.dataset;   // the data-... settings

        const card = document.createElement("li");
        card.className = "challenge-card";

        const picture = document.createElement("img");
        picture.src = info.image;
        picture.alt = "";                 // decorative: the title says the same thing
        card.append(picture);

        const heading = document.createElement("h3");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "challenge-button";
        const numberText = document.createElement("span");
        numberText.textContent = "Challenge " + number + ":";
        const titleText = document.createElement("span");
        titleText.textContent = info.title;
        button.append(numberText, titleText);
        button.addEventListener("click", function () {
            openChallenge(challenge, number, button);
        });
        heading.append(button);
        card.append(heading);

        const summary = document.createElement("p");
        summary.textContent = info.summary;
        card.append(summary);

        const stage = document.createElement("p");
        stage.className = "stage-badge";
        stage.textContent = info.stage;
        card.append(stage);

        cardList.append(card);
    });

    // ---------------------------------------------------------------
    // 2. Open a challenge in the pop-up
    // ---------------------------------------------------------------
    function openChallenge(challenge, number, button) {
        openedFrom = button;
        dialogTitle.textContent = "Challenge " + number + ": " + challenge.dataset.title;

        // Copy the challenge's content into the pop-up
        dialogBody.replaceChildren(challenge.content.cloneNode(true));

        // Links that open a new tab: tell screen reader users, and stop
        // the new page from being able to control this one
        dialogBody.querySelectorAll('a[target="_blank"]').forEach(function (link) {
            link.rel = "noopener noreferrer";
            const note = document.createElement("span");
            note.className = "visually-hidden";
            note.textContent = " (opens in a new tab)";
            link.append(note);
        });

        // Give each sample prompt a Copy button
        dialogBody.querySelectorAll("pre.prompt").forEach(addCopyButton);

        // Under each YouTube video, add a link to watch it on YouTube
        // (handy if the embedded player does not work for someone)
        dialogBody.querySelectorAll('.video iframe[src*="youtube"]').forEach(function (frame) {
            const videoId = frame.src.split("/embed/")[1].split("?")[0];
            const paragraph = document.createElement("p");
            paragraph.className = "video-link";
            const link = document.createElement("a");
            link.href = "https://www.youtube.com/watch?v=" + videoId;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "Watch this video on YouTube";
            paragraph.append(link);
            frame.parentElement.after(paragraph);
        });

        dialog.showModal();
        dialogBody.scrollTop = 0;
    }

    // ---------------------------------------------------------------
    // Copy buttons for sample prompts
    // ---------------------------------------------------------------
    function addCopyButton(prompt) {
        // Put the prompt in a box, so the button can sit in its corner
        const box = document.createElement("div");
        box.className = "prompt-box";
        prompt.before(box);
        box.append(prompt);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "copy-button";
        button.setAttribute("aria-label", "Copy prompt");
        button.title = "Copy prompt";
        button.innerHTML = COPY_ICON;
        button.addEventListener("click", function () {
            copyText(prompt.textContent).then(function () {
                // Show a tick for two seconds, and tell screen reader users
                button.innerHTML = DONE_ICON;
                copyStatus.textContent = "Prompt copied";
                setTimeout(function () {
                    button.innerHTML = COPY_ICON;
                    copyStatus.textContent = "";
                }, 2000);
            }).catch(function () {
                copyStatus.textContent = "Sorry, the prompt could not be copied. Please select the text and copy it yourself.";
            });
        });
        box.append(button);
    }

    // Copy text to the clipboard. Most browsers support the modern way
    // (navigator.clipboard). Some only allow it on secure (https) sites,
    // so if it is missing or refused, fall back to the older way.
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).catch(function () {
                return copyTheOldWay(text);
            });
        }
        return copyTheOldWay(text);
    }

    function copyTheOldWay(text) {
        return new Promise(function (resolve, reject) {
            // Put the text in a hidden text box, select it, and copy it
            const scratch = document.createElement("textarea");
            scratch.value = text;
            scratch.setAttribute("readonly", "");
            scratch.className = "visually-hidden";
            dialog.append(scratch);
            scratch.select();
            const worked = document.execCommand("copy");
            scratch.remove();
            if (worked) {
                resolve();
            } else {
                reject();
            }
        });
    }

    // ---------------------------------------------------------------
    // 3. Close the pop-up with either Close button. (The Esc key
    //    closes it too; the browser handles that by itself.)
    // ---------------------------------------------------------------
    dialog.querySelectorAll("[data-close]").forEach(function (closeButton) {
        closeButton.addEventListener("click", function () {
            dialog.close();
        });
    });

    // Clicking the dimmed area outside the pop-up also closes it
    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    // When the pop-up closes (any way), empty it so videos stop
    // playing, and put keyboard focus back on the card that opened it
    dialog.addEventListener("close", function () {
        dialogBody.replaceChildren();
        if (openedFrom) {
            openedFrom.focus();
        }
    });
