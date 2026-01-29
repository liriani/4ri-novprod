import { projectsController } from './projects-controller.js';
import { getProjectById } from './projects-data.js';

// Custom Cursor
function initializeCursor() {
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');

    if (!cursorOuter || !cursorInner) {
        console.warn('Cursor elements not found');
        return;
    }

    let cursorMouseX = 0;
    let cursorMouseY = 0;
    let isMouseMoving = false;

    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        cursorMouseX = e.clientX;
        cursorMouseY = e.clientY;

        if (!isMouseMoving) {
            isMouseMoving = true;
            cursorOuter.style.opacity = '1';
            cursorInner.style.opacity = '1';
        }

        requestAnimationFrame(() => {
            cursorOuter.style.transform = `translate(${cursorMouseX - cursorOuter.clientWidth / 2}px, ${cursorMouseY - cursorOuter.clientHeight / 2}px)`;
            cursorInner.style.transform = `translate(${cursorMouseX - cursorInner.clientWidth / 2}px, ${cursorMouseY - cursorInner.clientHeight / 2}px)`;
        });
    });

    // Hide cursor when mouse leaves the viewport
    document.addEventListener('mouseleave', () => {
        cursorOuter.style.opacity = '0';
        cursorInner.style.opacity = '0';
    });

    // Function to add hover effects to interactive elements
    function addCursorHoverEffects() {
        // Remove existing listeners first to avoid duplicates
        document.querySelectorAll('[data-cursor-listener]').forEach(el => {
            el.removeAttribute('data-cursor-listener');
        });

        // Select all interactive elements including dynamically generated ones
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .page-link, .theme-toggle-btn, input, textarea, select, [role="button"], .cursor-pointer, .btn');

        interactiveElements.forEach(el => {
            // Mark as having listener to avoid duplicates
            el.setAttribute('data-cursor-listener', 'true');

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
                // Check if any added nodes contain interactive elements
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.matches && (node.matches('a, button, .project-card, .page-link, .theme-toggle-btn, .btn') ||
                            node.querySelector('a, button, .project-card, .page-link, .theme-toggle-btn, .btn'))) {
                            shouldRefresh = true;
                        }
                    }
                });
            }
        });

        if (shouldRefresh) {
            setTimeout(addCursorHoverEffects, 100); // Small delay to ensure elements are ready
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
            const pageId = link.dataset.page;
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
        modalTitle.textContent = title;
        modalContent.textContent = content;
        messageModal.classList.remove('hidden');
    }

    modalCloseButton.addEventListener('click', () => {
        messageModal.classList.add('hidden');
    });

    // Close modal on outside click
    messageModal.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            messageModal.classList.add('hidden');
        }
    });

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

    if(svgContainer) {
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
    }

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
        mainNav.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                hamburgerButton.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });
    }
});
