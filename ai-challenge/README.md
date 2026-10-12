# AI Challenge

The AI Challenge is a small, self-paced website that helps people who have not used AI much get started. It is a set of short, hands-on challenges. Each one asks you to try a simple task with an AI tool, notice what happened, and think about what it means. No prior experience is needed.

It was built by Finger Lakes Community College (FLCC) as a first "on-ramp" for students, staff, and community members. Other organizations are welcome to adapt it. See [AI-Challenge.md](AI-Challenge.md) for step-by-step instructions on putting your own copy online.

---

## Who it's for

- **Learners** who are curious about AI but do not know where to start.
- **Facilitators** (instructors, librarians, trainers) who want a ready-made, guided introduction to share with a group.
- **Organizations** that want to run their own version of the challenge.

---

## What's inside

The home page shows a card for each challenge. Select a card's title to open that challenge in a pop-up window.

| # | Challenge | What you'll do |
|---|---|---|
| 1 | What *is* AI? | Learn about popular AI services and set up a few accounts. |
| 2 | AI or Not? | Practice telling AI-made content apart from human-made content. |
| 3 | Prompt Refinement | See how small changes to a request change the answer. |
| 4 | Imagine Images | Create pictures from text descriptions. |
| 5 | AI as a Writing Coach | Use AI to give feedback on your own writing. |
| 6 | Summarizing | Upload documents to AI and gain nuanced insight. |
| 7 | NotebookLM | Supercharge your research, knowledge base, and projects. |
| 8 | "Voice Mode" | Have an audible conversation with AI. |
| 9 | Crafting Prompts | Level up your prompting with a detailed framework. |
| 10 | Vibe Coding | Build a small app or tool just by describing it to an AI. |
| 11 | *Not yet released* | Placeholder. |
| 12 | *Not yet released* | Placeholder. |

Challenges 11 and 12 are placeholders. Their cards are on the home page, but they only show a "not released yet" message.

---

## How to use it

### As a learner

1. Open the website address your facilitator or organization gave you, or double-click `index.html` if you have a copy on your computer (see below).
2. Select a challenge's title to open it. You can also press **Tab** to move between challenges and **Enter** to open one.
3. Read the instructions, then follow the links and steps. Many challenges ask you to open an AI tool in a second browser tab.
4. Close the pop-up with the **Close** button, the **X** in the corner, or the **Esc** key.

### As a facilitator

- Work through the challenges in order. Each one builds on the one before it.
- Most challenges use free AI tools. Some tools limit free use or ask you to create an account, so check a challenge's requirements before you run it with a group.
- Read the **Privacy and embedded content** section on the home page before sharing it. It explains which other companies' content participants will see.

### Running it on your own computer

You do **not** need to install anything or run a server. Double-click `index.html`, and it opens in your web browser.

The page itself works without an internet connection, including all of its pictures. The Comfortaa font, embedded videos, and the AI tools themselves still need one. If an embedded video will not play, use the **Watch this video on YouTube** link underneath it.

---

## Privacy and security

The website itself does not collect information about the people who use it. It does not use cookies, analytics, sign-ins, or tracking, and it does not record what you type into it.

Some challenges show content from other companies, such as YouTube videos, a Spotify episode, Google Drive and Google Docs files, a Google Apps Script tool, and a quiz hosted on a personal GitHub Pages site. That content loads only when you open a challenge that contains it. Those companies can set cookies or record visits under their own privacy policies. The home page explains this in plain language under **Privacy and embedded content**.

Safety rules followed in the page's design:

- The page runs no code from other websites. Its only script is the short one at the bottom of `index.html`.
- A Content Security Policy (a browser rule at the top of `index.html`) lists the only places the page may load things from: pictures only from its own `images/` folder, the font only from Google Fonts, and embedded content only from the listed websites. Anything else is blocked.
- No challenge loads its embedded content until someone opens that challenge. Closing a challenge removes its content again, which also stops any video that was playing.
- YouTube videos use YouTube's privacy-enhanced mode (`youtube-nocookie.com`), and the share-tracking codes have been removed from their links.
- Links that open a new browser tab are announced to screen reader users, and the new tab cannot control this page.

---

## Accessibility

The site is designed to work for keyboard users and for people using screen readers, screen magnifiers, and high-contrast or reduced-motion settings:

- Every challenge can be opened with the keyboard (**Tab** to move, **Enter** to open) and closed with **Esc**. Focus returns to the challenge's card when the pop-up closes.
- The page has one main heading (`<h1>`), and every other heading follows in order, so screen reader users can move around by heading.
- The pop-up window is labeled with the challenge's title, so screen readers announce what it is.
- Pictures used only for decoration are hidden from screen readers. Pictures that carry information have descriptive text.
- Embedded videos and tools have titles, so screen readers can say what they are, and each YouTube video also has a plain link.
- Text colors meet the WCAG AA contrast standard (checked with an automated accessibility tool on the home page and in every challenge).
- The layout works on phones, with no sideways scrolling.
- Animations are turned off for people who ask for reduced motion.

If you find something that is hard to use, please tell us at **ai@flcc.edu**.

---

## Files and how they fit together

| File or folder | Purpose |
|---|---|
| `index.html` | The whole website: the home page, the challenges, the pop-up window, the styles, and a short script. |
| `images/` | Every picture the site uses: card pictures, pictures inside the challenges, the logo, the stage icons, and the favicon. |
| `IMAGES.md` | A checklist of every picture, with its file name and where to download it from. |
| `AI-Challenge.md` | Plain-language instructions for putting the site online. |
| `README.md` | This file. |

### How `index.html` is organized

The file is in five sections, each marked with a large comment:

1. **Settings and styles** (in the `<head>`). The colors are listed at the top of the styles, so changing a color in one place changes it everywhere.
2. **The home page**: the header, the welcome text, the four stages, the list of challenge cards, the privacy section, and the contact section.
3. **The pop-up window**: one window, reused for every challenge.
4. **The challenges**: one `<template>` block per challenge. This is the section you will edit most.
5. **The script**: builds a card for each challenge and opens and closes the pop-up.

### What a challenge looks like

Each challenge is one block, with a big comment box above it so it is easy to spot while scrolling. The settings at the top control its card, and everything inside is the challenge itself:

```html
<!--
##################################################################
##                                                              ##
##                                                              ##
##                         WHAT IS AI?                          ##
##                                                              ##
##                                                              ##
##################################################################
-->
<template class="challenge"
    data-title="What is AI?"
    data-summary="Learn about AI, create an account at some popular AI services, and have some fun!"
    data-stage="Recognize"
    data-image="images/what-is-ai-card.png">

    <h3>Introduction</h3>
    <p>Artificial Intelligence (AI) is the ability for a computer to ...</p>

    <div class="video">
        <iframe src="https://www.youtube-nocookie.com/embed/VIDEO-ID" title="Video: Introduction" allowfullscreen></iframe>
    </div>

    <h3>Activity #1: Have some fun</h3>
    <p>Try this prompt:</p>
    <pre class="prompt">Please generate a list of 20 fictitious idioms.</pre>

    <div class="callout">
        <p><strong>Tip:</strong> You can't AI wrong!</p>
    </div>

</template>
```

Inside a challenge, write normal HTML (`<h3>`, `<h4>`, `<p>`, `<ul>`, `<ol>`, `<a>`, `<img>`, `<strong>`, `<em>`). Four special pieces are styled for you:

| Write this | To get |
|---|---|
| `<div class="video"><iframe ...></iframe></div>` | A centered video. |
| `<div class="embed"><iframe ... height="600"></iframe></div>` | An embedded tool, as tall as its `height`. |
| `<pre class="prompt">...</pre>` | A sample prompt. Line breaks are kept exactly as typed. |
| `<div class="callout">...</div>` | A highlighted box. |

A few rules keep the page accessible:

- Use `<h3>` for section headings and `<h4>` for smaller ones. Do not use `<h1>` or `<h2>` inside a challenge.
- Give every `<img>` an `alt` that describes the picture (or `alt=""` if it is only decoration).
- Give every `<iframe>` a `title` that says what it is.
- Save every picture in the `images/` folder and link to it there (for example `images/my-picture.png`). Pictures linked straight from other websites are blocked.
- Card pictures are 400 × 300 pixels. The whole picture is always shown, never cropped.

### Adding, removing, and reordering challenges

- **Add a challenge:** copy an existing challenge, starting from the big `####` comment box above it and ending at its `</template>`. Paste it where you want it, then change the name in the comment box, the settings, and the content.
- **Remove a challenge:** delete its whole block, from the big `####` comment box above it to its `</template>`.
- **Reorder challenges:** move the blocks. Challenges are numbered in the order they appear in the file, so the numbers update by themselves.

Save the file and reload the page to see the change.

If you embed something from a website the page has not used before, add that website to the `frame-src` list in the security settings at the top of the file. Otherwise the browser will block it.

---

## Editing the rest of the page

- **Colors:** change them in the list at the top of the styles (search for `COLORS AND FONTS`).
- **Logo and contact email:** see Step 3 in [AI-Challenge.md](AI-Challenge.md).
- **The script:** most people never need to change it. If you do, follow the note above the security settings to update its fingerprint, or the page will stop working.

If the page stops working after an edit, check that every `<template>` has its closing `</template>` tag.

---

## A PHP version with a sharing gallery

A version of this challenge that runs on a web server with PHP is available on request. It adds a sharing gallery, where participants can share their work, such as idioms from Challenge 1 or images from Challenge 4, with their peers.

Because it stores what people share, it needs a PHP-enabled web server and a database. It is **not** part of this repository. To request it, email **ai@flcc.edu**.

---

## Known limitations

This project is an early version. Some things still need work:

- **Some challenges embed content from other companies.** See the privacy section above.

---

## License and contact

This project is released under the **MIT License**. See [LICENSE](../LICENSE) for the full text. In short, you may use, copy, change, and share it, as long as you keep the copyright notice and license text with any copy you share.

Questions, feedback, or help rolling this out at your organization: **ai@flcc.edu**.
