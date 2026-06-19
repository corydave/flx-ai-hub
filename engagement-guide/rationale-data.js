// =============================================================================
// RATIONALE-DATA.JS
//
// This file controls the preset reasons/rationales shown in the two small
// pop-up windows that appear when an instructor selects:
//   1. "No AI Use"  -> pop-up asks "Why is AI not permitted?"
//   2. "Open Use"    -> pop-up asks "Why is open AI use permitted?"
//
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO EDIT THIS FILE (no coding experience needed!)
// ─────────────────────────────────────────────────────────────────────────────
//
// Each preset option is one block that looks like this:
//
//     {
//         title: 'In-Class Assessment',
//         text:  'This is an in-class or timed assessment where AI tools are not available.'
//     },
//
// To CHANGE an option's wording: edit the text between the quote marks after
// `title:` or `text:`. Leave the commas, curly braces { }, and quote marks
// exactly where they are.
//
// To ADD a new option: copy an entire block from { to }, (including the
// comma after the closing curly brace), paste it where you'd like it to
// appear in the list, and edit the text inside.
//
// To REMOVE an option: delete its entire block, from its opening { down to
// its closing },
//
// To REORDER options: cut and paste an entire { ... }, block to a new spot
// in the same list. Options appear in the pop-up in the same order listed here.
//
// A few important rules:
//   - Every line of text must be wrapped in matching quote marks: '...' or "..."
//   - If your own text needs an apostrophe (like "learner's"), either:
//       a) put a backslash right before it, like this: 'learner\'s work', OR
//       b) wrap the whole thing in double quotes instead: "learner's work"
//   - Every option block except the very last one in a list needs a comma ,
//     right after its closing curly brace }. The last one should NOT have one.
//   - Don't delete the [ ] square brackets that hold each list together, or
//     the { } curly braces around each individual option.
//
// If something looks broken after you save, the most common cause is a
// missing comma, a missing quote mark, or an extra/missing curly brace.
// Comparing your edit against an option just above or below it usually
// finds it.
//
// ─────────────────────────────────────────────────────────────────────────────
// WHAT EACH PROPERTY DOES
// ─────────────────────────────────────────────────────────────────────────────
//
//   title   Required. The short bold heading shown on the preset option's card.
//   text    Required. The sentence shown to instructors on the card, AND the
//           sentence that gets written into the final AI Engagement Guide
//           if the instructor picks this option. Write it the same way it
//           should read in the finished guide (e.g. "you" rather than
//           "learners", since learners are the ones who will read it).
//
// Instructors can also always type their own custom reason/rationale instead
// of picking one of these presets - that free-text box is built into the
// pop-up automatically and doesn't need anything added here.
//
// =============================================================================

const RATIONALE_DATA = {

    // ── Pop-up shown after selecting "No AI Use" ────────────────────────────
    // Heading shown above these choices: "Why is AI not permitted?"
    noAiReasons: [
        {
            title: 'Demonstrate Own Skills',
            text:  'You should demonstrate your own knowledge and skills without AI assistance.'
        },
        {
            title: 'In-Class Assessment',
            text:  'This is an in-class or timed assessment where AI tools are not available.'
        },
        {
            title: 'Original Thinking Required',
            text:  'The learning objectives require you to develop your own original ideas.'
        }
    ], // Note: this text is used both on the selection card AND in the final
       // guide shown to learners, so it's written to address them as "you".

    // ── Pop-up shown after selecting "Open Use" ─────────────────────────────
    // Heading shown above these choices: "Why is open AI use permitted?"
    openUseRationales: [
        {
            title: 'Support Skill Development',
            text:  'AI tools may help you practice drafting, revising, brainstorming, or clarifying ideas while still demonstrating your own understanding.'
        },
        {
            title: 'Reflect Real-World Practice',
            text:  'AI tools are part of many academic, professional, and creative contexts. This assignment includes guided AI use to build responsible engagement skills.'
        },
        {
            title: 'Scaffold Complex Thinking',
            text:  'AI may support early-stage idea generation, organization, or exploration, allowing you to focus more deeply on analysis, synthesis, or application.'
        },
        {
            title: 'Accessibility & Equity Support',
            text:  'AI tools may offer you language clarification, idea rehearsal, or alternative explanations that support diversity.'
        },
        {
            title: 'Learner Agency & Choice',
            text:  'This assignment invites you to decide whether and how AI tools support your learning. You are encouraged to make intentional choices based on your goals, strengths, and areas for growth. You know your learning life best, and this policy honors your capacity to choose tools that align with your understanding of how you learn most effectively.'
        }
    ]
};
