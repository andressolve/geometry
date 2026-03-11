/**
 * Diagram Drawing Functions for Lesson 17: Two Lines, One Point
 *
 * Static and dynamic diagrams for systems of two linear equations.
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

    // Helper: draw intersection dot (coral)
    drawIntersectionDot(ctx, cs, x, y) {
        GridUtils.drawPoint(ctx, cs, x, y, {
            color: '#f97316', radius: 7
        });
        GridUtils.drawCoordinateLabel(ctx, cs, x, y, {
            offset: { x: 12, y: -14 }, color: '#f97316'
        });
    },

    // ============================================
    // COVER: Two crossing lines, no intersection marked
    // y = x + 1 (blue) and y = 2x (green), semi-transparent
    // ============================================
    drawCover(canvas) {
        const range = { xMin: -1, xMax: 4, yMin: -1, yMax: 5 };
        const ctx = setupCanvas(canvas, 400, 260);
        const cs = GridUtils.createCoordSystem(400, 260, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, cs, { showNumbers: false });

        // y = x + 1 (semi-transparent blue)
        GridUtils.drawLine(ctx, cs, x => x + 1, {
            color: 'rgba(106, 130, 251, 0.6)', lineWidth: 2.5
        });

        // y = 2x (semi-transparent green)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: 'rgba(16, 185, 129, 0.6)', lineWidth: 2.5
        });
    },

    // ============================================
    // PAGE 1: Base grid with both lines for click interaction
    // ============================================
    drawPage1Base(ctx, cs, W, H) {
        clearCanvas(ctx, W, H);
        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = x + 1 (blue)
        GridUtils.drawLine(ctx, cs, x => x + 1, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = 2x (green)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Labels
        this.drawEquationLabel(ctx, cs, 'y = x + 1', 2.5, 4, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = 2x', 2.5, 5.5, Colors.lineGreen);
    },

    // ============================================
    // PAGE 3: Both lines with intersection at (1, 2)
    // ============================================
    drawPage3(canvas) {
        const range = { xMin: -1, xMax: 4, yMin: -1, yMax: 6 };
        const ctx = setupCanvas(canvas, 400, 360);
        const cs = GridUtils.createCoordSystem(400, 360, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => x + 1, {
            color: Colors.line, lineWidth: 2.5
        });
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        this.drawEquationLabel(ctx, cs, 'y = x + 1', 2.5, 3.8, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = 2x', 2.5, 5.5, Colors.lineGreen);

        this.drawIntersectionDot(ctx, cs, 1, 2);
    },

    // ============================================
    // PAGE 4: y = x + 2 and y = 3x − 4
    // ============================================
    drawPage4Base(canvas) {
        const range = { xMin: -1, xMax: 6, yMin: -2, yMax: 9 };
        const ctx = setupCanvas(canvas, 400, 360);
        const cs = GridUtils.createCoordSystem(400, 360, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => x + 2, {
            color: Colors.line, lineWidth: 2.5
        });
        GridUtils.drawLine(ctx, cs, x => 3 * x - 4, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        this.drawEquationLabel(ctx, cs, 'y = x + 2', 4, 6.5, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = 3x \u2212 4', 3.5, 7.5, Colors.lineGreen);

        return { ctx, cs };
    },

    drawPage4Complete(canvas) {
        const { ctx, cs } = this.drawPage4Base(canvas);
        this.drawIntersectionDot(ctx, cs, 3, 5);
    },

    // ============================================
    // PAGE 5: y = 2x + 1 and y = 5x − 5, intersection at (2, 5)
    // ============================================
    drawPage5(canvas) {
        const range = { xMin: -1, xMax: 5, yMin: -2, yMax: 8 };
        const ctx = setupCanvas(canvas, 400, 360);
        const cs = GridUtils.createCoordSystem(400, 360, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 2 * x + 1, {
            color: Colors.line, lineWidth: 2.5
        });
        GridUtils.drawLine(ctx, cs, x => 5 * x - 5, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        this.drawEquationLabel(ctx, cs, 'y = 2x + 1', 2.5, 6.5, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = 5x \u2212 5', 3, 7.5, Colors.lineGreen);

        this.drawIntersectionDot(ctx, cs, 2, 5);
    },

    // ============================================
    // EXERCISE DIAGRAMS
    // ============================================

    // Ex1: y = x + 4 and y = 2x + 1 → (3, 7)
    drawEx1(canvas) {
        const range = { xMin: -1, xMax: 6, yMin: -1, yMax: 10 };
        const ctx = setupCanvas(canvas, 360, 300);
        const cs = GridUtils.createCoordSystem(360, 300, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => x + 4, {
            color: Colors.line, lineWidth: 2.5
        });
        GridUtils.drawLine(ctx, cs, x => 2 * x + 1, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        this.drawEquationLabel(ctx, cs, 'y = x + 4', 4, 8.5, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = 2x + 1', 3.5, 7.5, Colors.lineGreen);

        this.drawIntersectionDot(ctx, cs, 3, 7);
    },

    // Ex2: y = 3x and y = x + 6 → (3, 9)
    drawEx2(canvas) {
        const range = { xMin: -1, xMax: 6, yMin: -1, yMax: 12 };
        const ctx = setupCanvas(canvas, 360, 300);
        const cs = GridUtils.createCoordSystem(360, 300, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 3 * x, {
            color: Colors.line, lineWidth: 2.5
        });
        GridUtils.drawLine(ctx, cs, x => x + 6, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        this.drawEquationLabel(ctx, cs, 'y = 3x', 3, 10, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = x + 6', 4, 10.5, Colors.lineGreen);

        this.drawIntersectionDot(ctx, cs, 3, 9);
    },

    // Ex3: y = 2x + 3 and y = 4x − 1 → (2, 7)
    drawEx3(canvas) {
        const range = { xMin: -1, xMax: 5, yMin: -1, yMax: 10 };
        const ctx = setupCanvas(canvas, 360, 300);
        const cs = GridUtils.createCoordSystem(360, 300, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 2 * x + 3, {
            color: Colors.line, lineWidth: 2.5
        });
        GridUtils.drawLine(ctx, cs, x => 4 * x - 1, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        this.drawEquationLabel(ctx, cs, 'y = 2x + 3', 2.5, 8.5, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = 4x \u2212 1', 2, 7.5, Colors.lineGreen);

        this.drawIntersectionDot(ctx, cs, 2, 7);
    },

    // Ex4: y = 3x and x + y = 8 (y = 8 - x) → (2, 6)
    drawEx4(canvas) {
        const range = { xMin: -1, xMax: 6, yMin: -1, yMax: 10 };
        const ctx = setupCanvas(canvas, 360, 300);
        const cs = GridUtils.createCoordSystem(360, 300, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 3 * x, {
            color: Colors.line, lineWidth: 2.5
        });
        GridUtils.drawLine(ctx, cs, x => 8 - x, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        this.drawEquationLabel(ctx, cs, 'y = 3x', 2.5, 8, Colors.line);
        this.drawEquationLabel(ctx, cs, 'x + y = 8', 4, 4.5, Colors.lineGreen);

        this.drawIntersectionDot(ctx, cs, 2, 6);
    },

    // ============================================
    // SUMMARY: Two lines with intersection, both labeled
    // ============================================
    drawSummary(canvas) {
        const range = { xMin: -1, xMax: 4, yMin: -1, yMax: 6 };
        const ctx = setupCanvas(canvas, 420, 380);
        const cs = GridUtils.createCoordSystem(420, 380, range);

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => x + 1, {
            color: Colors.line, lineWidth: 2.5
        });
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        this.drawEquationLabel(ctx, cs, 'y = x + 1', 2.5, 3.8, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = 2x', 2.5, 5.5, Colors.lineGreen);

        this.drawIntersectionDot(ctx, cs, 1, 2);
    }
};
