// =============================================================================
// COURSE-DATA.JS  -  COURSE LEVEL
//
// This file holds all the wording for the "Course Level" tab: a guide that
// covers a whole course (for a syllabus), rather than a single assignment.
//
// It works exactly like options-data.js. See the instructions at the top of
// that file for how to change, add, remove, or reorder cards. The rules are
// the same here: keep the quote marks, commas, and curly braces in place.
//
// ─────────────────────────────────────────────────────────────────────────────
// WHAT IS DIFFERENT IN THIS FILE
// ─────────────────────────────────────────────────────────────────────────────
//
//   - The first question ("approach") is a single choice: an instructor
//     picks exactly one card. Each of those cards has two extra properties:
//       guideTitle  the big title shown at the top of the finished guide
//       statement   the opening paragraph of the finished guide
//   - Every other question allows several choices.
//   - hideWhen: 'none' on a question means the question is hidden when the
//     instructor chooses "No AI Use" (because it would not apply).
//
// =============================================================================

const COURSE_DATA = {

    // ── Question 1: one choice ──────────────────────────────────────────────
    approach: {
        question: 'What is the general approach to AI in this course?',
        options: [
            {
                value:       'none',
                emoji:       '🚫',
                icon:        'ban',
                title:       'No AI Use',
                description: 'AI tools are not permitted for any work in this course.',
                guideTitle:  'No AI Use in This Course',
                statement:   'AI tools are not permitted for any work in this course unless I tell you otherwise for a specific assignment. Everything you submit should reflect your own thinking, writing, and problem-solving.'
            },
            {
                value:       'varies',
                emoji:       '⚠️',
                icon:        'triangle-alert',
                title:       'Varies by Assignment',
                description: 'Each assignment says whether and how AI may be used.',
                guideTitle:  'AI Use Varies by Assignment',
                statement:   'Whether and how you may use AI depends on the assignment, and each assignment will include its own AI guidance. If an assignment does not mention AI, please ask me before you use it.'
            },
            {
                value:       'open',
                emoji:       '✅',
                icon:        'circle-check',
                title:       'Open Use',
                description: 'AI tools may be used throughout the course, within the expectations below.',
                guideTitle:  'Open AI Use in This Course',
                statement:   'You are welcome to use AI tools throughout this course, as long as you follow the expectations below. Using AI well is a skill, and this course is a good place to practice it.'
            }
        ]
    },

    // ── Question 2 ──────────────────────────────────────────────────────────
    welcome: {
        question:     'Which uses of AI are generally welcome in this course?',
        guideHeading: 'Unless an assignment says otherwise, you may use AI to:',
        otherLabel:   'Describe other welcome uses:',
        hideWhen:     'none',
        options: [
            {
                value:       'brainstorm',
                emoji:       '💡',
                icon:        'lightbulb',
                title:       'Brainstorm and Explore Ideas',
                description: 'Generate ideas, questions, and angles you might not have considered, then decide which ones are worth pursuing.'
            },
            {
                value:       'study',
                emoji:       '📚',
                icon:        'book-open',
                title:       'Study and Review',
                description: 'Ask AI to explain a concept in a different way, create practice questions, or quiz you before a test.'
            },
            {
                value:       'feedback',
                emoji:       '🗨️',
                icon:        'message-square-text',
                title:       'Get Feedback on Drafts',
                description: 'Ask AI to point out unclear writing, gaps in logic, or missing evidence. The revisions should still be yours.'
            },
            {
                value:       'grammar',
                emoji:       '✍️',
                icon:        'spell-check',
                title:       'Check Grammar and Clarity',
                description: 'Use AI to catch spelling, grammar, and clarity problems, the same way you might use a writing tutor or spell checker.'
            },
            {
                value:       'research',
                emoji:       '🔍',
                icon:        'search',
                title:       'Get Started on Research',
                description: 'Use AI to find starting points and summarize background information. Always check the facts and find the original sources.'
            },
            {
                value:       'coding',
                emoji:       '💻',
                icon:        'code',
                title:       'Coding and Technical Help',
                description: 'Use AI to explain error messages, suggest approaches, or review code that you have written.'
            },
            {
                value:       'access',
                emoji:       '♿',
                icon:        'accessibility',
                title:       'Accessibility and Language Support',
                description: 'Use AI to translate, simplify, or read content aloud, or in other ways that support how you learn best.'
            },
            {
                value:       'other',
                emoji:       '➕',
                icon:        'plus',
                title:       'Other Uses',
                description: 'Have something else in mind? Describe it below.',
                isOther:     true
            }
        ]
    },

    // ── Question 3 ──────────────────────────────────────────────────────────
    offLimits: {
        question:     'Which uses of AI are off-limits in this course?',
        guideHeading: 'Please do not use AI to:',
        otherLabel:   'Describe other off-limits uses:',
        hideWhen:     'none',
        options: [
            {
                value:       'submit',
                emoji:       '🙅',
                icon:        'circle-x',
                title:       'Submit AI Work as Your Own',
                description: 'Turn in text, code, images, or other work created by AI as if you created it yourself.'
            },
            {
                value:       'exams',
                emoji:       '📝',
                icon:        'file-pen-line',
                title:       'Complete Quizzes or Exams',
                description: 'Use AI during quizzes, tests, or exams unless I specifically allow it.'
            },
            {
                value:       'personal',
                emoji:       '💬',
                icon:        'messages-square',
                title:       'Write Discussion Posts or Reflections',
                description: 'Write discussion posts, journal entries, or personal reflections. These are meant to capture your own voice and experience.'
            },
            {
                value:       'sources',
                emoji:       '🧾',
                icon:        'quote',
                title:       'Create Citations or Quotes',
                description: 'Create citations, quotes, or references for you. AI can invent sources that do not exist.'
            },
            {
                value:       'private',
                emoji:       '🔒',
                icon:        'lock',
                title:       'Share Private Information',
                description: "Upload classmates' work, personal information, or anything confidential."
            },
            {
                value:       'other',
                emoji:       '➕',
                icon:        'plus',
                title:       'Other Off-Limits Uses',
                description: 'Have something else in mind? Describe it below.',
                isOther:     true
            }
        ]
    },

    // ── Question 4 ──────────────────────────────────────────────────────────
    acknowledge: {
        question:     'How should learners acknowledge their use of AI?',
        guideHeading: 'When you use AI, please:',
        otherLabel:   'Describe other requirements:',
        hideWhen:     'none',
        options: [
            {
                value:       'none',
                emoji:       '❌',
                icon:        'circle-x',
                title:       'No Disclosure Needed',
                description: 'You do not need to tell me when you use AI in the ways this guide allows.',
                exclusive:   true
            },
            {
                value:       'statement',
                emoji:       '📝',
                icon:        'file-pen-line',
                title:       'Include an AI Use Statement',
                description: 'Add a short note to your work saying which AI tools you used and how you used them.'
            },
            {
                value:       'cite',
                emoji:       '🧾',
                icon:        'quote',
                title:       'Cite AI Like Any Other Source',
                description: 'Cite AI-generated content using the citation style for this course (for example, APA or MLA).'
            },
            {
                value:       'history',
                emoji:       '💬',
                icon:        'messages-square',
                title:       'Keep Your Chat History',
                description: 'Save your AI conversations so you can share them with me if I ask.'
            },
            {
                value:       'reflect',
                emoji:       '🧠',
                icon:        'brain',
                title:       'Reflect on Your Use',
                description: 'Briefly explain what AI helped with, what you changed, and what you learned.'
            },
            {
                value:       'other',
                emoji:       '➕',
                icon:        'plus',
                title:       'Other Requirements',
                description: 'Have something else in mind? Describe it below.',
                isOther:     true
            }
        ]
    },

    // ── Question 5 ──────────────────────────────────────────────────────────
    expectations: {
        question:     'What else should learners know?',
        guideHeading: 'A few more things to know:',
        otherLabel:   'Add your own expectation:',
        options: [
            {
                value:       'accuracy',
                emoji:       '🔎',
                icon:        'search-check',
                title:       'You Are Responsible for Accuracy',
                description: 'AI can be confidently wrong. Check anything AI tells you before you rely on it or submit it.'
            },
            {
                value:       'privacy',
                emoji:       '🔒',
                icon:        'lock',
                title:       'Protect Your Privacy',
                description: 'Many AI tools store what you type. Avoid sharing personal, financial, or health information.'
            },
            {
                value:       'ask',
                emoji:       '❓',
                icon:        'circle-help',
                title:       'When in Doubt, Ask',
                description: 'If you are not sure whether a use of AI is allowed, ask me first. Asking is always okay.'
            },
            {
                value:       'integrity',
                emoji:       '⚖️',
                icon:        'scale',
                title:       'Academic Integrity',
                description: "Using AI in ways this guide does not allow will be handled under the college's academic integrity policy."
            },
            {
                value:       'free',
                emoji:       '🆓',
                icon:        'hand',
                title:       'Free Tools Are Enough',
                description: 'You will never need a paid AI tool for this course. Free versions are enough for every assignment.'
            },
            {
                value:       'other',
                emoji:       '➕',
                icon:        'plus',
                title:       'Other Expectations',
                description: 'Have something else in mind? Describe it below.',
                isOther:     true
            }
        ]
    }
};
