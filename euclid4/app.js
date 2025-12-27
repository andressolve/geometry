/**
 * Main Application Logic for Lesson 4: Practice Session
 * 
 * Handles:
 * - Navigation dots
 * - Scroll tracking
 * - Progress bar updates
 * - Canvas initialization
 * - Results summary
 * - Retry functionality
 */

const App = {
    totalPages: 20, // Pages 0-19 (cover + 18 problems + results)
    currentPage: 0,
    problemPages: { start: 1, end: 18 }, // Problem pages are 1-18
    resultsPage: 19,

    // ============================================
    // PROGRESS BAR
    // ============================================
    updateProgress() {
        const results = Exercises.getResults();
        const progress = (results.answered / results.total) * 100;
        
        // Update progress bar
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.setProperty('--progress', `${progress}%`);
        }
        
        // Update progress text
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            if (results.answered === results.total) {
                progressText.textContent = `Complete! ${results.correct}/${results.total}`;
            } else {
                const currentProblem = Math.min(results.answered + 1, results.total);
                progressText.textContent = `Problem ${currentProblem} of ${results.total}`;
            }
        }
        
        // Update nav dots
        this.updateNavDotStates();
        
        // Check if all problems are answered
        if (results.answered === results.total) {
            this.showResults();
        }
    },

    // ============================================
    // NAVIGATION DOTS
    // ============================================
    initNavDots() {
        const container = document.getElementById('nav-dots');
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < this.totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to page ${i}`);
            dot.addEventListener('click', () => this.goToPage(i));
            container.appendChild(dot);
        }
    },

    updateNavDots(pageIndex) {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === pageIndex);
        });
    },

    updateNavDotStates() {
        const dots = document.querySelectorAll('.nav-dot');
        const results = Exercises.results;
        
        dots.forEach((dot, i) => {
            // Remove previous state classes (except active)
            dot.classList.remove('completed', 'missed');
            
            // Pages 1-19 are problems
            if (i >= 1 && i <= 19) {
                const problemNum = i;
                if (results[problemNum] === true) {
                    dot.classList.add('completed');
                } else if (results[problemNum] === false) {
                    dot.classList.add('missed');
                }
            }
        });
    },

    goToPage(pageIndex) {
        const section = document.getElementById(`page-${pageIndex}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },

    // ============================================
    // SCROLL TRACKING
    // ============================================
    initScrollTracking() {
        const scrollContainer = document.getElementById('scroll-container');
        if (!scrollContainer) return;

        const options = {
            root: scrollContainer,
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const pageId = entry.target.id;
                    const pageIndex = parseInt(pageId.replace('page-', ''), 10);
                    if (!isNaN(pageIndex)) {
                        this.currentPage = pageIndex;
                        this.updateNavDots(pageIndex);
                    }
                }
            });
        }, options);

        for (let i = 0; i < this.totalPages; i++) {
            const section = document.getElementById(`page-${i}`);
            if (section) {
                observer.observe(section);
            }
        }
    },

    // ============================================
    // CANVAS INITIALIZATION
    // ============================================
    initCanvases() {
        // Map canvas IDs to their drawing functions
        const canvasMap = {
            'canvas-p1': () => Diagrams.drawProblem1(document.getElementById('canvas-p1')),
            'canvas-p2': () => Diagrams.drawProblem2(document.getElementById('canvas-p2')),
            'canvas-p3': () => Diagrams.drawProblem3(document.getElementById('canvas-p3')),
            'canvas-p4': () => Diagrams.drawProblem4(document.getElementById('canvas-p4')),
            'canvas-p5': () => Diagrams.drawProblem5(document.getElementById('canvas-p5')),
            'canvas-p6': () => Diagrams.drawProblem6(document.getElementById('canvas-p6')),
            'canvas-p7': () => Diagrams.drawProblem7(document.getElementById('canvas-p7')),
            'canvas-p8': () => Diagrams.drawProblem8(document.getElementById('canvas-p8')),
            'canvas-p9': () => Diagrams.drawProblem9(document.getElementById('canvas-p9')),
            'canvas-p10': () => Diagrams.drawProblem10(document.getElementById('canvas-p10')),
            'canvas-p11': () => Diagrams.drawProblem11(document.getElementById('canvas-p11')),
            'canvas-p12': () => Diagrams.drawProblem12(document.getElementById('canvas-p12')),
            'canvas-p13': () => Diagrams.drawProblem13(document.getElementById('canvas-p13')),
            'canvas-p14': () => Diagrams.drawProblem14(document.getElementById('canvas-p14')),
            'canvas-p15': () => Diagrams.drawProblem15(document.getElementById('canvas-p15')),
            'canvas-p16': () => Diagrams.drawProblem16(document.getElementById('canvas-p16')),
            'canvas-p17': () => Diagrams.drawProblem17(document.getElementById('canvas-p17')),
            'canvas-p18': () => Diagrams.drawProblem18(document.getElementById('canvas-p18'))
        };

        // Draw all canvases
        Object.entries(canvasMap).forEach(([id, drawFn]) => {
            const canvas = document.getElementById(id);
            if (canvas) {
                try {
                    drawFn();
                } catch (e) {
                    console.error(`Error drawing canvas ${id}:`, e);
                }
            }
        });
    },

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // Don't navigate if user is typing in an input
            if (e.target.tagName === 'INPUT') return;
            
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                if (this.currentPage < this.totalPages - 1) {
                    this.goToPage(this.currentPage + 1);
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                if (this.currentPage > 0) {
                    this.goToPage(this.currentPage - 1);
                }
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.goToPage(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.goToPage(this.totalPages - 1);
            }
        });
    },

    // ============================================
    // RESULTS PAGE
    // ============================================
    showResults() {
        const results = Exercises.getResults();
        const summaryDiv = document.getElementById('results-summary');
        const breakdownDiv = document.getElementById('results-breakdown');
        const retryBtn = document.getElementById('retry-missed-btn');
        const restartBtn = document.getElementById('restart-btn');
        
        if (!summaryDiv) return;
        
        // Determine result class
        const percentage = (results.correct / results.total) * 100;
        let resultClass = 'needs-practice';
        let resultMessage = 'Keep practicing!';
        
        if (percentage >= 90) {
            resultClass = 'excellent';
            resultMessage = 'Excellent work!';
        } else if (percentage >= 70) {
            resultClass = 'good';
            resultMessage = 'Good progress!';
        }
        
        // Update summary
        summaryDiv.className = `results-box ${resultClass}`;
        summaryDiv.innerHTML = `
            <div class="results-score">${results.correct} / ${results.total}</div>
            <div class="results-label">${resultMessage}</div>
        `;
        
        // Update breakdown
        if (breakdownDiv) {
            breakdownDiv.innerHTML = `
                <div class="breakdown-section">
                    <h4>Warm-Up</h4>
                    <div class="score">${results.sections.warmup.correct}/${results.sections.warmup.total}</div>
                </div>
                <div class="breakdown-section">
                    <h4>Vertical Angles</h4>
                    <div class="score">${results.sections.vertical.correct}/${results.sections.vertical.total}</div>
                </div>
                <div class="breakdown-section">
                    <h4>Parallel Lines</h4>
                    <div class="score">${results.sections.parallel.correct}/${results.sections.parallel.total}</div>
                </div>
                <div class="breakdown-section">
                    <h4>Combined</h4>
                    <div class="score">${results.sections.combined.correct}/${results.sections.combined.total}</div>
                </div>
            `;
        }
        
        // Show/hide retry button
        if (retryBtn) {
            if (results.missed.length > 0) {
                retryBtn.classList.remove('hidden');
                retryBtn.textContent = `Retry ${results.missed.length} Missed Problem${results.missed.length > 1 ? 's' : ''}`;
                retryBtn.onclick = () => this.retryMissed(results.missed);
            } else {
                retryBtn.classList.add('hidden');
            }
        }
        
        // Restart button
        if (restartBtn) {
            restartBtn.onclick = () => this.restartAll();
        }
    },

    retryMissed(missedProblems) {
        // Reset only missed problems
        missedProblems.forEach(num => {
            Exercises.resetProblem(num);
        });
        
        // Update progress
        this.updateProgress();
        
        // Go to first missed problem
        if (missedProblems.length > 0) {
            this.goToPage(missedProblems[0]);
        }
    },

    restartAll() {
        // Reset all problems
        Exercises.resetAll();
        
        // Reset progress bar
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.setProperty('--progress', '0%');
        }
        
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.textContent = 'Problem 1 of 19';
        }
        
        // Update nav dots
        this.updateNavDotStates();
        
        // Go to first problem
        this.goToPage(1);
    },

    // ============================================
    // WINDOW RESIZE HANDLER
    // ============================================
    initResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.initCanvases();
            }, 250);
        });
    },

    // ============================================
    // MAIN INITIALIZATION
    // ============================================
    init() {
        console.log('Initializing Lesson 4: Practice Session...');

        // Initialize navigation
        this.initNavDots();
        this.initScrollTracking();
        this.initKeyboardNav();

        // Initialize canvases
        this.initCanvases();

        // Initialize exercises
        Exercises.init();

        // Handle window resize
        this.initResizeHandler();

        // Initial progress update
        this.updateProgress();

        console.log('Lesson 4 initialized successfully.');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
