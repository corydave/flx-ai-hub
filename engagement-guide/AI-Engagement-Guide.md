# Installing the AI Engagement Guide Generator

This guide walks you through using and, if you want, sharing the AI Engagement Guide tool. You do **not** need to know how to code. The good news: this particular tool is simpler to get running than most websites - for personal use, you can skip straight to Step 2 with no setup at all.

A few words first, in plain language:

- This tool is a single page that instructors use to answer a few questions about how AI may be used, and it generates ready-to-paste text describing that policy for students. It has two tabs:
  - **Assignment Level** - for one assignment.
  - **Course Level** - for a whole course, for example in a syllabus. You pick the example policy closest to your course, then change it however you like.
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
5. Inside the unzipped folder, find the folder named **`engagement-guide`**. It contains:
   - `index.html` - the tool itself (its layout and look)
   - `app.js` - the script that makes the tool work
   - `options-data.js` - the wording for the **Assignment Level** questions
   - `course-data.js` - the example policies for the **Course Level** tab
   - `rationale-data.js` - the wording for the "No AI Use" and "Open Use" pop-ups
   - `icons.js` - the icons, stored with the tool
   - `fonts/` - a folder holding the fonts (Comfortaa and Atkinson Hyperlegible)

> **Important:** Keep all of these together, in the same folder, with the same names. The tool loads them automatically when it opens, and it won't work correctly if they're separated or renamed.

---

## Step 2: Use it (no setup required)

1. Open the `engagement-guide` folder on your computer.
2. Double-click **`index.html`**. It will open in your default web browser, ready to use. It works without an internet connection.
3. Choose **Assignment Level** or **Course Level** at the top.
4. Build your guide. The guide on the right (or below, on a phone) updates as you go.
   - **Assignment Level:** click the cards that describe the assignment.
   - **Course Level:** click the example policy closest to your course. Six examples cover the range, from an AI-free course to one where AI is required. Then use **Make it yours** to change the title, rewrite any section, remove sections, or add your own. **Undo my changes** returns to the original example.
5. Choose how the guide looks:
   - **Icons:** Emoji, Icons (simple line drawings), or None.
   - **Icon position:** beside the text, or above it.
6. When you're happy with the wording, use the buttons under the guide:
   - **Copy** - copies formatted text you can paste straight into your learning-management system.
   - **Share** - copy a link or embed code, or download the guide as an HTML file (which you can print or save as a PDF), a Markdown file, plain text, or an image (PNG).

> **Tip:** Some learning-management systems remove drawn icons when you paste. If the icons disappear after pasting, choose **Emoji** and copy again.

> **Note:** The **Copy link** option copies a link back to this same file on *your* computer. It will only work for you, on this computer - it won't work if you email it to someone else. If you want a link you can actually share with other people, or that you can embed inside your LMS, follow Step 3 below to put the tool online first.

That's the whole installation for personal use - nothing else to do.

---

## Step 3 (optional): Put it online so you can share a link or embed it

Skip this step if you only ever use the tool yourself. Do this step if you want to:
- send a working link to colleagues, or
- embed the guide inside your LMS using the **Embed** option in the Share menu.

Pick **one** of the two options below.

### Option A - GitHub Pages (free, no IT department needed)

1. If you don't already have one, create a free account at [github.com](https://github.com) (click "Sign up").
2. Once logged in, click the **+** icon in the top-right corner of the page, then choose **New repository**. Think of a "repository" as just an empty online folder that will hold your tool's files.
3. Give it a name (for example, `ai-engagement-guide`), leave the other settings as they are, and click **Create repository**.
4. On the new (empty) repository page, click **Add file**, then **Upload files**.
5. From the `engagement-guide` folder on your computer, drag **everything** (all the files and the `fonts` folder) into the upload area on the GitHub page. Wait for the upload to finish, then click the green **Commit changes** button at the bottom.
6. Click the **Settings** tab near the top of the repository page.
7. In the left-hand menu, click **Pages**.
8. Under "Branch," choose **main** and leave the folder as **/ (root)**, then click **Save**.
9. Wait about a minute, then refresh the page. GitHub will show you a web address that looks like:
   `https://yourusername.github.io/ai-engagement-guide/`
10. Visit that address, adding `index.html` to the end if the page doesn't load automatically:
    `https://yourusername.github.io/ai-engagement-guide/index.html`

Now the **Copy link** and **Embed** options inside the tool will produce links that work for anyone, anywhere.

### Option B - Your organization's existing web host

If your school, college, or company already has a website, you likely have a way to upload new pages to it (for example, a "file manager" tool in a web-based control panel, or a program like FileZilla that connects to your server). If you're not sure, ask whoever manages your organization's website - they'll know the term **"FTP access"** or **"file manager."**

1. Ask your web administrator where new website files normally get uploaded, and request a folder (for example, `ai-engagement-guide`) for this project.
2. Upload **everything** from the `engagement-guide` folder - all the files and the whole `fonts` folder - into that folder.
3. Once uploaded, your web administrator can tell you the address to visit, which will probably look something like:
   `https://www.yourcollege.edu/ai-engagement-guide/index.html`

---

## Step 4 (optional): Make it your own

You can change the wording, title, colors, and footer without knowing how to code - you just need a plain text editor.

A **plain text editor** is different from something like Microsoft Word - it saves files without any hidden formatting, which the tool needs in order to work. Good free options:

- **Windows:** Notepad (already on your computer)
- **Mac:** TextEdit, but switch it to "Plain Text" mode first (Format menu → Make Plain Text)
- Or, if you used GitHub Pages in Option A, you can edit files directly on the GitHub website: open the file, click the pencil ("Edit") icon, make your change, and click **Commit changes** - no separate editor needed.

**1. The wording of the cards and the finished guide**
Open `options-data.js` (Assignment Level), `course-data.js` (the Course Level example policies), or `rationale-data.js` (the "No AI Use" and "Open Use" pop-ups). Each file explains at the top, in plain language, how to change, add, remove, or reorder cards or examples. You never need to edit `index.html` to change wording.

The Course Level examples are original wording based on widely used frameworks: the AI Assessment Scale (Perkins, Furze, Roe, and MacVaugh, 2024), the "traffic light" approach, and common syllabus statement tiers. You can replace them with your own institution's sample policies.

**2. The separator in the guide's title**
When an assignment needs documentation, the title reads like "Selective AI Use - Documentation Required". To change the " - " between the two parts, open `options-data.js` and search for: `separator`

**3. The page title and heading**
Open `index.html` and search (Ctrl+F on Windows, Cmd+F on Mac) for: `AI Engagement Guide</`
You'll find it inside `<title>` tags (the text shown in the browser tab) and inside an `<h1>` tag (the heading shown on the page). You can add your organization's name to both.

**4. The colors**
In `index.html`, search for: `COLORS, FONTS, AND SIZES`
Just below it is a list of colors with a note beside each one (for example, `--blue: #0046ad;`). Change the 6-character code to change that color everywhere. (Search "color picker" online to find the code for any color you like.)

**5. The footer credit line**
Search for: `Finger Lakes Community College`
You'll land in a paragraph near the bottom of the page that credits "the FLX AI Hub" and "Finger Lakes Community College." You're welcome to change this to point to your own organization instead.

> **Please keep the rest of that footer intact.** This tool is shared under a Creative Commons license that requires keeping credit to its original creators (Ed Beck and Tera Doty-Blance) and a link to the license terms. You can add your own organization's name alongside theirs, but please don't remove their attribution. Please also keep the credits for the icons (Lucide) and fonts.

When you're done, save the file, and re-upload it the same way you did in Step 3 (or, if you're using GitHub, commit your change there directly).

> **Good to know:** every file in the folder can be edited safely. The page's security settings trust the files stored with it, so changing the wording, the title, the colors, the footer, or even the script in `app.js` will not stop the page from working.

---

## Privacy

This tool collects nothing. It has no analytics, cookies, sign-ins, or tracking, and it never sends anyone's choices anywhere.

- The fonts and icons are stored with the tool, so opening the page contacts no other website.
- Two things load from other websites, and only when someone uses them:
  - the video in the **Info** window (from Google), and
  - the library that makes **PNG image** downloads (from cdn.jsdelivr.net, checked with a fingerprint so it cannot be tampered with).
- A security setting in the page blocks everything else.

---

## Troubleshooting

**The page shows a warning about a file, or the cards are missing.**
A recent edit to one of the data files probably left out a comma, a quote mark, or a curly brace. The warning names the file. Compare your latest edit with the entries just above or below it, fix it, and reload the page.

**The page looks plain, or the icons are missing.**
Make sure every file and the `fonts` folder are still in the same folder together, with their original names.

**The Copy link / Embed link doesn't work for other people.**
This is expected if you haven't completed Step 3. A link copied while running the tool from your own computer only works on that same computer. Put the tool online (Step 3) to get a link that works for everyone.

**I changed some wording, but I still see the old version.**
Make sure you saved the file as **plain text** (not as a Word document), and that you re-uploaded the changed file to the same place if you're hosting it online. If you're using GitHub Pages, it can take a minute or two for changes to appear after you save them - try refreshing the page.

**Links I made with the old version of the tool.**
They still work: the tool reads the old link format and turns it into the new one.

**I want to roll this out at my own organization and would like help.**
The source code and license details are listed in the footer of the tool itself if you'd like to read more about how it's shared and reused.
