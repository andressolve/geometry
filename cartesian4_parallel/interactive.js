/**
 * Interactive Elements for Lesson 14: Parallel Lines
 *
 * Page 1: StepBuilder1 — build y = 2x from origin
 * Page 2: StepBuilder2 — build y = 2x + 3 from (0,3), with y = 2x as background
 * Page 3: ZoomOut — extend view to show lines never meet
 */

// ============================================
// PAGE 1: Step-by-step builder for y = 2x
// ============================================
const StepBuilder1 = {
    canvas: null,
    ctx: null,
    cs: null,
    W: 440,
    H: 400,
    range: { xMin: -1, xMax: 5, yMin: -1, yMax: 10 },
    currentStep: 0,
    maxSteps: 3,
    slope: 2,
    points: [],
    lineRevealed: false,

    init() {
        this.canvas = document.getElementById('canvas-build1');
        if (!this.canvas) return;

        this.ctx = setupCanvas(this.canvas, this.W, this.H);
        this.cs = GridUtils.createCoordSystem(this.W, this.H, this.range);

        if (!this._initialized) {
            this.currentStep = 0;
            this.points = [{ x: 0, y: 0 }];
            this.lineRevealed = false;

            const btn = document.getElementById('build1-step-btn');
            if (btn) btn.addEventListener('click', () => this.step());
            this._initialized = true;
        }

        this.draw();
    },

    step() {
        if (this.currentStep >= this.maxSteps) return;

        this.currentStep++;
        const x = this.currentStep;
        const y = this.slope * x;
        this.points.push({ x, y });
        this.draw();

        const btn = document.getElementById('build1-step-btn');
        const counter = document.getElementById('build1-counter');
        if (counter) counter.textContent = `${this.currentStep} of ${this.maxSteps}`;

        if (this.currentStep >= this.maxSteps) {
            if (btn) btn.disabled = true;
            setTimeout(() => this.revealLine(), 600);
        }
    },

    revealLine() {
        this.lineRevealed = true;
        let t = 0;
        const animate = () => {
            t += 0.025;
            if (t > 1) t = 1;

            this.draw(t);

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                const reveal = document.getElementById('build1-reveal');
                if (reveal) reveal.classList.remove('hidden');
            }
        };
        requestAnimationFrame(animate);
    },

    draw(lineT = 0) {
        clearCanvas(this.ctx, this.W, this.H);
        GridUtils.drawGrid(this.ctx, this.cs);
        GridUtils.drawAxes(this.ctx, this.cs, { showLabels: true });
        GridUtils.drawAxisTicks(this.ctx, this.cs);

        // Draw line if revealing
        if (lineT > 0) {
            GridUtils.drawLinePartial(this.ctx, this.cs, x => this.slope * x, lineT, {
                color: Colors.line, lineWidth: 2.5
            });
        }

        // Step triangles
        for (let i = 0; i < this.points.length - 1; i++) {
            const p = this.points[i];
            GridUtils.drawStepTriangle(this.ctx, this.cs, p.x, p.y, 1, this.slope, {
                color: 'rgba(106, 130, 251, 0.5)',
                lineWidth: 1.5,
                dash: [5, 3],
                showLabels: i === 0
            });
        }

        // Points
        this.points.forEach(p => {
            GridUtils.drawPoint(this.ctx, this.cs, p.x, p.y, {
                color: Colors.point, radius: 6
            });
        });
    }
};

// ============================================
// PAGE 2: Step builder for y = 2x + 3 with y = 2x as background
// ============================================
const StepBuilder2 = {
    canvas: null,
    ctx: null,
    cs: null,
    W: 440,
    H: 400,
    range: { xMin: -1, xMax: 5, yMin: -1, yMax: 10 },
    currentStep: 0,
    maxSteps: 3,
    slope: 2,
    yIntercept: 3,
    points: [],
    lineRevealed: false,

    init() {
        this.canvas = document.getElementById('canvas-build2');
        if (!this.canvas) return;

        this.ctx = setupCanvas(this.canvas, this.W, this.H);
        this.cs = GridUtils.createCoordSystem(this.W, this.H, this.range);

        if (!this._initialized) {
            this.currentStep = 0;
            this.points = [{ x: 0, y: this.yIntercept }];
            this.lineRevealed = false;

            const btn = document.getElementById('build2-step-btn');
            if (btn) btn.addEventListener('click', () => this.step());
            this._initialized = true;
        }

        this.draw();
    },

    step() {
        if (this.currentStep >= this.maxSteps) return;

        this.currentStep++;
        const x = this.currentStep;
        const y = this.slope * x + this.yIntercept;
        this.points.push({ x, y });
        this.draw();

        const btn = document.getElementById('build2-step-btn');
        const counter = document.getElementById('build2-counter');
        if (counter) counter.textContent = `${this.currentStep} of ${this.maxSteps}`;

        if (this.currentStep >= this.maxSteps) {
            if (btn) btn.disabled = true;
            setTimeout(() => this.revealLine(), 600);
        }
    },

    revealLine() {
        this.lineRevealed = true;
        let t = 0;
        const animate = () => {
            t += 0.025;
            if (t > 1) t = 1;

            this.draw(t);

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                const reveal = document.getElementById('build2-reveal');
                if (reveal) reveal.classList.remove('hidden');
            }
        };
        requestAnimationFrame(animate);
    },

    draw(lineT = 0) {
        clearCanvas(this.ctx, this.W, this.H);
        GridUtils.drawGrid(this.ctx, this.cs);
        GridUtils.drawAxes(this.ctx, this.cs, { showLabels: true });
        GridUtils.drawAxisTicks(this.ctx, this.cs);

        // Background: y = 2x line (muted blue)
        GridUtils.drawLine(this.ctx, this.cs, x => 2 * x, {
            color: 'rgba(106, 130, 251, 0.25)', lineWidth: 2
        });

        // Background: step triangles on y = 2x (very muted)
        for (let i = 0; i < 3; i++) {
            GridUtils.drawStepTriangle(this.ctx, this.cs, i, 2 * i, 1, 2, {
                color: 'rgba(106, 130, 251, 0.15)',
                lineWidth: 1,
                dash: [5, 3],
                showLabels: false
            });
        }

        // Green line revealing
        if (lineT > 0) {
            GridUtils.drawLinePartial(this.ctx, this.cs, x => this.slope * x + this.yIntercept, lineT, {
                color: Colors.lineGreen, lineWidth: 2.5
            });
        }

        // Step triangles for the green line
        for (let i = 0; i < this.points.length - 1; i++) {
            const p = this.points[i];
            GridUtils.drawStepTriangle(this.ctx, this.cs, p.x, p.y, 1, this.slope, {
                color: 'rgba(16, 185, 129, 0.5)',
                lineWidth: 1.5,
                dash: [5, 3],
                showLabels: i === 0
            });
        }

        // Points (green)
        this.points.forEach(p => {
            GridUtils.drawPoint(this.ctx, this.cs, p.x, p.y, {
                color: Colors.lineGreen, radius: 6
            });
        });
    }
};

// ============================================
// PAGE 3: Zoom Out interaction
// ============================================
const ZoomOut = {
    canvas: null,
    ctx: null,
    cs: null,
    W: 520,
    H: 440,
    zoomLevel: 0,
    zoomRanges: [
        { xMin: -1, xMax: 5, yMin: -1, yMax: 10 },
        { xMin: -5, xMax: 10, yMin: -5, yMax: 20 },
        { xMin: -10, xMax: 20, yMin: -10, yMax: 40 },
        { xMin: -20, xMax: 40, yMin: -20, yMax: 80 }
    ],

    init() {
        this.canvas = document.getElementById('canvas-parallel');
        if (!this.canvas) return;

        this.ctx = setupCanvas(this.canvas, this.W, this.H);

        if (!this._initialized) {
            this.zoomLevel = 0;

            const btn = document.getElementById('zoom-out-btn');
            if (btn) btn.addEventListener('click', () => this.zoom());
            this._initialized = true;
        }

        this.cs = GridUtils.createCoordSystem(this.W, this.H, this.zoomRanges[this.zoomLevel]);
        this.draw();
    },

    zoom() {
        if (this.zoomLevel >= this.zoomRanges.length - 1) return;

        this.zoomLevel++;
        this.cs = GridUtils.createCoordSystem(this.W, this.H, this.zoomRanges[this.zoomLevel]);
        this.draw();

        const btn = document.getElementById('zoom-out-btn');
        const counter = document.getElementById('zoom-counter');
        if (counter) counter.textContent = `Zoom level ${this.zoomLevel + 1} of ${this.zoomRanges.length}`;

        if (this.zoomLevel >= this.zoomRanges.length - 1) {
            if (btn) btn.disabled = true;
            // Reveal the definition
            setTimeout(() => {
                const reveal = document.getElementById('parallel-reveal');
                if (reveal) reveal.classList.remove('hidden');
            }, 400);
        }
    },

    draw() {
        clearCanvas(this.ctx, this.W, this.H);
        GridUtils.drawGrid(this.ctx, this.cs);
        GridUtils.drawAxes(this.ctx, this.cs, { showLabels: false });
        GridUtils.drawAxisTicks(this.ctx, this.cs, { showNumbers: false });

        // y = 2x (blue)
        GridUtils.drawLine(this.ctx, this.cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = 2x + 3 (green)
        GridUtils.drawLine(this.ctx, this.cs, x => 2 * x + 3, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Equation labels
        const range = this.zoomRanges[this.zoomLevel];
        const labelX = range.xMin + (range.xMax - range.xMin) * 0.7;

        this.ctx.save();
        this.ctx.font = 'bold italic 14px STIX Two Text, serif';

        const labels = [
            { text: 'y = 2x', fn: x => 2 * x, color: Colors.line },
            { text: 'y = 2x + 3', fn: x => 2 * x + 3, color: Colors.lineGreen }
        ];

        labels.forEach(l => {
            const y = l.fn(labelX);
            if (y > range.yMax || y < range.yMin) return;
            const pos = this.cs.toPixel(labelX, y);
            const tw = this.ctx.measureText(l.text).width;
            this.ctx.fillStyle = 'rgba(255,255,255,0.85)';
            this.ctx.fillRect(pos.px - 4, pos.py - 11, tw + 8, 22);
            this.ctx.fillStyle = l.color;
            this.ctx.textAlign = 'left';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(l.text, pos.px, pos.py);
        });

        this.ctx.restore();
    }
};
