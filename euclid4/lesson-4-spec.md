# Lesson 4: Angles in Action — Practice Session

## Overview

A hands-on practice session to solidify concepts from Lessons 1–3. No new theorems introduced — this is about applying what they know until it feels concrete and automatic.

**Target audience:** Francisco and Sebastian  
**Prerequisites:** Lessons 1–3 (angle basics, vertical angles, parallel lines + transversal, corresponding angles, alternate interior angles, co-interior angles)  
**Format:** Interactive HTML, single-page app with problem progression  
**Estimated duration:** 20–30 minutes

---

## Design Principles

- **Clean, minimal UI** — diagram is the star, text is sparse
- **Formal tone** — no "Great job!" or "Oops!" — just clear feedback
- **LaTeX-style fonts** — Computer Modern or STIX Two for that proper math feel
- **Immediate feedback** — submit answer, see if correct, see explanation if wrong
- **Progress indicator** — subtle bar or fraction showing completion (e.g., "7 / 15")
- **No time pressure** — this is practice, not a race

---

## Visual Style

### Typography
- **Headers:** STIX Two Text or Latin Modern, ~24px
- **Body/labels:** STIX Two Text, ~18px
- **Angle labels in diagrams:** italic, same font family

### Colors
- **Background:** warm off-white (#faf8f5)
- **Lines:** dark gray (#3d3d3d)
- **Parallel line markers:** subtle tick marks
- **Given angles:** soft coral fill (#e8a87c) with value displayed
- **Unknown angles:** soft blue fill (#7ca8e8) with "?" or variable
- **Correct answer:** muted green (#7cb87c)
- **Incorrect answer:** muted red (#c87c7c)

### Diagrams
- SVG-based, clean lines
- Points labeled with capital letters (A, B, C, ...)
- Angles labeled with lowercase Greek or x, y, z for unknowns
- Parallel lines marked with arrows (>>)
- Arc indicators for angles (small arc near vertex)

---

## Section 1: Warm-Up — Angle Recognition

**Purpose:** Confirm vocabulary is solid before moving to calculations.

### Problem 1.1: Identify Acute Angles
- Display 6 angles of varying sizes (e.g., 25°, 90°, 140°, 55°, 180°, 72°)
- Prompt: "Select all acute angles."
- User clicks to select, then submits
- Feedback: highlight correct selections in green, missed ones in blue, wrong selections in red

### Problem 1.2: Identify Obtuse Angles
- Display 6 different angles (e.g., 95°, 45°, 160°, 88°, 120°, 30°)
- Prompt: "Select all obtuse angles."
- Same interaction pattern

### Problem 1.3: Name the Angle
- Display a diagram with 4 points labeled (e.g., P, Q, R, S) forming intersecting lines
- Prompt: "Which angle is ∠PQR?"
- User clicks on the correct angle region
- If wrong, show which angle they selected and the correct one

### Problem 1.4: Name the Angle (variant)
- Different configuration, maybe three rays from a common point
- Prompt: "Click on ∠XYZ" (where Y is the vertex)

---

## Section 2: Vertical Angles

**Purpose:** Apply the vertical angles theorem.

### Problem 2.1: Direct Application
- Two lines intersect, forming 4 angles
- One angle labeled: 35°
- Prompt: "Find the measure of ∠ABC" (the vertical angle)
- Input: number field
- Answer: 35°

### Problem 2.2: Find All Four
- Two lines intersect
- One angle labeled: 52°
- Prompt: "Find all four angle measures."
- Input: four number fields (or click each angle to enter)
- Answers: 52°, 128°, 52°, 128°

### Problem 2.3: Algebraic
- Two lines intersect
- Adjacent angles labeled: x and (2x + 30)
- Prompt: "Find x."
- Input: number field
- Solution: x + (2x + 30) = 180 → 3x = 150 → x = 50
- Answer: 50

### Problem 2.4: Which Are Vertical?
- Show a more complex diagram: three lines through a point (6 angles)
- Prompt: "Select all pairs of vertical angles."
- User clicks pairs
- Tests understanding that vertical angles are specifically the ones across from each other through the vertex

---

## Section 3: Parallel Lines and Transversal

**Purpose:** Apply corresponding, alternate interior, and co-interior angle relationships.

### Problem 3.1: Corresponding Angles
- Two parallel lines cut by a transversal
- One angle labeled: 65° (top-left at upper intersection)
- Prompt: "Find the measure of ∠EFG" (corresponding angle at lower intersection)
- Answer: 65°

### Problem 3.2: Alternate Interior Angles
- Two parallel lines cut by a transversal
- One interior angle labeled: 110°
- Prompt: "Find the measure of the alternate interior angle."
- Answer: 110°

### Problem 3.3: Co-Interior Angles
- Two parallel lines cut by a transversal
- One interior angle labeled: 75°
- Prompt: "Find the measure of the co-interior angle (same-side interior)."
- Answer: 105° (since they sum to 180°)

### Problem 3.4: Mixed — Two Steps
- Two parallel lines, transversal
- Angle at top-right of upper intersection: 125°
- Prompt: "Find ∠PQR" (an angle at lower intersection, not directly corresponding)
- Requires: recognize corresponding or use vertical + corresponding
- Answer: depends on exact setup — e.g., 125° or 55°

### Problem 3.5: Identify the Relationship
- Two parallel lines, transversal, two angles highlighted
- Prompt: "What is the relationship between these angles?"
- Multiple choice: Corresponding / Alternate Interior / Co-Interior / Vertical / None
- Tests vocabulary, not calculation

### Problem 3.6: Are They Parallel?
- Two lines cut by a transversal (not stated whether parallel)
- Two angles labeled: e.g., 72° and 108° (co-interior positions)
- Prompt: "Are lines m and n parallel? Explain."
- Input: Yes/No toggle + short text field (or multiple choice for reasoning)
- Answer: Yes — co-interior angles sum to 180°

### Problem 3.7: Are They Parallel? (No)
- Two lines cut by a transversal
- Two angles labeled: e.g., 85° and 90° (alternate interior positions)
- Prompt: "Are lines p and q parallel?"
- Answer: No — alternate interior angles are not equal

---

## Section 4: Combined Challenges

**Purpose:** Chain multiple concepts. These require 2–3 steps of reasoning.

### Problem 4.1: Parallel Lines + Vertical Angles
- Two parallel lines cut by a transversal
- One angle at upper intersection labeled: 58°
- Prompt: "Find ∠XYZ" (which is vertical to a corresponding angle at lower intersection)
- Path: 58° → corresponding angle = 58° → vertical to that = 58°, OR 58° → vertical = 58° → corresponding = 58° (either path works)
- Could also ask for the supplementary one: answer would be 122°

### Problem 4.2: Multi-Step with Algebra
- Two parallel lines, transversal
- Angle A labeled: (3x - 10)°
- Angle B labeled: (2x + 20)° — and they are alternate interior angles
- Prompt: "Find the measure of ∠A."
- Solution: 3x - 10 = 2x + 20 → x = 30 → ∠A = 80°
- Answer: 80°

### Problem 4.3: Find All Angles
- Two parallel lines cut by a transversal, forming 8 angles
- One angle labeled: 47°
- Prompt: "Find all eight angle measures."
- Input: 8 fields (or interactive — click each to fill)
- Answers: 47°, 133°, 47°, 133° (top), 47°, 133°, 47°, 133° (bottom)

### Problem 4.4: The Gauntlet
- More complex: two parallel lines, two transversals creating more intersections
- One or two angles given
- Prompt: "Find ∠MNO."
- Requires tracing through multiple relationships
- This is the challenge problem — okay if they need to think

---

## Interaction & Feedback

### Input Types
- **Number field:** for angle measures (accepts integers, auto-adds ° symbol)
- **Click-to-select:** for identification problems (angles, pairs)
- **Multiple choice:** for relationship identification or yes/no with reasoning

### Feedback Model
- **Correct:** angle fills green, brief confirmation ("Correct"), move to next or show "Continue" button
- **Incorrect:** angle fills red, show "The answer is [X]" with one-line explanation (e.g., "Vertical angles are equal" or "Co-interior angles sum to 180°")
- **No "try again" loops** — show the answer and explanation, let them absorb it, move on
- Keep it matter-of-fact, not punitive or overly cheerful

### Progress
- Top of screen: "Problem 7 of 15" or subtle progress bar
- At end: summary showing which they got right/wrong, option to retry missed ones

---

## Technical Notes

### Fonts
Load STIX Two from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

### Diagrams
- All diagrams as inline SVG for crisp rendering and easy interaction
- Clickable regions defined with transparent overlay paths
- Angle arcs drawn with SVG arc commands
- Parallel markers as small chevrons (>>) on the lines

### Responsive
- Should work on tablet (likely how they'll use it)
- Minimum width ~768px assumed
- Diagrams scale proportionally

---

## Problem Count Summary

| Section | Problems |
|---------|----------|
| 1. Warm-Up | 4 |
| 2. Vertical Angles | 4 |
| 3. Parallel Lines | 7 |
| 4. Combined | 4 |
| **Total** | **19** |

---

## Open Questions

1. **Hint system?** Could offer optional hints on harder problems. Leaning no — keep it clean, show answer if wrong.

2. **Retry mode?** At end, offer to redo just the ones they missed? Probably yes.

3. **Randomization?** Could randomize angle values on retry so it's not memorization. Nice-to-have, not essential for v1.

---

## Next Steps

1. Review this spec — any adjustments?
2. Build the HTML/JS implementation
3. Test with Francisco and Sebastian
4. Iterate based on how it goes
