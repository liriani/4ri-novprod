// Interactive Reveal Card Game

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
 * Renders a single reveal game card - Design System v1.3 Vertical Reveal (Flip)
 */
function renderRevealGameCard(cardState, index) {
    const { card, isFlipped, hasAnimated } = cardState;

    // Flip Wrapper (Perspective)
    const flipWrapper = document.createElement('div');
    flipWrapper.classList.add("flip-wrapper");

    // Flip Inner
    const flipInner = document.createElement('div');
    flipInner.classList.add("flip-inner");
    flipInner.id = `reveal-card-inner-${index}`;

    if (isFlipped) {
        flipInner.classList.add('is-flipped');
    }

    // Click Handler - PRESERVED
    flipInner.addEventListener('click', (e) => {
        e.stopPropagation();
        handleRevealCardClick(index);
    });

    // Touch support - PRESERVED
    flipInner.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleRevealCardClick(index);
    });

    // === SIDE A: COVER (HEAD) - LOCKED/CLASSIFIED ===
    const coverFace = document.createElement('div');
    coverFace.classList.add("flip-face", "cover");

    // Top corner
    const topCorner = document.createElement('div');
    topCorner.className = 'flex justify-between w-full';
    const lockedLabel = document.createElement('span');
    lockedLabel.className = 'corner-label text-accent';
    lockedLabel.textContent = 'LOCKED';
    topCorner.appendChild(lockedLabel);

    // Center - Lock icon + CLASSIFIED (with auto margins to center vertically)
    const centerContent = document.createElement('div');
    centerContent.className = 'flex flex-col items-center justify-center flex-1 my-auto';

    const iconCircle = document.createElement('div');
    iconCircle.className = 'w-20 h-20 rounded-full border-2 border-gray-800 flex items-center justify-center mb-4';

    const lockIcon = document.createElement('i');
    lockIcon.className = 'fa-solid fa-lock text-2xl text-gray-500';
    iconCircle.appendChild(lockIcon);

    const classifiedTitle = document.createElement('h3');
    classifiedTitle.className = 'font-display text-3xl tracking-widest text-gray-500';
    classifiedTitle.textContent = 'CLASSIFIED';

    centerContent.appendChild(iconCircle);
    centerContent.appendChild(classifiedTitle);

    // Bottom - Decrypt message
    const bottomBorder = document.createElement('div');
    bottomBorder.className = 'w-full text-center border-t-2 border-gray-800 pt-4';

    const decryptMsg = document.createElement('p');
    decryptMsg.className = 'font-mono text-xs text-orange-500 animate-pulse';
    decryptMsg.textContent = '[ CLICK TO DECRYPT ]';
    bottomBorder.appendChild(decryptMsg);

    coverFace.appendChild(topCorner);
    coverFace.appendChild(centerContent);
    coverFace.appendChild(bottomBorder);

    // === SIDE B: CONTENT (FACE) - Standard Vertical Card ===
    const contentFace = document.createElement('div');
    contentFace.classList.add("flip-face", "content", "game-card", "vertical", "group");

    // Top Meta
    const topMeta = document.createElement('div');
    topMeta.className = 'flex justify-between w-full';

    const dataId = document.createElement('span');
    dataId.className = 'corner-label text-accent';
    dataId.textContent = `${card.type}_0${index + 1}`;

    const systemLabel = document.createElement('span');
    systemLabel.className = 'corner-label';
    systemLabel.textContent = '// UNLOCKED';

    topMeta.appendChild(dataId);
    topMeta.appendChild(systemLabel);

    // Main Content
    const mainContent = document.createElement('div');
    mainContent.className = 'text-center flex-1 my-auto';

    // Icon
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'mb-4 opacity-80 group-hover:opacity-100';

    const revealedIcon = document.createElement('i');
    revealedIcon.className = `fa-solid ${card.icon} text-6xl`;

    // Animation on first flip - PRESERVED
    if (isFlipped && !hasAnimated) {
        revealedIcon.style.animation = 'reveal-icon-spin 0.6s ease-out';
    }

    iconWrapper.appendChild(revealedIcon);

    // Title
    const title = document.createElement('h2');
    title.className = 'font-display text-5xl mb-2';
    title.textContent = card.categoryLabel || card.type;

    // Divider
    const divider = document.createElement('div');
    divider.className = 'w-10 h-0.5 bg-[var(--accent)] mx-auto mb-4';

    // Description
    const description = document.createElement('p');
    description.className = 'font-mono text-sm text-[var(--text-muted)] px-6 leading-relaxed';
    description.textContent = card.description;

    mainContent.appendChild(iconWrapper);
    mainContent.appendChild(title);
    mainContent.appendChild(divider);
    mainContent.appendChild(description);

    // Footer Meta
    const footerMeta = document.createElement('div');
    footerMeta.className = 'flex justify-between w-full items-end';

    const yearLabel = document.createElement('span');
    yearLabel.className = 'corner-label';
    yearLabel.textContent = 'EST. 2024';

    const arrow = document.createElement('i');
    arrow.className = 'fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0';

    footerMeta.appendChild(yearLabel);
    footerMeta.appendChild(arrow);

    // Assemble content
    contentFace.appendChild(topMeta);
    contentFace.appendChild(mainContent);
    contentFace.appendChild(footerMeta);

    // Assemble flip (content first, then cover)
    flipInner.appendChild(contentFace);
    flipInner.appendChild(coverFace);
    flipWrapper.appendChild(flipInner);

    return flipWrapper;
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
    const resetButton = document.getElementById('reveal-reset-button');
    const revealedCount = getRevealedCardCount();

    if (!grid || !statusElement || !resetButton) return;

    statusElement.textContent = `${revealedCount}/${revealCardsState.length} REVEALED`;

    const allRevealed = revealedCount === revealCardsState.length;

    resetButton.classList.toggle('hidden', !allRevealed);

    // Show modal when all cards are revealed
    if (allRevealed) {
        setTimeout(() => {
            showRevealModal();
        }, 800);

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

window.closeRevealModal = closeRevealModal;

function initRevealGameSplash() {
    const splashScreen = document.getElementById('reveal-splash-screen');
    const gameContent = document.getElementById('reveal-game-content');

    if (!splashScreen || !gameContent) {
        console.warn('Splash screen elements not found');
        return;
    }

    let started = false;
    function startRevealGame() {
        if (started) return;
        started = true;
        splashScreen.classList.add('hidden');
        setTimeout(() => { gameContent.classList.add('active'); }, 300);
        setTimeout(() => { splashScreen.style.display = 'none'; }, 800);
    }

    const { LABELS, ICONS } = window.CARD_PILE_CONTENT || { LABELS: [], ICONS: [] };
    createCardPile({
        containerId: 'reveal-card-pile',
        cardCount: LABELS.length,
        labels: LABELS,
        icons: ICONS,
        onClick: startRevealGame,
        cardClass: 'home-pile-card',
        contentClass: 'home-pile-card-content',
        iconClass: 'home-pile-card-icon',
        textClass: 'home-pile-card-text',
        ariaLabel: 'Click to start reveal game'
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRevealGameSplash);
} else {
    initRevealGameSplash();
}
