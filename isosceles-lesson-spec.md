# Geometry Lesson: Isosceles Triangles

## Implementation Specification (Revised)

---

## 1. Project Overview

Build a scroll-snapping educational web application teaching the properties of isosceles triangles, culminating in a proof of the Isosceles Triangle Theorem (Base Angles Theorem) using SSS congruence.

**Target:** Children progressing toward two-column geometry proofs.

**Tone:** Formal, intellectual pursuit—not flashcards or educational games. Let the content speak for itself.

**Prerequisites:** Students have completed the congruence lesson (Lesson 5), including the SSS criterion.

---

## 2. Technical Stack

Follow the same pattern as `euclid3` and `euclid5_congruent`:

- **No build system** — vanilla HTML, CSS, JavaScript
- **Tailwind CSS via CDN** — `<script src="https://cdn.tailwindcss.com"></script>`
- **STIX Two Text font** — Google Fonts import
- **HTML5 Canvas API** — all geometric diagrams
- **Modular JavaScript** — separate files for concerns

---

## 3. File Structure

```
euclid6_isosceles/
├── index.html          # Main HTML with all section markup
├── styles.css          # Custom styles (extends Tailwind)
├── geometry-utils.js   # Shared drawing utilities
├── diagrams.js         # All diagram drawing functions
├── exercises.js        # Exercise logic and checking
└── app.js              # Navigation, scroll tracking, initialization
```

---

## 4. Page Structure (9 sections)

| Page | ID       | Title                        | Layout              |
|------|----------|------------------------------|---------------------|
| 0    | page-0   | Cover                        | Centered, gradient  |
| 1    | page-1   | What is an Isosceles Triangle? | Text left, diagram right |
| 2    | page-2   | Comparing Triangle Types     | Text left, diagram right |
| 3    | page-3   | Discovery — The Base Angles  | Text left, diagram right |
| 4    | page-4   | The Question                 | Centered text, minimal diagram |
| 5    | page-5   | The Proof                    | Text left, diagram right |
| 6    | page-6   | The Converse                 | Text left, diagram right |
| 7    | page-7   | Exercises                    | Full width, grid layout |
| 8    | page-8   | Summary                      | Centered, gradient  |

---

## 5. HTML Structure

Follow the pattern from `euclid5_congruent/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson 6: Isosceles Triangles</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Main scroll container -->
    <div id="scroll-container" class="h-screen overflow-y-scroll snap-y snap-mandatory">

        <!-- Page 0: Cover -->
        <section id="page-0" class="snap-section bg-gradient-to-br from-blue-50 to-indigo-50">
            <!-- Content -->
        </section>

        <!-- Page 1: What is an Isosceles Triangle? -->
        <section id="page-1" class="snap-section">
            <div class="section-card section-card-wide">
                <div class="flex flex-col lg:flex-row gap-8 items-center">
                    <div class="lg:w-1/2">
                        <!-- Text content -->
                    </div>
                    <div class="lg:w-1/2 flex justify-center">
                        <canvas id="canvas-page1" class="diagram-canvas" width="400" height="300"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <!-- ... more sections ... -->

    </div>

    <!-- Navigation Dots -->
    <nav id="nav-dots" class="nav-dots"></nav>

    <!-- Scripts (order matters) -->
    <script src="geometry-utils.js"></script>
    <script src="diagrams.js"></script>
    <script src="exercises.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

---

## 6. CSS Patterns (styles.css)

Use the same CSS structure as `euclid3/styles.css` and `euclid5_congruent/styles.css`:

```css
/* Global Font */
* {
    font-family: 'STIX Two Text', serif;
}

html, body {
    height: 100%;
    overflow: hidden;
}

/* Scroll Snap Sections */
.snap-section {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

/* Section Cards */
.section-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
    max-width: 900px;
    width: 100%;
    padding: 3rem;
}

.section-card-wide {
    max-width: 1000px;
}

/* Typography */
.heading-primary {
    color: #6a82fb;
    font-weight: 700;
}

.body-text {
    color: #4b5563;
    line-height: 1.8;
}

/* Definition, Theorem Boxes */
.definition-box {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.25rem;
    background: #fafafa;
}

.theorem-box {
    border: 2px solid #6a82fb;
    border-radius: 12px;
    padding: 1.5rem;
    background: rgba(106, 130, 251, 0.05);
}

/* Proof Table (two-column format) */
.proof-table { /* ... */ }
.proof-header { /* ... */ }
.proof-step { /* ... */ }
.proof-statement { /* ... */ }
.proof-reason { /* ... */ }
.proof-qed { /* ... */ }

/* Canvas */
.diagram-canvas {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: white;
    max-width: 100%;
}

/* Navigation Dots */
.nav-dots {
    position: fixed;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 100;
}

.nav-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d1d5db;
    cursor: pointer;
    transition: all 0.3s;
    border: none;
}

.nav-dot.active {
    background: #6a82fb;
    transform: scale(1.3);
}

/* Bounce animation for scroll hint */
.bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}
```

---

## 7. JavaScript Modules

### 7.1 geometry-utils.js

Extend the utilities from `euclid5_congruent/geometry-utils.js`. Key functions:

```javascript
// Canvas setup for high-DPI
function setupCanvas(canvas, width, height) { ... }
function clearCanvas(ctx, width, height) { ... }

// Color constants
const Colors = {
    pair1: { fill: 'rgba(59, 130, 246, 0.3)', stroke: 'rgb(59, 130, 246)' },   // blue
    pair2: { fill: 'rgba(239, 68, 68, 0.3)', stroke: 'rgb(239, 68, 68)' },     // red
    pair3: { fill: 'rgba(16, 185, 129, 0.3)', stroke: 'rgb(16, 185, 129)' }    // green
};

const GeometryUtils = {
    // Draw a point with optional label
    drawPoint(ctx, x, y, label, offsetX, offsetY, size = 4) { ... },

    // Draw a line segment
    drawSegment(ctx, p1, p2, color = '#333', width = 2) { ... },

    // Draw a dashed segment (for constructions like AM)
    drawDashedSegment(ctx, p1, p2, color = '#666', width = 1.5) { ... },

    // Draw a triangle
    drawTriangle(ctx, A, B, C) { ... },

    // Draw tick marks on a segment (for congruence)
    drawTickMarks(ctx, x1, y1, x2, y2, count = 1, color = '#333') { ... },

    // Draw angle arc (for congruent angles)
    drawAngleArc(ctx, vertex, p1, p2, radius = 25, count = 1, color = '#333') { ... },

    // Calculate midpoint
    midpoint(p1, p2) { ... },

    // Calculate distance
    distance(p1, p2) { ... }
};
```

### 7.2 diagrams.js

Follow the pattern from `euclid5_congruent/diagrams.js`:

```javascript
const Diagrams = {
    // Page 0: Cover - simple isosceles triangle with tick marks
    drawCover(canvas) {
        const width = 500, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Isosceles triangle with vertex at top
        const A = { x: 250, y: 50 };   // vertex
        const B = { x: 120, y: 220 };  // base left
        const C = { x: 380, y: 220 };  // base right

        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Mark the two equal legs (AB ≅ AC)
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Labels
        ctx.fillStyle = '#333333';
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', 0, -12);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -14, 14);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 14, 14);
    },

    // Page 1: Isosceles definition with labels
    drawPage1(canvas) { ... },

    // Page 2: Three triangle types (scalene, isosceles, equilateral)
    drawPage2(canvas) { ... },

    // Page 3: Discovery - base angles pattern
    drawPage3(canvas) { ... },

    // Page 4: The question (minimal diagram)
    drawPage4(canvas) { ... },

    // Page 5: THE PROOF - most important diagram
    drawPage5(canvas) {
        const width = 450, height = 350;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Triangle ABC with A at top
        const A = { x: 225, y: 50 };
        const B = { x: 100, y: 280 };
        const C = { x: 350, y: 280 };
        const M = GeometryUtils.midpoint(B, C); // midpoint of BC

        // Draw main triangle
        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Draw construction line AM (dashed)
        GeometryUtils.drawDashedSegment(ctx, A, M, '#666', 1.5);

        // Mark congruent parts:
        // AB ≅ AC (legs) - single tick, blue
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // BM ≅ CM (half-bases) - double tick, green
        GeometryUtils.drawTickMarks(ctx, B.x, B.y, M.x, M.y, 2, Colors.pair3.stroke);
        GeometryUtils.drawTickMarks(ctx, M.x, M.y, C.x, C.y, 2, Colors.pair3.stroke);

        // Base angles ∠ABM ≅ ∠ACM - arcs, red
        GeometryUtils.drawAngleArc(ctx, B, A, M, 25, 1, Colors.pair2.stroke);
        GeometryUtils.drawAngleArc(ctx, C, M, A, 25, 1, Colors.pair2.stroke);

        // Labels
        ctx.fillStyle = '#333333';
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', 0, -14);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -14, 14);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 14, 14);
        GeometryUtils.drawPoint(ctx, M.x, M.y, 'M', 0, 18);
    },

    // Page 6: Converse
    drawPage6(canvas) { ... },

    // Exercise diagrams
    drawExercise1(canvas) { ... },
    drawExercise2(canvas) { ... },
    drawExercise3(canvas) { ... },
    drawExercise4(canvas) { ... }
};
```

### 7.3 exercises.js

Follow the pattern from `euclid5_congruent/exercises.js`:

```javascript
const Exercises = {
    // Exercise 1: Find base angles given vertex angle
    exercise1: {
        correctAnswer: 'b',  // 70° each
        checked: false,
        init() { ... },
        check() { ... }
    },

    // Exercise 2: Find vertex angle given base angles
    exercise2: {
        correctAnswer: 'a',  // 50°
        checked: false,
        init() { ... },
        check() { ... }
    },

    // Exercise 3: Identify if triangle is isosceles
    exercise3: {
        correctAnswer: 'b',  // yes
        checked: false,
        init() { ... },
        check() { ... }
    },

    // Exercise 4: Algebraic - find x
    exercise4: {
        correctAnswer: '15',
        checked: false,
        init() { ... },
        check() { ... }
    },

    init() {
        this.exercise1.init();
        this.exercise2.init();
        this.exercise3.init();
        this.exercise4.init();
    }
};
```

### 7.4 app.js

Follow the pattern from `euclid5_congruent/app.js`:

```javascript
const App = {
    totalPages: 9,  // Pages 0-8
    currentPage: 0,

    initNavDots() { ... },
    updateNavDots(pageIndex) { ... },
    goToPage(pageIndex) { ... },
    initScrollTracking() { ... },
    initCanvases() {
        const canvasMap = {
            'canvas-cover': () => Diagrams.drawCover(document.getElementById('canvas-cover')),
            'canvas-page1': () => Diagrams.drawPage1(document.getElementById('canvas-page1')),
            'canvas-page2': () => Diagrams.drawPage2(document.getElementById('canvas-page2')),
            'canvas-page3': () => Diagrams.drawPage3(document.getElementById('canvas-page3')),
            'canvas-page4': () => Diagrams.drawPage4(document.getElementById('canvas-page4')),
            'canvas-page5': () => Diagrams.drawPage5(document.getElementById('canvas-page5')),
            'canvas-page6': () => Diagrams.drawPage6(document.getElementById('canvas-page6')),
            'canvas-ex1': () => Diagrams.drawExercise1(document.getElementById('canvas-ex1')),
            'canvas-ex2': () => Diagrams.drawExercise2(document.getElementById('canvas-ex2')),
            'canvas-ex3': () => Diagrams.drawExercise3(document.getElementById('canvas-ex3')),
            'canvas-ex4': () => Diagrams.drawExercise4(document.getElementById('canvas-ex4'))
        };

        Object.entries(canvasMap).forEach(([id, drawFn]) => {
            const canvas = document.getElementById(id);
            if (canvas) {
                try { drawFn(); } catch (e) { console.error(`Error drawing ${id}:`, e); }
            }
        });
    },
    initKeyboardNav() { ... },
    initResizeHandler() { ... },
    init() {
        this.initNavDots();
        this.initScrollTracking();
        this.initCanvases();
        this.initKeyboardNav();
        this.initResizeHandler();
        if (typeof Exercises !== 'undefined') Exercises.init();
        console.log('Lesson 6: Isosceles Triangles initialized');
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
```

---

## 8. Page-by-Page Content

### Page 0: Cover

```html
<section id="page-0" class="snap-section bg-gradient-to-br from-blue-50 to-indigo-50">
    <div class="text-center">
        <h1 class="text-5xl md:text-6xl heading-primary mb-4">Isosceles Triangles</h1>
        <p class="text-2xl md:text-3xl text-gray-500 italic mb-2">Two equal sides. What follows?</p>
        <p class="text-lg text-gray-400">Lesson VI</p>
        <div class="mt-12 flex justify-center">
            <canvas id="canvas-cover" class="diagram-canvas" width="500" height="280"></canvas>
        </div>
        <div class="mt-12 bounce">
            <svg class="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <p class="text-sm text-gray-400 mt-2">Scroll to begin</p>
        </div>
    </div>
</section>
```

**Diagram:** A clean isosceles triangle with the two equal sides marked with single tick marks.

---

### Page 1: What is an Isosceles Triangle?

**Text content:**

> An **isosceles triangle** is a triangle with two sides of equal length.
>
> The parts have names:
>
> - **Legs** — the two equal sides
> - **Base** — the third side
> - **Vertex angle** — the angle between the two legs
> - **Base angles** — the two angles at the ends of the base
>
> Note: The "base" doesn't have to be at the bottom. It's simply the name for the side that's different from the two equal legs.

**Diagram:** Isosceles triangle with:
- Legs marked with blue tick marks
- Vertex angle marked with one arc style
- Base angles marked with matching arcs (different style)
- Points labeled A (top), B (bottom-left), C (bottom-right)

---

### Page 2: Comparing Triangle Types

**Text content:**

> Triangles are classified by their sides:
>
> - **Scalene** — no sides equal
> - **Isosceles** — two sides equal
> - **Equilateral** — all three sides equal
>
> We focus on isosceles triangles in this lesson.

**Diagram:** Three triangles side by side:
1. Scalene (no tick marks)
2. Isosceles (two sides with single tick marks)
3. Equilateral (all sides with single tick marks)

Labels below each: "Scalene," "Isosceles," "Equilateral"

---

### Page 3: Discovery — The Base Angles

**Text content:**

> Look at an isosceles triangle. The two legs are equal—that's the definition.
>
> But look at the base angles.
>
> They're equal too.
>
> This isn't a coincidence. No matter how you draw an isosceles triangle—tall and narrow, short and wide—if the legs are equal, the base angles are equal.
>
> This is the **Isosceles Triangle Theorem**:
>
> *If two sides of a triangle are congruent, then the angles opposite those sides are congruent.*

**Diagram:** One or more isosceles triangles showing:
- Legs marked congruent (tick marks)
- Base angles marked congruent (matching arcs)
- Possibly angle measures shown (e.g., 65°, 65°)

---

### Page 4: The Question

**Text content:**

> We can see that the base angles are equal.
>
> But *why* must it be so?
>
> Geometry is not about observation—it's about proof. We need to show that equal legs *logically force* equal base angles.
>
> The tool we'll use: **SSS congruence**, from the previous lesson.

**Diagram:** Simple isosceles triangle with a question mark near the base angles, or no diagram at all. This is a transitional "pause and think" page.

---

### Page 5: The Proof (CORE PAGE)

**Layout:** Text left, diagram right.

**Text content:**

Use the `proof-table` CSS pattern from `euclid3`:

```html
<div class="theorem-box mb-4">
    <p class="body-text">
        <strong>Theorem:</strong> If two sides of a triangle are congruent, then the angles opposite those sides are congruent.
    </p>
</div>

<div class="proof-given mb-2">
    <strong>Given:</strong> △ABC with AB ≅ AC.
</div>
<div class="proof-prove mb-4">
    <strong>Prove:</strong> ∠ABC ≅ ∠ACB.
</div>

<div class="proof-table">
    <div class="proof-header">
        <div>Statement</div>
        <div>Reason</div>
    </div>
    <div class="proof-step">
        <div class="proof-statement">1. Let M be the midpoint of BC.</div>
        <div class="proof-reason">Construction</div>
    </div>
    <div class="proof-step">
        <div class="proof-statement">2. AB ≅ AC</div>
        <div class="proof-reason">Given</div>
    </div>
    <div class="proof-step">
        <div class="proof-statement">3. BM ≅ CM</div>
        <div class="proof-reason">Definition of midpoint</div>
    </div>
    <div class="proof-step">
        <div class="proof-statement">4. AM ≅ AM</div>
        <div class="proof-reason">Reflexive property</div>
    </div>
    <div class="proof-step">
        <div class="proof-statement">5. △ABM ≅ △ACM</div>
        <div class="proof-reason">SSS</div>
    </div>
    <div class="proof-step">
        <div class="proof-statement">6. ∠ABM ≅ ∠ACM</div>
        <div class="proof-reason">Corresponding parts of congruent triangles</div>
    </div>
    <div class="proof-qed">∎</div>
</div>
```

**Diagram (critical):**
- Triangle ABC with A at top, B at bottom-left, C at bottom-right
- M marked as midpoint of BC
- Segment AM drawn as dashed line (construction)
- Tick marks: AB ≅ AC (single, blue), BM ≅ CM (double, green)
- Angle arcs: ∠ABM and ∠ACM marked (red)
- All points labeled

---

### Page 6: The Converse

**Text content:**

> The converse is also true:
>
> *If two angles of a triangle are congruent, then the sides opposite those angles are congruent.*
>
> So equal sides imply equal angles, and equal angles imply equal sides. The relationship goes both ways.
>
> We won't prove the converse here, but it follows from similar reasoning.

**Diagram:** Isosceles triangle with base angles marked congruent (arcs) and legs marked congruent (tick marks). Visual suggestion that the implication goes both ways.

---

### Page 7: Exercises

**Layout:** Full width, 2x2 grid of exercises.

**Exercise 1:**
- Diagram: Isosceles triangle with vertex angle 40°
- Question: "The vertex angle of an isosceles triangle measures 40°. Find the measure of each base angle."
- Answer: 70° (since 40° + 2x = 180°, x = 70°)

**Exercise 2:**
- Diagram: Isosceles triangle with base angles each 65°
- Question: "Each base angle of an isosceles triangle measures 65°. Find the vertex angle."
- Answer: 50° (since 65° + 65° + x = 180°, x = 50°)

**Exercise 3:**
- Diagram: Triangle with angles 50°, 50°, 80°
- Question: "A triangle has angles measuring 50°, 50°, and 80°. Is it isosceles? If so, which sides are the legs?"
- Answer: Yes, the sides opposite the 50° angles are the legs.

**Exercise 4:**
- Diagram: Isosceles triangle with base angles (2x + 10)° and (3x − 5)°
- Question: "Find the value of x."
- Answer: x = 15 (since 2x + 10 = 3x − 5, x = 15)

---

### Page 8: Summary

```html
<section id="page-8" class="snap-section bg-gradient-to-br from-indigo-50 to-blue-50">
    <div class="section-card max-w-2xl">
        <h2 class="text-3xl heading-primary mb-6 text-center">Summary</h2>

        <div class="definition-box mb-4">
            <p class="body-text">
                An <strong>isosceles triangle</strong> has two equal sides (legs) and a third side (base).
            </p>
        </div>

        <div class="theorem-box mb-4">
            <p class="body-text">
                <strong>Isosceles Triangle Theorem:</strong> If two sides of a triangle are congruent, then the angles opposite those sides are congruent.
            </p>
        </div>

        <p class="body-text mb-4">
            <strong>Proof method:</strong> Draw a segment from the vertex to the midpoint of the base. Use SSS to prove the two resulting triangles are congruent. The base angles are corresponding parts.
        </p>

        <p class="body-text mb-4">
            <strong>Converse:</strong> If two angles are congruent, the opposite sides are congruent.
        </p>

        <p class="body-text text-gray-500 italic text-center">
            Next: More triangle congruence criteria (SAS, ASA) and their applications.
        </p>
    </div>
</section>
```

---

## 9. Diagram Color Conventions

Match the color scheme from `euclid5_congruent`:

```javascript
const Colors = {
    pair1: { fill: 'rgba(59, 130, 246, 0.3)', stroke: 'rgb(59, 130, 246)' },   // Blue - legs
    pair2: { fill: 'rgba(239, 68, 68, 0.3)', stroke: 'rgb(239, 68, 68)' },     // Red - base angles
    pair3: { fill: 'rgba(16, 185, 129, 0.3)', stroke: 'rgb(16, 185, 129)' }    // Green - half-bases
};
```

For the proof diagram (Page 5):
- **Legs (AB, AC):** Blue tick marks (single)
- **Half-bases (BM, CM):** Green tick marks (double)
- **Base angles (∠ABM, ∠ACM):** Red arcs
- **Construction line (AM):** Dashed gray

---

## 10. Mathematical Notation

Use standard symbols inline in HTML:

- Congruent: `≅` (use HTML entity or literal)
- Angle: `∠`
- Triangle: `△`
- Degrees: `°`

Wrap variable names in `<em>` tags for italics:

```html
∠<em>ABC</em> ≅ ∠<em>ACB</em>
```

---

## 11. Key Implementation Notes

1. **Copy `geometry-utils.js`** from `euclid5_congruent` as a starting point. Add any new utilities needed (like `midpoint()`).

2. **The proof diagram is central.** Spend time getting the coordinates and marks right. Ensure:
   - The dashed construction line AM is visually distinct
   - Tick marks are clearly positioned
   - Angle arcs don't overlap with other elements
   - Labels are offset to avoid line intersections

3. **Follow the exercise pattern** from `euclid5_congruent/exercises.js` — radio buttons, check button, feedback reveal.

4. **Test scroll-snap behavior** in multiple browsers.

5. **Use `section-card-wide`** for pages with side-by-side text/diagram layouts.

---

## 12. Summary of Key Differences from Original Spec

| Original Spec | Revised Spec |
|---------------|--------------|
| React 19 SPA | Vanilla JS (no framework) |
| Tailwind build system | Tailwind CDN |
| JSX components | Plain HTML sections |
| Component files (Section.jsx, etc.) | Single index.html |
| Complex file structure | Simple 6-file structure |
| STIX Two Text + fallbacks | STIX Two Text via Google Fonts |

The educational content remains the same—only the implementation approach matches the existing lessons.

---

*End of specification.*
