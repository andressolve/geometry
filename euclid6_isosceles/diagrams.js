/**
 * Diagram Drawing Functions for Lesson 6: Isosceles Triangles
 */

const Diagrams = {
    // ============================================
    // PAGE 0: COVER - Simple isosceles triangle
    // ============================================
    drawCover(canvas) {
        const width = 500, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Isosceles triangle with vertex at top
        const A = { x: 250, y: 40 };
        const B = { x: 110, y: 230 };
        const C = { x: 390, y: 230 };

        // Draw triangle
        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Mark the two equal legs (AB ≅ AC)
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Labels
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', 0, -16);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -14, 14);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 14, 14);
    },

    // ============================================
    // PAGE 1: What is an Isosceles Triangle?
    // Shows labeled parts: legs, base, vertex angle, base angles
    // ============================================
    drawPage1(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Isosceles triangle
        const A = { x: 200, y: 40 };
        const B = { x: 70, y: 270 };
        const C = { x: 330, y: 270 };

        // Draw triangle
        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Mark the two equal legs (blue)
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Mark vertex angle (single arc)
        GeometryUtils.drawAngleArc(ctx, A, B, C, 30, 1, '#8b5cf6');

        // Mark base angles (matching arcs, red)
        GeometryUtils.drawAngleArc(ctx, B, A, C, 28, 2, Colors.pair2.stroke);
        GeometryUtils.drawAngleArc(ctx, C, B, A, 28, 2, Colors.pair2.stroke);

        // Labels
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', 0, -16);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -14, 14);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 14, 14);

        // Text annotations
        ctx.font = '14px STIX Two Text, serif';
        ctx.textAlign = 'center';

        // Vertex angle label
        ctx.fillStyle = '#8b5cf6';
        ctx.fillText('vertex', 200, 85);
        ctx.fillText('angle', 200, 100);

        // Base angles label (moved towards center to avoid arc overlap)
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.fillText('base', 120, 235);
        ctx.fillText('angle', 120, 250);
        ctx.fillText('base', 280, 235);
        ctx.fillText('angle', 280, 250);

        // Leg labels
        ctx.fillStyle = Colors.pair1.stroke;
        ctx.save();
        ctx.translate(115, 145);
        ctx.rotate(-0.95);
        ctx.fillText('leg', 0, 0);
        ctx.restore();

        ctx.save();
        ctx.translate(285, 145);
        ctx.rotate(0.95);
        ctx.fillText('leg', 0, 0);
        ctx.restore();

        // Base label
        ctx.fillStyle = '#333333';
        ctx.fillText('base', 200, 295);
    },

    // ============================================
    // PAGE 2: Comparing Triangle Types
    // Three triangles: scalene, isosceles, equilateral
    // ============================================
    drawPage2(canvas) {
        const width = 450, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const y1 = 50, y2 = 180;

        // SCALENE (left) - no sides equal
        const s1 = { x: 40, y: y2 };
        const s2 = { x: 130, y: y2 };
        const s3 = { x: 60, y: y1 + 20 };

        GeometryUtils.drawTriangle(ctx, s1, s2, s3);

        // ISOSCELES (center) - two sides equal
        const i1 = { x: 155, y: y2 };
        const i2 = { x: 295, y: y2 };
        const i3 = { x: 225, y: y1 };

        GeometryUtils.drawTriangle(ctx, i1, i2, i3);
        GeometryUtils.drawTickMarks(ctx, i3.x, i3.y, i1.x, i1.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, i3.x, i3.y, i2.x, i2.y, 1, Colors.pair1.stroke);

        // EQUILATERAL (right) - all sides equal
        const side = 90;
        const eHeight = side * Math.sqrt(3) / 2;
        const e1 = { x: 320, y: y2 };
        const e2 = { x: 320 + side, y: y2 };
        const e3 = { x: 320 + side/2, y: y2 - eHeight };

        GeometryUtils.drawTriangle(ctx, e1, e2, e3);
        GeometryUtils.drawTickMarks(ctx, e1.x, e1.y, e2.x, e2.y, 1, Colors.pair3.stroke);
        GeometryUtils.drawTickMarks(ctx, e2.x, e2.y, e3.x, e3.y, 1, Colors.pair3.stroke);
        GeometryUtils.drawTickMarks(ctx, e3.x, e3.y, e1.x, e1.y, 1, Colors.pair3.stroke);

        // Labels below
        ctx.font = '16px STIX Two Text, serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('Scalene', 85, 220);
        ctx.fillText('Isosceles', 225, 220);
        ctx.fillText('Equilateral', 365, 220);

        // Subtitle descriptions
        ctx.font = '12px STIX Two Text, serif';
        ctx.fillStyle = '#6b7280';
        ctx.fillText('no sides equal', 85, 240);
        ctx.fillText('two sides equal', 225, 240);
        ctx.fillText('all sides equal', 365, 240);
    },

    // ============================================
    // PAGE 3: Discovery - The Base Angles (INTERACTIVE)
    // Vertex A is draggable to show angles changing
    // ============================================
    page3State: {
        A: { x: 210, y: 50 },
        B: { x: 70, y: 270 },
        C: { x: 350, y: 270 },
        isDragging: false,
        width: 420,
        height: 320
    },

    drawPage3(canvas) {
        const state = this.page3State;
        const ctx = setupCanvas(canvas, state.width, state.height);
        this.renderPage3(ctx);
    },

    initPage3Interactive(canvas) {
        const state = this.page3State;
        const ctx = setupCanvas(canvas, state.width, state.height);

        // Initial render
        this.renderPage3(ctx);

        // Get canvas position helper
        const getMousePos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = state.width / rect.width;
            const scaleY = state.height / rect.height;
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        };

        const getTouchPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = state.width / rect.width;
            const scaleY = state.height / rect.height;
            const touch = e.touches[0];
            return {
                x: (touch.clientX - rect.left) * scaleX,
                y: (touch.clientY - rect.top) * scaleY
            };
        };

        // Check if point is near vertex A
        const isNearA = (pos) => {
            const dx = pos.x - state.A.x;
            const dy = pos.y - state.A.y;
            return Math.sqrt(dx * dx + dy * dy) < 25;
        };

        // Mouse events
        canvas.addEventListener('mousedown', (e) => {
            const pos = getMousePos(e);
            if (isNearA(pos)) {
                state.isDragging = true;
                canvas.style.cursor = 'grabbing';
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            const pos = getMousePos(e);

            if (state.isDragging) {
                // Constrain A to vertical center line and within bounds
                state.A.y = Math.max(25, Math.min(state.B.y - 40, pos.y));
                // A stays on the perpendicular bisector of BC
                state.A.x = (state.B.x + state.C.x) / 2;
                this.renderPage3(ctx);
            } else {
                // Change cursor when hovering over A
                canvas.style.cursor = isNearA(pos) ? 'grab' : 'default';
            }
        });

        canvas.addEventListener('mouseup', () => {
            state.isDragging = false;
            canvas.style.cursor = 'default';
        });

        canvas.addEventListener('mouseleave', () => {
            state.isDragging = false;
            canvas.style.cursor = 'default';
        });

        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            const pos = getTouchPos(e);
            if (isNearA(pos)) {
                state.isDragging = true;
                e.preventDefault();
            }
        }, { passive: false });

        canvas.addEventListener('touchmove', (e) => {
            if (state.isDragging) {
                const pos = getTouchPos(e);
                state.A.y = Math.max(25, Math.min(state.B.y - 40, pos.y));
                state.A.x = (state.B.x + state.C.x) / 2;
                this.renderPage3(ctx);
                e.preventDefault();
            }
        }, { passive: false });

        canvas.addEventListener('touchend', () => {
            state.isDragging = false;
        });
    },

    renderPage3(ctx) {
        const state = this.page3State;
        const { A, B, C, width, height } = state;

        clearCanvas(ctx, width, height);

        // Calculate angles
        const calcAngle = (vertex, p1, p2) => {
            const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
            const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
            const dot = v1.x * v2.x + v1.y * v2.y;
            const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
            const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
            const cosAngle = dot / (mag1 * mag2);
            return Math.acos(Math.max(-1, Math.min(1, cosAngle))) * 180 / Math.PI;
        };

        const vertexAngle = calcAngle(A, B, C);
        const baseAngleB = calcAngle(B, A, C);
        const baseAngleC = calcAngle(C, B, A);

        // Draw triangle
        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Mark equal legs
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Mark equal base angles
        GeometryUtils.drawAngleArc(ctx, B, A, C, 30, 1, Colors.pair2.stroke);
        GeometryUtils.drawAngleArc(ctx, C, B, A, 30, 1, Colors.pair2.stroke);

        // Draggable vertex indicator (larger, with highlight)
        ctx.beginPath();
        ctx.arc(A.x, A.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(106, 130, 251, 0.3)';
        ctx.fill();
        ctx.strokeStyle = Colors.pair1.stroke;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Labels
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', 0, -22);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -14, 14);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 14, 14);

        // Angle measure labels
        ctx.font = '16px STIX Two Text, serif';
        ctx.textAlign = 'center';

        // Vertex angle
        ctx.fillStyle = '#333333';
        const vertexLabelY = A.y + 45;
        ctx.fillText(`${Math.round(vertexAngle)}°`, A.x, vertexLabelY);

        // Base angles (equal) - position dynamically
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.fillText(`${Math.round(baseAngleB)}°`, B.x + 45, B.y - 30);
        ctx.fillText(`${Math.round(baseAngleC)}°`, C.x - 45, C.y - 30);

        // "Equal!" annotation when angles match (they always should for isosceles)
        ctx.font = 'bold 14px STIX Two Text, serif';
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.fillText('Always equal!', (B.x + C.x) / 2, B.y + 30);

        // Drag hint
        ctx.font = '12px STIX Two Text, serif';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText('↕ Drag point A', A.x, A.y - 38);
    },

    // ============================================
    // PAGE 4: The Question
    // Simple triangle with question marks at base angles
    // ============================================
    drawPage4(canvas) {
        const width = 350, height = 250;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Simple isosceles triangle
        const A = { x: 175, y: 30 };
        const B = { x: 60, y: 200 };
        const C = { x: 290, y: 200 };

        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Mark equal legs
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Question marks at base angles
        ctx.font = 'bold 24px STIX Two Text, serif';
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.textAlign = 'center';
        ctx.fillText('?', 95, 190);
        ctx.fillText('?', 255, 190);

        // Labels
        GeometryUtils.drawPoint(ctx, A.x, A.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, B.x, B.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, C.x, C.y, null, 0, 0, 4);
    },

    // ============================================
    // PAGE 5: THE PROOF - Most important diagram
    // Triangle with midpoint construction
    // ============================================
    drawPage5(canvas) {
        const width = 400, height = 340;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Triangle ABC with A at top
        const A = { x: 200, y: 35 };
        const B = { x: 55, y: 280 };
        const C = { x: 345, y: 280 };
        const M = GeometryUtils.midpoint(B, C);

        // Draw main triangle
        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Draw construction line AM (dashed)
        GeometryUtils.drawDashedSegment(ctx, A, M, '#666666', 2);

        // Mark congruent legs: AB ≅ AC (single tick, blue)
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Mark half-bases: BM ≅ CM (double tick, green)
        GeometryUtils.drawTickMarks(ctx, B.x, B.y, M.x, M.y, 2, Colors.pair3.stroke);
        GeometryUtils.drawTickMarks(ctx, M.x, M.y, C.x, C.y, 2, Colors.pair3.stroke);

        // Mark base angles: ∠ABM ≅ ∠ACM (arcs, red)
        GeometryUtils.drawAngleArc(ctx, B, A, M, 28, 1, Colors.pair2.stroke);
        GeometryUtils.drawAngleArc(ctx, C, M, A, 28, 1, Colors.pair2.stroke);

        // Labels
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', 0, -16);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -16, 10);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 16, 10);
        GeometryUtils.drawPoint(ctx, M.x, M.y, 'M', 0, 18);
    },

    // ============================================
    // PAGE 6: The Converse
    // ============================================
    drawPage6(canvas) {
        const width = 350, height = 250;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Isosceles triangle
        const A = { x: 175, y: 30 };
        const B = { x: 50, y: 200 };
        const C = { x: 300, y: 200 };

        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Mark equal base angles (arcs)
        GeometryUtils.drawAngleArc(ctx, B, A, C, 28, 1, Colors.pair2.stroke);
        GeometryUtils.drawAngleArc(ctx, C, B, A, 28, 1, Colors.pair2.stroke);

        // Mark equal legs (tick marks)
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Labels
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', 0, -16);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -14, 14);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 14, 14);
    },

    // ============================================
    // EXERCISE 1: Base angles 65°, find vertex angle
    // ============================================
    drawExercise1(canvas) {
        const width = 280, height = 180;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const A = { x: 140, y: 25 };
        const B = { x: 40, y: 155 };
        const C = { x: 240, y: 155 };

        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Mark equal legs
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Base angles with labels
        GeometryUtils.drawAngleArc(ctx, B, A, C, 25, 1, Colors.pair2.stroke);
        GeometryUtils.drawAngleArc(ctx, C, B, A, 25, 1, Colors.pair2.stroke);

        ctx.font = '14px STIX Two Text, serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('65°', 95, 142);
        ctx.fillText('65°', 185, 142);

        // Question mark at vertex angle
        ctx.fillStyle = '#8b5cf6';
        ctx.fillText('?', 140, 65);
    },

    // ============================================
    // EXERCISE 2: Vertex angle 40°, find base angles
    // ============================================
    drawExercise2(canvas) {
        const width = 280, height = 180;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const A = { x: 140, y: 25 };
        const B = { x: 40, y: 155 };
        const C = { x: 240, y: 155 };

        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Mark equal legs
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Vertex angle with label
        GeometryUtils.drawAngleArc(ctx, A, B, C, 22, 1, '#8b5cf6');
        ctx.font = '14px STIX Two Text, serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('40°', 140, 65);

        // Question marks at base angles
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.fillText('?', 70, 145);
        ctx.fillText('?', 210, 145);
    },

    // ============================================
    // EXERCISE 3: Triangle with 50°, 50°, 80° - is it isosceles?
    // ============================================
    drawExercise3(canvas) {
        const width = 280, height = 180;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Triangle that's clearly isosceles (two 50° angles)
        const A = { x: 140, y: 20 };
        const B = { x: 35, y: 155 };
        const C = { x: 245, y: 155 };

        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Label all angles
        ctx.font = '14px STIX Two Text, serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('80°', 140, 60);
        ctx.fillText('50°', 75, 143);
        ctx.fillText('50°', 205, 143);
    },

    // ============================================
    // EXERCISE 4: Algebraic - (2x + 10)° and (3x - 5)°
    // ============================================
    drawExercise4(canvas) {
        const width = 280, height = 180;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const A = { x: 140, y: 25 };
        const B = { x: 40, y: 155 };
        const C = { x: 240, y: 155 };

        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Mark equal legs
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, C.x, C.y, 1, Colors.pair1.stroke);

        // Base angles with one algebraic expression
        GeometryUtils.drawAngleArc(ctx, B, A, C, 25, 1, Colors.pair2.stroke);
        GeometryUtils.drawAngleArc(ctx, C, B, A, 25, 1, Colors.pair2.stroke);

        ctx.font = '13px STIX Two Text, serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('40°', 80, 140);
        ctx.fillText('(2x + 10)°', 180, 140);
    }
};
