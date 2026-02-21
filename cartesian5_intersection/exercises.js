/**
 * Exercise Logic for Lesson 15: Where Lines Meet
 *
 * Exercise 1: Read the Intersection (coordinate input)
 * Exercise 2: Check the Point (Yes/No + follow-up)
 * Exercise 3: Tables (fill table + identify intersection + graph)
 * Exercise 4: Parallel or Crossing? (3 pairs with follow-ups)
 */

const Exercises = {

    // ============================================
    // Exercise 1: Read the Intersection
    // y = 2x + 1 (blue) and y = x + 3 (green), crossing at (2, 5)
    // ============================================
    initEx1() {
        const canvas = document.getElementById('canvas-ex1');
        if (canvas) Diagrams.drawEx1(canvas);

        const checkBtn = document.getElementById('ex1-check');
        if (!checkBtn) return;

        let done = false;

        const check = () => {
            if (done) return;

            const xInput = document.getElementById('ex1-x');
            const yInput = document.getElementById('ex1-y');
            const feedback = document.getElementById('ex1-feedback');

            const xVal = parseInt(xInput.value, 10);
            const yVal = parseInt(yInput.value, 10);

            if (isNaN(xVal) || isNaN(yVal)) {
                feedback.className = 'feedback feedback-incorrect';
                feedback.textContent = 'Enter both coordinates.';
                feedback.classList.remove('hidden');
                return;
            }

            if (xVal === 2 && yVal === 5) {
                done = true;
                feedback.className = 'feedback feedback-correct';
                feedback.innerHTML = '<strong>(2, 5).</strong> Check: 2(2) + 1 = 5 \u2713 and 2 + 3 = 5 \u2713';
                feedback.classList.remove('hidden');
                xInput.disabled = true;
                yInput.disabled = true;
                checkBtn.disabled = true;
            } else {
                feedback.className = 'feedback feedback-incorrect';
                feedback.innerHTML = 'Not quite. Look at where the two lines cross on the grid.';
                feedback.classList.remove('hidden');
            }
        };

        checkBtn.addEventListener('click', check);
        document.getElementById('ex1-x').addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
        document.getElementById('ex1-y').addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
    },

    // ============================================
    // Exercise 2: Check the Point
    // y = 3x and y = 2x + 2. Someone says (3, 9).
    // Part A: Is (3,9) on y=3x? → Yes (3×3=9 ✓)
    // Part B: Is (3,9) on y=2x+2? → No (2×3+2=8 ≠ 9)
    // Follow-up: verify (2, 6)
    // ============================================
    initEx2() {
        let partADone = false;
        let partBDone = false;

        // Part A: Is (3,9) on y = 3x?
        const handleA = (answer) => {
            if (partADone) return;

            const feedback = document.getElementById('ex2a-feedback');
            if (answer === 'yes') {
                partADone = true;
                feedback.className = 'feedback feedback-correct';
                feedback.innerHTML = '<strong>Yes.</strong> 3 \u00d7 3 = 9 \u2713';
                feedback.classList.remove('hidden');
                document.getElementById('ex2a-yes').disabled = true;
                document.getElementById('ex2a-no').disabled = true;
                this.checkEx2Complete(partADone, partBDone);
            } else {
                feedback.className = 'feedback feedback-incorrect';
                feedback.innerHTML = 'Substitute x = 3: y = 3 \u00d7 3 = ?';
                feedback.classList.remove('hidden');
            }
        };

        document.getElementById('ex2a-yes').addEventListener('click', () => handleA('yes'));
        document.getElementById('ex2a-no').addEventListener('click', () => handleA('no'));

        // Part B: Is (3,9) on y = 2x + 2?
        const handleB = (answer) => {
            if (partBDone) return;

            const feedback = document.getElementById('ex2b-feedback');
            if (answer === 'no') {
                partBDone = true;
                feedback.className = 'feedback feedback-correct';
                feedback.innerHTML = '<strong>No.</strong> 2 \u00d7 3 + 2 = 8, not 9.';
                feedback.classList.remove('hidden');
                document.getElementById('ex2b-yes').disabled = true;
                document.getElementById('ex2b-no').disabled = true;
                this.checkEx2Complete(partADone, partBDone);
            } else {
                feedback.className = 'feedback feedback-incorrect';
                feedback.innerHTML = 'Substitute x = 3: y = 2 \u00d7 3 + 2 = ?';
                feedback.classList.remove('hidden');
            }
        };

        document.getElementById('ex2b-yes').addEventListener('click', () => handleB('yes'));
        document.getElementById('ex2b-no').addEventListener('click', () => handleB('no'));

        // Follow-up: verify (2, 6)
        let followupDone = false;

        const checkFollowup = () => {
            if (followupDone) return;

            const y1Input = document.getElementById('ex2c-y1');
            const y2Input = document.getElementById('ex2c-y2');
            const feedback = document.getElementById('ex2c-feedback');

            const y1 = parseInt(y1Input.value, 10);
            const y2 = parseInt(y2Input.value, 10);

            if (isNaN(y1) || isNaN(y2)) {
                feedback.className = 'feedback feedback-incorrect';
                feedback.textContent = 'Enter both values.';
                feedback.classList.remove('hidden');
                return;
            }

            if (y1 === 6 && y2 === 6) {
                followupDone = true;
                feedback.className = 'feedback feedback-correct';
                feedback.innerHTML = '<strong>Both give 6.</strong> So (2, 6) is on both lines \u2014 that\'s the real intersection.';
                feedback.classList.remove('hidden');
                y1Input.disabled = true;
                y2Input.disabled = true;
                document.getElementById('ex2c-check').disabled = true;
            } else {
                feedback.className = 'feedback feedback-incorrect';
                if (y1 !== 6) {
                    feedback.innerHTML = 'For y = 3x with x = 2: y = 3 \u00d7 2 = ?';
                } else {
                    feedback.innerHTML = 'For y = 2x + 2 with x = 2: y = 2 \u00d7 2 + 2 = ?';
                }
                feedback.classList.remove('hidden');
            }
        };

        const ex2cCheck = document.getElementById('ex2c-check');
        if (ex2cCheck) {
            ex2cCheck.addEventListener('click', checkFollowup);
        }
        const ex2cY1 = document.getElementById('ex2c-y1');
        const ex2cY2 = document.getElementById('ex2c-y2');
        if (ex2cY1) ex2cY1.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkFollowup(); });
        if (ex2cY2) ex2cY2.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkFollowup(); });
    },

    checkEx2Complete(aDone, bDone) {
        if (aDone && bDone) {
            setTimeout(() => {
                const conclusion = document.getElementById('ex2-conclusion');
                if (conclusion) conclusion.classList.remove('hidden');
            }, 600);
        }
    },

    // ============================================
    // Exercise 3: Tables
    // y = 2x and y = x + 3, combined table, intersection at (3, 6)
    // ============================================
    initEx3() {
        const checkBtn = document.getElementById('ex3-table-check');
        if (!checkBtn) return;

        let tableDone = false;
        let pointDone = false;

        // Check table
        checkBtn.addEventListener('click', () => {
            if (tableDone) return;

            const ids = ['ex3-a0', 'ex3-b0', 'ex3-a1', 'ex3-b1', 'ex3-a2', 'ex3-b2', 'ex3-a3', 'ex3-b3', 'ex3-a4', 'ex3-b4'];
            let allCorrect = true;

            ids.forEach(id => {
                const input = document.getElementById(id);
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

            const feedback = document.getElementById('ex3-table-feedback');
            if (allCorrect) {
                tableDone = true;
                ids.forEach(id => document.getElementById(id).disabled = true);
                checkBtn.disabled = true;
                feedback.className = 'text-sm feedback feedback-correct';
                feedback.textContent = 'All correct!';
                feedback.classList.remove('hidden');

                setTimeout(() => {
                    document.getElementById('ex3-followup').classList.remove('hidden');
                }, 600);
            } else {
                feedback.className = 'text-sm feedback feedback-incorrect';
                feedback.textContent = 'Some values need fixing. Check your arithmetic.';
                feedback.classList.remove('hidden');
            }
        });

        // Check intersection point
        const pointCheckBtn = document.getElementById('ex3-point-check');
        if (pointCheckBtn) {
            const checkPoint = () => {
                if (pointDone) return;

                const xInput = document.getElementById('ex3-ix');
                const yInput = document.getElementById('ex3-iy');
                const feedback = document.getElementById('ex3-point-feedback');

                const xVal = parseInt(xInput.value, 10);
                const yVal = parseInt(yInput.value, 10);

                if (isNaN(xVal) || isNaN(yVal)) {
                    feedback.className = 'feedback feedback-incorrect';
                    feedback.textContent = 'Enter both coordinates.';
                    feedback.classList.remove('hidden');
                    return;
                }

                if (xVal === 3 && yVal === 6) {
                    pointDone = true;
                    feedback.className = 'feedback feedback-correct';
                    feedback.innerHTML = '<strong>(3, 6).</strong> Both lines give y = 6 when x = 3.';
                    feedback.classList.remove('hidden');
                    xInput.disabled = true;
                    yInput.disabled = true;
                    pointCheckBtn.disabled = true;

                    // Show canvas
                    setTimeout(() => {
                        const wrap = document.getElementById('ex3-canvas-wrap');
                        if (wrap) {
                            wrap.classList.remove('hidden');
                            const canvas = document.getElementById('canvas-ex3');
                            if (canvas) Diagrams.drawEx3(canvas);
                        }
                    }, 400);
                } else {
                    feedback.className = 'feedback feedback-incorrect';
                    feedback.innerHTML = 'Look at the table. At which x do both y columns show the same value?';
                    feedback.classList.remove('hidden');
                }
            };

            pointCheckBtn.addEventListener('click', checkPoint);
            const ex3Ix = document.getElementById('ex3-ix');
            const ex3Iy = document.getElementById('ex3-iy');
            if (ex3Ix) ex3Ix.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkPoint(); });
            if (ex3Iy) ex3Iy.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkPoint(); });
        }
    },

    // ============================================
    // Exercise 4: Parallel or Crossing?
    // Pair A: y = 2x and y = 2x + 3 → Parallel
    // Pair B: y = 3x and y = x + 4 → Crossing → (2, 6)
    // Pair C: y = x and y = 2x → Crossing → (0, 0)
    // ============================================
    initEx4() {
        // Pair A: parallel
        this.initEx4Pair('a', 'par', null);

        // Pair B: crossing at (2, 6)
        this.initEx4Pair('b', 'cross', { x: 2, y: 6 });

        // Pair C: crossing at (0, 0)
        this.initEx4Pair('c', 'cross', { x: 0, y: 0 });
    },

    initEx4Pair(id, correctAnswer, intersection) {
        const parBtn = document.getElementById(`ex4${id}-par`);
        const crossBtn = document.getElementById(`ex4${id}-cross`);
        const feedback = document.getElementById(`ex4${id}-feedback`);
        if (!parBtn || !crossBtn || !feedback) return;

        let done = false;

        const handle = (answer) => {
            if (done) return;

            if (answer === correctAnswer) {
                done = true;
                if (answer === 'par') {
                    feedback.textContent = 'Parallel \u2014 same slope.';
                    feedback.style.color = '#065f46';
                } else {
                    feedback.textContent = 'Crossing \u2014 different slopes.';
                    feedback.style.color = '#065f46';
                }
                feedback.classList.remove('hidden');
                parBtn.disabled = true;
                crossBtn.disabled = true;

                // Show follow-up for crossing pairs
                if (answer === 'cross' && intersection) {
                    setTimeout(() => {
                        const followup = document.getElementById(`ex4${id}-followup`);
                        if (followup) followup.classList.remove('hidden');
                    }, 400);
                }
            } else {
                feedback.textContent = 'Look at the slopes again.';
                feedback.style.color = '#991b1b';
                feedback.classList.remove('hidden');
            }
        };

        parBtn.addEventListener('click', () => handle('par'));
        crossBtn.addEventListener('click', () => handle('cross'));

        // Follow-up coordinate check for crossing pairs
        if (intersection) {
            const coordCheck = document.getElementById(`ex4${id}-check`);
            if (!coordCheck) return;

            let coordDone = false;

            const checkCoord = () => {
                if (coordDone) return;

                const xInput = document.getElementById(`ex4${id}-x`);
                const yInput = document.getElementById(`ex4${id}-y`);
                const coordFeedback = document.getElementById(`ex4${id}-coord-feedback`);

                const xVal = parseInt(xInput.value, 10);
                const yVal = parseInt(yInput.value, 10);

                if (isNaN(xVal) || isNaN(yVal)) {
                    coordFeedback.className = 'text-sm feedback feedback-incorrect';
                    coordFeedback.textContent = 'Enter both coordinates.';
                    coordFeedback.classList.remove('hidden');
                    return;
                }

                if (xVal === intersection.x && yVal === intersection.y) {
                    coordDone = true;
                    coordFeedback.className = 'text-sm feedback feedback-correct';
                    coordFeedback.innerHTML = `<strong>(${intersection.x}, ${intersection.y}).</strong> Both equations give the same y at that x.`;
                    coordFeedback.classList.remove('hidden');
                    xInput.disabled = true;
                    yInput.disabled = true;
                    coordCheck.disabled = true;
                } else {
                    coordFeedback.className = 'text-sm feedback feedback-incorrect';
                    coordFeedback.innerHTML = 'Not quite. Try substituting values into both equations.';
                    coordFeedback.classList.remove('hidden');
                }
            };

            coordCheck.addEventListener('click', checkCoord);
            const xIn = document.getElementById(`ex4${id}-x`);
            const yIn = document.getElementById(`ex4${id}-y`);
            if (xIn) xIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkCoord(); });
            if (yIn) yIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkCoord(); });
        }
    },

    init() {
        this.initEx1();
        this.initEx2();
        this.initEx3();
        this.initEx4();
    }
};
