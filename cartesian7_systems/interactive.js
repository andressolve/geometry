/**
 * Interactive Elements for Lesson 17: Two Lines, One Point
 *
 * Page 1: ClickIntersection — click to find the crossing point
 * Page 3: AlgebraSteps — progressive reveal of algebra steps
 * Page 4: GuidedSolve — fill in x, y, coordinate with progressive disclosure
 * Page 5: IndependentSolve — minimal scaffolding, graph reveals after
 */

// ============================================
// PAGE 1: Click to find the intersection
// y = x + 1 and y = 2x, intersection at (1, 2)
// ============================================
const ClickIntersection = {
    canvas: null,
    ctx: null,
    cs: null,
    W: 440,
    H: 400,
    range: { xMin: -1, xMax: 4, yMin: -1, yMax: 6 },
    targetX: 1,
    targetY: 2,
    found: false,
    missPoint: null,
    missTimer: null,

    init() {
        this.canvas = document.getElementById('canvas-page1');
        if (!this.canvas) return;

        this.ctx = setupCanvas(this.canvas, this.W, this.H);
        this.cs = GridUtils.createCoordSystem(this.W, this.H, this.range);

        if (!this._initialized) {
            this.found = false;
            this.missPoint = null;

            this.canvas.addEventListener('click', (e) => this.onClick(e));
            this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));

            this._initialized = true;
        }

        this.draw();
    },

    getCanvasCoords(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.W / rect.width;
        const scaleY = this.H / rect.height;
        return {
            px: (e.clientX - rect.left) * scaleX,
            py: (e.clientY - rect.top) * scaleY
        };
    },

    onMouseMove(e) {
        if (this.found) return;
        const { px, py } = this.getCanvasCoords(e);
        const snapped = this.cs.snapToGrid(px, py);
        const { xMin, xMax, yMin, yMax } = this.range;

        const readout = document.getElementById('p1-coord-readout');
        if (readout && snapped.x >= xMin && snapped.x <= xMax &&
            snapped.y >= yMin && snapped.y <= yMax) {
            readout.textContent = `(${snapped.x}, ${snapped.y})`;
        }
    },

    onClick(e) {
        if (this.found) return;

        const { px, py } = this.getCanvasCoords(e);
        const snapped = this.cs.snapToGrid(px, py);
        const feedback = document.getElementById('p1-feedback');

        if (snapped.x === this.targetX && snapped.y === this.targetY) {
            // Correct!
            this.found = true;
            if (feedback) {
                feedback.className = 'feedback feedback-correct text-sm mb-4';
                feedback.textContent = 'That\'s it!';
                feedback.classList.remove('hidden');
            }
            this.canvas.classList.remove('diagram-clickable');
            this.draw();

            // Show reveal
            setTimeout(() => {
                if (feedback) feedback.classList.add('hidden');
                const reveal = document.getElementById('p1-reveal');
                if (reveal) reveal.classList.remove('hidden');
            }, 800);
        } else {
            // Miss
            this.missPoint = { x: snapped.x, y: snapped.y };
            this.draw();

            const dist = Math.abs(snapped.x - this.targetX) + Math.abs(snapped.y - this.targetY);
            if (feedback) {
                if (dist > 3) {
                    feedback.innerHTML = 'Look at where the two lines cross.';
                } else {
                    feedback.innerHTML = 'Close &mdash; try again.';
                }
                feedback.className = 'feedback feedback-incorrect text-sm mb-4';
                feedback.classList.remove('hidden');
            }

            if (this.missTimer) clearTimeout(this.missTimer);
            this.missTimer = setTimeout(() => {
                this.missPoint = null;
                this.draw();
            }, 800);
        }
    },

    draw() {
        Diagrams.drawPage1Base(this.ctx, this.cs, this.W, this.H);

        // Miss point (red)
        if (this.missPoint) {
            GridUtils.drawPoint(this.ctx, this.cs, this.missPoint.x, this.missPoint.y, {
                color: '#ef4444', radius: 6
            });
        }

        // Found point (coral)
        if (this.found) {
            Diagrams.drawIntersectionDot(this.ctx, this.cs, this.targetX, this.targetY);
        }
    }
};

// ============================================
// PAGE 3: Progressive algebra step reveal
// ============================================
const AlgebraSteps = {
    currentStep: 0,
    totalSteps: 5,  // steps 0-4, step 0 is already visible

    init() {
        const btn = document.getElementById('alg-next-btn');
        if (!btn) return;

        if (this._initialized) return;
        this._initialized = true;

        this.currentStep = 0;

        btn.addEventListener('click', () => {
            this.currentStep++;
            if (this.currentStep < this.totalSteps) {
                const step = document.getElementById(`alg-step-${this.currentStep}`);
                if (step) step.classList.add('visible');
            }
            if (this.currentStep >= this.totalSteps - 1) {
                btn.disabled = true;
                btn.textContent = 'Done';
            }
        });
    }
};

// ============================================
// PAGE 4: Guided solve — y = x + 2 and y = 3x − 4, answer (3, 5)
// ============================================
const GuidedSolve = {
    xDone: false,
    yDone: false,
    coordDone: false,

    init() {
        if (this._initialized) return;
        this._initialized = true;

        // x check
        const xCheck = document.getElementById('p4-x-check');
        const xInput = document.getElementById('p4-x-input');
        if (xCheck && xInput) {
            const doCheck = () => {
                if (this.xDone) return;
                const val = parseInt(xInput.value, 10);
                const feedback = document.getElementById('p4-x-feedback');

                if (val === 3) {
                    this.xDone = true;
                    xInput.disabled = true;
                    xInput.classList.add('correct');
                    xCheck.disabled = true;
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#065f46';
                        feedback.textContent = '\u2713';
                        feedback.classList.remove('hidden');
                    }
                    setTimeout(() => {
                        const yRow = document.getElementById('p4-y-row');
                        if (yRow) yRow.classList.remove('hidden');
                    }, 400);
                } else {
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#991b1b';
                        feedback.textContent = 'Divide both sides by 2.';
                        feedback.classList.remove('hidden');
                    }
                }
            };
            xCheck.addEventListener('click', doCheck);
            xInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck(); });
        }

        // y check
        const yCheck = document.getElementById('p4-y-check');
        const yInput = document.getElementById('p4-y-input');
        if (yCheck && yInput) {
            const doCheck = () => {
                if (this.yDone) return;
                const val = parseInt(yInput.value, 10);
                const feedback = document.getElementById('p4-y-feedback');

                if (val === 5) {
                    this.yDone = true;
                    yInput.disabled = true;
                    yInput.classList.add('correct');
                    yCheck.disabled = true;
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#065f46';
                        feedback.textContent = '3 + 2 = 5 \u2713';
                        feedback.classList.remove('hidden');
                    }
                    setTimeout(() => {
                        const coordRow = document.getElementById('p4-coord-row');
                        if (coordRow) coordRow.classList.remove('hidden');
                    }, 400);
                } else {
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#991b1b';
                        feedback.textContent = 'Plug x = 3 into y = x + 2.';
                        feedback.classList.remove('hidden');
                    }
                }
            };
            yCheck.addEventListener('click', doCheck);
            yInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck(); });
        }

        // Coordinate check
        const coordCheck = document.getElementById('p4-coord-check');
        if (coordCheck) {
            const doCheck = () => {
                if (this.coordDone) return;
                const cx = parseInt(document.getElementById('p4-cx-input').value, 10);
                const cy = parseInt(document.getElementById('p4-cy-input').value, 10);
                const feedback = document.getElementById('p4-coord-feedback');

                if (cx === 3 && cy === 5) {
                    this.coordDone = true;
                    document.getElementById('p4-cx-input').disabled = true;
                    document.getElementById('p4-cy-input').disabled = true;
                    document.getElementById('p4-cx-input').classList.add('correct');
                    document.getElementById('p4-cy-input').classList.add('correct');
                    coordCheck.disabled = true;
                    if (feedback) {
                        feedback.className = 'text-sm feedback feedback-correct';
                        feedback.textContent = '(3, 5) \u2014 the lines cross right there.';
                        feedback.classList.remove('hidden');
                    }
                    // Show intersection on canvas
                    const canvas = document.getElementById('canvas-page4');
                    if (canvas) Diagrams.drawPage4Complete(canvas);
                } else {
                    if (feedback) {
                        feedback.className = 'text-sm feedback feedback-incorrect';
                        feedback.textContent = 'The crossing point is (x, y).';
                        feedback.classList.remove('hidden');
                    }
                }
            };
            coordCheck.addEventListener('click', doCheck);
        }
    }
};

// ============================================
// PAGE 5: Independent solve — y = 2x + 1 and y = 5x − 5, answer (2, 5)
// Graph reveals after correct answer
// ============================================
const IndependentSolve = {
    xDone: false,
    yDone: false,
    coordDone: false,

    init() {
        if (this._initialized) return;
        this._initialized = true;

        // x check
        const xCheck = document.getElementById('p5-x-check');
        const xInput = document.getElementById('p5-x-input');
        if (xCheck && xInput) {
            const doCheck = () => {
                if (this.xDone) return;
                const val = parseInt(xInput.value, 10);
                const feedback = document.getElementById('p5-x-feedback');

                if (val === 2) {
                    this.xDone = true;
                    xInput.disabled = true;
                    xInput.classList.add('correct');
                    xCheck.disabled = true;
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#065f46';
                        feedback.textContent = '\u2713';
                        feedback.classList.remove('hidden');
                    }
                    setTimeout(() => {
                        const yRow = document.getElementById('p5-y-row');
                        if (yRow) yRow.classList.remove('hidden');
                    }, 400);
                } else {
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#991b1b';
                        feedback.textContent = 'Subtract 2x from both sides, then add 5.';
                        feedback.classList.remove('hidden');
                    }
                }
            };
            xCheck.addEventListener('click', doCheck);
            xInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck(); });
        }

        // y check
        const yCheck = document.getElementById('p5-y-check');
        const yInput = document.getElementById('p5-y-input');
        if (yCheck && yInput) {
            const doCheck = () => {
                if (this.yDone) return;
                const val = parseInt(yInput.value, 10);
                const feedback = document.getElementById('p5-y-feedback');

                if (val === 5) {
                    this.yDone = true;
                    yInput.disabled = true;
                    yInput.classList.add('correct');
                    yCheck.disabled = true;
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#065f46';
                        feedback.textContent = '2(2) + 1 = 5 \u2713';
                        feedback.classList.remove('hidden');
                    }
                    setTimeout(() => {
                        const coordRow = document.getElementById('p5-coord-row');
                        if (coordRow) coordRow.classList.remove('hidden');
                    }, 400);
                } else {
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#991b1b';
                        feedback.textContent = 'Plug x = 2 into either equation.';
                        feedback.classList.remove('hidden');
                    }
                }
            };
            yCheck.addEventListener('click', doCheck);
            yInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck(); });
        }

        // Coordinate check
        const coordCheck = document.getElementById('p5-coord-check');
        if (coordCheck) {
            const doCheck = () => {
                if (this.coordDone) return;
                const cx = parseInt(document.getElementById('p5-cx-input').value, 10);
                const cy = parseInt(document.getElementById('p5-cy-input').value, 10);
                const feedback = document.getElementById('p5-coord-feedback');

                if (cx === 2 && cy === 5) {
                    this.coordDone = true;
                    document.getElementById('p5-cx-input').disabled = true;
                    document.getElementById('p5-cy-input').disabled = true;
                    document.getElementById('p5-cx-input').classList.add('correct');
                    document.getElementById('p5-cy-input').classList.add('correct');
                    coordCheck.disabled = true;
                    if (feedback) {
                        feedback.className = 'text-sm feedback feedback-correct';
                        feedback.textContent = '(2, 5) \u2014 exactly right.';
                        feedback.classList.remove('hidden');
                    }

                    // Reveal graph
                    setTimeout(() => {
                        const canvas = document.getElementById('canvas-page5');
                        if (canvas) {
                            Diagrams.drawPage5(canvas);
                            canvas.classList.add('canvas-visible');
                        }
                        const reveal = document.getElementById('p5-reveal');
                        if (reveal) reveal.classList.remove('hidden');
                    }, 500);
                } else {
                    if (feedback) {
                        feedback.className = 'text-sm feedback feedback-incorrect';
                        feedback.textContent = 'The crossing point is (x, y).';
                        feedback.classList.remove('hidden');
                    }
                }
            };
            coordCheck.addEventListener('click', doCheck);
        }
    }
};
