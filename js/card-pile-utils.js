// Shared Card Pile Utility - Mouse Avoidance Physics

function createCardPile(config) {
    const {
        containerId,
        cardCount = 6,
        labels,
        icons,
        onClick,
        cardClass = 'pile-card',
        contentClass = 'pile-card-content',
        iconClass = 'pile-card-icon',
        textClass = 'pile-card-text',
        ariaLabel = 'Click card'
    } = config;

    const pile = document.getElementById(containerId);
    if (!pile) { console.warn(`Card pile container #${containerId} not found`); return; }
    // Ensure container anchors absolutely positioned cards
    if (getComputedStyle(pile).position === 'static') {
        pile.style.position = 'relative';
    }

    const FRICTION = 0.92, REPEL_STRENGTH = 40, REPEL_MULTIPLIER = 0.03, MAX_DISTANCE = 120, DEAD_ZONE_RADIUS = 70, MAX_VELOCITY = 10;
    const cards = []; const velocities = new Map();
    let running = true; // controls RAF

    // Responsive spacing adjustments (keep card sizes same, adjust spread only)
    const isMobile = window.innerWidth < 768;
    const spreadX = isMobile ? 100 : 160;  // Tighter horizontal spread on mobile
    const spreadY = isMobile ? 80 : 120;   // Tighter vertical spread on mobile
    const maxRotation = 25; // Keep same rotation for visual consistency

    for (let i = 0; i < cardCount; i++) {
        const el = document.createElement('div');
        // Split multiple classes properly
        const classes = `${cardClass} game-card vertical group`.split(' ').filter(c => c.trim());
        el.className = classes.join(' ');
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', ariaLabel);
        // Anchor each card to the center of the pile
        el.style.position = 'absolute';
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.minHeight = '320px';
        el.style.width = '280px';
        const tx = (Math.random() - 0.5) * 160;
        const ty = (Math.random() - 0.5) * 120;
        const rot = (Math.random() - 0.5) * 25;
        el.dataset.tx = tx;
        el.dataset.ty = ty;
        el.dataset.rot = rot;
        el.style.zIndex = `${i}`;
        // Apply centering transform first, then add random offset
        el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg)`;

        // Build Design System vertical card structure
        const topMeta = document.createElement('div');
        topMeta.className = 'flex justify-between w-full';
        topMeta.innerHTML = `
            <span class="corner-label text-accent">CARD_${String(i + 1).padStart(2, '0')}</span>
            <span class="corner-label">// CLICK ME</span>
        `;

        const mainContent = document.createElement('div');
        mainContent.className = 'text-center flex-1 flex flex-col justify-center';
        mainContent.innerHTML = `
            <div class="mb-6 opacity-80 group-hover:opacity-100 text-[var(--text-main)]">
                <i class="fa-solid ${icons[i % icons.length]} text-5xl"></i>
            </div>
            <h2 class="font-display text-4xl mb-2">${labels[i % labels.length]}</h2>
            <div class="w-8 h-0.5 bg-[var(--accent)] mx-auto mb-4"></div>
            <p class="font-mono text-xs text-[var(--text-muted)]">
                Click to navigate
            </p>
        `;

        const footerMeta = document.createElement('div');
        footerMeta.className = 'flex justify-between w-full items-end';
        footerMeta.innerHTML = `
            <span class="corner-label">EST. 2024</span>
            <i class="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 text-accent"></i>
        `;

        el.appendChild(topMeta);
        el.appendChild(mainContent);
        el.appendChild(footerMeta);

        el.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); onClick(); }});
        el.addEventListener('click', onClick, { passive: true });
        pile.appendChild(el); cards.push(el); velocities.set(el,{vx:0,vy:0});
    }

    function updatePhysics() {
        if (!running) { requestAnimationFrame(updatePhysics); return; }
        cards.forEach(card => {
            const vel = velocities.get(card); vel.vx *= FRICTION; vel.vy *= FRICTION;
            vel.vx = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vel.vx));
            vel.vy = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, vel.vy));
            let tx = parseFloat(card.dataset.tx);
            let ty = parseFloat(card.dataset.ty);
            tx += vel.vx; ty += vel.vy;
            if (Math.abs(vel.vx) < 0.005) vel.vx = 0; if (Math.abs(vel.vy) < 0.005) vel.vy = 0;
            card.dataset.tx = tx; card.dataset.ty = ty;
            const rot = card.dataset.rot;
            card.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg)`;
        });
        requestAnimationFrame(updatePhysics);
    }
    requestAnimationFrame(updatePhysics);

    let lastMouseMove = 0;

    // Mouse movement handler
    function handlePointerMove(clientX, clientY) {
        const now = performance.now();
        if (now - lastMouseMove < 16) return;
        lastMouseMove = now;

        const rect = pile.getBoundingClientRect();
        const mx = clientX - rect.left;
        const my = clientY - rect.top;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cx = cardRect.left + cardRect.width / 2 - rect.left;
            const cy = cardRect.top + cardRect.height / 2 - rect.top;
            const dx = mx - cx;
            const dy = my - cy;
            let dist = Math.hypot(dx, dy);

            if (dist < DEAD_ZONE_RADIUS) dist = DEAD_ZONE_RADIUS + (dist / DEAD_ZONE_RADIUS) * 10;
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
    }

    // Desktop mouse events
    pile.addEventListener('mousemove', (e) => {
        handlePointerMove(e.clientX, e.clientY);
    }, { passive: true });

    // Mobile touch events - same avoidance logic
    pile.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            handlePointerMove(touch.clientX, touch.clientY);
        }
    }, { passive: true });

    requestAnimationFrame(()=>{ cards.forEach((card,i)=>{ card.style.opacity='0'; setTimeout(()=>{ card.style.transition='opacity 300ms ease'; card.style.opacity='1'; }, 60*i); }); });

    // Pause when pile not visible
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { running = entry.isIntersecting; });
    }, { threshold: 0 });
    io.observe(pile);

    return { stop: ()=>{ running=false; }, start: ()=>{ running=true; }, element: pile };
}

window.createCardPile = createCardPile;
