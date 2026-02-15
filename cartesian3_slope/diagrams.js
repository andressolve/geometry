/**
 * Diagram Drawing Functions for Lesson 13: Slope
 */

const Diagrams = {
    // Standard grid range for this lesson
    stdRange: { xMin: -1, xMax: 6, yMin: -1, yMax: 10 },

    // ============================================
    // COVER: Three lines at different steepnesses
    // ============================================
    drawCover(canvas) {
        const ctx = setupCanvas(canvas, 400, 300);
        const cs = GridUtils.createCoordSystem(400, 300,
            { xMin: -1, xMax: 6, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, cs, { showNumbers: false });

        // y = x (gentle)
        GridUtils.drawLine(ctx, cs, x => x, {
            color: 'rgba(16, 185, 129, 0.5)', lineWidth: 2
        });
        // y = 2x (medium)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: 'rgba(106, 130, 251, 0.5)', lineWidth: 2
        });
        // y = 3x (steep)
        GridUtils.drawLine(ctx, cs, x => 3 * x, {
            color: 'rgba(245, 158, 11, 0.5)', lineWidth: 2
        });
    },

    // ============================================
    // PAGE 1: Build canvas (grid + origin point)
    // Actual drawing handled by interactive.js
    // ============================================

    // ============================================
    // PAGE 2: Line y=2x with points and one step triangle
    // ============================================
    drawPage2(canvas) {
        const ctx = setupCanvas(canvas, 340, 380);
        const cs = GridUtils.createCoordSystem(340, 380,
            { xMin: -1, xMax: 6, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        for (let i = 0; i <= 4; i++) {
            GridUtils.drawPoint(ctx, cs, i, 2 * i, {
                color: Colors.point, radius: 5
            });
        }
    },

    drawPage2Pairing(canvas) {
        const ctx = setupCanvas(canvas, 200, 160);
        const cs = GridUtils.createCoordSystem(200, 160,
            { xMin: -0.5, xMax: 2.5, yMin: -0.5, yMax: 3.5 });

        // Just draw a step triangle on a mini grid
        GridUtils.drawGrid(ctx, cs, { gridColor: '#eee' });

        // Step from (0,0)
        GridUtils.drawStepTriangle(ctx, cs, 0, 0, 1, 2, {
            color: '#6a82fb', lineWidth: 2, dash: [],
            showLabels: true
        });

        // Points
        GridUtils.drawPoint(ctx, cs, 0, 0, { color: Colors.point, radius: 5 });
        GridUtils.drawPoint(ctx, cs, 1, 2, { color: Colors.point, radius: 5 });
    },

    // ============================================
    // PAGE 3: Build canvas for y=3x
    // Actual animated build handled by interactive.js
    // ============================================

    // ============================================
    // PAGE 4: Slope — y=2x and y=3x with step triangles from multiple points
    // ============================================
    drawSlope2x(canvas) {
        const ctx = setupCanvas(canvas, 380, 320);
        const cs = GridUtils.createCoordSystem(380, 320,
            { xMin: -1, xMax: 6, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // Step triangles from multiple points along the line
        GridUtils.drawStepTriangle(ctx, cs, 0, 0, 1, 2, {
            color: '#6a82fb', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });
        GridUtils.drawStepTriangle(ctx, cs, 2, 4, 1, 2, {
            color: '#6a82fb', lineWidth: 2, dash: [5, 3],
            showLabels: false
        });
        GridUtils.drawStepTriangle(ctx, cs, 3, 6, 1, 2, {
            color: '#6a82fb', lineWidth: 2, dash: [5, 3],
            showLabels: false
        });

        // Points
        [0, 1, 2, 3, 4].forEach(i => {
            GridUtils.drawPoint(ctx, cs, i, 2 * i, {
                color: Colors.point, radius: 4
            });
        });

        // Label
        const l1 = cs.toPixel(3.5, 7.5);
        ctx.save();
        ctx.font = 'bold italic 14px STIX Two Text, serif';
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(l1.px - 3, l1.py - 10, 62, 20);
        ctx.fillStyle = Colors.line;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('y = 2x', l1.px, l1.py);
        ctx.restore();
    },

    drawSlope3x(canvas) {
        const ctx = setupCanvas(canvas, 380, 320);
        const cs = GridUtils.createCoordSystem(380, 320,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 3 * x, {
            color: Colors.lineOrange, lineWidth: 2.5
        });

        // Step triangles from multiple points
        GridUtils.drawStepTriangle(ctx, cs, 0, 0, 1, 3, {
            color: '#f59e0b', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });
        GridUtils.drawStepTriangle(ctx, cs, 1, 3, 1, 3, {
            color: '#f59e0b', lineWidth: 2, dash: [5, 3],
            showLabels: false
        });
        GridUtils.drawStepTriangle(ctx, cs, 2, 6, 1, 3, {
            color: '#f59e0b', lineWidth: 2, dash: [5, 3],
            showLabels: false
        });

        [0, 1, 2, 3].forEach(i => {
            GridUtils.drawPoint(ctx, cs, i, 3 * i, {
                color: Colors.lineOrange, radius: 4
            });
        });

        // Label
        const l1 = cs.toPixel(2.5, 8.5);
        ctx.save();
        ctx.font = 'bold italic 14px STIX Two Text, serif';
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(l1.px - 3, l1.py - 10, 62, 20);
        ctx.fillStyle = Colors.lineOrange;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('y = 3x', l1.px, l1.py);
        ctx.restore();
    },

    // ============================================
    // SUMMARY: Three lines with step triangles and labels
    // ============================================
    drawSummary(canvas) {
        const ctx = setupCanvas(canvas, 520, 440);
        const cs = GridUtils.createCoordSystem(520, 440,
            { xMin: -1, xMax: 8, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = x (green) — gentle slope, step triangle far right
        GridUtils.drawLine(ctx, cs, x => x, {
            color: Colors.lineGreen, lineWidth: 2.5
        });
        GridUtils.drawStepTriangle(ctx, cs, 5, 5, 1, 1, {
            color: '#10b981', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });

        // y = 2x (blue) — medium slope, step triangle in the middle
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });
        GridUtils.drawStepTriangle(ctx, cs, 3, 6, 1, 2, {
            color: '#6a82fb', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });

        // y = 3x (orange) — steep, step triangle at (1,3)
        GridUtils.drawLine(ctx, cs, x => 3 * x, {
            color: Colors.lineOrange, lineWidth: 2.5
        });
        GridUtils.drawStepTriangle(ctx, cs, 1, 3, 1, 3, {
            color: '#f59e0b', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });

        // Equation labels — placed where the lines have room to breathe
        ctx.save();
        ctx.font = 'bold italic 15px STIX Two Text, serif';

        const labels = [
            { text: 'y = x', x: 6.5, y: 6.2, color: Colors.lineGreen },
            { text: 'y = 2x', x: 4.2, y: 8.8, color: Colors.line },
            { text: 'y = 3x', x: 2.8, y: 9.2, color: Colors.lineOrange }
        ];

        labels.forEach(l => {
            const pos = cs.toPixel(l.x, l.y);
            const tw = ctx.measureText(l.text).width;
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fillRect(pos.px - 4, pos.py - 11, tw + 8, 22);
            ctx.fillStyle = l.color;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(l.text, pos.px, pos.py);
        });

        ctx.restore();
    }
};
