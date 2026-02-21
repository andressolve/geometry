/**
 * Exercise Logic for Lesson 14: Parallel Lines
 *
 * Exercise 1: Same Slope? (Yes/No + follow-up)
 * Exercise 2: Which Lines Are Parallel? (Multiple choice)
 * Exercise 3: Make It Parallel (number input + follow-up multiple choice)
 * Exercise 4: Parallel or Crossing? (4 pairs, button each)
 */

const Exercises = {

    // ============================================
    // Exercise 1: Same Slope?
    // Two lines with same slope (y = 2x and y = 2x + 4), step triangles shown
    // ============================================
    initEx1() {
        const canvas = document.getElementById('canvas-ex1');
        if (!canvas) return;

        this.drawEx1(canvas);

        let partADone = false;

        document.getElementById('ex1-yes').addEventListener('click', () => {
            if (partADone) return;
            partADone = true;

            const feedback = document.getElementById('ex1-feedback');
            feedback.className = 'feedback feedback-correct';
            feedback.innerHTML = '<strong>Yes.</strong> Both lines go right 1, up 2. Same slope.';
            feedback.classList.remove('hidden');

            document.getElementById('ex1-yes').disabled = true;
            document.getElementById('ex1-no').disabled = true;

            // Show follow-up
            setTimeout(() => {
                document.getElementById('ex1-followup').classList.remove('hidden');
            }, 600);
        });

        document.getElementById('ex1-no').addEventListener('click', () => {
            if (partADone) return;

            const feedback = document.getElementById('ex1-feedback');
            feedback.className = 'feedback feedback-incorrect';
            feedback.innerHTML = '<strong>Look again.</strong> Compare the step triangles. How much does each line rise when you go 1 to the right?';
            feedback.classList.remove('hidden');
        });

        // Follow-up: Are they parallel?
        let partBDone = false;

        document.getElementById('ex1b-yes').addEventListener('click', () => {
            if (partBDone) return;
            partBDone = true;

            const feedback = document.getElementById('ex1b-feedback');
            feedback.className = 'feedback feedback-correct';
            feedback.innerHTML = '<strong>Yes.</strong> Same slope means parallel.';
            feedback.classList.remove('hidden');

            document.getElementById('ex1b-yes').disabled = true;
            document.getElementById('ex1b-no').disabled = true;
        });

        document.getElementById('ex1b-no').addEventListener('click', () => {
            if (partBDone) return;

            const feedback = document.getElementById('ex1b-feedback');
            feedback.className = 'feedback feedback-incorrect';
            feedback.innerHTML = '<strong>Not quite.</strong> They have the same slope — do lines with the same slope ever cross?';
            feedback.classList.remove('hidden');
        });
    },

    drawEx1(canvas) {
        const ctx = setupCanvas(canvas, 360, 300);
        const cs = GridUtils.createCoordSystem(360, 300,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: false });
        GridUtils.drawAxisTicks(ctx, cs, { showNumbers: false });

        // y = 2x (blue)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // y = 2x + 4 (green)
        GridUtils.drawLine(ctx, cs, x => 2 * x + 4, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // Step triangle on y = 2x: from (1, 2)
        GridUtils.drawStepTriangle(ctx, cs, 1, 2, 1, 2, {
            color: '#6a82fb', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });

        // Step triangle on y = 2x + 4: from (1, 6)
        GridUtils.drawStepTriangle(ctx, cs, 1, 6, 1, 2, {
            color: '#10b981', lineWidth: 2, dash: [5, 3],
            showLabels: true
        });
    },

    // ============================================
    // Exercise 2: Which Lines Are Parallel?
    // A: y = 2x (blue), B: y = x + 2 (green), C: y = 2x + 4 (orange)
    // Answer: A and C
    // ============================================
    initEx2() {
        const canvas = document.getElementById('canvas-ex2');
        if (!canvas) return;

        this.drawEx2(canvas);

        let answered = false;

        const handleChoice = (choice) => {
            if (answered) return;

            const feedback = document.getElementById('ex2-feedback');

            if (choice === 'ac') {
                answered = true;
                feedback.className = 'feedback feedback-correct';
                feedback.innerHTML = '<strong>A and C.</strong> Both have slope 2. Line B has slope 1 — it goes in a different direction.';
                feedback.classList.remove('hidden');

                document.getElementById('ex2-ab').disabled = true;
                document.getElementById('ex2-ac').disabled = true;
                document.getElementById('ex2-bc').disabled = true;
            } else {
                feedback.className = 'feedback feedback-incorrect';
                feedback.innerHTML = '<strong>Not quite.</strong> Parallel lines have the same slope. Which two equations have the same number in front of x?';
                feedback.classList.remove('hidden');
            }
        };

        document.getElementById('ex2-ab').addEventListener('click', () => handleChoice('ab'));
        document.getElementById('ex2-ac').addEventListener('click', () => handleChoice('ac'));
        document.getElementById('ex2-bc').addEventListener('click', () => handleChoice('bc'));
    },

    drawEx2(canvas) {
        const ctx = setupCanvas(canvas, 360, 300);
        const cs = GridUtils.createCoordSystem(360, 300,
            { xMin: -1, xMax: 5, yMin: -1, yMax: 10 });

        GridUtils.drawGrid(ctx, cs);
        GridUtils.drawAxes(ctx, cs, { showLabels: true });
        GridUtils.drawAxisTicks(ctx, cs);

        // A: y = 2x (blue)
        GridUtils.drawLine(ctx, cs, x => 2 * x, {
            color: Colors.line, lineWidth: 2.5
        });

        // B: y = x + 2 (green)
        GridUtils.drawLine(ctx, cs, x => x + 2, {
            color: Colors.lineGreen, lineWidth: 2.5
        });

        // C: y = 2x + 4 (orange)
        GridUtils.drawLine(ctx, cs, x => 2 * x + 4, {
            color: Colors.lineOrange, lineWidth: 2.5
        });

        // Labels
        ctx.save();
        ctx.font = 'bold italic 13px STIX Two Text, serif';

        const labels = [
            { text: 'A', x: 4, y: 8.2, color: Colors.line },
            { text: 'B', x: 4.2, y: 6.5, color: Colors.lineGreen },
            { text: 'C', x: 2.5, y: 9.3, color: Colors.lineOrange }
        ];

        labels.forEach(l => {
            const pos = cs.toPixel(l.x, l.y);
            const tw = ctx.measureText(l.text).width;
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fillRect(pos.px - 4, pos.py - 11, tw + 8, 22);
            ctx.fillStyle = l.color;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(l.text, pos.px, pos.py);
        });

        ctx.restore();
    },

    // ============================================
    // Exercise 3: Make It Parallel
    // y = 3x → what slope for parallel? (3)
    // Follow-up: which equation is parallel to y = 3x?
    // ============================================
    initEx3() {
        const checkBtn = document.getElementById('ex3-check');
        const input = document.getElementById('ex3-input');
        if (!checkBtn || !input) return;

        let slopeDone = false;

        const checkSlope = () => {
            if (slopeDone) return;

            const feedback = document.getElementById('ex3-feedback');
            const value = parseInt(input.value, 10);

            if (isNaN(value)) {
                feedback.textContent = 'Enter a number.';
                feedback.className = 'feedback';
                feedback.classList.remove('hidden');
                return;
            }

            if (value === 3) {
                slopeDone = true;
                feedback.className = 'feedback feedback-correct';
                feedback.innerHTML = '<strong>Slope 3.</strong> Same slope as y = 3x.';
                feedback.classList.remove('hidden');
                input.disabled = true;
                checkBtn.disabled = true;

                setTimeout(() => {
                    document.getElementById('ex3-followup').classList.remove('hidden');
                }, 600);
            } else {
                feedback.className = 'feedback feedback-incorrect';
                feedback.innerHTML = '<strong>Not quite.</strong> Parallel lines have the same slope. What is the slope of y = 3x?';
                feedback.classList.remove('hidden');
            }
        };

        checkBtn.addEventListener('click', checkSlope);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') checkSlope();
        });

        // Follow-up: which equation?
        let followupDone = false;

        const handleFollowup = (choice) => {
            if (followupDone) return;

            const feedback = document.getElementById('ex3b-feedback');

            if (choice === 'a') {
                followupDone = true;
                feedback.className = 'feedback feedback-correct';
                feedback.innerHTML = '<strong>y = 3x + 5.</strong> It has slope 3 — same as y = 3x. The + 5 just shifts it up.';
                feedback.classList.remove('hidden');

                document.getElementById('ex3-a').disabled = true;
                document.getElementById('ex3-b').disabled = true;
                document.getElementById('ex3-c').disabled = true;
            } else {
                feedback.className = 'feedback feedback-incorrect';
                feedback.innerHTML = '<strong>Not quite.</strong> Look at the number in front of x in each equation. Which one matches the slope of y = 3x?';
                feedback.classList.remove('hidden');
            }
        };

        document.getElementById('ex3-a').addEventListener('click', () => handleFollowup('a'));
        document.getElementById('ex3-b').addEventListener('click', () => handleFollowup('b'));
        document.getElementById('ex3-c').addEventListener('click', () => handleFollowup('c'));
    },

    // ============================================
    // Exercise 4: Parallel or Crossing? (4 pairs)
    // ============================================
    initEx4() {
        const pairs = [
            { id: 'a', correct: 'par' },   // y = 2x and y = 2x + 5 → parallel
            { id: 'b', correct: 'cross' },  // y = 3x and y = x + 3 → crossing
            { id: 'c', correct: 'par' },    // y = 4x + 1 and y = 4x - 2 → parallel
            { id: 'd', correct: 'cross' }   // y = 2x + 1 and y = 3x + 1 → crossing
        ];

        pairs.forEach(pair => {
            const parBtn = document.getElementById(`ex4${pair.id}-par`);
            const crossBtn = document.getElementById(`ex4${pair.id}-cross`);
            const feedback = document.getElementById(`ex4${pair.id}-feedback`);
            if (!parBtn || !crossBtn || !feedback) return;

            let done = false;

            const handle = (answer) => {
                if (done) return;

                if (answer === pair.correct) {
                    done = true;
                    feedback.className = 'text-sm feedback-inline';
                    if (answer === 'par') {
                        feedback.textContent = 'Parallel — same slope.';
                        feedback.style.color = '#065f46';
                    } else {
                        feedback.textContent = 'Crossing — different slopes.';
                        feedback.style.color = '#065f46';
                    }
                    feedback.classList.remove('hidden');
                    parBtn.disabled = true;
                    crossBtn.disabled = true;
                } else {
                    feedback.textContent = 'Look at the slopes again.';
                    feedback.style.color = '#991b1b';
                    feedback.classList.remove('hidden');
                }
            };

            parBtn.addEventListener('click', () => handle('par'));
            crossBtn.addEventListener('click', () => handle('cross'));
        });
    },

    // ============================================
    // Page 4: Contrast (Yes/No — are they parallel?)
    // ============================================
    initContrast() {
        let done = false;

        document.getElementById('contrast-no').addEventListener('click', () => {
            if (done) return;
            done = true;

            const feedback = document.getElementById('contrast-feedback');
            feedback.className = 'feedback feedback-correct';
            feedback.innerHTML = '<strong>No.</strong> They cross. Different slopes — the steeper line catches the other.';
            feedback.classList.remove('hidden');

            document.getElementById('contrast-yes').disabled = true;
            document.getElementById('contrast-no').disabled = true;

            setTimeout(() => {
                document.getElementById('contrast-summary').classList.remove('hidden');
            }, 600);
        });

        document.getElementById('contrast-yes').addEventListener('click', () => {
            if (done) return;

            const feedback = document.getElementById('contrast-feedback');
            feedback.className = 'feedback feedback-incorrect';
            feedback.innerHTML = '<strong>Look at the slopes.</strong> One line has slope 2, the other has slope 1. Are they the same?';
            feedback.classList.remove('hidden');
        });
    },

    init() {
        this.initEx1();
        this.initEx2();
        this.initEx3();
        this.initEx4();
        this.initContrast();
    }
};
