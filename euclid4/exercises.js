/**
 * Exercise Logic for Lesson 4: Practice Session
 * 
 * 19 problems across 4 sections:
 * - Section 1: Warm-Up (1-4)
 * - Section 2: Vertical Angles (5-8)
 * - Section 3: Parallel Lines + Transversal (9-15)
 * - Section 4: Combined Challenges (16-19)
 * 
 * Formal feedback tone per spec - no "Great job!" or "Oops!"
 */

const Exercises = {
    // Track answers and results
    results: {},
    totalProblems: 18,

    // Problem definitions with answers and explanations
    problems: {
        // ============================================
        // SECTION 1: WARM-UP
        // ============================================
        1: {
            type: 'multiple-choice',
            options: ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle'],
            answer: 'Acute angle',
            explanation: 'An acute angle measures less than 90°. The angle shown is approximately 45°.'
        },
        2: {
            type: 'multiple-choice',
            options: ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle'],
            answer: 'Obtuse angle',
            explanation: 'An obtuse angle measures between 90° and 180°. The angle shown is approximately 135°.'
        },
        3: {
            type: 'number-input',
            answer: 55,
            unit: '°',
            explanation: 'Linear pairs are supplementary (sum to 180°). Therefore x = 180° − 125° = 55°.'
        },
        4: {
            type: 'number-input',
            answer: 53,
            unit: '°',
            explanation: 'Complementary angles sum to 90°. Therefore the other angle = 90° − 37° = 53°.'
        },

        // ============================================
        // SECTION 2: VERTICAL ANGLES
        // ============================================
        5: {
            type: 'number-input',
            answer: 72,
            unit: '°',
            explanation: 'Vertical angles are congruent. Since ∠a = 72°, its vertical angle ∠c = 72°.'
        },
        6: {
            type: 'multi-input',
            fields: ['b', 'c', 'd'],
            answers: { b: 62, c: 118, d: 62 },
            unit: '°',
            explanation: '∠c is vertical to ∠a, so ∠c = 118°. ∠b and ∠d form linear pairs with ∠a, so they equal 180° − 118° = 62°.'
        },
        7: {
            type: 'number-input',
            answer: 24,
            unit: '',
            explanation: 'Vertical angles are equal: 2x + 6 = 54. Subtract 6 from both sides: 2x = 48. Divide by 2: x = 24.'
        },
        8: {
            type: 'multiple-choice',
            options: ['∠a and ∠b', '∠a and ∠c', '∠b and ∠d', '∠a and ∠d'],
            answer: '∠a and ∠c',
            explanation: 'Vertical angles are opposite each other when two lines intersect. ∠a and ∠c are vertical angles (as are ∠b and ∠d).'
        },

        // ============================================
        // SECTION 3: PARALLEL LINES + TRANSVERSAL
        // ============================================
        9: {
            type: 'number-input',
            answer: 63,
            unit: '°',
            explanation: 'Corresponding angles are congruent when lines are parallel. ∠a and ∠e are corresponding angles, so ∠e = 63°.'
        },
        10: {
            type: 'number-input',
            answer: 127,
            unit: '°',
            explanation: 'Alternate interior angles are congruent when lines are parallel. ∠d and ∠f are alternate interior angles, so ∠f = 127°.'
        },
        11: {
            type: 'number-input',
            answer: 108,
            unit: '°',
            explanation: '∠c and ∠f are on the same side of the transversal, so they add up to 180°. Therefore ∠f = 180° − 72° = 108°.'
        },
        12: {
            type: 'number-input',
            answer: 115,
            unit: '°',
            explanation: '∠b and ∠f are corresponding angles (both = 115°). ∠f and ∠g are vertical angles, so ∠g = 115°.'
        },
        13: {
            type: 'number-input',
            answer: 70,
            unit: '°',
            explanation: '∠c and ∠e are on opposite sides of the transversal. When lines are parallel, these angles are equal. So ∠e = 70°.'
        },
        14: {
            type: 'number-input',
            answer: 115,
            unit: '°',
            explanation: '∠d and ∠e are on the same side of the transversal, so they add up to 180°. Therefore ∠e = 180° − 65° = 115°.'
        },
        15: {
            type: 'multiple-choice',
            options: ['Yes, they are parallel', 'No, they are not parallel', 'Cannot be determined'],
            answer: 'Yes, they are parallel',
            explanation: '∠c and ∠f are alternate interior angles. For lines to be parallel, alternate interior angles must be equal. Since both equal 85°, the lines are parallel.'
        },

        // ============================================
        // SECTION 4: COMBINED CHALLENGES
        // ============================================
        16: {
            type: 'number-input',
            answer: 122,
            unit: '°',
            explanation: '∠a = 58°. ∠e is corresponding to ∠a, so ∠e = 58°. ∠h forms a linear pair with ∠e, so ∠h = 180° − 58° = 122°.'
        },
        17: {
            type: 'number-input',
            answer: 134,
            unit: '°',
            explanation: '∠b = 134°. ∠f is corresponding to ∠b, so ∠f = 134°. ∠h is vertical to ∠f, so ∠h = 134°.'
        },
        18: {
            type: 'number-input',
            answer: 20,
            unit: '',
            explanation: 'Since ∠c = ∠e, we have 50 = 2x + 10. Subtract 10 from both sides: 40 = 2x. Divide by 2: x = 20.'
        }
    },

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        // Initialize results
        for (let i = 1; i <= this.totalProblems; i++) {
            this.results[i] = null;
        }

        // Set up each problem
        Object.keys(this.problems).forEach(num => {
            const problem = this.problems[num];
            const container = document.getElementById(`problem${num}-container`);
            if (!container) return;

            switch (problem.type) {
                case 'multiple-choice':
                    this.setupMultipleChoice(num, container, problem);
                    break;
                case 'number-input':
                    this.setupNumberInput(num, container, problem);
                    break;
                case 'multi-input':
                    this.setupMultiInput(num, container, problem);
                    break;
            }
        });
    },

    // ============================================
    // MULTIPLE CHOICE SETUP
    // ============================================
    setupMultipleChoice(problemNum, container, problem) {
        container.innerHTML = '';
        
        problem.options.forEach((option, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.dataset.value = option;
            
            btn.addEventListener('click', () => {
                if (this.results[problemNum] !== null) return; // Already answered
                
                // Remove previous selection
                container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                
                // Check answer
                this.checkMultipleChoice(problemNum, option, container, problem);
            });
            
            container.appendChild(btn);
        });
    },

    checkMultipleChoice(problemNum, selected, container, problem) {
        const isCorrect = selected === problem.answer;
        this.results[problemNum] = isCorrect;
        
        // Disable all buttons
        container.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.value === problem.answer) {
                btn.classList.add('correct');
            } else if (btn.dataset.value === selected && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Show feedback
        this.showFeedback(problemNum, isCorrect, problem);
        
        // Update progress
        App.updateProgress();
    },

    // ============================================
    // NUMBER INPUT SETUP
    // ============================================
    setupNumberInput(problemNum, container, problem) {
        container.innerHTML = '';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center gap-3 justify-center';
        
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'input-field';
        input.id = `input-${problemNum}`;
        input.placeholder = '?';
        
        const label = document.createElement('span');
        label.className = 'input-label';
        label.textContent = problem.unit;
        
        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit-btn';
        submitBtn.textContent = 'Submit';
        
        submitBtn.addEventListener('click', () => {
            if (this.results[problemNum] !== null) return;
            
            const value = parseInt(input.value, 10);
            if (isNaN(value)) return;
            
            this.checkNumberInput(problemNum, value, input, submitBtn, problem);
        });
        
        // Allow Enter key to submit
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
        
        wrapper.appendChild(input);
        wrapper.appendChild(label);
        wrapper.appendChild(submitBtn);
        container.appendChild(wrapper);
    },

    checkNumberInput(problemNum, value, input, submitBtn, problem) {
        const isCorrect = value === problem.answer;
        this.results[problemNum] = isCorrect;
        
        input.disabled = true;
        submitBtn.disabled = true;
        
        if (isCorrect) {
            input.classList.add('correct');
        } else {
            input.classList.add('incorrect');
        }
        
        this.showFeedback(problemNum, isCorrect, problem);
        App.updateProgress();
    },

    // ============================================
    // MULTI-INPUT SETUP (Problem 6)
    // ============================================
    setupMultiInput(problemNum, container, problem) {
        container.innerHTML = '';
        
        // Given value row
        const givenRow = document.createElement('div');
        givenRow.className = 'input-row given';
        givenRow.innerHTML = `
            <span class="angle-label">∠<i>a</i> =</span>
            <span class="font-semibold">118° (given)</span>
        `;
        container.appendChild(givenRow);
        
        // Input rows for each unknown
        problem.fields.forEach(field => {
            const row = document.createElement('div');
            row.className = 'input-row';
            row.id = `row-${problemNum}-${field}`;
            
            const label = document.createElement('span');
            label.className = 'angle-label';
            label.innerHTML = `∠<i>${field}</i> =`;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'input-field';
            input.id = `input-${problemNum}-${field}`;
            input.placeholder = '?';
            
            const unit = document.createElement('span');
            unit.textContent = '°';
            
            const feedback = document.createElement('span');
            feedback.className = 'feedback-icon';
            feedback.id = `feedback-${problemNum}-${field}`;
            
            row.appendChild(label);
            row.appendChild(input);
            row.appendChild(unit);
            row.appendChild(feedback);
            container.appendChild(row);
        });
        
        // Submit button
        const submitBtn = document.createElement('button');
        submitBtn.className = 'multi-submit-btn';
        submitBtn.textContent = 'Submit All';
        submitBtn.addEventListener('click', () => {
            if (this.results[problemNum] !== null) return;
            this.checkMultiInput(problemNum, problem);
        });
        container.appendChild(submitBtn);
    },

    checkMultiInput(problemNum, problem) {
        let allCorrect = true;
        
        problem.fields.forEach(field => {
            const input = document.getElementById(`input-${problemNum}-${field}`);
            const feedback = document.getElementById(`feedback-${problemNum}-${field}`);
            const value = parseInt(input.value, 10);
            const correct = value === problem.answers[field];
            
            input.disabled = true;
            
            if (correct) {
                input.classList.add('correct');
                feedback.textContent = '✓';
                feedback.style.color = '#7cb87c';
            } else {
                input.classList.add('incorrect');
                feedback.textContent = `✗ (${problem.answers[field]}°)`;
                feedback.style.color = '#c87c7c';
                allCorrect = false;
            }
        });
        
        this.results[problemNum] = allCorrect;
        
        // Disable submit button
        const submitBtn = document.querySelector(`#problem${problemNum}-container .multi-submit-btn`);
        if (submitBtn) submitBtn.disabled = true;
        
        this.showFeedback(problemNum, allCorrect, problem);
        App.updateProgress();
    },

    // ============================================
    // FEEDBACK DISPLAY
    // ============================================
    showFeedback(problemNum, isCorrect, problem) {
        const feedbackBox = document.getElementById(`problem${problemNum}-feedback`);
        if (!feedbackBox) return;
        
        feedbackBox.classList.remove('hidden', 'correct', 'incorrect');
        
        if (isCorrect) {
            feedbackBox.classList.add('correct');
            feedbackBox.textContent = 'Correct.';
        } else {
            feedbackBox.classList.add('incorrect');
            let answerText = '';
            if (problem.type === 'multi-input') {
                answerText = `The answers are: ${Object.entries(problem.answers).map(([k, v]) => `∠${k} = ${v}°`).join(', ')}`;
            } else {
                answerText = `The answer is ${problem.answer}${problem.unit}.`;
            }
            feedbackBox.innerHTML = `${answerText}<br><span class="text-sm" style="opacity: 0.85">${problem.explanation}</span>`;
        }
    },

    // ============================================
    // RESULTS CALCULATION
    // ============================================
    getResults() {
        let correct = 0;
        let answered = 0;
        const missed = [];
        
        for (let i = 1; i <= this.totalProblems; i++) {
            if (this.results[i] !== null) {
                answered++;
                if (this.results[i]) {
                    correct++;
                } else {
                    missed.push(i);
                }
            }
        }
        
        return {
            correct,
            answered,
            total: this.totalProblems,
            missed,
            sections: {
                warmup: this.getSectionResults(1, 4),
                vertical: this.getSectionResults(5, 8),
                parallel: this.getSectionResults(9, 15),
                combined: this.getSectionResults(16, 19)
            }
        };
    },

    getSectionResults(start, end) {
        let correct = 0;
        let total = 0;
        for (let i = start; i <= end; i++) {
            total++;
            if (this.results[i] === true) correct++;
        }
        return { correct, total };
    },

    // ============================================
    // RESET FOR RETRY
    // ============================================
    resetProblem(problemNum) {
        this.results[problemNum] = null;
        const problem = this.problems[problemNum];
        const container = document.getElementById(`problem${problemNum}-container`);
        const feedbackBox = document.getElementById(`problem${problemNum}-feedback`);
        
        if (feedbackBox) {
            feedbackBox.classList.add('hidden');
            feedbackBox.classList.remove('correct', 'incorrect');
        }
        
        if (container && problem) {
            switch (problem.type) {
                case 'multiple-choice':
                    this.setupMultipleChoice(problemNum, container, problem);
                    break;
                case 'number-input':
                    this.setupNumberInput(problemNum, container, problem);
                    break;
                case 'multi-input':
                    this.setupMultiInput(problemNum, container, problem);
                    break;
            }
        }
    },

    resetAll() {
        for (let i = 1; i <= this.totalProblems; i++) {
            this.resetProblem(i);
        }
    }
};
