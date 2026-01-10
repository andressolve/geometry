/**
 * Diagram Drawing Functions for Lesson 9: Similar Triangles
 */

const Diagrams = {
    // ============================================
    // PAGE 0: COVER
    // Triangle growing animation style
    // ============================================
    drawCover(canvas) {
        const ctx = setupCanvas(canvas, 400, 280);
        const center = { x: 200, y: 160 };

        // Small triangle
        const A1 = { x: 160, y: 180 };
        const B1 = { x: 240, y: 180 };
        const C1 = { x: 200, y: 110 };

        // Large triangle
        const scale = 1.8;
        const A2 = { x: 200 - (40 * scale), y: 180 + (20 * scale) }; // Shifted down a bit
        const B2 = { x: 200 + (40 * scale), y: 180 + (20 * scale) };
        const C2 = { x: 200, y: 110 - (50 * scale) };

        // Actually let's center them better.
        // Let's use a centroid expansion.
        const centroid = { x: 200, y: 140 };

        // Base triangle points centered at 0,0
        const p1 = { x: -40, y: 40 };
        const p2 = { x: 40, y: 40 };
        const p3 = { x: 0, y: -40 };

        const drawTri = (s, color, width) => {
            const tA = { x: centroid.x + p1.x * s, y: centroid.y + p1.y * s };
            const tB = { x: centroid.x + p2.x * s, y: centroid.y + p2.y * s };
            const tC = { x: centroid.x + p3.x * s, y: centroid.y + p3.y * s };
            GeometryUtils.drawTriangle(ctx, tA, tB, tC, color, width);
            return { tA, tB, tC };
        };

        // Draw large "ghost" or fully realized
        const large = drawTri(2.0, '#6a82fb', 2);

        // Draw dashed lines from center
        GeometryUtils.drawDashedSegment(ctx, centroid, large.tA, '#cbd5e1');
        GeometryUtils.drawDashedSegment(ctx, centroid, large.tB, '#cbd5e1');
        GeometryUtils.drawDashedSegment(ctx, centroid, large.tC, '#cbd5e1');

        // Draw small
        const small = drawTri(1.0, '#60a5fa', 2);

        // Fill small
        ctx.beginPath();
        ctx.moveTo(small.tA.x, small.tA.y);
        ctx.lineTo(small.tB.x, small.tB.y);
        ctx.lineTo(small.tC.x, small.tC.y);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.2)';
        ctx.fill();

        GeometryUtils.drawLabel(ctx, 200, 260, "Expansion", { color: '#6a82fb', font: 'italic 18px STIX Two Text' });
    },

    // ============================================
    // PAGE 1: SAME SHAPE, DIFFERENT SIZE
    // Two triangles, labeled
    // ============================================
    drawPage1(canvas) {
        const ctx = setupCanvas(canvas, 450, 320);

        // Triangle 1
        const t1 = [
            { x: 100, y: 200 },
            { x: 160, y: 200 },
            { x: 120, y: 150 }
        ];

        // Triangle 2 (Scale 2x)
        const t2 = [
            { x: 250, y: 250 },
            { x: 370, y: 250 },
            { x: 290, y: 150 }
        ];

        GeometryUtils.drawTriangle(ctx, t1[0], t1[1], t1[2], Colors.pair1.stroke, 2);
        ctx.fillStyle = Colors.pair1.fill;
        ctx.fill();

        GeometryUtils.drawTriangle(ctx, t2[0], t2[1], t2[2], Colors.pair2.stroke, 2);
        ctx.fillStyle = Colors.pair2.fill;
        ctx.fill();

        GeometryUtils.drawLabel(ctx, 130, 230, "Original", { color: Colors.pair1.stroke });
        GeometryUtils.drawLabel(ctx, 310, 280, "Zoomed 2x", { color: Colors.pair2.stroke });
    },

    // ============================================
    // PAGE 2: ANGLES STAY SAME
    // ============================================
    drawPage2(canvas) {
        const ctx = setupCanvas(canvas, 450, 320);

        // Shape: Right triangle for clarity on "90 degree" concept
        // Tri 1
        const A1 = { x: 50, y: 200 };
        const B1 = { x: 130, y: 200 }; // base 80
        const C1 = { x: 50, y: 140 };  // height 60

        // Tri 2 (Scale 1.8)
        const A2 = { x: 200, y: 250 };
        const B2 = { x: 344, y: 250 }; // base 144
        const C2 = { x: 200, y: 142 }; // height 108

        // Draw
        GeometryUtils.drawTriangle(ctx, A1, B1, C1, Colors.pair1.stroke, 2);
        GeometryUtils.drawTriangle(ctx, A2, B2, C2, Colors.pair2.stroke, 2);

        // Mark Angles
        // T1
        GeometryUtils.drawRightAngle(ctx, A1, B1, C1, 15, '#333');
        GeometryUtils.drawAngleArc(ctx, B1, C1, A1, 20, 1, '#333');
        GeometryUtils.drawAngleArc(ctx, C1, A1, B1, 20, 2, '#333');

        // T2
        GeometryUtils.drawRightAngle(ctx, A2, B2, C2, 20, '#333'); // Bigger square
        GeometryUtils.drawAngleArc(ctx, B2, C2, A2, 30, 1, '#333');
        GeometryUtils.drawAngleArc(ctx, C2, A2, B2, 30, 2, '#333');

        // Labels
        GeometryUtils.drawLabel(ctx, 50, 220, "90°", { font: '12px STIX Two Text' });
        GeometryUtils.drawLabel(ctx, 200, 270, "90°", { font: '12px STIX Two Text' });

        GeometryUtils.drawLabel(ctx, 130, 60, "Angles match exactly!", { color: '#666', font: 'italic 16px STIX Two Text' });

        // Draw connector arrow?
        // Maybe too cluttered.
    },

    // ============================================
    // PAGE 3: SIDES SCALE UP
    // ============================================
    drawPage3(canvas) {
        const ctx = setupCanvas(canvas, 450, 320);

        // 3-4-5 Triangle
        const scale1 = 20;
        const A1 = { x: 40, y: 150 };
        const B1 = { x: 40 + 4 * scale1, y: 150 };
        const C1 = { x: 40, y: 150 - 3 * scale1 };

        const scale2 = scale1 * 2; // Double
        const A2 = { x: 200, y: 280 };
        const B2 = { x: 200 + 4 * scale2, y: 280 };
        const C2 = { x: 200, y: 280 - 3 * scale2 };

        // Draw T1
        GeometryUtils.drawTriangle(ctx, A1, B1, C1, Colors.pair1.stroke, 2);

        // Labels T1
        GeometryUtils.drawLabel(ctx, 80, 170, "4", { color: Colors.pair1.stroke }); // Base
        GeometryUtils.drawLabel(ctx, 20, 120, "3", { color: Colors.pair1.stroke }); // Height
        GeometryUtils.drawLabel(ctx, 80, 110, "5", { color: Colors.pair1.stroke }); // Hypotenuse

        // Draw T2
        GeometryUtils.drawTriangle(ctx, A2, B2, C2, Colors.pair2.stroke, 2);

        // Labels T2
        GeometryUtils.drawLabel(ctx, 280, 300, "8", { color: Colors.pair2.stroke });
        GeometryUtils.drawLabel(ctx, 180, 220, "6", { color: Colors.pair2.stroke });
        GeometryUtils.drawLabel(ctx, 280, 190, "10", { color: Colors.pair2.stroke });

        // Equation text
        GeometryUtils.drawLabel(ctx, 300, 50, "Scale Factor = 2", { font: 'bold 20px STIX Two Text', color: '#333' });
        GeometryUtils.drawLabel(ctx, 300, 80, "3 × 2 = 6", { font: '16px STIX Two Text' });
        GeometryUtils.drawLabel(ctx, 300, 100, "4 × 2 = 8", { font: '16px STIX Two Text' });
        GeometryUtils.drawLabel(ctx, 300, 120, "5 × 2 = 10", { font: '16px STIX Two Text' });
    },

    // ============================================
    // PAGE 4: SCALE FACTOR
    // ============================================
    drawPage4(canvas) {
        const ctx = setupCanvas(canvas, 450, 320);

        // General Triangle
        const t1 = [
            { x: 50, y: 180 },
            { x: 130, y: 180 },
            { x: 80, y: 80 }
        ];

        // Scale 2
        const scale = 2.0;
        const offset = { x: 220, y: 220 };
        const t2 = [
            { x: offset.x, y: offset.y },
            { x: offset.x + (130 - 50) * scale, y: offset.y },
            { x: offset.x + (80 - 50) * scale, y: offset.y - (180 - 80) * scale }
        ];

        GeometryUtils.drawTriangle(ctx, t1[0], t1[1], t1[2], Colors.pair1.stroke, 2);
        GeometryUtils.drawTriangle(ctx, t2[0], t2[1], t2[2], Colors.pair2.stroke, 2);

        // Draw Arrow
        const arrowStart = { x: 140, y: 130 };
        const arrowEnd = { x: 210, y: 130 };
        GeometryUtils.drawSegment(ctx, arrowStart, arrowEnd, '#333', 2);
        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(arrowEnd.x, arrowEnd.y);
        ctx.lineTo(arrowEnd.x - 10, arrowEnd.y - 5);
        ctx.lineTo(arrowEnd.x - 10, arrowEnd.y + 5);
        ctx.fillStyle = '#333';
        ctx.fill();

        GeometryUtils.drawLabel(ctx, 175, 110, "× 2", { font: 'bold 20px STIX Two Text' });

        // Labels
        GeometryUtils.drawLabel(ctx, 90, 200, "Side A", { color: Colors.pair1.stroke });
        GeometryUtils.drawLabel(ctx, 300, 240, "Side A × 2", { color: Colors.pair2.stroke });
    },

    // ============================================
    // PAGE 5: FINDING MISSING SIDES
    // ============================================
    drawPage5(canvas) {
        const ctx = setupCanvas(canvas, 500, 320);

        // Tri 1: Sides 2 and 3
        const A1 = { x: 50, y: 180 };
        const B1 = { x: 130, y: 180 };
        const unit = 20; // Reduced unit size to fit scale 3
        const C1 = { x: 50, y: 180 - 3 * unit }; // Height 3 units

        // Base is 2 units
        const B1_adj = { x: 50 + 2 * unit, y: 180 };

        // Tri 2: Side 6 and ?
        const scale = 3;
        const A2 = { x: 200, y: 250 }; // Shifted left slightly
        const B2_adj = { x: 200 + 2 * unit * scale, y: 250 };
        const C2 = { x: 200, y: 250 - 3 * unit * scale };

        GeometryUtils.drawTriangle(ctx, A1, B1_adj, C1, Colors.pair1.stroke, 2);
        GeometryUtils.drawTriangle(ctx, A2, B2_adj, C2, Colors.pair2.stroke, 2);

        // Labels
        GeometryUtils.drawLabel(ctx, 70, 200, "2", { font: 'bold 18px STIX Two Text', color: Colors.pair1.stroke });
        GeometryUtils.drawLabel(ctx, 30, 150, "3", { font: 'bold 18px STIX Two Text', color: Colors.pair1.stroke });

        GeometryUtils.drawLabel(ctx, 260, 270, "6", { font: 'bold 18px STIX Two Text', color: Colors.pair2.stroke });
        GeometryUtils.drawLabel(ctx, 180, 160, "?", { font: 'bold 24px STIX Two Text', color: Colors.warning.stroke });


    },

    // ============================================
    // EXERCISE 1
    // Small: 3, 5. Large: 6, ?
    // ============================================
    drawExercise1(canvas) {
        const ctx = setupCanvas(canvas, 300, 200);
        const unit = 15;

        // T1: 3, 5
        const A1 = { x: 30, y: 100 };
        const B1 = { x: 30 + 3 * unit, y: 100 };
        // Hypotenuse 5, Base 3 -> Height 4
        const C1 = { x: 30, y: 100 - 4 * unit };

        // T2: 6, ? (scales to 10)
        const scale = 1.5; // Visual scale doesn't have to match math perfectly for layout, but better if it does.
        // If I use scale 2 it might be too big for 300px canvas.
        // Let's use simpler drawing scale.
        // Math: 3->6 (x2). 5->10.

        // Display T1
        GeometryUtils.drawTriangle(ctx, A1, B1, C1, Colors.pair1.stroke, 2);
        GeometryUtils.drawLabel(ctx, 52, 115, "3", { color: Colors.pair1.stroke }); // Base
        GeometryUtils.drawLabel(ctx, 55, 65, "5", { color: Colors.pair1.stroke }); // Hyp

        // Display T2
        const startX = 150;
        const startY = 160;
        const vScale = 1.6; // Visual scale

        const A2 = { x: startX, y: startY };
        const B2 = { x: startX + 3 * unit * vScale, y: startY };
        const C2 = { x: startX, y: startY - 4 * unit * vScale };

        GeometryUtils.drawTriangle(ctx, A2, B2, C2, Colors.pair2.stroke, 2);
        GeometryUtils.drawLabel(ctx, 185, 180, "6", { color: Colors.pair2.stroke });
        GeometryUtils.drawLabel(ctx, 200, 100, "?", { color: Colors.warning.stroke, font: 'bold 20px STIX Two Text' });
    },

    // ============================================
    // EXERCISE 2
    // Small: 4, 7. Large: 12, ?
    // Logic: x3. 7->21
    // ============================================
    drawExercise2(canvas) {
        const ctx = setupCanvas(canvas, 300, 200);
        // T1
        const A1 = { x: 30, y: 80 };
        const B1 = { x: 80, y: 80 }; // side 4ish visual
        const C1 = { x: 40, y: 40 }; // side 7ish visual (just labels matter mostly)

        GeometryUtils.drawTriangle(ctx, A1, B1, C1, Colors.pair1.stroke, 2);
        // Be explicit about which sides
        GeometryUtils.drawLabel(ctx, 55, 95, "4", { color: Colors.pair1.stroke });
        GeometryUtils.drawLabel(ctx, 25, 60, "7", { color: Colors.pair1.stroke });

        // T2 (Should look bigger)
        const A2 = { x: 120, y: 160 };
        const B2 = { x: 270, y: 160 }; // Base
        const C2 = { x: 150, y: 40 };

        GeometryUtils.drawTriangle(ctx, A2, B2, C2, Colors.pair2.stroke, 2);
        GeometryUtils.drawLabel(ctx, 195, 180, "12", { color: Colors.pair2.stroke });
        GeometryUtils.drawLabel(ctx, 120, 100, "?", { color: Colors.warning.stroke, font: 'bold 20px STIX Two Text' });
    },

    // ============================================
    // EXERCISE 3
    // Large: 10, 15. Small: 5, ?
    // Backwards. 10->5 (/2). 15->7.5
    // ============================================
    drawExercise3(canvas) {
        const ctx = setupCanvas(canvas, 300, 200);

        // Large (Left)
        const A1 = { x: 30, y: 180 };
        const B1 = { x: 130, y: 180 }; // side 10 implied
        const C1 = { x: 80, y: 80 };   // side 15 implied

        GeometryUtils.drawTriangle(ctx, A1, B1, C1, Colors.pair2.stroke, 2);
        GeometryUtils.drawLabel(ctx, 80, 195, "10", { color: Colors.pair2.stroke });
        GeometryUtils.drawLabel(ctx, 40, 130, "15", { color: Colors.pair2.stroke });

        // Small (Right)
        const A2 = { x: 180, y: 150 };
        const B2 = { x: 230, y: 150 }; // side 5 scale
        const C2 = { x: 205, y: 100 };

        GeometryUtils.drawTriangle(ctx, A2, B2, C2, Colors.pair1.stroke, 2);
        GeometryUtils.drawLabel(ctx, 205, 165, "5", { color: Colors.pair1.stroke });
        GeometryUtils.drawLabel(ctx, 180, 120, "?", { color: Colors.warning.stroke, font: 'bold 20px STIX Two Text' });
    },

    // ============================================
    // EXERCISE 4
    // Scale Factor? 5 -> 15.
    // ============================================
    drawExercise4(canvas) {
        const ctx = setupCanvas(canvas, 300, 200);

        // T1
        const A1 = { x: 40, y: 100 };
        const B1 = { x: 80, y: 100 };
        const C1 = { x: 60, y: 60 };

        GeometryUtils.drawTriangle(ctx, A1, B1, C1, Colors.pair1.stroke, 2);
        GeometryUtils.drawLabel(ctx, 60, 115, "5", { color: Colors.pair1.stroke });

        // T2
        const A2 = { x: 130, y: 180 };
        const B2 = { x: 250, y: 180 }; // 3x width
        const C2 = { x: 190, y: 60 };  // 3x height

        GeometryUtils.drawTriangle(ctx, A2, B2, C2, Colors.pair2.stroke, 2);
        GeometryUtils.drawLabel(ctx, 190, 195, "15", { color: Colors.pair2.stroke });
    }
};
