/**
 * Diagram Drawing Functions for Lesson 10: The Cartesian Plane
 */

const Diagrams = {
    // ============================================
    // PAGE 0: COVER
    // Animated crosshair settling on a point
    // ============================================
    drawCover(canvas) {
        const ctx = setupCanvas(canvas, 400, 280);
        const coordSystem = GridUtils.createCoordSystem(400, 280, {
            xMin: -5, xMax: 5, yMin: -3.5, yMax: 3.5
        });

        // Draw grid and axes
        GridUtils.drawGrid(ctx, coordSystem);
        GridUtils.drawAxes(ctx, coordSystem, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, coordSystem, { showNumbers: false });

        // Draw a few points to make it interesting
        const points = [
            { x: 3, y: 2 },
            { x: -2, y: 1 },
            { x: 1, y: -2 },
            { x: -3, y: -1 }
        ];

        points.forEach(p => {
            GridUtils.drawPoint(ctx, coordSystem, p.x, p.y, {
                color: Colors.point,
                radius: 5
            });
        });

        // Highlight one point with coordinates
        const highlight = { x: 3, y: 2 };
        const { px, py } = coordSystem.toPixel(highlight.x, highlight.y);

        // Draw crosshair around highlighted point
        ctx.save();
        ctx.strokeStyle = '#6a82fb';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);

        // Horizontal line through point
        ctx.beginPath();
        ctx.moveTo(px - 30, py);
        ctx.lineTo(px + 30, py);
        ctx.stroke();

        // Vertical line through point
        ctx.beginPath();
        ctx.moveTo(px, py - 30);
        ctx.lineTo(px, py + 30);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.restore();

        // Coordinate label
        GridUtils.drawCoordinateLabel(ctx, coordSystem, highlight.x, highlight.y, {
            offset: { x: 15, y: -15 }
        });
    },

    // ============================================
    // PAGE 1: ONE NUMBER ISN'T ENOUGH
    // Number line vs 2D space
    // ============================================
    drawPage1(canvas) {
        const ctx = setupCanvas(canvas, 420, 300);

        // --- TOP: Number line ---
        ctx.save();

        const lineY = 70;
        const lineStart = 50;
        const lineEnd = 370;
        const unitSize = 40;
        const zeroX = 170;

        // Draw the number line
        ctx.strokeStyle = Colors.axis;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lineStart, lineY);
        ctx.lineTo(lineEnd, lineY);
        ctx.stroke();

        // Arrow
        ctx.beginPath();
        ctx.moveTo(lineEnd - 8, lineY - 4);
        ctx.lineTo(lineEnd, lineY);
        ctx.lineTo(lineEnd - 8, lineY + 4);
        ctx.stroke();

        // Tick marks and numbers
        ctx.font = '14px STIX Two Text, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = Colors.label;

        for (let i = -2; i <= 5; i++) {
            const x = zeroX + i * unitSize;
            ctx.beginPath();
            ctx.moveTo(x, lineY - 5);
            ctx.lineTo(x, lineY + 5);
            ctx.stroke();
            ctx.fillText(i.toString(), x, lineY + 10);
        }

        // Point at 3
        const pointX = zeroX + 3 * unitSize;
        ctx.beginPath();
        ctx.arc(pointX, lineY, 6, 0, Math.PI * 2);
        ctx.fillStyle = Colors.point;
        ctx.fill();

        // Label
        ctx.fillStyle = Colors.point;
        ctx.font = 'bold 14px STIX Two Text, serif';
        ctx.fillText('This point is at 3', pointX, lineY - 25);

        ctx.restore();

        // --- BOTTOM: 2D region with mystery point ---
        ctx.save();

        // Draw a simple box representing 2D space
        const boxX = 80;
        const boxY = 140;
        const boxW = 260;
        const boxH = 140;

        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(boxX, boxY, boxW, boxH);
        ctx.setLineDash([]);

        // Mystery point
        const mysteryX = boxX + 180;
        const mysteryY = boxY + 50;

        ctx.beginPath();
        ctx.arc(mysteryX, mysteryY, 6, 0, Math.PI * 2);
        ctx.fillStyle = Colors.pointHighlight;
        ctx.fill();

        // Question mark
        ctx.font = 'bold 18px STIX Two Text, serif';
        ctx.fillStyle = '#6a82fb';
        ctx.textAlign = 'center';
        ctx.fillText('?', mysteryX + 20, mysteryY - 10);

        // Label
        ctx.font = '14px STIX Two Text, serif';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('Where is this point?', boxX + boxW / 2, boxY + boxH + 20);

        ctx.restore();
    },

    // ============================================
    // PAGE 2: TWO AXES, ONE PLANE
    // ============================================
    drawPage2(canvas) {
        const ctx = setupCanvas(canvas, 420, 320);
        const coordSystem = GridUtils.createCoordSystem(420, 320, {
            xMin: -5, xMax: 6, yMin: -4, yMax: 4
        });

        // Draw grid (light)
        GridUtils.drawGrid(ctx, coordSystem);

        // Draw axes with labels
        GridUtils.drawAxes(ctx, coordSystem, {
            showArrows: true,
            showLabels: false
        });

        // Custom axis labels with more prominence
        const { originX, originY, canvasWidth } = coordSystem;

        ctx.save();
        ctx.font = 'bold 18px STIX Two Text, serif';
        ctx.fillStyle = '#6a82fb';

        // x-axis label
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('x-axis', canvasWidth - 50, originY + 10);

        // y-axis label
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('y-axis', originX + 15, 30);

        // Draw arrows indicating positive direction
        ctx.fillStyle = '#888';
        ctx.font = '12px STIX Two Text, serif';
        ctx.textAlign = 'center';
        ctx.fillText('positive', canvasWidth - 50, originY + 30);
        ctx.fillText('positive', originX + 50, 50);

        ctx.restore();

        // Draw tick marks
        GridUtils.drawAxisTicks(ctx, coordSystem, { showNumbers: false });

        // Highlight where they cross
        ctx.beginPath();
        ctx.arc(originX, originY, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(106, 130, 251, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#6a82fb';
        ctx.lineWidth = 2;
        ctx.stroke();
    },

    // ============================================
    // PAGE 3: THE ORIGIN
    // ============================================
    drawPage3(canvas) {
        const ctx = setupCanvas(canvas, 420, 320);
        const coordSystem = GridUtils.createCoordSystem(420, 320, {
            xMin: -5, xMax: 5, yMin: -4, yMax: 4
        });

        GridUtils.drawGrid(ctx, coordSystem);
        GridUtils.drawAxes(ctx, coordSystem, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, coordSystem);

        const { originX, originY } = coordSystem;

        // Highlight origin with a larger, more prominent marker
        ctx.save();

        // Outer glow
        ctx.beginPath();
        ctx.arc(originX, originY, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(106, 130, 251, 0.15)';
        ctx.fill();

        // Inner circle
        ctx.beginPath();
        ctx.arc(originX, originY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#6a82fb';
        ctx.fill();

        // Label "Origin"
        ctx.font = 'bold 16px STIX Two Text, serif';
        ctx.fillStyle = '#6a82fb';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('Origin', originX + 25, originY - 25);

        // Coordinate (0, 0)
        ctx.font = '16px STIX Two Text, serif';
        ctx.fillStyle = '#333';
        ctx.fillText('(0, 0)', originX + 25, originY - 5);

        ctx.restore();
    },

    // ============================================
    // PAGE 4: COORDINATES
    // Point at (3, 2) with projection lines
    // ============================================
    drawPage4(canvas) {
        const ctx = setupCanvas(canvas, 450, 320);
        const coordSystem = GridUtils.createCoordSystem(450, 320, {
            xMin: -1, xMax: 6, yMin: -1, yMax: 5
        });

        GridUtils.drawGrid(ctx, coordSystem);
        GridUtils.drawAxes(ctx, coordSystem, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, coordSystem);

        // Draw point with projections
        const pointX = 3;
        const pointY = 2;
        const { px, py } = coordSystem.toPixel(pointX, pointY);
        const { originX, originY } = coordSystem;

        // Projection lines (dashed)
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#6a82fb';
        ctx.lineWidth = 2;

        // Vertical projection to x-axis
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, originY);
        ctx.stroke();

        // Horizontal projection to y-axis
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(originX, py);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.restore();

        // Labels on axes
        ctx.save();
        ctx.font = 'bold 16px STIX Two Text, serif';
        ctx.fillStyle = '#6a82fb';

        // "3" on x-axis with annotation
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('3', px, originY + 20);

        // "2" on y-axis with annotation
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText('2', originX - 20, py);

        ctx.restore();

        // Draw the point
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = Colors.point;
        ctx.fill();

        // Coordinate label
        ctx.save();
        ctx.font = 'bold 18px STIX Two Text, serif';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('(3, 2)', px + 15, py - 15);

        // Annotation: "x first, then y"
        ctx.font = '14px STIX Two Text, serif';
        ctx.fillStyle = '#666';
        ctx.fillText('x first, then y', px + 15, py + 10);

        ctx.restore();
    },

    // ============================================
    // PAGE 5: READING POINTS
    // Multiple labeled points
    // ============================================
    drawPage5(canvas) {
        const ctx = setupCanvas(canvas, 450, 320);
        const coordSystem = GridUtils.createCoordSystem(450, 320, {
            xMin: -1, xMax: 7, yMin: -1, yMax: 6
        });

        GridUtils.drawGrid(ctx, coordSystem);
        GridUtils.drawAxes(ctx, coordSystem, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, coordSystem);

        // Points to display
        const points = [
            { x: 4, y: 3, label: 'A', coord: '(4, 3)' },
            { x: 1, y: 5, label: 'B', coord: '(1, 5)' },
            { x: 5, y: 1, label: 'C', coord: '(5, 1)' }
        ];

        const colors = ['#3b82f6', '#10b981', '#f59e0b'];

        points.forEach((p, i) => {
            const { px, py } = coordSystem.toPixel(p.x, p.y);

            // Draw point
            ctx.beginPath();
            ctx.arc(px, py, 7, 0, Math.PI * 2);
            ctx.fillStyle = colors[i];
            ctx.fill();

            // Point label (A, B, C)
            ctx.font = 'bold italic 16px STIX Two Text, serif';
            ctx.fillStyle = colors[i];
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.label, px + 12, py - 2);

            // Coordinate
            ctx.font = '14px STIX Two Text, serif';
            ctx.fillStyle = '#555';
            ctx.fillText(p.coord, px + 12, py + 16);
        });

        // Annotation for point A showing reading process
        const pA = coordSystem.toPixel(4, 3);
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
        ctx.lineWidth = 1.5;

        // Horizontal from A to y-axis
        ctx.beginPath();
        ctx.moveTo(pA.px, pA.py);
        ctx.lineTo(coordSystem.originX, pA.py);
        ctx.stroke();

        // Vertical from A to x-axis
        ctx.beginPath();
        ctx.moveTo(pA.px, pA.py);
        ctx.lineTo(pA.px, coordSystem.originY);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.restore();
    },

    // ============================================
    // EXERCISE DIAGRAM: Grid with single point
    // ============================================
    drawExerciseGrid(canvas, point, options = {}) {
        const { showPoint = true, showCoord = false, pointLabel = 'P' } = options;

        const ctx = setupCanvas(canvas, 280, 200);
        const coordSystem = GridUtils.createCoordSystem(280, 200, {
            xMin: -4, xMax: 6, yMin: -3, yMax: 4
        });

        GridUtils.drawGrid(ctx, coordSystem);
        GridUtils.drawAxes(ctx, coordSystem, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, coordSystem, { showNumbers: true });

        if (showPoint && point) {
            GridUtils.drawPoint(ctx, coordSystem, point.x, point.y, {
                color: Colors.point,
                radius: 6,
                label: pointLabel,
                labelOffset: { x: 10, y: -10 }
            });

            if (showCoord) {
                GridUtils.drawCoordinateLabel(ctx, coordSystem, point.x, point.y, {
                    offset: { x: 12, y: 12 }
                });
            }
        }

        return coordSystem;
    },

    // ============================================
    // SUMMARY DIAGRAM
    // ============================================
    drawSummary(canvas) {
        const ctx = setupCanvas(canvas, 400, 250);
        const coordSystem = GridUtils.createCoordSystem(400, 250, {
            xMin: -4, xMax: 5, yMin: -3, yMax: 3
        });

        GridUtils.drawGrid(ctx, coordSystem);
        GridUtils.drawAxes(ctx, coordSystem, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, coordSystem);

        const { originX, originY } = coordSystem;

        // Mark origin
        ctx.beginPath();
        ctx.arc(originX, originY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#6a82fb';
        ctx.fill();

        // Sample point with projection
        const pt = { x: 3, y: 2 };
        GridUtils.drawPoint(ctx, coordSystem, pt.x, pt.y, {
            color: Colors.point,
            radius: 6,
            showProjections: true
        });
        GridUtils.drawCoordinateLabel(ctx, coordSystem, pt.x, pt.y);
    }
};
