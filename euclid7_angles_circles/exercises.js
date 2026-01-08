/**
 * Exercise Logic for Lesson 7: Angles in Circles
 */

const Exercises = {
    // ============================================
    // EXERCISE 0: Isosceles triangle from two radii
    // One base angle is 20°, what's the other?
    // Answer: 20°
    // ============================================
    exercise0: {
        correctAnswer: 'a',
        explanation: 'The two radii are equal, so the triangle is isosceles. Base angles of an isosceles triangle are equal, so both are 20°.',
        checked: false,

        init() {
            const container = document.getElementById('ex0-options');
            if (!container) return;

            const options = [
                { value: 'a', label: '20°' },
                { value: 'b', label: '40°' },
                { value: 'c', label: '10°' }
            ];

            container.innerHTML = options.map(opt => `
                <label class="exercise-option" data-value="${opt.value}">
                    <input type="radio" name="ex0" value="${opt.value}" class="w-4 h-4">
                    <span class="body-text">${opt.label}</span>
                </label>
            `).join('');

            container.querySelectorAll('.exercise-option').forEach(label => {
                label.addEventListener('click', () => {
                    container.querySelectorAll('.exercise-option').forEach(l => l.classList.remove('selected'));
                    label.classList.add('selected');
                });
            });

            const checkBtn = document.getElementById('ex0-check');
            if (checkBtn) {
                checkBtn.addEventListener('click', () => this.check());
            }
        },

        check() {
            if (this.checked) return;
            this.checked = true;

            const container = document.getElementById('ex0-options');
            const feedback = document.getElementById('ex0-feedback');
            const checkBtn = document.getElementById('ex0-check');

            const selected = container.querySelector('input[name="ex0"]:checked');
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
    // EXERCISE 1: 30° + 30° = 60° at C, find angle at O
    // Answer: 120°
    // ============================================
    exercise1: {
        correctAnswer: 'b',
        explanation: 'The angle at C is 30° + 30° = 60°. The angle at the center is twice the angle on the circle: 2 × 60° = 120°.',
        checked: false,

        init() {
            const container = document.getElementById('ex1-options');
            if (!container) return;

            const options = [
                { value: 'a', label: '60°' },
                { value: 'b', label: '120°' },
                { value: 'c', label: '180°' }
            ];

            container.innerHTML = options.map(opt => `
                <label class="exercise-option" data-value="${opt.value}">
                    <input type="radio" name="ex1" value="${opt.value}" class="w-4 h-4">
                    <span class="body-text">${opt.label}</span>
                </label>
            `).join('');

            container.querySelectorAll('.exercise-option').forEach(label => {
                label.addEventListener('click', () => {
                    container.querySelectorAll('.exercise-option').forEach(l => l.classList.remove('selected'));
                    label.classList.add('selected');
                });
            });

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
    // EXERCISE 2: 20° + 40° = 60° at C, find angle at O
    // Answer: 120°
    // ============================================
    exercise2: {
        correctAnswer: 'b',
        explanation: 'The angle at C is 20° + 40° = 60°. Again, the angle at the center is 2 × 60° = 120°. Same answer as before!',
        checked: false,

        init() {
            const container = document.getElementById('ex2-options');
            if (!container) return;

            const options = [
                { value: 'a', label: '60°' },
                { value: 'b', label: '120°' },
                { value: 'c', label: '180°' }
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
    // EXERCISE 3: Corollary - angles on same arc
    // Angle at X is 35°, what's angle at Y?
    // Answer: 35°
    // ============================================
    exercise3: {
        correctAnswer: 'a',
        explanation: 'Both X and Y are on the same arc, looking at the same chord AB. By the corollary, angles on the same arc are equal.',
        checked: false,

        init() {
            const container = document.getElementById('ex3-options');
            if (!container) return;

            const options = [
                { value: 'a', label: '35°' },
                { value: 'b', label: '70°' },
                { value: 'c', label: '17.5°' }
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

    // Initialize all exercises
    init() {
        this.exercise0.init();
        this.exercise1.init();
        this.exercise2.init();
        this.exercise3.init();
    }
};
