/**
 * Exercise Logic for Lesson 8: Tangent Lines
 */

const Exercises = {
    // ============================================
    // EXERCISE 0 (Page 4): Warmup - isosceles triangle
    // Angle at A is 70°, find angle at B
    // Answer: 70°
    // ============================================
    exercise0: {
        correctAnswer: 'b',
        explanation: 'Since OA = OB (both radii), triangle OAB is isosceles. Base angles of an isosceles triangle are equal, so the angle at B is also 70°.',
        checked: false,

        init() {
            const container = document.getElementById('ex0-options');
            if (!container) return;

            const options = [
                { value: 'a', label: '35°' },
                { value: 'b', label: '70°' },
                { value: 'c', label: '140°' },
                { value: 'd', label: '110°' }
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
    // EXERCISE 1 (Page 7): Angle at Q in isosceles triangle
    // Angle at P is 90°, find angle at Q
    // Answer: 90°
    // ============================================
    exercise1: {
        correctAnswer: 'c',
        explanation: 'Triangle OPQ is isosceles because OP = OQ (both radii). Base angles of an isosceles triangle are equal. Since the angle at P is 90°, the angle at Q must also be 90°.',
        checked: false,

        init() {
            const container = document.getElementById('ex1-options');
            if (!container) return;

            const options = [
                { value: 'a', label: '45°' },
                { value: 'b', label: '60°' },
                { value: 'c', label: '90°' },
                { value: 'd', label: 'Can\'t determine' }
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
    // EXERCISE 2 (Page 11): Identify tangent lines
    // Multiple diagrams, identify which are tangent
    // Answers: A and D are tangent
    // ============================================
    exercise2: {
        correctAnswers: ['a', 'd'],
        checked: false,

        init() {
            // Initialize 4 separate question containers
            ['a', 'b', 'c', 'd'].forEach(id => {
                const container = document.getElementById(`ex2-${id}-options`);
                if (!container) return;

                const options = [
                    { value: 'tangent', label: 'Tangent' },
                    { value: 'not-tangent', label: 'Not tangent' }
                ];

                container.innerHTML = options.map(opt => `
                    <label class="exercise-option" data-value="${opt.value}">
                        <input type="radio" name="ex2-${id}" value="${opt.value}" class="w-4 h-4">
                        <span class="body-text">${opt.label}</span>
                    </label>
                `).join('');

                container.querySelectorAll('.exercise-option').forEach(label => {
                    label.addEventListener('click', () => {
                        container.querySelectorAll('.exercise-option').forEach(l => l.classList.remove('selected'));
                        label.classList.add('selected');
                    });
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

            const checkBtn = document.getElementById('ex2-check');
            const feedback = document.getElementById('ex2-feedback');

            let allCorrect = true;

            // Check each diagram
            ['a', 'b', 'c', 'd'].forEach(id => {
                const container = document.getElementById(`ex2-${id}-options`);
                const selected = container.querySelector(`input[name="ex2-${id}"]:checked`);
                const userAnswer = selected ? selected.value : null;

                // Determine if this diagram should be tangent or not
                const shouldBeTangent = this.correctAnswers.includes(id);
                const isCorrect = (userAnswer === 'tangent' && shouldBeTangent) ||
                                (userAnswer === 'not-tangent' && !shouldBeTangent);

                if (!isCorrect) allCorrect = false;

                container.querySelectorAll('.exercise-option').forEach(label => {
                    const input = label.querySelector('input');
                    const isTangentOption = input.value === 'tangent';

                    if ((isTangentOption && shouldBeTangent) || (!isTangentOption && !shouldBeTangent)) {
                        label.classList.add('correct');
                    } else if (input.checked) {
                        label.classList.add('incorrect');
                    }
                    input.disabled = true;
                });
            });

            if (feedback) {
                feedback.classList.remove('hidden');
                feedback.className = `feedback ${allCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;

                const explanations = {
                    a: 'Tangent - the line is perpendicular to the radius at its endpoint.',
                    b: 'Not tangent - this is a secant line that crosses the circle at two points.',
                    c: 'Not tangent - the line is perpendicular to the radius but not at the endpoint where it touches the circle.',
                    d: 'Tangent - the line is perpendicular to the radius at its endpoint.'
                };

                const explanationHtml = ['A', 'B', 'C', 'D'].map((letter, idx) =>
                    `<strong>${letter}:</strong> ${explanations[letter.toLowerCase()]}`
                ).join('<br>');

                feedback.innerHTML = `
                    <strong>${allCorrect ? 'Perfect!' : 'Let\'s review:'}</strong>
                    <div class="feedback-explanation" style="margin-top: 0.5rem;">${explanationHtml}</div>
                `;
            }

            if (checkBtn) {
                checkBtn.disabled = true;
            }
        }
    },

    // ============================================
    // INITIALIZE ALL EXERCISES
    // ============================================
    init() {
        this.exercise0.init();
        this.exercise1.init();
        this.exercise2.init();
    }
};
