# Installing the AI Challenge Website

This guide walks you through putting the AI Challenge website online for your own organization. You do **not** need to know how to code. You will mostly be clicking buttons, uploading files, and occasionally copying and pasting a short bit of text.

A few words first, in plain language:

- A **website** is really just a folder of files (pages, pictures, and a bit of styling) that sit on a computer somewhere on the internet, called a **server** or a **host**. Your web browser fetches those files when someone types in the address.

- **"Installing"** the AI Challenge means: getting a copy of its files, putting that copy on a server somewhere, and then sharing the resulting web address with people.
- You will **not** get this working by simply double-clicking the `index.html` file on your own computer. This website is built to load its 12 challenge pages dynamically, and browsers block that trick unless the files are being served from a real website address. So even though it might *look* like it's loading when you double-click it, the actual challenges won't appear. You have to put it on a host first (covered in Step 2 below).

---

## What you'll need

- The AI Challenge files. If you don't have them yet, see Step 1.
- About 15–20 minutes.
- A free [GitHub](https://github.com) account **or** access to wherever your organization already hosts web pages (ask your IT department if you're not sure whether this exists).

---

## Step 1: Get the files onto your computer

1. Go to the project's page on GitHub: `https://github.com/corydave/flx-ai-hub`
2. Look for a green button labeled **Code** near the top of the page and click it.
3. In the menu that appears, click **Download ZIP**.
4. Your browser will download a file like `flx-ai-hub-main.zip`. Find it (usually in your "Downloads" folder) and **unzip** it:
   - **Windows:** right-click the file and choose "Extract All."
   - **Mac:** double-click the file - it unzips automatically.
5. Inside the unzipped folder, find the folder named **`ai-challenge`**. This single folder contains everything the website needs (the pages, the images, and the styling). Everything you do for the rest of this guide uses only this `ai-challenge` folder.

> **Important:** Keep all the files inside `ai-challenge` together, in the same folder structure, including the `images` subfolder. The pages refer to each other and to the images by their relative position, so if you split them up or rename the folders, parts of the site will stop working.

---

## Step 2: Put the files online

You need somewhere for the files to live so people can visit them with a web address. Pick **one** of the two options below.

### Option A - GitHub Pages (free, no IT department needed)

This is the easiest option if you don't already have a place to host websites. GitHub will host the files for you, for free, and hand you a working web address.

1. If you don't already have one, create a free account at [github.com](https://github.com) (click "Sign up").
2. Once logged in, click the **+** icon in the top-right corner of the page, then choose **New repository**. Think of a "repository" as just an empty online folder that will hold your website's files.
3. Give it a name (for example, `ai-challenge`), leave the other settings as they are, and click **Create repository**.
4. On the new (empty) repository page, click **Add file**, then **Upload files**.
5. On your computer, open the `ai-challenge` folder from Step 1, select **everything inside it** (all the files and the `images` folder), and drag them into the upload area on the GitHub page. Wait for the upload to finish, then click the green **Commit changes** button at the bottom.
6. Click the **Settings** tab near the top of the repository page.
7. In the left-hand menu, click **Pages**.
8. Under "Branch," choose **main** and leave the folder as **/ (root)**, then click **Save**.
9. Wait about a minute, then refresh the page. GitHub will show you a web address that looks like:
   `https://yourusername.github.io/ai-challenge/`
10. Visit that address in your browser, and add `index.html` to the end if the page doesn't load automatically:
    `https://yourusername.github.io/ai-challenge/index.html`

That's it - your website is live at that address. Share it with anyone you'd like to try the challenge.

### Option B - Your organization's existing web host

If your school, college, or company already has a website, you likely have a way to upload new pages to it (for example, a "file manager" tool in a web-based control panel, or a program like FileZilla that connects to your server). If you're not sure, ask whoever manages your organization's website - they'll know the term **"FTP access"** or **"file manager."**

1. Ask your web administrator where new website files normally get uploaded, and request a folder (for example, `ai-challenge`) for this project.
2. Upload the **entire contents** of the `ai-challenge` folder from Step 1 into that folder - all the `.html` files, the `bootstrap.css` and `bootstrap.js` files, and the whole `images` folder.
3. Once uploaded, your web administrator can tell you the address to visit, which will probably look something like:
   `https://www.yourcollege.edu/ai-challenge/index.html`

---

## Step 3: Make it your own (optional)

The site currently shows Finger Lakes Community College's logo, green color, and contact email. You can swap these for your own without knowing how to code - you just need a plain text editor.

A **plain text editor** is different from something like Microsoft Word - it saves files without any hidden formatting, which the website needs in order to work. Good free options:

- **Windows:** Notepad (already on your computer)
- **Mac:** TextEdit, but switch it to "Plain Text" mode first (Format menu → Make Plain Text)
- Or, if you used GitHub Pages in Option A, you can edit files directly on the GitHub website: open the file, click the pencil ("Edit") icon, make your change, and click **Commit changes** - no separate editor needed.

Open the file `index.html` (inside `ai-challenge`) in your editor, and use **Find** (Ctrl+F on Windows, Cmd+F on Mac) to locate each of the following:

**1. The logo**
Search for: `header-logo`
You'll land on a line that looks like:
```
<img class="header-logo" src="https://pxl-flccedu.terminalfour.net/.../finger-lakes-color.svg" alt="Finger Lakes Community College">
```
Replace the web address inside the quotes after `src=` with a link to your own logo image, and replace the text inside the quotes after `alt=` with your organization's name. (If your logo is a file rather than a web link, upload it into the `images` folder alongside the other pictures, and point `src=` to `images/yourlogo.png` instead.)

**2. The green header color**
Search for: `478316`
You'll land on a line that looks like:
```
background-color: #478316;
```
Replace `478316` with your own color code, keeping the `#` in front. (Search "color picker" online to find the 6-character code for any color you like.)

**3. The contact email**
Search for: `ai@flcc.edu`
You'll find it in two places on the same line:
```
<h3 class="card-title text-center mb-4 section-title">Email us at <a href="mailto:ai@flcc.edu">ai@flcc.edu</a></h3>
```
Replace **both** instances of `ai@flcc.edu` with your own contact email address.

When you're done, save the file, and re-upload it the same way you did in Step 2 (or, if you're using GitHub, commit your change there directly).

---

## Step 4: Try it out

1. Visit your website address from Step 2.
2. Click on any of the "Challenge" cards - a window should pop up with that challenge's content.
3. Click through a few challenges to make sure everything loads correctly.

---

## Troubleshooting

**The challenge pop-ups are empty / nothing shows when I click a card.**
This almost always means the files are being viewed directly from your computer instead of from a real website address. Go back to Step 2 and make sure you're visiting the `https://...` address, not double-clicking `index.html` on your computer.

**I changed the logo or email, but I still see the old one.**
Make sure you saved the file as **plain text** (not as a Word document), and that you re-uploaded the changed file to the same place. If you're using GitHub Pages, it can take a minute or two for changes to appear after you save them - try refreshing the page.

**I don't have anyone who manages our website, and GitHub feels intimidating.**
Start with Option A (GitHub Pages) above - it only requires clicking buttons in steps 1 through 10, no technical knowledge required. If you get stuck, ask a tech-savvy colleague or student to sit with you for the GitHub Pages steps once; after that, the website runs on its own with no further maintenance.

**I want to roll this out at my own organization and would like help.**
Reach out to the email address shown on the AI Challenge homepage for support and customization help.
