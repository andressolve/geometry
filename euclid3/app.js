/**
 * Main Application Logic for Lesson 3
 * 
 * Handles:
 * - Navigation dots
 * - Scroll tracking
 * - Canvas initialization
 * - Overall app initialization
 */

const App = {
    totalPages: 10, // Pages 0-9
    currentPage: 0,

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

        // Use Intersection Observer to track which page is visible
        const options = {
            root: scrollContainer,
            threshold: 0.5 // Trigger when 50% of section is visible
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

        // Observe all sections
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
            'canvas-review': () => Diagrams.drawReview(document.getElementById('canvas-review')),
            'canvas-parallel': () => Diagrams.drawParallelLines(document.getElementById('canvas-parallel')),
            'canvas-transversal': () => Diagrams.drawTransversal(document.getElementById('canvas-transversal')),
            'canvas-corresponding': () => Diagrams.drawCorrespondingAngles(document.getElementById('canvas-corresponding')),
            'canvas-alt-interior-def': () => Diagrams.drawAltInteriorDef(document.getElementById('canvas-alt-interior-def')),
            'canvas-alt-interior-proof': () => Diagrams.drawAltInteriorProof(document.getElementById('canvas-alt-interior-proof')),
            'canvas-exercise1': () => Diagrams.drawReference(document.getElementById('canvas-exercise1')),
            'canvas-exercise2': () => Diagrams.drawExercise2(document.getElementById('canvas-exercise2'))
            // Note: canvas-quiz is created dynamically in Quiz.init()
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
    // WINDOW RESIZE HANDLER
    // ============================================
    initResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Redraw canvases on resize to handle DPI changes
                this.initCanvases();
            }, 250);
        });
    },

    // ============================================
    // MAIN INITIALIZATION
    // ============================================
    init() {
        console.log('Initializing Geometry Lesson 3...');

        // Initialize navigation
        this.initNavDots();
        this.initScrollTracking();
        this.initKeyboardNav();

        // Initialize canvases
        this.initCanvases();

        // Initialize exercises and quiz
        Exercises.init();
        Quiz.init();

        // Handle window resize
        this.initResizeHandler();

        console.log('Lesson 3 initialized successfully.');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
