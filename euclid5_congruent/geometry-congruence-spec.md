# Geometry Lesson: Congruence in Geometry

## Implementation Specification

---

## 1. Project Overview

Build a scroll-snapping educational web application introducing the concept of congruence in geometry. This lesson establishes the vocabulary and notation for congruent segments, angles, and triangles, then introduces the SSS (Side-Side-Side) criterion for triangle congruence.

**Target:** Children progressing toward two-column geometry proofs.

**Tone:** Formal, intellectual pursuit—not flashcards or educational games. Let the content speak for itself.

**Prerequisites:** Students have completed lessons on basic definitions, vertical angles, and parallel lines with transversals.

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
  - Variables in italic: *A*, *B*, *C*, *x*
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
  - Congruence highlights: Use consistent colors to show corresponding parts
    - First pair: `rgba(59, 130, 246, 0.6)` (blue)
    - Second pair: `rgba(239, 68, 68, 0.6)` (red)
    - Third pair: `rgba(16, 185, 129, 0.6)` (green)
  - Strokes: Solid versions of the fill colors

---

## 4. Geometric Rendering Rules (STRICT)

### Points & Lines

- Points rendered as filled circles, radius 4–6px.
- Points must **never** sit at the very tip of a ray or line. Lines extend past labeled points.
- Line thickness: 2–2.5px for main figures, 1.5px for construction/auxiliary lines.

### Label Positioning

- Labels (*A*, *B*, *C*) must be offset so they **never overlap** lines, rays, or angle arcs.
- Use intelligent placement: if a ray goes up-right, place label down-right or further out.
- Labels in italic serif, size 16–18px.

### Congruence Marks

- **Tick marks** for congruent segments: small perpendicular hash marks on the segment. One tick for first pair, two ticks for second pair, etc.
- **Arcs** for congruent angles: small curved arcs near the vertex. One arc for first pair, two arcs for second pair, etc.
- These marks should be clearly visible but not overwhelming.

### Diagram Cleanliness

- No generic labels like "Side" or "Angle" on the canvas.
- Unified diagrams preferred over grids of isolated examples.
- Let text content provide explanations; diagrams show the geometry.

---

## 5. Mathematical Notation Standards

- Congruent segments: AB ≅ CD (with the ≅ symbol, not =)
- Congruent angles: ∠ABC ≅ ∠DEF
- Congruent triangles: △ABC ≅ △DEF
- The order of vertices in triangle notation indicates correspondence: A↔D, B↔E, C↔F
- No numbered angle labels (∠1, ∠2). Use vertex-based names: ∠ABC, ∠PQR

---

## 6. Page-by-Page Content

### Page 0: Cover

**Layout:** Centered title, subtitle, scroll hint.

**Content:**
- Title: "Congruence in Geometry"
- Subtitle: "Same size. Same shape. A perfect match."
- Scroll hint: Bouncing down arrow with "Scroll to begin"

**Diagram:** Two congruent triangles, one slightly rotated/translated from the other, rendered with light construction lines suggesting one could slide onto the other.

---

### Page 1: What Does Congruent Mean?

**Layout:** Text left, diagram right.

**Text Content:**

> **Congruent** means *same size and same shape*.
>
> Two figures are congruent if one can be placed exactly on top of the other—a perfect match. You might need to slide it, rotate it, or flip it, but if it fits exactly, the figures are congruent.
>
> The word comes from Latin: *con-* (together) + *gruere* (to agree).

**Diagram:**

Show two identical shapes (perhaps two pentagons or two irregular quadrilaterals—something more interesting than triangles, since we'll focus on triangles later). One shape, then an arrow, then the same shape in a different position/orientation. Visual suggestion of the transformation.

---

### Page 2: Congruent Segments

**Layout:** Text left, diagram right.

**Text Content:**

> Two segments are **congruent** if they have the same length.
>
> **Notation:** We write AB ≅ CD to mean "segment AB is congruent to segment CD."
>
> In diagrams, we mark congruent segments with **tick marks**—small lines crossing the segment. Segments with the same number of ticks are congruent.

**Diagram:**

A figure with four segments. Two of them (say, AB and CD) have single tick marks. Two others (EF and GH) have double tick marks. Clear labels on each segment.

Layout: Perhaps a quadrilateral or two separate pairs, cleanly arranged.

---

### Page 3: Congruent Angles

**Layout:** Text left, diagram right.

**Text Content:**

> Two angles are **congruent** if they have the same measure.
>
> **Notation:** We write ∠ABC ≅ ∠DEF to mean "angle ABC is congruent to angle DEF."
>
> In diagrams, we mark congruent angles with **arcs**—small curves near the vertex. Angles with the same number of arcs (or the same style of arc) are congruent.
>
> You've already seen examples: vertical angles are congruent, and when a transversal crosses parallel lines, alternate interior angles are congruent.

**Diagram:**

Two intersecting lines forming four angles. The vertical angle pairs marked with matching arcs (one pair with single arcs, the other pair with double arcs). This connects to prior knowledge.

Alternatively or additionally: A transversal crossing two parallel lines, with alternate interior angles marked with matching arcs.

---

### Page 4: Congruent Triangles

**Layout:** Text left, diagram right.

**Text Content:**

> Two triangles are **congruent** if all their corresponding parts match:
>
> - Three pairs of corresponding sides (equal lengths)
> - Three pairs of corresponding angles (equal measures)
>
> **Notation:** We write △ABC ≅ △DEF.
>
> **The order of letters matters.** It tells you which vertices correspond:
> - A corresponds to D
> - B corresponds to E  
> - C corresponds to F
>
> This means: AB ≅ DE, BC ≅ EF, CA ≅ FD, and ∠A ≅ ∠D, ∠B ≅ ∠E, ∠C ≅ ∠F.

**Diagram:**

Two congruent triangles, △ABC and △DEF, positioned separately (not overlapping). Corresponding sides marked with matching tick marks (one tick on AB and DE, two ticks on BC and EF, three ticks on CA and FD). Corresponding angles marked with matching arcs.

Clear vertex labels. Perhaps one triangle is a rotated/flipped version of the other to emphasize that orientation doesn't matter.

---

### Page 5: The SSS Criterion

**Layout:** Text left, diagram right.

**Text Content:**

> Checking all six pairs of parts is tedious. Fortunately, there's a shortcut.
>
> **SSS (Side-Side-Side):** If three sides of one triangle are congruent to three sides of another triangle, then the triangles are congruent.
>
> Why does this work? Once you fix three side lengths, there is only one triangle you can build (aside from flipping or rotating it). The angles are completely determined by the sides.
>
> Try it yourself: given three sticks of fixed lengths, can you arrange them into two *different* triangle shapes? You cannot. The shape is locked in.

**Diagram:**

Two triangles with all three pairs of sides marked as congruent (single, double, triple tick marks). The triangles should look identical but be in different orientations.

Possibly: a secondary smaller illustration showing three segments of fixed length and the unique triangle they form.

---

### Page 6: A Note on Foundations

**Layout:** Centered text, no diagram (or minimal decorative geometry).

**Text Content:**

> In geometry, we build from a small set of accepted truths called **axioms** or **postulates**. These are our starting points—statements we accept without proof.
>
> SSS is one of these foundational facts. In most modern treatments of geometry, a criterion called SAS (Side-Angle-Side) is taken as an axiom, and SSS is then proved from it. But either way, these criteria are bedrock. We accept them and build upon them.
>
> There are other criteria for triangle congruence—SAS, ASA, AAS—which we will meet in future lessons. Each gives a different shortcut for proving two triangles congruent.

**Design note:** This page should feel slightly different—more reflective. Perhaps a lighter background tint, or the text centered in a narrower column. Keep it brief.

---

### Page 7: Why Triangles Are Special

**Layout:** Text left, diagram right.

**Text Content:**

> SSS works for triangles. Does it work for other shapes?
>
> **No.** Consider a square. It has four sides of equal length. But a rhombus *also* has four sides of equal length—and a square and a rhombus are not congruent. They don't even have the same angles.
>
> Imagine a square made of hinged sticks. Push on one corner and it "leans over" into a rhombus. Same four sides, completely different shape.
>
> Quadrilaterals can flex. Triangles cannot. Three side lengths lock a triangle into a single rigid shape. This is why triangles are the fundamental building block of geometry—and why we have SSS for triangles but not for quadrilaterals.

**Diagram:**

A square and a rhombus, side by side. Both have all four sides marked with single tick marks (showing equal length). But the shapes are clearly different—the square has right angles, the rhombus has acute and obtuse angles.

Perhaps: a subtle animation suggestion or "before/after" showing a square deforming into a rhombus. (If static, just show both shapes with an arrow or "vs" between them.)

---

### Page 8: Exercises

**Layout:** Full-width. Exercise problems with diagrams.

**Text Content:**

> **Apply what you've learned.**

**Exercise 1:**

Diagram: Two triangles, △PQR and △STU. Sides marked as follows:
- PQ and ST have single tick marks
- QR and TU have double tick marks  
- RP and US have triple tick marks

Question: "Are these triangles congruent? If so, write the congruence statement and state the criterion used."

Expected answer: "Yes. △PQR ≅ △STU by SSS."

---

**Exercise 2:**

Diagram: Two triangles sharing a common side. Specifically: points A, B, C, D where segment BD is shared. Triangle ABD and triangle CBD. 
- AB and CB are marked congruent (single tick)
- AD and CD are marked congruent (double tick)
- BD is shared (same segment)

Question: "Are △ABD and △CBD congruent? Explain."

Expected answer: "Yes. AB ≅ CB (given), AD ≅ CD (given), and BD ≅ BD (same segment). By SSS, △ABD ≅ △CBD."

---

**Exercise 3:**

Diagram: A quadrilateral ABCD with a diagonal AC drawn, creating two triangles △ABC and △ACD.
- AB and AD are marked congruent (single tick)
- BC and DC are marked congruent (double tick)
- AC is shared

Question: "Prove that △ABC ≅ △ADC."

Expected answer: "AB ≅ AD (given), BC ≅ DC (given), AC ≅ AC (shared side). By SSS, △ABC ≅ △ADC."

---

**Exercise 4:**

Diagram: Two triangles. First triangle has sides of length 5, 7, and 9 (labeled). Second triangle has sides of length 5, 7, and 10 (labeled).

Question: "Are these triangles congruent?"

Expected answer: "No. The third sides are different lengths (9 ≠ 10), so SSS does not apply."

---

### Page 9: Summary

**Layout:** Centered, clean summary.

**Text Content:**

> **Congruence** means same size and same shape.
>
> - **Congruent segments** have equal length. Marked with tick marks.
> - **Congruent angles** have equal measure. Marked with arcs.
> - **Congruent triangles** have all corresponding parts congruent.
>
> **SSS Criterion:** If three sides of one triangle are congruent to three sides of another, the triangles are congruent.
>
> Triangles are rigid—three sides determine the shape. Quadrilaterals are not.
>
> *Next: Isosceles triangles, and putting SSS to work in a proof.*

---

## 7. Interaction & Navigation

### Scroll Behavior

- `scroll-snap-type: y mandatory` on the main container
- Each section: `scroll-snap-align: start`, `min-height: 100vh`
- Smooth scrolling enabled

### Navigation Dots

- Fixed position on right side of viewport
- One dot per section
- Current section highlighted (filled vs outlined)
- Clicking a dot scrolls to that section

### Keyboard Support

- Arrow Down / Space / Page Down: Next section
- Arrow Up / Page Up: Previous section
- Home: First section
- End: Last section

### Exercise Interaction

- Each exercise has a "Show Answer" button (or expandable reveal)
- Answer hidden by default
- Simple toggle—no complex input validation needed

---

## 8. File Structure

```
congruence-lesson/
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
│   │   ├── congruentSegments.js
│   │   ├── congruentAngles.js
│   │   ├── congruentTriangles.js
│   │   ├── sssCriterion.js
│   │   ├── quadrilateralFlex.js
│   │   └── exerciseDiagrams.js
│   └── styles/
│       └── main.css
├── tailwind.config.js
└── package.json
```

---

## 9. Canvas Rendering Utilities

Implement these helper functions for consistent diagram rendering:

```javascript
// Extend a line past a point
function extendPoint(start, end, extraDistance) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  return {
    x: end.x + (dx / len) * extraDistance,
    y: end.y + (dy / len) * extraDistance
  };
}

// Draw a point with label
function drawPoint(ctx, x, y, label, offsetX = 10, offsetY = -10) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#333';
  ctx.fill();
  
  ctx.font = 'italic 16px "STIX Two Text", serif';
  ctx.fillText(label, x + offsetX, y + offsetY);
}

// Draw tick marks on a segment (for congruence)
function drawTickMarks(ctx, x1, y1, x2, y2, count = 1) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  
  // Perpendicular direction
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

// Draw angle arc (for congruence marking)
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
```

---

## 10. Responsive Considerations

- Minimum viewport width: 768px (tablet)
- On smaller screens, stack text above diagram instead of side-by-side
- Diagrams should scale proportionally (use percentage-based canvas sizing or responsive containers)
- Font sizes should remain readable (minimum 16px body text)

---

## 11. Accessibility

- All diagrams should have descriptive `aria-label` attributes
- Navigation dots should be keyboard-focusable
- Sufficient color contrast (WCAG AA)
- Exercises should be navigable without mouse

---

## 12. Summary of Key Points for Implementation

1. **LaTeX-style fonts throughout** — STIX Two Text or Computer Modern, no sans-serif
2. **Formal intellectual tone** — no flashcard vibes, no condescension
3. **Unified diagrams** — not grids of isolated examples
4. **Vertex-based angle labels** — ∠ABC, never ∠1 or ∠2
5. **Proper congruence notation** — use ≅ symbol
6. **Tick marks for segments, arcs for angles** — standard geometric notation
7. **The quadrilateral counterexample is important** — it shows why triangles are special
8. **Exercises use SSS with justification** — students practice stating the criterion
9. **Mention axiom/postulate status honestly** — SSS is foundational, explain briefly
10. **Scroll-snap navigation** — each section is one viewport height

---

*End of specification.*
