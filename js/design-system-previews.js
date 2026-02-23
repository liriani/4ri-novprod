/**
 * Design System Card Previews
 * Renders card game examples in the Design System section
 */

import { createGameCard } from './card-renderer.js';
import { initDesignSystemCardAvoidance } from './card-avoidance.js';


// Sample card data - MUST be defined BEFORE usage
const revealInitialCardsData = [
    {
        id: 1,
        type: "ALIGNMENT",
        nvlCode: "SYS.01",
        icon: 'fa-lightbulb',
        description: "Driven by alignment.\nNot trends.\nIntention matches behavior.",
        titleSize: "lg",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 2,
        type: "STRUCTURE",
        nvlCode: "SYS.02",
        icon: 'fa-palette',
        description: "Observing the chaos.\nReorganizing the flow.\nFixing what feels off.",
        titleSize: "md",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 3,
        type: "BUILD",
        nvlCode: "SYS.03",
        icon: 'fa-code',
        description: "Designing behavior.\nCoding the match.\nBridging the gap.",
        titleSize: "xl",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 4,
        type: "LEARN",
        nvlCode: "DAT.01",
        icon: 'fa-graduation-cap',
        description: "Curiosity is structural.\nStudying the patterns.\nQuestioning defaults.",
        titleSize: "xl",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 5,
        type: "SYSTEM",
        nvlCode: "SYS.04",
        icon: 'fa-users',
        description: "Logic meets aesthetics.\nDesign meets engineering.",
        titleSize: "lg",
        iconSize: "xl",
        descSize: "md"
    },
    {
        id: 6,
        type: "MOVEMENT",
        nvlCode: "LOC.01",
        icon: 'fa-person-skating',
        description: "Clearing the cache.\nIdeas reorganized in motion.\nBarcelona is the grid.",
        titleSize: "md",
        iconSize: "xl",
        descSize: "md"
    }
];

/**
 * Initialize all Design System card previews
 */
function initDesignSystemPreviews() {
    // Clear existing previews to prevent duplication
    const containersToClear = [
        'vertical-card-preview',
        'flip-card-preview',
        'about-reveal-game-example',
        'home-card-pile-example'
    ];
    containersToClear.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    // 1. Vertical Card Preview
    const verticalContainer = document.getElementById('vertical-card-preview');
    if (verticalContainer) {
        const verticalCard = createGameCard(revealInitialCardsData[0], 'vertical');
        verticalContainer.appendChild(verticalCard);
    }

    // 2. Flip Card Preview
    const flipContainer = document.getElementById('flip-card-preview');
    if (flipContainer) {
        const flipCard = createGameCard(revealInitialCardsData[2], 'flip', {
            isFlipped: false
        });
        flipContainer.appendChild(flipCard);
    }

    // 3. About Page Reveal Game Example (2 flip cards only)
    const aboutGameContainer = document.getElementById('about-reveal-game-example');
    if (aboutGameContainer) {
        // Show only 2 flip cards with stagger animation
        revealInitialCardsData.slice(0, 2).forEach((cardData, index) => {
            const card = createGameCard(cardData, 'flip', {
                isFlipped: false
            });

            // Add stagger animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);

            aboutGameContainer.appendChild(card);
        });
    }

    // 4. Home Card Pile Example (animated pile with avoidance physics)
    const homeCardPileExample = document.getElementById('home-card-pile-example');
    if (homeCardPileExample && typeof window.createCardPile === 'function') {
        const pileLabels = ['About Me', 'My Work', 'Design', 'Build', 'Create', 'Explore'];
        const pileIcons = ['fa-user', 'fa-briefcase', 'fa-palette', 'fa-code', 'fa-lightbulb', 'fa-compass'];

        window.createCardPile({
            containerId: 'home-card-pile-example',
            cardCount: 6,
            labels: pileLabels,
            icons: pileIcons,
            topAnchor: '50%', // Center for design system preview
            onClick: () => {},
            ariaLabel: 'Demo card pile card'
        });
    } else if (homeCardPileExample) {
        console.warn('⚠️ createCardPile function not available, showing static cards');
        // Fallback: show 3 static cards
        revealInitialCardsData.slice(0, 3).forEach((cardData) => {
            const card = createGameCard(cardData, 'vertical');
            homeCardPileExample.appendChild(card);
        });
    }


    // Initialize avoidance effect after all cards are rendered
    setTimeout(() => {
        initDesignSystemCardAvoidance();
    }, 100);
}

// Export for use in other modules
export { createGameCard, revealInitialCardsData };

// Expose global refresh function for navigation
window.refreshDesignSystemPreviews = initDesignSystemPreviews;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDesignSystemPreviews);
} else {
    initDesignSystemPreviews();
}








