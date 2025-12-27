/**
 * Exercise Logic for Lesson 5: Congruence
 * 
 * Multiple choice with instant feedback.
 */

const Exercises = {
    // Correct answers and feedback
    answers: {
        1: {
            correct: 'b',
            feedback: {
                a: 'Incorrect. Look at the tick marks—all three pairs of sides are marked congruent.',
                b: 'Correct! All three pairs of sides are congruent (shown by tick marks), so △PQR ≅ △STU by SSS.',
                c: 'Incorrect. The tick marks show the sides are congruent, not different.'
            }
        },
        2: {
            correct: 'b',
            feedback: {
                a: 'Incorrect. Remember, BD is a shared side—it\'s congruent to itself!',
                b: 'Correct! AB ≅ CB, AD ≅ CD (given), and BD ≅ BD (shared side). By SSS, △ABD ≅ △CBD.',
                c: 'Incorrect. We have enough information: two marked pairs plus the shared side.'
            }
        },
        3: {
            correct: 'a',
            feedback: {
                a: 'Correct! AB ≅ AD, BC ≅ DC (given), and AC ≅ AC (shared diagonal). By SSS, △ABC ≅ △ADC.',
                b: 'Incorrect. The vertex order matters—corresponding vertices must match.',
                c: 'Incorrect. The triangles share side AC and have two other pairs marked congruent.'
            }
        },
        4: {
            correct: 'b',
            feedback: {
                a: 'Incorrect. Check all the side lengths carefully.',
                b: 'Correct! The third sides are 9 and 10—not equal. SSS requires all three pairs to match.',
                c: 'Incorrect. We haven\'t learned SAS yet, and the sides don\'t all match anyway.'
            }
        }
    },

    /**
     * Initialize exercise feedback listeners
     */
    init() {
        for (let i = 1; i <= 4; i++) {
            const container = document.getElementById(`exercise${i}-container`);
            if (!container) continue;

            // Create feedback box
            const feedbackBox = document.createElement('div');
            feedbackBox.className = 'feedback-box';
            feedbackBox.id = `feedback${i}`;
            container.appendChild(feedbackBox);

            // Add listeners to radio buttons
            const radios = document.querySelectorAll(`input[name="ex${i}"]`);
            radios.forEach(radio => {
                radio.addEventListener('change', () => this.checkAnswer(i, radio.value));
            });
        }
    },

    /**
     * Check answer and show feedback
     */
    checkAnswer(exerciseNum, selectedValue) {
        const feedbackBox = document.getElementById(`feedback${exerciseNum}`);
        if (!feedbackBox) return;

        const answer = this.answers[exerciseNum];
        const isCorrect = selectedValue === answer.correct;
        const feedback = answer.feedback[selectedValue];

        feedbackBox.innerHTML = `
            <div class="${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
                ${feedback}
            </div>
        `;
        feedbackBox.style.display = 'block';
    }
};
