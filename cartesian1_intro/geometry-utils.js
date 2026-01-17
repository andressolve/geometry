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
    label: '#333333'
};

// ============================================
// CANVAS SETUP
// ============================================

/**
 * Set up a canvas for high-DPI displays
 */
function setupCanvas(canvas, width, height) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Set default styles
    ctx.strokeStyle = '#333333';
    ctx.fillStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    return ctx;
}

/**
 * Clear and reset a canvas
 */
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
     * Create a coordinate system configuration
     * @param {number} canvasWidth - Canvas width in pixels
     * @param {number} canvasHeight - Canvas height in pixels
     * @param {object} range - { xMin, xMax, yMin, yMax } in units
     * @param {object} origin - { x, y } position of origin in pixels (optional)
     */
    createCoordSystem(canvasWidth, canvasHeight, range, origin = null) {
        const { xMin, xMax, yMin, yMax } = range;
        const xRange = xMax - xMin;
        const yRange = yMax - yMin;

        // Calculate scale (pixels per unit)
        const scaleX = canvasWidth / xRange;
        const scaleY = canvasHeight / yRange;

        // Origin in pixel coordinates (if not specified, calculate from range)
        const originX = origin ? origin.x : -xMin * scaleX;
        const originY = origin ? origin.y : yMax * scaleY;

        return {
            canvasWidth,
            canvasHeight,
            range,
            scaleX,
            scaleY,
            originX,
            originY,

            // Convert math coordinates to canvas pixels
            toPixel(x, y) {
                return {
                    px: this.originX + x * this.scaleX,
                    py: this.originY - y * this.scaleY  // Y is inverted in canvas
                };
            },

            // Convert canvas pixels to math coordinates
            toCoord(px, py) {
                return {
                    x: (px - this.originX) / this.scaleX,
                    y: (this.originY - py) / this.scaleY
                };
            },

            // Snap to nearest grid point
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

    /**
     * Draw a coordinate grid
     */
    drawGrid(ctx, coordSystem, options = {}) {
        const {
            showMinorGrid = false,
            gridColor = Colors.grid,
            minorGridColor = Colors.gridMinor
        } = options;

        const { canvasWidth, canvasHeight, range, scaleX, scaleY, originX, originY } = coordSystem;
        const { xMin, xMax, yMin, yMax } = range;

        ctx.save();

        // Minor grid lines (0.5 unit spacing)
        if (showMinorGrid) {
            ctx.strokeStyle = minorGridColor;
            ctx.lineWidth = 0.5;

            for (let x = Math.ceil(xMin); x <= xMax; x += 0.5) {
                if (x === Math.floor(x)) continue; // Skip major lines
                const px = originX + x * scaleX;
                ctx.beginPath();
                ctx.moveTo(px, 0);
                ctx.lineTo(px, canvasHeight);
                ctx.stroke();
            }

            for (let y = Math.ceil(yMin); y <= yMax; y += 0.5) {
                if (y === Math.floor(y)) continue;
                const py = originY - y * scaleY;
                ctx.beginPath();
                ctx.moveTo(0, py);
                ctx.lineTo(canvasWidth, py);
                ctx.stroke();
            }
        }

        // Major grid lines (1 unit spacing)
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;

        for (let x = Math.ceil(xMin); x <= xMax; x++) {
            if (x === 0) continue; // Skip axis
            const px = originX + x * scaleX;
            ctx.beginPath();
            ctx.moveTo(px, 0);
            ctx.lineTo(px, canvasHeight);
            ctx.stroke();
        }

        for (let y = Math.ceil(yMin); y <= yMax; y++) {
            if (y === 0) continue; // Skip axis
            const py = originY - y * scaleY;
            ctx.beginPath();
            ctx.moveTo(0, py);
            ctx.lineTo(canvasWidth, py);
            ctx.stroke();
        }

        ctx.restore();
    },

    /**
     * Draw the coordinate axes
     */
    drawAxes(ctx, coordSystem, options = {}) {
        const {
            axisColor = Colors.axis,
            showArrows = true,
            showLabels = true,
            xLabel = 'x',
            yLabel = 'y'
        } = options;

        const { canvasWidth, canvasHeight, originX, originY } = coordSystem;

        ctx.save();
        ctx.strokeStyle = axisColor;
        ctx.fillStyle = axisColor;
        ctx.lineWidth = 2;

        // X-axis
        ctx.beginPath();
        ctx.moveTo(0, originY);
        ctx.lineTo(canvasWidth, originY);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, canvasHeight);
        ctx.stroke();

        // Arrows
        if (showArrows) {
            const arrowSize = 8;

            // X-axis arrow (right)
            ctx.beginPath();
            ctx.moveTo(canvasWidth - arrowSize, originY - arrowSize / 2);
            ctx.lineTo(canvasWidth, originY);
            ctx.lineTo(canvasWidth - arrowSize, originY + arrowSize / 2);
            ctx.stroke();

            // Y-axis arrow (up)
            ctx.beginPath();
            ctx.moveTo(originX - arrowSize / 2, arrowSize);
            ctx.lineTo(originX, 0);
            ctx.lineTo(originX + arrowSize / 2, arrowSize);
            ctx.stroke();
        }

        // Axis labels
        if (showLabels) {
            ctx.font = 'italic 16px STIX Two Text, serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(xLabel, canvasWidth - 20, originY + 20);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(yLabel, originX + 20, 20);
        }

        ctx.restore();
    },

    /**
     * Draw tick marks and numbers on axes
     */
    drawAxisTicks(ctx, coordSystem, options = {}) {
        const {
            tickSize = 6,
            showNumbers = true,
            skipZero = true
        } = options;

        const { range, scaleX, scaleY, originX, originY } = coordSystem;
        const { xMin, xMax, yMin, yMax } = range;

        ctx.save();
        ctx.strokeStyle = Colors.axis;
        ctx.fillStyle = Colors.axis;
        ctx.lineWidth = 2;

        // X-axis ticks
        for (let x = Math.ceil(xMin); x <= xMax; x++) {
            if (skipZero && x === 0) continue;
            const px = originX + x * scaleX;

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

        // Y-axis ticks
        for (let y = Math.ceil(yMin); y <= yMax; y++) {
            if (skipZero && y === 0) continue;
            const py = originY - y * scaleY;

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

        // Origin label
        if (showNumbers) {
            ctx.font = '14px STIX Two Text, serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';
            ctx.fillText('0', originX - 6, originY + 6);
        }

        ctx.restore();
    },

    /**
     * Draw a point on the coordinate system
     */
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

        // Projection lines (dashed)
        if (showProjections) {
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = Colors.projection;
            ctx.lineWidth = 1;

            // To x-axis
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px, coordSystem.originY);
            ctx.stroke();

            // To y-axis
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(coordSystem.originX, py);
            ctx.stroke();

            ctx.setLineDash([]);
        }

        // Point
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Label
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

    /**
     * Draw coordinate label near a point
     */
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

        // Background
        if (background) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(textX - 4, textY - 10, textWidth + 8, 20);
        }

        ctx.fillStyle = color;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, textX, textY);

        ctx.restore();
    }
};

// ============================================
// GENERAL GEOMETRY UTILITIES
// ============================================

const GeometryUtils = {
    /**
     * Draw text label
     */
    drawLabel(ctx, x, y, text, options = {}) {
        const {
            font = '16px STIX Two Text, serif',
            color = '#333333',
            align = 'center',
            baseline = 'middle'
        } = options;

        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.textBaseline = baseline;
        ctx.fillText(text, x, y);
    },

    /**
     * Draw a line segment
     */
    drawSegment(ctx, p1, p2, color = '#333333', width = 2) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;
    },

    /**
     * Draw a dashed line segment
     */
    drawDashedSegment(ctx, p1, p2, color = '#666666', width = 1.5) {
        ctx.beginPath();
        ctx.setLineDash([6, 4]);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;
    },

    /**
     * Draw a point with optional label
     */
    drawPoint(ctx, x, y, label = null, offsetX = 0, offsetY = 0, size = 4) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = '#333333';
        ctx.fill();

        if (label) {
            ctx.font = 'italic 16px STIX Two Text, serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#333333';
            ctx.fillText(label, x + offsetX, y + offsetY);
        }
    }
};
