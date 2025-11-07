// ============================================================================
// HOME PAGE CARD PILE - Navigate to About Page (No Conflicts)
// ============================================================================

/**
 * Initialize the home page card pile
 * Creates a dynamic card pile with mouse avoidance effect that navigates to About
 */
function initHomeCardPile() {
    const pile = document.getElementById('home-card-pile');

    if (!pile) {
        console.warn('Home card pile container not found');
        return;
    }

    const CARD_COUNT = 6; // Smaller pile for home page
    const cards = [];

    // Simple text labels for About page CTA
    const labels = [
        'About Me',
        'Learn More',
        'My Story',
        'Discover',
        'Click Here',
        'Explore'
    ];

    // Icons for variety
    const icons = ['fa-user', 'fa-heart', 'fa-star', 'fa-lightbulb', 'fa-compass', 'fa-rocket'];

    // Create cards with randomized offset and rotation
    for (let i = 0; i < CARD_COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'home-pile-card';
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', 'Navigate to About page');

        el.style.left = '50%';
        el.style.top = '50%';

        const offsetX = Math.round((Math.random() * 80) - 40); // -40..40 (smaller range for home)
        const offsetY = Math.round((Math.random() * 40) - 20); // -20..20
        const rot = Math.round((Math.random() * 30) - 15);     // -15..15 deg

        el.style.transform = `translate(-50%,-50%) translate(${offsetX}px, ${offsetY}px) rotate(${rot}deg)`;
        el.style.zIndex = `${i}`;

        el.dataset.baseX = offsetX;
        el.dataset.baseY = offsetY;
        el.dataset.baseRot = rot;

        // Card content with icon and text
        const content = document.createElement('div');
        content.className = 'home-pile-card-content';
        content.innerHTML = `
            <i class="fas ${icons[i]} home-pile-card-icon"></i>
            <div class="home-pile-card-text">${labels[i]}</div>
        `;

        el.appendChild(content);

        // Click navigates to About page
        el.addEventListener('click', navigateToAbout);

        // Keyboard activation
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToAbout();
            }
        });

        pile.appendChild(el);
        cards.push(el);
    }

    // Navigate to About page function
    function navigateToAbout() {
        // Use the existing page navigation system
        if (window.handlePageChange) {
            window.handlePageChange('about');
        } else {
            // Fallback to hash navigation
            window.location.hash = '#about';
        }
    }

    // Mouse avoidance: cards move away from cursor
    pile.addEventListener('mousemove', (e) => {
        const rect = pile.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const mouseX = e.clientX - cx;
        const mouseY = e.clientY - cy;

        cards.forEach((el) => {
            const baseX = parseFloat(el.dataset.baseX);
            const baseY = parseFloat(el.dataset.baseY);
            const baseRot = parseFloat(el.dataset.baseRot);

            // Get card center position
            const cardRect = el.getBoundingClientRect();
            const cardCenterX = (cardRect.left + cardRect.right) / 2 - cx;
            const cardCenterY = (cardRect.top + cardRect.bottom) / 2 - cy;

            // Distance from cursor to card center
            const dx = cardCenterX - mouseX;
            const dy = cardCenterY - mouseY;
            const dist = Math.hypot(dx, dy);

            // Increased effect radius and stronger repulsion
            const maxEffect = 150; // Same as About page
            const effect = Math.max(0, Math.min(1, (maxEffect - dist) / maxEffect));

            // Stronger movement with exponential falloff
            const intensity = Math.pow(effect, 0.7);
            const moveX = dx * 0.4 * intensity;
            const moveY = dy * 0.3 * intensity;
            const rot = baseRot + moveX * 0.15;

            // Smoother transition
            el.style.transition = 'transform 100ms ease-out';
            el.style.transform = `translate(-50%,-50%) translate(${baseX + moveX}px, ${baseY + moveY}px) rotate(${rot}deg)`;
        });
    });

    pile.addEventListener('mouseleave', () => {
        cards.forEach((el) => {
            const baseX = el.dataset.baseX;
            const baseY = el.dataset.baseY;
            const baseRot = el.dataset.baseRot;

            // Smoother spring-like return
            el.style.transition = 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
            el.style.transform = `translate(-50%,-50%) translate(${baseX}px, ${baseY}px) rotate(${baseRot}deg)`;
        });
    });

    // Entrance animation
    requestAnimationFrame(() => {
        cards.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform += ' scale(0.98)';
            setTimeout(() => {
                el.style.transition = 'opacity 300ms ease, transform 300ms ease';
                el.style.opacity = '1';
                // restore exact base transform after fade
                const baseX = el.dataset.baseX;
                const baseY = el.dataset.baseY;
                const baseRot = el.dataset.baseRot;
                el.style.transform = `translate(-50%,-50%) translate(${baseX}px, ${baseY}px) rotate(${baseRot}deg)`;
            }, 60 * i);
        });
    });
}

// Initialize home card pile when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeCardPile);
} else {
    // DOM already loaded
    initHomeCardPile();
}

