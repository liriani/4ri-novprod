/**
 * Card Renderer Utility
 * Provides functions to create game cards for the portfolio
 */

/**
 * Creates a game card element (vertical or flip)
 * @param {Object} cardData - The data for the card
 * @param {string} type - 'vertical' or 'flip'
 * @param {Object} options - Additional options (isFlipped, onFlip)
 * @returns {HTMLElement} The card element
 */
export function createGameCard(cardData, type = 'vertical', options = {}) {
    if (type === 'flip') {
        return createFlipCard(cardData, options);
    } else {
        return createVerticalCard(cardData, options);
    }
}

/**
 * Creates a vertical game card
 */
function createVerticalCard(cardData, options = {}) {
    const card = document.createElement('div');
    card.className = 'game-card vertical group';
    
    // Apply standard dimensions
    card.style.width = 'var(--pattern-card-width)';
    card.style.height = 'var(--pattern-card-height)';
    card.style.minHeight = 'var(--pattern-card-height)';
    
    // Top Meta
    const topMeta = document.createElement('div');
    topMeta.className = 'flex justify-between w-full';
    topMeta.innerHTML = `
        <span class="corner-label text-accent">${cardData.nvlCode || 'ID_01'}</span>
        <span class="corner-label">// ${cardData.type || 'SYSTEM'}</span>
    `;

    // Main Content
    const mainContent = document.createElement('div');
    mainContent.className = 'text-center flex-1 flex flex-col justify-center';
    
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'mb-6 opacity-80 group-hover:opacity-100 text-[var(--text-main)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6';
    iconWrapper.innerHTML = `<i class="fa-solid ${cardData.icon} ${cardData.iconSize === 'xl' ? 'text-5xl' : 'text-4xl'}"></i>`;
    
    const title = document.createElement('h2');
    title.className = `font-display ${cardData.titleSize === 'xl' ? 'text-4xl' : 'text-3xl'} mb-2`;
    title.textContent = cardData.type.charAt(0).toUpperCase() + cardData.type.slice(1).toLowerCase();
    
    const divider = document.createElement('div');
    divider.className = 'w-8 h-0.5 bg-[var(--accent)] mx-auto mb-4';
    
    const description = document.createElement('p');
    description.className = 'font-mono text-xs text-[var(--text-muted)] whitespace-pre-line px-4';
    description.textContent = cardData.description;

    mainContent.appendChild(iconWrapper);
    mainContent.appendChild(title);
    mainContent.appendChild(divider);
    mainContent.appendChild(description);

    // Footer Meta
    const footerMeta = document.createElement('div');
    footerMeta.className = 'flex justify-between w-full items-end';
    footerMeta.innerHTML = `
        <span class="corner-label">EST. 2024</span>
        <i class="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 text-accent transition-transform duration-300"></i>
    `;

    card.appendChild(topMeta);
    card.appendChild(mainContent);
    card.appendChild(footerMeta);

    return card;
}

/**
 * Creates a flip game card
 */
function createFlipCard(cardData, options = {}) {
    const { isFlipped = false, onFlip } = options;
    
    const flipWrapper = document.createElement('div');
    flipWrapper.className = 'flip-wrapper';
    
    const flipInner = document.createElement('div');
    flipInner.className = 'flip-inner';
    if (isFlipped) flipInner.classList.add('is-flipped');
    
    flipInner.onclick = () => {
        flipInner.classList.toggle('is-flipped');
        if (onFlip) onFlip(flipInner.classList.contains('is-flipped'));
    };
    
    // Front: Cover
    const coverFace = document.createElement('div');
    coverFace.className = 'flip-face cover group';
    coverFace.style.padding = 'var(--pattern-card-padding)';
    coverFace.innerHTML = `
        <div class="flex justify-between w-full">
            <span class="corner-label text-primary-dark">LOCKED</span>
        </div>
        <div class="flex flex-col items-center justify-center flex-1 my-auto">
            <div class="w-20 h-20 rounded-full border-2 border-primary-dark flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <i class="fa-solid fa-lock text-2xl text-primary-dark"></i>
            </div>
            <h3 class="font-display text-3xl tracking-widest text-primary-dark">CLASSIFIED</h3>
        </div>
        <div class="w-full text-center border-t-2 border-primary-dark pt-4">
            <p class="font-mono text-xs text-primary-dark animate-pulse">[ CLICK TO DECRYPT ]</p>
        </div>
    `;
    
    // Back: Content (Vertical Card)
    const contentFace = document.createElement('div');
    contentFace.className = 'flip-face content';
    contentFace.style.padding = '0'; // We use innerCard padding instead
    
    // Create inner vertical card but strip its fixed size to let it fill the flip-face
    const innerCard = createVerticalCard(cardData);
    innerCard.style.width = '100%';
    innerCard.style.height = '100%';
    innerCard.style.minHeight = '100%';
    innerCard.style.border = 'none';
    innerCard.style.background = 'transparent';
    innerCard.style.padding = 'var(--pattern-card-padding)';
    
    contentFace.appendChild(innerCard);
    
    flipInner.appendChild(coverFace);
    flipInner.appendChild(contentFace);
    flipWrapper.appendChild(flipInner);
    
    return flipWrapper;
}
