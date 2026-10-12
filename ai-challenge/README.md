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

The home page shows a card for each challenge. Clicking a card opens that challenge in a pop-up window.

| # | Challenge | What you'll do |
|---|---|---|
| 1 | What *is* AI? | Learn about popular AI services and set up a few accounts. |
| 2 | AI or Not? | Practice telling AI-made content apart from human-made content. |
| 3 | Prompt Refinement | See how small changes to a request change the answer. |
| 4 | Imagine Images | Create pictures from text descriptions. |
| 5 | AI as a Writing Coach | Use AI to give feedback on your own writing. |
| 6 | Summarizing | Use AI to summarize a document, such as a PDF. |
| 7 | NotebookLM | Explore Google's NotebookLM tool with your own sources. |
| 8 | Sound | Explore AI tools that work with audio. |
| 9 | Crafting Prompts | Write clearer, more useful prompts. |
| 10 | Vibe Coding | Build a small app or tool just by describing it to an AI. |
| 11 | *Not yet released* | Placeholder. |
| 12 | *Not yet released* | Placeholder. |

Challenges 11 and 12 are placeholders. Their cards are on the home page, but they only show a "not yet released" message.

---

## How to use it

### As a learner

1. Open the website address your facilitator or organization gave you.
2. Click a challenge card to open it.
3. Read the instructions, then follow the links and steps. Many challenges ask you to open an AI tool in a second browser tab.
4. Close the pop-up with the **Close** button (or the **X** in the corner) and pick the next challenge.

### As a facilitator

- Work through the challenges in order. Each one builds on the one before it.
- Most challenges use free AI tools. Some tools limit free use or ask you to create an account, so check the requirements in a challenge before running it with a group.

### Running it on your own computer

The website **will not work** if you double-click `index.html`. The home page loads each challenge's content in the background, and browsers block that when a page is opened straight from your computer. You need to view the site through a web address.

If you want to try it locally, you can run a small built-in web server:

1. Open a terminal (or Command Prompt on Windows) in this `ai-challenge` folder.
2. Run `python3 -m http.server 8000` (on Windows, you may need to use `python -m http.server 8000`).
3. Open `http://localhost:8000/` in your browser.
4. Press `Ctrl+C` in the terminal when you're done.

To share it with others, put the files online. [AI-Challenge.md](AI-Challenge.md) covers this in plain language.

---

## Files and how they fit together

| File or folder | Purpose |
|---|---|
| `index.html` | The home page. It holds the header, the challenge cards, the pop-up windows, and the small script that loads the challenge content. |
| `challenge01.html` to `challenge12.html` | The content for each challenge. The home page loads each one into its matching pop-up window. |
| `challenge00.html` | An unused placeholder. It is not linked from the home page. |
| `images/` | Pictures used on the home page and in the challenges, including the favicon. |
| `bootstrap.css` and `bootstrap.js` | Copies of the Bootstrap styling library. The home page currently loads Bootstrap from a CDN, so these files are not used. |
| `AI-Challenge.md` | Plain-language instructions for putting the site online. |

### How the pieces connect

1. `index.html` loads the Bootstrap styling and icon libraries from the internet.
2. When the page opens, a short script fetches each `challengeNN.html` file and places its contents inside the matching pop-up.
3. Clicking a card opens the pop-up. The content is already loaded, so it opens quickly.

Several challenges also embed outside content, such as YouTube videos, Google Drive or Apps Script pages, and an AI-generated image. Those parts depend on services outside this project. If one of those services changes or goes away, that part of the challenge will stop working.

---

## Editing the content

- **Text and links:** open the matching `challengeNN.html` file in a plain text editor, change the words or links, save, and re-upload.
- **Titles and card text:** these are in `index.html`. Search for the challenge title.
- **Colors, logo, and contact email:** see Step 3 in [AI-Challenge.md](AI-Challenge.md).

Keep the file names and folder structure the same. The home page looks for `challenge01.html` through `challenge12.html` by name.

---

## Known limitations

This project is an early version. Some things are known to need work:

- **Accessibility is not yet complete.** Some challenge cards cannot be reached with the keyboard, some buttons lack screen-reader labels, and some text colors are too light to read easily. Work is planned to address these.
- **Some images are hosted on Google Drive.** Those links can break if the image is moved or unpublished.
- **Some styling and scripts come from outside this project.** The challenge pages load their styling from a third-party site. Keep this in mind if you plan to host the site for a long time.
- **Some embedded content is from third parties.** Videos and embedded tools may set their own cookies or collect usage data under their own privacy policies.

---

## License and contact

The code in this folder is part of the FLX AI Hub repository and is shared under the GNU General Public License v3. See [LICENSE](../LICENSE) for the full text. In short, you may use, adapt, and share it, as long as your shared version stays under the same license.

Questions, feedback, or help rolling this out at your organization: **ai@flcc.edu**.
