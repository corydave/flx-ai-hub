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

The page needs an internet connection, because it loads its styling and the Bootstrap library from the internet. Without a connection it will look plain, and the pop-ups may not work.

---

## Privacy and security

The website itself does not collect information about the people who use it. It does not use cookies, analytics, sign-ins, or tracking, and it does not record what you type into it.

Some challenges show content from other companies, such as YouTube videos, a Spotify episode, Google Drive and Google Docs files, a Google Apps Script tool, and a demo hosted on a personal GitHub Pages site. That content loads only when you open a challenge that contains it. Those companies can set cookies or record visits under their own privacy policies. The home page explains this in plain language under **Privacy and embedded content**.

Safety rules followed in the page's design:

- The page only loads scripts, styles, frames, and images from the sources listed in its Content Security Policy (a browser rule written in the page's header). Anything else is blocked.
- No challenge runs its embedded content until someone opens that challenge. Closing a challenge removes its content again.
- All links that open a new browser tab are marked as doing so, and they do not give the new page access to this one.

---

## Accessibility

The site is designed to work for keyboard users and for people using screen readers, screen magnifiers, and high-contrast or reduced-motion settings:

- Every challenge can be opened with the keyboard (**Tab** to move, **Enter** to open) and closed with **Esc**. Focus returns to the challenge when the pop-up closes.
- Pop-up windows are labeled with their titles, so screen readers announce what they are.
- Pictures used only for decoration are hidden from screen readers. Pictures that carry information have descriptive text.
- Embedded videos and tools have titles, so screen readers can say what they are.
- Text colors on the home page meet the WCAG AA contrast standard (checked with an automated accessibility tool).
- The layout works on phones, with no sideways scrolling.
- Animations are turned off for people who ask for reduced motion.

If you find something that is hard to use, please tell us at **ai@flcc.edu**.

---

## Files and how they fit together

| File or folder | Purpose |
|---|---|
| `index.html` | The whole website: the home page, the challenge cards, the pop-up windows, the content of all 12 challenges, and the small script that fills in each pop-up. |
| `images/` | Pictures used on the home page and in the challenges, including the favicon. |
| `AI-Challenge.md` | Plain-language instructions for putting the site online. |
| `README.md` | This file. |

### How the page is organized

Everything is in `index.html`, in this order:

1. **Styles** in the `<head>`. Changes to colors or layout go here.
2. **The page itself**: the header, the welcome text, the four stages, the challenge cards, the privacy section, and the contact section.
3. **One pop-up window per challenge** (`<div class="modal ...">`). Each pop-up has a title and a Close button, and its contents are filled in from the matching template.
4. **One template per challenge** (`<template id="challenge-01">` through `<template id="challenge-12">`). A template holds the challenge's text, pictures, and links without showing them. Its contents are copied into the pop-up the first time someone opens it.
5. **A small script** at the very end, which copies each template into its pop-up when it opens and empties the pop-up when it closes.

Because the whole site is one file, it works when opened from your computer and when hosted online. It also means each challenge is separate and can be replaced on its own.

### Swapping in a different challenge

1. Find the template for the challenge you want to replace. Search for `<template id="challenge-07">`, for example.
2. Replace everything between that opening tag and its matching `</template>` with the new challenge's HTML. Keep the `<template id="challenge-07">` and `</template>` lines.
3. To change its title or card, search for `challenge07Modal` (or `Challenge 7`). The card's title and description are in the "AI Challenges" section, and the pop-up's title is in the matching `<div class="modal ...">`.

Save the file, and reload the page to see the change.

---

## Editing the content

- **Text and links inside a challenge:** find its `<template id="challenge-NN">` block in `index.html`, change the text or links, and save.
- **Titles, card text, and badges:** these are in the "AI Challenges" section (search for `challenge-card`).
- **Colors, logo, and contact email:** see Step 3 in [AI-Challenge.md](AI-Challenge.md).

If the page stops working after an edit, check that every `<template>` has its closing `</template>` tag, and that you did not change the script at the bottom of the file.

---

## A PHP version with a sharing gallery

A version of this challenge that runs on a web server with PHP is available on request. It adds a sharing gallery, where participants can share their work, such as idioms from Challenge 1 or images from Challenge 4, with their peers.

Because it stores what people share, it needs a PHP-enabled web server and a database. It is **not** part of this repository. To request it, email **ai@flcc.edu**.

---

## Known limitations

This project is an early version. Some things still need work:

- **The challenge text styling comes from aichallenges.org.** The page loads it from another website, so if that site changes or goes away, the challenge text will look different.
- **Some pictures are hosted on Google Drive.** Those links can break if the picture is moved or unpublished. Pictures are being moved into the `images/` folder.
- **Some challenges embed content from other companies.** See the privacy section above.
- **Some alt text was written without seeing the picture.** Challenge 8 has one image described from the text around it. Please check it against the picture.

---

## License and contact

This project is released under the **MIT License**. See [LICENSE](../LICENSE) for the full text. In short, you may use, copy, change, and share it, as long as you keep the copyright notice and license text with any copy you share.

Questions, feedback, or help rolling this out at your organization: **ai@flcc.edu**.
