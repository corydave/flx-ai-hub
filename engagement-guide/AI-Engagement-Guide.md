# Installing the AI Engagement Guide Generator

This guide walks you through using and, if you want, sharing the AI Engagement Guide tool. You do **not** need to know how to code. The good news: this particular tool is simpler to get running than most websites - for personal use, you can skip straight to Step 2 with no setup at all.

A few words first, in plain language:

- This tool is a single page that instructors use to answer a few questions about how AI may be used on an assignment, and it generates ready-to-paste text describing that policy for students.
- A **website** is normally a folder of files that need to live on a server (a computer on the internet) before anyone can visit them. This tool is unusual in that it works perfectly well just sitting on your own computer - no server required - **as long as you only need it for yourself.**
- You only need real web hosting (covered in Step 3) if you want to **share a working link** with other people, or **embed** the tool inside a learning-management system (like Brightspace, Canvas, or Blackboard) so students can see the result without you having to share files.

---

## What you'll need

- The AI Engagement Guide files. If you don't have them yet, see Step 1.
- 5 minutes for personal use, or about 15–20 minutes if you also want to put it online (Step 3).

---

## Step 1: Get the files onto your computer

1. Go to the project's page on GitHub: `https://github.com/corydave/flx-ai-hub`
2. Look for a green button labeled **Code** near the top of the page and click it.
3. In the menu that appears, click **Download ZIP**.
4. Your browser will download a file like `flx-ai-hub-main.zip`. Find it (usually in your "Downloads" folder) and **unzip** it:
   - **Windows:** right-click the file and choose "Extract All."
   - **Mac:** double-click the file - it unzips automatically.
5. Inside the unzipped folder, find the folder named **`engagement-guide`**. It contains four files:
   - `index.html` - the tool itself
   - `style.css` - its appearance
   - `options-data.js` - the wording for the use-case and documentation checkboxes
   - `rationale-data.js` - the wording for the pop-up explanations

> **Important:** Keep these four files together, in the same folder. The tool loads the `.js` and `.css` files automatically when it opens, and it won't work correctly if they're separated or renamed.

---

## Step 2: Use it (no setup required)

1. Open the `engagement-guide` folder on your computer.
2. Double-click **`index.html`**. It will open in your default web browser, and you'll see the tool ready to use immediately.
3. Click through the checkboxes on the left to build your AI Engagement Guide. The text on the right updates automatically as you click.
4. When you're happy with the wording, use the buttons above the generated text:
   - **Copy** - copies formatted text you can paste straight into your learning-management system.
   - **Share** - lets you download the guide as a Word-friendly HTML file, a Markdown file, plain text, or an image (PNG), or copy a link.

> **Note:** The **Copy URL** option under Share copies a link back to this same file on *your* computer. It will only work for you, on this computer - it won't work if you email it to someone else. If you want a link you can actually share with other people, or that you can embed inside your LMS, follow Step 3 below to put the tool online first.

That's the whole installation for personal use - nothing else to do.

---

## Step 3 (optional): Put it online so you can share a link or embed it

Skip this step if you only ever use the tool yourself. Do this step if you want to:
- send a working link to colleagues, or
- embed the tool inside your LMS using the **Embed** option in the Share menu.

Pick **one** of the two options below.

### Option A - GitHub Pages (free, no IT department needed)

1. If you don't already have one, create a free account at [github.com](https://github.com) (click "Sign up").
2. Once logged in, click the **+** icon in the top-right corner of the page, then choose **New repository**. Think of a "repository" as just an empty online folder that will hold your tool's files.
3. Give it a name (for example, `ai-engagement-guide`), leave the other settings as they are, and click **Create repository**.
4. On the new (empty) repository page, click **Add file**, then **Upload files**.
5. From the `engagement-guide` folder on your computer, drag all four files (`index.html`, `style.css`, `options-data.js`, `rationale-data.js`) into the upload area on the GitHub page. Wait for the upload to finish, then click the green **Commit changes** button at the bottom.
6. Click the **Settings** tab near the top of the repository page.
7. In the left-hand menu, click **Pages**.
8. Under "Branch," choose **main** and leave the folder as **/ (root)**, then click **Save**.
9. Wait about a minute, then refresh the page. GitHub will show you a web address that looks like:
   `https://yourusername.github.io/ai-engagement-guide/`
10. Visit that address, adding `index.html` to the end if the page doesn't load automatically:
    `https://yourusername.github.io/ai-engagement-guide/index.html`

Now the **Copy URL** and **Embed** options inside the tool will produce links that work for anyone, anywhere.

### Option B - Your organization's existing web host

If your school, college, or company already has a website, you likely have a way to upload new pages to it (for example, a "file manager" tool in a web-based control panel, or a program like FileZilla that connects to your server). If you're not sure, ask whoever manages your organization's website - they'll know the term **"FTP access"** or **"file manager."**

1. Ask your web administrator where new website files normally get uploaded, and request a folder (for example, `ai-engagement-guide`) for this project.
2. Upload all four files from the `engagement-guide` folder - `index.html`, `style.css`, `options-data.js`, and `rationale-data.js` - into that folder.
3. Once uploaded, your web administrator can tell you the address to visit, which will probably look something like:
   `https://www.yourcollege.edu/ai-engagement-guide/index.html`

---

## Step 4 (optional): Make it your own

The page currently says "FLCC" and "Finger Lakes Community College" in a couple of places. You can change this wording without knowing how to code - you just need a plain text editor.

A **plain text editor** is different from something like Microsoft Word - it saves files without any hidden formatting, which the tool needs in order to work. Good free options:

- **Windows:** Notepad (already on your computer)
- **Mac:** TextEdit, but switch it to "Plain Text" mode first (Format menu → Make Plain Text)
- Or, if you used GitHub Pages in Option A, you can edit files directly on the GitHub website: open the file, click the pencil ("Edit") icon, make your change, and click **Commit changes** - no separate editor needed.

Open `index.html` in your editor, and use **Find** (Ctrl+F on Windows, Cmd+F on Mac) to locate each of the following:

**1. The page title and heading**
Search for: `FLCC - AI Engagement Guide`
You'll find it twice near the top of the file - once inside `<title>` tags (which controls the text shown in the browser tab) and once inside an `<h1>` tag (the heading shown on the page itself). Replace both with your own organization's name.

**2. The footer credit line**
Search for: `Finger Lakes Community College`
You'll land in a paragraph near the bottom of the file that credits "the FLX AI Hub" and "Finger Lakes Community College." You're welcome to change this to point to your own organization instead.

> **Please keep the rest of that footer paragraph intact.** This tool is shared under a Creative Commons license that requires keeping credit to its original creators (Ed Beck and Tera Doty-Blance) and a link to the license terms. You can add your own organization's name alongside theirs, but please don't remove their attribution.

When you're done, save the file, and re-upload it the same way you did in Step 3 (or, if you're using GitHub, commit your change there directly).

---

## Troubleshooting

**Nothing happens when I double-click `index.html`.**
Make sure all four files (`index.html`, `style.css`, `options-data.js`, `rationale-data.js`) are still in the same folder together. If one is missing, the checkboxes or styling won't appear correctly.

**The Copy URL / Embed link doesn't work for other people.**
This is expected if you haven't completed Step 3. A link copied while running the tool from your own computer only works on that same computer. Put the tool online (Step 3) to get a link that works for everyone.

**I changed the title or footer text, but I still see the old wording.**
Make sure you saved the file as **plain text** (not as a Word document), and that you re-uploaded the changed file to the same place if you're hosting it online. If you're using GitHub Pages, it can take a minute or two for changes to appear after you save them - try refreshing the page.

**I want to roll this out at my own organization and would like help.**
The source code and license details are listed in the footer of the tool itself if you'd like to read more about how it's shared and reused.
