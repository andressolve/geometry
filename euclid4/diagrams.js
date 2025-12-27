/**
 * Diagram Drawing Functions for Lesson 4: Practice Session
 * 
 * All 19 problems with Canvas-based diagrams
 */

const Diagrams = {
    // ============================================
    // HELPER: Draw parallel mark (chevron)
    // ============================================
    drawParallelMark(ctx, x, y) {
        ctx.save();
        ctx.strokeStyle = '#3d3d3d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 4, y - 5);
        ctx.lineTo(x + 4, y);
        ctx.lineTo(x - 4, y + 5);
        ctx.stroke();
        ctx.restore();
    },

    // ============================================
    // HELPER: Draw standard parallel lines + transversal
    // Used for problems 9-19
    // ============================================
    drawParallelSetup(ctx, width, height, options = {}) {
        const {
            highlightAngles = {},  // e.g., { 'a': Colors.given, 'e': Colors.unknown }
            showLabels = true,
            givenValue = null,     // e.g., { angle: 'a', value: '63°' }
            unknownAngles = []     // e.g., ['e'] - will show ? mark
        } = options;

        const margin = 60;
        const lineL_y = height * 0.30;
        const lineM_y = height * 0.70;

        // Line endpoints
        const L_left = { x: margin, y: lineL_y };
        const L_right = { x: width - margin, y: lineL_y };
        const M_left = { x: margin, y: lineM_y };
        const M_right = { x: width - margin, y: lineM_y };
        const T_top = { x: width * 0.40, y: 25 };
        const T_bottom = { x: width * 0.60, y: height - 25 };

        // Intersection points
        const upperInt = { x: width * 0.45, y: lineL_y };
        const lowerInt = { x: width * 0.55, y: lineM_y };

        // Define the 8 angles using lowercase letters (a-h)
        // a-d at upper intersection, e-h at lower intersection
        const angles = {
            'a': { vertex: upperInt, p1: L_left, p2: T_top },       // upper-left
            'b': { vertex: upperInt, p1: T_top, p2: L_right },      // upper-right
            'c': { vertex: upperInt, p1: L_right, p2: T_bottom },   // lower-right
            'd': { vertex: upperInt, p1: T_bottom, p2: L_left },    // lower-left
            'e': { vertex: lowerInt, p1: M_left, p2: T_top },       // upper-left
            'f': { vertex: lowerInt, p1: T_top, p2: M_right },      // upper-right
            'g': { vertex: lowerInt, p1: M_right, p2: T_bottom },   // lower-right
            'h': { vertex: lowerInt, p1: T_bottom, p2: M_left }     // lower-left
        };

        // Draw only highlighted angles (not all 8)
        Object.entries(angles).forEach(([name, angle]) => {
            // Skip angles that aren't highlighted - reduces clutter
            if (!highlightAngles[name]) return;
            
            const colors = highlightAngles[name];
            let label = name;  // Default to angle letter
            
            // Override label for given/unknown values
            if (givenValue && givenValue.angle === name) {
                label = `${name} (${givenValue.value})`;
            } else if (unknownAngles.includes(name)) {
                label = `${name} = ?`;
            }

            GeometryUtils.drawAngleMark(ctx, angle.vertex, angle.p1, angle.p2, 
                colors.fill, colors.stroke, 25, label, 48);
        });

        // Draw lines
        ctx.strokeStyle = '#3d3d3d';
        ctx.lineWidth = 1.5;
        GeometryUtils.drawLine(ctx, L_left, L_right, 25);
        GeometryUtils.drawLine(ctx, M_left, M_right, 25);
        GeometryUtils.drawLine(ctx, T_top, T_bottom, 15);

        // Draw parallel marks
        this.drawParallelMark(ctx, (L_left.x + upperInt.x) / 2, lineL_y);
        this.drawParallelMark(ctx, (M_left.x + lowerInt.x) / 2, lineM_y);

        // Intersection points
        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, upperInt.x, upperInt.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, lowerInt.x, lowerInt.y, null, 0, 0, 3);

        // Line labels
        ctx.font = '18px STIX Two Text';
        ctx.fillStyle = '#3d3d3d';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ℓ', margin - 40, lineL_y);
        ctx.font = 'italic 18px STIX Two Text';
        ctx.fillText('m', margin - 40, lineM_y);
        ctx.fillText('t', T_top.x - 15, T_top.y);
    },

    // ============================================
    // SECTION 1: WARM-UP (Problems 1-4)
    // ============================================

    // Problem 1: Acute angle (45°)
    drawProblem1(canvas) {
        const width = 350, height = 250;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const vertex = { x: 100, y: 180 };
        const p1 = { x: 300, y: 180 };  // horizontal ray
        const p2 = { x: 220, y: 60 };   // 45° angle

        // Draw angle mark
        GeometryUtils.drawAngleMark(ctx, vertex, p1, p2, 
            Colors.unknown.fill, Colors.unknown.stroke, 35, '?', 55);

        // Draw rays
        GeometryUtils.drawRay(ctx, vertex, p1, 30);
        GeometryUtils.drawRay(ctx, vertex, p2, 30);

        // Draw point at vertex
        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, vertex.x, vertex.y, 'V', -15, 10, 4);
    },

    // Problem 2: Obtuse angle (135°)
    drawProblem2(canvas) {
        const width = 350, height = 250;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const vertex = { x: 175, y: 180 };
        const p1 = { x: 320, y: 180 };  // horizontal ray right
        const p2 = { x: 60, y: 80 };    // 135° angle (obtuse)

        // Draw angle mark
        GeometryUtils.drawAngleMark(ctx, vertex, p1, p2, 
            Colors.unknown.fill, Colors.unknown.stroke, 35, '?', 55);

        // Draw rays
        GeometryUtils.drawRay(ctx, vertex, p1, 30);
        GeometryUtils.drawRay(ctx, vertex, p2, 30);

        // Draw point
        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, vertex.x, vertex.y, 'V', 0, 20, 4);
    },

    // Problem 3: Linear pair (125° and x)
    drawProblem3(canvas) {
        const width = 400, height = 200;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const vertex = { x: 200, y: 130 };
        const left = { x: 40, y: 130 };
        const right = { x: 360, y: 130 };
        const up = { x: 280, y: 30 };

        // Draw 125° angle (given)
        GeometryUtils.drawAngleMark(ctx, vertex, left, up, 
            Colors.given.fill, Colors.given.stroke, 35, '125°', 55);

        // Draw x angle (unknown)
        GeometryUtils.drawAngleMark(ctx, vertex, up, right, 
            Colors.unknown.fill, Colors.unknown.stroke, 35, 'x', 55);

        // Draw line and ray
        GeometryUtils.drawLine(ctx, left, right, 25);
        GeometryUtils.drawRay(ctx, vertex, up, 30);

        // Point
        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, vertex.x, vertex.y, null, 0, 0, 3);
    },

    // Problem 4: Complementary angles (37° + ?)
    drawProblem4(canvas) {
        const width = 350, height = 250;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const vertex = { x: 80, y: 200 };
        const p1 = { x: 300, y: 200 };  // horizontal
        const p2 = { x: 80, y: 40 };    // vertical (90° total)
        const p3 = { x: 200, y: 85 };   // 37° from horizontal

        // Draw right angle marker
        GeometryUtils.drawRightAngle(ctx, vertex, p1, p2, 18);

        // Draw 37° angle (given)
        GeometryUtils.drawAngleMark(ctx, vertex, p1, p3, 
            Colors.given.fill, Colors.given.stroke, 40, '37°', 60);

        // Draw unknown angle
        GeometryUtils.drawAngleMark(ctx, vertex, p3, p2, 
            Colors.unknown.fill, Colors.unknown.stroke, 55, '?', 75);

        // Draw rays
        GeometryUtils.drawRay(ctx, vertex, p1, 30);
        GeometryUtils.drawRay(ctx, vertex, p2, 30);
        GeometryUtils.drawRay(ctx, vertex, p3, 30);

        // Label
        ctx.font = '14px STIX Two Text';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('(Complementary angles sum to 90°)', width / 2, height - 15);
    },

    // ============================================
    // SECTION 2: VERTICAL ANGLES (Problems 5-8)
    // ============================================

    // Problem 5: Find vertical angle (∠a = 72°, find ∠c)
    drawProblem5(canvas) {
        const width = 380, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const center = { x: width / 2, y: height / 2 };
        const A = { x: 50, y: height / 2 };
        const C = { x: width - 50, y: height / 2 };
        const B = { x: 100, y: height - 50 };
        const D = { x: width - 100, y: 50 };

        // Angles
        // ∠a (given, 72°) - between A and D
        GeometryUtils.drawAngleMark(ctx, center, A, D, 
            Colors.given.fill, Colors.given.stroke, 30, 'a (72°)', 55);
        
        // ∠b - between D and C
        GeometryUtils.drawAngleMark(ctx, center, D, C, 
            Colors.neutral.fill, Colors.neutral.stroke, 30, 'b', 50);
        
        // ∠c (unknown, vertical to ∠a) - between C and B
        GeometryUtils.drawAngleMark(ctx, center, C, B, 
            Colors.unknown.fill, Colors.unknown.stroke, 30, 'c = ?', 55);
        
        // ∠d - between B and A
        GeometryUtils.drawAngleMark(ctx, center, B, A, 
            Colors.neutral.fill, Colors.neutral.stroke, 30, 'd', 50);

        // Draw lines
        GeometryUtils.drawLine(ctx, A, C, 25);
        GeometryUtils.drawLine(ctx, B, D, 25);

        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, center.x, center.y, null, 0, 0, 3);
    },

    // Problem 6: Find all four angles (∠a = 118°)
    drawProblem6(canvas) {
        const width = 380, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const center = { x: width / 2, y: height / 2 };
        const A = { x: 50, y: height / 2 };
        const C = { x: width - 50, y: height / 2 };
        const B = { x: 90, y: height - 40 };
        const D = { x: width - 90, y: 40 };

        // ∠a (given, 118°)
        GeometryUtils.drawAngleMark(ctx, center, A, D, 
            Colors.given.fill, Colors.given.stroke, 30, 'a (118°)', 55);
        
        // ∠b (unknown)
        GeometryUtils.drawAngleMark(ctx, center, D, C, 
            Colors.unknown.fill, Colors.unknown.stroke, 30, 'b = ?', 55);
        
        // ∠c (unknown, vertical to a)
        GeometryUtils.drawAngleMark(ctx, center, C, B, 
            Colors.unknown.fill, Colors.unknown.stroke, 30, 'c = ?', 55);
        
        // ∠d (unknown)
        GeometryUtils.drawAngleMark(ctx, center, B, A, 
            Colors.unknown.fill, Colors.unknown.stroke, 30, 'd = ?', 55);

        // Draw lines
        GeometryUtils.drawLine(ctx, A, C, 25);
        GeometryUtils.drawLine(ctx, B, D, 25);

        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, center.x, center.y, null, 0, 0, 3);
    },

    // Problem 7: Algebraic vertical angles (simpler: 2x + 6 = 54)
    drawProblem7(canvas) {
        const width = 380, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const center = { x: width / 2, y: height / 2 };
        const A = { x: 50, y: height / 2 };
        const C = { x: width - 50, y: height / 2 };
        const B = { x: 100, y: height - 45 };
        const D = { x: width - 100, y: 45 };

        // First vertical angle: 54° (given)
        GeometryUtils.drawAngleMark(ctx, center, A, D, 
            Colors.given.fill, Colors.given.stroke, 30, '54°', 55);
        
        // Adjacent
        GeometryUtils.drawAngleMark(ctx, center, D, C, 
            Colors.neutral.fill, Colors.neutral.stroke, 30, null, 50);
        
        // Second vertical angle: (2x + 6)° (unknown)
        GeometryUtils.drawAngleMark(ctx, center, C, B, 
            Colors.unknown.fill, Colors.unknown.stroke, 30, '(2x+6)°', 55);
        
        // Adjacent
        GeometryUtils.drawAngleMark(ctx, center, B, A, 
            Colors.neutral.fill, Colors.neutral.stroke, 30, null, 50);

        // Draw lines
        GeometryUtils.drawLine(ctx, A, C, 25);
        GeometryUtils.drawLine(ctx, B, D, 25);

        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, center.x, center.y, null, 0, 0, 3);

        // Label
        ctx.font = '14px STIX Two Text';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('These are vertical angles', width / 2, height - 15);
    },

    // Problem 8: Identify vertical angle pairs
    drawProblem8(canvas) {
        const width = 380, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const center = { x: width / 2, y: height / 2 };
        const A = { x: 50, y: height / 2 };
        const C = { x: width - 50, y: height / 2 };
        const B = { x: 100, y: height - 50 };
        const D = { x: width - 100, y: 50 };

        // All angles with letters
        GeometryUtils.drawAngleMark(ctx, center, A, D, 
            Colors.highlight1.fill, Colors.highlight1.stroke, 30, 'a', 48);
        GeometryUtils.drawAngleMark(ctx, center, D, C, 
            Colors.highlight2.fill, Colors.highlight2.stroke, 30, 'b', 48);
        GeometryUtils.drawAngleMark(ctx, center, C, B, 
            Colors.highlight3.fill, Colors.highlight3.stroke, 30, 'c', 48);
        GeometryUtils.drawAngleMark(ctx, center, B, A, 
            Colors.highlight4.fill, Colors.highlight4.stroke, 30, 'd', 48);

        // Draw lines
        GeometryUtils.drawLine(ctx, A, C, 25);
        GeometryUtils.drawLine(ctx, B, D, 25);

        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, center.x, center.y, null, 0, 0, 3);
    },

    // ============================================
    // SECTION 3: PARALLEL LINES (Problems 9-15)
    // ============================================

    // Problem 9: Corresponding angles (∠a = 63°, find ∠e)
    drawProblem9(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelSetup(ctx, width, height, {
            highlightAngles: {
                'a': Colors.given,
                'e': Colors.unknown
            },
            givenValue: { angle: 'a', value: '63°' },
            unknownAngles: ['e']
        });
    },

    // Problem 10: Alternate interior (∠d = 127°, find ∠f)
    drawProblem10(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelSetup(ctx, width, height, {
            highlightAngles: {
                'd': Colors.given,
                'f': Colors.unknown
            },
            givenValue: { angle: 'd', value: '127°' },
            unknownAngles: ['f']
        });
    },

    // Problem 11: Co-interior (∠c = 72°, find ∠f)
    drawProblem11(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelSetup(ctx, width, height, {
            highlightAngles: {
                'c': Colors.given,
                'f': Colors.unknown
            },
            givenValue: { angle: 'c', value: '72°' },
            unknownAngles: ['f']
        });
    },

    // Problem 12: Mixed (∠b = 115°, find ∠g)
    drawProblem12(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelSetup(ctx, width, height, {
            highlightAngles: {
                'b': Colors.given,
                'g': Colors.unknown
            },
            givenValue: { angle: 'b', value: '115°' },
            unknownAngles: ['g']
        });
    },

    // Problem 13: Find ∠e given ∠c = 70°
    drawProblem13(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelSetup(ctx, width, height, {
            highlightAngles: {
                'c': Colors.given,
                'e': Colors.unknown
            },
            givenValue: { angle: 'c', value: '70°' },
            unknownAngles: ['e']
        });
    },

    // Problem 14: Find ∠e given ∠d = 65°
    drawProblem14(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelSetup(ctx, width, height, {
            highlightAngles: {
                'd': Colors.given,
                'e': Colors.unknown
            },
            givenValue: { angle: 'd', value: '65°' },
            unknownAngles: ['e']
        });
    },

    // Problem 15: Are they parallel? (∠c = 85°, ∠f = 85°)
    // Transversal at ~85° angle to make diagram honest
    drawProblem15(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Don't draw parallel marks for this one - student must determine
        const margin = 60;
        const lineL_y = height * 0.30;
        const lineM_y = height * 0.70;

        const L_left = { x: margin, y: lineL_y };
        const L_right = { x: width - margin, y: lineL_y };
        const M_left = { x: margin, y: lineM_y };
        const M_right = { x: width - margin, y: lineM_y };
        
        // Transversal nearly vertical (5° from vertical = 85° from horizontal)
        const T_top = { x: width * 0.48, y: 25 };
        const T_bottom = { x: width * 0.52, y: height - 25 };

        // Calculate intersection points with nearly vertical transversal
        const upperInt = { x: width * 0.49, y: lineL_y };
        const lowerInt = { x: width * 0.51, y: lineM_y };

        // Only draw the two relevant angles (c and f) - now actually ~85°
        // Angle c: from horizontal right to transversal going down
        const angleC = { vertex: upperInt, p1: L_right, p2: T_bottom };
        // Angle f: from transversal going down to horizontal right (same orientation as c)
        const angleF = { vertex: lowerInt, p1: T_bottom, p2: M_right };

        GeometryUtils.drawAngleMark(ctx, angleC.vertex, angleC.p1, angleC.p2, 
            Colors.given.fill, Colors.given.stroke, 25, 'c (85°)', 48);
        GeometryUtils.drawAngleMark(ctx, angleF.vertex, angleF.p1, angleF.p2, 
            Colors.highlight1.fill, Colors.highlight1.stroke, 25, 'f (85°)', 48);

        // Draw lines (NO parallel marks - question mark instead)
        ctx.strokeStyle = '#3d3d3d';
        ctx.lineWidth = 1.5;
        GeometryUtils.drawLine(ctx, L_left, L_right, 25);
        GeometryUtils.drawLine(ctx, M_left, M_right, 25);
        GeometryUtils.drawLine(ctx, T_top, T_bottom, 15);

        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, upperInt.x, upperInt.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, lowerInt.x, lowerInt.y, null, 0, 0, 3);

        // Line labels with question
        ctx.font = '18px STIX Two Text';
        ctx.fillStyle = '#3d3d3d';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ℓ', margin - 40, lineL_y);
        ctx.font = 'italic 18px STIX Two Text';
        ctx.fillText('m', margin - 40, lineM_y);
        ctx.fillText('t', T_top.x - 15, T_top.y);

        // Question mark between lines
        ctx.font = 'bold 24px STIX Two Text';
        ctx.fillStyle = '#7ca8e8';
        ctx.fillText('∥ ?', margin - 40, (lineL_y + lineM_y) / 2);
    },

    // ============================================
    // SECTION 4: COMBINED CHALLENGES (Problems 16-19)
    // ============================================

    // Problem 16: Multi-step (∠a = 58°, find ∠h)
    drawProblem16(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelSetup(ctx, width, height, {
            highlightAngles: {
                'a': Colors.given,
                'h': Colors.unknown
            },
            givenValue: { angle: 'a', value: '58°' },
            unknownAngles: ['h']
        });
    },

    // Problem 17: Multi-step (∠b = 134°, find ∠h)
    drawProblem17(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelSetup(ctx, width, height, {
            highlightAngles: {
                'b': Colors.given,
                'h': Colors.unknown
            },
            givenValue: { angle: 'b', value: '134°' },
            unknownAngles: ['h']
        });
    },

    // Problem 18: Algebraic (∠c = 2x+10, ∠e = 4x-30, alternate interior)
    drawProblem18(canvas) {
        const width = 420, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const margin = 60;
        const lineL_y = height * 0.30;
        const lineM_y = height * 0.70;

        const L_left = { x: margin, y: lineL_y };
        const L_right = { x: width - margin, y: lineL_y };
        const M_left = { x: margin, y: lineM_y };
        const M_right = { x: width - margin, y: lineM_y };
        const T_top = { x: width * 0.40, y: 25 };
        const T_bottom = { x: width * 0.60, y: height - 25 };

        const upperInt = { x: width * 0.45, y: lineL_y };
        const lowerInt = { x: width * 0.55, y: lineM_y };

        // Only draw the two relevant angles (c and e)
        const angleC = { vertex: upperInt, p1: L_right, p2: T_bottom };
        const angleE = { vertex: lowerInt, p1: M_left, p2: T_top };

        GeometryUtils.drawAngleMark(ctx, angleC.vertex, angleC.p1, angleC.p2, 
            Colors.given.fill, Colors.given.stroke, 25, 'c (50°)', 55);
        GeometryUtils.drawAngleMark(ctx, angleE.vertex, angleE.p1, angleE.p2, 
            Colors.unknown.fill, Colors.unknown.stroke, 25, 'e = (2x+10)°', 55);

        // Draw lines
        ctx.strokeStyle = '#3d3d3d';
        ctx.lineWidth = 1.5;
        GeometryUtils.drawLine(ctx, L_left, L_right, 25);
        GeometryUtils.drawLine(ctx, M_left, M_right, 25);
        GeometryUtils.drawLine(ctx, T_top, T_bottom, 15);

        this.drawParallelMark(ctx, (L_left.x + upperInt.x) / 2, lineL_y);
        this.drawParallelMark(ctx, (M_left.x + lowerInt.x) / 2, lineM_y);

        ctx.fillStyle = '#3d3d3d';
        GeometryUtils.drawPoint(ctx, upperInt.x, upperInt.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, lowerInt.x, lowerInt.y, null, 0, 0, 3);

        ctx.font = '18px STIX Two Text';
        ctx.fillStyle = '#3d3d3d';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ℓ', margin - 40, lineL_y);
        ctx.font = 'italic 18px STIX Two Text';
        ctx.fillText('m', margin - 40, lineM_y);
        ctx.fillText('t', T_top.x - 15, T_top.y);

        // Note
        ctx.font = '14px STIX Two Text';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('∠c and ∠e are equal', width / 2, height - 12);
    }
};
