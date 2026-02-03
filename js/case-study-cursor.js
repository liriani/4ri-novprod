// Standalone Custom Cursor Script (No module dependencies)
// For case study pages

(function() {
    'use strict';

    // Mobile Detection - Exit early on mobile/touch devices
    const isMobile = window.innerWidth < 768 ||
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0 ||
                     /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        console.log('📱 Mobile device detected - custom cursor disabled');
        return; // Exit completely on mobile
    }

    // Custom Cursor Initialization
    function initializeCursor() {
        // Prevent multiple initializations
        if (window.__cursorInitialized) return;
        window.__cursorInitialized = true;

        const cursorOuter = document.querySelector('.cursor-outer');
        const cursorInner = document.querySelector('.cursor-inner');

        if (!cursorOuter || !cursorInner) {
            console.warn('Cursor elements not found');
            return;
        }

        let mouseX = 0;
        let mouseY = 0;
        let outerX = 0;
        let outerY = 0;
        let visible = false;
        let rafId = 0;

        // Start hidden until first movement
        cursorOuter.style.opacity = '0';
        cursorInner.style.opacity = '0';

        // Ensure cursor elements have a known starting position
        cursorOuter.style.left = '-9999px';
        cursorOuter.style.top = '-9999px';
        cursorInner.style.left = '-9999px';
        cursorInner.style.top = '-9999px';

        const render = () => {
            rafId = 0;

            // Slight smoothing for the outer ring
            outerX += (mouseX - outerX) * 0.25;
            outerY += (mouseY - outerY) * 0.25;

            // Position via left/top
            cursorOuter.style.left = `${outerX}px`;
            cursorOuter.style.top = `${outerY}px`;

            cursorInner.style.left = `${mouseX}px`;
            cursorInner.style.top = `${mouseY}px`;
        };

        const scheduleRender = () => {
            if (!rafId) rafId = requestAnimationFrame(render);
        };

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!visible) {
                visible = true;
                cursorOuter.style.opacity = '1';
                cursorInner.style.opacity = '1';
                // First frame should sync instantly
                outerX = mouseX;
                outerY = mouseY;
            }

            scheduleRender();
        };

        const onMouseLeave = () => {
            visible = false;
            cursorOuter.style.opacity = '0';
            cursorInner.style.opacity = '0';
        };

        document.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave, { passive: true });

        // Function to add hover effects to interactive elements
        function addCursorHoverEffects() {
            const interactiveElements = document.querySelectorAll('a, button, .project-card, .page-link, .theme-toggle-btn, input, textarea, select, [role="button"], .cursor-pointer, .btn');

            interactiveElements.forEach(el => {
                // Avoid stacking listeners
                if (el.dataset.cursorListener === 'true') return;
                el.dataset.cursorListener = 'true';

                el.addEventListener('mouseenter', () => {
                    cursorOuter.classList.add('link-hover');
                });

                el.addEventListener('mouseleave', () => {
                    cursorOuter.classList.remove('link-hover');
                });
            });
        }

        // Initial setup
        addCursorHoverEffects();

        // Expose for potential re-initialization
        window.refreshCursorEffects = addCursorHoverEffects;
    }

    // Theme Toggle Functionality
    function initializeTheme() {
        const html = document.documentElement;
        const body = document.body;

        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';

        // Apply saved theme
        if (savedTheme === 'light') {
            html.classList.remove('dark');
            html.classList.add('light');
            body.classList.remove('dark');
            body.classList.add('light');
        } else {
            html.classList.add('dark');
            html.classList.remove('light');
            body.classList.add('dark');
            body.classList.remove('light');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeTheme();
            initializeCursor();
        });
    } else {
        // DOM already loaded
        initializeTheme();
        initializeCursor();
    }

})();
