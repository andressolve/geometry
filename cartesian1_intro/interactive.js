/**
 * Interactive Point Plotting for Lesson 10: The Cartesian Plane
 */

const Interactive = {
    canvas: null,
    ctx: null,
    coordSystem: null,

    // Challenge points to plot
    challenges: [
        { x: 2, y: 4 },
        { x: 5, y: 1 },
        { x: -3, y: 2 },
        { x: -2, y: -3 },
        { x: 0, y: 3 }
    ],

    currentChallenge: 0,
    isComplete: false,
    userClickedPoint: null,

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        this.canvas = document.getElementById('canvas-interactive');
        if (!this.canvas) return;

        this.ctx = setupCanvas(this.canvas, 500, 360);
        this.coordSystem = GridUtils.createCoordSystem(500, 360, {
            xMin: -6, xMax: 7, yMin: -5, yMax: 5
        });

        this.setupEventListeners();
        this.render();
        this.updateUI();
    },

    // ============================================
    // EVENT LISTENERS
    // ============================================
    setupEventListeners() {
        // Canvas click
        this.canvas.addEventListener('click', (e) => this.handleClick(e));

        // Canvas mouse move (for live coordinate display)
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        // Next button
        const nextBtn = document.getElementById('interactive-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextChallenge());
        }

        // Reset button
        const resetBtn = document.getElementById('interactive-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }
    },

    // ============================================
    // MOUSE HANDLING
    // ============================================
    getCanvasCoords(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / (window.devicePixelRatio || 1) / rect.width;
        const scaleY = this.canvas.height / (window.devicePixelRatio || 1) / rect.height;

        return {
            px: (e.clientX - rect.left) * scaleX,
            py: (e.clientY - rect.top) * scaleY
        };
    },

    handleMouseMove(e) {
        if (this.isComplete) return;

        const { px, py } = this.getCanvasCoords(e);
        const snapped = this.coordSystem.snapToGrid(px, py);

        // Update live coordinate display
        const display = document.getElementById('live-coords');
        if (display) {
            display.textContent = `(${snapped.x}, ${snapped.y})`;
        }

        // Redraw with hover indicator
        this.render(snapped);
    },

    handleClick(e) {
        if (this.isComplete) return;

        const { px, py } = this.getCanvasCoords(e);
        const snapped = this.coordSystem.snapToGrid(px, py);

        this.userClickedPoint = { x: snapped.x, y: snapped.y };
        this.checkAnswer();
    },

    // ============================================
    // GAME LOGIC
    // ============================================
    checkAnswer() {
        const target = this.challenges[this.currentChallenge];
        const user = this.userClickedPoint;

        const isCorrect = (user.x === target.x && user.y === target.y);

        // Update feedback
        const feedback = document.getElementById('interactive-feedback');
        if (feedback) {
            if (isCorrect) {
                feedback.textContent = 'Correct!';
                feedback.className = 'feedback feedback-correct';
            } else {
                feedback.textContent = `Not quite. You clicked (${user.x}, ${user.y}).`;
                feedback.className = 'feedback feedback-incorrect';
            }
            feedback.classList.remove('hidden');
        }

        // Show next button
        const nextBtn = document.getElementById('interactive-next');
        if (nextBtn && isCorrect) {
            nextBtn.classList.remove('hidden');
        }

        this.render();
    },

    nextChallenge() {
        this.currentChallenge++;
        this.userClickedPoint = null;

        // Hide feedback and next button
        const feedback = document.getElementById('interactive-feedback');
        if (feedback) feedback.classList.add('hidden');

        const nextBtn = document.getElementById('interactive-next');
        if (nextBtn) nextBtn.classList.add('hidden');

        if (this.currentChallenge >= this.challenges.length) {
            this.isComplete = true;
            this.showCompletion();
        } else {
            this.updateUI();
            this.render();
        }
    },

    reset() {
        this.currentChallenge = 0;
        this.userClickedPoint = null;
        this.isComplete = false;

        const feedback = document.getElementById('interactive-feedback');
        if (feedback) feedback.classList.add('hidden');

        const nextBtn = document.getElementById('interactive-next');
        if (nextBtn) nextBtn.classList.add('hidden');

        const completion = document.getElementById('interactive-complete');
        if (completion) completion.classList.add('hidden');

        this.updateUI();
        this.render();
    },

    showCompletion() {
        const completion = document.getElementById('interactive-complete');
        if (completion) {
            completion.classList.remove('hidden');
        }

        const targetDisplay = document.getElementById('target-coord');
        if (targetDisplay) {
            targetDisplay.textContent = 'Done!';
        }

        this.render();
    },

    updateUI() {
        const target = this.challenges[this.currentChallenge];
        const targetDisplay = document.getElementById('target-coord');
        if (targetDisplay) {
            targetDisplay.textContent = `(${target.x}, ${target.y})`;
        }

        const progress = document.getElementById('interactive-progress');
        if (progress) {
            progress.textContent = `${this.currentChallenge + 1} / ${this.challenges.length}`;
        }
    },

    // ============================================
    // RENDERING
    // ============================================
    render(hoverPoint = null) {
        clearCanvas(this.ctx, 500, 360);

        // Draw grid and axes
        GridUtils.drawGrid(this.ctx, this.coordSystem);
        GridUtils.drawAxes(this.ctx, this.coordSystem, { showLabels: true });
        GridUtils.drawAxisTicks(this.ctx, this.coordSystem);

        // If complete, show all points
        if (this.isComplete) {
            this.challenges.forEach((p, i) => {
                GridUtils.drawPoint(this.ctx, this.coordSystem, p.x, p.y, {
                    color: Colors.pointCorrect,
                    radius: 6
                });
                GridUtils.drawCoordinateLabel(this.ctx, this.coordSystem, p.x, p.y, {
                    offset: { x: 10, y: -10 }
                });
            });
            return;
        }

        // Draw target point (ghosted)
        const target = this.challenges[this.currentChallenge];
        if (!this.userClickedPoint) {
            // Show hover indicator
            if (hoverPoint) {
                const { px, py } = this.coordSystem.toPixel(hoverPoint.x, hoverPoint.y);

                // Crosshair
                this.ctx.save();
                this.ctx.strokeStyle = 'rgba(106, 130, 251, 0.5)';
                this.ctx.lineWidth = 1;
                this.ctx.setLineDash([4, 4]);

                this.ctx.beginPath();
                this.ctx.moveTo(px, 0);
                this.ctx.lineTo(px, 360);
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(0, py);
                this.ctx.lineTo(500, py);
                this.ctx.stroke();

                this.ctx.setLineDash([]);

                // Hover point
                this.ctx.beginPath();
                this.ctx.arc(px, py, 6, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(106, 130, 251, 0.3)';
                this.ctx.fill();
                this.ctx.strokeStyle = '#6a82fb';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();

                this.ctx.restore();
            }
        } else {
            // Show user's click
            const user = this.userClickedPoint;
            const isCorrect = (user.x === target.x && user.y === target.y);

            // User's point
            GridUtils.drawPoint(this.ctx, this.coordSystem, user.x, user.y, {
                color: isCorrect ? Colors.pointCorrect : Colors.pointIncorrect,
                radius: 7
            });

            // If incorrect, show correct location
            if (!isCorrect) {
                GridUtils.drawPoint(this.ctx, this.coordSystem, target.x, target.y, {
                    color: Colors.pointCorrect,
                    radius: 7
                });
                GridUtils.drawCoordinateLabel(this.ctx, this.coordSystem, target.x, target.y, {
                    offset: { x: 10, y: -10 },
                    color: Colors.pointCorrect
                });
            }
        }
    }
};
