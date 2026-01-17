# Lesson 10: The Cartesian Plane — Introduction

## Overview

The first lesson in a new chapter on coordinate geometry. This introduces the Cartesian plane as a tool for describing position precisely. The focus is on building intuition: understanding axes, coordinates, and how to locate points.

**Target audience:** Children familiar with number lines and basic arithmetic (including negative numbers)
**Prerequisites:** Familiarity with number lines, negative numbers
**Tone:** Visual, precise, matter-of-fact. Position and location as the central metaphor.
**Chapter context:** This begins a series on coordinate geometry (Cartesian plane → lines → intersections → function graphs)

---

## Core Concept

The Cartesian plane is a way to give every point in a flat space a unique "address" using two numbers. Just as a street address tells you exactly where a building is, coordinates tell you exactly where a point is.

---

## Technical Stack

Follow the established pattern:

- **No build system** — vanilla HTML, CSS, JavaScript
- **Tailwind CSS via CDN**
- **STIX Two Text font**
- **HTML5 Canvas API** — for all diagrams
- **Modular JavaScript**

---

## File Structure

```
cartesian1_intro/
├── index.html          # Main HTML
├── styles.css          # Custom styles (can copy from euclid9)
├── geometry-utils.js   # Shared drawing utilities
├── diagrams.js         # Diagram drawing functions
├── interactive.js      # Interactive point plotting
├── exercises.js        # Exercise logic
└── app.js              # Navigation & initialization
```

---

## Page Structure

| Page | ID | Title | Layout |
|------|----|-------|--------|
| 0 | page-0 | Cover | Centered, gradient |
| 1 | page-1 | One Number Isn't Enough | Text left, diagram right |
| 2 | page-2 | Two Axes, One Plane | Text left, diagram right |
| 3 | page-3 | The Origin | Text left, diagram right |
| 4 | page-4 | Coordinates | Text left, diagram right |
| 5 | page-5 | Reading Points | Text left, diagram right |
| 6 | page-6 | Plotting Points (Interactive) | Full width, interactive canvas |
| 7 | page-7 | Exercises | Full width, grid layout |
| 8 | page-8 | Summary | Centered, gradient |

---

## Content & Visuals

### Page 0: Cover
- **Title:** The Cartesian Plane
- **Subtitle:** Giving every point an address.
- **Visual:** A coordinate grid with a few labeled points, maybe an animated "crosshair" that settles on a point and displays its coordinates.
- **Footer:** "Lesson X" (or "Part II, Lesson 1" if we're denoting chapters)
- **Prompt:** "Scroll to begin"

---

### Page 1: One Number Isn't Enough
- **Concept:** A number line lets you describe position in one dimension. But the world is flat (2D). One number can't tell you where something is on a page or a map.
- **Visual:**
  - Top: A simple number line with a point marked at 3. "This point is at 3."
  - Bottom: A blank 2D region with a point. "Where is this point? '3' isn't enough anymore."
- **Text:**
  - "On a number line, one number tells you exactly where a point is."
  - "But on a flat surface, you need more information."

---

### Page 2: Two Axes, One Plane
- **Concept:** We use two number lines — one horizontal, one vertical — that cross at zero. Together, they form the **Cartesian plane**.
- **Visual:**
  - Two number lines crossing at right angles
  - Horizontal line labeled "x-axis" (with arrow pointing right for positive)
  - Vertical line labeled "y-axis" (with arrow pointing up for positive)
  - The crossing point highlighted
- **Text:**
  - "Take two number lines."
  - "Place one horizontally — we call it the **x-axis**."
  - "Place one vertically — we call it the **y-axis**."
  - "They cross at zero."

---

### Page 3: The Origin
- **Concept:** The point where the axes cross is called the **origin**. It's the reference point for everything else. Its coordinates are (0, 0).
- **Visual:**
  - Coordinate axes with the origin prominently marked and labeled "O" or "Origin"
  - The coordinates (0, 0) displayed near it
- **Text:**
  - "The point where the axes cross is called the **origin**."
  - "It's the starting point — the (0, 0) of the plane."
  - "Every other point is described by how far it is from here."

---

### Page 4: Coordinates
- **Concept:** Every point has two numbers: how far right (or left) and how far up (or down). We write them as (x, y) — x first, then y.
- **Visual:**
  - A point at (3, 2) on the grid
  - Dotted lines from the point to each axis showing the "projection"
  - Labels: "3 units right" on x-axis, "2 units up" on y-axis
  - The coordinate (3, 2) displayed
- **Text:**
  - "To locate a point, we measure:"
  - "1. How far along the x-axis (left or right)"
  - "2. How far along the y-axis (up or down)"
  - "We write this as **(x, y)** — x comes first."

**Definition Box:**
- **Coordinates:** An ordered pair (x, y) that describes a point's position.

---

### Page 5: Reading Points
- **Concept:** Practice reading coordinates from the graph. Go horizontal first (x), then vertical (y).
- **Visual:**
  - Grid with several points plotted and labeled A, B, C
  - Point A at (4, 3)
  - Point B at (1, 5)
  - Point C at (5, 1)
  - Guiding annotations on one point showing the reading process
- **Text:**
  - "To read a point's coordinates:"
  - "First, look at how far it is along the x-axis (horizontal)."
  - "Then, look at how far it is along the y-axis (vertical)."
  - "Point A is at (4, 3) — 4 right, 3 up."

**Note:** Emphasize the order matters: (3, 4) and (4, 3) are different points.

---

### Page 6: Plotting Points (Interactive)
- **Concept:** Now try it yourself. Click on the grid to plot points at given coordinates.
- **Interactive:**
  - Display a coordinate to plot, e.g., "Plot the point (2, 4)"
  - User clicks on the grid
  - If correct (within tolerance), the point is marked and confirmed
  - If incorrect, show where they clicked and the correct location
  - Cycle through 4–5 points of varying difficulty:
    - (2, 4) — simple positive
    - (5, 1) — positive
    - (−3, 2) — negative x
    - (−2, −4) — both negative
    - (0, 3) — on an axis

**Interaction model:**
- Show target coordinate prominently
- Grid is clickable
- Immediate feedback (correct: green dot, incorrect: red dot + correct location shown)
- "Next" button to proceed

---

### Page 7: Exercises
- **Format:** Multiple problems in a grid layout

**Exercise 1: Read the Coordinates**
- Display a grid with a point marked
- Prompt: "What are the coordinates of point P?"
- Input: Two number fields (x, y) or a single field accepting "(x, y)" format
- Examples:
  - Point at (3, 5) → Answer: (3, 5)
  - Point at (−2, 4) → Answer: (−2, 4)
  - Point at (4, −3) → Answer: (4, −3)

**Exercise 2: Plot the Point**
- Given coordinates, click to plot (same as interactive page, but scored)
- Examples with increasing complexity

**Exercise 3: Match the Point**
- Grid shows 4 labeled points (A, B, C, D)
- Four coordinates listed
- Match each coordinate to its point

---

### Page 8: Summary
- **Title:** What You Learned

**Key Points:**
1. The **Cartesian plane** is formed by two perpendicular number lines (axes).
2. The **x-axis** is horizontal. The **y-axis** is vertical.
3. They meet at the **origin**: (0, 0).
4. Every point has **coordinates** written as (x, y) — x first, then y.

**Visual:** Clean diagram of the coordinate plane with all elements labeled.

**Navigation:** "Back to Lessons" button

---

## Implementation Notes

### Visual Style
- **Grid:** Light gray gridlines, darker axes
- **Points:** Filled circles, ~8px radius
- **Labels:** Near points but not overlapping
- **Colors:**
  - Axes: dark gray (#3d3d3d)
  - Grid: light gray (#e0e0e0)
  - Points: blue (#4a7fc1) for neutral, green for correct, coral for given/highlighted

### Interactivity
- **Hover effects:** On the interactive page, show crosshairs following the mouse with live coordinate readout
- **Click precision:** Allow some tolerance (e.g., ±0.3 units) for point plotting

### Coordinate Display
- Use proper notation: (x, y) with parentheses
- Negative signs should be clear (not ambiguous with dashes)

---

## Connection to Next Lessons

This lesson establishes:
- The coordinate system that all subsequent lessons will use
- The vocabulary (axis, origin, coordinates, quadrant)
- The skill of reading and plotting points

**Next lesson (Lines):** "Two points determine a line. But can we describe a line with an equation?"

---

## Open Questions

1. **Naming convention:** Should this be "Lesson 10" or start a new numbering for "Part II"? (Leaning toward Lesson X to maintain continuity, but can note "Part II: Coordinate Geometry" on the cover.)

2. **Negative numbers prerequisite:** Do we assume familiarity, or add a brief refresher? (Leaning toward assuming it — this is about the plane, not arithmetic.)

3. **Distance formula?** Save for a later lesson or introduce informally here? (Save it — keep this lesson focused on the basics.)

---

## Page Count
9 pages total (0–8)
