// Home Page Card Pile - Navigate to About Page

function initHomeCardPile() {
    const pile = document.getElementById('home-card-pile');

    if (!pile) {
        console.warn('Home card pile container not found');
        return;
    }

    const CARD_COUNT = 6;
    const FRICTION = 0.92;
    const REPEL_STRENGTH = 40;
    const REPEL_MULTIPLIER = 0.03;
    const MAX_DISTANCE = 120;

    const cards = [];
    const velocities = new Map();

    const labels = [
        'About Me',
        'Learn More',
        'My Story',
        'Discover',
        'Click Here',
        'Explore'
    ];

    const icons = ['fa-user', 'fa-heart', 'fa-star', 'fa-lightbulb', 'fa-compass', 'fa-rocket'];

    for (let i = 0; i < CARD_COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'home-pile-card page-link';
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', 'Navigate to About page');
        el.setAttribute('data-page', 'about');

        const offsetX = (Math.random() - 0.5) * 160;
        const offsetY = (Math.random() - 0.5) * 120;
        const rot = (Math.random() - 0.5) * 25;

        el.dataset.baseRot = rot;
        el.style.zIndex = `${i}`;
        el.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rot}deg)`;

        const content = document.createElement('div');
        content.className = 'home-pile-card-content';
        content.innerHTML = `
            <i class="fas ${icons[i]} home-pile-card-icon"></i>
            <div class="home-pile-card-text">${labels[i]}</div>
        `;
        el.appendChild(content);

        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.click();
            }
        });

        el.addEventListener('click', () => {
            if (window.handlePageChange) {
                window.handlePageChange('about');
            } else {
                location.hash = '#about';
            }
        });

        pile.appendChild(el);
        cards.push(el);
        velocities.set(el, { vx: 0, vy: 0 });
    }

    function updatePhysics() {
        cards.forEach(card => {
            const vel = velocities.get(card);
            vel.vx *= FRICTION;
            vel.vy *= FRICTION;
            const MAX_VELOCITY = 10;
            vel.vx = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vel.vx));
            vel.vy = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vel.vy));

            const matrix = new DOMMatrixReadOnly(getComputedStyle(card).transform);
            let tx = matrix.m41;
            let ty = matrix.m42;
            tx += vel.vx;
            ty += vel.vy;

            if (Math.abs(vel.vx) < 0.005) vel.vx = 0;
            if (Math.abs(vel.vy) < 0.005) vel.vy = 0;

            const rot = card.dataset.baseRot;
            card.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
        });
        requestAnimationFrame(updatePhysics);
    }

    setTimeout(updatePhysics, 50);

    let lastMouseMove = 0;
    pile.addEventListener('mousemove', (e) => {
        const now = performance.now();
        if (now - lastMouseMove < 16) return;
        lastMouseMove = now;

        const rect = pile.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cx = cardRect.left + cardRect.width / 2 - rect.left;
            const cy = cardRect.top + cardRect.height / 2 - rect.top;
            const dx = mx - cx;
            const dy = my - cy;
            let dist = Math.hypot(dx, dy);

            const DEAD_ZONE_RADIUS = 70;
            if (dist < DEAD_ZONE_RADIUS) {
                dist = DEAD_ZONE_RADIUS + (dist / DEAD_ZONE_RADIUS) * 10;
            }

            const strength = Math.max(0, 1 - dist / MAX_DISTANCE);
            if (strength <= 0) return;

            const repel = REPEL_STRENGTH * strength;
            const angle = Math.atan2(dy, dx);
            const pushX = -Math.cos(angle) * repel * REPEL_MULTIPLIER;
            const pushY = -Math.sin(angle) * repel * REPEL_MULTIPLIER;

            const vel = velocities.get(card);
            vel.vx += pushX;
            vel.vy += pushY;
        });
    });

    requestAnimationFrame(() => {
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transition = 'opacity 300ms ease';
                card.style.opacity = '1';
            }, 60 * i);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeCardPile);
} else {
    initHomeCardPile();
}
