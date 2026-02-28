/**
 * Interactive Elements for Lesson 16: x + y = 1
 *
 * Page 1: PointTest — test 4 points with Yes/No, show on canvas
 * Page 2: TablePlot — fill table, plot points, animate line
 * Page 4: Verification — check a point against both equation forms
 */

// ============================================
// PAGE 1: Point Test Interaction
// Four points tested sequentially against x + y = 1
// ============================================
const PointTest = {
    canvas: null,
    ctx: null,
    cs: null,
    W: 400,
    H: 340,
    range: { xMin: -1, xMax: 4, yMin: -1, yMax: 3 },

    points: [
        { x: 0, y: 1, pass: true,  sum: '0 + 1 = 1 \u2713' },
        { x: 3, y: 2, pass: false, sum: '3 + 2 = 5 \u2014 not 1. \u2717' },
        { x: 1, y: 1, pass: false, sum: '1 + 1 = 2 \u2014 not 1. \u2717' },
        { x: 1, y: 0, pass: true,  sum: '1 + 0 = 1 \u2713' }
    ],

    results: [],     // Stores { pass: bool } for each answered point
    currentIndex: 0,
    done: false,

    init() {
        this.canvas = document.getElementById('canvas-point-test');
        if (!this.canvas) return;

        this.ctx = setupCanvas(this.canvas, this.W, this.H);
        this.cs = GridUtils.createCoordSystem(this.W, this.H, this.range);

        if (!this._initialized) {
            this.results = [];
            this.currentIndex = 0;
            this.done = false;

            // Attach click handlers to all yes/no buttons
            document.querySelectorAll('.pt-yes').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = parseInt(e.target.dataset.index, 10);
                    this.answer(idx, true);
                });
            });

            document.querySelectorAll('.pt-no').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = parseInt(e.target.dataset.index, 10);
                    this.answer(idx, false);
                });
            });

            this._initialized = true;
        }

        this.draw();
    },

    answer(index, userSaidYes) {
        if (index !== this.currentIndex) return;
        if (this.done) return;

        const point = this.points[index];
        const correct = (userSaidYes === point.pass);

        const resultSpan = document.getElementById(`pt-result-${index}`);
        const card = document.getElementById(`pt-card-${index}`);

        if (correct) {
            // Show result
            resultSpan.textContent = point.sum;
            resultSpan.className = 'computation ' + (point.pass ? 'pass' : 'fail');
            resultSpan.classList.remove('hidden');

            // Highlight correct button
            const yesBtn = card.querySelector('.pt-yes');
            const noBtn = card.querySelector('.pt-no');
            if (userSaidYes) {
                yesBtn.classList.add('selected-correct');
            } else {
                noBtn.classList.add('selected-correct');
            }
            yesBtn.disabled = true;
            noBtn.disabled = true;

            // Record result
            this.results.push({ pass: point.pass });

            // Draw point on canvas
            this.draw();

            // Advance to next
            this.currentIndex++;

            if (this.currentIndex < this.points.length) {
                // Show next card after delay
                setTimeout(() => {
                    const nextCard = document.getElementById(`pt-card-${this.currentIndex}`);
                    if (nextCard) nextCard.classList.remove('hidden');
                }, 400);
            } else {
                // All done
                this.done = true;
                setTimeout(() => {
                    const reveal = document.getElementById('pt-reveal');
                    if (reveal) reveal.classList.remove('hidden');
                }, 600);
            }
        } else {
            // Wrong answer — show hint
            resultSpan.textContent = point.pass
                ? 'Try adding the coordinates: ' + point.x + ' + ' + point.y + ' = ?'
                : 'Try adding the coordinates: ' + point.x + ' + ' + point.y + ' = ?';
            resultSpan.className = 'computation fail';
            resultSpan.classList.remove('hidden');

            // Flash the button red briefly
            const btn = userSaidYes
                ? card.querySelector('.pt-yes')
                : card.querySelector('.pt-no');
            btn.classList.add('selected-incorrect');
            setTimeout(() => btn.classList.remove('selected-incorrect'), 600);
        }
    },

    draw() {
        Diagrams.drawPointTestBase(this.ctx, this.cs);

        // Draw each answered point
        this.results.forEach((result, i) => {
            const point = this.points[i];
            const color = point.pass ? Colors.pointCorrect : Colors.pointIncorrect;
            GridUtils.drawPoint(this.ctx, this.cs, point.x, point.y, {
                color: color, radius: 7
            });
            GridUtils.drawCoordinateLabel(this.ctx, this.cs, point.x, point.y, {
                offset: { x: 10, y: -12 },
                color: point.pass ? '#065f46' : '#991b1b'
            });
        });
    }
};

// ============================================
// PAGE 2: Table + Plot Interaction
// Fill table for x + y = 1, plot points, animate line
// ============================================
const TablePlot = {
    canvas: null,
    ctx: null,
    cs: null,
    W: 420,
    H: 380,
    range: { xMin: -2, xMax: 4, yMin: -3, yMax: 3 },

    xValues: [-1, 0, 1, 2, 3],
    yValues: [2, 1, 0, -1, -2],
    prefilled: [false, true, true, false, false],  // x=0 and x=1 are pre-filled

    tableDone: false,
    plotPoints: [],   // Points confirmed and plotted
    lineRevealed: false,

    init() {
        this.canvas = document.getElementById('canvas-table-plot');
        if (!this.canvas) return;

        this.ctx = setupCanvas(this.canvas, this.W, this.H);
        this.cs = GridUtils.createCoordSystem(this.W, this.H, this.range);

        if (!this._initialized) {
            this.tableDone = false;
            this.lineRevealed = false;

            // Pre-filled points are already plotted
            this.plotPoints = [];
            for (let i = 0; i < this.xValues.length; i++) {
                if (this.prefilled[i]) {
                    this.plotPoints.push({ x: this.xValues[i], y: this.yValues[i] });
                }
            }

            // Style pre-filled inputs
            for (let i = 0; i < this.xValues.length; i++) {
                if (this.prefilled[i]) {
                    const input = document.getElementById(`plot-y-${i}`);
                    if (input) input.classList.add('correct');
                }
            }

            const checkBtn = document.getElementById('plot-table-check');
            if (checkBtn) {
                checkBtn.addEventListener('click', () => this.checkTable());
            }

            this._initialized = true;
        }

        this.draw();
    },

    checkTable() {
        if (this.tableDone) return;

        let allCorrect = true;

        for (let i = 0; i < this.xValues.length; i++) {
            const input = document.getElementById(`plot-y-${i}`);
            if (!input || this.prefilled[i]) continue;

            const val = parseInt(input.value, 10);
            const answer = parseInt(input.dataset.answer, 10);

            if (val === answer) {
                input.classList.remove('incorrect');
                input.classList.add('correct');
            } else {
                input.classList.remove('correct');
                input.classList.add('incorrect');
                allCorrect = false;
            }
        }

        const feedback = document.getElementById('plot-table-feedback');

        if (allCorrect) {
            this.tableDone = true;

            // Disable all inputs
            for (let i = 0; i < this.xValues.length; i++) {
                const input = document.getElementById(`plot-y-${i}`);
                if (input) input.disabled = true;
            }

            const checkBtn = document.getElementById('plot-table-check');
            if (checkBtn) checkBtn.disabled = true;

            feedback.className = 'text-sm feedback feedback-correct';
            feedback.textContent = 'All correct!';
            feedback.classList.remove('hidden');

            // Plot all points
            this.plotPoints = [];
            for (let i = 0; i < this.xValues.length; i++) {
                this.plotPoints.push({ x: this.xValues[i], y: this.yValues[i] });
            }
            this.draw();

            // Animate line after delay
            setTimeout(() => this.revealLine(), 600);
        } else {
            feedback.className = 'text-sm feedback feedback-incorrect';
            feedback.textContent = 'Some values are off. Remember: x + y must equal 1.';
            feedback.classList.remove('hidden');
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
                // Show reveal text
                const reveal = document.getElementById('plot-reveal');
                if (reveal) {
                    reveal.classList.remove('hidden');
                    reveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        };
        requestAnimationFrame(animate);
    },

    draw(lineT) {
        Diagrams.drawTablePlotBase(this.ctx, this.cs);

        // Draw line if revealing
        if (this.lineRevealed && lineT !== undefined) {
            GridUtils.drawLinePartial(this.ctx, this.cs, x => 1 - x, lineT, {
                color: Colors.line, lineWidth: 2.5
            });
        } else if (this.lineRevealed) {
            GridUtils.drawLine(this.ctx, this.cs, x => 1 - x, {
                color: Colors.line, lineWidth: 2.5
            });
        }

        // Draw plotted points (on top of line)
        this.plotPoints.forEach(p => {
            GridUtils.drawPoint(this.ctx, this.cs, p.x, p.y, {
                color: Colors.line, radius: 6
            });
            GridUtils.drawCoordinateLabel(this.ctx, this.cs, p.x, p.y, {
                offset: { x: 10, y: -12 }, color: Colors.line
            });
        });
    }
};

// ============================================
// PAGE 4: Verification Interaction
// Student checks point (2, -1) against both equations
// ============================================
const Verification = {
    phase1Done: false,
    phase2Done: false,

    init() {
        const sumInput = document.getElementById('verify-sum');
        if (!sumInput) return;

        if (this._initialized) return;
        this._initialized = true;

        // Phase 1: x + y = 2 + (-1) = ?
        const checkSum = () => {
            if (this.phase1Done) return;

            const val = parseInt(sumInput.value, 10);
            const feedback = document.getElementById('verify-sum-feedback');

            if (isNaN(val)) {
                feedback.className = 'text-sm feedback feedback-incorrect';
                feedback.textContent = 'Enter a number.';
                feedback.classList.remove('hidden');
                return;
            }

            if (val === 1) {
                this.phase1Done = true;
                feedback.className = 'text-sm feedback feedback-correct';
                feedback.innerHTML = '2 + (\u22121) = 1 \u2713 &mdash; it passes!';
                feedback.classList.remove('hidden');
                sumInput.disabled = true;
                sumInput.classList.add('correct');

                // Enable phase 2
                setTimeout(() => {
                    const phase2 = document.getElementById('verify-phase2');
                    if (phase2) phase2.style.opacity = '1';
                    const diffInput = document.getElementById('verify-diff');
                    if (diffInput) diffInput.disabled = false;
                }, 400);
            } else {
                feedback.className = 'text-sm feedback feedback-incorrect';
                feedback.textContent = 'What is 2 + (\u22121)?';
                feedback.classList.remove('hidden');
            }
        };

        sumInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkSum(); });
        // No check button — just Enter key. But let's add a click to the box area too.
        // Actually, add a small blur handler for mobile.
        sumInput.addEventListener('change', checkSum);

        // Phase 2: y = 1 - x = 1 - 2 = ?
        const diffInput = document.getElementById('verify-diff');
        if (!diffInput) return;

        const checkDiff = () => {
            if (this.phase2Done) return;

            const val = parseInt(diffInput.value, 10);
            const feedback = document.getElementById('verify-diff-feedback');

            if (isNaN(val)) {
                feedback.className = 'text-sm feedback feedback-incorrect';
                feedback.textContent = 'Enter a number.';
                feedback.classList.remove('hidden');
                return;
            }

            if (val === -1) {
                this.phase2Done = true;
                feedback.className = 'text-sm feedback feedback-correct';
                feedback.innerHTML = '1 \u2212 2 = \u22121 \u2713 &mdash; same answer!';
                feedback.classList.remove('hidden');
                diffInput.disabled = true;
                diffInput.classList.add('correct');

                // Show conclusion
                setTimeout(() => {
                    const conclusion = document.getElementById('verify-conclusion');
                    if (conclusion) conclusion.classList.remove('hidden');
                }, 500);
            } else {
                feedback.className = 'text-sm feedback feedback-incorrect';
                feedback.textContent = 'What is 1 \u2212 2?';
                feedback.classList.remove('hidden');
            }
        };

        diffInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkDiff(); });
        diffInput.addEventListener('change', checkDiff);
    }
};
