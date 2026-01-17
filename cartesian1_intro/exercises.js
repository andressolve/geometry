/**
 * Exercise Logic for Lesson 10: The Cartesian Plane
 */

const Exercises = {
    // ============================================
    // EXERCISE 1: Read Coordinates
    // Given a point on the grid, enter its coordinates
    // ============================================
    ex1: {
        point: { x: 3, y: 5 },
        canvas: null,
        coordSystem: null,

        init() {
            this.canvas = document.getElementById('canvas-ex1');
            if (!this.canvas) return;

            const ctx = setupCanvas(this.canvas, 280, 200);
            this.coordSystem = GridUtils.createCoordSystem(280, 200, {
                xMin: -1, xMax: 6, yMin: -1, yMax: 7
            });

            GridUtils.drawGrid(ctx, this.coordSystem);
            GridUtils.drawAxes(ctx, this.coordSystem, { showLabels: false });
            GridUtils.drawAxisTicks(ctx, this.coordSystem);

            GridUtils.drawPoint(ctx, this.coordSystem, this.point.x, this.point.y, {
                color: Colors.point,
                radius: 6,
                label: 'P',
                labelOffset: { x: 12, y: -8 }
            });

            // Event listener
            const btn = document.getElementById('ex1-check');
            if (btn) {
                btn.addEventListener('click', () => this.check());
            }
        },

        check() {
            const xInput = document.getElementById('ex1-x');
            const yInput = document.getElementById('ex1-y');
            const feedback = document.getElementById('ex1-feedback');
            const btn = document.getElementById('ex1-check');

            if (!xInput || !yInput || !feedback) return;

            const userX = parseInt(xInput.value, 10);
            const userY = parseInt(yInput.value, 10);

            if (isNaN(userX) || isNaN(userY)) {
                feedback.textContent = 'Please enter both coordinates.';
                feedback.className = 'feedback';
                feedback.classList.remove('hidden');
                return;
            }

            const isCorrect = (userX === this.point.x && userY === this.point.y);

            if (isCorrect) {
                feedback.innerHTML = '<strong>Correct!</strong> P is at (3, 5).';
                feedback.className = 'feedback feedback-correct';
                btn.disabled = true;
                xInput.disabled = true;
                yInput.disabled = true;
            } else {
                feedback.innerHTML = `<strong>Not quite.</strong> Try again. Remember: x first (horizontal), then y (vertical).`;
                feedback.className = 'feedback feedback-incorrect';
            }
            feedback.classList.remove('hidden');
        }
    },

    // ============================================
    // EXERCISE 2: Read Coordinates (with negative)
    // ============================================
    ex2: {
        point: { x: -2, y: 4 },
        canvas: null,

        init() {
            this.canvas = document.getElementById('canvas-ex2');
            if (!this.canvas) return;

            const ctx = setupCanvas(this.canvas, 280, 200);
            const coordSystem = GridUtils.createCoordSystem(280, 200, {
                xMin: -5, xMax: 4, yMin: -1, yMax: 6
            });

            GridUtils.drawGrid(ctx, coordSystem);
            GridUtils.drawAxes(ctx, coordSystem, { showLabels: false });
            GridUtils.drawAxisTicks(ctx, coordSystem);

            GridUtils.drawPoint(ctx, coordSystem, this.point.x, this.point.y, {
                color: Colors.point,
                radius: 6,
                label: 'Q',
                labelOffset: { x: 12, y: -8 }
            });

            const btn = document.getElementById('ex2-check');
            if (btn) {
                btn.addEventListener('click', () => this.check());
            }
        },

        check() {
            const xInput = document.getElementById('ex2-x');
            const yInput = document.getElementById('ex2-y');
            const feedback = document.getElementById('ex2-feedback');
            const btn = document.getElementById('ex2-check');

            if (!xInput || !yInput || !feedback) return;

            const userX = parseInt(xInput.value, 10);
            const userY = parseInt(yInput.value, 10);

            if (isNaN(userX) || isNaN(userY)) {
                feedback.textContent = 'Please enter both coordinates.';
                feedback.className = 'feedback';
                feedback.classList.remove('hidden');
                return;
            }

            const isCorrect = (userX === this.point.x && userY === this.point.y);

            if (isCorrect) {
                feedback.innerHTML = '<strong>Correct!</strong> Q is at (-2, 4). The negative x means it\'s to the left of the origin.';
                feedback.className = 'feedback feedback-correct';
                btn.disabled = true;
                xInput.disabled = true;
                yInput.disabled = true;
            } else {
                feedback.innerHTML = `<strong>Not quite.</strong> Remember: negative x means left of the y-axis.`;
                feedback.className = 'feedback feedback-incorrect';
            }
            feedback.classList.remove('hidden');
        }
    },

    // ============================================
    // EXERCISE 3: Match the Points
    // ============================================
    ex3: {
        points: [
            { x: 2, y: 3, label: 'A' },
            { x: -1, y: 2, label: 'B' },
            { x: 3, y: -2, label: 'C' },
            { x: -2, y: -1, label: 'D' }
        ],
        coords: ['(2, 3)', '(-1, 2)', '(3, -2)', '(-2, -1)'],
        answers: { A: 0, B: 1, C: 2, D: 3 }, // Map label to coord index
        userAnswers: {},

        init() {
            const canvas = document.getElementById('canvas-ex3');
            if (!canvas) return;

            const ctx = setupCanvas(canvas, 280, 220);
            const coordSystem = GridUtils.createCoordSystem(280, 220, {
                xMin: -4, xMax: 5, yMin: -4, yMax: 5
            });

            GridUtils.drawGrid(ctx, coordSystem);
            GridUtils.drawAxes(ctx, coordSystem, { showLabels: false });
            GridUtils.drawAxisTicks(ctx, coordSystem);

            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

            this.points.forEach((p, i) => {
                GridUtils.drawPoint(ctx, coordSystem, p.x, p.y, {
                    color: colors[i],
                    radius: 6,
                    label: p.label,
                    labelOffset: { x: 10, y: -8 }
                });
            });

            // Set up selects
            const labels = ['A', 'B', 'C', 'D'];
            labels.forEach(label => {
                const select = document.getElementById(`ex3-${label}`);
                if (select) {
                    select.addEventListener('change', (e) => {
                        this.userAnswers[label] = parseInt(e.target.value, 10);
                    });
                }
            });

            const btn = document.getElementById('ex3-check');
            if (btn) {
                btn.addEventListener('click', () => this.check());
            }
        },

        check() {
            const feedback = document.getElementById('ex3-feedback');
            const btn = document.getElementById('ex3-check');
            if (!feedback) return;

            const labels = ['A', 'B', 'C', 'D'];
            let allCorrect = true;
            let allAnswered = true;

            labels.forEach(label => {
                const select = document.getElementById(`ex3-${label}`);
                if (!select || select.value === '') {
                    allAnswered = false;
                } else {
                    const userVal = parseInt(select.value, 10);
                    if (userVal !== this.answers[label]) {
                        allCorrect = false;
                    }
                }
            });

            if (!allAnswered) {
                feedback.textContent = 'Please match all points before checking.';
                feedback.className = 'feedback';
                feedback.classList.remove('hidden');
                return;
            }

            if (allCorrect) {
                feedback.innerHTML = '<strong>Correct!</strong> All points matched.';
                feedback.className = 'feedback feedback-correct';
                btn.disabled = true;
                labels.forEach(label => {
                    const select = document.getElementById(`ex3-${label}`);
                    if (select) select.disabled = true;
                });
            } else {
                feedback.innerHTML = '<strong>Not quite.</strong> Some matches are incorrect. Try again.';
                feedback.className = 'feedback feedback-incorrect';
            }
            feedback.classList.remove('hidden');
        }
    },

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        this.ex1.init();
        this.ex2.init();
        this.ex3.init();
    }
};
