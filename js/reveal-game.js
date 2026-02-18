// Interactive Reveal Card Game

const revealCardIcons = {
    approach: 'fa-lightbulb',
    style: 'fa-palette',
    build: 'fa-code',
    learn: 'fa-graduation-cap',
    work: 'fa-users',
    impact: 'fa-rocket',
    skating: 'fa-person-skating',
    gaming: 'fa-gamepad',
    diy: 'fa-hammer'
};

const revealInitialCardsData = [
    {
        id: 1,
        type: "ALIGNMENT",
        nvlCode: "SYS.01",
        icon: revealCardIcons.approach,
        description: "Driven by alignment.\nNot trends.\nIntention matches behavior.",
        titleSize: "lg",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 2,
        type: "STRUCTURE",
        nvlCode: "SYS.02",
        icon: revealCardIcons.style,
        description: "Observing the chaos.\nReorganizing the flow.\nFixing what feels off.",
        titleSize: "md",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 3,
        type: "BUILD",
        nvlCode: "SYS.03",
        icon: revealCardIcons.build,
        description: "Designing behavior.\nCoding the match.\nBridging the gap.",
        titleSize: "xl",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 4,
        type: "LEARN",
        nvlCode: "DAT.01",
        icon: revealCardIcons.learn,
        description: "Curiosity is structural.\nStudying the patterns.\nQuestioning defaults.",
        titleSize: "xl",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 5,
        type: "SYSTEM",
        nvlCode: "SYS.04",
        icon: revealCardIcons.work,
        description: "Logic meets aesthetics.\nDesign meets engineering.",
        titleSize: "lg",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 6,
        type: "MOVEMENT",
        nvlCode: "LOC.01",
        icon: revealCardIcons.skating,
        description: "Clearing the cache.\nIdeas reorganized in motion.\nBarcelona is the grid.",
        titleSize: "md",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 7,
        type: "MECHANICS",
        nvlCode: "LOG.01",
        icon: revealCardIcons.gaming,
        description: "Analyzing game loops.\nUI decisions in play.\nEven fun is a system.",
        titleSize: "md",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 8,
        type: "TACTILE",
        nvlCode: "LOG.02",
        icon: revealCardIcons.diy,
        description: "Pixel perfection on screen.\nPhysical build by hand.\nBalancing the input.",
        titleSize: "lg",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 9,
        type: "RESILIENCE",
        nvlCode: "LEG.01",
        icon: revealCardIcons.impact,
        description: "10 years Pro Tennis.\nFocus under pressure.\nStamina is a skill.",
        titleSize: "md",
        iconSize: "xl",
        descSize: "md"
    },
];

// Global state for reveal cards
let revealCardsState = revealInitialCardsData.map(card => ({
    card,
    isFlipped: false,
    hasAnimated: false
}));

// Store selected mobile cards for the session
let selectedMobileCards = null;

// Mobile detection
function isMobileDevice() {
    return window.innerWidth <= 767;
}

// Get random subset of cards for mobile
function getRandomCards(cards, count) {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Get cards to display based on device
function getCardsToDisplay() {
    if (isMobileDevice()) {
        // On mobile, use stored selection or create new one
        if (!selectedMobileCards) {
            // First time on mobile - select 3 random cards and store them
            const randomCards = getRandomCards(revealInitialCardsData, 3);
            selectedMobileCards = randomCards.map(card => card.id);
        }

        // Return the stored selection with current state
        return selectedMobileCards.map(cardId =>
            revealCardsState.find(s => s.card.id === cardId)
        ).filter(Boolean); // Remove any null/undefined
    }

    // On desktop, show all 9 cards
    selectedMobileCards = null; // Clear mobile selection when on desktop
    return revealCardsState;
}

/**
 * Resets the reveal game state
 */
function resetRevealCards() {
    // Close modal if open
    closeRevealModal();

    // Clear mobile card selection so new random cards are chosen
    selectedMobileCards = null;

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
    iconWrapper.className = 'mb-4';

    const revealedIcon = document.createElement('i');
    const iconSize = card.iconSize || 'xl';
    revealedIcon.className = `fa-solid ${card.icon} card-icon card-icon-${iconSize}`;

    // Animation on first flip - PRESERVED
    if (isFlipped && !hasAnimated) {
        revealedIcon.style.animation = 'reveal-icon-spin 0.6s ease-out';
    }

    iconWrapper.appendChild(revealedIcon);

    // Title
    const title = document.createElement('h2');
    const titleSize = card.titleSize || 'lg';
    title.className = `card-title card-title-${titleSize} mb-2`;
    title.textContent = card.categoryLabel || card.type;

    // Divider
    const divider = document.createElement('div');
    divider.className = 'w-10 h-0.5 bg-[var(--accent)] mx-auto mb-4';

    // Description
    const description = document.createElement('p');
    const descSize = card.descSize || 'md';
    description.className = `card-description card-description-${descSize} px-4`;

    // Handle multi-line descriptions with proper line breaks
    const lines = card.description.split('\n');
    lines.forEach((line, index) => {
        if (index > 0) {
            description.appendChild(document.createElement('br'));
        }
        description.appendChild(document.createTextNode(line));
    });

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
    const cardsToDisplay = getCardsToDisplay();
    const cardData = cardsToDisplay[index];
    if (!cardData) return;

    // Find the actual card in the main state and toggle it
    const actualCardState = revealCardsState.find(s => s.card.id === cardData.card.id);
    if (!actualCardState) return;

    // Toggle flip state
    actualCardState.isFlipped = !actualCardState.isFlipped;

    // Mark as animated if flipped to back for first time
    if (actualCardState.isFlipped && !actualCardState.hasAnimated) {
        actualCardState.hasAnimated = true;
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

    if (!grid || !statusElement || !resetButton) return;

    const cardsToDisplay = getCardsToDisplay();
    const revealedCount = cardsToDisplay.filter(c => c.isFlipped).length;
    const totalCards = cardsToDisplay.length;

    statusElement.textContent = `${revealedCount}/${totalCards} REVEALED`;

    const allRevealed = revealedCount === totalCards;

    resetButton.classList.toggle('hidden', !allRevealed);

    // Show modal when all cards are revealed
    if (allRevealed) {
        setTimeout(() => {
            showRevealModal();
        }, 800);
    }

    grid.innerHTML = '';

    cardsToDisplay.forEach((state, index) => {
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
        // Removed: setTimeout(() => { splashScreen.style.display = 'none'; }, 800);
        // Let CSS handle the collapse with transitions
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
