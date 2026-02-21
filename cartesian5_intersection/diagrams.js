/**
 * Diagram Drawing Functions for Lesson 15: Where Lines Meet
 *
 * Static diagrams: cover, page 1 (two lines), page 3 (why that point),
 * page 4 phase 3 (confirm graph), exercise 3 graph, summary
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

    // Helper: draw intersection point (larger, coral/orange)
    drawIntersectionPoint(ctx, cs, x, y) {
        GridUtils.drawPoint(ctx, cs, x, y, {
            color: '#f97316', radius: 8
        });
    },

    // ============================================
    // COVER: Two crossing lines with intersection dot
    // y = 2x (blue), y = x + 2 (green), intersection at (2,4)
    // ============================================
    drawCover(canvas) {
        const ctx = setupCanvas(canvas, 400, 300);
        const cs = GridUtils.createCoordSystem(400, 300,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, cs, { showNumbers: false });

        // y = 2x (blue, semi-transparent)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: 'rgba(106, 130, 251, 0.6)', lineWidth: 2.5
        });
        // y = x + 2 (green, semi-transparent)
        GridUtils.drawLine(ctx, cs, x => x + 2, {
            color: 'rgba(16, 185, 129, 0.6)', lineWidth: 2.5
        });

        // Intersection dot at (2, 4)
        this.drawIntersectionPoint(ctx, cs, 2, 4);
    },

    // ============================================
    // PAGE 1: Two Lines, One Grid
    // y = 2x (blue) with points at (0,0),(1,2),(2,4),(3,6)
    // y = x + 2 (green) with points at (0,2),(1,3),(2,4),(3,5)
    // ============================================
    drawTwoLines(canvas) {
        const ctx = setupCanvas(canvas, 440, 400);
        const cs = GridUtils.createCoordSystem(440, 400,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 2x (blue)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = x + 2 (green)
        GridUtils.drawLine(ctx, cs, x => x + 2, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Points on y = 2x
        [{ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.line, radius: 5
            });
        });

        // Points on y = x + 2
        [{ x: 0, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 5 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.lineGreen, radius: 5
            });
        });

        // Equation labels
        this.drawEquationLabel(ctx, cs, 'y = 2x', 3.2, 7, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = x + 2', 3.2, 5.5, Colors.lineGreen);
    },

    // ============================================
    // PAGE 3: Why That Point — same two lines, intersection highlighted
    // ============================================
    drawWhyThatPoint(canvas) {
        const ctx = setupCanvas(canvas, 380, 340);
        const cs = GridUtils.createCoordSystem(380, 340,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 2x (blue)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = x + 2 (green)
        GridUtils.drawLine(ctx, cs, x => x + 2, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Equation labels
        this.drawEquationLabel(ctx, cs, 'y = 2x', 3, 6.6, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = x + 2', 3, 5.4, Colors.lineGreen);

        // Intersection (2, 4) highlighted
        this.drawIntersectionPoint(ctx, cs, 2, 4);
        GridUtils.drawCoordinateLabel(ctx, cs, 2, 4, {
            offset: { x: 12, y: -14 }, color: '#f97316'
        });
    },

    // ============================================
    // PAGE 4 PHASE 3: Confirm graph — y = 3x and y = x + 4, intersection at (2,6)
    // ============================================
    drawConfirmGraph(canvas) {
        const ctx = setupCanvas(canvas, 440, 400);
        const cs = GridUtils.createCoordSystem(440, 400,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 3x (blue)
        GridUtils.drawLine(ctx, cs, x => 3 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = x + 4 (green)
        GridUtils.drawLine(ctx, cs, x => x + 4, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Equation labels
        this.drawEquationLabel(ctx, cs, 'y = 3x', 2.5, 8, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = x + 4', 3.5, 7.8, Colors.lineGreen);

        // Intersection (2, 6) highlighted
        this.drawIntersectionPoint(ctx, cs, 2, 6);
        GridUtils.drawCoordinateLabel(ctx, cs, 2, 6, {
            offset: { x: 12, y: -14 }, color: '#f97316'
        });
    },

    // ============================================
    // EXERCISE 1: y = 2x + 1 (blue) and y = x + 3 (green), crossing at (2,5)
    // ============================================
    drawEx1(canvas) {
        const ctx = setupCanvas(canvas, 360, 300);
        const cs = GridUtils.createCoordSystem(360, 300,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 2x + 1 (blue)
        GridUtils.drawLine(ctx, cs, x => 2 * x + 1, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = x + 3 (green)
        GridUtils.drawLine(ctx, cs, x => x + 3, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Equation labels
        this.drawEquationLabel(ctx, cs, 'y = 2x + 1', 3, 7.5, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = x + 3', 3.2, 6.5, Colors.lineGreen);

        // Mark the crossing point visually but don't label it
        GridUtils.drawPoint(ctx, cs, 2, 5, {
            color: '#d1d5db', radius: 4
        });
    },

    // ============================================
    // EXERCISE 3: y = 2x (blue) and y = x + 3 (green), intersection at (3,6)
    // ============================================
    drawEx3(canvas) {
        const ctx = setupCanvas(canvas, 360, 300);
        const cs = GridUtils.createCoordSystem(360, 300,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 2x (blue)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = x + 3 (green)
        GridUtils.drawLine(ctx, cs, x => x + 3, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Equation labels
        this.drawEquationLabel(ctx, cs, 'y = 2x', 3.5, 7.5, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = x + 3', 3.5, 6.8, Colors.lineGreen);

        // Intersection at (3, 6)
        this.drawIntersectionPoint(ctx, cs, 3, 6);
        GridUtils.drawCoordinateLabel(ctx, cs, 3, 6, {
            offset: { x: 12, y: -14 }, color: '#f97316'
        });
    },

    // ============================================
    // SUMMARY: Two crossing lines with intersection highlighted,
    // equations labeled, small verification
    // ============================================
    drawSummary(canvas) {
        const ctx = setupCanvas(canvas, 520, 440);
        const cs = GridUtils.createCoordSystem(520, 440,
            { xMin: -1, xMax: 6, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 2x (blue)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = x + 2 (green)
        GridUtils.drawLine(ctx, cs, x => x + 2, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Equation labels
        this.drawEquationLabel(ctx, cs, 'y = 2x', 3.5, 7.5, Colors.line);
        this.drawEquationLabel(ctx, cs, 'y = x + 2', 4, 6.3, Colors.lineGreen);

        // Intersection (2, 4)
        this.drawIntersectionPoint(ctx, cs, 2, 4);
        GridUtils.drawCoordinateLabel(ctx, cs, 2, 4, {
            offset: { x: 12, y: -14 }, color: '#f97316'
        });

        // Small verification text near intersection
        ctx.save();
        ctx.font = '12px STIX Two Text, serif';
        const vPos = cs.toPixel(2.8, 3.2);

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(vPos.px - 4, vPos.py - 12, 120, 30);

        ctx.fillStyle = '#4b5563';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('2(2) = 4 \u2713', vPos.px, vPos.py - 8);
        ctx.fillText('2 + 2 = 4 \u2713', vPos.px, vPos.py + 4);
        ctx.restore();
    }
};
