/**
 * Diagram Drawing Functions for Lesson 12: Lines in the Plane
 */

// Points on y = 2x
const LINE1_POINTS = [
    { x: -1, y: -2 },
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 }
];

// Points on y = x + 1
const LINE2_POINTS = [
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 4 }
];

const Diagrams = {
    // ============================================
    // COVER: Points on a line with a faint line
    // ============================================
    drawCover(canvas) {
        const ctx = setupCanvas(canvas, 400, 300);
        const cs = GridUtils.createCoordSystem(400, 300,
            { xMin: -3, xMax: 5, yMin: -2, yMax: 6 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, cs, { showNumbers: false });

        GridUtils.drawLine(ctx, cs, x => x + 1, {
            color: 'rgba(106, 130, 251, 0.25)', lineWidth: 2
        });

        [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 2 },
         { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.point, radius: 5
            });
        });
    },

    // ============================================
    // PAGE 2: Just the points, clean. No line yet.
    // ============================================
    drawPage2(canvas) {
        const ctx = setupCanvas(canvas, 400, 400);
        const cs = GridUtils.createCoordSystem(400, 400,
            { xMin: -3, xMax: 5, yMin: -4, yMax: 8 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        LINE1_POINTS.forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.point, radius: 6
            });
        });
    },

    // ============================================
    // PAGE 3: Points + faint line, optional (4,8)
    // ============================================
    drawPage3(canvas, showNewPoint = false) {
        const ctx = setupCanvas(canvas, 320, 380);
        const cs = GridUtils.createCoordSystem(320, 380,
            { xMin: -3, xMax: 6, yMin: -4, yMax: 9 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: 'rgba(106, 130, 251, 0.35)', lineWidth: 2
        });

        LINE1_POINTS.forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.point, radius: 5
            });
        });

        if (showNewPoint) {
            GridUtils.drawPoint(ctx, cs, 4, 8, {
                color: Colors.pointCorrect, radius: 7
            });
            GridUtils.drawCoordinateLabel(ctx, cs, 4, 8, {
                offset: { x: 10, y: -12 }, color: Colors.pointCorrect
            });
        }
    },

    // ============================================
    // PAGE 4: Line with equation label + all points
    // ============================================
    drawPage4(canvas) {
        const ctx = setupCanvas(canvas, 320, 380);
        const cs = GridUtils.createCoordSystem(320, 380,
            { xMin: -3, xMax: 6, yMin: -4, yMax: 9 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        [...LINE1_POINTS, { x: 4, y: 8 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.point, radius: 4
            });
        });

        // Equation label
        const lbl = cs.toPixel(1, 4.5);
        ctx.save();
        ctx.font = 'bold italic 16px STIX Two Text, serif';
        const text = 'y = 2x';
        const tw = ctx.measureText(text).width;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(lbl.px - 4, lbl.py - 11, tw + 8, 22);
        ctx.fillStyle = Colors.line;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, lbl.px, lbl.py);
        ctx.restore();
    },

    // ============================================
    // PAGE 5 DISCOVERY: y = x + 1 with line
    // ============================================
    drawPage5Discovery(canvas) {
        const ctx = setupCanvas(canvas, 320, 350);
        const cs = GridUtils.createCoordSystem(320, 350,
            { xMin: -3, xMax: 5, yMin: -2, yMax: 6 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => x + 1, {
            color: Colors.line, lineWidth: 2.5
        });

        LINE2_POINTS.forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.point, radius: 5
            });
        });
    },

    // ============================================
    // EXERCISE 1: y = 3x
    // ============================================
    drawEx1(canvas) {
        const ctx = setupCanvas(canvas, 360, 360);
        const cs = GridUtils.createCoordSystem(360, 360,
            { xMin: -1, xMax: 4, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 3 * x, {
            color: 'rgba(106, 130, 251, 0.3)', lineWidth: 2
        });

        [{ x: 0, y: 0 }, { x: 1, y: 3 }, { x: 2, y: 6 }, { x: 3, y: 9 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, { color: Colors.point, radius: 5 });
            GridUtils.drawCoordinateLabel(ctx, cs, p.x, p.y, { offset: { x: 8, y: -10 } });
        });
    },

    // ============================================
    // EXERCISE 2: y = 2x
    // ============================================
    drawEx2(canvas) {
        const ctx = setupCanvas(canvas, 360, 360);
        const cs = GridUtils.createCoordSystem(360, 360,
            { xMin: -1, xMax: 6, yMin: -1, yMax: 11 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2
        });

        [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, { color: Colors.point, radius: 5 });
        });

        // Label
        const lbl = cs.toPixel(4, 9);
        ctx.save();
        ctx.font = 'bold italic 13px STIX Two Text, serif';
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(lbl.px - 3, lbl.py - 9, 56, 18);
        ctx.fillStyle = Colors.line;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('y = 2x', lbl.px, lbl.py);
        ctx.restore();
    },

    // ============================================
    // EXERCISE 3: y = x + 2 (empty then filled)
    // ============================================
    drawEx3(canvas, points = [], showLine = false) {
        const ctx = setupCanvas(canvas, 360, 360);
        const cs = GridUtils.createCoordSystem(360, 360,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 7 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, cs);

        if (showLine) {
            GridUtils.drawLine(ctx, cs, x => x + 2, {
                color: Colors.line, lineWidth: 2
            });

            const lbl = cs.toPixel(2.5, 5);
            ctx.save();
            ctx.font = 'bold italic 13px STIX Two Text, serif';
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fillRect(lbl.px - 3, lbl.py - 9, 68, 18);
            ctx.fillStyle = Colors.line;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText('y = x + 2', lbl.px, lbl.py);
            ctx.restore();
        }

        points.forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: Colors.pointCorrect, radius: 6
            });
            GridUtils.drawCoordinateLabel(ctx, cs, p.x, p.y, { offset: { x: 8, y: -10 } });
        });
    },

    // ============================================
    // SUMMARY: Two lines on one grid
    // ============================================
    drawSummary(canvas) {
        const ctx = setupCanvas(canvas, 360, 320);
        const cs = GridUtils.createCoordSystem(360, 320,
            { xMin: -3, xMax: 5, yMin: -3, yMax: 7 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 2x (blue)
        GridUtils.drawLine(ctx, cs, x => 2 * x, { color: '#6a82fb', lineWidth: 2.5 });
        // y = x + 1 (green)
        GridUtils.drawLine(ctx, cs, x => x + 1, { color: '#10b981', lineWidth: 2.5 });

        // Labels
        const l1 = cs.toPixel(2, 5.2);
        ctx.save();
        ctx.font = 'bold italic 15px STIX Two Text, serif';

        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(l1.px - 3, l1.py - 10, 66, 20);
        ctx.fillStyle = '#6a82fb';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('y = 2x', l1.px, l1.py);

        const l2 = cs.toPixel(3.2, 3.2);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(l2.px - 3, l2.py - 10, 80, 20);
        ctx.fillStyle = '#10b981';
        ctx.fillText('y = x + 1', l2.px, l2.py);
        ctx.restore();

        // Some points
        [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: -1, y: -2 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, { color: '#6a82fb', radius: 4 });
        });
        [{ x: 0, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 5 }].forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, { color: '#10b981', radius: 4 });
        });
    }
};
