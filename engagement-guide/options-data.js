// =============================================================================
// OPTIONS-DATA.JS
//
// This file controls the option cards in the two main question sections:
//   1. "How may learners use AI in this assignment?"
//   2. "What should learners include when submitting AI-assisted work?"
//
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO EDIT THIS FILE (no coding experience needed!)
// ─────────────────────────────────────────────────────────────────────────────
//
// Each card is one block that looks like this:
//
//     {
//         value:       'brainstorming',
//         icon:        '💡',
//         title:       'Brainstorming',
//         description: 'You can use AI to explore beyond what\'s immediately
//                        obvious...'
//     },
//
// To CHANGE a card's wording: just edit the text between the quote marks
// after `title:` or `description:`. Leave everything else (the commas, the
// curly braces { }, the quote marks) exactly where they are.
//
// To ADD a new card: copy an entire block from { to }, (including the comma
// after the closing curly brace), paste it where you'd like the new card to
// appear in the list, and edit the text inside.
//
// To REMOVE a card: delete its entire block, from its opening { down to its
// closing },
//
// To REORDER cards: cut and paste an entire { ... }, block to a new spot in
// the same list. The cards will appear on the page in the same order they're
// listed here.
//
// A few important rules:
//   - Every line of text must be wrapped in matching quote marks: '...' or "..."
//   - If your own text needs an apostrophe (like "learner's"), either:
//       a) put a backslash right before it, like this: 'learner\'s work', OR
//       b) wrap the whole thing in double quotes instead: "learner's work"
//   - Every card block except the very last one in a list needs a comma , right
//     after its closing curly brace }. The last one should NOT have a comma.
//   - Don't delete the [ ] square brackets that hold each list together, or
//     the { } curly braces around each individual card.
//
// If something looks broken after you save, the most common cause is a
// missing comma, a missing quote mark, or an extra/missing curly brace.
// Comparing your edit against a card just above or below it usually finds it.
//
// ─────────────────────────────────────────────────────────────────────────────
// WHAT EACH PROPERTY DOES
// ─────────────────────────────────────────────────────────────────────────────
//
//   value       Required. A short internal label - no spaces, lowercase is
//               best (e.g. 'research'). This gets saved whenever someone
//               shares a policy link, so once you've shared a link using a
//               card, it's best to leave its `value` alone going forward
//               (you can still freely edit the icon/title/description text).
//   icon        Required. A single emoji shown on the card.
//   title       Required. The bold heading on the card.
//   description Optional. The explanatory text under the title. Delete this
//               whole line for a card with no description (like "Open Use").
//   descriptionHTML   Optional, advanced. Same as `description`, but allows
//               a small bit of real HTML, such as a <code> tag. Only used by
//               the "Submit Chat Summary" card below. Leave this alone unless
//               you specifically need formatted text - for everything else,
//               use plain `description` instead.
//   isOther     Optional. Only ever set to `true` on ONE card per list - the
//               card that lets the instructor type their own custom option.
//               Leave this out entirely on all your other cards.
//
// =============================================================================

const OPTIONS_DATA = {

    // ── Question 1: "How may learners use AI in this assignment?" ──────────
    useCases: [
        {
            value: 'prohibited',
            icon:  '🚫',
            title: 'No AI Use'
            // No description here on purpose - selecting this card opens a
            // separate pop-up window where the instructor can give a reason.
            // That pop-up's wording lives in rationale-data.js, not here.
        },
        {
            value: 'encouraged',
            icon:  '✅',
            title: 'Open Use'
            // No description here on purpose - selecting this card opens a
            // separate pop-up window where the instructor can add a rationale.
            // That pop-up's wording lives in rationale-data.js, not here.
        },
        {
            value:       'brainstorming',
            icon:        '💡',
            title:       'Brainstorming',
            description: "You can use AI to explore beyond what's immediately obvious and surface ideas you might not have considered - giving you more raw material to evaluate, discard, or build on."
        },
        {
            value:       'research',
            icon:        '🔍',
            title:       'Research and Summarization',
            description: 'Use AI to quickly surface key themes and condense large amounts of information, freeing you to focus on analysis and critical thinking rather than just collecting facts.'
        },
        {
            value:       'outline',
            icon:        '🗒️',
            title:       'Outline and Thesis',
            description: 'Test-drive different organizational structures and thesis angles with AI, then choose and refine the one that best serves your argument.'
        },
        {
            value:       'content',
            icon:        '📝',
            title:       'Content Generation',
            description: 'You can use AI-generated drafts as something concrete to react to and revise - often a faster path to finding your own voice than starting from a blank page.'
        },
        {
            value:       'critique',
            icon:        '🗨️',
            title:       'Critique and Peer Review',
            description: 'You can use AI to help identify gaps in logic, unclear phrasing, or missing evidence before you share your work with others.'
        },
        {
            value:       'analysis',
            icon:        '📊',
            title:       'Data Analysis',
            description: 'You can use AI to identify patterns and generate questions from complex datasets, so you can spend more time interpreting what the data actually means.'
        },
        {
            value:       'other',
            icon:        '➕',
            title:       'Other Use Cases',
            description: 'Have something else in mind? Describe it below.',
            isOther:     true
        }
    ],

    // ── Question 2: "What should learners include when submitting...?" ────
    documentation: [
        {
            value:       'none',
            icon:        '❌',
            title:       'No Disclosure Required',
            description: 'Learners are not required to disclose or document their use of AI for this assignment. AI use is fully permitted - keep the focus on the task itself.'
        },
        {
            value:       'tools',
            icon:        '📝',
            title:       'Document Platforms',
            description: 'Please document which AI platforms and tools you used. Be intentional about tool choice, and help me understand the AI landscape you find valuable.'
        },
        {
            value:           'chatsummary',
            icon:            '💬',
            title:           'Submit Chat Summary',
            // This card uses descriptionHTML (rather than plain description)
            // so the example prompt can be wrapped in a <code> tag.
            descriptionHTML: "Include a brief AI-generated overview of your conversation. Try this prompt: <code>Please summarize the chat we've just had into 2 or 3 paragraphs.</code>"
        },
        {
            value:       'prompts',
            icon:        '📤',
            title:       'Submit Relevant Prompts & Outputs',
            description: 'Please curate the prompts and AI responses you are comfortable sharing that demonstrate how AI helped shape your final product. This makes visible how you shape questions and evaluate responses - skills that are as important as the output itself.'
        },
        {
            value:       'citation',
            icon:        '🧾',
            title:       'Formal Citation Required',
            description: 'Please include formal citations for any AI-generated content you use. Reinforces information literacy: provenance matters regardless of source, and AI-generated content deserves the same scrutiny as any other reference.'
        },
        {
            value:       'reflection',
            icon:        '🧠',
            title:       'Additional Reflection',
            description: 'Please include a brief reflection on your AI usage and what you learned from the experience. Metacognitive writing strengthens ownership of the final work by helping you articulate what you changed, what you kept, and why.'
        },
        {
            value:       'factcheck',
            icon:        '🔎',
            title:       'Fact Check',
            description: "Please verify AI-generated information against trusted sources and document your fact-checking process. AI tools can produce inaccurate information. Requiring verification reinforces that accuracy is your responsibility, not the tool's."
        },
        {
            value:       'multitools',
            icon:        '🔄',
            title:       'Compare Multiple Tools',
            description: 'Please compare results from at least two AI tools and reflect on the differences. Seeing that responses vary across tools builds critical perspective and helps you resist treating any single AI answer as authoritative.'
        },
        {
            value:       'other',
            icon:        '➕',
            title:       'Other Requirements',
            description: 'Have additional documentation requirements? Specify them below.',
            isOther:     true
        }
    ]
};
