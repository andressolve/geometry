/**
 * Diagram Drawing Functions for Lesson 14: Parallel Lines
 */

const Diagrams = {

    // ============================================
    // COVER: Two parallel lines (y = 2x and y = 2x + 3)
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
            color: 'rgba(106, 130, 251, 0.5)', lineWidth: 2.5
        });
        // y = 2x + 3 (green, semi-transparent)
        GridUtils.drawLine(ctx, cs, x => 2 * x + 3, {
            color: 'rgba(16, 185, 129, 0.5)', lineWidth: 2.5
        });
    },

    // ============================================
    // PAGE 4: Contrast — two lines with different slopes crossing
    // y = 2x (blue) and y = x + 1 (green), crossing at (1, 2)
    // ============================================
    drawContrast(canvas) {
        const ctx = setupCanvas(canvas, 440, 400);
        const cs = GridUtils.createCoordSystem(440, 400,
            { xMin: -1, xMax: 7, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 2x (blue)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = x + 1 (green)
        GridUtils.drawLine(ctx, cs, x => x + 1, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Step triangle on y = 2x: from (2, 4), right 1 up 2
        GridUtils.drawStepTriangle(ctx, cs, 2, 4, 1, 2, {
            color: '#6a82fb', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });

        // Step triangle on y = x + 1: from (4, 5), right 1 up 1
        GridUtils.drawStepTriangle(ctx, cs, 4, 5, 1, 1, {
            color: '#10b981', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });

        // Crossing point at (1, 2)
        GridUtils.drawPoint(ctx, cs, 1, 2, {
            color: '#ef4444', radius: 6
        });

        // Equation labels
        ctx.save();
        ctx.font = 'bold italic 14px STIX Two Text, serif';

        // y = 2x label
        const l1 = cs.toPixel(3.5, 7.5);
        let tw = ctx.measureText('y = 2x').width;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(l1.px - 3, l1.py - 10, tw + 6, 20);
        ctx.fillStyle = Colors.line;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('y = 2x', l1.px, l1.py);

        // y = x + 1 label
        const l2 = cs.toPixel(4.5, 5.8);
        tw = ctx.measureText('y = x + 1').width;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(l2.px - 3, l2.py - 10, tw + 6, 20);
        ctx.fillStyle = Colors.lineGreen;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('y = x + 1', l2.px, l2.py);

        ctx.restore();
    },

    // ============================================
    // SUMMARY: Two parallel lines + a third crossing line
    // y = 2x (blue), y = 2x + 3 (green) — parallel
    // y = x (orange) — crosses both
    // ============================================
    drawSummary(canvas) {
        const ctx = setupCanvas(canvas, 520, 440);
        const cs = GridUtils.createCoordSystem(520, 440,
            { xMin: -1, xMax: 8, yMin: -2, yMax: 12 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // y = 2x (blue) — parallel line 1
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = 2x + 3 (green) — parallel line 2
        GridUtils.drawLine(ctx, cs, x => 2 * x + 3, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // y = x (orange) — crossing line
        GridUtils.drawLine(ctx, cs, x => x, {
            color: Colors.lineOrange, lineWidth: 2.5
        });

        // Matching step triangles on the parallel lines
        GridUtils.drawStepTriangle(ctx, cs, 2, 4, 1, 2, {
            color: '#6a82fb', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });

        GridUtils.drawStepTriangle(ctx, cs, 2, 7, 1, 2, {
            color: '#10b981', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });

        // Step triangle on the crossing line (different step)
        GridUtils.drawStepTriangle(ctx, cs, 4, 4, 1, 1, {
            color: '#f59e0b', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });

        // Equation labels
        ctx.save();
        ctx.font = 'bold italic 14px STIX Two Text, serif';

        const labels = [
            { text: 'y = 2x', x: 4.5, y: 9.5, color: Colors.line },
            { text: 'y = 2x + 3', x: 3.2, y: 10, color: Colors.lineGreen },
            { text: 'y = x', x: 6.5, y: 6.8, color: Colors.lineOrange }
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
