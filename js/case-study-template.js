/**
 * Case Study Template Component
 * Generates detailed case study HTML layout
 */

import { getAllProjects } from './projects-data.js';

export function createDetailedCaseStudy(project) {
    if (!project.detailedCaseStudy) {
        return null; // Return null if no detailed case study data
    }

    const caseData = project.detailedCaseStudy;

    // Small helper: compute prev/next among projects that have detailed case studies
    const detailedProjects = getAllProjects().filter(p => p && p.detailedCaseStudy);
    const currentIndex = detailedProjects.findIndex(p => p.id === project.id);
    const prevProject = currentIndex > 0 ? detailedProjects[currentIndex - 1] : null;
    const nextProject = currentIndex >= 0 && currentIndex < detailedProjects.length - 1 ? detailedProjects[currentIndex + 1] : null;

    // Generate navigation items (FIAP-style labels: "01 / THE CONTEXT")
    const navigationHTML = caseData.sections.map((section, index) => {
        const number = section.number || String(index + 1).padStart(2, '0');
        const title = (section.title || '').toUpperCase();
        return `<a href="#${section.id}" class="toc-link ${index === 0 ? 'active' : ''}" data-section="${section.id}">${number} / ${title}</a>`;
    }).join('');

    // Generate sections HTML
    const sectionsHTML = caseData.sections.map(section => {
        let sectionContent = `
            <section id="${section.id}" class="case-section">
                <span class="chapter-number">${section.number} / ${section.title.toUpperCase()}</span>
                <h2>${section.headline}</h2>
                <div class="case-content">
                    ${section.content}
                </div>
        `;

        // Add stats if they exist
        if (section.stats && section.stats.length > 0) {
            sectionContent += `
                <div class="stats-grid">
                    ${section.stats.map(stat => `
                        <div class="stat-card">
                            <div class="stat-value">${stat.value}</div>
                            <div class="stat-label">${stat.label}</div>
                            <div class="stat-description">${stat.description}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Add images if they exist
        if (section.images && section.images.length > 0) {
            section.images.forEach(image => {
                sectionContent += `
                    <div class="case-image-container">
                        <img src="${image.src}" alt="${image.caption}" loading="lazy">
                    </div>
                    <div class="image-caption">${image.caption}</div>
                `;
            });
        }

        // Add features showcase if they exist
        if (section.features && section.features.length > 0) {
            section.features.forEach((feature, index) => {
                const isReverse = index % 2 === 1;
                sectionContent += `
                    <div class="feature-showcase">
                        <div class="feature-grid ${isReverse ? 'reverse' : ''}">
                            <div class="feature-content">
                                <h3>${feature.title}</h3>
                                <p>${feature.description}</p>
                            </div>
                            <div class="feature-image">
                                <img src="${feature.image}" alt="${feature.title}" loading="lazy">
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        sectionContent += '</section>';
        return sectionContent;
    }).join('');

    const techTagsHTML = Array.isArray(project.tech)
        ? project.tech.slice(0, 6).map(t => `<span class="case-summary-tag">${t}</span>`).join('')
        : '';

    return `
        <div class="detailed-case-study">
            <!-- Top Case Nav (matches reference) -->
            <nav class="case-top-nav fixed top-0 w-full z-50 mix-blend-difference px-6 py-6 flex justify-between items-center text-white pointer-events-none">
                <a href="#home" class="page-link font-bold text-xl pointer-events-auto" data-page="home" style="font-family: 'Anton';">LIRI.</a>
                <a href="#projects" class="page-link pointer-events-auto font-mono text-xs uppercase hover:underline" data-page="projects">Close Case Study [X]</a>
            </nav>

            <!-- Case Study Header -->
            <header class="pt-32 pb-12 wrapper">
                <div class="mb-4">
                    <span class="case-badge">CASE STUDY ${caseData.caseNumber}</span>
                </div>
                <h1 class="case-hero-title">${(project.shortTitle || project.title).replace(/\s+/g, '<br>')}</h1>
                
                <p class="case-subtitle">${caseData.subtitle}</p>

                <!-- Meta Grid -->
                <div class="meta-grid">
                    <div class="meta-item">
                        <label>My Role</label>
                        <span>${caseData.meta.role}</span>
                    </div>
                    <div class="meta-item">
                        <label>Timeline</label>
                        <span>${caseData.meta.timeline}</span>
                    </div>
                    <div class="meta-item">
                        <label>Team</label>
                        <span>${caseData.meta.team}</span>
                    </div>
                    <div class="meta-item">
                        <label>Recognition</label>
                        <span style="color: var(--accent-color);">${caseData.meta.recognition}</span>
                    </div>
                </div>
            </header>

            <!-- Hero Image -->
            <div class="case-hero-image">
                <img src="${caseData.heroImage}" alt="${project.title} Hero Image" loading="lazy">
            </div>

            <!-- Main Content -->
            <main class="wrapper content-grid">
                
                <!-- Sidebar Navigation (Desktop) -->
                <aside class="hidden lg:block">
                    <div class="sticky-nav">
                        <!-- Section Navigation -->
                        <div class="sidebar-section mt-8 pt-8 border-t border-[#2d2d2d]">
                            <span class="sidebar-label mb-4">Navigation</span>
                            <nav id="case-nav">
                                ${navigationHTML}
                            </nav>
                        </div>
                    </div>
                </aside>

                <!-- Article Content -->
                <article>
                    ${sectionsHTML}
                </article>
            </main>

            <!-- Footer / Next Project -->
            <footer class="next-project wrapper">
                <span class="next-label">NEXT PROJECT IN ARCHIVE</span>
                <a href="#project-${(nextProject || caseData.nextProject).id}" 
                   class="next-title page-link" 
                   data-project-id="${(nextProject || caseData.nextProject).id}">
                    ${(nextProject || caseData.nextProject).title} <span class="text-lg align-middle ml-2">↗</span>
                </a>
                <div class="next-navigation">
                    ${prevProject ? `<a href="#project-${prevProject.id}" class="page-link" data-project-id="${prevProject.id}">PREV</a>` : `<span class="opacity-50">PREV</span>`}
                    <span>/</span>
                    ${nextProject ? `<a href="#project-${nextProject.id}" class="page-link" data-project-id="${nextProject.id}">NEXT</a>` : `<span class="opacity-50">NEXT</span>`}
                </div>
            </footer>
        </div>
    `;
}

/**
 * Initialize case study navigation and interactions
 */
export function initializeCaseStudyNavigation() {
    // Handle sidebar navigation
    const navLinks = document.querySelectorAll('.toc-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            const targetSection = document.getElementById(sectionId);

            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Update URL hash without triggering navigation
                history.replaceState(null, null, `#${sectionId}`);
            }
        });
    });

    // Handle scroll spy for navigation
    const sections = document.querySelectorAll('.case-section');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingLink = document.querySelector(`.sticky-nav .nav-link[data-section="${sectionId}"]`);

                if (correspondingLink) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}
