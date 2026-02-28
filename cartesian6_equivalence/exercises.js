/**
 * Exercise Logic for Lesson 16: x + y = 1
 *
 * Exercise 1: Test the Points (x + y = 4, Yes/No for 4 points)
 * Exercise 2: Find the Line (x + y = 5, table + slope + rewrite)
 * Exercise 3: Same Line or Different Line? (3 pairs, with a trap)
 * Exercise 4: The Other Direction (y = 7 - x → slope, then x + y = ?)
 */

const Exercises = {

    // ============================================
    // Exercise 1: Test the Points
    // x + y = 4. Four points: (1,3)→Yes, (2,1)→No, (0,4)→Yes, (3,2)→No
    // ============================================
    initEx1() {
        const pairs = [
            { id: 'a', x: 1, y: 3, pass: true,  sum: '1 + 3 = 4 \u2713' },
            { id: 'b', x: 2, y: 1, pass: false, sum: '2 + 1 = 3 \u2014 not 4. \u2717' },
            { id: 'c', x: 0, y: 4, pass: true,  sum: '0 + 4 = 4 \u2713' },
            { id: 'd', x: 3, y: 2, pass: false, sum: '3 + 2 = 5 \u2014 not 4. \u2717' }
        ];

        let correctCount = 0;

        pairs.forEach(p => {
            let done = false;

            const handle = (userSaidYes) => {
                if (done) return;

                const correct = (userSaidYes === p.pass);
                const feedback = document.getElementById(`ex1${p.id}-feedback`);
                const yesBtn = document.getElementById(`ex1${p.id}-yes`);
                const noBtn = document.getElementById(`ex1${p.id}-no`);

                if (correct) {
                    done = true;
                    correctCount++;
                    feedback.textContent = p.sum;
                    feedback.style.color = p.pass ? '#065f46' : '#991b1b';
                    feedback.classList.remove('hidden');
                    yesBtn.disabled = true;
                    noBtn.disabled = true;

                    if (userSaidYes) yesBtn.classList.add('selected-correct');
                    else noBtn.classList.add('selected-correct');

                    if (correctCount === pairs.length) {
                        setTimeout(() => {
                            const conclusion = document.getElementById('ex1-conclusion');
                            if (conclusion) conclusion.classList.remove('hidden');
                        }, 400);
                    }
                } else {
                    feedback.textContent = `Try: ${p.x} + ${p.y} = ?`;
                    feedback.style.color = '#991b1b';
                    feedback.classList.remove('hidden');
                }
            };

            const yesBtn = document.getElementById(`ex1${p.id}-yes`);
            const noBtn = document.getElementById(`ex1${p.id}-no`);
            if (yesBtn) yesBtn.addEventListener('click', () => handle(true));
            if (noBtn) noBtn.addEventListener('click', () => handle(false));
        });
    },

    // ============================================
    // Exercise 2: Find the Line
    // x + y = 5. Table (x=0..5), then slope, then rewrite
    // ============================================
    initEx2() {
        const ids = ['ex2-y0', 'ex2-y1', 'ex2-y2', 'ex2-y3', 'ex2-y4', 'ex2-y5'];
        let tableDone = false;
        let slopeDone = false;
        let rewriteDone = false;

        // Table check
        const tableCheck = document.getElementById('ex2-table-check');
        if (tableCheck) {
            tableCheck.addEventListener('click', () => {
                if (tableDone) return;

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

                const feedback = document.getElementById('ex2-table-feedback');
                if (allCorrect) {
                    tableDone = true;
                    ids.forEach(id => document.getElementById(id).disabled = true);
                    tableCheck.disabled = true;
                    feedback.className = 'text-sm feedback feedback-correct';
                    feedback.textContent = 'All correct!';
                    feedback.classList.remove('hidden');

                    // Show canvas and slope question
                    setTimeout(() => {
                        const canvas = document.getElementById('canvas-ex2');
                        if (canvas) {
                            canvas.classList.remove('hidden');
                            Diagrams.drawEx2(canvas);
                        }
                        const followup = document.getElementById('ex2-followup1');
                        if (followup) followup.classList.remove('hidden');
                    }, 600);
                } else {
                    feedback.className = 'text-sm feedback feedback-incorrect';
                    feedback.textContent = 'Some values are off. Remember: x + y must equal 5.';
                    feedback.classList.remove('hidden');
                }
            });
        }

        // Slope check
        const slopeCheck = document.getElementById('ex2-slope-check');
        if (slopeCheck) {
            const doSlopeCheck = () => {
                if (slopeDone) return;
                const input = document.getElementById('ex2-slope');
                const feedback = document.getElementById('ex2-slope-feedback');
                const val = parseInt(input.value, 10);

                if (val === -1) {
                    slopeDone = true;
                    feedback.className = 'feedback feedback-correct';
                    feedback.innerHTML = 'Right 1, down 1. Slope \u22121 \u2014 same as <em>x</em> + <em>y</em> = 1.';
                    feedback.classList.remove('hidden');
                    input.disabled = true;
                    slopeCheck.disabled = true;

                    setTimeout(() => {
                        const followup = document.getElementById('ex2-followup2');
                        if (followup) followup.classList.remove('hidden');
                    }, 500);
                } else {
                    feedback.className = 'feedback feedback-incorrect';
                    feedback.textContent = 'Look at the table: what happens to y each time x goes up by 1?';
                    feedback.classList.remove('hidden');
                }
            };

            slopeCheck.addEventListener('click', doSlopeCheck);
            const slopeInput = document.getElementById('ex2-slope');
            if (slopeInput) slopeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSlopeCheck(); });
        }

        // Rewrite check
        const rewriteCheck = document.getElementById('ex2-rewrite-check');
        if (rewriteCheck) {
            const doRewriteCheck = () => {
                if (rewriteDone) return;
                const input = document.getElementById('ex2-rewrite-c');
                const feedback = document.getElementById('ex2-rewrite-feedback');
                const val = parseInt(input.value, 10);

                if (val === 5) {
                    rewriteDone = true;
                    feedback.className = 'feedback feedback-correct';
                    feedback.innerHTML = '<em>y</em> = 5 \u2212 <em>x</em>. Same line, two equations.';
                    feedback.classList.remove('hidden');
                    input.disabled = true;
                    rewriteCheck.disabled = true;
                } else {
                    feedback.className = 'feedback feedback-incorrect';
                    feedback.textContent = 'Subtract x from both sides of x + y = 5.';
                    feedback.classList.remove('hidden');
                }
            };

            rewriteCheck.addEventListener('click', doRewriteCheck);
            const rewriteInput = document.getElementById('ex2-rewrite-c');
            if (rewriteInput) rewriteInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doRewriteCheck(); });
        }
    },

    // ============================================
    // Exercise 3: Same Line or Different Line?
    // Pair A: x+y=3 and y=3-x → Same
    // Pair B: x+y=2 and y=2+x → Different (the trap!)
    // Pair C: y=4-x and x+y=4 → Same
    // ============================================
    initEx3() {
        this.initEx3Pair('a', 'same',
            'Subtract <em>x</em> from both sides of the first and you get the second.',
            'Check: pick <em>x</em> = 1. First: 1 + <em>y</em> = 3, so <em>y</em> = 2. Second: <em>y</em> = 3 \u2212 1 = 2. Same point.'
        );

        this.initEx3Pair('b', 'diff',
            'Check: if <em>x</em> = 1, the first gives <em>y</em> = 1 (since 1 + 1 = 2). The second gives <em>y</em> = 3 (since 2 + 1 = 3). Different points \u2014 different lines. One has slope \u22121, the other has slope 1.',
            'These look similar but they\'re not the same. Try <em>x</em> = 1 in both equations.'
        );

        this.initEx3Pair('c', 'same',
            'Add <em>x</em> to both sides of the first: <em>x</em> + <em>y</em> = 4. Same equation, same line.',
            'Check: pick <em>x</em> = 1. First: <em>y</em> = 4 \u2212 1 = 3. Second: 1 + <em>y</em> = 4, so <em>y</em> = 3. Same point.'
        );
    },

    initEx3Pair(id, correctAnswer, correctMsg, wrongMsg) {
        const sameBtn = document.getElementById(`ex3${id}-same`);
        const diffBtn = document.getElementById(`ex3${id}-diff`);
        const feedback = document.getElementById(`ex3${id}-feedback`);
        if (!sameBtn || !diffBtn || !feedback) return;

        let done = false;

        const handle = (answer) => {
            if (done) return;

            if (answer === correctAnswer) {
                done = true;
                feedback.className = 'feedback feedback-correct text-sm ml-1';
                feedback.innerHTML = correctMsg;
                feedback.classList.remove('hidden');
                sameBtn.disabled = true;
                diffBtn.disabled = true;
                if (answer === 'same') sameBtn.style.background = '#10b981';
                else diffBtn.style.background = '#10b981';
            } else {
                feedback.className = 'feedback feedback-incorrect text-sm ml-1';
                feedback.innerHTML = wrongMsg;
                feedback.classList.remove('hidden');
            }
        };

        sameBtn.addEventListener('click', () => handle('same'));
        diffBtn.addEventListener('click', () => handle('diff'));
    },

    // ============================================
    // Exercise 4: The Other Direction
    // y = 7 - x. Slope = -1. Then x + y = 7.
    // ============================================
    initEx4() {
        let slopeDone = false;
        let constDone = false;

        // Slope check
        const slopeCheck = document.getElementById('ex4-slope-check');
        if (slopeCheck) {
            const doCheck = () => {
                if (slopeDone) return;
                const input = document.getElementById('ex4-slope');
                const feedback = document.getElementById('ex4-slope-feedback');
                const val = parseInt(input.value, 10);

                if (val === -1) {
                    slopeDone = true;
                    feedback.className = 'feedback feedback-correct';
                    feedback.textContent = 'Each time x goes up by 1, y goes down by 1. Slope \u22121.';
                    feedback.classList.remove('hidden');
                    input.disabled = true;
                    slopeCheck.disabled = true;

                    setTimeout(() => {
                        const part2 = document.getElementById('ex4-part2');
                        if (part2) part2.classList.remove('hidden');
                    }, 500);
                } else {
                    feedback.className = 'feedback feedback-incorrect';
                    feedback.textContent = '"7 minus x" — what happens to y when x goes up by 1?';
                    feedback.classList.remove('hidden');
                }
            };

            slopeCheck.addEventListener('click', doCheck);
            const slopeInput = document.getElementById('ex4-slope');
            if (slopeInput) slopeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck(); });
        }

        // Constant check
        const constCheck = document.getElementById('ex4-constant-check');
        if (constCheck) {
            const doCheck = () => {
                if (constDone) return;
                const input = document.getElementById('ex4-constant');
                const feedback = document.getElementById('ex4-constant-feedback');
                const val = parseInt(input.value, 10);

                if (val === 7) {
                    constDone = true;
                    feedback.className = 'feedback feedback-correct';
                    feedback.innerHTML = '<em>x</em> + <em>y</em> = 7. Add <em>x</em> to both sides of <em>y</em> = 7 \u2212 <em>x</em> and you get <em>x</em> + <em>y</em> = 7. Same line, different name.';
                    feedback.classList.remove('hidden');
                    input.disabled = true;
                    constCheck.disabled = true;
                } else {
                    feedback.className = 'feedback feedback-incorrect';
                    feedback.textContent = 'Add x to both sides of y = 7 \u2212 x. What do you get?';
                    feedback.classList.remove('hidden');
                }
            };

            constCheck.addEventListener('click', doCheck);
            const constInput = document.getElementById('ex4-constant');
            if (constInput) constInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck(); });
        }
    },

    init() {
        this.initEx1();
        this.initEx2();
        this.initEx3();
        this.initEx4();
    }
};
