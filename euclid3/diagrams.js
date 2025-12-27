/**
 * Diagram Drawing Functions for Lesson 3
 * 
 * Uses the same proven drawing approach from geometry-lesson-2.html
 * with simple point coordinates and direct drawing calls.
 */

const Diagrams = {
    // ============================================
    // PAGE 1: REVIEW - VERTICAL ANGLES
    // ============================================
    drawReview(canvas) {
        const width = 400, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Two intersecting lines (same pattern as Lesson 2)
        const B = { x: width / 2, y: height / 2 };
        const A = { x: 60, y: height / 2 };
        const C = { x: width - 60, y: height / 2 };
        const E = { x: 100, y: height - 50 };
        const G = { x: width - 100, y: 50 };

        // Draw vertical angle pairs with matching colors
        // Pair 1: blue (a and c are vertical/opposite)
        GeometryUtils.drawAngleMark(ctx, B, A, E, 
            'rgba(59, 130, 246, 0.3)', 'rgb(59, 130, 246)', 30, 'a', 50);
        GeometryUtils.drawAngleMark(ctx, B, C, G, 
            'rgba(59, 130, 246, 0.3)', 'rgb(59, 130, 246)', 30, 'c', 50);

        // Pair 2: green (b and d are vertical/opposite)
        GeometryUtils.drawAngleMark(ctx, B, E, C, 
            'rgba(16, 185, 129, 0.3)', 'rgb(16, 185, 129)', 30, 'b', 50);
        GeometryUtils.drawAngleMark(ctx, B, G, A, 
            'rgba(16, 185, 129, 0.3)', 'rgb(16, 185, 129)', 30, 'd', 50);

        // Draw lines
        GeometryUtils.drawLine(ctx, A, C, 25);
        GeometryUtils.drawLine(ctx, E, G, 25);

        // Legend
        ctx.font = '14px Noto Serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgb(59, 130, 246)';
        ctx.fillText('a = c (vertical)', 20, height - 20);
        ctx.fillStyle = 'rgb(16, 185, 129)';
        ctx.fillText('b = d (vertical)', 200, height - 20);
    },

    // ============================================
    // PAGE 2: PARALLEL LINES (NO TRANSVERSAL)
    // ============================================
    drawParallelLines(canvas) {
        const width = 450, height = 200;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const margin = 60;
        const lineL_y = 70;
        const lineM_y = 130;

        // Line ℓ endpoints
        const L_left = { x: margin, y: lineL_y };
        const L_right = { x: width - margin, y: lineL_y };

        // Line m endpoints
        const M_left = { x: margin, y: lineM_y };
        const M_right = { x: width - margin, y: lineM_y };

        // Draw lines
        GeometryUtils.drawLine(ctx, L_left, L_right, 30);
        GeometryUtils.drawLine(ctx, M_left, M_right, 30);

        // Draw parallel marks (small arrows on each line)
        this.drawParallelMark(ctx, (L_left.x + L_right.x) / 2 - 30, lineL_y);
        this.drawParallelMark(ctx, (M_left.x + M_right.x) / 2 - 30, lineM_y);

        // Labels (positioned further left to avoid overlap with lines)
        ctx.font = '18px Noto Serif';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText('ℓ', margin - 45, lineL_y + 5);
        ctx.font = 'italic 18px Noto Serif';
        ctx.fillText('m', margin - 45, lineM_y + 5);

        // Parallel symbol notation
        ctx.font = '16px Noto Serif';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText('ℓ ∥ m', width / 2, height - 25);
    },

    // Helper: draw parallel mark (chevron)
    drawParallelMark(ctx, x, y) {
        ctx.save();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 4, y - 5);
        ctx.lineTo(x + 4, y);
        ctx.lineTo(x - 4, y + 5);
        ctx.stroke();
        ctx.restore();
    },

    // ============================================
    // CORE: 8-ANGLE PARALLEL LINES DIAGRAM
    // ============================================
    /**
     * Draw the parallel lines + transversal diagram with 8 angles
     * Uses the same simple approach as page 1 (review diagram):
     * - Define actual points on the lines
     * - Pass vertex + two points on the rays to drawAngleMark
     */
    drawParallelWithTransversal(ctx, width, height, options = {}) {
        const {
            highlightAngles = [],
            highlightColor = { fill: 'rgba(59, 130, 246, 0.3)', stroke: 'rgb(59, 130, 246)' },
            showAllLabels = true,
            angleAValue = null
        } = options;

        // Define the geometry - same pattern as page 1
        const margin = 60;
        const lineL_y = height * 0.30;
        const lineM_y = height * 0.70;

        // Line ℓ endpoints (actual points on the line)
        const L_left = { x: margin, y: lineL_y };
        const L_right = { x: width - margin, y: lineL_y };

        // Line m endpoints (actual points on the line)
        const M_left = { x: margin, y: lineM_y };
        const M_right = { x: width - margin, y: lineM_y };

        // Transversal endpoints (actual points on the line)
        const T_top = { x: width * 0.40, y: 30 };
        const T_bottom = { x: width * 0.60, y: height - 30 };

        // Calculate intersection points
        // Upper intersection: where transversal crosses line ℓ
        const upperInt = { x: width * 0.45, y: lineL_y };
        // Lower intersection: where transversal crosses line m  
        const lowerInt = { x: width * 0.55, y: lineM_y };

        // Define the 8 angles using actual points on the lines (like page 1)
        // Upper intersection: a (upper-left), b (upper-right), c (lower-right), d (lower-left)
        // Lower intersection: e (upper-left), f (upper-right), g (lower-right), h (lower-left)
        const angles = {
            // At upper intersection - vertex is upperInt
            a: { vertex: upperInt, p1: L_left, p2: T_top },       // between left ray and up ray
            b: { vertex: upperInt, p1: T_top, p2: L_right },      // between up ray and right ray
            c: { vertex: upperInt, p1: L_right, p2: T_bottom },   // between right ray and down ray
            d: { vertex: upperInt, p1: T_bottom, p2: L_left },    // between down ray and left ray
            // At lower intersection - vertex is lowerInt
            e: { vertex: lowerInt, p1: M_left, p2: T_top },       // between left ray and up ray
            f: { vertex: lowerInt, p1: T_top, p2: M_right },      // between up ray and right ray
            g: { vertex: lowerInt, p1: M_right, p2: T_bottom },   // between right ray and down ray
            h: { vertex: lowerInt, p1: T_bottom, p2: M_left }     // between down ray and left ray
        };

        // Draw angles first (so lines draw on top)
        const neutralFill = 'rgba(200, 200, 200, 0.2)';
        const neutralStroke = 'rgba(150, 150, 150, 0.5)';

        Object.entries(angles).forEach(([name, angle]) => {
            const isHighlighted = highlightAngles.includes(name);
            const fill = isHighlighted ? highlightColor.fill : neutralFill;
            const stroke = isHighlighted ? highlightColor.stroke : neutralStroke;
            
            let label = showAllLabels ? name : (isHighlighted ? name : null);
            if (angleAValue && name === 'a') {
                label = angleAValue;
            }

            GeometryUtils.drawAngleMark(ctx, angle.vertex, angle.p1, angle.p2, 
                fill, stroke, 25, label, 40);
        });

        // Draw lines (on top of angle sectors)
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        GeometryUtils.drawLine(ctx, L_left, L_right, 25);
        GeometryUtils.drawLine(ctx, M_left, M_right, 25);
        GeometryUtils.drawLine(ctx, T_top, T_bottom, 15);

        // Draw parallel marks
        this.drawParallelMark(ctx, (L_left.x + upperInt.x) / 2, lineL_y);
        this.drawParallelMark(ctx, (M_left.x + lowerInt.x) / 2, lineM_y);

        // Draw intersection points
        ctx.fillStyle = '#333';
        GeometryUtils.drawPoint(ctx, upperInt.x, upperInt.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, lowerInt.x, lowerInt.y, null, 0, 0, 3);

        // Line labels
        ctx.font = '18px Noto Serif';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ℓ', margin - 40, lineL_y);
        ctx.font = 'italic 18px Noto Serif';
        ctx.fillText('m', margin - 40, lineM_y);
        ctx.fillText('t', T_top.x - 15, T_top.y);
    },

    /**
     * Draw parallel lines diagram with multiple color-coded angle pairs
     * @param {Object} options.coloredAngles - map of angle name to {fill, stroke}
     */
    drawParallelWithTransversalMultiColor(ctx, width, height, options = {}) {
        const {
            coloredAngles = {},
            showAllLabels = true
        } = options;

        // Same geometry as drawParallelWithTransversal
        const margin = 60;
        const lineL_y = height * 0.30;
        const lineM_y = height * 0.70;

        const L_left = { x: margin, y: lineL_y };
        const L_right = { x: width - margin, y: lineL_y };
        const M_left = { x: margin, y: lineM_y };
        const M_right = { x: width - margin, y: lineM_y };
        const T_top = { x: width * 0.40, y: 30 };
        const T_bottom = { x: width * 0.60, y: height - 30 };

        const upperInt = { x: width * 0.45, y: lineL_y };
        const lowerInt = { x: width * 0.55, y: lineM_y };

        const angles = {
            a: { vertex: upperInt, p1: L_left, p2: T_top },
            b: { vertex: upperInt, p1: T_top, p2: L_right },
            c: { vertex: upperInt, p1: L_right, p2: T_bottom },
            d: { vertex: upperInt, p1: T_bottom, p2: L_left },
            e: { vertex: lowerInt, p1: M_left, p2: T_top },
            f: { vertex: lowerInt, p1: T_top, p2: M_right },
            g: { vertex: lowerInt, p1: M_right, p2: T_bottom },
            h: { vertex: lowerInt, p1: T_bottom, p2: M_left }
        };

        const neutralFill = 'rgba(200, 200, 200, 0.2)';
        const neutralStroke = 'rgba(150, 150, 150, 0.5)';

        Object.entries(angles).forEach(([name, angle]) => {
            const colors = coloredAngles[name] || { fill: neutralFill, stroke: neutralStroke };
            const label = showAllLabels ? name : (coloredAngles[name] ? name : null);

            GeometryUtils.drawAngleMark(ctx, angle.vertex, angle.p1, angle.p2, 
                colors.fill, colors.stroke, 25, label, 40);
        });

        // Draw lines
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        GeometryUtils.drawLine(ctx, L_left, L_right, 25);
        GeometryUtils.drawLine(ctx, M_left, M_right, 25);
        GeometryUtils.drawLine(ctx, T_top, T_bottom, 15);

        this.drawParallelMark(ctx, (L_left.x + upperInt.x) / 2, lineL_y);
        this.drawParallelMark(ctx, (M_left.x + lowerInt.x) / 2, lineM_y);

        ctx.fillStyle = '#333';
        GeometryUtils.drawPoint(ctx, upperInt.x, upperInt.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, lowerInt.x, lowerInt.y, null, 0, 0, 3);

        ctx.font = '18px Noto Serif';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ℓ', margin - 40, lineL_y);
        ctx.font = 'italic 18px Noto Serif';
        ctx.fillText('m', margin - 40, lineM_y);
        ctx.fillText('t', T_top.x - 15, T_top.y);
    },

    // ============================================
    // PAGE 3: TRANSVERSAL - ALL 8 ANGLES LABELED
    // ============================================
    drawTransversal(canvas) {
        const width = 450, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelWithTransversal(ctx, width, height, {
            highlightAngles: [],
            showAllLabels: true
        });
    },

    // ============================================
    // PAGE 4: CORRESPONDING ANGLES (HIGHLIGHTED)
    // ============================================
    drawCorrespondingAngles(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Highlight two pairs of corresponding angles with different colors
        this.drawParallelWithTransversalMultiColor(ctx, width, height, {
            coloredAngles: {
                'a': { fill: 'rgba(59, 130, 246, 0.3)', stroke: 'rgb(59, 130, 246)' },
                'e': { fill: 'rgba(59, 130, 246, 0.3)', stroke: 'rgb(59, 130, 246)' },
                'b': { fill: 'rgba(16, 185, 129, 0.3)', stroke: 'rgb(16, 185, 129)' },
                'f': { fill: 'rgba(16, 185, 129, 0.3)', stroke: 'rgb(16, 185, 129)' }
            },
            showAllLabels: true
        });

        // Legend
        ctx.font = '13px Noto Serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgb(59, 130, 246)';
        ctx.fillText('a = e', width / 2 - 50, height - 15);
        ctx.fillStyle = 'rgb(16, 185, 129)';
        ctx.fillText('b = f', width / 2 + 50, height - 15);
    },

    // ============================================
    // PAGE 5: ALTERNATE INTERIOR ANGLES (DEFINITION)
    // ============================================
    drawAltInteriorDef(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Highlight two pairs of alternate interior angles with different colors
        this.drawParallelWithTransversalMultiColor(ctx, width, height, {
            coloredAngles: {
                'c': { fill: 'rgba(16, 185, 129, 0.3)', stroke: 'rgb(16, 185, 129)' },
                'e': { fill: 'rgba(16, 185, 129, 0.3)', stroke: 'rgb(16, 185, 129)' },
                'd': { fill: 'rgba(147, 51, 234, 0.3)', stroke: 'rgb(147, 51, 234)' },
                'f': { fill: 'rgba(147, 51, 234, 0.3)', stroke: 'rgb(147, 51, 234)' }
            },
            showAllLabels: true
        });
        // No legend - the equality hasn't been established yet
    },

    // ============================================
    // PAGE 6: ALTERNATE INTERIOR PROOF
    // ============================================
    drawAltInteriorProof(canvas) {
        const width = 350, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Same geometry as drawParallelWithTransversal
        const margin = 50;
        const lineL_y = height * 0.30;
        const lineM_y = height * 0.70;

        // Actual points on lines
        const L_left = { x: margin, y: lineL_y };
        const L_right = { x: width - margin, y: lineL_y };
        const M_left = { x: margin, y: lineM_y };
        const M_right = { x: width - margin, y: lineM_y };
        const T_top = { x: width * 0.40, y: 30 };
        const T_bottom = { x: width * 0.60, y: height - 30 };

        // Intersection points
        const upperInt = { x: width * 0.45, y: lineL_y };
        const lowerInt = { x: width * 0.55, y: lineM_y };

        const angles = {
            a: { vertex: upperInt, p1: L_left, p2: T_top },
            b: { vertex: upperInt, p1: T_top, p2: L_right },
            c: { vertex: upperInt, p1: L_right, p2: T_bottom },
            d: { vertex: upperInt, p1: T_bottom, p2: L_left },
            e: { vertex: lowerInt, p1: M_left, p2: T_top },
            f: { vertex: lowerInt, p1: T_top, p2: M_right },
            g: { vertex: lowerInt, p1: M_right, p2: T_bottom },
            h: { vertex: lowerInt, p1: T_bottom, p2: M_left }
        };

        // Colors for the proof
        const proofColors = {
            a: { fill: 'rgba(249, 115, 22, 0.3)', stroke: 'rgb(249, 115, 22)' }, // orange bridge
            c: { fill: 'rgba(16, 185, 129, 0.3)', stroke: 'rgb(16, 185, 129)' }, // green
            e: { fill: 'rgba(16, 185, 129, 0.3)', stroke: 'rgb(16, 185, 129)' }  // green
        };
        const neutralFill = 'rgba(200, 200, 200, 0.1)';
        const neutralStroke = 'rgba(150, 150, 150, 0.3)';

        Object.entries(angles).forEach(([name, angle]) => {
            const colors = proofColors[name] || { fill: neutralFill, stroke: neutralStroke };
            GeometryUtils.drawAngleMark(ctx, angle.vertex, angle.p1, angle.p2, 
                colors.fill, colors.stroke, 25, name, 40);
        });

        // Draw lines
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        GeometryUtils.drawLine(ctx, L_left, L_right, 25);
        GeometryUtils.drawLine(ctx, M_left, M_right, 25);
        GeometryUtils.drawLine(ctx, T_top, T_bottom, 15);

        this.drawParallelMark(ctx, (L_left.x + upperInt.x) / 2, lineL_y);
        this.drawParallelMark(ctx, (M_left.x + lowerInt.x) / 2, lineM_y);

        ctx.fillStyle = '#333';
        GeometryUtils.drawPoint(ctx, upperInt.x, upperInt.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, lowerInt.x, lowerInt.y, null, 0, 0, 3);

        ctx.font = '18px Noto Serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ℓ', margin - 40, lineL_y);
        ctx.font = 'italic 18px Noto Serif';
        ctx.fillText('m', margin - 40, lineM_y);
        ctx.fillText('t', T_top.x - 15, T_top.y);
    },

    // ============================================
    // PAGE 7: ALTERNATE EXTERIOR ANGLES (DEFINITION)
    // ============================================
    drawAltExteriorDef(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelWithTransversal(ctx, width, height, {
            highlightAngles: ['a', 'g'],
            highlightColor: { fill: 'rgba(147, 51, 234, 0.3)', stroke: 'rgb(147, 51, 234)' },
            showAllLabels: true
        });

        // Legend
        ctx.font = '13px Noto Serif';
        ctx.fillStyle = 'rgb(147, 51, 234)';
        ctx.textAlign = 'center';
        ctx.fillText('∠a and ∠g: alternate exterior', width / 2, height - 15);
    },

    // ============================================
    // PAGE 8: ALTERNATE EXTERIOR PROOF
    // ============================================
    drawAltExteriorProof(canvas) {
        const width = 350, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Same geometry as drawParallelWithTransversal
        const margin = 50;
        const lineL_y = height * 0.30;
        const lineM_y = height * 0.70;

        // Actual points on lines
        const L_left = { x: margin, y: lineL_y };
        const L_right = { x: width - margin, y: lineL_y };
        const M_left = { x: margin, y: lineM_y };
        const M_right = { x: width - margin, y: lineM_y };
        const T_top = { x: width * 0.40, y: 30 };
        const T_bottom = { x: width * 0.60, y: height - 30 };

        // Intersection points
        const upperInt = { x: width * 0.45, y: lineL_y };
        const lowerInt = { x: width * 0.55, y: lineM_y };

        const angles = {
            a: { vertex: upperInt, p1: L_left, p2: T_top },
            b: { vertex: upperInt, p1: T_top, p2: L_right },
            c: { vertex: upperInt, p1: L_right, p2: T_bottom },
            d: { vertex: upperInt, p1: T_bottom, p2: L_left },
            e: { vertex: lowerInt, p1: M_left, p2: T_top },
            f: { vertex: lowerInt, p1: T_top, p2: M_right },
            g: { vertex: lowerInt, p1: M_right, p2: T_bottom },
            h: { vertex: lowerInt, p1: T_bottom, p2: M_left }
        };

        // Colors for the proof: a (purple), e (orange bridge), g (purple)
        const proofColors = {
            a: { fill: 'rgba(147, 51, 234, 0.3)', stroke: 'rgb(147, 51, 234)' }, // purple
            e: { fill: 'rgba(249, 115, 22, 0.3)', stroke: 'rgb(249, 115, 22)' }, // orange bridge
            g: { fill: 'rgba(147, 51, 234, 0.3)', stroke: 'rgb(147, 51, 234)' }  // purple
        };
        const neutralFill = 'rgba(200, 200, 200, 0.1)';
        const neutralStroke = 'rgba(150, 150, 150, 0.3)';

        Object.entries(angles).forEach(([name, angle]) => {
            const colors = proofColors[name] || { fill: neutralFill, stroke: neutralStroke };
            GeometryUtils.drawAngleMark(ctx, angle.vertex, angle.p1, angle.p2, 
                colors.fill, colors.stroke, 25, name, 40);
        });

        // Draw lines
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        GeometryUtils.drawLine(ctx, L_left, L_right, 25);
        GeometryUtils.drawLine(ctx, M_left, M_right, 25);
        GeometryUtils.drawLine(ctx, T_top, T_bottom, 15);

        this.drawParallelMark(ctx, (L_left.x + upperInt.x) / 2, lineL_y);
        this.drawParallelMark(ctx, (M_left.x + lowerInt.x) / 2, lineM_y);

        ctx.fillStyle = '#333';
        GeometryUtils.drawPoint(ctx, upperInt.x, upperInt.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, lowerInt.x, lowerInt.y, null, 0, 0, 3);

        ctx.font = '18px Noto Serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ℓ', margin - 40, lineL_y);
        ctx.font = 'italic 18px Noto Serif';
        ctx.fillText('m', margin - 40, lineM_y);
        ctx.fillText('t', T_top.x - 15, T_top.y);

        ctx.font = '13px Noto Serif';
        ctx.fillStyle = '#333';
        ctx.fillText('a = e = g  ⟹  a = g', width / 2, height - 15);
    },

    // ============================================
    // EXERCISES & QUIZ: REFERENCE DIAGRAM
    // ============================================
    drawReference(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelWithTransversal(ctx, width, height, {
            highlightAngles: [],
            showAllLabels: true
        });
    },

    drawExercise2(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelWithTransversal(ctx, width, height, {
            highlightAngles: ['a'],
            highlightColor: { fill: 'rgba(59, 130, 246, 0.3)', stroke: 'rgb(59, 130, 246)' },
            showAllLabels: true,
            angleAValue: '65°'
        });
    },

    drawQuiz(canvas) {
        const width = 400, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        this.drawParallelWithTransversal(ctx, width, height, {
            highlightAngles: ['a'],
            highlightColor: { fill: 'rgba(59, 130, 246, 0.3)', stroke: 'rgb(59, 130, 246)' },
            showAllLabels: true,
            angleAValue: '72°'
        });
    }
};
