/**
 * Geometry Utilities for Lesson 6: Isosceles Triangles
 */

// ============================================
// COLOR CONSTANTS
// ============================================
const Colors = {
    pair1: { fill: 'rgba(59, 130, 246, 0.3)', stroke: 'rgb(59, 130, 246)' },   // Blue - legs
    pair2: { fill: 'rgba(239, 68, 68, 0.3)', stroke: 'rgb(239, 68, 68)' },     // Red - base angles
    pair3: { fill: 'rgba(16, 185, 129, 0.3)', stroke: 'rgb(16, 185, 129)' }    // Green - half-bases/other
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
// GEOMETRY UTILITIES
// ============================================

const GeometryUtils = {
    /**
     * Calculate midpoint between two points
     */
    midpoint(p1, p2) {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
    },

    /**
     * Calculate distance between two points
     */
    distance(p1, p2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    /**
     * Calculate angle from p1 to p2 (in radians)
     */
    angle(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
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
     * Draw a dashed line segment (for constructions)
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
     * Draw a triangle
     */
    drawTriangle(ctx, A, B, C, color = '#333333', width = 2) {
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.lineTo(C.x, C.y);
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;
    },

    /**
     * Draw tick marks on a segment to indicate congruence
     */
    drawTickMarks(ctx, x1, y1, x2, y2, count = 1, color = '#333333') {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);

        if (len === 0) return;

        // Perpendicular direction
        const perpX = -dy / len;
        const perpY = dx / len;

        const tickLen = 8;
        const spacing = 6;

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

        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;
    },

    /**
     * Draw an angle arc to indicate congruence
     */
    drawAngleArc(ctx, vertex, p1, p2, radius = 25, count = 1, color = '#333333') {
        const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
        const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);

        // Determine the smaller arc direction
        let startAngle = angle1;
        let endAngle = angle2;
        let diff = endAngle - startAngle;

        // Normalize to [-PI, PI]
        while (diff > Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;

        const counterclockwise = diff < 0;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        for (let i = 0; i < count; i++) {
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, radius + i * 4, startAngle, endAngle, counterclockwise);
            ctx.stroke();
        }

        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;
    },

    /**
     * Draw a filled angle sector (pie wedge)
     */
    drawAngleSector(ctx, vertex, p1, p2, radius = 25, fillColor, strokeColor) {
        const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
        const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);

        let diff = angle2 - angle1;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        const counterclockwise = diff < 0;

        ctx.beginPath();
        ctx.moveTo(vertex.x, vertex.y);
        ctx.lineTo(vertex.x + radius * Math.cos(angle1), vertex.y + radius * Math.sin(angle1));
        ctx.arc(vertex.x, vertex.y, radius, angle1, angle2, counterclockwise);
        ctx.closePath();

        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.strokeStyle = '#333333';
        ctx.fillStyle = '#333333';
    },

    /**
     * Draw a right angle mark (small square)
     */
    drawRightAngle(ctx, vertex, p1, p2, size = 12) {
        const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
        const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);

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

        ctx.beginPath();
        ctx.moveTo(corner1.x, corner1.y);
        ctx.lineTo(corner3.x, corner3.y);
        ctx.lineTo(corner2.x, corner2.y);
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    },

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
    }
};
