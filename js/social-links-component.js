/**
 * Social Links Component
 * Reusable component for displaying social links (Email, LinkedIn, GitHub)
 * Single source of truth for all social links across the portfolio
 */

// Social links data - SINGLE SOURCE OF TRUTH
const SOCIAL_LINKS = {
    email: 'its.liriani@gmail.com',
    linkedin: 'https://linkedin.com/in/liriani',
    github: 'https://github.com/liriani'
};

/**
 * Create social button group component
 * @param {Object} options - Configuration options
 * @param {boolean} options.centered - Whether to center the button group
 * @returns {HTMLElement} Social button group element
 */
export function createSocialButtonGroup(options = {}) {
    const { centered = true } = options;

    const container = document.createElement('div');
    container.className = centered ? 'social-btn-group social-btn-group-centered' : 'social-btn-group';

    container.innerHTML = `
        <a href="mailto:${SOCIAL_LINKS.email}" class="social-btn btn-email">
            <i class="far fa-envelope"></i> Email Me
        </a>
        <a href="${SOCIAL_LINKS.linkedin}" target="_blank" rel="noopener noreferrer" class="social-btn btn-social">
            <i class="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="${SOCIAL_LINKS.github}" target="_blank" rel="noopener noreferrer" class="social-btn btn-social">
            <i class="fab fa-github"></i> GitHub
        </a>
    `;

    return container;
}

/**
 * Replace placeholder with social button group
 * @param {string} selector - CSS selector for the placeholder element
 * @param {Object} options - Configuration options
 */
export function replaceSocialLinksPlaceholder(selector, options = {}) {
    const placeholder = document.querySelector(selector);
    if (placeholder) {
        const socialLinks = createSocialButtonGroup(options);
        placeholder.replaceWith(socialLinks);
    }
}

/**
 * Get individual social link
 * @param {string} type - Type of link (email, linkedin, github)
 * @returns {string} The social link URL or email
 */
export function getSocialLink(type) {
    return SOCIAL_LINKS[type] || '';
}

/**
 * Get email mailto link
 * @returns {string} Mailto link
 */
export function getEmailLink() {
    return `mailto:${SOCIAL_LINKS.email}`;
}


