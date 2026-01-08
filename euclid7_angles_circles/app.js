/**
 * Main Application Logic for Lesson 7: Angles in Circles
 */

const App = {
    totalPages: 11,  // Pages 0-10
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
        // Standard static canvases
        const canvasMap = {
            'canvas-cover': () => Diagrams.drawCover(document.getElementById('canvas-cover')),
            'canvas-page1': () => Diagrams.drawPage1(document.getElementById('canvas-page1')),
            'canvas-page2': () => Diagrams.drawPage2(document.getElementById('canvas-page2')),
            'canvas-page3': () => Diagrams.drawPage3(document.getElementById('canvas-page3')),
            'canvas-page4': () => Diagrams.drawPage4(document.getElementById('canvas-page4')),
            'canvas-page5': () => Diagrams.drawPage5(document.getElementById('canvas-page5')),
            'canvas-page7': () => Diagrams.drawPage7(document.getElementById('canvas-page7')),
            'canvas-page8': () => Diagrams.drawPage8(document.getElementById('canvas-page8')),
            'canvas-page9': () => Diagrams.drawPage9(document.getElementById('canvas-page9')),
            'canvas-page10': () => Diagrams.drawPage10(document.getElementById('canvas-page10'))
        };

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

        // Interactive canvas for page 6 (only init once, not on resize)
        if (!this.interactiveInitialized) {
            const interactiveCanvas = document.getElementById('canvas-interactive');
            if (interactiveCanvas) {
                try {
                    Diagrams.initInteractive(interactiveCanvas);
                    this.interactiveInitialized = true;
                } catch (e) {
                    console.error('Error initializing interactive canvas:', e);
                }
            }
        }
    },

    interactiveInitialized: false,

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // Don't intercept if user is typing in an input
            if (e.target.tagName === 'INPUT') return;

            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    if (this.currentPage < this.totalPages - 1) {
                        this.goToPage(this.currentPage + 1);
                    }
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    if (this.currentPage > 0) {
                        this.goToPage(this.currentPage - 1);
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToPage(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToPage(this.totalPages - 1);
                    break;
            }
        });
    },

    // ============================================
    // RESIZE HANDLER
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
        this.initNavDots();
        this.initScrollTracking();
        this.initCanvases();
        this.initKeyboardNav();
        this.initResizeHandler();

        // Initialize exercises
        if (typeof Exercises !== 'undefined') {
            Exercises.init();
        }

        console.log('Lesson 7: Angles in Circles initialized');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
