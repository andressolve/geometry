/**
 * Diagram Drawing Functions for Lesson 8: Tangent Lines
 */

const Diagrams = {
    // ============================================
    // PAGE 0: COVER
    // Circle with a tangent line
    // ============================================
    drawCover(canvas) {
        const ctx = setupCanvas(canvas, 400, 280);

        const center = { x: 200, y: 180 };
        const radius = 80;

        // Draw circle
        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2.5);

        // Point of tangency at bottom
        const P = { x: center.x, y: center.y + radius };

        // Tangent line (horizontal)
        const lineLeft = { x: 50, y: P.y };
        const lineRight = { x: 350, y: P.y };
        GeometryUtils.drawSegment(ctx, lineLeft, lineRight, '#333333', 2);

        // Radius to tangent point
        GeometryUtils.drawSegment(ctx, center, P, '#999999', 1.5);

        // Right angle marker
        const rightP1 = { x: P.x - 10, y: P.y };
        const rightP2 = { x: P.x, y: P.y - 10 };
        GeometryUtils.drawRightAngle(ctx, P, rightP1, rightP2, 10, '#999999');

        // Point labels
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', 15, -5);
        GeometryUtils.drawPoint(ctx, P.x, P.y, 'P', 15, 5);
    },

    // ============================================
    // PAGE 1: WHAT IS A TANGENT LINE?
    // Circle with a clear tangent line
    // ============================================
    drawPage1(canvas) {
        const ctx = setupCanvas(canvas, 400, 320);

        const center = { x: 200, y: 180 };
        const radius = 80;

        // Draw circle
        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2.5);

        // Point of tangency at bottom-right
        const angle = -Math.PI / 6; // 30 degrees below horizontal
        const P = GeometryUtils.pointOnCircle(center, radius, angle);

        // Tangent line (perpendicular to radius at P)
        const perpAngle = angle + Math.PI / 2;
        const lineLength = 150;
        const tangentP1 = {
            x: P.x + lineLength * Math.cos(perpAngle),
            y: P.y + lineLength * Math.sin(perpAngle)
        };
        const tangentP2 = {
            x: P.x - lineLength * Math.cos(perpAngle),
            y: P.y - lineLength * Math.sin(perpAngle)
        };
        GeometryUtils.drawSegment(ctx, tangentP1, tangentP2, '#10b981', 2.5);

        // Radius to tangent point (dashed)
        GeometryUtils.drawDashedSegment(ctx, center, P, '#999999', 1.5);

        // Right angle marker - pointing toward interior (toward center)
        const rightP1 = {
            x: P.x - 12 * Math.cos(angle), // Toward center (negative of radius direction)
            y: P.y - 12 * Math.sin(angle)
        };
        const rightP2 = {
            x: P.x + 12 * Math.cos(perpAngle),
            y: P.y + 12 * Math.sin(perpAngle)
        };
        GeometryUtils.drawRightAngle(ctx, P, rightP1, rightP2, 10, '#999999');

        // Point labels
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', -15, -10);
        GeometryUtils.drawPoint(ctx, P.x, P.y, 'P', 12, 12);

        // Label tangent line
        GeometryUtils.drawLabel(ctx, tangentP1.x - 20, tangentP1.y - 10, 'tangent line', {
            font: 'italic 14px STIX Two Text',
            color: '#10b981'
        });
    },

    // ============================================
    // PAGE 2: TWO WAYS TO MEET
    // Two examples: tangent, secant
    // ============================================
    drawPage2(canvas) {
        const ctx = setupCanvas(canvas, 450, 200);

        const radius = 55;
        const centerY = 100;

        // Example 1: Tangent
        const center1 = { x: 120, y: centerY };
        GeometryUtils.drawCircle(ctx, center1, radius, '#6a82fb', 2);
        const tangentPoint = { x: center1.x, y: center1.y + radius };
        GeometryUtils.drawSegment(ctx, { x: 40, y: tangentPoint.y }, { x: 200, y: tangentPoint.y }, '#10b981', 2.5);
        GeometryUtils.drawPoint(ctx, tangentPoint.x, tangentPoint.y, '', 0, 0, 4);
        GeometryUtils.drawLabel(ctx, center1.x, 175, 'Tangent', { color: '#10b981', font: 'bold 15px STIX Two Text' });
        GeometryUtils.drawLabel(ctx, center1.x, 190, 'touches once', { color: '#10b981', font: 'italic 12px STIX Two Text' });

        // Example 2: Secant
        const center2 = { x: 330, y: centerY };
        GeometryUtils.drawCircle(ctx, center2, radius, '#6a82fb', 2);
        const secantP1 = GeometryUtils.pointOnCircle(center2, radius, Math.PI * 0.7);
        const secantP2 = GeometryUtils.pointOnCircle(center2, radius, -Math.PI * 0.3);
        GeometryUtils.drawLine(ctx, secantP1, secantP2, 450, 200, '#dc2626', 2.5);
        GeometryUtils.drawPoint(ctx, secantP1.x, secantP1.y, '', 0, 0, 4);
        GeometryUtils.drawPoint(ctx, secantP2.x, secantP2.y, '', 0, 0, 4);
        GeometryUtils.drawLabel(ctx, center2.x, 175, 'Secant', { color: '#dc2626', font: 'bold 15px STIX Two Text' });
        GeometryUtils.drawLabel(ctx, center2.x, 190, 'crosses through', { color: '#dc2626', font: 'italic 12px STIX Two Text' });
    },

    // ============================================
    // PAGE 3: LOOKING AT SECANTS
    // Secant line creating isosceles triangle with center
    // ============================================
    drawPage3(canvas) {
        const ctx = setupCanvas(canvas, 400, 320);

        const center = { x: 200, y: 180 };
        const radius = 90;

        // Points A and B on circle - positioned so secant doesn't go through center
        const A = GeometryUtils.pointOnCircle(center, radius, Math.PI * 0.6);
        const B = GeometryUtils.pointOnCircle(center, radius, -Math.PI * 0.15);

        // Draw circle
        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);

        // Draw secant line (extended)
        GeometryUtils.drawLine(ctx, A, B, 400, 320, '#333333', 2);

        // Draw triangle OAB
        GeometryUtils.drawSegment(ctx, center, A, Colors.pair2.stroke, 2);
        GeometryUtils.drawSegment(ctx, center, B, Colors.pair2.stroke, 2);

        // Tick marks to show OA = OB
        GeometryUtils.drawTickMarks(ctx, center.x, center.y, A.x, A.y, 1, Colors.pair2.stroke);
        GeometryUtils.drawTickMarks(ctx, center.x, center.y, B.x, B.y, 1, Colors.pair2.stroke);

        // Labels
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', 15, -5);
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', -15, -10);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', 15, 10);
    },

    // ============================================
    // PAGE 4: WARM-UP EXERCISE
    // Isosceles triangle, angle at A is 70°
    // ============================================
    drawPage4(canvas) {
        const ctx = setupCanvas(canvas, 400, 320);

        const center = { x: 200, y: 200 };
        const radius = 90;

        // Points A and B positioned to make 70-degree angles more obvious
        // Place center angle at 40 degrees, so each base angle is (180-40)/2 = 70 degrees
        // Use 3*PI/4 as base (upper left) to avoid horizontal line
        const centerAngle = 40 * Math.PI / 180;
        const baseAngle = 3 * Math.PI / 4; // 135 degrees
        const A = GeometryUtils.pointOnCircle(center, radius, baseAngle + centerAngle / 2);
        const B = GeometryUtils.pointOnCircle(center, radius, baseAngle - centerAngle / 2);

        // Draw circle
        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);

        // Draw secant line
        GeometryUtils.drawLine(ctx, A, B, 400, 320, '#333333', 2);

        // Draw triangle
        GeometryUtils.drawSegment(ctx, center, A, Colors.pair2.stroke, 2);
        GeometryUtils.drawSegment(ctx, center, B, Colors.pair2.stroke, 2);

        // Tick marks
        GeometryUtils.drawTickMarks(ctx, center.x, center.y, A.x, A.y, 1, Colors.pair2.stroke);
        GeometryUtils.drawTickMarks(ctx, center.x, center.y, B.x, B.y, 1, Colors.pair2.stroke);

        // Angle markers
        GeometryUtils.drawAngleArc(ctx, A, center, B, 25, 1, Colors.pair1.stroke);
        GeometryUtils.drawAngleArc(ctx, B, center, A, 25, 1, Colors.pair1.stroke);

        // Labels
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', 15, 5);
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', -15, -5);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -5, 15);

        // Angle labels
        GeometryUtils.drawLabel(ctx, A.x + 25, A.y + 15, '70°', { color: Colors.pair1.stroke, font: 'bold 16px STIX Two Text' });
    },

    // ============================================
    // PAGE 5: A PERPENDICULAR LINE
    // Radius with perpendicular line at endpoint
    // ============================================
    drawPage5(canvas) {
        const ctx = setupCanvas(canvas, 400, 320);

        const center = { x: 200, y: 160 };
        const radius = 80;

        // Point P at an angle (not horizontal/vertical)
        const radiusAngle = -Math.PI / 6; // 30 degrees below horizontal
        const P = GeometryUtils.pointOnCircle(center, radius, radiusAngle);

        // Draw circle
        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);

        // Draw radius OP
        GeometryUtils.drawSegment(ctx, center, P, Colors.pair2.stroke, 2.5);

        // Draw perpendicular line at P
        const perpAngle = radiusAngle + Math.PI / 2;
        const lineLength = 140;
        const lineP1 = {
            x: P.x + lineLength * Math.cos(perpAngle),
            y: P.y + lineLength * Math.sin(perpAngle)
        };
        const lineP2 = {
            x: P.x - lineLength * Math.cos(perpAngle),
            y: P.y - lineLength * Math.sin(perpAngle)
        };
        GeometryUtils.drawSegment(ctx, lineP1, lineP2, '#333333', 2);

        // Right angle marker - pointing toward interior (toward center)
        const rightP1 = {
            x: P.x - 15 * Math.cos(radiusAngle), // Toward center
            y: P.y - 15 * Math.sin(radiusAngle)
        };
        const rightP2 = {
            x: P.x + 15 * Math.cos(perpAngle),
            y: P.y + 15 * Math.sin(perpAngle)
        };
        GeometryUtils.drawRightAngle(ctx, P, rightP1, rightP2, 12, '#333333');

        // Labels
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', -15, -10);
        GeometryUtils.drawPoint(ctx, P.x, P.y, 'P', 12, 12);
    },

    // ============================================
    // PAGE 6: LET'S SUPPOSE IT DOES
    // Line crossing circle at two points P and Q, base angles ~85°
    // ============================================
    drawPage6(canvas) {
        const ctx = setupCanvas(canvas, 400, 320);

        const center = { x: 200, y: 160 };
        const radius = 80;

        // For base angles close to 90° (say 85°), the central angle POQ = 180 - 2*85 = 10°
        // Place P and Q 10° apart on the circle
        const midAngle = -Math.PI / 6;  // Middle of PQ arc
        const halfSpread = 5 * Math.PI / 180;  // 5° each side = 10° total
        const P = GeometryUtils.pointOnCircle(center, radius, midAngle - halfSpread);
        const Q = GeometryUtils.pointOnCircle(center, radius, midAngle + halfSpread);

        // Draw circle
        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);

        // Draw line through P and Q, extended beyond the circle
        const dx = Q.x - P.x;
        const dy = Q.y - P.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const extend = 100;
        const lineP1 = { x: P.x - ux * extend, y: P.y - uy * extend };
        const lineP2 = { x: Q.x + ux * extend, y: Q.y + uy * extend };
        GeometryUtils.drawSegment(ctx, lineP1, lineP2, '#333333', 2);

        // Draw triangle OPQ with flat line caps so the center has no arc
        ctx.save();
        ctx.lineCap = 'butt';
        GeometryUtils.drawSegment(ctx, center, P, Colors.pair2.stroke, 2.5);
        GeometryUtils.drawSegment(ctx, center, Q, Colors.pair2.stroke, 2.5);
        ctx.restore();





        // Labels - on right side of line (away from center)
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', -15, -10);
        GeometryUtils.drawPoint(ctx, P.x, P.y, 'P', 10, -8);
        GeometryUtils.drawPoint(ctx, Q.x, Q.y, 'Q', 12, 0);
    },

    // ============================================
    // PAGE 7: EXERCISE - WHAT ARE THE ANGLES?
    // Same as page 6 but with angle at P labeled 90°
    // ============================================
    drawPage7(canvas) {
        const ctx = setupCanvas(canvas, 400, 320);

        const center = { x: 200, y: 160 };
        const radius = 80;

        // Same geometry as page 6: base angles ~85°, central angle ~10°
        const midAngle = -Math.PI / 6;
        const halfSpread = 5 * Math.PI / 180;
        const P = GeometryUtils.pointOnCircle(center, radius, midAngle - halfSpread);
        const Q = GeometryUtils.pointOnCircle(center, radius, midAngle + halfSpread);

        // Draw circle
        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);

        // Draw line through P and Q, extended beyond the circle
        const dx = Q.x - P.x;
        const dy = Q.y - P.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const extend = 100;
        const lineP1 = { x: P.x - ux * extend, y: P.y - uy * extend };
        const lineP2 = { x: Q.x + ux * extend, y: Q.y + uy * extend };
        GeometryUtils.drawSegment(ctx, lineP1, lineP2, '#333333', 2);

        // Draw triangle with flat line caps so the center has no arc
        ctx.save();
        ctx.lineCap = 'butt';
        GeometryUtils.drawSegment(ctx, center, P, Colors.pair2.stroke, 2.5);
        GeometryUtils.drawSegment(ctx, center, Q, Colors.pair2.stroke, 2.5);
        ctx.restore();





        // Labels
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', -15, -10);
        GeometryUtils.drawPoint(ctx, P.x, P.y, 'P', 12, -8);
        GeometryUtils.drawPoint(ctx, Q.x, Q.y, 'Q', 12, 0);

    },

    // ============================================
    // PAGE 8: SOMETHING'S WRONG!
    // Triangle with angles labeled showing contradiction
    // ============================================
    drawPage8(canvas) {
        const ctx = setupCanvas(canvas, 400, 320);

        const center = { x: 200, y: 160 };
        const radius = 80;

        // Same geometry as pages 6-7: both P and Q on circle, base angles ~85°
        const midAngle = -Math.PI / 6;
        const halfSpread = 5 * Math.PI / 180;
        const P = GeometryUtils.pointOnCircle(center, radius, midAngle - halfSpread);
        const Q = GeometryUtils.pointOnCircle(center, radius, midAngle + halfSpread);

        // Draw circle (faded)
        GeometryUtils.drawCircle(ctx, center, radius, '#cccccc', 1.5);

        // Draw line through P and Q (faded)
        const dx = Q.x - P.x;
        const dy = Q.y - P.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const extend = 100;
        const lineP1 = { x: P.x - ux * extend, y: P.y - uy * extend };
        const lineP2 = { x: Q.x + ux * extend, y: Q.y + uy * extend };
        GeometryUtils.drawSegment(ctx, lineP1, lineP2, '#cccccc', 1.5);

        // Draw triangle (emphasized with warning color)
        GeometryUtils.drawTriangle(ctx, center, P, Q, Colors.warning.stroke, 3);



        // Labels
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', -15, -10);
        GeometryUtils.drawPoint(ctx, P.x, P.y, 'P', 12, -12);
        GeometryUtils.drawPoint(ctx, Q.x, Q.y, 'Q', 12, 0);
    },

    // ============================================
    // PAGE 9: THE PROOF (REFERENCE DIAGRAM)
    // Clean diagram for the proof
    // ============================================
    drawPage9(canvas) {
        const ctx = setupCanvas(canvas, 400, 320);

        const center = { x: 200, y: 160 };
        const radius = 80;

        // Use same angle as pages 5-8
        const radiusAngle = -Math.PI / 6;
        const perpAngle = radiusAngle + Math.PI / 2;
        const P = GeometryUtils.pointOnCircle(center, radius, radiusAngle);

        // Draw circle
        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);

        // Draw radius OP
        GeometryUtils.drawSegment(ctx, center, P, Colors.pair2.stroke, 2.5);

        // Draw perpendicular line at P
        const lineLength = 140;
        const lineP1 = {
            x: P.x + lineLength * Math.cos(perpAngle),
            y: P.y + lineLength * Math.sin(perpAngle)
        };
        const lineP2 = {
            x: P.x - lineLength * Math.cos(perpAngle),
            y: P.y - lineLength * Math.sin(perpAngle)
        };
        GeometryUtils.drawSegment(ctx, lineP1, lineP2, '#333333', 2);

        // Right angle marker - pointing toward interior (toward center)
        const rightP1 = {
            x: P.x - 15 * Math.cos(radiusAngle), // Toward center
            y: P.y - 15 * Math.sin(radiusAngle)
        };
        const rightP2 = {
            x: P.x + 15 * Math.cos(perpAngle),
            y: P.y + 15 * Math.sin(perpAngle)
        };
        GeometryUtils.drawRightAngle(ctx, P, rightP1, rightP2, 12, '#333333');

        // Labels
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', -15, -10);
        GeometryUtils.drawPoint(ctx, P.x, P.y, 'P', 12, -12);
    },

    // ============================================
    // PAGE 10: THE THEOREM
    // Clean illustration of the theorem result
    // ============================================
    drawPage10(canvas) {
        const ctx = setupCanvas(canvas, 400, 320);

        const center = { x: 200, y: 180 };
        const radius = 80;

        // Use an angled radius (not horizontal/vertical)
        const radiusAngle = -Math.PI / 5; // About 36 degrees below horizontal
        const perpAngle = radiusAngle + Math.PI / 2;
        const P = GeometryUtils.pointOnCircle(center, radius, radiusAngle);

        // Draw circle
        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2.5);

        // Draw radius OP
        GeometryUtils.drawSegment(ctx, center, P, Colors.pair2.stroke, 2.5);

        // Draw tangent line (perpendicular to radius)
        const lineLength = 150;
        const tangentP1 = {
            x: P.x + lineLength * Math.cos(perpAngle),
            y: P.y + lineLength * Math.sin(perpAngle)
        };
        const tangentP2 = {
            x: P.x - lineLength * Math.cos(perpAngle),
            y: P.y - lineLength * Math.sin(perpAngle)
        };
        GeometryUtils.drawSegment(ctx, tangentP1, tangentP2, '#10b981', 3);

        // Right angle marker - pointing toward interior (toward center)
        const rightP1 = {
            x: P.x - 12 * Math.cos(radiusAngle), // Toward center
            y: P.y - 12 * Math.sin(radiusAngle)
        };
        const rightP2 = {
            x: P.x + 12 * Math.cos(perpAngle),
            y: P.y + 12 * Math.sin(perpAngle)
        };
        GeometryUtils.drawRightAngle(ctx, P, rightP1, rightP2, 12, '#10b981');

        // Labels
        GeometryUtils.drawPoint(ctx, center.x, center.y, 'O', -15, -10);
        GeometryUtils.drawPoint(ctx, P.x, P.y, 'P', 12, 12);

        // Label tangent line
        GeometryUtils.drawLabel(ctx, tangentP1.x - 25, tangentP1.y - 10, 'tangent', {
            color: '#10b981',
            font: 'italic 14px STIX Two Text'
        });
    },

    // ============================================
    // PAGE 11: PRACTICE
    // Four diagrams for identifying tangent lines
    // ============================================
    drawPage11A(canvas) {
        // Diagram A: Tangent (perpendicular at endpoint)
        const ctx = setupCanvas(canvas, 180, 140);
        const center = { x: 90, y: 80 };
        const radius = 45;
        const P = { x: center.x + radius, y: center.y };

        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);
        GeometryUtils.drawSegment(ctx, center, P, '#999999', 1.5);
        GeometryUtils.drawSegment(ctx, { x: P.x, y: 20 }, { x: P.x, y: 130 }, '#333333', 2);

        // Right angle marker - pointing toward interior (toward center)
        const rightP1 = { x: P.x - 10, y: P.y }; // Toward center
        const rightP2 = { x: P.x, y: P.y + 10 }; // Along perpendicular line
        GeometryUtils.drawRightAngle(ctx, P, rightP1, rightP2, 8, '#333333');

        GeometryUtils.drawPoint(ctx, P.x, P.y, '', 0, 0, 3);
    },

    drawPage11B(canvas) {
        // Diagram B: Secant (crosses at two points)
        const ctx = setupCanvas(canvas, 180, 140);
        const center = { x: 90, y: 70 };
        const radius = 45;

        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);

        const A = GeometryUtils.pointOnCircle(center, radius, Math.PI * 0.7);
        const B = GeometryUtils.pointOnCircle(center, radius, -Math.PI * 0.3);
        GeometryUtils.drawLine(ctx, A, B, 180, 140, '#333333', 2);

        GeometryUtils.drawPoint(ctx, A.x, A.y, '', 0, 0, 3);
        GeometryUtils.drawPoint(ctx, B.x, B.y, '', 0, 0, 3);
    },

    drawPage11C(canvas) {
        // Diagram C: Perpendicular but not at endpoint
        const ctx = setupCanvas(canvas, 180, 140);
        const center = { x: 90, y: 70 };
        const radius = 45;

        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);

        // Vertical line that doesn't pass through tangent point properly
        const lineX = center.x + radius / 2;
        GeometryUtils.drawSegment(ctx, { x: lineX, y: 10 }, { x: lineX, y: 130 }, '#333333', 2);

        // Radius to a point
        const P = { x: center.x + radius, y: center.y };
        GeometryUtils.drawSegment(ctx, center, P, '#999999', 1.5);

        // Right angle but at wrong location
        const rightP1 = { x: lineX, y: center.y + 10 };
        const rightP2 = { x: lineX - 10, y: center.y };
        GeometryUtils.drawRightAngle(ctx, { x: lineX, y: center.y }, rightP1, rightP2, 8, '#333333');
    },

    drawPage11D(canvas) {
        // Diagram D: Tangent (perpendicular at endpoint, different orientation)
        const ctx = setupCanvas(canvas, 180, 140);
        const center = { x: 90, y: 70 };
        const radius = 45;

        const angle = Math.PI / 4; // 45 degrees
        const P = GeometryUtils.pointOnCircle(center, radius, angle);

        GeometryUtils.drawCircle(ctx, center, radius, '#6a82fb', 2);
        GeometryUtils.drawSegment(ctx, center, P, '#999999', 1.5);

        // Tangent line perpendicular to radius
        const perpAngle = angle + Math.PI / 2;
        const tangentP1 = {
            x: P.x + 60 * Math.cos(perpAngle),
            y: P.y + 60 * Math.sin(perpAngle)
        };
        const tangentP2 = {
            x: P.x - 60 * Math.cos(perpAngle),
            y: P.y - 60 * Math.sin(perpAngle)
        };
        GeometryUtils.drawSegment(ctx, tangentP1, tangentP2, '#333333', 2);

        // Right angle marker - positioned correctly on interior side
        const rightP1 = {
            x: P.x - 10 * Math.cos(angle), // Toward center
            y: P.y - 10 * Math.sin(angle)
        };
        const rightP2 = {
            x: P.x + 10 * Math.cos(perpAngle),
            y: P.y + 10 * Math.sin(perpAngle)
        };
        GeometryUtils.drawRightAngle(ctx, P, rightP1, rightP2, 8, '#333333');

        GeometryUtils.drawPoint(ctx, P.x, P.y, '', 0, 0, 3);
    }
};
