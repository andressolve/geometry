/**
 * Exercise Logic for Lesson 9: Similar Triangles
 */

const Exercises = {
    // Helper to check numeric input
    checkNumber(exId, correctAnswer, explanation) {
        const input = document.getElementById(`${exId}-input`);
        const btn = document.getElementById(`${exId}-check`);
        const feedback = document.getElementById(`${exId}-feedback`);

        if (!input || !feedback) return;

        const val = parseFloat(input.value);
        if (isNaN(val)) {
            feedback.innerHTML = "Please enter a number.";
            feedback.className = "feedback";
            feedback.classList.remove("hidden");
            return;
        }

        const isCorrect = Math.abs(val - correctAnswer) < 0.1; // Tolerance

        feedback.innerHTML = `
            <strong>${isCorrect ? 'Correct!' : 'Try again.'}</strong>
            <div class="feedback-explanation">${isCorrect ? explanation : ''}</div>
        `;
        feedback.className = `feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedback.classList.remove('hidden');

        if (isCorrect) {
            btn.disabled = true;
            input.disabled = true;
        }
    },

    // ============================================
    // Exercise 1: 3->6 scales by 2. 5->? (10)
    // ============================================
    initEx1() {
        const btn = document.getElementById('ex1-check');
        if (btn) {
            btn.addEventListener('click', () => {
                this.checkNumber('ex1', 10, 'Scale factor is 2 (since 3 × 2 = 6). So 5 × 2 = 10.');
            });
        }
    },

    // ============================================
    // Exercise 2: 4->12 scales by 3. 7->? (21)
    // ============================================
    initEx2() {
        const btn = document.getElementById('ex2-check');
        if (btn) {
            btn.addEventListener('click', () => {
                this.checkNumber('ex2', 21, 'Scale factor is 3 (since 4 × 3 = 12). So 7 × 3 = 21.');
            });
        }
    },

    // ============================================
    // Exercise 3: 10->5 scales by 0.5. 15->? (7.5)
    // ============================================
    initEx3() {
        const btn = document.getElementById('ex3-check');
        if (btn) {
            btn.addEventListener('click', () => {
                this.checkNumber('ex3', 7.5, 'Scale factor is 0.5 (since 10 ÷ 2 = 5). So 15 ÷ 2 = 7.5.');
            });
        }
    },

    // ============================================
    // Exercise 4: 5->15. Factor? (3)
    // ============================================
    initEx4() {
        const btn = document.getElementById('ex4-check');
        if (btn) {
            btn.addEventListener('click', () => {
                this.checkNumber('ex4', 3, '5 × 3 = 15. The scale factor is 3.');
            });
        }
    },

    init() {
        this.initEx1();
        this.initEx2();
        this.initEx3();
        this.initEx4();
    }
};
