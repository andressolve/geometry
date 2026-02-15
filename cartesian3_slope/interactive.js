/**
 * Interactive Elements for Lesson 13: Slope
 *
 * Page 1: Step-by-step line builder (y = 2x)
 * Page 3: Auto-animated build (y = 3x) + multi-phase discovery
 */

// ============================================
// PAGE 1: Step-by-step builder for y = 2x
// ============================================
const StepBuilder = {
    canvas: null,
    ctx: null,
    cs: null,
    W: 440,
    H: 400,
    range: { xMin: -1, xMax: 6, yMin: -1, yMax: 10 },
    currentStep: 0,
    maxSteps: 4,
    slope: 2,
    points: [], // accumulated points: (0,0), (1,2), (2,4), ...
    lineRevealed: false,

    init() {
        this.canvas = document.getElementById('canvas-build');
        if (!this.canvas) return;

        this.ctx = setupCanvas(this.canvas, this.W, this.H);
        this.cs = GridUtils.createCoordSystem(this.W, this.H, this.range);

        if (!this._initialized) {
            this.currentStep = 0;
            this.points = [{ x: 0, y: 0 }];
            this.lineRevealed = false;

            const btn = document.getElementById('step-btn');
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

        // Update button
        const btn = document.getElementById('step-btn');
        const counter = document.getElementById('step-counter');
        if (counter) counter.textContent = `${this.currentStep} of ${this.maxSteps}`;

        if (this.currentStep >= this.maxSteps) {
            if (btn) btn.disabled = true;
            // After a pause, reveal the line
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
                // Show the reveal text
                const reveal = document.getElementById('build-reveal');
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

        // Draw the line if revealing
        if (lineT > 0) {
            GridUtils.drawLinePartial(this.ctx, this.cs, x => this.slope * x, lineT, {
                color: Colors.line, lineWidth: 2.5
            });
        }

        // Draw step paths between consecutive points
        for (let i = 0; i < this.points.length - 1; i++) {
            const p = this.points[i];
            GridUtils.drawStepTriangle(this.ctx, this.cs, p.x, p.y, 1, this.slope, {
                color: 'rgba(106, 130, 251, 0.5)',
                lineWidth: 1.5,
                dash: [5, 3],
                showLabels: i === 0 // only label the first step
            });
        }

        // Draw points
        this.points.forEach((p, i) => {
            GridUtils.drawPoint(this.ctx, this.cs, p.x, p.y, {
                color: Colors.point, radius: 6
            });
        });
    }
};

// ============================================
// PAGE 2: Equation input for y = 2x
// ============================================
const EquationInput1 = {
    init() {
        const btn = document.getElementById('eq1-check');
        if (!btn) return;

        btn.addEventListener('click', () => this.check());
        const input = document.getElementById('eq1-input');
        if (input) input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.check();
        });
    },

    check() {
        const input = document.getElementById('eq1-input');
        const feedback = document.getElementById('eq1-feedback');
        const btn = document.getElementById('eq1-check');
        if (!input || !feedback) return;

        const value = parseInt(input.value, 10);
        if (isNaN(value)) {
            feedback.textContent = 'Enter a number.';
            feedback.className = 'feedback';
            feedback.classList.remove('hidden');
            return;
        }

        if (value === 2) {
            feedback.className = 'feedback feedback-correct';
            feedback.innerHTML = '<strong>y = 2x.</strong>';
            feedback.classList.remove('hidden');
            input.disabled = true;
            btn.disabled = true;

            // Show the pairing
            const pairing = document.getElementById('eq1-pairing');
            if (pairing) {
                pairing.classList.remove('hidden');
                pairing.style.opacity = '0';
                requestAnimationFrame(() => {
                    pairing.style.transition = 'opacity 0.6s ease';
                    pairing.style.opacity = '1';
                });
            }
        } else {
            feedback.innerHTML = '<strong>Not quite.</strong> Look at the table — how do x and y relate?';
            feedback.className = 'feedback feedback-incorrect';
            feedback.classList.remove('hidden');
        }
    }
};

// ============================================
// PAGE 3: Multi-phase discovery
// ============================================
const Page3 = {
    phase: 0,  // 0: build, 1: equation, 2: predict, 3: slope naming, 4: reverse
    buildCanvas: null,
    buildCtx: null,
    buildCs: null,
    W: 400,
    H: 360,
    range: { xMin: -1, xMax: 5, yMin: -1, yMax: 10 },

    init() {
        this.buildCanvas = document.getElementById('canvas-build3');
        if (!this.buildCanvas) return;

        this.buildCtx = setupCanvas(this.buildCanvas, this.W, this.H);
        this.buildCs = GridUtils.createCoordSystem(this.W, this.H, this.range);

        // Start button
        const startBtn = document.getElementById('build3-start');
        if (startBtn) startBtn.addEventListener('click', () => this.startBuild());

        // Phase 2: equation check
        const eq3Btn = document.getElementById('eq3-check');
        if (eq3Btn) eq3Btn.addEventListener('click', () => this.checkEquation());
        const eq3Input = document.getElementById('eq3-input');
        if (eq3Input) eq3Input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.checkEquation();
        });

        // Phase 3: predict check
        const predBtn = document.getElementById('pred-check');
        if (predBtn) predBtn.addEventListener('click', () => this.checkPredict());
        const predInput = document.getElementById('pred-input');
        if (predInput) predInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.checkPredict();
        });

        this.drawEmpty();
    },

    drawEmpty() {
        clearCanvas(this.buildCtx, this.W, this.H);
        GridUtils.drawGrid(this.buildCtx, this.buildCs);
        GridUtils.drawAxes(this.buildCtx, this.buildCs, { showLabels: true });
        GridUtils.drawAxisTicks(this.buildCtx, this.buildCs);
    },

    startBuild() {
        const startBtn = document.getElementById('build3-start');
        if (startBtn) startBtn.classList.add('hidden');

        // Auto-animate building y = 3x
        const points = [
            { x: 0, y: 0 },
            { x: 1, y: 3 },
            { x: 2, y: 6 },
            { x: 3, y: 9 }
        ];

        let step = 0;
        const buildStep = () => {
            step++;
            if (step > points.length) {
                // All points placed, animate line
                this.animateLine(points);
                return;
            }

            // Draw up to current step
            this.drawEmpty();
            const drawn = points.slice(0, step);

            // Step triangles
            for (let i = 0; i < drawn.length - 1; i++) {
                const p = drawn[i];
                GridUtils.drawStepTriangle(this.buildCtx, this.buildCs, p.x, p.y, 1, 3, {
                    color: 'rgba(245, 158, 11, 0.5)',
                    lineWidth: 1.5,
                    dash: [5, 3],
                    showLabels: i === 0
                });
            }

            drawn.forEach(p => {
                GridUtils.drawPoint(this.buildCtx, this.buildCs, p.x, p.y, {
                    color: Colors.lineOrange, radius: 6
                });
            });

            setTimeout(buildStep, 500);
        };

        // Start with origin
        this.drawEmpty();
        GridUtils.drawPoint(this.buildCtx, this.buildCs, 0, 0, {
            color: Colors.lineOrange, radius: 6
        });
        setTimeout(buildStep, 500);
    },

    animateLine(points) {
        let t = 0;
        const animate = () => {
            t += 0.03;
            if (t > 1) t = 1;

            this.drawEmpty();

            GridUtils.drawLinePartial(this.buildCtx, this.buildCs, x => 3 * x, t, {
                color: Colors.lineOrange, lineWidth: 2.5
            });

            // Step triangles
            for (let i = 0; i < points.length - 1; i++) {
                const p = points[i];
                GridUtils.drawStepTriangle(this.buildCtx, this.buildCs, p.x, p.y, 1, 3, {
                    color: 'rgba(245, 158, 11, 0.5)',
                    lineWidth: 1.5,
                    dash: [5, 3],
                    showLabels: i === 0
                });
            }

            points.forEach(p => {
                GridUtils.drawPoint(this.buildCtx, this.buildCs, p.x, p.y, {
                    color: Colors.lineOrange, radius: 6
                });
            });

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                // Show phase 2
                const phase2 = document.getElementById('phase2-eq');
                if (phase2) phase2.classList.remove('hidden');
            }
        };
        requestAnimationFrame(animate);
    },

    checkEquation() {
        const input = document.getElementById('eq3-input');
        const feedback = document.getElementById('eq3-feedback');
        const btn = document.getElementById('eq3-check');
        if (!input || !feedback) return;

        const value = parseInt(input.value, 10);
        if (isNaN(value)) {
            feedback.textContent = 'Enter a number.';
            feedback.className = 'feedback';
            feedback.classList.remove('hidden');
            return;
        }

        if (value === 3) {
            feedback.className = 'feedback feedback-correct';
            feedback.innerHTML = '<strong>y = 3x.</strong>';
            feedback.classList.remove('hidden');
            input.disabled = true;
            btn.disabled = true;

            // Show pairing then predict
            const pairing = document.getElementById('eq3-pairing');
            if (pairing) pairing.classList.remove('hidden');

            setTimeout(() => {
                const phase3 = document.getElementById('phase3-predict');
                if (phase3) phase3.classList.remove('hidden');
            }, 800);
        } else {
            feedback.innerHTML = '<strong>Not quite.</strong> Look at the table.';
            feedback.className = 'feedback feedback-incorrect';
            feedback.classList.remove('hidden');
        }
    },

    checkPredict() {
        const input = document.getElementById('pred-input');
        const feedback = document.getElementById('pred-feedback');
        const btn = document.getElementById('pred-check');
        if (!input || !feedback) return;

        const value = parseInt(input.value, 10);
        if (isNaN(value)) {
            feedback.textContent = 'Enter a number.';
            feedback.className = 'feedback';
            feedback.classList.remove('hidden');
            return;
        }

        if (value === 5) {
            feedback.className = 'feedback feedback-correct';
            feedback.innerHTML = '<strong>y = 5x.</strong>';
            feedback.classList.remove('hidden');
            input.disabled = true;
            btn.disabled = true;

            // Show observation
            setTimeout(() => {
                const obs = document.getElementById('pred-observation');
                if (obs) obs.classList.remove('hidden');
            }, 600);
        } else {
            feedback.innerHTML = '<strong>Not quite.</strong> The step goes up 5. What number goes in y = _x?';
            feedback.className = 'feedback feedback-incorrect';
            feedback.classList.remove('hidden');
        }
    },

};

// ============================================
// PAGES 5-7: Line Explorer (clickable line)
// ============================================
function createLineExplorer(config) {
    const { canvasId, fn, eqLabel, range, W, H, lineColor, inputId, checkBtnId, feedbackId, correctSlope } = config;
    let canvas, ctx, cs;
    let points = [];
    let answered = false;

    function init() {
        canvas = document.getElementById(canvasId);
        if (!canvas) return;

        ctx = setupCanvas(canvas, W, H);
        cs = GridUtils.createCoordSystem(W, H, range);

        canvas.addEventListener('click', handleClick);

        const checkBtn = document.getElementById(checkBtnId);
        if (checkBtn) checkBtn.addEventListener('click', check);

        const input = document.getElementById(inputId);
        if (input) input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') check();
        });

        draw();
    }

    function handleClick(e) {
        const rect = canvas.getBoundingClientRect();
        const px = (e.clientX - rect.left) * (W / rect.width);
        const py = (e.clientY - rect.top) * (H / rect.height);

        const coord = cs.toCoord(px, py);
        const snapX = Math.round(coord.x);
        const snapY = fn(snapX);

        if (snapX < Math.ceil(range.xMin) || snapX > Math.floor(range.xMax)) return;
        if (snapY < range.yMin || snapY > range.yMax) return;
        if (points.some(p => p.x === snapX && p.y === snapY)) return;

        points.push({ x: snapX, y: snapY });
        points.sort((a, b) => a.x - b.x);
        draw();
    }

    function check() {
        const input = document.getElementById(inputId);
        const feedback = document.getElementById(feedbackId);
        const btn = document.getElementById(checkBtnId);
        if (!input || !feedback || answered) return;

        const value = parseInt(input.value, 10);
        if (isNaN(value)) {
            feedback.textContent = 'Enter a number.';
            feedback.className = 'feedback';
            feedback.classList.remove('hidden');
            return;
        }

        if (value === correctSlope) {
            feedback.className = 'feedback feedback-correct';
            feedback.innerHTML = `<strong>Slope ${correctSlope}.</strong>`;
            feedback.classList.remove('hidden');
            input.disabled = true;
            btn.disabled = true;
            answered = true;
        } else {
            feedback.innerHTML = '<strong>Not quite.</strong> Click more points and look at how much y changes when x goes up by 1.';
            feedback.className = 'feedback feedback-incorrect';
            feedback.classList.remove('hidden');
        }
    }

    function draw() {
        clearCanvas(ctx, W, H);
        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        GridUtils.drawLine(ctx, cs, fn, {
            color: lineColor, lineWidth: 2.5
        });

        // Equation label on the line
        if (eqLabel) {
            const lx = range.xMax - 1.5;
            const ly = fn(lx);
            // Clamp label inside visible area
            const clampedY = Math.min(ly, range.yMax - 0.5);
            const pos = cs.toPixel(lx, clampedY);
            ctx.save();
            ctx.font = 'bold italic 14px STIX Two Text, serif';
            const tw = ctx.measureText(eqLabel).width;
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fillRect(pos.px - 3, pos.py - 10, tw + 6, 20);
            ctx.fillStyle = lineColor;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(eqLabel, pos.px, pos.py);
            ctx.restore();
        }

        // Placed points with coordinate labels
        points.forEach(p => {
            GridUtils.drawPoint(ctx, cs, p.x, p.y, {
                color: lineColor, radius: 6
            });
            GridUtils.drawCoordinateLabel(ctx, cs, p.x, p.y, {
                offset: { x: 10, y: -12 }, color: lineColor
            });
        });
    }

    return { init, draw };
}

const Explore1 = createLineExplorer({
    canvasId: 'canvas-explore-4x',
    fn: x => 4 * x,
    eqLabel: 'y = 4x',
    range: { xMin: -1, xMax: 4, yMin: -1, yMax: 10 },
    W: 440, H: 400,
    lineColor: Colors.line,
    inputId: 'explore1-input',
    checkBtnId: 'explore1-check',
    feedbackId: 'explore1-feedback',
    correctSlope: 4
});

const Explore2 = createLineExplorer({
    canvasId: 'canvas-explore-x',
    fn: x => x,
    eqLabel: 'y = x',
    range: { xMin: -1, xMax: 6, yMin: -1, yMax: 7 },
    W: 440, H: 400,
    lineColor: Colors.lineGreen,
    inputId: 'explore2-input',
    checkBtnId: 'explore2-check',
    feedbackId: 'explore2-feedback',
    correctSlope: 1
});

const Explore3 = createLineExplorer({
    canvasId: 'canvas-explore-x1',
    fn: x => x + 1,
    eqLabel: 'y = x + 1',
    range: { xMin: -1, xMax: 6, yMin: -1, yMax: 8 },
    W: 440, H: 400,
    lineColor: Colors.lineOrange,
    inputId: 'explore3-input',
    checkBtnId: 'explore3-check',
    feedbackId: 'explore3-feedback',
    correctSlope: 1
});

const Explore4 = createLineExplorer({
    canvasId: 'canvas-explore-2x1',
    fn: x => 2 * x + 1,
    eqLabel: 'y = 2x + 1',
    range: { xMin: -1, xMax: 5, yMin: -1, yMax: 10 },
    W: 440, H: 400,
    lineColor: '#8b5cf6',
    inputId: 'explore4-input',
    checkBtnId: 'explore4-check',
    feedbackId: 'explore4-feedback',
    correctSlope: 2
});
