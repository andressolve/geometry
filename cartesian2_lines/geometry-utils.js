/**
 * Geometry Utilities
 * Shared drawing functions for Cartesian Plane lessons
 */

// ============================================
// COLOR CONSTANTS
// ============================================
const Colors = {
    axis: '#333333',
    grid: '#e0e0e0',
    gridMinor: '#f0f0f0',
    point: '#3b82f6',          // Blue
    pointHighlight: '#6a82fb', // Lighter blue
    pointCorrect: '#10b981',   // Green
    pointIncorrect: '#ef4444', // Red
    projection: '#94a3b8',     // Gray for projection lines
    label: '#333333',
    line: '#6a82fb'            // Line color
};

// ============================================
// CANVAS SETUP
// ============================================

function setupCanvas(canvas, width, height) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = '#333333';
    ctx.fillStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    return ctx;
}

function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#333333';
    ctx.fillStyle = '#333333';
    ctx.lineWidth = 2;
}

// ============================================
// COORDINATE GRID UTILITIES
// ============================================

const GridUtils = {
    /**
     * Create a coordinate system with SQUARE grid cells.
     * Uses uniform scale (pixels per unit is the same in x and y).
     * The grid is centered in the canvas with padding.
     */
    createCoordSystem(canvasWidth, canvasHeight, range) {
        const { xMin, xMax, yMin, yMax } = range;
        const xRange = xMax - xMin;
        const yRange = yMax - yMin;

        const padding = 20;
        const availW = canvasWidth - 2 * padding;
        const availH = canvasHeight - 2 * padding;

        // Uniform scale: use the smaller so everything fits
        const scale = Math.min(availW / xRange, availH / yRange);

        // Center the grid in the canvas
        const gridW = xRange * scale;
        const gridH = yRange * scale;
        const offsetX = padding + (availW - gridW) / 2;
        const offsetY = padding + (availH - gridH) / 2;

        // Origin in pixel coordinates
        const originX = offsetX + (-xMin) * scale;
        const originY = offsetY + yMax * scale;

        return {
            canvasWidth,
            canvasHeight,
            range,
            scale,       // uniform pixels-per-unit
            scaleX: scale,
            scaleY: scale,
            originX,
            originY,

            toPixel(x, y) {
                return {
                    px: originX + x * scale,
                    py: originY - y * scale
                };
            },

            toCoord(px, py) {
                return {
                    x: (px - originX) / scale,
                    y: (originY - py) / scale
                };
            },

            snapToGrid(px, py) {
                const coord = this.toCoord(px, py);
                const snappedX = Math.round(coord.x);
                const snappedY = Math.round(coord.y);
                return {
                    x: snappedX,
                    y: snappedY,
                    ...this.toPixel(snappedX, snappedY)
                };
            }
        };
    },

    drawGrid(ctx, coordSystem, options = {}) {
        const {
            gridColor = Colors.grid
        } = options;

        const { range, scale, originX, originY } = coordSystem;
        const { xMin, xMax, yMin, yMax } = range;

        // Compute pixel bounds of the grid area
        const gridLeft = originX + xMin * scale;
        const gridRight = originX + xMax * scale;
        const gridTop = originY - yMax * scale;
        const gridBottom = originY - yMin * scale;

        ctx.save();
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;

        for (let x = Math.ceil(xMin); x <= xMax; x++) {
            if (x === 0) continue;
            const px = originX + x * scale;
            ctx.beginPath();
            ctx.moveTo(px, gridTop);
            ctx.lineTo(px, gridBottom);
            ctx.stroke();
        }

        for (let y = Math.ceil(yMin); y <= yMax; y++) {
            if (y === 0) continue;
            const py = originY - y * scale;
            ctx.beginPath();
            ctx.moveTo(gridLeft, py);
            ctx.lineTo(gridRight, py);
            ctx.stroke();
        }

        ctx.restore();
    },

    drawAxes(ctx, coordSystem, options = {}) {
        const {
            axisColor = Colors.axis,
            showArrows = true,
            showLabels = true,
            xLabel = 'x',
            yLabel = 'y'
        } = options;

        const { range, scale, originX, originY } = coordSystem;
        const { xMin, xMax, yMin, yMax } = range;

        // Pixel bounds of grid area
        const gridLeft = originX + xMin * scale;
        const gridRight = originX + xMax * scale;
        const gridTop = originY - yMax * scale;
        const gridBottom = originY - yMin * scale;

        ctx.save();
        ctx.strokeStyle = axisColor;
        ctx.fillStyle = axisColor;
        ctx.lineWidth = 2;

        // X-axis
        ctx.beginPath();
        ctx.moveTo(gridLeft, originY);
        ctx.lineTo(gridRight, originY);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(originX, gridTop);
        ctx.lineTo(originX, gridBottom);
        ctx.stroke();

        if (showArrows) {
            const a = 8;
            // Arrow on x-axis (right end)
            ctx.beginPath();
            ctx.moveTo(gridRight - a, originY - a / 2);
            ctx.lineTo(gridRight, originY);
            ctx.lineTo(gridRight - a, originY + a / 2);
            ctx.stroke();

            // Arrow on y-axis (top end)
            ctx.beginPath();
            ctx.moveTo(originX - a / 2, gridTop + a);
            ctx.lineTo(originX, gridTop);
            ctx.lineTo(originX + a / 2, gridTop + a);
            ctx.stroke();
        }

        if (showLabels) {
            ctx.font = 'italic 16px STIX Two Text, serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(xLabel, gridRight - 18, originY + 20);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(yLabel, originX + 20, gridTop + 18);
        }

        ctx.restore();
    },

    drawAxisTicks(ctx, coordSystem, options = {}) {
        const {
            tickSize = 6,
            showNumbers = true,
            skipZero = true
        } = options;

        const { range, scale, originX, originY } = coordSystem;
        const { xMin, xMax, yMin, yMax } = range;

        ctx.save();
        ctx.strokeStyle = Colors.axis;
        ctx.fillStyle = Colors.axis;
        ctx.lineWidth = 2;

        for (let x = Math.ceil(xMin); x <= xMax; x++) {
            if (skipZero && x === 0) continue;
            const px = originX + x * scale;
            ctx.beginPath();
            ctx.moveTo(px, originY - tickSize / 2);
            ctx.lineTo(px, originY + tickSize / 2);
            ctx.stroke();

            if (showNumbers) {
                ctx.font = '14px STIX Two Text, serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(x.toString(), px, originY + tickSize + 2);
            }
        }

        for (let y = Math.ceil(yMin); y <= yMax; y++) {
            if (skipZero && y === 0) continue;
            const py = originY - y * scale;
            ctx.beginPath();
            ctx.moveTo(originX - tickSize / 2, py);
            ctx.lineTo(originX + tickSize / 2, py);
            ctx.stroke();

            if (showNumbers) {
                ctx.font = '14px STIX Two Text, serif';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText(y.toString(), originX - tickSize - 4, py);
            }
        }

        if (showNumbers) {
            ctx.font = '14px STIX Two Text, serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';
            ctx.fillText('0', originX - 6, originY + 6);
        }

        ctx.restore();
    },

    drawPoint(ctx, coordSystem, x, y, options = {}) {
        const {
            color = Colors.point,
            radius = 6,
            label = null,
            labelOffset = { x: 10, y: -10 },
            showProjections = false
        } = options;

        const { px, py } = coordSystem.toPixel(x, y);

        ctx.save();

        if (showProjections) {
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = Colors.projection;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px, coordSystem.originY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(coordSystem.originX, py);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (label) {
            ctx.font = '16px STIX Two Text, serif';
            ctx.fillStyle = Colors.label;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, px + labelOffset.x, py + labelOffset.y);
        }

        ctx.restore();
        return { px, py };
    },

    drawCoordinateLabel(ctx, coordSystem, x, y, options = {}) {
        const {
            offset = { x: 12, y: -12 },
            color = Colors.label,
            background = true
        } = options;

        const { px, py } = coordSystem.toPixel(x, y);
        const text = `(${x}, ${y})`;

        ctx.save();
        ctx.font = '14px STIX Two Text, serif';

        const textWidth = ctx.measureText(text).width;
        const textX = px + offset.x;
        const textY = py + offset.y;

        if (background) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(textX - 4, textY - 10, textWidth + 8, 20);
        }

        ctx.fillStyle = color;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, textX, textY);

        ctx.restore();
    },

    /**
     * Draw a line across the full visible grid given y = f(x)
     */
    drawLine(ctx, coordSystem, fn, options = {}) {
        const {
            color = Colors.line,
            lineWidth = 2.5,
            dash = []
        } = options;

        const { range } = coordSystem;
        const { xMin, xMax } = range;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        if (dash.length) ctx.setLineDash(dash);

        ctx.beginPath();
        const steps = 200;
        for (let i = 0; i <= steps; i++) {
            const x = xMin + (xMax - xMin) * (i / steps);
            const y = fn(x);
            const { px, py } = coordSystem.toPixel(x, y);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
        if (dash.length) ctx.setLineDash([]);
        ctx.restore();
    },

    /**
     * Draw a partial line for animation (from parameter t=0 to t=1)
     */
    drawLinePartial(ctx, coordSystem, fn, t, options = {}) {
        const {
            color = Colors.line,
            lineWidth = 2.5
        } = options;

        const { range } = coordSystem;
        const { xMin, xMax } = range;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        const steps = Math.floor(200 * t);
        for (let i = 0; i <= steps; i++) {
            const x = xMin + (xMax - xMin) * (i / 200);
            const y = fn(x);
            const { px, py } = coordSystem.toPixel(x, y);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.restore();
    }
};
