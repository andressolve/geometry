/**
 * Main Application Logic for Lesson 15: Where Lines Meet
 */

const App = {
    totalPages: 7,  // Pages 0-6
    currentPage: 0,

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

    initScrollTracking() {
        const options = { threshold: 0.4 };

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
            if (section) observer.observe(section);
        }
    },

    initCanvases() {
        const staticCanvases = {
            'canvas-cover': () => Diagrams.drawCover(document.getElementById('canvas-cover')),
            'canvas-two-lines': () => Diagrams.drawTwoLines(document.getElementById('canvas-two-lines')),
            'canvas-why': () => Diagrams.drawWhyThatPoint(document.getElementById('canvas-why')),
            'canvas-summary': () => Diagrams.drawSummary(document.getElementById('canvas-summary'))
        };

        Object.entries(staticCanvases).forEach(([id, drawFn]) => {
            const canvas = document.getElementById(id);
            if (canvas) {
                try { drawFn(); }
                catch (e) { console.error(`Error drawing ${id}:`, e); }
            }
        });
    },

    initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    e.preventDefault();
                    if (this.currentPage < this.totalPages - 1) this.goToPage(this.currentPage + 1);
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    if (this.currentPage > 0) this.goToPage(this.currentPage - 1);
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

    initResizeHandler() {
        let timeout;
        window.addEventListener('resize', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.initCanvases();
                ClickToFind.init();
            }, 250);
        });
    },

    init() {
        this.initNavDots();
        this.initScrollTracking();
        this.initCanvases();
        this.initKeyboardNav();
        this.initResizeHandler();

        ClickToFind.init();
        TableFill.init();
        Exercises.init();

        console.log('Lesson 15: Where Lines Meet initialized');
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
