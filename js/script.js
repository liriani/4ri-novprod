import { projectsController } from './projects-controller.js';
import { getProjectById } from './projects-data.js';
import { replaceFooterPlaceholder } from './footer-component.js';
import { replaceSocialLinksPlaceholder } from './social-links-component.js';

// Custom Cursor
function initializeCursor() {
    // ...existing code...
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

    // Ensure cursor elements have a known starting position.
    // IMPORTANT: do not set `transform` here; CSS owns transform for centering/scale.
    cursorOuter.style.left = '-9999px';
    cursorOuter.style.top = '-9999px';

    cursorInner.style.left = '-9999px';
    cursorInner.style.top = '-9999px';

    const render = () => {
        rafId = 0;

        // Slight smoothing for the outer ring only (helps feel premium but still responsive)
        outerX += (mouseX - outerX) * 0.25;
        outerY += (mouseY - outerY) * 0.25;

        // Position via left/top so CSS can use transform for scale without overriding translate
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
        // Select all interactive elements including dynamically generated ones
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

    // Watch for dynamic content changes (like project cards being added)
    const observer = new MutationObserver((mutations) => {
        let shouldRefresh = false;
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldRefresh = true;
            }
        });

        if (shouldRefresh) {
            setTimeout(addCursorHoverEffects, 50);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    window.refreshCursorEffects = addCursorHoverEffects;
}

// ============================================================================
// MAIN APPLICATION - Wait for DOM to be ready
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Custom Cursor
    initializeCursor();

    // Initialize Footer Components
    replaceFooterPlaceholder('#footer-placeholder');
    replaceFooterPlaceholder('#about-footer-placeholder');

    // Initialize Social Links Components
    replaceSocialLinksPlaceholder('#about-social-links-placeholder', { centered: false });
    replaceSocialLinksPlaceholder('#contact-social-links-placeholder', { centered: true });

    // Initialize projects system - Projects are automatically rendered by the ProjectsController

    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.remove('dark');
        body.classList.add('light');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        body.classList.toggle('light');
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            localStorage.setItem('theme', 'light');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    });

    // Page Navigation Logic
    const pageLinks = document.querySelectorAll('.page-link');
    const pageContents = document.querySelectorAll('.page-content');

    function showPage(pageId) {
        // Hide all page sections
        pageContents.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
        });

        // Show the selected page section
        const activePage = document.getElementById(`${pageId}-page`);
        if (activePage) {
            activePage.classList.remove('hidden');
            activePage.classList.add('active');
            // Reset scroll position for new page
            window.scrollTo(0, 0);

            // Case pages (project detail) have their own top nav, so hide the global header there
            document.body.classList.toggle('is-case-page', pageId === 'project-detail');

            if (pageId === 'about') {
                const highlights = activePage.querySelectorAll('.highlight-text');
                highlights.forEach((span, index) => {
                    span.classList.remove('auto-reveal');
                    void span.offsetWidth;

                    setTimeout(() => {
                        span.classList.add('auto-reveal');
                    }, index * 200);
                });
            } else {
                const aboutPage = document.getElementById('about-page');
                if (aboutPage) {
                    aboutPage.querySelectorAll('.highlight-text').forEach(span => {
                        span.classList.remove('auto-reveal');
                    });
                }
            }
        }
    }

    // Expose global navigation helper for external scripts (hero pile cards and projects controller)
    window.handlePageChange = function(pageId) {
        window.location.hash = pageId;
        showPage(pageId);
    };

    // Expose showPage function for projects controller
    window.showPage = showPage;

    // Project Detail Page Logic

    function showProjectDetails(projectId) {
        // Use the new modular projects system
        const projectData = getProjectById(projectId);
        if (!projectData) {
            // Handle case where project data is not found
            showPage('projects'); // Go back to projects page
            return;
        }

        // Update the project detail page using the new projects controller
        projectsController.renderProjectDetail(projectId);

        // Switch to the project detail page
        showPage('project-detail');
    }

    // Add event listeners for navigation
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Support project navigation links inside dynamically-rendered case studies
            // (e.g., PREV/NEXT footer uses href="#project-6")
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#project-')) {
                const projectId = href.replace('#project-', '');
                window.location.hash = `project-${projectId}`;
                showProjectDetails(projectId);
                return;
            }

            const pageId = link.dataset.page;
            if (!pageId) return;
            window.location.hash = pageId;
            showPage(pageId);
        });
    });

    // Project cards are now handled by the ProjectsController


    // Modal Logic
    const messageModal = document.getElementById('message-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalCloseButton = document.getElementById('modal-close');

    function showModal(title, content) {
        // Guard: modal might not exist if the contact form/modal was removed
        if (!messageModal || !modalTitle || !modalContent) return;
        modalTitle.textContent = title;
        modalContent.textContent = content;
        messageModal.classList.remove('hidden');
    }

    // Only attach listeners if modal exists
    if (messageModal && modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            messageModal.classList.add('hidden');
        });

        // Close modal on outside click
        messageModal.addEventListener('click', (e) => {
            if (e.target === messageModal) {
                messageModal.classList.add('hidden');
            }
        });
    }

    // Initial page load based on URL hash
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith('project-')) {
            const projectId = hash.split('-')[1];
            showProjectDetails(projectId);
        } else {
            const pageId = hash || 'home';
            showPage(pageId);
        }
    }

    // Listen for hash changes (e.g., browser back/forward)
    window.addEventListener('hashchange', handleHashChange);

    // Initial load
    handleHashChange();


    // Interactive SVG animation logic for the hero section
    const svg = document.getElementById('hero-svg');
    const svgContainer = document.getElementById('hero-svg-container');

    // Guard: if the hero SVG isn't present (or removed/refactored), skip the animation.
    // This prevents runtime crashes that break navigation/cursor.
    if (svg && svgContainer) {
        let mouseX = 0;
        let mouseY = 0;

        // Generate some random shapes
        function createShape(type, count) {
            const shapes = [];
            for (let i = 0; i < count; i++) {
                const shape = document.createElementNS('http://www.w3.org/2000/svg', type);
                shapes.push(shape);
                svg.appendChild(shape);
            }
            return shapes;
        }

        const circles = createShape('circle', 10);
        // const lines = createShape('line', 5); // Lines are static, let's focus on interactive circles

        circles.forEach(circle => {
            circle.setAttribute('r', Math.random() * 20 + 5);
            circle.setAttribute('fill', `rgba(255, 107, 0, ${Math.random() * 0.4 + 0.1})`);
            const x = Math.random() * 600;
            const y = Math.random() * 400;
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.dataset.initialX = x;
            circle.dataset.initialY = y;
            circle.dataset.vx = 0; // Velocity x
            circle.dataset.vy = 0; // Velocity y
        });

        svgContainer.addEventListener('mousemove', (e) => {
            const rect = svg.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                mouseX = (e.clientX - rect.left) * (600 / rect.width);
                mouseY = (e.clientY - rect.top) * (400 / rect.height);
            }
        });

        svgContainer.addEventListener('mouseleave', () => {
            mouseX = -9999; // Move mouse "off-screen"
            mouseY = -9999;
        });

        function animate() {
            circles.forEach(circle => {
                const initialX = parseFloat(circle.dataset.initialX);
                const initialY = parseFloat(circle.dataset.initialY);
                let cx = parseFloat(circle.getAttribute('cx'));
                let cy = parseFloat(circle.getAttribute('cy'));
                let vx = parseFloat(circle.dataset.vx);
                let vy = parseFloat(circle.dataset.vy);

                const dx = mouseX - cx;
                const dy = mouseY - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Repulsion force from mouse
                let repelForce = 0;
                if (dist < 150) { // Repel radius
                    repelForce = (150 - dist) * 0.01;
                }
                const angle = Math.atan2(dy, dx);
                vx -= Math.cos(angle) * repelForce;
                vy -= Math.sin(angle) * repelForce;

                // Spring force to return to origin
                const springForce = 0.01;
                vx += (initialX - cx) * springForce;
                vy += (initialY - cy) * springForce;

                // Damping
                const damping = 0.95;
                vx *= damping;
                vy *= damping;

                // Update position
                cx += vx;
                cy += vy;

                circle.setAttribute('cx', cx);
                circle.setAttribute('cy', cy);
                circle.dataset.vx = vx;
                circle.dataset.vy = vy;
            });
            requestAnimationFrame(animate);
        }

        animate();
    }

    // Hamburger Menu Toggle Logic
    const hamburgerButton = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', () => {
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
            mainNav.classList.toggle('open');
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
            // Toggle body scroll
            body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Close menu when a nav link is clicked (for better mobile UX)
        const navLinks = mainNav.querySelectorAll('.page-link, .sections-link, .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close mobile menu
                mainNav.classList.remove('open');
                hamburgerButton.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
