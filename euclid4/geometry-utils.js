/**
 * Geometry Utilities for Lesson 4: Practice Session
 * 
 * Adapted from Lesson 3 with updated color palette per spec:
 * - Given angles: soft coral #e8a87c
 * - Unknown angles: soft blue #7ca8e8
 * - Correct: muted green #7cb87c
 * - Incorrect: muted red #c87c7c
 */

const GeometryUtils = {
    // ============================================
    // BASIC DRAWING UTILITIES
    // ============================================

    /**
     * Extend a point past a target by a given distance
     */
    extendPoint(start, target, distance) {
        const dx = target.x - start.x;
        const dy = target.y - start.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len === 0) return { x: target.x, y: target.y };
        return {
            x: target.x + (dx / len) * distance,
            y: target.y + (dy / len) * distance
        };
    },

    /**
     * Calculate angle (in radians) from vertex to a point
     */
    getAngle(vertex, point) {
        return Math.atan2(point.y - vertex.y, point.x - vertex.x);
    },

    /**
     * Draw a solid filled arrowhead at the end of a line
     */
    drawArrowhead(ctx, from, to, size = 10) {
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        ctx.save();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(to.x, to.y);
        ctx.lineTo(to.x - size * Math.cos(angle - Math.PI / 6), to.y - size * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(to.x - size * Math.cos(angle + Math.PI / 6), to.y - size * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    },

    /**
     * Draw a line with arrows on both ends, extending past the given points
     */
    drawLine(ctx, p1, p2, extend = 40) {
        const ext1 = this.extendPoint(p2, p1, extend);
        const ext2 = this.extendPoint(p1, p2, extend);

        ctx.beginPath();
        ctx.moveTo(ext1.x, ext1.y);
        ctx.lineTo(ext2.x, ext2.y);
        ctx.stroke();

        this.drawArrowhead(ctx, p1, ext1);
        this.drawArrowhead(ctx, p2, ext2);
    },

    /**
     * Draw a line segment between two points (no arrows)
     */
    drawSegment(ctx, p1, p2) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    },

    /**
     * Draw a ray from origin through direction point, extending past it
     */
    drawRay(ctx, origin, direction, extend = 60) {
        const ext = this.extendPoint(origin, direction, extend);

        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(ext.x, ext.y);
        ctx.stroke();

        this.drawArrowhead(ctx, origin, ext);
    },

    /**
     * Draw a point with an optional label
     */
    drawPoint(ctx, x, y, label = null, offsetX = 0, offsetY = 0, size = 4) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        if (label) {
            ctx.font = 'italic 16px STIX Two Text';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x + offsetX, y + offsetY);
        }
    },

    /**
     * Draw a colored angle arc (sector/pie wedge) with optional label
     */
    drawAngleMark(ctx, vertex, p1, p2, fillColor, strokeColor, radius = 30, label = null, labelRadius = 45) {
        const angle1 = this.getAngle(vertex, p1);
        const angle2 = this.getAngle(vertex, p2);

        // Calculate the angular difference going counterclockwise from angle1 to angle2
        let diff = angle2 - angle1;
        while (diff < 0) diff += 2 * Math.PI;
        while (diff >= 2 * Math.PI) diff -= 2 * Math.PI;

        // If diff > π, we're going the long way; go clockwise instead
        const counterclockwise = diff > Math.PI;

        // Draw filled pie wedge
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(vertex.x, vertex.y);
        ctx.lineTo(vertex.x + radius * Math.cos(angle1), vertex.y + radius * Math.sin(angle1));
        ctx.arc(vertex.x, vertex.y, radius, angle1, angle2, counterclockwise);
        ctx.lineTo(vertex.x, vertex.y);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        if (label) {
            let midAngle;
            if (counterclockwise) {
                let cwDiff = angle1 - angle2;
                while (cwDiff < 0) cwDiff += 2 * Math.PI;
                midAngle = angle1 - cwDiff / 2;
            } else {
                midAngle = angle1 + diff / 2;
            }
            const labelX = vertex.x + labelRadius * Math.cos(midAngle);
            const labelY = vertex.y + labelRadius * Math.sin(midAngle);
            ctx.fillStyle = '#3d3d3d';
            ctx.font = 'italic 14px STIX Two Text';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, labelX, labelY);
        }

        // Reset styles
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#3d3d3d';
    },

    /**
     * Draw a right angle marker (small square)
     */
    drawRightAngle(ctx, vertex, p1, p2, size = 15) {
        const angle1 = this.getAngle(vertex, p1);
        const angle2 = this.getAngle(vertex, p2);

        const corner1 = {
            x: vertex.x + size * Math.cos(angle1),
            y: vertex.y + size * Math.sin(angle1)
        };
        const corner2 = {
            x: vertex.x + size * Math.cos(angle2),
            y: vertex.y + size * Math.sin(angle2)
        };
        const corner3 = {
            x: vertex.x + size * Math.cos(angle1) + size * Math.cos(angle2),
            y: vertex.y + size * Math.sin(angle1) + size * Math.sin(angle2)
        };

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(corner1.x, corner1.y);
        ctx.lineTo(corner3.x, corner3.y);
        ctx.lineTo(corner2.x, corner2.y);
        ctx.strokeStyle = '#3d3d3d';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    },

    /**
     * Draw parallel line indicator arrows (chevrons)
     */
    drawParallelMarks(ctx, p1, p2, count = 1) {
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const angle = this.getAngle(p1, p2);
        const size = 6;
        const spacing = 8;

        ctx.save();
        ctx.strokeStyle = '#3d3d3d';
        ctx.lineWidth = 2;

        for (let i = 0; i < count; i++) {
            const offset = (i - (count - 1) / 2) * spacing;
            const cx = midX + offset * Math.cos(angle);
            const cy = midY + offset * Math.sin(angle);

            const perpAngle = angle + Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(
                cx - size * Math.cos(angle) + size * 0.5 * Math.cos(perpAngle),
                cy - size * Math.sin(angle) + size * 0.5 * Math.sin(perpAngle)
            );
            ctx.lineTo(cx, cy);
            ctx.lineTo(
                cx - size * Math.cos(angle) - size * 0.5 * Math.cos(perpAngle),
                cy - size * Math.sin(angle) - size * 0.5 * Math.sin(perpAngle)
            );
            ctx.stroke();
        }

        ctx.restore();
    },

    /**
     * Draw a label for a line (script letter style)
     */
    drawLineLabel(ctx, x, y, label, isScript = false) {
        ctx.save();
        ctx.fillStyle = '#3d3d3d';
        ctx.font = isScript ? '18px STIX Two Text' : 'italic 18px STIX Two Text';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
        ctx.restore();
    }
};

// ============================================
// COLOR PALETTE (Lesson 4 spec)
// ============================================
const Colors = {
    given: {
        fill: 'rgba(232, 168, 124, 0.4)',
        stroke: '#e8a87c'
    },
    unknown: {
        fill: 'rgba(124, 168, 232, 0.4)',
        stroke: '#7ca8e8'
    },
    correct: {
        fill: 'rgba(124, 184, 124, 0.4)',
        stroke: '#7cb87c'
    },
    incorrect: {
        fill: 'rgba(200, 124, 124, 0.4)',
        stroke: '#c87c7c'
    },
    neutral: {
        fill: 'rgba(200, 200, 200, 0.2)',
        stroke: 'rgba(150, 150, 150, 0.5)'
    },
    highlight1: {
        fill: 'rgba(59, 130, 246, 0.3)',
        stroke: 'rgb(59, 130, 246)'
    },
    highlight2: {
        fill: 'rgba(16, 185, 129, 0.3)',
        stroke: 'rgb(16, 185, 129)'
    },
    highlight3: {
        fill: 'rgba(147, 51, 234, 0.3)',
        stroke: 'rgb(147, 51, 234)'
    },
    highlight4: {
        fill: 'rgba(249, 115, 22, 0.3)',
        stroke: 'rgb(249, 115, 22)'
    }
};

// ============================================
// HIGH-DPI CANVAS SETUP
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
    ctx.strokeStyle = '#3d3d3d';
    ctx.fillStyle = '#3d3d3d';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    return ctx;
}

/**
 * Clear and reset a canvas
 */
function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#3d3d3d';
    ctx.fillStyle = '#3d3d3d';
    ctx.lineWidth = 1.5;
}
