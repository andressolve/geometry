/**
 * Diagram Drawing Functions for Lesson 16: x + y = 1
 *
 * Static diagrams: cover, page 3 (downhill / step triangle),
 * page 4 (equivalence), summary, exercise diagrams
 */

const Diagrams = {

    // Helper: draw an equation label on the canvas near a line
    drawEquationLabel(ctx, cs, text, x, y, color) {
        ctx.save();
        ctx.font = 'bold italic 14px STIX Two Text, serif';
        const pos = cs.toPixel(x, y);
        const tw = ctx.measureText(text).width;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(pos.px - 4, pos.py - 11, tw + 8, 22);
        ctx.fillStyle = color;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, pos.px, pos.py);
        ctx.restore();
    },

    // Standard grid range for x + y = 1
    mainRange: { xMin: -2, xMax: 4, yMin: -3, yMax: 3 },

    // ============================================
    // COVER: Downhill line, semi-transparent, no labels
    // ============================================
    drawCover(canvas) {
        const ctx = setupCanvas(canvas, 400, 300);
        const cs = GridUtils.createCoordSystem(400, 300, this.mainRange);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, cs, { showNumbers: false });

        // x + y = 1 → y = 1 - x (semi-transparent blue)
        GridUtils.drawLine(ctx, cs, x => 1 - x, {
            color: 'rgba(106, 130, 251, 0.6)', lineWidth: 2.5
        });

        // Two subtle dots at the axis crossings
        GridUtils.drawPoint(ctx, cs, 0, 1, {
            color: 'rgba(106, 130, 251, 0.5)', radius: 5
        });
        GridUtils.drawPoint(ctx, cs, 1, 0, {
            color: 'rgba(106, 130, 251, 0.5)', radius: 5
        });
    },

    // ============================================
    // PAGE 1: Point test canvas — just grid, drawn dynamically by interactive.js
    // This provides a base draw that PointTest can call
    // ============================================
    drawPointTestBase(ctx, cs) {
        clearCanvas(ctx, 400, 340);
        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);
    },

    // ============================================
    // PAGE 2: Table plot canvas — just grid, drawn dynamically by interactive.js
    // ============================================
    drawTablePlotBase(ctx, cs) {
        clearCanvas(ctx, 420, 380);
        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);
    },

    // ============================================
    // PAGE 3: Downhill — line with step triangle
    // ============================================
    drawDownhill(canvas) {
        const ctx = setupCanvas(canvas, 420, 380);
        const cs = GridUtils.createCoordSystem(420, 380, this.mainRange);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // The line y = 1 - x
        GridUtils.drawLine(ctx, cs, x => 1 - x, {
            color: Colors.line, lineWidth: 2.5
        });

        // Points along the line
        [{ x: -1, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: -1 }, { x: 3, y: -2 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.line, radius: 5
            });
        });

        // Step triangle from (0, 1) to (1, 0): right 1, down 1
        // Draw with orange, showing the downward step
        GridUtils.drawStepTriangle(ctx, cs, 0, 1, 1, -1, {
            color: '#f59e0b',
            lineWidth: 2,
            dash: [5, 4],
            showLabels: true,
            hLabel: '1',
            vLabel: '-1'
        });

        // Also draw a second step triangle from (1, 0) to (2, -1) for emphasis
        GridUtils.drawStepTriangle(ctx, cs, 1, 0, 1, -1, {
            color: '#f59e0b',
            lineWidth: 2,
            dash: [5, 4],
            showLabels: false
        });
    },

    // ============================================
    // PAGE 4: Equivalence — line with both equation labels
    // ============================================
    drawEquivalence(canvas) {
        const ctx = setupCanvas(canvas, 420, 380);
        const cs = GridUtils.createCoordSystem(420, 380, this.mainRange);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // The line
        GridUtils.drawLine(ctx, cs, x => 1 - x, {
            color: Colors.line, lineWidth: 2.5
        });

        // Points
        [{ x: -1, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: -1 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.line, radius: 5
            });
        });

        // Two labels — one blue, one green — for the two equation forms
        this.drawEquationLabel(ctx, cs, 'x + y = 1', -1.8, 2.7, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = 1 \u2212 x', 1.8, -2.2, Colors.lineGreen);
    },

    // ============================================
    // EXERCISE 2: x + y = 5 — after table is filled
    // ============================================
    drawEx2(canvas) {
        const range = { xMin: -1, xMax: 6, yMin: -1, yMax: 6 };
        const ctx = setupCanvas(canvas, 360, 300);
        const cs = GridUtils.createCoordSystem(360, 300, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 5 - x
        GridUtils.drawLine(ctx, cs, x => 5 - x, {
            color: Colors.line, lineWidth: 2.5
        });

        // Points
        for (let xi = 0; xi <= 5; xi++) {
            GridUtils.drawPoint(ctx, cs, xi, 5 - xi, {
                color: Colors.line, radius: 5
            });
        }

        // Step triangle
        GridUtils.drawStepTriangle(ctx, cs, 1, 4, 1, -1, {
            color: '#f59e0b',
            lineWidth: 2,
            dash: [5, 4],
            showLabels: true,
            hLabel: '1',
            vLabel: '-1'
        });

        this.drawEquationLabel(ctx, cs, 'x + y = 5', 0.5, 5.5, Colors.line);
    },

    // ============================================
    // SUMMARY: Line with both labels + step triangle
    // ============================================
    drawSummary(canvas) {
        const ctx = setupCanvas(canvas, 480, 400);
        const cs = GridUtils.createCoordSystem(480, 400, this.mainRange);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // The line
        GridUtils.drawLine(ctx, cs, x => 1 - x, {
            color: Colors.line, lineWidth: 2.5
        });

        // Points
        [{ x: -1, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: -1 }, { x: 3, y: -2 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.line, radius: 5
            });
        });

        // Step triangle
        GridUtils.drawStepTriangle(ctx, cs, 0, 1, 1, -1, {
            color: '#f59e0b',
            lineWidth: 2,
            dash: [5, 4],
            showLabels: true,
            hLabel: '1',
            vLabel: '-1'
        });

        // Both labels
        this.drawEquationLabel(ctx, cs, 'x + y = 1', -1.8, 2.7, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = 1 \u2212 x', 1.8, -2.2, Colors.lineGreen);
    }
};
