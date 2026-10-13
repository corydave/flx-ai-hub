// =============================================================================
// COURSE-DATA.JS  -  COURSE LEVEL
//
// This file holds the example course policies shown on the "Course Level"
// tab. An instructor picks the example closest to their course, and can then
// edit every part of it on the page.
//
// The examples span the range of approaches to AI-aware teaching, from no AI
// at all to AI being required. Each one is original wording, based on a
// widely used framework (listed in its "basedOn" line):
//
//   - The AI Assessment Scale (AIAS) by Perkins, Furze, Roe, and MacVaugh
//     (2024), which describes five levels: No AI, AI Planning,
//     AI Collaboration, Full AI, and AI Exploration.
//   - The "traffic light" approach (red, yellow, green), where each
//     assignment is labeled with how much AI it allows. Used at, for
//     example, the University of Warwick and UW-Green Bay.
//   - The "prohibit / allow with attribution / encourage" tiers common in
//     syllabus statements, such as those collected by Lance Eaton.
//   - Policies that treat AI as a required, emerging skill, such as the one
//     Ethan Mollick (Wharton) introduced in 2023.
//
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO EDIT THIS FILE (no coding experience needed!)
// ─────────────────────────────────────────────────────────────────────────────
//
// Each example is one block that starts with { value: '...' and ends with },
// To change the wording, edit the text between the quote marks. To add an
// example, copy a whole block and change it. To remove one, delete its block.
// Examples appear on the page in the same order as in this file.
//
// The same rules as in options-data.js apply:
//   - Every piece of text is wrapped in matching quote marks: '...' or "..."
//   - For an apostrophe, use double quotes around the text ("learner's"),
//     or put a backslash before it ('learner\'s').
//   - Every block except the last in a list needs a comma after its }
//   - Don't delete the [ ] square brackets or the { } curly braces.
//
// ─────────────────────────────────────────────────────────────────────────────
// WHAT EACH PROPERTY DOES
// ─────────────────────────────────────────────────────────────────────────────
//
//   value       Required. A short internal label with no spaces. It is saved
//               in shared links, so once you have shared a link, leave it alone.
//   emoji/icon  Required. The emoji, and the icon name from icons.js, shown
//               on the example's card and beside the guide's title.
//   level       Required. 'none', 'selective', or 'open'. Sets the color of
//               the guide's title (red, amber, or green).
//   title       Required. The name of the example, shown on its card.
//   summary     Required. One or two sentences on the card describing it.
//   basedOn     Optional. The framework the example is based on, shown in
//               small text on the card (not in the finished guide).
//   guideTitle  Required. The big title at the top of the finished guide.
//   sections    Required. The parts of the guide, in order. Each section has:
//                 heading   a short heading (can be '' for no heading)
//                 emoji     the emoji shown beside the heading
//                 icon      the icon name (from icons.js) shown beside it
//                 lines     the text. Each line is a paragraph. A line that
//                           starts with "- " becomes a bullet point.
//
// =============================================================================

const COURSE_DATA = {

    // The heading above the example cards, and the hint below it
    question: 'Which example is closest to the AI policy for your course?',
    hint:     'Choose one to start from. You can change every part of it below.',

    examples: [

        // ── 1. NO AI ────────────────────────────────────────────────────────
        {
            value:      'no-ai',
            emoji:      '🚫',
            icon:       'ban',
            level:      'none',
            title:      'AI-Free Course',
            summary:    'AI tools are not used for any work in this course, so learners build and show their own skills.',
            basedOn:    'AI Assessment Scale, Level 1 (No AI); "prohibit" syllabus statements',
            guideTitle: 'No AI Use in This Course',
            sections: [
                {
                    heading: 'Our approach',
                    emoji:   '🚫',
                    icon:    'ban',
                    lines: [
                        'In this course, you will build skills that you need to practice on your own: thinking through problems, putting ideas into your own words, and learning from your mistakes. For that reason, AI tools are not permitted for any work in this course unless I tell you otherwise for a specific activity.'
                    ]
                },
                {
                    heading: 'What this means',
                    emoji:   '✔️',
                    icon:    'check',
                    lines: [
                        '- Do not use AI tools (such as ChatGPT, Gemini, Claude, or Copilot) to brainstorm, research, outline, write, edit, translate, or check your work.',
                        '- Do not submit work that was created or changed by AI, even in part.',
                        '- Spelling and grammar checkers that only fix errors are fine. Tools that rewrite your sentences are not.'
                    ]
                },
                {
                    heading: 'Why',
                    emoji:   '💡',
                    icon:    'lightbulb',
                    lines: [
                        'This is not because AI is bad. It is because the goal of this course is your own learning, and practice is how that happens. Working through difficult ideas yourself is the point.'
                    ]
                },
                {
                    heading: 'Questions and integrity',
                    emoji:   '⚖️',
                    icon:    'scale',
                    lines: [
                        'If you are not sure whether a tool counts as AI, ask me before you use it. Using AI in this course will be handled under the college\'s academic integrity policy.'
                    ]
                }
            ]
        },

        // ── 2. AI FOR PLANNING ONLY ─────────────────────────────────────────
        {
            value:      'planning',
            emoji:      '💡',
            icon:       'lightbulb',
            level:      'selective',
            title:      'AI for Planning Only',
            summary:    'AI may help learners get started (brainstorming, outlining, early research), but the finished work is theirs alone.',
            basedOn:    'AI Assessment Scale, Level 2 (AI Planning)',
            guideTitle: 'Limited AI Use: Planning Only',
            sections: [
                {
                    heading: 'Our approach',
                    emoji:   '⚠️',
                    icon:    'triangle-alert',
                    lines: [
                        'You may use AI tools to help you get started on your work, but everything you submit must be written and created by you.'
                    ]
                },
                {
                    heading: 'You may use AI to:',
                    emoji:   '✔️',
                    icon:    'check',
                    lines: [
                        '- Brainstorm topics, questions, or angles to explore.',
                        '- Build a rough outline or plan before you start writing.',
                        '- Get a quick overview of a topic before you do your own research.'
                    ]
                },
                {
                    heading: 'Please do not use AI to:',
                    emoji:   '🚫',
                    icon:    'ban',
                    lines: [
                        '- Write, rewrite, or edit any part of the work you submit.',
                        '- Complete quizzes, tests, or discussion posts.',
                        '- Create citations or quotes. AI can invent sources that do not exist.'
                    ]
                },
                {
                    heading: 'Acknowledging your use',
                    emoji:   '📝',
                    icon:    'file-pen-line',
                    lines: [
                        'If you used AI to plan, add a sentence or two to your work saying which tool you used and how it helped.'
                    ]
                },
                {
                    heading: 'When in doubt',
                    emoji:   '❓',
                    icon:    'circle-help',
                    lines: [
                        'If you are unsure whether a use of AI is allowed, ask me first. Using AI beyond what this policy allows will be handled under the college\'s academic integrity policy.'
                    ]
                }
            ]
        },

        // ── 3. TRAFFIC LIGHT ────────────────────────────────────────────────
        {
            value:      'traffic-light',
            emoji:      '🚦',
            icon:       'traffic-cone',
            level:      'selective',
            title:      'Traffic Light: Varies by Assignment',
            summary:    'Each assignment is labeled red, yellow, or green to show how much AI it allows.',
            basedOn:    'The "traffic light" approach (used at, for example, the University of Warwick and UW-Green Bay)',
            guideTitle: 'AI Use Varies by Assignment',
            sections: [
                {
                    heading: 'Our approach',
                    emoji:   '⚠️',
                    icon:    'triangle-alert',
                    lines: [
                        'How much AI you may use depends on the assignment. Each assignment in this course is labeled with one of three colors, so you always know what is expected.'
                    ]
                },
                {
                    heading: 'The three colors',
                    emoji:   '🚦',
                    icon:    'traffic-cone',
                    lines: [
                        '- 🔴 Red (no AI): do not use AI at any stage of the assignment. These assignments build skills you need to practice on your own.',
                        '- 🟡 Yellow (some AI): you may use AI for the parts the assignment describes, such as brainstorming or feedback, but the work you submit must be your own.',
                        '- 🟢 Green (AI welcome): you may use AI throughout the assignment, as long as you acknowledge how you used it.'
                    ]
                },
                {
                    heading: 'Acknowledging your use',
                    emoji:   '📝',
                    icon:    'file-pen-line',
                    lines: [
                        'For yellow and green assignments, include a short note saying which AI tools you used and how you used them.'
                    ]
                },
                {
                    heading: 'When in doubt',
                    emoji:   '❓',
                    icon:    'circle-help',
                    lines: [
                        'If an assignment does not have a color, treat it as red and ask me. Using AI in ways an assignment does not allow will be handled under the college\'s academic integrity policy.'
                    ]
                }
            ]
        },

        // ── 4. AI AS A COLLABORATOR, WITH DISCLOSURE ────────────────────────
        {
            value:      'collaborate',
            emoji:      '🤝',
            icon:       'messages-square',
            level:      'selective',
            title:      'AI as a Collaborator, with Disclosure',
            summary:    'Learners may use AI for drafting, feedback, and revision, as long as they think critically about it and say how they used it.',
            basedOn:    'AI Assessment Scale, Level 3 (AI Collaboration); "allow with attribution" syllabus statements',
            guideTitle: 'AI Use Permitted, with Disclosure',
            sections: [
                {
                    heading: 'Our approach',
                    emoji:   '✅',
                    icon:    'circle-check',
                    lines: [
                        'You may use AI tools as a collaborator in this course: to help you draft, get feedback, and revise. You are the author of your work, and you are responsible for everything in it.'
                    ]
                },
                {
                    heading: 'You may use AI to:',
                    emoji:   '✔️',
                    icon:    'check',
                    lines: [
                        '- Brainstorm, outline, and explore ideas.',
                        '- Get feedback on drafts, such as unclear writing or gaps in your argument.',
                        '- Help you revise, as long as you review and change what it suggests.',
                        '- Explain concepts you are stuck on.'
                    ]
                },
                {
                    heading: 'Please do not use AI to:',
                    emoji:   '🚫',
                    icon:    'ban',
                    lines: [
                        '- Write whole assignments, or submit its output without changing it.',
                        '- Complete quizzes or exams, unless I say otherwise.'
                    ]
                },
                {
                    heading: 'Acknowledging your use',
                    emoji:   '📝',
                    icon:    'file-pen-line',
                    lines: [
                        'With each assignment, include a short AI use statement: which tools you used, what you used them for, and what you changed. Using AI without acknowledging it will be handled under the college\'s academic integrity policy.'
                    ]
                },
                {
                    heading: 'Check everything',
                    emoji:   '🔎',
                    icon:    'search-check',
                    lines: [
                        'AI can be confidently wrong, and it can invent facts and sources. Check anything AI tells you before you rely on it.'
                    ]
                }
            ]
        },

        // ── 5. FULL AI USE, WITH RESPONSIBILITY ─────────────────────────────
        {
            value:      'full',
            emoji:      '✅',
            icon:       'circle-check',
            level:      'open',
            title:      'Full AI Use, with Responsibility',
            summary:    'AI may be used for any part of the coursework. Learners direct it, check it, and own the results.',
            basedOn:    'AI Assessment Scale, Level 4 (Full AI); "encourage" syllabus statements',
            guideTitle: 'Open AI Use in This Course',
            sections: [
                {
                    heading: 'Our approach',
                    emoji:   '✅',
                    icon:    'circle-check',
                    lines: [
                        'You are welcome to use AI tools for any part of your work in this course. Using AI well is an important skill, and this course is a good place to practice it.'
                    ]
                },
                {
                    heading: 'Your responsibilities',
                    emoji:   '🧭',
                    icon:    'search-check',
                    lines: [
                        '- You are in charge: decide what to ask AI, and decide what to keep.',
                        '- You are responsible for everything you submit, including any errors AI makes.',
                        '- Check facts, numbers, and sources. AI can invent them.',
                        '- Do not share personal, private, or confidential information with AI tools.'
                    ]
                },
                {
                    heading: 'Acknowledging your use',
                    emoji:   '📝',
                    icon:    'file-pen-line',
                    lines: [
                        'Include a brief note with each assignment saying how you used AI. This helps both of us see what works.'
                    ]
                },
                {
                    heading: 'Fairness',
                    emoji:   '🆓',
                    icon:    'hand',
                    lines: [
                        'You will never need a paid AI tool for this course. Free versions are enough for every assignment.'
                    ]
                }
            ]
        },

        // ── 6. AI REQUIRED ──────────────────────────────────────────────────
        {
            value:      'required',
            emoji:      '🚀',
            icon:       'sparkles',
            level:      'open',
            title:      'AI Required: Exploring AI Together',
            summary:    'Learners are expected to use AI, and some assignments are designed around exploring what it can and cannot do.',
            basedOn:    'AI Assessment Scale, Level 5 (AI Exploration); policies that treat AI as a required, emerging skill (for example, Ethan Mollick, 2023)',
            guideTitle: 'AI Is Part of This Course',
            sections: [
                {
                    heading: 'Our approach',
                    emoji:   '🚀',
                    icon:    'sparkles',
                    lines: [
                        'In this course, you are expected to use AI tools. Knowing how to work with AI is an emerging skill, and some of our assignments are designed around exploring what AI can and cannot do in our field.'
                    ]
                },
                {
                    heading: 'What this looks like',
                    emoji:   '✔️',
                    icon:    'check',
                    lines: [
                        '- Some assignments will ask you to use AI in specific ways, and to compare, test, or critique what it produces.',
                        '- You may use AI for any other part of your work, too.',
                        '- Experiment. Trying things that do not work is part of learning.'
                    ]
                },
                {
                    heading: 'Your responsibilities',
                    emoji:   '🔎',
                    icon:    'search-check',
                    lines: [
                        '- AI can be wrong. Check its output against other sources, and think critically about it.',
                        '- You are responsible for any errors or omissions in work you submit.',
                        '- Do not share personal, private, or confidential information with AI tools.'
                    ]
                },
                {
                    heading: 'Acknowledging your use',
                    emoji:   '📝',
                    icon:    'file-pen-line',
                    lines: [
                        'Always say when and how you used AI. Not acknowledging AI use will be handled under the college\'s academic integrity policy.'
                    ]
                },
                {
                    heading: 'Access',
                    emoji:   '🆓',
                    icon:    'hand',
                    lines: [
                        'If you do not have access to an AI tool that an assignment needs, let me know and we will find a free option that works for you.'
                    ]
                }
            ]
        }
    ]
};
