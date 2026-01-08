/**
 * Diagram Drawing Functions for Lesson 7: Angles in Circles
 */

const Diagrams = {
    // ============================================
    // PAGE 0: COVER - Circle with inscribed triangle
    // ============================================
    drawCover(canvas) {
        const width = 400, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 200, y: 150 };
        const radius = 110;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // Points on circle
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-150));
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-30));
        const C = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-90));

        // Draw inscribed triangle
        GeometryUtils.drawTriangle(ctx, A, B, C);

        // Draw center
        GeometryUtils.drawPoint(ctx, O.x, O.y, 'O', 12, 12);

        // Labels
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', -14, 0);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', 14, 0);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 0, 18);
    },

    // ============================================
    // PAGE 1: What is a Circle?
    // Circle with multiple radii, all marked equal
    // ============================================
    drawPage1(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 200, y: 165 };
        const radius = 120;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // Draw several radii at different angles
        const angles = [-30, -80, -130, -180, -230];
        const points = angles.map(a => GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(a)));

        points.forEach((p, i) => {
            GeometryUtils.drawSegment(ctx, O, p, '#333333', 2);
            GeometryUtils.drawTickMarks(ctx, O.x, O.y, p.x, p.y, 1, Colors.pair1.stroke);
            GeometryUtils.drawPoint(ctx, p.x, p.y, null, 0, 0, 3);
        });

        // Center point
        GeometryUtils.drawPoint(ctx, O.x, O.y, 'O', -15, -10);
    },

    // ============================================
    // PAGE 2: Triangles from the Center
    // Shows isosceles triangle OAB
    // ============================================
    drawPage2(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 200, y: 165 };
        const radius = 120;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // Points A and B on circle
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-150));
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-30));

        // Draw triangle OAB
        GeometryUtils.drawSegment(ctx, O, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, O, B, '#333333', 2);
        GeometryUtils.drawSegment(ctx, A, B, '#333333', 2);

        // Mark equal radii
        GeometryUtils.drawTickMarks(ctx, O.x, O.y, A.x, A.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, O.x, O.y, B.x, B.y, 1, Colors.pair1.stroke);

        // Labels
        GeometryUtils.drawPoint(ctx, O.x, O.y, 'O', 0, -18);
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', -14, 8);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', 14, 8);
    },

    // ============================================
    // PAGE 3: Exercise 0 - Isosceles triangle from radii
    // Two radii form isosceles triangle, find base angle (matches image0)
    // ============================================
    drawPage3(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 240, y: 140 };  // Center slightly right and up
        const radius = 120;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // Two points on circle - A at top, B at bottom-left
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-70));   // top right
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-200));  // bottom left

        // Draw the isosceles triangle: two radii + chord
        GeometryUtils.drawSegment(ctx, O, A, '#333333', 2);  // radius OA
        GeometryUtils.drawSegment(ctx, O, B, '#333333', 2);  // radius OB
        GeometryUtils.drawSegment(ctx, A, B, '#333333', 2);  // chord AB

        // Mark radii equal
        GeometryUtils.drawTickMarks(ctx, O.x, O.y, A.x, A.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, O.x, O.y, B.x, B.y, 1, Colors.pair1.stroke);

        // Mark the base angles with filled sectors
        GeometryUtils.drawAngleSector(ctx, A, B, O, 30, Colors.pair1.fill, Colors.pair1.stroke);
        GeometryUtils.drawAngleSector(ctx, B, O, A, 30, Colors.pair1.fill, Colors.pair1.stroke);

        // Points
        GeometryUtils.drawPoint(ctx, O.x, O.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, A.x, A.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, B.x, B.y, null, 0, 0, 4);

        // Angle labels - 20° at bottom-left (B), ? at top (A)
        ctx.font = '16px STIX Two Text, serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('?', A.x - 30, A.y + 35);
        ctx.fillText('20°', B.x + 40, B.y - 20);
    },

    // ============================================
    // PAGE 4: Exercise 1 - 30° + 30° = 60° inscribed, find central (120°)
    // C at top, angle split by radius CO (symmetric 30° on each side)
    // ============================================
    drawPage4(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 200, y: 165 };
        const radius = 115;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // C at top (-90°)
        const angleC = -90;
        const C = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(angleC));

        // 30° inscribed = 60° arc on each side (symmetric)
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(90 - 60));   // 30° (30° inscribed on right)
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(90 + 60));   // 150° (30° inscribed on left)

        // Draw lines from C to A and B
        GeometryUtils.drawSegment(ctx, C, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, C, B, '#333333', 2);

        // Draw radius from C to O
        GeometryUtils.drawSegment(ctx, C, O, '#666666', 1.5);

        // Draw lines from O to A and B (for central angle)
        GeometryUtils.drawSegment(ctx, O, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, O, B, '#333333', 2);

        // Angle sectors at C - 30° on each side (symmetric)
        GeometryUtils.drawAngleSector(ctx, C, A, O, 50, 'rgba(139, 92, 246, 0.3)', 'rgb(139, 92, 246)');  // 30° on right
        GeometryUtils.drawAngleSector(ctx, C, O, B, 50, Colors.pair1.fill, Colors.pair1.stroke);          // 30° on left

        // Angle at O (central angle - the unknown)
        GeometryUtils.drawAngleSector(ctx, O, A, B, 40, Colors.pair2.fill, Colors.pair2.stroke);

        // Points
        GeometryUtils.drawPoint(ctx, O.x, O.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, A.x, A.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, B.x, B.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, C.x, C.y, null, 0, 0, 4);

        // Angle labels - 30° on each side (close to radius CO)
        ctx.font = '14px STIX Two Text, serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('30°', C.x - 22, C.y + 40);
        ctx.fillText('30°', C.x + 22, C.y + 40);

        // Question mark at center angle - position near the angle sector
        ctx.font = 'bold 18px STIX Two Text, serif';
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.fillText('?', O.x, O.y + 50);
    },

    // ============================================
    // PAGE 5: Exercise 2 - 20° + 40° = 60° inscribed, find central (120°)
    // Same A, B positions as exercise 2, C shifted to create 20°/40° split
    // ============================================
    drawPage5(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 200, y: 165 };
        const radius = 115;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // Same A and B as exercise 2 (symmetric central angle)
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(30));    // bottom right
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(150));   // bottom left

        // C shifted from top to create 20°/40° split (at -110° instead of -90°)
        const C = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-110));

        // Draw lines from C to A and B
        GeometryUtils.drawSegment(ctx, C, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, C, B, '#333333', 2);

        // Draw radius from C to O
        GeometryUtils.drawSegment(ctx, C, O, '#666666', 1.5);

        // Draw lines from O to A and B (for central angle)
        GeometryUtils.drawSegment(ctx, O, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, O, B, '#333333', 2);

        // Angle sectors at C - 20° on right (toward A), 40° on left (toward B)
        GeometryUtils.drawAngleSector(ctx, C, A, O, 50, Colors.pair1.fill, Colors.pair1.stroke);
        GeometryUtils.drawAngleSector(ctx, C, O, B, 50, 'rgba(139, 92, 246, 0.3)', 'rgb(139, 92, 246)');

        // Angle at O (central angle - the unknown)
        GeometryUtils.drawAngleSector(ctx, O, A, B, 40, Colors.pair2.fill, Colors.pair2.stroke);

        // Points
        GeometryUtils.drawPoint(ctx, O.x, O.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, A.x, A.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, B.x, B.y, null, 0, 0, 4);
        GeometryUtils.drawPoint(ctx, C.x, C.y, null, 0, 0, 4);

        // Angle labels - 20° toward A (right), 40° toward B (left) - close to radius CO
        ctx.font = '14px STIX Two Text, serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('20°', C.x + 18, C.y + 38);
        ctx.fillText('40°', C.x - 22, C.y + 42);

        // Question mark at center angle - position near the angle sector (below O)
        ctx.font = 'bold 18px STIX Two Text, serif';
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.fillText('?', O.x, O.y + 50);
    },

    // ============================================
    // PAGE 6: INTERACTIVE - Drag C around
    // 60° inscribed angle (120° central)
    // ============================================
    interactiveState: {
        O: { x: 250, y: 200 },
        radius: 150,
        angleC: -90, // degrees, position of C on circle (top)
        angleA: 150,  // bottom left
        angleB: 30,   // bottom right (120° apart for 60° inscribed)
        isDragging: false,
        width: 500,
        height: 400
    },

    drawInteractive(canvas) {
        const state = this.interactiveState;
        const ctx = setupCanvas(canvas, state.width, state.height);
        this.renderInteractive(ctx);
    },

    initInteractive(canvas) {
        const state = this.interactiveState;
        const ctx = setupCanvas(canvas, state.width, state.height);
        const self = this;

        this.renderInteractive(ctx);

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

        const C = () => GeometryUtils.pointOnCircle(state.O, state.radius, GeometryUtils.toRadians(state.angleC));

        const isNearC = (pos) => {
            const c = C();
            const dx = pos.x - c.x;
            const dy = pos.y - c.y;
            return Math.sqrt(dx * dx + dy * dy) < 25;
        };

        canvas.addEventListener('mousedown', (e) => {
            const pos = getMousePos(e);
            if (isNearC(pos)) {
                state.isDragging = true;
                canvas.style.cursor = 'grabbing';
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            const pos = getMousePos(e);

            if (state.isDragging) {
                // Calculate angle from center to mouse position
                const angle = GeometryUtils.toDegrees(Math.atan2(pos.y - state.O.y, pos.x - state.O.x));

                // Constrain C to major arc (between A and B, going the long way)
                // A is at 150°, B is at 30°
                // Major arc goes from 30° counterclockwise through -90° to 150°
                // Keep C in upper portion of circle (roughly -150° to 20°)
                if (angle < 20 && angle > -160) {
                    state.angleC = angle;
                    self.renderInteractive(ctx);
                    self.updateAngleDisplay();
                }
            } else {
                canvas.style.cursor = isNearC(pos) ? 'grab' : 'default';
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

        // Touch events
        canvas.addEventListener('touchstart', (e) => {
            const pos = getTouchPos(e);
            if (isNearC(pos)) {
                state.isDragging = true;
                e.preventDefault();
            }
        }, { passive: false });

        canvas.addEventListener('touchmove', (e) => {
            if (state.isDragging) {
                const pos = getTouchPos(e);
                const angle = GeometryUtils.toDegrees(Math.atan2(pos.y - state.O.y, pos.x - state.O.x));
                if (angle < 20 && angle > -160) {
                    state.angleC = angle;
                    self.renderInteractive(ctx);
                    self.updateAngleDisplay();
                }
                e.preventDefault();
            }
        }, { passive: false });

        canvas.addEventListener('touchend', () => {
            state.isDragging = false;
        });
    },

    updateAngleDisplay() {
        const display = document.getElementById('angle-display');
        if (display) {
            display.textContent = '60°';
        }
    },

    renderInteractive(ctx) {
        const state = this.interactiveState;
        const { O, radius, angleC, angleA, angleB, width, height } = state;

        clearCanvas(ctx, width, height);

        // Points
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(angleA));
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(angleB));
        const C = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(angleC));

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // Draw lines from C to A and B
        GeometryUtils.drawSegment(ctx, C, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, C, B, '#333333', 2);

        // Draw radii from O to A and B (solid)
        GeometryUtils.drawSegment(ctx, O, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, O, B, '#333333', 2);

        // Angle at O (central)
        GeometryUtils.drawAngleSector(ctx, O, A, B, 45, Colors.pair2.fill, Colors.pair2.stroke);

        // Angle at C (inscribed)
        GeometryUtils.drawAngleSector(ctx, C, A, B, 40, Colors.pair1.fill, Colors.pair1.stroke);

        // Calculate actual angle at C
        const actualAngle = GeometryUtils.angleAtVertex(C, A, B);

        // Labels
        GeometryUtils.drawPoint(ctx, O.x, O.y, 'O', 0, 20);
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', -14, 5);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', 5, 18);

        // Draggable C with highlight
        ctx.beginPath();
        ctx.arc(C.x, C.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(106, 130, 251, 0.3)';
        ctx.fill();
        ctx.strokeStyle = Colors.pair1.stroke;
        ctx.lineWidth = 2;
        ctx.stroke();
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 0, -20);

        // Angle label at C (positioned near the angle sector)
        ctx.font = 'bold 16px STIX Two Text, serif';
        ctx.fillStyle = Colors.pair1.stroke;
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(actualAngle)}°`, C.x, C.y + 50);

        // Angle label at O (central angle = 120°) - position below O where the angle is
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.fillText('120°', O.x, O.y + 55);

        // Drag hint
        ctx.font = '12px STIX Two Text, serif';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText('↔ Drag C', C.x, C.y - 35);
    },

    // ============================================
    // PAGE 7: The Theorem
    // Clean diagram showing x and 2x relationship
    // ============================================
    drawPage7(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 200, y: 175 };
        const radius = 115;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // C at top, A and B at bottom (120° central, 60° inscribed)
        const C = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-90));
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(150));
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(30));

        // Draw radii from O to A and B
        GeometryUtils.drawSegment(ctx, O, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, O, B, '#333333', 2);

        // Draw chords from C
        GeometryUtils.drawSegment(ctx, C, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, C, B, '#333333', 2);

        // Angle at C (inscribed angle = x)
        GeometryUtils.drawAngleSector(ctx, C, A, B, 35, Colors.pair1.fill, Colors.pair1.stroke);

        // Angle at O (central angle = 2x)
        GeometryUtils.drawAngleSector(ctx, O, A, B, 40, Colors.pair2.fill, Colors.pair2.stroke);

        // Point labels
        GeometryUtils.drawPoint(ctx, O.x, O.y, 'O', 0, 18);
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', -14, 5);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', 14, 5);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 0, -18);
    },

    // ============================================
    // PAGE 8: The Proof diagram with point D
    // ============================================
    drawPage8(canvas) {
        const width = 400, height = 340;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 200, y: 170 };
        const radius = 115;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // C off-center at top, D diametrically opposite, A and B on sides
        const C = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-115));
        const D = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(65));
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(150));
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(30));

        // Draw diameter CD (dashed)
        ctx.setLineDash([5, 5]);
        GeometryUtils.drawSegment(ctx, C, D, '#999999', 1.5);
        ctx.setLineDash([]);

        // Draw radii to A and B
        GeometryUtils.drawSegment(ctx, O, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, O, B, '#333333', 2);

        // Draw chords from C to A and B
        GeometryUtils.drawSegment(ctx, C, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, C, B, '#333333', 2);

        // Show angle at C split into a and b
        GeometryUtils.drawAngleSector(ctx, C, A, O, 35, 'rgba(59, 130, 246, 0.2)', Colors.pair1.stroke);
        GeometryUtils.drawAngleSector(ctx, C, O, B, 35, 'rgba(139, 92, 246, 0.2)', 'rgb(139, 92, 246)');

        // Show angles 2a and 2b at O (AOD and BOD)
        GeometryUtils.drawAngleSector(ctx, O, A, D, 30, 'rgba(59, 130, 246, 0.2)', Colors.pair1.stroke);
        GeometryUtils.drawAngleSector(ctx, O, D, B, 30, 'rgba(139, 92, 246, 0.2)', 'rgb(139, 92, 246)');

        // Point labels
        GeometryUtils.drawPoint(ctx, O.x, O.y, 'O', 10, -12);
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', -14, 5);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', 14, 5);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', -12, -14);
        GeometryUtils.drawPoint(ctx, D.x, D.y, 'D', 10, 10);

        // a and b labels at C (tight to radius CD)
        ctx.font = 'italic 14px STIX Two Text, serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = Colors.pair1.stroke;
        ctx.fillText('a', C.x - 8, C.y + 48);
        ctx.fillStyle = 'rgb(139, 92, 246)';
        ctx.fillText('b', C.x + 22, C.y + 42);

        // 2a and 2b labels at O
        ctx.fillStyle = Colors.pair1.stroke;
        ctx.fillText('2a', O.x - 38, O.y + 35);
        ctx.fillStyle = 'rgb(139, 92, 246)';
        ctx.fillText('2b', O.x + 25, O.y + 45);
    },

    // ============================================
    // PAGE 9: Corollary - angles X and Y are equal
    // ============================================
    drawPage9(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 200, y: 175 };
        const radius = 115;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // A and B at bottom
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(150));
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(30));

        // X and Y on the major arc (top)
        const X = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-120));
        const Y = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-60));

        // Draw radii to A and B
        GeometryUtils.drawSegment(ctx, O, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, O, B, '#333333', 2);

        // Draw chords from X to A and B
        GeometryUtils.drawSegment(ctx, X, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, X, B, '#333333', 2);

        // Draw chords from Y to A and B
        GeometryUtils.drawSegment(ctx, Y, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, Y, B, '#333333', 2);

        // Angle at X
        GeometryUtils.drawAngleSector(ctx, X, A, B, 30, Colors.pair1.fill, Colors.pair1.stroke);

        // Angle at Y
        GeometryUtils.drawAngleSector(ctx, Y, A, B, 30, 'rgba(139, 92, 246, 0.3)', 'rgb(139, 92, 246)');

        // Central angle at O
        GeometryUtils.drawAngleSector(ctx, O, A, B, 35, Colors.pair2.fill, Colors.pair2.stroke);

        // Point labels
        GeometryUtils.drawPoint(ctx, O.x, O.y, 'O', 0, 18);
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', -14, 5);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', 14, 5);
        GeometryUtils.drawPoint(ctx, X.x, X.y, 'X', -14, -10);
        GeometryUtils.drawPoint(ctx, Y.x, Y.y, 'Y', 14, -10);
    },

    // ============================================
    // PAGE 10: Exercise - Corollary application
    // ============================================
    drawPage10(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const O = { x: 200, y: 175 };
        const radius = 115;

        // Draw circle
        GeometryUtils.drawCircle(ctx, O, radius);

        // A and B at bottom
        const A = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(160));
        const B = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(20));

        // X and Y on the major arc (top)
        const X = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-130));
        const Y = GeometryUtils.pointOnCircle(O, radius, GeometryUtils.toRadians(-50));

        // Draw chords from X to A and B
        GeometryUtils.drawSegment(ctx, X, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, X, B, '#333333', 2);

        // Draw chords from Y to A and B
        GeometryUtils.drawSegment(ctx, Y, A, '#333333', 2);
        GeometryUtils.drawSegment(ctx, Y, B, '#333333', 2);

        // Angle at X (known: 35°)
        GeometryUtils.drawAngleSector(ctx, X, A, B, 30, Colors.pair1.fill, Colors.pair1.stroke);

        // Angle at Y (unknown: ?)
        GeometryUtils.drawAngleSector(ctx, Y, A, B, 30, Colors.pair2.fill, Colors.pair2.stroke);

        // Point labels
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', -14, 5);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', 14, 5);
        GeometryUtils.drawPoint(ctx, X.x, X.y, 'X', -14, -10);
        GeometryUtils.drawPoint(ctx, Y.x, Y.y, 'Y', 14, -10);

        // Angle labels
        ctx.font = '14px STIX Two Text, serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = Colors.pair1.stroke;
        ctx.fillText('35°', X.x + 15, X.y + 45);
        ctx.font = 'bold 16px STIX Two Text, serif';
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.fillText('?', Y.x - 15, Y.y + 45);
    }
};
