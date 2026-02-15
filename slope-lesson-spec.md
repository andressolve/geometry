# Geometry Lesson: Slope

## Implementation Specification

---

## 1. Project Overview

Build a scroll-snapping educational web application where students discover that a line is built from a repeating step pattern, that the step pattern is the same everywhere on the line, and that the number describing the pattern — the slope — is what makes one line different from another.

**Folder:** `cartesian3_slope/`
**Title:** Slope
**Subtitle:** What makes a line a line.
**Lesson Number:** XIII

**Target:** Children who completed Lesson XII (understand that points on a line follow a rule like y = 2x or y = x + 1; can plot points; can read coordinates).

**Tone:** Discovery-based. The student constructs lines before analyzing them. They see the pattern before we name it. "Slope" is the last thing introduced, not the first.

**Prerequisites:** Coordinate plane (Lesson XI), equations of lines (Lesson XII).

**Key constraint:** No negative slopes. No fractions. No "rise over run." No y-intercept vocabulary. No slope-intercept form. We stay with positive integer slopes (1, 2, 3) and build intuition through construction and comparison.

---

## 2. Technical Stack

Same as `cartesian2_lines/`:

- **No build system** — vanilla HTML, CSS, JavaScript
- **Tailwind CSS via CDN**
- **STIX Two Text font**
- **HTML5 Canvas API** — for all diagrams
- **Modular JavaScript**

---

## 3. File Structure

```
cartesian3_slope/
├── index.html
├── styles.css
├── geometry-utils.js
├── diagrams.js
├── interactive.js
├── exercises.js
└── app.js
```

---

## 4. Page Structure (7 pages)

| Page | ID     | Title                          | Layout                          |
|------|--------|--------------------------------|---------------------------------|
| 0    | page-0 | Cover                          | Centered, gradient              |
| 1    | page-1 | Building a Line                | Interactive (full width)        |
| 2    | page-2 | What Line Did We Build?        | Table + diagram, interactive    |
| 3    | page-3 | Another Step                   | Animated build + interactive    |
| 4    | page-4 | What About y = x + 1?          | Diagram + interactive           |
| 5    | page-5 | Exercises                      | Full width                      |
| 6    | page-6 | Summary                        | Centered, gradient              |

---

## 5. Content & Visuals

### Page 0: Cover

- **Title:** Slope
- **Subtitle:** What makes a line a line.
- **Visual:** Three lines through the origin at different steepnesses (y = x, y = 2x, y = 3x), drawn cleanly on a subtle grid. No labels. Just the visual impression of three different steepnesses.

---

### Page 1: Building a Line (INTERACTIVE)

**Concept:** The student constructs a line by repeating a step. We observe that it makes a line. That's all — no equations yet.

**Setup text:**
> Start at the origin. We'll build something one step at a time.
>
> Each step goes 1 to the right and 2 up — like a knight's move.

**Interaction:**

A coordinate grid with a point at the origin (0, 0). A button labeled **"Step"**. Each time the student clicks it, the next point appears on the grid, connected to the previous one by a small right-angle step path (right 1, then up 2). The step path is drawn lightly — a horizontal segment, then a vertical segment — so the student can see the L-shaped step.

**Sequence of clicks:**
1. Click → point at (1, 2) appears, step path from (0,0) visible
2. Click → point at (2, 4), step path from (1,2)
3. Click → point at (3, 6), step path from (2,4)
4. Click → point at (4, 8), step path from (3,6)

After the fourth click, a brief pause, then the line extends through all the points (a straight line drawn through them).

**Reveal text:**
> Those points line up. The same step, repeated, makes a line.

That's it. No mention of y = 2x. No equations. Just the observation: repeating a step makes a line.

---

### Page 2: What Line Did We Build? (INTERACTIVE)

**Concept:** The student figures out the equation of the line they just built — the same way they found equations in Lesson XII. Then we place the step and the equation side by side, without commentary, and let the student notice the connection.

**Diagram:** The line from Page 1 with all its points, shown on a grid.

**Table (HTML, beside the diagram):**

| x | y |
|---|---|
| 0 | 0 |
| 1 | 2 |
| 2 | 4 |
| 3 | 6 |
| 4 | 8 |

**Text:**
> These are the points you built.
>
> What's the equation of this line?

**Input:** y = ___ x (number field). Answer: 2.

**On correct:**

The page now shows two things, visually side by side — no connecting sentence, no explanation:

- Left: a diagram of one step on the line, labeled **right 1, up 2**
- Right: the equation **y = 2x**

Below, simply:

> The step: right 1, up **2**. The equation: y = **2**x.

Nothing more. Don't explain the connection. Don't say "that's where the 2 comes from." Just put the two facts next to each other and move on.

---

### Page 3: Another Step (INTERACTIVE — multi-phase)

**Concept:** Repeat the process with a different step. The student sees the same coincidence a second time — step number matches equation number. Then we test whether they've caught on, with a prediction.

**Phase 1: Build**

**Text:**
> Another line. This time the step is right 1, up 3.

The line y = 3x is built on the grid, either auto-animated or with a few clicks (faster than Page 1 — the student has seen the mechanic).

Points appear: (0,0), (1,3), (2,6), (3,9). Step triangles visible. Line extends through them.

**Phase 2: Find the equation**

**Table:**

| x | y |
|---|---|
| 0 | 0 |
| 1 | 3 |
| 2 | 6 |
| 3 | 9 |

> What's the equation?

**Input:** y = ___ x (number field). Answer: 3.

**On correct:**

Same visual pairing as Page 2:

- The step: **right 1, up 3**
- The equation: **y = 3x**

> The step: right 1, up **3**. The equation: y = **3**x.

**Phase 3: Predict**

A pause. Then:

> One more. A line is built from a step that goes 1 to the right and 5 up.
>
> Without building it — what's the equation?

**Input:** y = ___ x (number field). Answer: 5.

**On correct:**

> y = 5x.

Then:

> The number in the step is the number in the equation. Every time.
>
> This number has a name.

**Definition box:**
> The **slope** of a line is how much y increases when x increases by 1.

Then:

> The line y = 2x has slope **2**. The line y = 3x has slope **3**. The line y = 5x has slope **5**.

**Phase 4: Reverse**

> Now the other direction. A line has equation y = 4x. What's the step?
>
> Right 1, up ___

**Input:** Number field. Answer: 4.

**On correct:**

> Right 1, up 4. The slope is **4**.
>
> If you know the equation, you know the step. If you know the step, you know the equation.

---

### Page 4: What About y = x + 1?

**Concept:** Everything so far has been lines through the origin — y = 2x, y = 3x. But the student already knows y = x + 1 from Lesson XII. Does it have a slope? This page extends the concept to lines that don't pass through the origin. The student figures out the slope themselves, then sees the connection.

**Diagram 1 (right side):** Two lines on the same grid:
- y = x (blue, through origin)
- y = x + 1 (green, through (0, 1))

Step triangles drawn on both lines: each shows right 1, up 1. Points visible on each.

**Text (left side):**
> So far, every line we've built has passed through the origin. But what about y = x + 1 from last lesson?

**Question:**
> What's the slope of y = x + 1?

**Input:** Number field. Answer: 1.

**On correct:**

> Slope 1 — same as y = x. The + 1 shifts the line up, but the step doesn't change.

**Diagram 2 (below):** Two more lines on the same grid:
- y = 2x (blue, through origin)
- y = 2x + 1 (green, through (0, 1))

Step triangles on both: right 1, up 2.

**Text:**
> y = 2x + 1 has slope 2 — same as y = 2x.
>
> The slope is the number multiplying x, whether or not the line passes through the origin.

---

## 6. Exercises

### Exercise 1: Read the Step

- **Visual:** A line on a grid with one step triangle drawn on it (right 1, up ?). The vertical leg is not labeled.
- **The line is y = 3x** (points (0,0), (1,3), (2,6) visible).
- **Question:** "What's the slope of this line?"
- **Input:** Number field.
- **Answer:** 3
- **On correct:** "Right. Each step goes up 3."

### Exercise 2: Match the Line

- **Visual:** Three lines on the same grid (y = x, y = 2x, y = 3x), each in a different color, labeled Line A, Line B, Line C.
- **Question:** "Which line has slope 2?"
- **Input:** Three buttons (A / B / C).
- **Answer:** B (y = 2x)
- **Follow-up:** "Which has the greatest slope?"
- **Answer:** C
- **On correct:** "Line C has slope 3 — it's the steepest."

### Exercise 3: Build from Slope

- **Setup:** "A line passes through the origin and has slope 2."
- **Question:** "Fill in the missing coordinates."
  - (0, 0) — given
  - (1, ___) — answer: 2
  - (2, ___) — answer: 4
  - (3, ___) — answer: 6
- **After correct:** Points appear on grid, line drawn through them.
- **Closing text:** "If you know the starting point and the slope, you can build the whole line."

### Exercise 4: Same Slope?

- **Visual:** Two lines on a grid:
  - Line A: y = 2x (through origin)
  - Line B: y = 2x + 3 (through (0, 3))
- **Question:** "Do these two lines have the same slope?"
- **Input:** Yes / No
- **Answer:** Yes
- **On correct:** "Both go up 2 for each step right. Same slope."
- **Follow-up:** "What is their slope?"
- **Input:** Number field
- **Answer:** 2

---

## 7. Summary (Page 6)

**Text (presented as a series of definition boxes, same style as Lesson XII):**

> The same step, repeated, makes a line.

> The **slope** is how much y increases when x increases by 1.

> A bigger slope means a steeper line.

> The slope is the number multiplying x — whether the line passes through the origin or not.

**Visual:** Two or three lines on a grid with their step triangles visible and slopes labeled. Clean and memorable.

**"Back to Lessons" button.**

---

## 8. Tone & Wording Guidelines

- **Construction before analysis** — the student builds lines, then we observe properties. Not the other way around.
- **The step is the central metaphor** — slope is introduced as the number in the step, not as a formula or ratio.
- **Name comes last** — the word "slope" doesn't appear until Page 3, after the student has already built lines, found equations, and predicted one correctly.
- **Show, don't tell** — when the step number matches the equation number, we place the two facts side by side and say nothing. The student connects them. We confirm only after they demonstrate understanding through prediction.
- **No jargon** — no rise, no run, no m, no b, no "slope-intercept form."
- **Positive integers only** — slopes of 1, 2, 3. No fractions, no zero, no negatives.
- **Prediction is the test of understanding** — before naming slope, the student predicts an equation from a step and a step from an equation. If they can do that, the concept is theirs.
- **Parallel lines hinted at, not named** — Page 5 shows lines with the same slope but different starts. We say "same slope" and "equally steep," but don't introduce the word "parallel" — that can come later.

---

## 9. Implementation Notes

### Canvas/Diagrams
- Reuse `geometry-utils.js` from `cartesian2_lines`
- Grid range: approximately xMin: −1, xMax: 6, yMin: −1, yMax: 10 (to fit y = 3x through (3, 9))
- Step triangles: draw with dashed or light lines — horizontal segment, then vertical segment, with small labels for the lengths
- Multiple lines on same grid: use distinct colors (e.g., blue, green, orange)

### Interactive Pages
- **Page 1:** "Step" button adds one point + step path at a time. After all points placed, line extends through them.
- **Page 2:** Student enters number in equation field after studying table. On correct, step diagram and equation appear side by side.
- **Page 3:** Multi-phase page. Phase 1: auto-animated line build. Phase 2: equation input. Phase 3: prediction input (step → equation). Phase 4: reverse prediction (equation → step). Phases revealed sequentially as student answers correctly.

### Main Index
- Add Lesson XIII card to `index.html` under Part II: Coordinate Geometry

---

## 10. Connections

- **Lesson IX** (Similar Triangles): The step triangles along a line are all similar — same ratio of sides. This connection is real but we don't call it out here.
- **Lesson XII** (Lines in the Plane): Direct prerequisite. We use y = 2x and y = x + 1 as familiar examples.
- **Future lessons:** This sets up negative slope, slope from two arbitrary points (the ratio), y-intercept, and eventually the full equation y = mx + b.
