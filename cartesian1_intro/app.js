/**
 * Main Application Logic for Lesson 10: The Cartesian Plane
 */

const App = {
    totalPages: 9,  // Pages 0-8
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
        const canvasMap = {
            'canvas-cover': () => Diagrams.drawCover(document.getElementById('canvas-cover')),
            'canvas-page1': () => Diagrams.drawPage1(document.getElementById('canvas-page1')),
            'canvas-page2': () => Diagrams.drawPage2(document.getElementById('canvas-page2')),
            'canvas-page3': () => Diagrams.drawPage3(document.getElementById('canvas-page3')),
            'canvas-page4': () => Diagrams.drawPage4(document.getElementById('canvas-page4')),
            'canvas-page5': () => Diagrams.drawPage5(document.getElementById('canvas-page5')),
            'canvas-summary': () => Diagrams.drawSummary(document.getElementById('canvas-summary'))
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
    },

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // Don't intercept if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

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
                // Re-init interactive if it exists
                if (typeof Interactive !== 'undefined' && Interactive.canvas) {
                    Interactive.init();
                }
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

        // Initialize interactive
        if (typeof Interactive !== 'undefined') {
            Interactive.init();
        }

        // Initialize exercises
        if (typeof Exercises !== 'undefined') {
            Exercises.init();
        }

        console.log('Lesson 10: The Cartesian Plane initialized');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
