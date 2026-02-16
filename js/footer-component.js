/**
 * Global Footer Component
 * Creates a reusable footer that can be injected into any page
 */

// Social links data - SINGLE SOURCE OF TRUTH
const SOCIAL_LINKS = {
    email: 'its.liriani@gmail.com',
    linkedin: 'https://linkedin.com/in/liriani',
    github: 'https://github.com/liriani'
};

export function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'global-footer';

    footer.innerHTML = `
        <div class="footer-grid">
            <div>
                <h2 class="footer-cta-title">Ready to<br>Collaborate?</h2>
                <a href="mailto:${SOCIAL_LINKS.email}" class="footer-email">${SOCIAL_LINKS.email}</a>
            </div>
            <div class="footer-right">
                <div class="footer-social-links">
                    <a href="${SOCIAL_LINKS.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
                    <a href="${SOCIAL_LINKS.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">Github</a>
                </div>
                <p class="footer-copyright">© 2026 LIRIANI SAIKOSKI. ALL RIGHTS RESERVED.</p>
            </div>
        </div>
    `;

    return footer;
}

/**
 * Initialize footer on a page
 * @param {string} selector - CSS selector for the container where footer should be appended
 * @param {string} position - 'beforeend' (default) or 'afterbegin'
 */
export function initFooter(selector = 'body', position = 'beforeend') {
    const container = document.querySelector(selector);
    if (container) {
        const footer = createFooter();
        container.insertAdjacentElement(position, footer);
    }
}

/**
 * Replace existing footer placeholder with the component
 * @param {string} selector - CSS selector for the placeholder element to replace
 */
export function replaceFooterPlaceholder(selector = '#footer-placeholder') {
    const placeholder = document.querySelector(selector);
    if (placeholder) {
        const footer = createFooter();
        placeholder.replaceWith(footer);
    }
}

