/**
 * Geometry Utilities for Lesson 5: Congruence
 * 
 * Color palette for congruence pairs:
 * - Pair 1 (blue): rgba(59, 130, 246, 0.6) / #3b82f6
 * - Pair 2 (red): rgba(239, 68, 68, 0.6) / #ef4444
 * - Pair 3 (green): rgba(16, 185, 129, 0.6) / #10b981
 */

// Color definitions for congruent parts
const Colors = {
    pair1: { fill: 'rgba(59, 130, 246, 0.3)', stroke: '#3b82f6' },
    pair2: { fill: 'rgba(239, 68, 68, 0.3)', stroke: '#ef4444' },
    pair3: { fill: 'rgba(16, 185, 129, 0.3)', stroke: '#10b981' },
    neutral: { fill: 'rgba(200, 200, 200, 0.2)', stroke: '#666666' }
};

/**
 * Setup canvas for high-DPI displays
 */
function setupCanvas(canvas, width, height) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Default styles
    ctx.strokeStyle = '#333333';
    ctx.fillStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    return ctx;
}

/**
 * Clear canvas and reset styles
 */
function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#333333';
    ctx.fillStyle = '#333333';
    ctx.lineWidth = 2;
}

const GeometryUtils = {
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
     * Draw a line segment between two points
     */
    drawSegment(ctx, p1, p2, color = '#333333', lineWidth = 2) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
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
     * Draw tick marks on a segment to indicate congruence
     * @param {number} count - Number of tick marks (1, 2, or 3)
     */
    drawTickMarks(ctx, x1, y1, x2, y2, count = 1, color = '#333333') {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);

        // Perpendicular direction
        const perpX = -dy / len;
        const perpY = dx / len;

        const tickLen = 8;
        const spacing = 6;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        for (let i = 0; i < count; i++) {
            const offset = (i - (count - 1) / 2) * spacing;
            const cx = midX + (dx / len) * offset;
            const cy = midY + (dy / len) * offset;

            ctx.beginPath();
            ctx.moveTo(cx - perpX * tickLen, cy - perpY * tickLen);
            ctx.lineTo(cx + perpX * tickLen, cy + perpY * tickLen);
            ctx.stroke();
        }
        ctx.restore();
    },

    /**
     * Draw an angle arc to indicate congruence (arc only, not filled)
     * @param {number} count - Number of arcs (1, 2, or 3)
     */
    drawAngleArc(ctx, vertex, p1, p2, radius = 25, count = 1, color = '#333333') {
        const angle1 = this.getAngle(vertex, p1);
        const angle2 = this.getAngle(vertex, p2);

        // Determine shortest arc direction
        let diff = angle2 - angle1;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        const counterclockwise = diff < 0;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;

        for (let i = 0; i < count; i++) {
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, radius + i * 5, angle1, angle2, counterclockwise);
            ctx.stroke();
        }
        ctx.restore();
    },

    /**
     * Draw a filled angle sector with arc
     */
    drawAngleMark(ctx, vertex, p1, p2, fillColor, strokeColor, radius = 30, label = null, labelRadius = 45) {
        const angle1 = this.getAngle(vertex, p1);
        const angle2 = this.getAngle(vertex, p2);

        let diff = angle2 - angle1;
        while (diff < 0) diff += 2 * Math.PI;
        while (diff >= 2 * Math.PI) diff -= 2 * Math.PI;

        const counterclockwise = diff > Math.PI;

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
            ctx.fillStyle = '#333333';
            ctx.font = 'italic 16px STIX Two Text';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, labelX, labelY);
        }
    },

    /**
     * Draw a complete triangle
     */
    drawTriangle(ctx, p1, p2, p3, color = '#333333', lineWidth = 2) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    },

    /**
     * Draw a quadrilateral
     */
    drawQuadrilateral(ctx, p1, p2, p3, p4, color = '#333333', lineWidth = 2) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    },

    /**
     * Draw a right angle marker (small square)
     */
    drawRightAngle(ctx, vertex, p1, p2, size = 12) {
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
            x: corner1.x + size * Math.cos(angle2),
            y: corner1.y + size * Math.sin(angle2)
        };

        ctx.save();
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(corner1.x, corner1.y);
        ctx.lineTo(corner3.x, corner3.y);
        ctx.lineTo(corner2.x, corner2.y);
        ctx.stroke();
        ctx.restore();
    }
};
