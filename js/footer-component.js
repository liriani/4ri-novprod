/**
 * Global Footer Component
 * Creates a reusable footer that can be injected into any page
  * Imports social links from social-links-component for consistency
 */

import { getSocialLink, getEmailLink } from './social-links-component.js';

export function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'global-footer';

    footer.innerHTML = `
        <div class="footer-grid">
            <div>
                <h2 class="footer-cta-title">Ready to<br>Collaborate?</h2>
                <a href="${getEmailLink()}" class="footer-email">${getSocialLink('email')}</a>
            </div>
            <div class="footer-right">
                <div class="footer-social-links">
                    <a href="${getSocialLink('linkedin')}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
                    <a href="${getSocialLink('github')}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">Github</a>
                </div>
                <p class="footer-copyright">© 2026 LIRI SAIKOSKI. DESIGNED & DEVELOPED WITH ❤️.</p>
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

