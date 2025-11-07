// ============================================================================
// INTERACTIVE REVEAL CARD GAME (New Section - No Conflicts)
// ============================================================================

// Use unique variable names prefixed with "reveal" to avoid conflicts
const REVEAL_APP_COLOR = 'var(--accent-color)';

// Icon mapping for each card type
const revealCardIcons = {
    approach: 'fa-lightbulb',
    style: 'fa-palette',
    build: 'fa-code',
    learn: 'fa-graduation-cap',
    work: 'fa-users',
    impact: 'fa-rocket'
};

const revealInitialCardsData = [
    { id: 1, type: "PROCESS", nvlCode: "LIRI.", icon: revealCardIcons.approach,
       question: "What's my approach?", description: "User-first thinking combined with data-driven decisions." },
    { id: 2, type: "AESTHETIC", nvlCode: "LIRI.", icon: revealCardIcons.style,
       question: "What's my style?", description: "Clean, minimal interfaces with delightful micro-interactions." },
    { id: 3, type: "TECH", nvlCode: "LIRI.", icon: revealCardIcons.build,
       question: "What do I build?", description: "Scalable web apps with React, TypeScript, and modern tooling." },
    { id: 4, type: "SKILL", nvlCode: "LIRI.", icon: revealCardIcons.learn,
       question: "What motivates me?", description: "A constant drive to learn new frameworks and design patterns.", categoryLabel: "LEARN" },
    { id: 5, type: "COLLAB", nvlCode: "LIRI.", icon: revealCardIcons.work,
       question: "How do I work?", description: "Cross-functional collaboration with designers and engineers." },
    { id: 6, type: "GOAL", nvlCode: "LIRI.", icon: revealCardIcons.impact,
       question: "What's my goal?", description: "To create products that solve real problems for large user bases.", categoryLabel: "IMPACT" },
];

// Global state for reveal cards
let revealCardsState = revealInitialCardsData.map(card => ({
    card,
    isFlipped: false,
    hasAnimated: false
}));

/**
 * Creates a FontAwesome icon element
 */
function createRevealIcon(iconClass, isAnimating = false) {
    const icon = document.createElement('i');
    icon.className = `fas ${iconClass}`;
    icon.style.fontSize = '2rem';
    icon.style.color = 'var(--primary-dark)';

    if (isAnimating) {
        icon.classList.add('reveal-icon-animated');
    }

    return icon;
}

function getRevealedCardCount() {
    return revealCardsState.filter(c => c.isFlipped).length;
}

/**
 * Resets the reveal game state
 */
function resetRevealCards() {
    // Close modal if open
    closeRevealModal();

    // Reset all cards
    revealCardsState = revealCardsState.map(state => ({
        ...state,
        isFlipped: false,
        hasAnimated: false
    }));
    renderRevealGrid();
}

// Make reset function available globally
window.resetRevealCards = resetRevealCards;

/**
 * Renders a single reveal game card - PROJECT CARD STYLE
 */
function renderRevealGameCard(cardState, index) {
    const { card, isFlipped, hasAnimated } = cardState;

    // Create outer container
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add("reveal-perspective-1000");

    // Create inner container
    const cardInner = document.createElement('div');
    cardInner.classList.add("reveal-card-inner");
    cardInner.id = `reveal-card-inner-${index}`;

    if (isFlipped) {
        cardInner.classList.add('is-flipped');
    }

    // Click Handler - use addEventListener for better control
    cardInner.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        handleRevealCardClick(index);
    });

    // Touch support for mobile
    cardInner.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleRevealCardClick(index);
    });

    // === CARD FRONT (matches project-card-front) ===
    const cardFront = document.createElement('div');
    cardFront.classList.add("reveal-card-face");

    // Icon circle container (matches project-logo)
    const iconCircle = document.createElement('div');
    iconCircle.classList.add('reveal-icon-circle');
    iconCircle.appendChild(createRevealIcon(card.icon, false));

    // Card title (matches project card-title)
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('reveal-card-title');
    cardTitle.textContent = card.categoryLabel || card.type;

    // Corner labels
    const topLabel = document.createElement('div');
    topLabel.classList.add('reveal-corner-label');
    topLabel.style.position = 'absolute';
    topLabel.style.top = '1rem';
    topLabel.style.left = '1rem';
    topLabel.textContent = card.nvlCode;

    const bottomLabel = document.createElement('div');
    bottomLabel.classList.add('reveal-corner-label');
    bottomLabel.style.position = 'absolute';
    bottomLabel.style.bottom = '1rem';
    bottomLabel.style.right = '1rem';
    bottomLabel.style.textTransform = 'uppercase';
    bottomLabel.style.letterSpacing = '0.05em';
    bottomLabel.textContent = 'Click to reveal';

    cardFront.appendChild(topLabel);
    cardFront.appendChild(iconCircle);
    cardFront.appendChild(cardTitle);
    cardFront.appendChild(bottomLabel);

    // === CARD BACK (revealed state) ===
    const cardBack = document.createElement('div');
    cardBack.classList.add("reveal-card-face", "reveal-card-back");

    // Icon circle with animation on first flip
    const backIconCircle = document.createElement('div');
    backIconCircle.classList.add('reveal-icon-circle');
    backIconCircle.appendChild(createRevealIcon(card.icon, isFlipped && !hasAnimated));

    // Question
    const question = document.createElement('p');
    question.classList.add('reveal-card-title');
    question.textContent = card.question;

    // Description
    const description = document.createElement('p');
    description.textContent = card.description;

    // Back corner labels
    const backTopLabel = document.createElement('div');
    backTopLabel.classList.add('reveal-corner-label');
    backTopLabel.style.position = 'absolute';
    backTopLabel.style.top = '1rem';
    backTopLabel.style.left = '1rem';
    backTopLabel.textContent = card.nvlCode;

    const backBottomLabel = document.createElement('div');
    backBottomLabel.classList.add('reveal-corner-label');
    backBottomLabel.style.position = 'absolute';
    backBottomLabel.style.bottom = '1rem';
    backBottomLabel.style.right = '1rem';
    backBottomLabel.style.textTransform = 'uppercase';
    backBottomLabel.style.letterSpacing = '0.05em';
    backBottomLabel.textContent = card.categoryLabel || card.type;

    cardBack.appendChild(backTopLabel);
    cardBack.appendChild(backIconCircle);
    cardBack.appendChild(question);
    cardBack.appendChild(description);
    cardBack.appendChild(backBottomLabel);

    // Assemble
    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    cardWrapper.appendChild(cardInner);

    return cardWrapper;
}

/**
 * Handles click event on a reveal card
 */
function handleRevealCardClick(index) {
    const cardData = revealCardsState[index];
    if (!cardData) return;

    // Toggle flip state
    cardData.isFlipped = !cardData.isFlipped;

    // Mark as animated if flipped to back for first time
    if (cardData.isFlipped && !cardData.hasAnimated) {
        cardData.hasAnimated = true;
    }

    // Re-render the grid to show changes
    renderRevealGrid();
}

/**
 * Renders all reveal cards
 */
function renderRevealGrid() {
    const grid = document.getElementById('reveal-card-grid');
    const statusElement = document.getElementById('reveal-status');
    const ctaCard = document.getElementById('reveal-cta-card');
    const resetButton = document.getElementById('reveal-reset-button');
    const revealedCount = getRevealedCardCount();

    if (!grid || !statusElement || !ctaCard || !resetButton) return;

    statusElement.textContent = `${revealedCount}/${revealCardsState.length} REVEALED`;

    const allRevealed = revealedCount === revealCardsState.length;

    ctaCard.classList.toggle('hidden', !allRevealed);
    resetButton.classList.toggle('hidden', !allRevealed);

    // Show modal when all cards are revealed
    if (allRevealed) {
        setTimeout(() => {
            showRevealModal();
        }, 800); // Delay to let the last card flip animation finish
    }

    grid.innerHTML = '';

    revealCardsState.forEach((state, index) => {
        grid.appendChild(renderRevealGameCard(state, index));
    });
}

// Initialize reveal card game when About page is shown
const revealAboutPageObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'about-page' && !mutation.target.classList.contains('hidden')) {
            renderRevealGrid();
        }
    });
});

// Start observing the about page for reveal game
const revealAboutPage = document.getElementById('about-page');
if (revealAboutPage) {
    revealAboutPageObserver.observe(revealAboutPage, { attributes: true, attributeFilter: ['class'] });
    // Initial render if page is already visible
    if (!revealAboutPage.classList.contains('hidden')) {
        renderRevealGrid();
    }
}

// Add click handler for reset button
document.getElementById('reveal-reset-button')?.addEventListener('click', resetRevealCards);

// ============================================================================
// REVEAL GAME MODAL FUNCTIONS
// ============================================================================

/**
 * Creates a heart pixel icon for the modal
 */
function createHeartPixelIcon() {
    const heartPixels = [
        [0, 1, 1, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0]
    ];

    // Create SVG container
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const size = 10;
    const rows = heartPixels.length;
    const cols = heartPixels[0].length;

    svg.setAttribute("width", cols * size);
    svg.setAttribute("height", rows * size);
    svg.setAttribute("viewBox", `0 0 ${cols * size} ${rows * size}`);
    svg.style.display = "inline-block";

    // Create pixels
    heartPixels.forEach((row, rowIndex) => {
        row.forEach((pixel, colIndex) => {
            if (pixel === 1) {
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                const cx = colIndex * size + size / 2;
                const cy = rowIndex * size + size / 2;

                circle.setAttribute("cx", cx);
                circle.setAttribute("cy", cy);
                circle.setAttribute("r", size / 2.5);
                circle.setAttribute("fill", "var(--accent-color)");

                // Add animation
                circle.style.animation = "reveal-icon-pop 0.15s ease-out backwards";
                circle.style.animationDelay = `${(rowIndex * cols + colIndex) * 0.03}s`;

                svg.appendChild(circle);
            }
        });
    });

    return svg;
}

/**
 * Shows the modal when all cards are revealed
 */
function showRevealModal() {
    const modalBackdrop = document.getElementById('reveal-cta-modal-backdrop');
    const modalIconContainer = document.getElementById('reveal-modal-icon');

    if (!modalBackdrop || !modalIconContainer) {
        console.warn('Modal elements not found');
        return;
    }

    // Clear and add heart icon
    modalIconContainer.innerHTML = '';
    modalIconContainer.appendChild(createHeartPixelIcon());

    // Show modal with animation
    modalBackdrop.classList.add('active');
    document.body.classList.add('reveal-modal-open');
}

/**
 * Closes the modal
 */
function closeRevealModal() {
    const modalBackdrop = document.getElementById('reveal-cta-modal-backdrop');

    if (modalBackdrop) {
        modalBackdrop.classList.remove('active');
        document.body.classList.remove('reveal-modal-open');
    }

    // Optionally reset the game
    // resetRevealCards();
}

// Make closeRevealModal available globally
window.closeRevealModal = closeRevealModal;

// ============================================================================
// SPLASH SCREEN INITIALIZATION
// ============================================================================

/**
 * Initialize the splash screen for the reveal game
 * Creates a dynamic card pile with mouse avoidance effect
 */
function initRevealGameSplash() {
    const splashScreen = document.getElementById('reveal-splash-screen');
    const gameContent = document.getElementById('reveal-game-content');
    const pile = document.getElementById('reveal-card-pile');

    if (!splashScreen || !gameContent || !pile) {
        console.warn('Splash screen elements not found');
        return;
    }

    const CARD_COUNT = 8;
    const cards = [];

    // Icon options for variety
    const icons = ['fa-lightbulb', 'fa-palette', 'fa-code', 'fa-graduation-cap', 'fa-users', 'fa-rocket', 'fa-star', 'fa-heart'];

    // Create cards with randomized offset and rotation
    for (let i = 0; i < CARD_COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'reveal-pile-card';
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', 'Click to start reveal game');

        el.style.left = '50%';
        el.style.top = '50%';

        const offsetX = Math.round((Math.random() * 120) - 60); // -60..60
        const offsetY = Math.round((Math.random() * 60) - 30);  // -30..30
        const rot = Math.round((Math.random() * 40) - 20);      // -20..20 deg

        el.style.transform = `translate(-50%,-50%) translate(${offsetX}px, ${offsetY}px) rotate(${rot}deg)`;
        el.style.zIndex = `${i}`;

        el.dataset.baseX = offsetX;
        el.dataset.baseY = offsetY;
        el.dataset.baseRot = rot;

        // Card content with icon
        const content = document.createElement('div');
        content.className = 'reveal-pile-card-content';
        content.innerHTML = `
            <i class="fas ${icons[i % icons.length]} reveal-pile-card-icon"></i>
            <div class="reveal-pile-card-text">Discover</div>
        `;

        el.appendChild(content);

        // Click starts the game
        el.addEventListener('click', startRevealGame);

        // Keyboard activation
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                startRevealGame();
            }
        });

        pile.appendChild(el);
        cards.push(el);
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
            const maxEffect = 150; // Increased from 60 to 150 for wider range
            const effect = Math.max(0, Math.min(1, (maxEffect - dist) / maxEffect));

            // Stronger movement with exponential falloff for more natural feel
            const intensity = Math.pow(effect, 0.7); // Exponential curve makes movement smoother
            const moveX = dx * 0.4 * intensity; // Increased from 0.12 to 0.4 for stronger horizontal push
            const moveY = dy * 0.3 * intensity; // Increased from 0.06 to 0.3 for stronger vertical push
            const rot = baseRot + moveX * 0.15; // Increased from 0.08 to 0.15 for more visible rotation

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

            // Smoother spring-like return with slight overshoot
            el.style.transition = 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)'; // Spring easing
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

    function startRevealGame() {
        // Hide splash screen
        splashScreen.classList.add('hidden');

        // Show game content after brief delay
        setTimeout(() => {
            gameContent.classList.add('active');
        }, 300);

        // Remove splash screen from DOM after animation
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    }
}

// Initialize splash screen when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRevealGameSplash);
} else {
    // DOM already loaded
    initRevealGameSplash();
}

// ============================================================================
// UPDATE RENDER GRID TO SHOW MODAL
// ============================================================================
