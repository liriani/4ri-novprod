
import { revealInitialCardsData } from './reveal-game.js';
function createGameCard(cardData, type = 'vertical') {
    const card = document.createElement('div');

    if (type === 'vertical') {
        card.className = 'game-card vertical group';
        card.style.cssText = 'width: 100%; max-width: 300px; min-height: 420px; margin: 0 auto;';

        card.innerHTML = `
            <div class="flex justify-between w-full">
                <span class="corner-label text-accent">${cardData.nvlCode}</span>
                <span class="corner-label">// ${cardData.type}</span>
            </div>
            <div class="text-center mt-4">
                <div class="mb-6 opacity-80 group-hover:opacity-100 text-[var(--text-main)]">
                    <i class="fa-solid ${cardData.icon} text-5xl md:text-6xl"></i>
                </div>
                <h2 class="font-display text-4xl md:text-5xl mb-2">${cardData.type}</h2>
                <div class="w-8 h-0.5 bg-[var(--accent)] mx-auto mb-4"></div>
                <p class="font-mono text-sm text-[var(--text-muted)]">
                    ${cardData.description.split('\n')[0]}
                </p>
            </div>
            <div class="flex justify-between w-full items-end">
                <span class="corner-label">ID_${String(cardData.id).padStart(2, '0')}</span>
                <i class="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 text-accent"></i>
            </div>
        `;
    }
    else if (type === 'horizontal') {
        card.className = 'game-card horizontal group';
        card.style.cssText = 'width: 100%; max-width: 400px; min-height: 160px; position: relative; margin: 0 auto;';

        card.innerHTML = `
            <div class="absolute bottom-0 left-0 w-full h-1 bg-[var(--card-border)] group-hover:bg-[var(--accent)] transition-colors"></div>
            <div class="icon-col">
                <i class="fa-solid ${cardData.icon} text-3xl md:text-4xl text-[var(--text-muted)] group-hover:text-[var(--text-main)]"></i>
            </div>
            <div class="content-col relative">
                <span class="corner-label absolute top-0 right-0">${cardData.nvlCode}</span>
                <div>
                    <h3 class="font-display text-2xl md:text-3xl mb-1">${cardData.type}</h3>
                    <p class="font-mono text-xs text-[var(--accent)] mb-2">[ ${cardData.description.split('\n')[0].toUpperCase()} ]</p>
                    <p class="text-xs md:text-sm text-[var(--text-muted)] font-light">${cardData.description.split('\n')[1]}</p>
                </div>
            </div>
        `;
    }
    else if (type === 'flip') {
        card.className = 'flip-wrapper';
        card.style.cssText = 'width: 100%; max-width: 300px; margin: 0 auto; min-height: 420px;';

        card.innerHTML = `
            <div class="flip-inner">
                <div class="flip-face cover">
                    <div class="flex justify-between">
                        <span class="corner-label">${cardData.nvlCode}</span>
                        <span class="corner-label">// ${cardData.type}</span>
                    </div>
                    <div class="text-center flex-1 flex flex-col justify-center">
                        <div class="mb-4">
                            <i class="fa-solid fa-lock text-4xl text-[var(--accent)] opacity-60"></i>
                        </div>
                        <h3 class="font-display text-2xl mb-2 text-[var(--text-main)]">LOCKED</h3>
                        <p class="font-mono text-xs text-[var(--text-muted)]">Click to reveal</p>
                    </div>
                    <div class="corner-label">TAP TO UNLOCK</div>
                </div>
                <div class="flip-face content">
                    <div class="flex justify-between mb-2">
                        <span class="corner-label">${cardData.nvlCode}</span>
                        <span class="corner-label">// ${cardData.type}</span>
                    </div>
                    <div class="text-center flex-1 flex flex-col justify-center">
                        <div class="mb-4">
                            <i class="fa-solid ${cardData.icon} text-4xl text-[var(--accent)]"></i>
                        </div>
                        <h3 class="font-display text-2xl mb-3">${cardData.type}</h3>
                        <p class="font-mono text-xs leading-relaxed text-[var(--text-muted)]">
                            ${cardData.description.replace(/\n/g, '<br>')}
                        </p>
                    </div>
                    <div class="corner-label">ID_${String(cardData.id).padStart(2, '0')}</div>
                </div>
            </div>
        `;

        // Add flip interaction
        card.addEventListener('click', () => {
            card.querySelector('.flip-inner').classList.toggle('flipped');
        });
    }

    return card;
}

/**
 * Render vertical card preview using shared renderer
 */
function renderVerticalCardPreview() {
    const container = document.getElementById('vertical-card-preview');
    if (!container) return;

    const cardData = revealInitialCardsData[0]; // ALIGNMENT card
    const card = createGameCard(cardData, 'vertical');

    container.innerHTML = '';
    container.appendChild(card);
}

/**
 * Render horizontal card preview using shared renderer
 */
function renderHorizontalCardPreview() {
    const container = document.getElementById('horizontal-card-preview');
    if (!container) return;

    const cardData = revealInitialCardsData[3]; // LEARN card
    const card = createGameCard(cardData, 'horizontal');

    container.innerHTML = '';
    container.appendChild(card);
}

/**
 * Render flip card preview using shared renderer
 */
function renderFlipCardPreview() {
    const container = document.getElementById('flip-card-preview');
    if (!container) return;

    const cardData = revealInitialCardsData[2]; // BUILD card
    const card = createGameCard(cardData, 'flip');

    container.innerHTML = '';
    container.appendChild(card);
}

/**
 * Initialize all design system previews
 */
export function initDesignSystemPreviews() {
    // Only run on design system page
    const designSystemPage = document.getElementById('design-system-page');
    if (!designSystemPage) return;

    renderVerticalCardPreview();
    renderHorizontalCardPreview();
    renderFlipCardPreview();

    console.log('✅ Design System previews initialized with real card data');
}

/**
 * Export card renderer for reuse throughout the codebase
 * Use this function anywhere you need to create a game card
 */
export { createGameCard };

// Auto-initialize when module loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDesignSystemPreviews);
} else {
    initDesignSystemPreviews();
}







