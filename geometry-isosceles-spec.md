# Geometry Lesson: Isosceles Triangles

## Implementation Specification

---

## 1. Project Overview

Build a scroll-snapping educational web application teaching the properties of isosceles triangles, culminating in a proof of the Isosceles Triangle Theorem (Base Angles Theorem) using SSS congruence.

**Target:** Children progressing toward two-column geometry proofs.

**Tone:** Formal, intellectual pursuit—not flashcards or educational games. Let the content speak for itself.

**Prerequisites:** Students have completed the lesson on congruence, including the SSS criterion.

---

## 2. Technical Stack

- **Framework:** React 19 (Single Page Application)
- **Styling:** Tailwind CSS
- **Graphics:** HTML5 Canvas API (for all geometric diagrams)
- **Typography:** STIX Two Text or Computer Modern (LaTeX-style serif). Fall back to Noto Serif if unavailable. Import via Google Fonts or self-host.
- **Icons:** Simple SVG icons for UI elements (arrows, navigation)

---

## 3. Design System & Aesthetics

### Typography

- **Global Font:** STIX Two Text or similar LaTeX-style serif. No sans-serif or rounded fonts.
- **Headings:** Bold Serif, Color `#6a82fb` (Primary Blue).
- **Body Text:** Serif, dark gray `#4b5563`, line-height 1.6–1.8 for readability.
- **Math Notation:** 
  - Variables in italic: *A*, *B*, *C*, *M*, *x*
  - Use proper symbols: ≅ (congruent), ∠ (angle), △ (triangle), ° (degree)
  - Render inline with surrounding text, same font family

### Layout

- **Scroll Behavior:** Vertical Scroll Snap (`scroll-snap-type: y mandatory`). Each section occupies 100vh.
- **Containers:** Section cards with white background, `border-radius: 20px`, subtle shadow (`box-shadow: 0 20px 40px rgba(0,0,0,0.05)`), centered in viewport.
- **Content Layout:** Text on left, diagram on right for concept pages. Full-width for exercises.
- **Navigation:** Small dots on the right edge indicating current section. Keyboard arrow support.

### Canvas / Diagram Style

- **Background:** White or very light cream (#fefefe).
- **Borders:** Subtle gray (`border-gray-200`) or borderless. No thick black frames.
- **Resolution:** Handle High-DPI displays using `window.devicePixelRatio`.
- **Colors:**
  - Lines/Points: `#333333`
  - Congruent parts highlighted with matching colors:
    - Legs (equal sides): `rgba(59, 130, 246, 0.6)` (blue) with single tick marks
    - Base angles: `rgba(239, 68, 68, 0.6)` (red) with matching arcs
    - Other pairs as needed: `rgba(16, 185, 129, 0.6)` (green)
  - Auxiliary lines (like AM to midpoint): lighter stroke, perhaps dashed or `#666666`

---

## 4. Geometric Rendering Rules (STRICT)

### Points & Lines

- Points rendered as filled circles, radius 4–6px.
- Points must **never** sit at the very tip of a ray or line. Lines extend past labeled points.
- Line thickness: 2–2.5px for main figures, 1.5px for construction/auxiliary lines.

### Label Positioning

- Labels (*A*, *B*, *C*, *M*) must be offset so they **never overlap** lines or angle arcs.
- Use intelligent placement based on geometry.
- Labels in italic serif, size 16–18px.

### Congruence Marks

- **Tick marks** for congruent segments: small perpendicular hash marks on the segment.
- **Arcs** for congruent angles: small curved arcs near the vertex.
- Consistent styling throughout the lesson.

### Diagram Cleanliness

- No generic labels like "Leg" or "Base" cluttering the canvas—use text content to explain.
- Keep diagrams focused on the geometry.

---

## 5. Mathematical Notation Standards

- Congruent segments: AB ≅ AC
- Congruent angles: ∠ABC ≅ ∠ACB
- Congruent triangles: △ABM ≅ △ACM
- Vertex-based angle names only—never ∠1 or ∠2

---

## 6. Page-by-Page Content

### Page 0: Cover

**Layout:** Centered title, subtitle, scroll hint.

**Content:**
- Title: "Isosceles Triangles"
- Subtitle: "Two equal sides. What follows?"
- Scroll hint: Bouncing down arrow with "Scroll to begin"

**Diagram:** A clean isosceles triangle with the two equal sides subtly highlighted (matching tick marks). Simple and elegant.

---

### Page 1: What is an Isosceles Triangle?

**Layout:** Text left, diagram right.

**Text Content:**

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

**Diagram:**

An isosceles triangle △ABC with:
- AB and AC as the legs (marked with single tick marks, labeled "Leg")
- BC as the base (labeled "Base")
- ∠BAC at the top labeled "Vertex angle"
- ∠ABC and ∠ACB at the bottom labeled "Base angles"

The triangle should be oriented with the vertex at the top, but add a note in the caption or show a second smaller triangle in a different orientation to reinforce that orientation doesn't matter.

Actually—per the rendering rules, don't put the labels "Leg" and "Base" on the canvas. Instead, use color coding:
- Legs in blue with tick marks
- Base in a neutral color (black)
- Vertex angle with one style of arc
- Base angles with matching arcs (different style from vertex angle)

Let the text explain which is which.

---

### Page 2: Comparing Triangle Types

**Layout:** Text left, diagram right.

**Text Content:**

> Triangles are classified by their sides:
>
> - **Scalene** — no sides equal
> - **Isosceles** — two sides equal
> - **Equilateral** — all three sides equal
>
> We focus on isosceles triangles in this lesson.

**Diagram:**

Three triangles side by side:
1. A scalene triangle (no tick marks, clearly unequal sides)
2. An isosceles triangle (two sides with matching tick marks)
3. An equilateral triangle (all three sides with matching tick marks)

Label each below: "Scalene," "Isosceles," "Equilateral."

Keep the diagram clean—just the three triangles with their tick marks, no clutter.

---

### Page 3: Discovery — The Base Angles

**Layout:** Text left, diagram right.

**Text Content:**

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

**Diagram:**

An isosceles triangle with:
- The two legs marked congruent (tick marks)
- The two base angles marked congruent (matching arcs)
- Angle measures displayed: e.g., vertex angle 50°, base angles both 65°

Perhaps show two or three isosceles triangles of different proportions (one tall/narrow, one short/wide) all with their base angles marked equal—demonstrating the pattern holds regardless of shape.

---

### Page 4: The Question

**Layout:** Text centered or left, minimal or no diagram.

**Text Content:**

> We can see that the base angles are equal.
>
> But *why* must it be so?
>
> Geometry is not about observation—it's about proof. We need to show that equal legs *logically force* equal base angles.
>
> The tool we'll use: **SSS congruence**, from the previous lesson.

**Diagram:**

Optional: a simple isosceles triangle with a question mark near the base angles, or no diagram at all. This is a transitional "pause and think" page.

---

### Page 5: The Proof

**Layout:** Text left, diagram right. This is the heart of the lesson.

**Text Content:**

> **Theorem:** If two sides of a triangle are congruent, then the angles opposite those sides are congruent.
>
> **Given:** △ABC with AB ≅ AC.
>
> **Prove:** ∠ABC ≅ ∠ACB.
>
> **Proof:**
>
> Let M be the midpoint of BC.
>
> Draw segment AM. This divides △ABC into two smaller triangles: △ABM and △ACM.
>
> We show these triangles are congruent:
>
> - AB ≅ AC (given)
> - BM ≅ CM (M is the midpoint of BC)
> - AM ≅ AM (shared side)
>
> By SSS, △ABM ≅ △ACM.
>
> Since the triangles are congruent, their corresponding parts are congruent. In particular:
>
> ∠ABM ≅ ∠ACM
>
> These are the base angles. **QED.**

**Diagram:**

A carefully constructed diagram showing:
- △ABC with A at top, B at bottom-left, C at bottom-right
- AB and AC marked congruent (single tick marks, blue)
- M marked as the midpoint of BC
- Segment AM drawn (perhaps as a dashed or lighter line to show it's a construction)
- BM and CM marked congruent (double tick marks, green)
- The two triangles △ABM and △ACM visually distinguishable (perhaps light shading in different colors)
- Base angles ∠ABM and ∠ACM marked with matching arcs (red)

The diagram should make the proof visually obvious: you can see the two congruent triangles and their corresponding parts.

---

### Page 6: The Converse

**Layout:** Text left, small diagram right.

**Text Content:**

> The converse is also true:
>
> *If two angles of a triangle are congruent, then the sides opposite those angles are congruent.*
>
> So equal sides imply equal angles, and equal angles imply equal sides. The relationship goes both ways.
>
> We won't prove the converse here, but it follows from similar reasoning.

**Diagram:**

An isosceles triangle with the two base angles marked congruent (arcs), and the two legs marked congruent (tick marks). Arrows or visual suggestion that the implication goes both ways.

Keep it simple—this is just a brief note, not a full development.

---

### Page 7: Exercises

**Layout:** Full-width. Exercise problems with diagrams.

**Text Content:**

> **Apply the Isosceles Triangle Theorem.**

---

**Exercise 1:**

Diagram: An isosceles triangle with vertex angle labeled 40°. Base angles unlabeled.

Question: "The vertex angle of an isosceles triangle measures 40°. Find the measure of each base angle."

Expected answer: The three angles sum to 180°. So 40° + 2x = 180°, giving x = 70°. Each base angle measures 70°.

---

**Exercise 2:**

Diagram: An isosceles triangle with base angles each labeled 65°. Vertex angle unlabeled.

Question: "Each base angle of an isosceles triangle measures 65°. Find the vertex angle."

Expected answer: 65° + 65° + x = 180°, so x = 50°. The vertex angle measures 50°.

---

**Exercise 3:**

Diagram: A triangle with angles labeled 50°, 50°, and 80°.

Question: "A triangle has angles measuring 50°, 50°, and 80°. Is it isosceles? If so, which sides are the legs?"

Expected answer: Yes, it is isosceles. The two 50° angles are equal, so the sides *opposite* those angles are the legs (they are congruent). The side opposite the 80° angle is the base.

---

**Exercise 4:**

Diagram: An isosceles triangle with one base angle labeled (2x + 10)° and the other base angle labeled (3x − 5)°.

Question: "Find the value of x."

Expected answer: By the Isosceles Triangle Theorem, the base angles are equal. So 2x + 10 = 3x − 5, giving x = 15.

(Check: base angles are 2(15) + 10 = 40° and 3(15) − 5 = 40°. ✓)

---

### Page 8: Summary

**Layout:** Centered, clean summary.

**Text Content:**

> An **isosceles triangle** has two equal sides (legs) and a third side (base).
>
> **Isosceles Triangle Theorem:** If two sides of a triangle are congruent, then the angles opposite those sides are congruent.
>
> **Proof method:** Draw a segment from the vertex to the midpoint of the base. Use SSS to prove the two resulting triangles are congruent. The base angles are corresponding parts.
>
> **Converse:** If two angles are congruent, the opposite sides are congruent.

---

## 7. Interaction & Navigation

### Scroll Behavior

- `scroll-snap-type: y mandatory` on the main container
- Each section: `scroll-snap-align: start`, `min-height: 100vh`
- Smooth scrolling enabled

### Navigation Dots

- Fixed position on right side of viewport
- One dot per section (9 total: cover + 8 content pages)
- Current section highlighted
- Clicking a dot scrolls to that section

### Keyboard Support

- Arrow Down / Space / Page Down: Next section
- Arrow Up / Page Up: Previous section
- Home: First section
- End: Last section

### Exercise Interaction

- Each exercise has a "Show Answer" button or expandable reveal
- Answer hidden by default
- Simple toggle—no complex input validation

---

## 8. File Structure

```
isosceles-lesson/
├── index.html
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Section.jsx
│   │   ├── NavDots.jsx
│   │   ├── DiagramCanvas.jsx
│   │   └── Exercise.jsx
│   ├── diagrams/
│   │   ├── coverDiagram.js
│   │   ├── isoscelesLabeled.js
│   │   ├── triangleTypes.js
│   │   ├── baseAnglesDiscovery.js
│   │   ├── proofDiagram.js
│   │   ├── converseDiagram.js
│   │   └── exerciseDiagrams.js
│   └── styles/
│       └── main.css
├── tailwind.config.js
└── package.json
```

---

## 9. Canvas Rendering Utilities

Use the same helper functions from the Congruence lesson:

```javascript
// Draw a point with label
function drawPoint(ctx, x, y, label, offsetX = 10, offsetY = -10) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#333';
  ctx.fill();
  
  ctx.font = 'italic 16px "STIX Two Text", serif';
  ctx.fillText(label, x + offsetX, y + offsetY);
}

// Draw tick marks on a segment
function drawTickMarks(ctx, x1, y1, x2, y2, count = 1) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  
  const perpX = -dy / len;
  const perpY = dx / len;
  
  const tickLen = 8;
  const spacing = 6;
  
  for (let i = 0; i < count; i++) {
    const offset = (i - (count - 1) / 2) * spacing;
    const cx = midX + (dx / len) * offset;
    const cy = midY + (dy / len) * offset;
    
    ctx.beginPath();
    ctx.moveTo(cx - perpX * tickLen, cy - perpY * tickLen);
    ctx.lineTo(cx + perpX * tickLen, cy + perpY * tickLen);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// Draw angle arc
function drawAngleArc(ctx, vertex, ray1End, ray2End, radius = 25, count = 1) {
  const angle1 = Math.atan2(ray1End.y - vertex.y, ray1End.x - vertex.x);
  const angle2 = Math.atan2(ray2End.y - vertex.y, ray2End.x - vertex.x);
  
  for (let i = 0; i < count; i++) {
    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, radius + i * 5, angle1, angle2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

// Draw a line segment
function drawSegment(ctx, x1, y1, x2, y2, color = '#333', width = 2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

// Draw dashed line (for constructions like AM)
function drawDashedSegment(ctx, x1, y1, x2, y2, color = '#666', width = 1.5) {
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.setLineDash([]);
}
```

---

## 10. Key Diagram: The Proof (Page 5)

This is the most important diagram. Detailed specifications:

**Triangle Setup:**
- A at top center: approximately (300, 80)
- B at bottom left: approximately (150, 320)
- C at bottom right: approximately (450, 320)
- M at midpoint of BC: (300, 320)

**Elements to draw:**
1. Triangle ABC with vertices labeled
2. Segment AM (dashed, lighter color)
3. Tick marks on AB and AC (single tick, blue highlight)
4. Tick marks on BM and CM (double tick, green highlight)
5. Angle arcs on ∠ABM and ∠ACM (matching arcs, red highlight)
6. Point M labeled

**Visual emphasis:**
- The two sub-triangles (ABM and ACM) could have subtle background shading in different colors to make them visually distinct
- Or simply rely on the congruence marks to tell the story

**Label positions:**
- A: above the point
- B: below and to the left
- C: below and to the right
- M: below the point (on the base line)

---

## 11. Responsive Considerations

- Minimum viewport width: 768px (tablet)
- On smaller screens, stack text above diagram
- Diagrams scale proportionally
- Font sizes remain readable (minimum 16px body text)

---

## 12. Accessibility

- All diagrams have descriptive `aria-label` attributes
- Navigation dots are keyboard-focusable
- Sufficient color contrast (WCAG AA)
- Don't rely solely on color—use tick marks and arcs as primary indicators

---

## 13. Summary of Key Points for Implementation

1. **LaTeX-style fonts** — STIX Two Text, formal tone
2. **The proof diagram is central** — get this right and the lesson works
3. **Vertex-based angle labels** — ∠ABC, ∠ACM, never numbered
4. **Tick marks and arcs** — standard notation for congruence
5. **Dashed line for construction** — AM should look like an added construction, not part of the original triangle
6. **Color coding for corresponding parts** — legs in blue, half-bases in green, base angles in red
7. **Exercises reinforce the theorem** — angle calculations and identifying isosceles triangles
8. **Converse stated but not proved** — just a brief mention
9. **Scroll-snap navigation** — each section is one viewport height
10. **Clean, uncluttered diagrams** — let the geometry speak

---

*End of specification.*
