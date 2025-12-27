/**
 * Geometry Utilities for Lesson 3: Parallel Lines & Transversals
 * 
 * This module provides:
 * 1. Basic drawing utilities (lines, arrows, angle marks, etc.)
 * 2. The 8-angle parallel lines configuration
 * 3. A reusable function to draw the parallel lines diagram with customizable highlights
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
     * Draw a point with an optional label
     */
    drawPoint(ctx, x, y, label = null, offsetX = 0, offsetY = 0, size = 4) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        if (label) {
            ctx.font = 'italic 16px Noto Serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x + offsetX, y + offsetY);
        }
    },

    /**
     * Draw a colored angle arc (sector/pie wedge) with optional label
     * The sector is drawn centered at the vertex point
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
            ctx.fillStyle = '#333';
            ctx.font = 'italic 14px Noto Serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, labelX, labelY);
        }

        // Reset styles
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#333';
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
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;

        for (let i = 0; i < count; i++) {
            const offset = (i - (count - 1) / 2) * spacing;
            const cx = midX + offset * Math.cos(angle);
            const cy = midY + offset * Math.sin(angle);

            // Draw a small chevron pointing in the direction of the line
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
        ctx.fillStyle = '#333';
        ctx.font = isScript ? '18px Noto Serif' : 'italic 18px Noto Serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
        ctx.restore();
    }
};

// ============================================
// PARALLEL LINES CONFIGURATION
// ============================================

/**
 * Configuration for the 8-angle diagram
 * This defines the geometry once, and can be reused across all pages
 */
const ParallelLinesConfig = {
    // Canvas dimensions (will be scaled)
    width: 400,
    height: 320,

    // Line positions
    lineL: { y: 100 },  // Upper parallel line
    lineM: { y: 220 },  // Lower parallel line
    margin: 50,         // Horizontal margin

    // Transversal angle (degrees from horizontal, going down-right)
    transversalAngle: 70,

    // Colors for different angle types
    colors: {
        corresponding: {
            fill: 'rgba(59, 130, 246, 0.3)',
            stroke: 'rgb(59, 130, 246)'
        },
        alternateInterior: {
            fill: 'rgba(16, 185, 129, 0.3)',
            stroke: 'rgb(16, 185, 129)'
        },
        alternateExterior: {
            fill: 'rgba(147, 51, 234, 0.3)',
            stroke: 'rgb(147, 51, 234)'
        },
        vertical: {
            fill: 'rgba(249, 115, 22, 0.3)',
            stroke: 'rgb(249, 115, 22)'
        },
        neutral: {
            fill: 'rgba(200, 200, 200, 0.2)',
            stroke: 'rgba(150, 150, 150, 0.5)'
        }
    },

    /**
     * Calculate intersection points and angle endpoints
     */
    calculate(width, height) {
        const centerX = width / 2;
        const lineL_y = height * 0.32;
        const lineM_y = height * 0.68;
        const margin = 40;

        // Transversal angle in radians (measuring from horizontal)
        const tAngleRad = (this.transversalAngle * Math.PI) / 180;

        // Calculate where transversal crosses line L
        const upperIntersect = { x: centerX, y: lineL_y };

        // Calculate where transversal crosses line M
        // The transversal goes through both intersection points
        const dy = lineM_y - lineL_y;
        const dx = dy / Math.tan(tAngleRad);
        const lowerIntersect = { x: centerX + dx, y: lineM_y };

        // Endpoints for line L
        const lineL_left = { x: margin, y: lineL_y };
        const lineL_right = { x: width - margin, y: lineL_y };

        // Endpoints for line M
        const lineM_left = { x: margin, y: lineM_y };
        const lineM_right = { x: width - margin, y: lineM_y };

        // Endpoints for transversal (extend beyond both intersections)
        const tExtend = 60;
        const tDirX = Math.cos(Math.PI / 2 - tAngleRad);
        const tDirY = Math.sin(Math.PI / 2 - tAngleRad);
        const transversal_top = {
            x: upperIntersect.x - tDirX * tExtend,
            y: upperIntersect.y - tDirY * tExtend
        };
        const transversal_bottom = {
            x: lowerIntersect.x + tDirX * tExtend,
            y: lowerIntersect.y + tDirY * tExtend
        };

        // Define angle reference points for each of the 8 angles
        // At upper intersection (angles a, b, c, d - clockwise from upper-left)
        // At lower intersection (angles e, f, g, h - clockwise from upper-left)

        // For drawing angles, we need points that define the rays
        // Upper intersection: rays go left (to lineL_left), right (to lineL_right), 
        //                     up-left (to transversal_top), down-right (toward lowerIntersect)
        // Lower intersection: rays go left (to lineM_left), right (to lineM_right),
        //                     up-left (toward upperIntersect), down-right (to transversal_bottom)

        return {
            upperIntersect,
            lowerIntersect,
            lineL: { left: lineL_left, right: lineL_right, y: lineL_y },
            lineM: { left: lineM_left, right: lineM_right, y: lineM_y },
            transversal: { top: transversal_top, bottom: transversal_bottom },

            // Angle definitions: each angle is defined by two rays from the vertex
            // The order of p1, p2 matters for drawing the arc correctly
            angles: {
                // Upper intersection (vertex = upperIntersect)
                a: { vertex: 'upper', p1: 'L_left', p2: 't_top' },      // upper-left exterior
                b: { vertex: 'upper', p1: 't_top', p2: 'L_right' },     // upper-right exterior
                c: { vertex: 'upper', p1: 'L_right', p2: 't_bottom' },  // lower-right interior
                d: { vertex: 'upper', p1: 't_bottom', p2: 'L_left' },   // lower-left interior

                // Lower intersection (vertex = lowerIntersect)
                e: { vertex: 'lower', p1: 'M_left', p2: 't_top' },      // upper-left interior
                f: { vertex: 'lower', p1: 't_top', p2: 'M_right' },     // upper-right interior
                g: { vertex: 'lower', p1: 'M_right', p2: 't_bottom' },  // lower-right exterior
                h: { vertex: 'lower', p1: 't_bottom', p2: 'M_left' }    // lower-left exterior
            },

            // Helper to get actual points for angle drawing
            getAnglePoints(angleName) {
                const angleDef = this.angles[angleName];
                const vertex = angleDef.vertex === 'upper' ? this.upperIntersect : this.lowerIntersect;

                const getPoint = (ref) => {
                    switch (ref) {
                        case 'L_left': return this.lineL.left;
                        case 'L_right': return this.lineL.right;
                        case 'M_left': return this.lineM.left;
                        case 'M_right': return this.lineM.right;
                        case 't_top': return this.transversal.top;
                        case 't_bottom': return this.transversal.bottom;
                    }
                };

                return {
                    vertex,
                    p1: getPoint(angleDef.p1),
                    p2: getPoint(angleDef.p2)
                };
            }
        };
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
    ctx.strokeStyle = '#333333';
    ctx.fillStyle = '#333333';
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
    ctx.strokeStyle = '#333333';
    ctx.fillStyle = '#333333';
    ctx.lineWidth = 1.5;
}
