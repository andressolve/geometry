/**
 * Exercise Logic for Lesson 6: Isosceles Triangles
 */

const Exercises = {
    // ============================================
    // EXERCISE 1: Base angles 65° each, find vertex angle
    // Answer: 50° (since 65 + 65 + x = 180, x = 50)
    // ============================================
    exercise1: {
        correctAnswer: 'a',
        explanation: 'The three angles sum to 180°. With two 65° base angles: 65° + 65° + x = 180°, so x = 50°.',
        checked: false,

        init() {
            const container = document.getElementById('ex1-options');
            if (!container) return;

            const options = [
                { value: 'a', label: '50°' },
                { value: 'b', label: '55°' },
                { value: 'c', label: '65°' }
            ];

            container.innerHTML = options.map(opt => `
                <label class="exercise-option" data-value="${opt.value}">
                    <input type="radio" name="ex1" value="${opt.value}" class="w-4 h-4">
                    <span class="body-text">${opt.label}</span>
                </label>
            `).join('');

            // Add click handlers
            container.querySelectorAll('.exercise-option').forEach(label => {
                label.addEventListener('click', () => {
                    container.querySelectorAll('.exercise-option').forEach(l => l.classList.remove('selected'));
                    label.classList.add('selected');
                });
            });

            // Set up check button
            const checkBtn = document.getElementById('ex1-check');
            if (checkBtn) {
                checkBtn.addEventListener('click', () => this.check());
            }
        },

        check() {
            if (this.checked) return;
            this.checked = true;

            const container = document.getElementById('ex1-options');
            const feedback = document.getElementById('ex1-feedback');
            const checkBtn = document.getElementById('ex1-check');

            const selected = container.querySelector('input[name="ex1"]:checked');
            const userAnswer = selected ? selected.value : null;
            const isCorrect = userAnswer === this.correctAnswer;

            // Mark options
            container.querySelectorAll('.exercise-option').forEach(label => {
                const input = label.querySelector('input');
                if (input.value === this.correctAnswer) {
                    label.classList.add('correct');
                } else if (input.checked && !isCorrect) {
                    label.classList.add('incorrect');
                }
                input.disabled = true;
            });

            // Show feedback
            if (feedback) {
                feedback.classList.remove('hidden');
                feedback.className = `feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
                feedback.innerHTML = `
                    <strong>${isCorrect ? 'Correct!' : 'Not quite.'}</strong>
                    <div class="feedback-explanation">${this.explanation}</div>
                `;
            }

            // Disable button
            if (checkBtn) {
                checkBtn.disabled = true;
            }
        }
    },

    // ============================================
    // EXERCISE 2: Vertex angle 40°, find base angles
    // Answer: 70° each (since 40 + 2x = 180, x = 70)
    // ============================================
    exercise2: {
        correctAnswer: 'b',
        explanation: 'The three angles sum to 180°. With a 40° vertex angle: 40° + 2x = 180°, so 2x = 140°, and each base angle is 70°.',
        checked: false,

        init() {
            const container = document.getElementById('ex2-options');
            if (!container) return;

            const options = [
                { value: 'a', label: '60°' },
                { value: 'b', label: '70°' },
                { value: 'c', label: '80°' }
            ];

            container.innerHTML = options.map(opt => `
                <label class="exercise-option" data-value="${opt.value}">
                    <input type="radio" name="ex2" value="${opt.value}" class="w-4 h-4">
                    <span class="body-text">${opt.label}</span>
                </label>
            `).join('');

            container.querySelectorAll('.exercise-option').forEach(label => {
                label.addEventListener('click', () => {
                    container.querySelectorAll('.exercise-option').forEach(l => l.classList.remove('selected'));
                    label.classList.add('selected');
                });
            });

            const checkBtn = document.getElementById('ex2-check');
            if (checkBtn) {
                checkBtn.addEventListener('click', () => this.check());
            }
        },

        check() {
            if (this.checked) return;
            this.checked = true;

            const container = document.getElementById('ex2-options');
            const feedback = document.getElementById('ex2-feedback');
            const checkBtn = document.getElementById('ex2-check');

            const selected = container.querySelector('input[name="ex2"]:checked');
            const userAnswer = selected ? selected.value : null;
            const isCorrect = userAnswer === this.correctAnswer;

            container.querySelectorAll('.exercise-option').forEach(label => {
                const input = label.querySelector('input');
                if (input.value === this.correctAnswer) {
                    label.classList.add('correct');
                } else if (input.checked && !isCorrect) {
                    label.classList.add('incorrect');
                }
                input.disabled = true;
            });

            if (feedback) {
                feedback.classList.remove('hidden');
                feedback.className = `feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
                feedback.innerHTML = `
                    <strong>${isCorrect ? 'Correct!' : 'Not quite.'}</strong>
                    <div class="feedback-explanation">${this.explanation}</div>
                `;
            }

            if (checkBtn) {
                checkBtn.disabled = true;
            }
        }
    },

    // ============================================
    // EXERCISE 3: 50°, 50°, 80° - is it isosceles?
    // Answer: Yes, sides opposite the 50° angles are legs
    // ============================================
    exercise3: {
        correctAnswer: 'b',
        explanation: 'Yes! The two 50° angles are equal, so by the converse of the Isosceles Triangle Theorem, the sides opposite them (the legs) are congruent. The side opposite the 80° angle is the base.',
        checked: false,

        init() {
            const container = document.getElementById('ex3-options');
            if (!container) return;

            const options = [
                { value: 'a', label: 'No, it is scalene' },
                { value: 'b', label: 'Yes, the sides opposite the 50° angles are the legs' },
                { value: 'c', label: 'Yes, the side opposite the 80° angle is a leg' }
            ];

            container.innerHTML = options.map(opt => `
                <label class="exercise-option" data-value="${opt.value}">
                    <input type="radio" name="ex3" value="${opt.value}" class="w-4 h-4">
                    <span class="body-text">${opt.label}</span>
                </label>
            `).join('');

            container.querySelectorAll('.exercise-option').forEach(label => {
                label.addEventListener('click', () => {
                    container.querySelectorAll('.exercise-option').forEach(l => l.classList.remove('selected'));
                    label.classList.add('selected');
                });
            });

            const checkBtn = document.getElementById('ex3-check');
            if (checkBtn) {
                checkBtn.addEventListener('click', () => this.check());
            }
        },

        check() {
            if (this.checked) return;
            this.checked = true;

            const container = document.getElementById('ex3-options');
            const feedback = document.getElementById('ex3-feedback');
            const checkBtn = document.getElementById('ex3-check');

            const selected = container.querySelector('input[name="ex3"]:checked');
            const userAnswer = selected ? selected.value : null;
            const isCorrect = userAnswer === this.correctAnswer;

            container.querySelectorAll('.exercise-option').forEach(label => {
                const input = label.querySelector('input');
                if (input.value === this.correctAnswer) {
                    label.classList.add('correct');
                } else if (input.checked && !isCorrect) {
                    label.classList.add('incorrect');
                }
                input.disabled = true;
            });

            if (feedback) {
                feedback.classList.remove('hidden');
                feedback.className = `feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
                feedback.innerHTML = `
                    <strong>${isCorrect ? 'Correct!' : 'Not quite.'}</strong>
                    <div class="feedback-explanation">${this.explanation}</div>
                `;
            }

            if (checkBtn) {
                checkBtn.disabled = true;
            }
        }
    },

    // ============================================
    // EXERCISE 4: Find x where base angles are 40° and (2x+10)°
    // Answer: x = 15 (since 2x + 10 = 40, so x = 15)
    // ============================================
    exercise4: {
        correctAnswer: 15,
        explanation: 'By the Isosceles Triangle Theorem, base angles are equal: 2x + 10 = 40. Solving: 2x = 30, so x = 15. (Check: 2(15) + 10 = 40°. ✓)',
        checked: false,

        init() {
            const container = document.getElementById('ex4-input-area');
            if (!container) return;

            container.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="body-text italic">x</span>
                    <span class="body-text">=</span>
                    <input type="number" id="ex4-input" class="exercise-input" placeholder="?">
                </div>
            `;

            const checkBtn = document.getElementById('ex4-check');
            if (checkBtn) {
                checkBtn.addEventListener('click', () => this.check());
            }

            // Allow Enter key to submit
            const input = document.getElementById('ex4-input');
            if (input) {
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') this.check();
                });
            }
        },

        check() {
            if (this.checked) return;
            this.checked = true;

            const input = document.getElementById('ex4-input');
            const feedback = document.getElementById('ex4-feedback');
            const checkBtn = document.getElementById('ex4-check');

            const userValue = parseInt(input.value, 10);
            const isCorrect = userValue === this.correctAnswer;

            input.disabled = true;
            input.classList.add(isCorrect ? 'correct' : 'incorrect');

            if (feedback) {
                feedback.classList.remove('hidden');
                feedback.className = `feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
                feedback.innerHTML = `
                    <strong>${isCorrect ? 'Correct!' : `Not quite. The answer is x = ${this.correctAnswer}.`}</strong>
                    <div class="feedback-explanation">${this.explanation}</div>
                `;
            }

            if (checkBtn) {
                checkBtn.disabled = true;
            }
        }
    },

    // Initialize all exercises
    init() {
        this.exercise1.init();
        this.exercise2.init();
        this.exercise3.init();
        this.exercise4.init();
    }
};
