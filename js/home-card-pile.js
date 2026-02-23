// Home Page Card Pile - Navigate to About Page

function initHomeCardPile() {
    const { LABELS, ICONS } = window.CARD_PILE_CONTENT || { LABELS: ['About Me','Learn More','My Story','Discover','Click Here','Explore'], ICONS: ['fa-user','fa-heart','fa-star','fa-lightbulb','fa-compass','fa-rocket'] };
    createCardPile({
        containerId: 'home-card-pile',
        cardCount: LABELS.length,
        labels: LABELS,
        icons: ICONS,
        onClick: () => {
            if (typeof window.handlePageChange === 'function') {
                window.handlePageChange('about');
            } else {
                location.hash = '#about';
            }
        },
        ariaLabel: 'Navigate to About page'
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeCardPile);
} else {
    initHomeCardPile();
}
