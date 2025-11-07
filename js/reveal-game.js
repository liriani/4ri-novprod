// ============================================================================
// INTERACTIVE REVEAL CARD GAME (New Section - No Conflicts)
// ============================================================================

// Use unique variable names prefixed with "reveal" to avoid conflicts
const REVEAL_APP_COLOR = 'var(--accent-color)';

// Simplified pixel shapes for geometric look
const revealPixelShapes = {
    approach: [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]],
    style: [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
    build: [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
    learn: [[0, 1, 1], [1, 0, 0], [0, 1, 0]],
    work: [[1, 0, 1], [1, 1, 1], [0, 1, 0]],
    impact: [[0, 1, 0], [1, 0, 1], [0, 1, 0]],
};

const revealInitialCardsData = [
    { id: 1, type: "PROCESS", nvlCode: "NVL-101 CE", pixels: revealPixelShapes.approach,
       question: "What's my approach?", description: "User-first thinking combined with data-driven decisions." },
    { id: 2, type: "AESTHETIC", nvlCode: "NVL-102 CE", pixels: revealPixelShapes.style,
       question: "What's my style?", description: "Clean, minimal interfaces with delightful micro-interactions." },
    { id: 3, type: "TECH", nvlCode: "NVL-103 CE", pixels: revealPixelShapes.build,
       question: "What do I build?", description: "Scalable web apps with React, TypeScript, and modern tooling." },
    { id: 4, type: "SKILL", nvlCode: "NVL-104 CE", pixels: revealPixelShapes.learn,
       question: "What motivates me?", description: "A constant drive to learn new frameworks and design patterns.", categoryLabel: "LEARN" },
    { id: 5, type: "COLLAB", nvlCode: "NVL-105 CE", pixels: revealPixelShapes.work,
       question: "How do I work?", description: "Cross-functional collaboration with designers and engineers." },
    { id: 6, type: "GOAL", nvlCode: "NVL-106 CE", pixels: revealPixelShapes.impact,
       question: "What's my goal?", description: "To create products that solve real problems for large user bases.", categoryLabel: "IMPACT" },
];

// Global state for reveal cards
let revealCardsState = revealInitialCardsData.map(card => ({
    card,
    isFlipped: false,
    hasAnimated: false
}));

/**
 * Creates an SVG element representing the pixel icon
 */
function createRevealPixelIcon({ pixels, isAnimating = false, size = 6, color = REVEAL_APP_COLOR }) {
    const rows = pixels.length;
    const cols = pixels[0]?.length || 0;

    if (cols === 0) return document.createElement('div');

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", cols * size);
    svg.setAttribute("height", rows * size);
    svg.setAttribute("viewBox", `0 0 ${cols * size} ${rows * size}`);
    svg.classList.add("inline-block", "shrink-0");

    const allPixelPositions = [];
    pixels.forEach((row, rowIndex) => {
        row.forEach((pixel, colIndex) => {
            if (pixel === 1) {
                allPixelPositions.push({ row: rowIndex, col: colIndex });
            }
        });
    });

    allPixelPositions.forEach((pos, pixelIndex) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        const cx = pos.col * size + size / 2;
        const cy = pos.row * size + size / 2;

        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", size / 2.5);
        circle.setAttribute("fill", color);

        if (isAnimating) {
            circle.classList.add("reveal-pixel-dot");
            const delay = pixelIndex * 0.03;
            circle.style.animationDelay = `${delay}s`;
        }

        svg.appendChild(circle);
    });

    return svg;
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
 * Renders a single reveal game card
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
    cardInner.style.position = 'relative';
    cardInner.style.width = '100%';

    if (isFlipped) {
        cardInner.classList.add('is-flipped');
    }

    // Click Handler
    cardInner.onclick = () => handleRevealCardClick(index);

    // Create Card Front - SIMPLIFIED
    const cardFront = document.createElement('div');
    cardFront.classList.add("reveal-card-face");
    cardFront.style.cursor = 'pointer';

    // Front content structure
    const frontContent = document.createElement('div');
    frontContent.style.display = 'flex';
    frontContent.style.flexDirection = 'column';
    frontContent.style.alignItems = 'center';
    frontContent.style.justifyContent = 'center';
    frontContent.style.flex = '1';
    frontContent.style.width = '100%';

    const frontIconCenter = document.createElement('div');
    frontIconCenter.id = `reveal-front-icon-center-${index}`;
    frontIconCenter.appendChild(createRevealPixelIcon({ pixels: card.pixels, size: 8 }));

    frontContent.appendChild(frontIconCenter);

    // Front corner elements
    const frontSmallIcon = document.createElement('div');
    frontSmallIcon.style.position = 'absolute';
    frontSmallIcon.style.top = '1rem';
    frontSmallIcon.style.right = '1rem';
    frontSmallIcon.style.color = 'var(--accent-color)';
    frontSmallIcon.appendChild(createRevealPixelIcon({ pixels: [[1]], size: 3 }));

    const frontNvlCode = document.createElement('div');
    frontNvlCode.style.position = 'absolute';
    frontNvlCode.style.bottom = '1rem';
    frontNvlCode.style.left = '1rem';
    frontNvlCode.style.fontSize = '0.75rem';
    frontNvlCode.style.fontFamily = 'monospace';
    frontNvlCode.style.color = 'var(--accent-color)';
    frontNvlCode.textContent = card.nvlCode;

    const frontLabel = document.createElement('div');
    frontLabel.style.position = 'absolute';
    frontLabel.style.bottom = '1rem';
    frontLabel.style.right = '1rem';
    frontLabel.style.fontSize = '0.75rem';
    frontLabel.style.fontWeight = 'bold';
    frontLabel.style.letterSpacing = '0.1em';
    frontLabel.style.color = 'var(--accent-color)';
    frontLabel.textContent = card.categoryLabel || card.type;

    cardFront.appendChild(frontContent);
    cardFront.appendChild(frontSmallIcon);
    cardFront.appendChild(frontNvlCode);
    cardFront.appendChild(frontLabel);

    // Create Card Back - SIMPLIFIED
    const cardBack = document.createElement('div');
    cardBack.classList.add("reveal-card-face", "reveal-card-back");
    cardBack.style.cursor = 'pointer';

    // Back content structure
    const backContent = document.createElement('div');
    backContent.style.display = 'flex';
    backContent.style.flexDirection = 'column';
    backContent.style.alignItems = 'center';
    backContent.style.justifyContent = 'center';
    backContent.style.flex = '1';
    backContent.style.width = '100%';
    backContent.style.padding = '0 1rem';
    backContent.style.textAlign = 'center';
    backContent.style.maxWidth = '280px';

    const backIconCenter = document.createElement('div');
    backIconCenter.style.marginBottom = '1.5rem';
    backIconCenter.appendChild(
        createRevealPixelIcon({
            pixels: card.pixels,
            size: 6,
            isAnimating: isFlipped && !hasAnimated
        })
    );

    const backQuestion = document.createElement('p');
    backQuestion.style.fontSize = '1.125rem';
    backQuestion.style.fontWeight = '600';
    backQuestion.style.marginBottom = '0.75rem';
    backQuestion.style.lineHeight = '1.4';
    backQuestion.textContent = card.question;

    const backDescription = document.createElement('p');
    backDescription.style.fontSize = '0.875rem';
    backDescription.style.lineHeight = '1.6';
    backDescription.style.opacity = '0.8';
    backDescription.textContent = card.description;

    backContent.appendChild(backIconCenter);
    backContent.appendChild(backQuestion);
    backContent.appendChild(backDescription);

    // Back corner elements
    const backSmallIcon = document.createElement('div');
    backSmallIcon.style.position = 'absolute';
    backSmallIcon.style.top = '1rem';
    backSmallIcon.style.right = '1rem';
    backSmallIcon.style.color = 'var(--accent-color)';
    backSmallIcon.appendChild(createRevealPixelIcon({ pixels: [[1]], size: 3 }));

    const backNvlCode = document.createElement('div');
    backNvlCode.style.position = 'absolute';
    backNvlCode.style.bottom = '1rem';
    backNvlCode.style.left = '1rem';
    backNvlCode.style.fontSize = '0.75rem';
    backNvlCode.style.fontFamily = 'monospace';
    backNvlCode.style.color = 'var(--accent-color)';
    backNvlCode.textContent = card.nvlCode;

    const backLabel = document.createElement('div');
    backLabel.style.position = 'absolute';
    backLabel.style.bottom = '1rem';
    backLabel.style.right = '1rem';
    backLabel.style.fontSize = '0.75rem';
    backLabel.style.fontWeight = 'bold';
    backLabel.style.letterSpacing = '0.1em';
    backLabel.style.color = 'var(--accent-color)';
    backLabel.textContent = card.categoryLabel || card.type;

    cardBack.appendChild(backContent);
    cardBack.appendChild(backSmallIcon);
    cardBack.appendChild(backNvlCode);
    cardBack.appendChild(backLabel);

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

    cardData.isFlipped = !cardData.isFlipped;

    if (cardData.isFlipped && !cardData.hasAnimated) {
        cardData.hasAnimated = true;
    }

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

