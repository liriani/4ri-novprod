// Home Page Card Pile - Navigate to About Page

function initHomeCardPile() {
    createCardPile({
        containerId: 'home-card-pile',
        cardCount: 6,
        labels: ['About Me', 'Learn More', 'My Story', 'Discover', 'Click Here', 'Explore'],
        icons: ['fa-user', 'fa-heart', 'fa-star', 'fa-lightbulb', 'fa-compass', 'fa-rocket'],
        onClick: () => {
            if (window.handlePageChange) {
                window.handlePageChange('about');
            } else {
                location.hash = '#about';
            }
        },
        cardClass: 'home-pile-card page-link',
        contentClass: 'home-pile-card-content',
        iconClass: 'home-pile-card-icon',
        textClass: 'home-pile-card-text',
        ariaLabel: 'Navigate to About page'
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeCardPile);
} else {
    initHomeCardPile();
}
