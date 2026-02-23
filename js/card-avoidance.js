/**
 * Design System Card Avoidance Effect
 * Adds a subtle mouse avoidance physics effect to cards in the design system page
 */

export function initDesignSystemCardAvoidance() {
    const containers = [
        'vertical-card-preview',
        'flip-card-preview',
        'about-reveal-game-example'
    ];

    containers.forEach(id => {
        const container = document.getElementById(id);
        if (!container) return;

        container.addEventListener('mousemove', (e) => {
            const cards = container.querySelectorAll('.game-card, .flip-wrapper');
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left - rect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top - rect.top + cardRect.height / 2;

                const dx = mouseX - cardCenterX;
                const dy = mouseY - cardCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const strength = (200 - distance) / 200;
                    // Quadratic strength for smoother entry
                    const smoothStrength = Math.pow(strength, 2);
                    const moveX = (dx / distance) * smoothStrength * -30;
                    const moveY = (dy / distance) * smoothStrength * -30;
                    const rotate = (dx / 200) * smoothStrength * 10;

                    card.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
                    card.style.transition = 'transform 0.5s cubic-bezier(0.1, 0.5, 0.2, 1)';
                } else {
                    card.style.transform = '';
                    card.style.transition = 'transform 0.5s ease-out';
                }
            });
        });

        container.addEventListener('mouseleave', () => {
            const cards = container.querySelectorAll('.game-card, .flip-wrapper');
            cards.forEach(card => {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s ease-out';
            });
        });
    });
}
