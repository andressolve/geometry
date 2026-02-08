/**
 * Interactive Point Plotting for Lesson 12: Lines in the Plane
 *
 * Key UX decisions:
 *  - On incorrect click: show feedback, let student try again (no reset needed)
 *  - On correct click: auto-advance to next point after brief pause
 *  - Hover only redraws the crosshair overlay (no full re-render = no jitter)
 *  - Progress shows "1 of 5 points" not "1/5"
 */

function createPlotter(config) {
    return {
        canvas: null,
        ctx: null,
        coordSystem: null,
        challenges: config.challenges,
        canvasId: config.canvasId,
        W: config.canvasWidth || 460,
        H: config.canvasHeight || 460,
        range: config.range,
        currentChallenge: 0,
        isComplete: false,
        completedPoints: [],
        lastHover: null,
        baseImageData: null, // cached base layer

        // Element IDs
        targetId: config.targetId,
        progressId: config.progressId,
        liveCoordsId: config.liveCoordsId,
        feedbackId: config.feedbackId,
        completeId: config.completeId,

        init() {
            this.canvas = document.getElementById(this.canvasId);
            if (!this.canvas) return;

            this.ctx = setupCanvas(this.canvas, this.W, this.H);
            this.coordSystem = GridUtils.createCoordSystem(this.W, this.H, this.range);

            // Only reset state + attach listeners on first init
            if (!this._initialized) {
                this.currentChallenge = 0;
                this.isComplete = false;
                this.completedPoints = [];
                this.lastHover = null;
                this.baseImageData = null;

                this.canvas.addEventListener('click', (e) => this.handleClick(e));
                this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
                this.canvas.addEventListener('mouseleave', () => {
                    this.lastHover = null;
                    this.restoreBase();
                });
                this._initialized = true;
            } else {
                this.baseImageData = null;
            }

            this.drawBase();
            this.updateUI();
        },

        getCanvasCoords(e) {
            const rect = this.canvas.getBoundingClientRect();
            return {
                px: (e.clientX - rect.left) * (this.W / rect.width),
                py: (e.clientY - rect.top) * (this.H / rect.height)
            };
        },

        handleMouseMove(e) {
            if (this.isComplete) return;
            const { px, py } = this.getCanvasCoords(e);
            const snapped = this.coordSystem.snapToGrid(px, py);

            // Skip redraw if hovering same grid point
            if (this.lastHover && snapped.x === this.lastHover.x && snapped.y === this.lastHover.y) return;

            const display = document.getElementById(this.liveCoordsId);
            if (display) display.textContent = `(${snapped.x}, ${snapped.y})`;

            this.lastHover = snapped;
            this.restoreBase();
            this.drawHover(snapped);
        },

        handleClick(e) {
            if (this.isComplete || this._advancing) return;
            const { px, py } = this.getCanvasCoords(e);
            const snapped = this.coordSystem.snapToGrid(px, py);

            const target = this.challenges[this.currentChallenge];
            const isCorrect = (snapped.x === target.x && snapped.y === target.y);

            const feedback = document.getElementById(this.feedbackId);

            if (isCorrect) {
                this.completedPoints.push({ ...target });
                if (feedback) {
                    feedback.textContent = 'Correct!';
                    feedback.className = 'feedback feedback-correct';
                    feedback.style.minHeight = '2.5rem';
                }
                this._advancing = true;
                this.drawBase();

                // Auto-advance after a short pause
                setTimeout(() => {
                    this._advancing = false;
                    if (feedback) {
                        feedback.textContent = '\u00a0';
                        feedback.className = 'feedback';
                        feedback.style.minHeight = '2.5rem';
                    }
                    this.currentChallenge++;
                    if (this.currentChallenge >= this.challenges.length) {
                        this.isComplete = true;
                        this.showCompletion();
                    } else {
                        this.updateUI();
                        this.drawBase();
                    }
                }, 600);
            } else {
                // Wrong click: just show feedback, let them try again
                if (feedback) {
                    feedback.textContent = `Not quite \u2014 you clicked (${snapped.x}, ${snapped.y}). Try again.`;
                    feedback.className = 'feedback feedback-incorrect';
                    feedback.style.minHeight = '2.5rem';
                }
                // Brief flash of the wrong point
                this.restoreBase();
                GridUtils.drawPoint(this.ctx, this.coordSystem, snapped.x, snapped.y, {
                    color: Colors.pointIncorrect, radius: 6
                });
                setTimeout(() => this.restoreBase(), 500);
            }
        },

        showCompletion() {
            const completion = document.getElementById(this.completeId);
            if (completion) completion.classList.remove('hidden');

            const targetDisplay = document.getElementById(this.targetId);
            if (targetDisplay) targetDisplay.textContent = 'Done!';

            const progress = document.getElementById(this.progressId);
            if (progress) progress.textContent = '';

            this.drawBase();

            if (config.onComplete) config.onComplete();
        },

        updateUI() {
            const target = this.challenges[this.currentChallenge];
            const targetDisplay = document.getElementById(this.targetId);
            if (targetDisplay) targetDisplay.textContent = `(${target.x}, ${target.y})`;

            const progress = document.getElementById(this.progressId);
            if (progress) progress.textContent = `${this.currentChallenge + 1} of ${this.challenges.length} points`;
        },

        // Draw the static base layer and cache it
        drawBase() {
            const dpr = window.devicePixelRatio || 1;
            clearCanvas(this.ctx, this.W, this.H);
            GridUtils.drawGrid(this.ctx, this.coordSystem);
            GridUtils.drawAxes(this.ctx, this.coordSystem, { showLabels: true });
            GridUtils.drawAxisTicks(this.ctx, this.coordSystem);

            this.completedPoints.forEach(p => {
                GridUtils.drawPoint(this.ctx, this.coordSystem, p.x, p.y, {
                    color: Colors.pointCorrect, radius: 6
                });
            });

            if (this.isComplete) {
                this.completedPoints.forEach(p => {
                    GridUtils.drawCoordinateLabel(this.ctx, this.coordSystem, p.x, p.y, {
                        offset: { x: 10, y: -10 }
                    });
                });
            }

            // Cache the base layer
            this.baseImageData = this.ctx.getImageData(0, 0, this.W * dpr, this.H * dpr);
        },

        // Restore the cached base layer (fast — no redraw)
        restoreBase() {
            if (this.baseImageData) {
                this.ctx.putImageData(this.baseImageData, 0, 0);
            } else {
                this.drawBase();
            }
        },

        // Draw the hover crosshair (lightweight, on top of cached base)
        drawHover(snapped) {
            const { px, py } = this.coordSystem.toPixel(snapped.x, snapped.y);
            const cs = this.coordSystem;
            const { xMin, xMax, yMin, yMax } = cs.range;
            const gridLeft = cs.originX + xMin * cs.scale;
            const gridRight = cs.originX + xMax * cs.scale;
            const gridTop = cs.originY - yMax * cs.scale;
            const gridBottom = cs.originY - yMin * cs.scale;

            this.ctx.save();
            this.ctx.strokeStyle = 'rgba(106, 130, 251, 0.4)';
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([4, 4]);

            this.ctx.beginPath();
            this.ctx.moveTo(px, gridTop);
            this.ctx.lineTo(px, gridBottom);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(gridLeft, py);
            this.ctx.lineTo(gridRight, py);
            this.ctx.stroke();

            this.ctx.setLineDash([]);

            this.ctx.beginPath();
            this.ctx.arc(px, py, 6, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(106, 130, 251, 0.25)';
            this.ctx.fill();
            this.ctx.strokeStyle = '#6a82fb';
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();

            this.ctx.restore();
        }
    };
}

// ============================================
// PAGE 1: Interactive plotter for y = 2x
// ============================================
const Interactive1 = createPlotter({
    canvasId: 'canvas-interactive',
    canvasWidth: 460,
    canvasHeight: 460,
    range: { xMin: -3, xMax: 5, yMin: -4, yMax: 8 },
    challenges: [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 0, y: 0 },
        { x: -1, y: -2 }
    ],
    targetId: 'target-coord',
    progressId: 'interactive-progress',
    liveCoordsId: 'live-coords',
    feedbackId: 'interactive-feedback',
    completeId: 'interactive-complete'
});

// ============================================
// PAGE 5: Interactive plotter for y = x + 1
// ============================================
const Interactive2 = createPlotter({
    canvasId: 'canvas-interactive2',
    canvasWidth: 460,
    canvasHeight: 400,
    range: { xMin: -3, xMax: 5, yMin: -2, yMax: 6 },
    challenges: [
        { x: 0, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 4 },
        { x: -1, y: 0 }
    ],
    targetId: 'target-coord-2',
    progressId: 'interactive2-progress',
    liveCoordsId: 'live-coords-2',
    feedbackId: 'interactive2-feedback',
    completeId: 'interactive2-complete',
    onComplete() {}
});

// ============================================
// PAGE 2: Reveal line animation
// ============================================
const RevealLine = {
    animating: false,

    init() {
        const btn = document.getElementById('reveal-line-btn');
        if (!btn) return;

        btn.addEventListener('click', () => this.reveal());
    },

    reveal() {
        if (this.animating) return;
        this.animating = true;

        const btn = document.getElementById('reveal-line-btn');
        if (btn) btn.style.display = 'none';

        // Animate on the interactive canvas from slide 1
        const canvas = document.getElementById('canvas-interactive');
        if (!canvas) return;

        const W = Interactive1.W;
        const H = Interactive1.H;
        const coordSystem = Interactive1.coordSystem;

        let t = 0;
        const animate = () => {
            t += 0.02;
            if (t > 1) t = 1;

            // Redraw base (grid + axes + completed points)
            clearCanvas(Interactive1.ctx, W, H);
            GridUtils.drawGrid(Interactive1.ctx, coordSystem);
            GridUtils.drawAxes(Interactive1.ctx, coordSystem, { showLabels: true });
            GridUtils.drawAxisTicks(Interactive1.ctx, coordSystem);

            // Animate the line
            GridUtils.drawLinePartial(Interactive1.ctx, coordSystem, x => 2 * x, t, {
                color: Colors.line, lineWidth: 2.5
            });

            // Draw completed points on top
            Interactive1.completedPoints.forEach(p => {
                GridUtils.drawPoint(Interactive1.ctx, coordSystem, p.x, p.y, {
                    color: Colors.pointCorrect, radius: 6
                });
                GridUtils.drawCoordinateLabel(Interactive1.ctx, coordSystem, p.x, p.y, {
                    offset: { x: 10, y: -10 }
                });
            });

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                const text = document.getElementById('reveal-text');
                if (text) text.classList.remove('hidden');
                this.animating = false;
            }
        };

        requestAnimationFrame(animate);
    }
};

// ============================================
// PAGE 3: Discovery input (y for x = 4 on y = 2x)
// ============================================
const Discovery1 = {
    revealed: false,

    init() {
        const btn = document.getElementById('page3-check');
        if (!btn) return;

        btn.addEventListener('click', () => this.check());
        const input = document.getElementById('page3-y-input');
        if (input) input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.check();
        });
    },

    check() {
        const input = document.getElementById('page3-y-input');
        const feedback = document.getElementById('page3-feedback');
        const btn = document.getElementById('page3-check');
        if (!input || !feedback) return;

        const value = parseInt(input.value, 10);
        if (isNaN(value)) {
            feedback.textContent = 'Enter a number.';
            feedback.className = 'feedback';
            feedback.classList.remove('hidden');
            return;
        }

        if (value === 8) {
            feedback.className = 'feedback feedback-correct';
            feedback.innerHTML = '<strong>Correct!</strong>';
            feedback.classList.remove('hidden');
            input.disabled = true;
            btn.disabled = true;

            const reveal = document.getElementById('page3-reveal');
            if (reveal) reveal.classList.remove('hidden');

            // Redraw with (4, 8)
            const canvas = document.getElementById('canvas-page3');
            if (canvas) Diagrams.drawPage3(canvas, true);

            this.revealed = true;
        } else {
            feedback.innerHTML = '<strong>Not quite.</strong> Look at the pattern in the table.';
            feedback.className = 'feedback feedback-incorrect';
            feedback.classList.remove('hidden');
        }
    }
};

// ============================================
// PAGE 5: Discovery input (y for x = 5 on y = x + 1)
// ============================================
const Discovery2 = {
    animating: false,

    init() {
        const btn = document.getElementById('page5-check');
        if (!btn) return;

        btn.addEventListener('click', () => this.check());
        const input = document.getElementById('page5-y-input');
        if (input) input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.check();
        });

        const continueBtn = document.getElementById('phase2-continue');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.showDiscovery());
        }
    },

    showDiscovery() {
        if (this.animating) return;
        this.animating = true;

        // Hide plot controls but keep canvas visible
        const plotControls = document.getElementById('phase2-plot-controls');
        const bottomControls = document.getElementById('phase2-bottom-controls');
        if (plotControls) plotControls.classList.add('hidden');
        if (bottomControls) bottomControls.classList.add('hidden');

        // Animate line on the interactive canvas
        const canvas = document.getElementById('canvas-interactive2');
        if (!canvas) return;

        const W = Interactive2.W;
        const H = Interactive2.H;
        const coordSystem = Interactive2.coordSystem;

        let t = 0;
        const animate = () => {
            t += 0.02;
            if (t > 1) t = 1;

            clearCanvas(Interactive2.ctx, W, H);
            GridUtils.drawGrid(Interactive2.ctx, coordSystem);
            GridUtils.drawAxes(Interactive2.ctx, coordSystem, { showLabels: true });
            GridUtils.drawAxisTicks(Interactive2.ctx, coordSystem);

            // Animate the line
            GridUtils.drawLinePartial(Interactive2.ctx, coordSystem, x => x + 1, t, {
                color: Colors.line, lineWidth: 2.5
            });

            // Draw completed points on top
            Interactive2.completedPoints.forEach(p => {
                GridUtils.drawPoint(Interactive2.ctx, coordSystem, p.x, p.y, {
                    color: Colors.pointCorrect, radius: 6
                });
            });

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                this.animating = false;
                // After line animation: fade in the discovery panel (table)
                const panel = document.getElementById('phase2-discovery-panel');
                if (panel) {
                    panel.classList.remove('hidden');
                    // Trigger opacity transition
                    requestAnimationFrame(() => {
                        panel.style.opacity = '1';
                    });
                    // Show the question after table fades in
                    setTimeout(() => {
                        const question = document.getElementById('phase2-question');
                        if (question) question.classList.remove('hidden');
                    }, 700);
                }
            }
        };

        requestAnimationFrame(animate);
    },

    check() {
        const input = document.getElementById('page5-y-input');
        const feedback = document.getElementById('page5-feedback');
        const btn = document.getElementById('page5-check');
        if (!input || !feedback) return;

        const value = parseInt(input.value, 10);
        if (isNaN(value)) {
            feedback.textContent = 'Enter a number.';
            feedback.className = 'feedback';
            feedback.classList.remove('hidden');
            return;
        }

        if (value === 6) {
            feedback.className = 'feedback feedback-correct';
            feedback.innerHTML = '<strong>Correct!</strong>';
            feedback.classList.remove('hidden');
            input.disabled = true;
            btn.disabled = true;

            const reveal = document.getElementById('page5-reveal');
            if (reveal) reveal.classList.remove('hidden');
        } else {
            feedback.innerHTML = '<strong>Not quite.</strong> Look at the pattern in the table.';
            feedback.className = 'feedback feedback-incorrect';
            feedback.classList.remove('hidden');
        }
    }
};
