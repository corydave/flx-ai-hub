// =============================================================================
// OPTIONS-DATA.JS  -  ASSIGNMENT LEVEL
//
// This file holds all the wording for the "Assignment Level" tab:
//   - the two questions and their option cards
//   - the sentences used in the finished AI Engagement Guide
//
// (The "Course Level" tab has its own file, course-data.js, which works the
// same way. The pop-up reasons for "No AI Use" and "Open Use" are in
// rationale-data.js.)
//
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO EDIT THIS FILE (no coding experience needed!)
// ─────────────────────────────────────────────────────────────────────────────
//
// Each option card is one block that looks like this:
//
//     {
//         value:       'brainstorming',
//         emoji:       '💡',
//         icon:        'lightbulb',
//         title:       'Brainstorming',
//         description: 'You can use AI to explore beyond what is immediately obvious...'
//     },
//
// To CHANGE a card's wording: edit the text between the quote marks after
// `title:` or `description:`. Leave the commas, curly braces { } and quote
// marks exactly where they are.
//
// To ADD a card: copy a whole block from { to }, (including the comma after
// the closing curly brace), paste it where you want the new card, and edit it.
//
// To REMOVE a card: delete its whole block, from its { down to its },
//
// To REORDER cards: cut and paste a whole { ... }, block. Cards appear on the
// page in the same order as in this file.
//
// A few important rules:
//   - Every piece of text must be wrapped in matching quote marks: '...' or "..."
//   - If your text needs an apostrophe (like "learner's"), either:
//       a) put a backslash right before it: 'learner\'s work', OR
//       b) wrap the whole thing in double quotes instead: "learner's work"
//   - Every block except the last one in a list needs a comma , after its
//     closing curly brace }.
//   - Don't delete the [ ] square brackets or the { } curly braces.
//
// If the page shows a warning about this file after you save, the usual cause
// is a missing comma, quote mark, or curly brace near your latest edit.
//
// ─────────────────────────────────────────────────────────────────────────────
// WHAT EACH PROPERTY DOES
// ─────────────────────────────────────────────────────────────────────────────
//
//   value        Required. A short internal label with no spaces (e.g.
//                'research'). It is saved in shared links, so once you have
//                shared a link, leave a card's `value` alone (you can still
//                change everything else).
//   emoji        Required. The emoji shown when "Emoji" icons are chosen.
//   icon         Required. The name of the icon shown when "Icons" are chosen.
//                It must be one of the names listed in icons.js.
//   title        Required. The bold heading on the card.
//   description  Optional. The explanation under the title. It is also the
//                sentence used in the finished guide.
//   example      Optional. A sample prompt, shown after the description in a
//                code-style box (see "Submit Chat Summary" below).
//   exclusive    Optional. true means choosing this card clears all the
//                others in the same question (like "No AI Use").
//   isOther      Optional. true on the ONE card per question that opens a
//                box where the instructor can type their own option.
//
// =============================================================================

const OPTIONS_DATA = {

    // ── Question 1 ──────────────────────────────────────────────────────────
    useCases: {
        question:     'How may learners use AI in this assignment?',
        guideHeading: 'Feel free to leverage AI:',
        otherLabel:   'Specify other use cases:',
        options: [
            {
                value:     'prohibited',
                emoji:     '🚫',
                icon:      'ban',
                title:     'No AI Use',
                exclusive: true
                // No description on purpose: choosing this card opens a pop-up
                // where the instructor can give a reason (see rationale-data.js).
            },
            {
                value:     'encouraged',
                emoji:     '✅',
                icon:      'circle-check',
                title:     'Open Use',
                exclusive: true
                // No description on purpose: choosing this card opens a pop-up
                // where the instructor can add a rationale (see rationale-data.js).
            },
            {
                value:       'brainstorming',
                emoji:       '💡',
                icon:        'lightbulb',
                title:       'Brainstorming',
                description: "You can use AI to explore beyond what's immediately obvious and surface ideas you might not have considered - giving you more raw material to evaluate, discard, or build on."
            },
            {
                value:       'research',
                emoji:       '🔍',
                icon:        'search',
                title:       'Research and Summarization',
                description: 'Use AI to quickly surface key themes and condense large amounts of information, freeing you to focus on analysis and critical thinking rather than just collecting facts.'
            },
            {
                value:       'outline',
                emoji:       '🗒️',
                icon:        'list-tree',
                title:       'Outline and Thesis',
                description: 'Test-drive different organizational structures and thesis angles with AI, then choose and refine the one that best serves your argument.'
            },
            {
                value:       'content',
                emoji:       '📝',
                icon:        'pen-line',
                title:       'Content Generation',
                description: 'You can use AI-generated drafts as something concrete to react to and revise - often a faster path to finding your own voice than starting from a blank page.'
            },
            {
                value:       'critique',
                emoji:       '🗨️',
                icon:        'message-square-text',
                title:       'Critique and Peer Review',
                description: 'You can use AI to help identify gaps in logic, unclear phrasing, or missing evidence before you share your work with others.'
            },
            {
                value:       'analysis',
                emoji:       '📊',
                icon:        'chart-column',
                title:       'Data Analysis',
                description: 'You can use AI to identify patterns and generate questions from complex datasets, so you can spend more time interpreting what the data actually means.'
            },
            {
                value:       'other',
                emoji:       '➕',
                icon:        'plus',
                title:       'Other Use Cases',
                description: 'Have something else in mind? Describe it below.',
                isOther:     true
            }
        ]
    },

    // ── Question 2 ──────────────────────────────────────────────────────────
    documentation: {
        question:     'What should learners include when submitting AI-assisted work?',
        guideHeading: 'Please share how you used AI:',
        otherLabel:   'Specify additional requirements:',
        options: [
            {
                value:       'none',
                emoji:       '❌',
                icon:        'circle-x',
                title:       'No Disclosure Required',
                description: 'Learners are not required to disclose or document their use of AI for this assignment. AI use is fully permitted - keep the focus on the task itself.',
                exclusive:   true
            },
            {
                value:       'tools',
                emoji:       '📝',
                icon:        'app-window',
                title:       'Document Platforms',
                description: 'Please document which AI platforms and tools you used. Be intentional about tool choice, and help me understand the AI landscape you find valuable.'
            },
            {
                value:       'chatsummary',
                emoji:       '💬',
                icon:        'messages-square',
                title:       'Submit Chat Summary',
                description: 'Include a brief AI-generated overview of your conversation. Try this prompt:',
                example:     "Please summarize the chat we've just had into 2 or 3 paragraphs."
            },
            {
                value:       'prompts',
                emoji:       '📤',
                icon:        'send',
                title:       'Submit Relevant Prompts & Outputs',
                description: 'Please curate the prompts and AI responses you are comfortable sharing that demonstrate how AI helped shape your final product. This makes visible how you shape questions and evaluate responses - skills that are as important as the output itself.'
            },
            {
                value:       'citation',
                emoji:       '🧾',
                icon:        'quote',
                title:       'Formal Citation Required',
                description: 'Please include formal citations for any AI-generated content you use. Reinforces information literacy: provenance matters regardless of source, and AI-generated content deserves the same scrutiny as any other reference.'
            },
            {
                value:       'reflection',
                emoji:       '🧠',
                icon:        'brain',
                title:       'Additional Reflection',
                description: 'Please include a brief reflection on your AI usage and what you learned from the experience. Metacognitive writing strengthens ownership of the final work by helping you articulate what you changed, what you kept, and why.'
            },
            {
                value:       'factcheck',
                emoji:       '🔎',
                icon:        'search-check',
                title:       'Fact Check',
                description: "Please verify AI-generated information against trusted sources and document your fact-checking process. AI tools can produce inaccurate information. Requiring verification reinforces that accuracy is your responsibility, not the tool's."
            },
            {
                value:       'multitools',
                emoji:       '🔄',
                icon:        'arrow-left-right',
                title:       'Compare Multiple Tools',
                description: 'Please compare results from at least two AI tools and reflect on the differences. Seeing that responses vary across tools builds critical perspective and helps you resist treating any single AI answer as authoritative.'
            },
            {
                value:       'other',
                emoji:       '➕',
                icon:        'plus',
                title:       'Other Requirements',
                description: 'Have additional documentation requirements? Specify them below.',
                isOther:     true
            }
        ]
    },

    // ── Wording used in the finished guide ──────────────────────────────────
    guideText: {
        // The big title at the top of the guide, for each level of AI use
        openTitle:        'Open AI Use',
        selectiveTitle:   'Selective AI Use',
        noAiTitle:        'No AI Use for This Assignment',
        // Added to the end of the title when documentation is required,
        // after the separator (for example "Selective AI Use - Documentation Required")
        separator:        ' - ',
        documentationTag: 'Documentation Required',
        // The first sentence of the guide for "Open Use" and "No AI Use".
        // The instructor's chosen reason (if any) is added after it.
        openSentence:     'You are welcome to explore AI tools freely throughout this assignment.',
        noAiSentence:     'This assignment is designed to be completed without AI tools.'
    }
};
