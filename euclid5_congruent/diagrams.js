/**
 * Diagram Drawing Functions for Lesson 5: Congruence
 */

const Diagrams = {
    // ============================================
    // COVER: Two congruent triangles - bold and irregular
    // ============================================
    drawCover(canvas) {
        const width = 700, height = 350;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Very irregular scalene triangle - long thin shape
        const baseTriangle = [
            { x: 0, y: 0 },       // A
            { x: 160, y: 25 },    // B - long slanted base
            { x: 40, y: -90 }     // C - sharp peak offset left
        ];

        // First triangle: tilted -10 degrees, positioned on left side
        const rot1 = -10 * Math.PI / 180;
        const cos1 = Math.cos(rot1);
        const sin1 = Math.sin(rot1);
        const offset1 = { x: 80, y: 200 };
        
        const t1 = {
            A: { 
                x: baseTriangle[0].x * cos1 - baseTriangle[0].y * sin1 + offset1.x,
                y: baseTriangle[0].x * sin1 + baseTriangle[0].y * cos1 + offset1.y
            },
            B: { 
                x: baseTriangle[1].x * cos1 - baseTriangle[1].y * sin1 + offset1.x,
                y: baseTriangle[1].x * sin1 + baseTriangle[1].y * cos1 + offset1.y
            },
            C: { 
                x: baseTriangle[2].x * cos1 - baseTriangle[2].y * sin1 + offset1.x,
                y: baseTriangle[2].x * sin1 + baseTriangle[2].y * cos1 + offset1.y
            }
        };

        // Compute centroid of t1
        const centroid1 = {
            x: (t1.A.x + t1.B.x + t1.C.x) / 3,
            y: (t1.A.y + t1.B.y + t1.C.y) / 3
        };

        // Second triangle: rotate t1 by 60 degrees clockwise around its centroid, then translate right
        const rotAngle = 60 * Math.PI / 180;  // 60 degrees clockwise (positive in canvas coords where Y is down)
        const cosR = Math.cos(rotAngle);
        const sinR = Math.sin(rotAngle);
        const translateX = 400;  // shift right to separate the triangles
        
        // Rotate each point of t1 around centroid1, then translate
        const t2 = {
            D: { 
                x: (t1.A.x - centroid1.x) * cosR - (t1.A.y - centroid1.y) * sinR + centroid1.x + translateX,
                y: (t1.A.x - centroid1.x) * sinR + (t1.A.y - centroid1.y) * cosR + centroid1.y
            },
            E: { 
                x: (t1.B.x - centroid1.x) * cosR - (t1.B.y - centroid1.y) * sinR + centroid1.x + translateX,
                y: (t1.B.x - centroid1.x) * sinR + (t1.B.y - centroid1.y) * cosR + centroid1.y
            },
            F: { 
                x: (t1.C.x - centroid1.x) * cosR - (t1.C.y - centroid1.y) * sinR + centroid1.x + translateX,
                y: (t1.C.x - centroid1.x) * sinR + (t1.C.y - centroid1.y) * cosR + centroid1.y
            }
        };

        // Draw triangles
        GeometryUtils.drawTriangle(ctx, t1.A, t1.B, t1.C);
        GeometryUtils.drawTriangle(ctx, t2.D, t2.E, t2.F);

        // Add tick marks for corresponding sides
        GeometryUtils.drawTickMarks(ctx, t1.A.x, t1.A.y, t1.B.x, t1.B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.D.x, t2.D.y, t2.E.x, t2.E.y, 1, Colors.pair1.stroke);

        GeometryUtils.drawTickMarks(ctx, t1.B.x, t1.B.y, t1.C.x, t1.C.y, 2, Colors.pair2.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.E.x, t2.E.y, t2.F.x, t2.F.y, 2, Colors.pair2.stroke);

        GeometryUtils.drawTickMarks(ctx, t1.C.x, t1.C.y, t1.A.x, t1.A.y, 3, Colors.pair3.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.F.x, t2.F.y, t2.D.x, t2.D.y, 3, Colors.pair3.stroke);

        // Labels
        ctx.fillStyle = '#333333';
        GeometryUtils.drawPoint(ctx, t1.A.x, t1.A.y, 'A', -12, 12);
        GeometryUtils.drawPoint(ctx, t1.B.x, t1.B.y, 'B', 10, 14);
        GeometryUtils.drawPoint(ctx, t1.C.x, t1.C.y, 'C', -12, -8);

        GeometryUtils.drawPoint(ctx, t2.D.x, t2.D.y, 'D', 12, -8);
        GeometryUtils.drawPoint(ctx, t2.E.x, t2.E.y, 'E', -12, -12);
        GeometryUtils.drawPoint(ctx, t2.F.x, t2.F.y, 'F', 12, 10);

        // Congruence symbol between
        ctx.font = '28px STIX Two Text';
        ctx.textAlign = 'center';
        ctx.fillText('≅', 350, 200);
    },

    // ============================================
    // PAGE 1: What is congruent - two irregular trapezoids
    // Second quadrilateral is the first rotated 60 degrees clockwise
    // ============================================
    drawPage1(canvas) {
        const width = 500, height = 300;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Trapezoid with one drastically short side (bottom ~30px vs others ~100px)
        const baseQuad = [
            { x: 0, y: 0 },        // vertex 1 - top left
            { x: 120, y: 0 },      // vertex 2 - top right (long top: 120)
            { x: 85, y: 80 },      // vertex 3 - bottom right (right side: ~100)
            { x: 55, y: 80 }       // vertex 4 - bottom left (SHORT bottom: 30)
        ];

        // First quadrilateral: tilted 10 degrees, positioned left
        const rot1 = 10 * Math.PI / 180;
        const cos1 = Math.cos(rot1);
        const sin1 = Math.sin(rot1);
        const offset1 = { x: 70, y: 110 };
        
        const quad1 = baseQuad.map(p => ({
            x: p.x * cos1 - p.y * sin1 + offset1.x,
            y: p.x * sin1 + p.y * cos1 + offset1.y
        }));

        // Compute centroid of quad1
        const centroid1 = {
            x: quad1.reduce((sum, p) => sum + p.x, 0) / 4,
            y: quad1.reduce((sum, p) => sum + p.y, 0) / 4
        };

        // Second quadrilateral: rotate quad1 by 60 degrees clockwise around its centroid, then translate right
        const rotAngle = 60 * Math.PI / 180;  // 60 degrees clockwise (positive in canvas coords where Y is down)
        const cosR = Math.cos(rotAngle);
        const sinR = Math.sin(rotAngle);
        const translateX = 230;  // shift right to separate
        
        const quad2 = quad1.map(p => ({
            x: (p.x - centroid1.x) * cosR - (p.y - centroid1.y) * sinR + centroid1.x + translateX,
            y: (p.x - centroid1.x) * sinR + (p.y - centroid1.y) * cosR + centroid1.y
        }));

        // Draw quadrilaterals
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(quad1[0].x, quad1[0].y);
        for (let i = 1; i < 4; i++) {
            ctx.lineTo(quad1[i].x, quad1[i].y);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(quad2[0].x, quad2[0].y);
        for (let i = 1; i < 4; i++) {
            ctx.lineTo(quad2[i].x, quad2[i].y);
        }
        ctx.closePath();
        ctx.stroke();

        // Curved arrow indicating transformation - positioned between the shapes
        const arrowStart = { x: 190, y: 160 };
        const arrowEnd = { x: 280, y: 140 };
        const arrowControl = { x: 240, y: 100 };
        
        ctx.strokeStyle = '#6a82fb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(arrowStart.x, arrowStart.y);
        ctx.quadraticCurveTo(arrowControl.x, arrowControl.y, arrowEnd.x, arrowEnd.y);
        ctx.stroke();
        
        // Arrowhead - compute direction from curve derivative at t=1
        const dx = arrowEnd.x - arrowControl.x;
        const dy = arrowEnd.y - arrowControl.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const px = -uy;
        const py = ux;
        const headLen = 10;
        const headWidth = 5;
        
        ctx.beginPath();
        ctx.moveTo(arrowEnd.x, arrowEnd.y);
        ctx.lineTo(arrowEnd.x - headLen * ux + headWidth * px, arrowEnd.y - headLen * uy + headWidth * py);
        ctx.lineTo(arrowEnd.x - headLen * ux - headWidth * px, arrowEnd.y - headLen * uy - headWidth * py);
        ctx.closePath();
        ctx.fillStyle = '#6a82fb';
        ctx.fill();

        // Label
        ctx.fillStyle = '#6a82fb';
        ctx.font = '14px STIX Two Text';
        ctx.textAlign = 'center';
        ctx.fillText('rotate', 240, 90);
    },

    // ============================================
    // PAGE 2: Congruent segments - drastically different lengths
    // ============================================
    drawPage2(canvas) {
        const width = 400, height = 300;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Four segments with very different lengths between pairs
        // Pair 1: AB and CD are SHORT (about 50 pixels)
        // Pair 2: EF and GH are LONG (about 150 pixels)
        const segments = [
            // SHORT pair (1 tick) - AB is short, horizontal-ish
            { p1: { x: 40, y: 70 }, p2: { x: 90, y: 85 }, label1: 'A', label2: 'B', ticks: 1, labelOff1: { x: -12, y: -8 }, labelOff2: { x: 10, y: -8 } },
            // CD is also short, different angle, scattered location
            { p1: { x: 300, y: 230 }, p2: { x: 345, y: 200 }, label1: 'C', label2: 'D', ticks: 1, labelOff1: { x: -10, y: 12 }, labelOff2: { x: 10, y: -10 } },
            
            // LONG pair (2 ticks) - EF is long, steep diagonal
            { p1: { x: 30, y: 260 }, p2: { x: 170, y: 160 }, label1: 'E', label2: 'F', ticks: 2, labelOff1: { x: -12, y: 10 }, labelOff2: { x: 12, y: -10 } },
            // GH is also long, different angle
            { p1: { x: 200, y: 40 }, p2: { x: 340, y: 130 }, label1: 'G', label2: 'H', ticks: 2, labelOff1: { x: -10, y: -12 }, labelOff2: { x: 12, y: 10 } }
        ];

        // Draw the main labeled segments (no grey auxiliary lines)
        segments.forEach((seg) => {
            const color = seg.ticks === 1 ? Colors.pair1.stroke : Colors.pair2.stroke;
            
            GeometryUtils.drawSegment(ctx, seg.p1, seg.p2);
            GeometryUtils.drawTickMarks(ctx, seg.p1.x, seg.p1.y, seg.p2.x, seg.p2.y, seg.ticks, color);
            
            ctx.fillStyle = '#333333';
            GeometryUtils.drawPoint(ctx, seg.p1.x, seg.p1.y, seg.label1, seg.labelOff1.x, seg.labelOff1.y);
            GeometryUtils.drawPoint(ctx, seg.p2.x, seg.p2.y, seg.label2, seg.labelOff2.x, seg.labelOff2.y);
        });

        // Labels at bottom
        ctx.fillStyle = '#333333';
        ctx.font = '16px STIX Two Text';
        ctx.textAlign = 'center';
        ctx.fillText('AB ≅ CD', 120, 290);
        ctx.fillText('EF ≅ GH', 280, 290);
    },

    // ============================================
    // PAGE 3: Congruent angles (vertical angles)
    // ============================================
    drawPage3(canvas) {
        const width = 400, height = 300;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const center = { x: 200, y: 150 };
        const p1 = { x: 60, y: 90 };
        const p2 = { x: 340, y: 210 };
        const p3 = { x: 340, y: 90 };
        const p4 = { x: 60, y: 210 };

        // Draw angle arcs first (underneath lines)
        // Vertical angles: p1-center-p4 and p2-center-p3 are one pair (a)
        // p4-center-p2 and p3-center-p1 are the other pair (b)
        GeometryUtils.drawAngleArc(ctx, center, p1, p4, 30, 1, Colors.pair1.stroke);
        GeometryUtils.drawAngleArc(ctx, center, p2, p3, 30, 1, Colors.pair1.stroke);
        GeometryUtils.drawAngleArc(ctx, center, p4, p2, 25, 2, Colors.pair2.stroke);
        GeometryUtils.drawAngleArc(ctx, center, p3, p1, 25, 2, Colors.pair2.stroke);

        // Draw lines
        GeometryUtils.drawSegment(ctx, p1, p2);
        GeometryUtils.drawSegment(ctx, p3, p4);

        // Center point
        ctx.fillStyle = '#333333';
        GeometryUtils.drawPoint(ctx, center.x, center.y, null, 0, 0, 4);

        // Labels with lowercase letters
        ctx.font = 'italic 16px STIX Two Text';
        ctx.textAlign = 'center';
        ctx.fillStyle = Colors.pair1.stroke;
        ctx.fillText('a', 165, 118);
        ctx.fillText('a', 235, 182);
        ctx.fillStyle = Colors.pair2.stroke;
        ctx.fillText('b', 238, 118);
        ctx.fillText('b', 162, 182);

        // Explanation
        ctx.fillStyle = '#666666';
        ctx.font = '14px STIX Two Text';
        ctx.fillText('Vertical angles are congruent: ∠a ≅ ∠a, ∠b ≅ ∠b', 200, 280);
    },

    // ============================================
    // PAGE 4: Congruent triangles with all marks
    // ============================================
    drawPage4(canvas) {
        const width = 450, height = 320;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Define a distinctly irregular scalene triangle (no near-equal sides or angles)
        // Original triangle vertices (will be used for first triangle)
        const baseTriangle = [
            { x: 0, y: 0 },      // A - origin
            { x: 140, y: 0 },    // B - long base
            { x: 30, y: -95 }    // C - offset to make it very irregular/scalene
        ];

        // Position first triangle (lower left area)
        const offset1 = { x: 35, y: 200 };
        const t1 = {
            A: { x: baseTriangle[0].x + offset1.x, y: baseTriangle[0].y + offset1.y },
            B: { x: baseTriangle[1].x + offset1.x, y: baseTriangle[1].y + offset1.y },
            C: { x: baseTriangle[2].x + offset1.x, y: baseTriangle[2].y + offset1.y }
        };

        // Compute centroid of t1
        const centroid1 = {
            x: (t1.A.x + t1.B.x + t1.C.x) / 3,
            y: (t1.A.y + t1.B.y + t1.C.y) / 3
        };

        // Second triangle: rotate t1 by 70 degrees counterclockwise, then translate right
        const rotAngle = -70 * Math.PI / 180;  // negative = counterclockwise in canvas coords
        const cos = Math.cos(rotAngle);
        const sin = Math.sin(rotAngle);
        const translateX = 230;
        
        const t2 = {
            D: { 
                x: (t1.A.x - centroid1.x) * cos - (t1.A.y - centroid1.y) * sin + centroid1.x + translateX,
                y: (t1.A.x - centroid1.x) * sin + (t1.A.y - centroid1.y) * cos + centroid1.y
            },
            E: { 
                x: (t1.B.x - centroid1.x) * cos - (t1.B.y - centroid1.y) * sin + centroid1.x + translateX,
                y: (t1.B.x - centroid1.x) * sin + (t1.B.y - centroid1.y) * cos + centroid1.y
            },
            F: { 
                x: (t1.C.x - centroid1.x) * cos - (t1.C.y - centroid1.y) * sin + centroid1.x + translateX,
                y: (t1.C.x - centroid1.x) * sin + (t1.C.y - centroid1.y) * cos + centroid1.y
            }
        };

        // Draw triangles
        GeometryUtils.drawTriangle(ctx, t1.A, t1.B, t1.C);
        GeometryUtils.drawTriangle(ctx, t2.D, t2.E, t2.F);

        // Tick marks for corresponding sides (A-B ↔ D-E, B-C ↔ E-F, C-A ↔ F-D)
        GeometryUtils.drawTickMarks(ctx, t1.A.x, t1.A.y, t1.B.x, t1.B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.D.x, t2.D.y, t2.E.x, t2.E.y, 1, Colors.pair1.stroke);

        GeometryUtils.drawTickMarks(ctx, t1.B.x, t1.B.y, t1.C.x, t1.C.y, 2, Colors.pair2.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.E.x, t2.E.y, t2.F.x, t2.F.y, 2, Colors.pair2.stroke);

        GeometryUtils.drawTickMarks(ctx, t1.C.x, t1.C.y, t1.A.x, t1.A.y, 3, Colors.pair3.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.F.x, t2.F.y, t2.D.x, t2.D.y, 3, Colors.pair3.stroke);

        // Angle arcs at corresponding vertices
        GeometryUtils.drawAngleArc(ctx, t1.A, t1.B, t1.C, 18, 1, Colors.pair1.stroke);
        GeometryUtils.drawAngleArc(ctx, t2.D, t2.E, t2.F, 18, 1, Colors.pair1.stroke);

        GeometryUtils.drawAngleArc(ctx, t1.B, t1.C, t1.A, 18, 2, Colors.pair2.stroke);
        GeometryUtils.drawAngleArc(ctx, t2.E, t2.F, t2.D, 18, 2, Colors.pair2.stroke);

        GeometryUtils.drawAngleArc(ctx, t1.C, t1.A, t1.B, 18, 3, Colors.pair3.stroke);
        GeometryUtils.drawAngleArc(ctx, t2.F, t2.D, t2.E, 18, 3, Colors.pair3.stroke);

        // Labels - positioned to avoid overlap
        ctx.fillStyle = '#333333';
        GeometryUtils.drawPoint(ctx, t1.A.x, t1.A.y, 'A', -14, 14);
        GeometryUtils.drawPoint(ctx, t1.B.x, t1.B.y, 'B', 14, 14);
        GeometryUtils.drawPoint(ctx, t1.C.x, t1.C.y, 'C', -14, -10);

        GeometryUtils.drawPoint(ctx, t2.D.x, t2.D.y, 'D', 12, 14);
        GeometryUtils.drawPoint(ctx, t2.E.x, t2.E.y, 'E', -8, -14);
        GeometryUtils.drawPoint(ctx, t2.F.x, t2.F.y, 'F', -14, -10);

        // Congruence statement
        ctx.font = '16px STIX Two Text';
        ctx.textAlign = 'center';
        ctx.fillText('△ABC ≅ △DEF', 225, 310);
    },

    // ============================================
    // PAGE 5: SSS Criterion - completely different triangle
    // ============================================
    drawPage5(canvas) {
        const width = 450, height = 300;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Irregular scalene triangle
        const baseTriangle = [
            { x: 0, y: 0 },       // P
            { x: 110, y: 0 },     // Q - long base
            { x: 25, y: -80 }     // R - apex
        ];

        // First triangle: slight tilt, positioned left
        const rot1 = 5 * Math.PI / 180;
        const cos1 = Math.cos(rot1);
        const sin1 = Math.sin(rot1);
        const offset1 = { x: 50, y: 180 };
        
        const t1 = {
            P: { 
                x: baseTriangle[0].x * cos1 - baseTriangle[0].y * sin1 + offset1.x,
                y: baseTriangle[0].x * sin1 + baseTriangle[0].y * cos1 + offset1.y
            },
            Q: { 
                x: baseTriangle[1].x * cos1 - baseTriangle[1].y * sin1 + offset1.x,
                y: baseTriangle[1].x * sin1 + baseTriangle[1].y * cos1 + offset1.y
            },
            R: { 
                x: baseTriangle[2].x * cos1 - baseTriangle[2].y * sin1 + offset1.x,
                y: baseTriangle[2].x * sin1 + baseTriangle[2].y * cos1 + offset1.y
            }
        };

        // Compute centroid of t1
        const centroid1 = {
            x: (t1.P.x + t1.Q.x + t1.R.x) / 3,
            y: (t1.P.y + t1.Q.y + t1.R.y) / 3
        };

        // Second triangle: rotate t1 by 50 degrees clockwise, then translate right
        const rotAngle = 50 * Math.PI / 180;  // clockwise
        const cosR = Math.cos(rotAngle);
        const sinR = Math.sin(rotAngle);
        const translateX = 220;
        
        const t2 = {
            S: { 
                x: (t1.P.x - centroid1.x) * cosR - (t1.P.y - centroid1.y) * sinR + centroid1.x + translateX,
                y: (t1.P.x - centroid1.x) * sinR + (t1.P.y - centroid1.y) * cosR + centroid1.y
            },
            T: { 
                x: (t1.Q.x - centroid1.x) * cosR - (t1.Q.y - centroid1.y) * sinR + centroid1.x + translateX,
                y: (t1.Q.x - centroid1.x) * sinR + (t1.Q.y - centroid1.y) * cosR + centroid1.y
            },
            U: { 
                x: (t1.R.x - centroid1.x) * cosR - (t1.R.y - centroid1.y) * sinR + centroid1.x + translateX,
                y: (t1.R.x - centroid1.x) * sinR + (t1.R.y - centroid1.y) * cosR + centroid1.y
            }
        };

        // Draw triangles
        GeometryUtils.drawTriangle(ctx, t1.P, t1.Q, t1.R);
        GeometryUtils.drawTriangle(ctx, t2.S, t2.T, t2.U);

        // All three pairs of tick marks (P-Q ↔ S-T, Q-R ↔ T-U, R-P ↔ U-S)
        GeometryUtils.drawTickMarks(ctx, t1.P.x, t1.P.y, t1.Q.x, t1.Q.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.S.x, t2.S.y, t2.T.x, t2.T.y, 1, Colors.pair1.stroke);

        GeometryUtils.drawTickMarks(ctx, t1.Q.x, t1.Q.y, t1.R.x, t1.R.y, 2, Colors.pair2.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.T.x, t2.T.y, t2.U.x, t2.U.y, 2, Colors.pair2.stroke);

        GeometryUtils.drawTickMarks(ctx, t1.R.x, t1.R.y, t1.P.x, t1.P.y, 3, Colors.pair3.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.U.x, t2.U.y, t2.S.x, t2.S.y, 3, Colors.pair3.stroke);

        // Labels
        ctx.fillStyle = '#333333';
        GeometryUtils.drawPoint(ctx, t1.P.x, t1.P.y, 'P', -14, 14);
        GeometryUtils.drawPoint(ctx, t1.Q.x, t1.Q.y, 'Q', 10, 14);
        GeometryUtils.drawPoint(ctx, t1.R.x, t1.R.y, 'R', -14, -8);

        GeometryUtils.drawPoint(ctx, t2.S.x, t2.S.y, 'S', -14, 14);
        GeometryUtils.drawPoint(ctx, t2.T.x, t2.T.y, 'T', 10, -10);
        GeometryUtils.drawPoint(ctx, t2.U.x, t2.U.y, 'U', 10, 10);

        // SSS label
        ctx.font = 'bold 18px STIX Two Text';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#6a82fb';
        ctx.fillText('SSS: △PQR ≅ △STU', 225, 280);
    },

    // ============================================
    // PAGE 7: Square vs Rhombus
    // ============================================
    drawPage7(canvas) {
        const width = 450, height = 280;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Square (left)
        const squareSize = 80;
        const sq = {
            A: { x: 60, y: 70 },
            B: { x: 60 + squareSize, y: 70 },
            C: { x: 60 + squareSize, y: 70 + squareSize },
            D: { x: 60, y: 70 + squareSize }
        };

        // Rhombus (right) - same side length, different angles
        const rhombusOffset = 30;
        const rh = {
            A: { x: 280 + rhombusOffset, y: 70 },
            B: { x: 280 + squareSize + rhombusOffset, y: 70 },
            C: { x: 280 + squareSize, y: 70 + squareSize },
            D: { x: 280, y: 70 + squareSize }
        };

        // Draw square
        GeometryUtils.drawQuadrilateral(ctx, sq.A, sq.B, sq.C, sq.D);
        
        // Draw rhombus
        GeometryUtils.drawQuadrilateral(ctx, rh.A, rh.B, rh.C, rh.D);

        // Tick marks on all sides (showing equal length)
        // Square sides
        GeometryUtils.drawTickMarks(ctx, sq.A.x, sq.A.y, sq.B.x, sq.B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, sq.B.x, sq.B.y, sq.C.x, sq.C.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, sq.C.x, sq.C.y, sq.D.x, sq.D.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, sq.D.x, sq.D.y, sq.A.x, sq.A.y, 1, Colors.pair1.stroke);

        // Rhombus sides
        GeometryUtils.drawTickMarks(ctx, rh.A.x, rh.A.y, rh.B.x, rh.B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, rh.B.x, rh.B.y, rh.C.x, rh.C.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, rh.C.x, rh.C.y, rh.D.x, rh.D.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, rh.D.x, rh.D.y, rh.A.x, rh.A.y, 1, Colors.pair1.stroke);

        // Right angle marks on square
        GeometryUtils.drawRightAngle(ctx, sq.A, sq.B, sq.D);
        GeometryUtils.drawRightAngle(ctx, sq.B, sq.C, sq.A);
        GeometryUtils.drawRightAngle(ctx, sq.C, sq.D, sq.B);
        GeometryUtils.drawRightAngle(ctx, sq.D, sq.A, sq.C);

        // Labels
        ctx.fillStyle = '#333333';
        ctx.font = '16px STIX Two Text';
        ctx.textAlign = 'center';
        ctx.fillText('Square', 100, 190);
        ctx.fillText('Rhombus', 330, 190);

        // "≠" between them
        ctx.font = '24px STIX Two Text';
        ctx.fillStyle = '#ef4444';
        ctx.fillText('≠', 215, 120);

        // Explanation
        ctx.fillStyle = '#666666';
        ctx.font = '14px STIX Two Text';
        ctx.fillText('Same side lengths, different shapes', 225, 230);
        ctx.fillText('SSS does NOT work for quadrilaterals', 225, 255);
    },

    // ============================================
    // EXERCISE 1: △PQR and △STU (straightforward SSS)
    // ============================================
    drawExercise1(canvas) {
        const width = 360, height = 200;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Irregular scalene triangle
        const baseTriangle = [
            { x: 0, y: 0 },       // P
            { x: 100, y: 0 },     // Q - base
            { x: 20, y: -70 }     // R - apex
        ];

        // First triangle: slight tilt, positioned left
        const rot1 = 10 * Math.PI / 180;
        const cos1 = Math.cos(rot1);
        const sin1 = Math.sin(rot1);
        const offset1 = { x: 40, y: 130 };
        
        const t1 = {
            P: { 
                x: baseTriangle[0].x * cos1 - baseTriangle[0].y * sin1 + offset1.x,
                y: baseTriangle[0].x * sin1 + baseTriangle[0].y * cos1 + offset1.y
            },
            Q: { 
                x: baseTriangle[1].x * cos1 - baseTriangle[1].y * sin1 + offset1.x,
                y: baseTriangle[1].x * sin1 + baseTriangle[1].y * cos1 + offset1.y
            },
            R: { 
                x: baseTriangle[2].x * cos1 - baseTriangle[2].y * sin1 + offset1.x,
                y: baseTriangle[2].x * sin1 + baseTriangle[2].y * cos1 + offset1.y
            }
        };

        // Compute centroid of t1
        const centroid1 = {
            x: (t1.P.x + t1.Q.x + t1.R.x) / 3,
            y: (t1.P.y + t1.Q.y + t1.R.y) / 3
        };

        // Second triangle: rotate t1 by 45 degrees clockwise, then translate right
        const rotAngle = 45 * Math.PI / 180;
        const cosR = Math.cos(rotAngle);
        const sinR = Math.sin(rotAngle);
        const translateX = 180;
        
        const t2 = {
            S: { 
                x: (t1.P.x - centroid1.x) * cosR - (t1.P.y - centroid1.y) * sinR + centroid1.x + translateX,
                y: (t1.P.x - centroid1.x) * sinR + (t1.P.y - centroid1.y) * cosR + centroid1.y
            },
            T: { 
                x: (t1.Q.x - centroid1.x) * cosR - (t1.Q.y - centroid1.y) * sinR + centroid1.x + translateX,
                y: (t1.Q.x - centroid1.x) * sinR + (t1.Q.y - centroid1.y) * cosR + centroid1.y
            },
            U: { 
                x: (t1.R.x - centroid1.x) * cosR - (t1.R.y - centroid1.y) * sinR + centroid1.x + translateX,
                y: (t1.R.x - centroid1.x) * sinR + (t1.R.y - centroid1.y) * cosR + centroid1.y
            }
        };

        GeometryUtils.drawTriangle(ctx, t1.P, t1.Q, t1.R);
        GeometryUtils.drawTriangle(ctx, t2.S, t2.T, t2.U);

        // Tick marks (P-Q ↔ S-T, Q-R ↔ T-U, R-P ↔ U-S)
        GeometryUtils.drawTickMarks(ctx, t1.P.x, t1.P.y, t1.Q.x, t1.Q.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.S.x, t2.S.y, t2.T.x, t2.T.y, 1, Colors.pair1.stroke);

        GeometryUtils.drawTickMarks(ctx, t1.Q.x, t1.Q.y, t1.R.x, t1.R.y, 2, Colors.pair2.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.T.x, t2.T.y, t2.U.x, t2.U.y, 2, Colors.pair2.stroke);

        GeometryUtils.drawTickMarks(ctx, t1.R.x, t1.R.y, t1.P.x, t1.P.y, 3, Colors.pair3.stroke);
        GeometryUtils.drawTickMarks(ctx, t2.U.x, t2.U.y, t2.S.x, t2.S.y, 3, Colors.pair3.stroke);

        // Labels
        ctx.fillStyle = '#333333';
        GeometryUtils.drawPoint(ctx, t1.P.x, t1.P.y, 'P', -12, 14);
        GeometryUtils.drawPoint(ctx, t1.Q.x, t1.Q.y, 'Q', 10, 14);
        GeometryUtils.drawPoint(ctx, t1.R.x, t1.R.y, 'R', -12, -8);

        GeometryUtils.drawPoint(ctx, t2.S.x, t2.S.y, 'S', -12, 14);
        GeometryUtils.drawPoint(ctx, t2.T.x, t2.T.y, 'T', 10, -8);
        GeometryUtils.drawPoint(ctx, t2.U.x, t2.U.y, 'U', 10, 10);
    },

    // ============================================
    // EXERCISE 2: Two triangles sharing side BD
    // ============================================
    drawExercise2(canvas) {
        const width = 320, height = 200;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Diamond shape with diagonal BD
        const A = { x: 160, y: 30 };
        const B = { x: 60, y: 100 };
        const C = { x: 160, y: 170 };
        const D = { x: 260, y: 100 };

        // Draw both triangles (they share BD)
        GeometryUtils.drawTriangle(ctx, A, B, D);
        GeometryUtils.drawSegment(ctx, B, C);
        GeometryUtils.drawSegment(ctx, C, D);

        // Tick marks
        // AB ≅ CB
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, C.x, C.y, B.x, B.y, 1, Colors.pair1.stroke);

        // AD ≅ CD
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, D.x, D.y, 2, Colors.pair2.stroke);
        GeometryUtils.drawTickMarks(ctx, C.x, C.y, D.x, D.y, 2, Colors.pair2.stroke);

        // BD is shared (no extra marking needed, but could add)
        
        // Labels
        ctx.fillStyle = '#333333';
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', 0, -12);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -15, 0);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 0, 15);
        GeometryUtils.drawPoint(ctx, D.x, D.y, 'D', 15, 0);
    },

    // ============================================
    // EXERCISE 3: Quadrilateral with diagonal AC
    // ============================================
    drawExercise3(canvas) {
        const width = 320, height = 200;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        // Kite shape
        const A = { x: 160, y: 25 };
        const B = { x: 60, y: 100 };
        const C = { x: 160, y: 175 };
        const D = { x: 260, y: 100 };

        // Draw quadrilateral
        GeometryUtils.drawQuadrilateral(ctx, A, B, C, D);
        
        // Draw diagonal AC
        ctx.setLineDash([5, 5]);
        GeometryUtils.drawSegment(ctx, A, C, '#666666', 1.5);
        ctx.setLineDash([]);

        // Tick marks
        // AB ≅ AD
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, B.x, B.y, 1, Colors.pair1.stroke);
        GeometryUtils.drawTickMarks(ctx, A.x, A.y, D.x, D.y, 1, Colors.pair1.stroke);

        // BC ≅ DC
        GeometryUtils.drawTickMarks(ctx, B.x, B.y, C.x, C.y, 2, Colors.pair2.stroke);
        GeometryUtils.drawTickMarks(ctx, D.x, D.y, C.x, C.y, 2, Colors.pair2.stroke);

        // Labels
        ctx.fillStyle = '#333333';
        GeometryUtils.drawPoint(ctx, A.x, A.y, 'A', 0, -12);
        GeometryUtils.drawPoint(ctx, B.x, B.y, 'B', -15, 0);
        GeometryUtils.drawPoint(ctx, C.x, C.y, 'C', 0, 15);
        GeometryUtils.drawPoint(ctx, D.x, D.y, 'D', 15, 0);
    },

    // ============================================
    // EXERCISE 4: Two triangles with different sides (NOT congruent)
    // ============================================
    drawExercise4(canvas) {
        const width = 320, height = 200;
        const ctx = setupCanvas(canvas, width, height);
        clearCanvas(ctx, width, height);

        const t1 = {
            A: { x: 30, y: 160 },
            B: { x: 130, y: 160 },
            C: { x: 80, y: 50 }
        };

        const t2 = {
            D: { x: 190, y: 160 },
            E: { x: 290, y: 160 },
            F: { x: 260, y: 50 }
        };

        GeometryUtils.drawTriangle(ctx, t1.A, t1.B, t1.C);
        GeometryUtils.drawTriangle(ctx, t2.D, t2.E, t2.F);

        // Add length labels (different values)
        ctx.fillStyle = '#333333';
        ctx.font = '14px STIX Two Text';
        ctx.textAlign = 'center';

        // First triangle sides
        ctx.fillText('5', (t1.A.x + t1.B.x) / 2, (t1.A.y + t1.B.y) / 2 + 18);
        ctx.fillText('7', (t1.B.x + t1.C.x) / 2 + 12, (t1.B.y + t1.C.y) / 2);
        ctx.fillText('9', (t1.C.x + t1.A.x) / 2 - 12, (t1.C.y + t1.A.y) / 2);

        // Second triangle sides (different third side)
        ctx.fillText('5', (t2.D.x + t2.E.x) / 2, (t2.D.y + t2.E.y) / 2 + 18);
        ctx.fillText('7', (t2.E.x + t2.F.x) / 2 + 12, (t2.E.y + t2.F.y) / 2);
        ctx.fillText('10', (t2.F.x + t2.D.x) / 2 - 15, (t2.F.y + t2.D.y) / 2);

        // Labels
        GeometryUtils.drawPoint(ctx, t1.A.x, t1.A.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, t1.B.x, t1.B.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, t1.C.x, t1.C.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, t2.D.x, t2.D.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, t2.E.x, t2.E.y, null, 0, 0, 3);
        GeometryUtils.drawPoint(ctx, t2.F.x, t2.F.y, null, 0, 0, 3);
    }
};
