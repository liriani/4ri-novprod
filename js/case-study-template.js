/**
 * Case Study Template Component
 * Generates detailed case study HTML layout
 */

export function createDetailedCaseStudy(project) {
    if (!project.detailedCaseStudy) {
        return null; // Return null if no detailed case study data
    }

    const caseData = project.detailedCaseStudy;

    // Generate navigation items
    const navigationHTML = caseData.sections.map((section, index) => `
        <li>
            <a href="#${section.id}" class="nav-link ${index === 0 ? 'active' : ''}" data-section="${section.id}">
                ${section.number}. ${section.title}
            </a>
        </li>
    `).join('');

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

    return `
        <div class="detailed-case-study">
            <!-- Case Study Header -->
            <header class="pt-32 pb-12">
                <div class="mb-4">
                    <span class="case-badge">CASE STUDY ${caseData.caseNumber}</span>
                </div>
                <h1 class="case-hero-title">${project.title.replace(/\s+/g, '<br>')}</h1>
                
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
            <main class="content-grid">
                
                <!-- Sidebar Navigation (Desktop) -->
                <aside class="hidden lg:block">
                    <nav class="sticky-nav">
                        <ul>
                            ${navigationHTML}
                        </ul>
                    </nav>
                </aside>

                <!-- Article Content -->
                <article>
                    ${sectionsHTML}
                </article>
            </main>

            <!-- Footer / Next Project -->
            <footer class="next-project">
                <span class="next-label">NEXT PROJECT IN ARCHIVE</span>
                <a href="${caseData.nextProject.url}" 
                   class="next-title page-link" 
                   data-project-id="${caseData.nextProject.id}">
                    ${caseData.nextProject.title} <span class="text-lg align-middle ml-2">↗</span>
                </a>
                <div class="next-navigation">
                    <span>PREV</span>
                    <span>/</span>
                    <span>NEXT</span>
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
    const navLinks = document.querySelectorAll('.sticky-nav .nav-link');

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
