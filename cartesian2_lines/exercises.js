/**
 * Exercise Logic for Lesson 12: Lines in the Plane
 */

const Exercises = {
    // ============================================
    // EXERCISE 1: Find the Rule (y = 3x)
    // ============================================
    ex1: {
        solved: false,

        init() {
            const canvas = document.getElementById('canvas-ex1');
            if (!canvas) return;
            Diagrams.drawEx1(canvas);

            const btn = document.getElementById('ex1-check');
            if (btn) btn.addEventListener('click', () => this.check());

            const input = document.getElementById('ex1-multiplier');
            if (input) input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.check();
            });

            // Follow-up
            const followupBtn = document.getElementById('ex1-followup-check');
            if (followupBtn) followupBtn.addEventListener('click', () => this.checkFollowup());

            const followupInput = document.getElementById('ex1-followup-input');
            if (followupInput) followupInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.checkFollowup();
            });
        },

        check() {
            const input = document.getElementById('ex1-multiplier');
            const feedback = document.getElementById('ex1-feedback');
            const btn = document.getElementById('ex1-check');
            if (!input || !feedback) return;

            const value = parseInt(input.value, 10);
            if (isNaN(value)) {
                feedback.textContent = 'Enter a number.';
                feedback.className = 'feedback';
                feedback.classList.remove('hidden');
                return;
            }

            if (value === 3) {
                feedback.innerHTML = '<strong>Correct!</strong> Every y-coordinate is 3 times the x-coordinate.';
                feedback.className = 'feedback feedback-correct';
                input.disabled = true;
                btn.disabled = true;
                this.solved = true;

                // Show follow-up
                const followup = document.getElementById('ex1-followup');
                if (followup) followup.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<strong>Not quite.</strong> Look at how x and y relate in each point.';
                feedback.className = 'feedback feedback-incorrect';
            }
            feedback.classList.remove('hidden');
        },

        checkFollowup() {
            const input = document.getElementById('ex1-followup-input');
            const feedback = document.getElementById('ex1-followup-feedback');
            const btn = document.getElementById('ex1-followup-check');
            if (!input || !feedback) return;

            const value = parseInt(input.value, 10);
            if (isNaN(value)) {
                feedback.textContent = 'Enter a number.';
                feedback.className = 'feedback';
                feedback.classList.remove('hidden');
                return;
            }

            if (value === 15) {
                feedback.innerHTML = '<strong>Correct!</strong> 3 &middot; 5 = 15.';
                feedback.className = 'feedback feedback-correct';
                input.disabled = true;
                btn.disabled = true;
            } else {
                feedback.innerHTML = '<strong>Not quite.</strong> The rule is y = 3 &middot; x. What is 3 &middot; 5?';
                feedback.className = 'feedback feedback-incorrect';
            }
            feedback.classList.remove('hidden');
        }
    },

    // ============================================
    // EXERCISE 2: Does It Belong? (y = 2x)
    // ============================================
    ex2: {
        partADone: false,

        init() {
            const canvas = document.getElementById('canvas-ex2');
            if (!canvas) return;
            Diagrams.drawEx2(canvas);

            // Part A buttons
            const yesA = document.getElementById('ex2a-yes');
            const noA = document.getElementById('ex2a-no');
            if (yesA) yesA.addEventListener('click', () => this.checkA(true));
            if (noA) noA.addEventListener('click', () => this.checkA(false));

            // Part B buttons
            const yesB = document.getElementById('ex2b-yes');
            const noB = document.getElementById('ex2b-no');
            if (yesB) yesB.addEventListener('click', () => this.checkB(true));
            if (noB) noB.addEventListener('click', () => this.checkB(false));
        },

        checkA(userSaidYes) {
            const feedback = document.getElementById('ex2a-feedback');
            if (!feedback || this.partADone) return;

            // Correct answer is No
            if (!userSaidYes) {
                feedback.innerHTML = '<strong>Correct.</strong> 2 &middot; 4 = 8, not 7.';
                feedback.className = 'feedback feedback-correct';
                this.partADone = true;

                // Disable part A buttons
                document.getElementById('ex2a-yes').disabled = true;
                document.getElementById('ex2a-no').disabled = true;

                // Show part B
                const sectionB = document.getElementById('ex2b-section');
                if (sectionB) sectionB.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<strong>Not quite.</strong> Check: does 2 &middot; 4 equal 7?';
                feedback.className = 'feedback feedback-incorrect';
            }
            feedback.classList.remove('hidden');
        },

        checkB(userSaidYes) {
            const feedback = document.getElementById('ex2b-feedback');
            if (!feedback) return;

            // Correct answer is Yes
            if (userSaidYes) {
                feedback.innerHTML = '<strong>Correct.</strong> 2 &middot; 5 = 10.';
                feedback.className = 'feedback feedback-correct';
                document.getElementById('ex2b-yes').disabled = true;
                document.getElementById('ex2b-no').disabled = true;
            } else {
                feedback.innerHTML = '<strong>Not quite.</strong> Check: does 2 &middot; 5 equal 10?';
                feedback.className = 'feedback feedback-incorrect';
            }
            feedback.classList.remove('hidden');
        }
    },

    // ============================================
    // EXERCISE 3: Build a Line (y = x + 2)
    // ============================================
    ex3: {
        init() {
            const canvas = document.getElementById('canvas-ex3');
            if (!canvas) return;
            Diagrams.drawEx3(canvas);

            const btn = document.getElementById('ex3-check');
            if (btn) btn.addEventListener('click', () => this.check());

            // Enter key on any input
            ['ex3-y0', 'ex3-y1', 'ex3-y3'].forEach(id => {
                const input = document.getElementById(id);
                if (input) input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') this.check();
                });
            });
        },

        check() {
            const y0Input = document.getElementById('ex3-y0');
            const y1Input = document.getElementById('ex3-y1');
            const y3Input = document.getElementById('ex3-y3');
            const feedback = document.getElementById('ex3-feedback');
            const btn = document.getElementById('ex3-check');

            if (!y0Input || !y1Input || !y3Input || !feedback) return;

            const y0 = parseInt(y0Input.value, 10);
            const y1 = parseInt(y1Input.value, 10);
            const y3 = parseInt(y3Input.value, 10);

            if (isNaN(y0) || isNaN(y1) || isNaN(y3)) {
                feedback.textContent = 'Fill in all three values.';
                feedback.className = 'feedback';
                feedback.classList.remove('hidden');
                return;
            }

            const correct0 = (y0 === 2);
            const correct1 = (y1 === 3);
            const correct3 = (y3 === 5);

            if (correct0 && correct1 && correct3) {
                feedback.innerHTML = '<strong>You started with an equation and ended with a line.</strong>';
                feedback.className = 'feedback feedback-correct';
                btn.disabled = true;
                y0Input.disabled = true;
                y1Input.disabled = true;
                y3Input.disabled = true;

                // Redraw canvas with points and line
                const canvas = document.getElementById('canvas-ex3');
                if (canvas) {
                    const points = [
                        { x: 0, y: 2 },
                        { x: 1, y: 3 },
                        { x: 3, y: 5 }
                    ];
                    Diagrams.drawEx3(canvas, points, true);
                }
            } else {
                let hint = '<strong>Not quite.</strong> Remember: y = x + 2.';
                if (!correct0) hint += ' When x = 0, what is 0 + 2?';
                else if (!correct1) hint += ' When x = 1, what is 1 + 2?';
                else if (!correct3) hint += ' When x = 3, what is 3 + 2?';
                feedback.innerHTML = hint;
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
