/**
 * Interactive Elements for Lesson 15: Where Lines Meet
 *
 * Page 2: ClickToFind — click on the grid to find the intersection
 * Page 4: TableFill — fill tables, spot the match, confirm on graph
 */

// ============================================
// PAGE 2: Click-to-Find Interaction
// Two lines: y = 2x and y = x + 2, intersection at (2, 4)
// ============================================
const ClickToFind = {
    canvas: null,
    ctx: null,
    cs: null,
    W: 440,
    H: 400,
    range: { xMin: -1, xMax: 5, yMin: -1, yMax: 10 },
    targetX: 2,
    targetY: 4,
    found: false,
    missPoint: null,
    missTimer: null,

    init() {
        this.canvas = document.getElementById('canvas-find');
        if (!this.canvas) return;

        this.ctx = setupCanvas(this.canvas, this.W, this.H);
        this.cs = GridUtils.createCoordSystem(this.W, this.H, this.range);

        if (!this._initialized) {
            this.found = false;
            this.missPoint = null;

            // Mouse move: show coordinate readout
            this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
            this.canvas.addEventListener('mouseleave', () => this.onMouseLeave());

            // Click: check for intersection
            this.canvas.addEventListener('click', (e) => this.onClick(e));

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

        const readout = document.getElementById('find-coord-readout');
        if (readout && snapped.x >= xMin && snapped.x <= xMax && snapped.y >= yMin && snapped.y <= yMax) {
            readout.textContent = `(${snapped.x}, ${snapped.y})`;
        }
    },

    onMouseLeave() {
        const readout = document.getElementById('find-coord-readout');
        if (readout) readout.textContent = '';
    },

    onClick(e) {
        if (this.found) return;

        const { px, py } = this.getCanvasCoords(e);
        const snapped = this.cs.snapToGrid(px, py);

        if (snapped.x === this.targetX && snapped.y === this.targetY) {
            // Correct!
            this.found = true;
            this.missPoint = null;
            this.draw();

            // Hide readout, show reveal
            const readout = document.getElementById('find-coord-readout');
            if (readout) readout.textContent = '';

            const feedback = document.getElementById('find-feedback');
            if (feedback) feedback.classList.add('hidden');

            const reveal = document.getElementById('find-reveal');
            if (reveal) reveal.classList.remove('hidden');

            // Remove crosshair cursor
            this.canvas.classList.remove('diagram-clickable');
        } else {
            // Miss — show clicked point briefly
            this.missPoint = { x: snapped.x, y: snapped.y };
            this.draw();

            // Show hint if far off
            const dist = Math.abs(snapped.x - this.targetX) + Math.abs(snapped.y - this.targetY);
            const feedback = document.getElementById('find-feedback');
            if (feedback) {
                if (dist > 3) {
                    feedback.className = 'feedback feedback-incorrect max-w-md text-center';
                    feedback.innerHTML = 'Look at where the two lines cross.';
                } else {
                    feedback.className = 'feedback feedback-incorrect max-w-md text-center';
                    feedback.innerHTML = 'Close — try again.';
                }
                feedback.classList.remove('hidden');
            }

            // Clear miss point after a moment
            if (this.missTimer) clearTimeout(this.missTimer);
            this.missTimer = setTimeout(() => {
                this.missPoint = null;
                this.draw();
            }, 800);
        }
    },

    draw() {
        clearCanvas(this.ctx, this.W, this.H);
        GridUtils.drawGrid(this.ctx, this.cs);
        GridUtils.drawAxes(this.ctx, this.cs, { showLabels: true });
        GridUtils.drawAxisTicks(this.ctx, this.cs);

        // y = 2x (blue)
        GridUtils.drawLine(this.ctx, this.cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = x + 2 (green)
        GridUtils.drawLine(this.ctx, this.cs, x => x + 2, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Equation labels
        Diagrams.drawEquationLabel(this.ctx, this.cs, 'y = 2x', 3.2, 7, Colors.line);
        Diagrams.drawEquationLabel(this.ctx, this.cs, 'y = x + 2', 3.2, 5.5, Colors.lineGreen);

        // Miss point (red, temporary)
        if (this.missPoint) {
            GridUtils.drawPoint(this.ctx, this.cs, this.missPoint.x, this.missPoint.y, {
                color: '#ef4444', radius: 6
            });
        }

        // Found: highlight intersection
        if (this.found) {
            Diagrams.drawIntersectionPoint(this.ctx, this.cs, this.targetX, this.targetY);
            GridUtils.drawCoordinateLabel(this.ctx, this.cs, this.targetX, this.targetY, {
                offset: { x: 12, y: -14 }, color: '#f97316'
            });
        }
    }
};

// ============================================
// PAGE 4: Table Fill + Match + Confirm Graph
// y = 3x and y = x + 4, intersection at (2, 6)
// ============================================
const TableFill = {
    table1Done: false,
    table2Done: false,
    matchDone: false,

    init() {
        this.initTable1();
        this.initTable2();
        this.initMatch();
    },

    // Phase 1: Table 1 (y = 3x)
    initTable1() {
        const checkBtn = document.getElementById('table1-check');
        if (!checkBtn) return;

        checkBtn.addEventListener('click', () => {
            if (this.table1Done) return;

            const inputs = [
                document.getElementById('t1-y0'),
                document.getElementById('t1-y1'),
                document.getElementById('t1-y2'),
                document.getElementById('t1-y3')
            ];

            let allCorrect = true;
            inputs.forEach(input => {
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
            });

            const feedback = document.getElementById('table1-feedback');
            if (allCorrect) {
                this.table1Done = true;
                inputs.forEach(input => input.disabled = true);
                checkBtn.disabled = true;
                feedback.className = 'text-sm feedback feedback-correct';
                feedback.textContent = 'All correct!';
                feedback.classList.remove('hidden');
                this.checkBothTables();
            } else {
                feedback.className = 'text-sm feedback feedback-incorrect';
                feedback.textContent = 'Some values are off. Remember: y = 3x means multiply x by 3.';
                feedback.classList.remove('hidden');
            }
        });
    },

    // Phase 1: Table 2 (y = x + 4)
    initTable2() {
        const checkBtn = document.getElementById('table2-check');
        if (!checkBtn) return;

        checkBtn.addEventListener('click', () => {
            if (this.table2Done) return;

            const inputs = [
                document.getElementById('t2-y0'),
                document.getElementById('t2-y1'),
                document.getElementById('t2-y2'),
                document.getElementById('t2-y3')
            ];

            let allCorrect = true;
            inputs.forEach(input => {
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
            });

            const feedback = document.getElementById('table2-feedback');
            if (allCorrect) {
                this.table2Done = true;
                inputs.forEach(input => input.disabled = true);
                checkBtn.disabled = true;
                feedback.className = 'text-sm feedback feedback-correct';
                feedback.textContent = 'All correct!';
                feedback.classList.remove('hidden');
                this.checkBothTables();
            } else {
                feedback.className = 'text-sm feedback feedback-incorrect';
                feedback.textContent = 'Some values are off. Remember: y = x + 4 means add 4 to x.';
                feedback.classList.remove('hidden');
            }
        });
    },

    checkBothTables() {
        if (this.table1Done && this.table2Done) {
            setTimeout(() => {
                const phase2 = document.getElementById('table-phase2');
                if (phase2) phase2.classList.remove('hidden');

                // Scroll into view
                phase2.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 600);
        }
    },

    // Phase 2: Spot the Match
    initMatch() {
        const tables = ['match-table1', 'match-table2'];

        tables.forEach(tableId => {
            const table = document.getElementById(tableId);
            if (!table) return;

            const rows = table.querySelectorAll('.clickable-row');
            rows.forEach(row => {
                row.addEventListener('click', () => {
                    if (this.matchDone) return;

                    const clickedX = parseInt(row.dataset.x, 10);

                    if (clickedX === 2) {
                        // Correct match
                        this.matchDone = true;
                        this.highlightMatchingRows(2);

                        const feedback = document.getElementById('match-feedback');
                        if (feedback) {
                            feedback.className = 'feedback feedback-correct text-center mt-4';
                            feedback.innerHTML = 'When <em>x</em> = 2, both equations give <em>y</em> = 6.';
                            feedback.classList.remove('hidden');
                        }

                        // Reveal phase 3
                        setTimeout(() => {
                            const phase3 = document.getElementById('table-phase3');
                            if (phase3) {
                                phase3.classList.remove('hidden');

                                // Draw the confirm graph
                                const confirmCanvas = document.getElementById('canvas-confirm');
                                if (confirmCanvas) {
                                    Diagrams.drawConfirmGraph(confirmCanvas);
                                }

                                phase3.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }, 800);
                    } else {
                        // Wrong row
                        const feedback = document.getElementById('match-feedback');
                        if (feedback) {
                            feedback.className = 'feedback feedback-incorrect text-center mt-4';
                            feedback.innerHTML = 'At <em>x</em> = ' + clickedX + ', the two y-values are different. Look for the row where they match.';
                            feedback.classList.remove('hidden');
                        }
                    }
                });
            });
        });
    },

    highlightMatchingRows(targetX) {
        ['match-table1', 'match-table2'].forEach(tableId => {
            const table = document.getElementById(tableId);
            if (!table) return;

            const rows = table.querySelectorAll('.clickable-row');
            rows.forEach(row => {
                if (parseInt(row.dataset.x, 10) === targetX) {
                    row.classList.add('matched');
                }
                row.style.cursor = 'default';
            });
        });
    }
};
