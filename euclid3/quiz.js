/**
 * Quiz Logic for Lesson 3
 * 
 * 6 multiple choice questions covering:
 * - Parallel lines definition
 * - Number of angles formed
 * - Corresponding angles definition
 * - Finding angle measures (questions 4-5 use diagram with ∠a = 72°)
 * - Proof structure
 */

const Quiz = {
    questions: [
        {
            id: 1,
            text: 'What do we call two lines in the same plane that never intersect?',
            options: ['Perpendicular', 'Parallel', 'Transversal', 'Vertical'],
            answer: 'Parallel'
        },
        {
            id: 2,
            text: 'When a transversal crosses two parallel lines, how many angles are formed?',
            options: ['4', '6', '8', '12'],
            answer: '8'
        },
        {
            id: 3,
            text: 'Corresponding angles are angles that are ___.',
            options: [
                'On opposite sides of the transversal',
                'In the same position at each intersection',
                'Between the parallel lines',
                'Adjacent to each other'
            ],
            answer: 'In the same position at each intersection'
        },
        {
            id: 4,
            text: 'Lines ℓ and <i>m</i> are parallel. ∠<i>a</i> = 72°. What is ∠<i>e</i>?',
            options: ['72°', '108°', '18°', '90°'],
            answer: '72°',
            hint: '(corresponding angles)'
        },
        {
            id: 5,
            text: 'Lines ℓ and <i>m</i> are parallel. ∠<i>a</i> = 72°. What is ∠<i>c</i>?',
            options: ['72°', '108°', '18°', '90°'],
            answer: '108°',
            hint: '(linear pair)'
        },
        {
            id: 6,
            text: 'In the proof of the Alternate Interior Angles Theorem, which postulate or theorem did we use first?',
            options: [
                'Linear Pair Postulate',
                'Vertical Angles Theorem',
                'Corresponding Angles Postulate',
                'Transitive Property'
            ],
            answer: 'Corresponding Angles Postulate'
        }
    ],
    userAnswers: [],
    checked: false,

    init() {
        const container = document.getElementById('quiz-container');
        if (!container) return;

        container.innerHTML = '';
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.checked = false;

        this.questions.forEach((q, idx) => {
            // Insert diagram before question 4 (index 3)
            if (idx === 3) {
                const diagramDiv = document.createElement('div');
                diagramDiv.className = 'flex justify-center my-6';
                diagramDiv.innerHTML = '<canvas id="canvas-quiz" class="diagram-canvas" width="400" height="320"></canvas>';
                container.appendChild(diagramDiv);
                
                const diagramLabel = document.createElement('p');
                diagramLabel.className = 'text-center text-sm text-gray-500 mb-4';
                diagramLabel.textContent = 'Use the diagram above to answer questions 4 and 5.';
                container.appendChild(diagramLabel);
            }

            const div = document.createElement('div');
            div.className = 'quiz-question';
            div.id = `quiz-q${idx}`;

            const questionText = document.createElement('p');
            questionText.className = 'quiz-question-text';
            questionText.innerHTML = `${q.id}. ${q.text}`;
            div.appendChild(questionText);

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'quiz-options';

            q.options.forEach(opt => {
                const label = document.createElement('label');
                label.className = 'quiz-option';
                label.innerHTML = `
                    <input type="radio" name="quiz-q${idx}" value="${opt}" class="mr-2">
                    ${opt}
                `;
                label.querySelector('input').addEventListener('change', (e) => {
                    this.userAnswers[idx] = e.target.value;
                    // Update selected styling
                    optionsDiv.querySelectorAll('.quiz-option').forEach(l => l.classList.remove('selected'));
                    label.classList.add('selected');
                });
                optionsDiv.appendChild(label);
            });

            div.appendChild(optionsDiv);
            container.appendChild(div);
        });

        // Set up check button
        const checkBtn = document.getElementById('quiz-check');
        if (checkBtn) {
            checkBtn.onclick = () => this.check();
        }

        // Hide result initially
        const result = document.getElementById('quiz-result');
        if (result) {
            result.classList.add('hidden');
        }

        // Draw the quiz diagram (canvas was created dynamically above)
        const quizCanvas = document.getElementById('canvas-quiz');
        if (quizCanvas && typeof Diagrams !== 'undefined') {
            Diagrams.drawQuiz(quizCanvas);
        }
    },

    check() {
        if (this.checked) return;
        this.checked = true;

        let correct = 0;

        this.questions.forEach((q, idx) => {
            const qDiv = document.getElementById(`quiz-q${idx}`);
            const userAnswer = this.userAnswers[idx];
            const isCorrect = userAnswer === q.answer;

            if (isCorrect) {
                correct++;
                qDiv.classList.add('correct');
            } else {
                qDiv.classList.add('incorrect');
            }

            // Show correct answer
            const options = qDiv.querySelectorAll('.quiz-option');
            options.forEach(opt => {
                const input = opt.querySelector('input');
                if (input.value === q.answer) {
                    opt.classList.add('correct-answer');
                } else if (input.checked && !isCorrect) {
                    opt.classList.add('wrong-answer');
                }
                input.disabled = true;
            });

            // Add hint if present and incorrect
            if (!isCorrect && q.hint) {
                const hint = document.createElement('p');
                hint.className = 'text-sm text-gray-500 mt-1 italic';
                hint.textContent = q.hint;
                qDiv.appendChild(hint);
            }
        });

        // Show result
        const result = document.getElementById('quiz-result');
        if (result) {
            result.classList.remove('hidden');
            
            let message, className;
            if (correct === this.questions.length) {
                message = 'Excellent! You have mastered parallel lines and transversals.';
                className = 'quiz-result excellent';
            } else if (correct >= 4) {
                message = 'Good work. Review any errors before proceeding.';
                className = 'quiz-result good';
            } else {
                message = 'Review the lesson and try again.';
                className = 'quiz-result needs-review';
            }

            result.className = className;
            result.innerHTML = `
                <p class="text-2xl font-bold mb-2">${correct} / ${this.questions.length}</p>
                <p>${message}</p>
            `;
        }

        // Disable check button
        const checkBtn = document.getElementById('quiz-check');
        if (checkBtn) {
            checkBtn.disabled = true;
            checkBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
};
