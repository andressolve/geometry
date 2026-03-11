/**
 * Exercise Logic for Lesson 17: Two Lines, One Point
 *
 * Ex1: y = x + 4 and y = 2x + 1 → (3, 7)
 * Ex2: y = 3x and y = x + 6 → (3, 9)
 * Ex3: y = 2x + 3 and y = 4x − 1 → (2, 7)
 * Ex4: y = 3x and x + y = 8 → rewrite first, then (2, 6)
 */

const Exercises = {

    // Generic exercise checker: enter (x, y), check, reveal graph
    initSimpleExercise(id, answerX, answerY, drawFn, hint) {
        const checkBtn = document.getElementById(`${id}-check`);
        if (!checkBtn) return;

        let done = false;

        const doCheck = () => {
            if (done) return;
            const xVal = parseInt(document.getElementById(`${id}-x`).value, 10);
            const yVal = parseInt(document.getElementById(`${id}-y`).value, 10);
            const feedback = document.getElementById(`${id}-feedback`);

            if (xVal === answerX && yVal === answerY) {
                done = true;
                document.getElementById(`${id}-x`).disabled = true;
                document.getElementById(`${id}-y`).disabled = true;
                document.getElementById(`${id}-x`).classList.add('correct');
                document.getElementById(`${id}-y`).classList.add('correct');
                checkBtn.disabled = true;

                feedback.className = 'text-sm feedback feedback-correct';
                feedback.textContent = `(${answerX}, ${answerY}) \u2014 correct!`;
                feedback.classList.remove('hidden');

                // Reveal canvas
                setTimeout(() => {
                    const canvas = document.getElementById(`canvas-${id}`);
                    if (canvas) {
                        drawFn(canvas);
                        canvas.classList.add('canvas-visible');
                    }
                }, 500);
            } else {
                feedback.className = 'text-sm feedback feedback-incorrect';
                feedback.innerHTML = hint;
                feedback.classList.remove('hidden');
            }
        };

        checkBtn.addEventListener('click', doCheck);

        // Allow Enter key on inputs
        const xInput = document.getElementById(`${id}-x`);
        const yInput = document.getElementById(`${id}-y`);
        if (xInput) xInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck(); });
        if (yInput) yInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck(); });
    },

    // ============================================
    // Ex1: y = x + 4 and y = 2x + 1 → (3, 7)
    // ============================================
    initEx1() {
        this.initSimpleExercise('ex1', 3, 7,
            (c) => Diagrams.drawEx1(c),
            'Set <em>x</em> + 4 = 2<em>x</em> + 1 and solve for <em>x</em>.'
        );
    },

    // ============================================
    // Ex2: y = 3x and y = x + 6 → (3, 9)
    // ============================================
    initEx2() {
        this.initSimpleExercise('ex2', 3, 9,
            (c) => Diagrams.drawEx2(c),
            'Set 3<em>x</em> = <em>x</em> + 6 and solve for <em>x</em>.'
        );
    },

    // ============================================
    // Ex3: y = 2x + 3 and y = 4x − 1 → (2, 7)
    // ============================================
    initEx3() {
        this.initSimpleExercise('ex3', 2, 7,
            (c) => Diagrams.drawEx3(c),
            'Set 2<em>x</em> + 3 = 4<em>x</em> &minus; 1 and solve for <em>x</em>.'
        );
    },

    // ============================================
    // Ex4: y = 3x and x + y = 8 → rewrite, then (2, 6)
    // Callback to Lesson XVI: must rewrite x + y = 8 as y = 8 − x
    // ============================================
    initEx4() {
        let rewriteDone = false;
        let solveDone = false;

        // Rewrite check
        const rewriteCheck = document.getElementById('ex4-rewrite-check');
        const rewriteInput = document.getElementById('ex4-rewrite');
        if (rewriteCheck && rewriteInput) {
            const doRewrite = () => {
                if (rewriteDone) return;
                const val = parseInt(rewriteInput.value, 10);
                const feedback = document.getElementById('ex4-rewrite-feedback');

                if (val === 8) {
                    rewriteDone = true;
                    rewriteInput.disabled = true;
                    rewriteInput.classList.add('correct');
                    rewriteCheck.disabled = true;
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#065f46';
                        feedback.textContent = 'y = 8 \u2212 x \u2713';
                        feedback.classList.remove('hidden');
                    }

                    // Show solve section
                    setTimeout(() => {
                        const solveRow = document.getElementById('ex4-solve-row');
                        if (solveRow) solveRow.classList.remove('hidden');
                    }, 500);
                } else {
                    if (feedback) {
                        feedback.className = 'text-sm';
                        feedback.style.color = '#991b1b';
                        feedback.textContent = 'Subtract x from both sides of x + y = 8.';
                        feedback.classList.remove('hidden');
                    }
                }
            };
            rewriteCheck.addEventListener('click', doRewrite);
            rewriteInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doRewrite(); });
        }

        // Solve check
        const solveCheck = document.getElementById('ex4-check');
        if (solveCheck) {
            const doSolve = () => {
                if (solveDone) return;
                const xVal = parseInt(document.getElementById('ex4-x').value, 10);
                const yVal = parseInt(document.getElementById('ex4-y').value, 10);
                const feedback = document.getElementById('ex4-feedback');

                if (xVal === 2 && yVal === 6) {
                    solveDone = true;
                    document.getElementById('ex4-x').disabled = true;
                    document.getElementById('ex4-y').disabled = true;
                    document.getElementById('ex4-x').classList.add('correct');
                    document.getElementById('ex4-y').classList.add('correct');
                    solveCheck.disabled = true;

                    feedback.className = 'text-sm feedback feedback-correct';
                    feedback.textContent = '(2, 6) \u2014 correct!';
                    feedback.classList.remove('hidden');

                    // Reveal canvas
                    setTimeout(() => {
                        const canvas = document.getElementById('canvas-ex4');
                        if (canvas) {
                            Diagrams.drawEx4(canvas);
                            canvas.classList.add('canvas-visible');
                        }
                    }, 500);
                } else {
                    feedback.className = 'text-sm feedback feedback-incorrect';
                    feedback.innerHTML = 'Set 3<em>x</em> = 8 &minus; <em>x</em> and solve for <em>x</em>.';
                    feedback.classList.remove('hidden');
                }
            };
            solveCheck.addEventListener('click', doSolve);

            const ex4x = document.getElementById('ex4-x');
            const ex4y = document.getElementById('ex4-y');
            if (ex4x) ex4x.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSolve(); });
            if (ex4y) ex4y.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSolve(); });
        }
    },

    init() {
        this.initEx1();
        this.initEx2();
        this.initEx3();
        this.initEx4();
    }
};
