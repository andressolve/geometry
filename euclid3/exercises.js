/**
 * Exercise Logic for Lesson 3
 * 
 * Exercise 1: Identify angle pair types
 * Exercise 2: Find angle measures given one angle
 */

const Exercises = {
    // ============================================
    // EXERCISE 1: IDENTIFY ANGLE TYPES
    // ============================================
    exercise1: {
        questions: [
            { pair: ['b', 'f'], answer: 'corresponding', explanation: '∠b and ∠f are both in the upper-right position at their intersections.' },
            { pair: ['d', 'f'], answer: 'alternate-interior', explanation: '∠d and ∠f are on opposite sides of the transversal, both in the interior region.' },
            { pair: ['c', 'e'], answer: 'alternate-interior', explanation: '∠c and ∠e are on opposite sides of the transversal, both in the interior region.' },
            { pair: ['a', 'c'], answer: 'vertical', explanation: '∠a and ∠c are vertical angles—opposite each other at the same intersection.' },
            { pair: ['a', 'e'], answer: 'corresponding', explanation: '∠a and ∠e are both in the upper-left position at their intersections.' }
        ],
        options: [
            { value: 'corresponding', label: 'Corresponding' },
            { value: 'alternate-interior', label: 'Alternate Interior' },
            { value: 'vertical', label: 'Vertical' }
        ],
        userAnswers: [],
        checked: false,

        init() {
            const container = document.getElementById('exercise1-container');
            if (!container) return;

            container.innerHTML = '';
            this.userAnswers = new Array(this.questions.length).fill(null);
            this.checked = false;

            this.questions.forEach((q, idx) => {
                const div = document.createElement('div');
                div.className = 'exercise-question';
                div.id = `ex1-q${idx}`;

                const questionText = document.createElement('p');
                questionText.className = 'body-text font-semibold mb-3';
                questionText.innerHTML = `${idx + 1}. ∠<i>${q.pair[0]}</i> and ∠<i>${q.pair[1]}</i>`;
                div.appendChild(questionText);

                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'grid grid-cols-2 md:grid-cols-3 gap-2';

                this.options.forEach(opt => {
                    const label = document.createElement('label');
                    label.className = 'exercise-option';
                    label.innerHTML = `
                        <input type="radio" name="ex1-q${idx}" value="${opt.value}" class="mr-2">
                        ${opt.label}
                    `;
                    label.querySelector('input').addEventListener('change', (e) => {
                        this.userAnswers[idx] = e.target.value;
                        // Update selected styling
                        optionsDiv.querySelectorAll('.exercise-option').forEach(l => l.classList.remove('selected'));
                        label.classList.add('selected');
                    });
                    optionsDiv.appendChild(label);
                });

                div.appendChild(optionsDiv);
                container.appendChild(div);
            });

            // Set up check button
            const checkBtn = document.getElementById('exercise1-check');
            if (checkBtn) {
                checkBtn.onclick = () => this.check();
            }
        },

        check() {
            if (this.checked) return;
            this.checked = true;

            let correct = 0;
            this.questions.forEach((q, idx) => {
                const qDiv = document.getElementById(`ex1-q${idx}`);
                const userAnswer = this.userAnswers[idx];
                const isCorrect = userAnswer === q.answer;

                if (isCorrect) {
                    correct++;
                    qDiv.classList.add('correct');
                } else {
                    qDiv.classList.add('incorrect');
                }

                // Show correct answer
                const options = qDiv.querySelectorAll('.exercise-option');
                options.forEach(opt => {
                    const input = opt.querySelector('input');
                    if (input.value === q.answer) {
                        opt.classList.add('correct-answer');
                    } else if (input.checked && !isCorrect) {
                        opt.classList.add('wrong-answer');
                    }
                    input.disabled = true;
                });

                // Add explanation
                const explanation = document.createElement('p');
                explanation.className = 'text-sm mt-2 ' + (isCorrect ? 'text-green-700' : 'text-red-700');
                explanation.textContent = q.explanation;
                qDiv.appendChild(explanation);
            });

            // Show overall feedback
            const feedback = document.getElementById('exercise1-feedback');
            if (feedback) {
                feedback.classList.remove('hidden');
                feedback.className = correct === this.questions.length 
                    ? 'mt-4 feedback-correct' 
                    : 'mt-4 feedback-incorrect';
                feedback.textContent = `You got ${correct} out of ${this.questions.length} correct.`;
            }

            // Disable check button
            const checkBtn = document.getElementById('exercise1-check');
            if (checkBtn) {
                checkBtn.disabled = true;
                checkBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        }
    },

    // ============================================
    // EXERCISE 2: FIND ANGLE MEASURES
    // ============================================
    exercise2: {
        givenAngle: 65,
        // Answers based on ∠a = 65°
        // a = 65° (given)
        // b = 115° (linear pair with a)
        // c = 65° (vertical to a)
        // d = 115° (linear pair with a)
        // e = 65° (corresponding to a)
        // f = 115° (linear pair with e)
        // g = 65° (vertical to e)
        // h = 115° (linear pair with e)
        answers: {
            b: { value: 115, reason: 'Linear pair with ∠a: 180° - 65° = 115°' },
            c: { value: 65, reason: 'Vertical angle to ∠a' },
            d: { value: 115, reason: 'Linear pair with ∠a: 180° - 65° = 115°' },
            e: { value: 65, reason: 'Corresponding angle to ∠a' },
            f: { value: 115, reason: 'Linear pair with ∠e: 180° - 65° = 115°' },
            g: { value: 65, reason: 'Vertical angle to ∠e' },
            h: { value: 115, reason: 'Linear pair with ∠e: 180° - 65° = 115°' }
        },
        checked: false,

        init() {
            const container = document.getElementById('exercise2-container');
            if (!container) return;

            container.innerHTML = '';
            this.checked = false;

            // Create input for each angle (except 'a' which is given)
            const angles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            
            angles.forEach(angle => {
                const row = document.createElement('div');
                row.className = 'angle-input-row' + (angle === 'a' ? ' given' : '');
                row.id = `ex2-${angle}`;

                const label = document.createElement('span');
                label.className = 'body-text w-16';
                label.innerHTML = `∠<i>${angle}</i> =`;
                row.appendChild(label);

                if (angle === 'a') {
                    const value = document.createElement('span');
                    value.className = 'font-semibold';
                    value.textContent = `${this.givenAngle}° (given)`;
                    row.appendChild(value);
                } else {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'exercise-input';
                    input.id = `ex2-input-${angle}`;
                    input.placeholder = '?';
                    row.appendChild(input);

                    const degree = document.createElement('span');
                    degree.textContent = '°';
                    row.appendChild(degree);
                }

                container.appendChild(row);
            });

            // Set up check button
            const checkBtn = document.getElementById('exercise2-check');
            if (checkBtn) {
                checkBtn.onclick = () => this.check();
            }
        },

        check() {
            if (this.checked) return;
            this.checked = true;

            let correct = 0;
            const total = Object.keys(this.answers).length;

            Object.entries(this.answers).forEach(([angle, data]) => {
                const input = document.getElementById(`ex2-input-${angle}`);
                const row = document.getElementById(`ex2-${angle}`);
                if (!input || !row) return;

                const userValue = parseInt(input.value, 10);
                const isCorrect = userValue === data.value;

                if (isCorrect) {
                    correct++;
                    input.classList.add('correct');
                } else {
                    input.classList.add('incorrect');
                }

                input.disabled = true;

                // Add feedback
                const feedback = document.createElement('span');
                feedback.className = 'text-sm ml-2 ' + (isCorrect ? 'text-green-600' : 'text-red-600');
                feedback.textContent = isCorrect ? '✓' : `✗ (${data.value}°)`;
                row.appendChild(feedback);

                // Add reason tooltip on hover
                row.title = data.reason;
            });

            // Show overall feedback
            const feedback = document.getElementById('exercise2-feedback');
            if (feedback) {
                feedback.classList.remove('hidden');
                feedback.className = correct === total 
                    ? 'mt-4 feedback-correct' 
                    : 'mt-4 feedback-incorrect';
                
                if (correct === total) {
                    feedback.textContent = 'Excellent! All angles correct.';
                } else {
                    feedback.innerHTML = `You got ${correct} out of ${total} correct.<br><small>Hover over each row to see the reasoning.</small>`;
                }
            }

            // Disable check button
            const checkBtn = document.getElementById('exercise2-check');
            if (checkBtn) {
                checkBtn.disabled = true;
                checkBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        }
    },

    // Initialize all exercises
    init() {
        this.exercise1.init();
        this.exercise2.init();
    }
};
