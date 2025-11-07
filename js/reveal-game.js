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
    { id: 1, type: "PROCESS", nvlCode: "NVL-101", icon: revealCardIcons.approach,
       question: "What's my approach?", description: "User-first thinking combined with data-driven decisions." },
    { id: 2, type: "AESTHETIC", nvlCode: "NVL-102", icon: revealCardIcons.style,
       question: "What's my style?", description: "Clean, minimal interfaces with delightful micro-interactions." },
    { id: 3, type: "TECH", nvlCode: "NVL-103", icon: revealCardIcons.build,
       question: "What do I build?", description: "Scalable web apps with React, TypeScript, and modern tooling." },
    { id: 4, type: "SKILL", nvlCode: "NVL-104", icon: revealCardIcons.learn,
       question: "What motivates me?", description: "A constant drive to learn new frameworks and design patterns.", categoryLabel: "LEARN" },
    { id: 5, type: "COLLAB", nvlCode: "NVL-105", icon: revealCardIcons.work,
       question: "How do I work?", description: "Cross-functional collaboration with designers and engineers." },
    { id: 6, type: "GOAL", nvlCode: "NVL-106", icon: revealCardIcons.impact,
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

