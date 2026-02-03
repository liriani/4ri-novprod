/**
 * Projects Components Module
 * Contains all UI component creation functions for the projects section
 */

import { projectsData } from './projects-data.js';
import { createDetailedCaseStudy } from './case-study-template.js';

/**
 * Creates a project card element
 * @param {Object} project - Project data object
 * @returns {string} HTML string for the project card
 */
export function createProjectCard(project) {
  const logoElement = project.logoAlt
    ? `<img src="${project.logo}" alt="${project.logoAlt}">`
    : project.logo;

  return `
    <div class="project-card" data-project-id="${project.id}">
      <div class="project-card-front">
        <span class="project-logo">${logoElement}</span>
        <h3 class="card-title">${project.title}</h3>
      </div>
      <div class="project-preview">
        <div class="preview-left">
          <h3 class="card-title">${project.shortTitle}</h3>
          <p class="card-subtitle">${project.description}</p>
        </div>
        <div class="preview-right">
          <img src="${project.cover}" alt="${project.coverAlt}">
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates project detail content for the detail page
 * @param {Object} project - Project data object
 * @returns {Object} Object with different sections of the detail page
 */
export function createProjectDetail(project) {
  if (!project) return null;

  // Check if project has detailed case study
  if (project.detailedCaseStudy) {
    const detailedContent = createDetailedCaseStudy(project);
    return {
      title: project.title,
      description: project.description,
      techList: '',
      caseStudyContent: detailedContent,
      isDetailedCaseStudy: true
    };
  }

  // Fallback to regular case study format
  // Create technology list
  const techList = project.tech.map(tech => `<li class="tech-tag">${tech}</li>`).join('');

  // Create organized case study content with tabs
  let caseStudyContent = '';

  if (project.caseStudy) {
    const { context, problem, process, impact } = project.caseStudy;

    caseStudyContent = `
      <div class="project-detail-container">
        <!-- Project Navigation Tabs -->
        <div class="project-tabs">
          <button class="tab-btn active" data-tab="overview">Overview</button>
          <button class="tab-btn" data-tab="challenge">The Challenge</button>
          <button class="tab-btn" data-tab="process">Process & Research</button>
          <button class="tab-btn" data-tab="solution">Solution</button>
          <button class="tab-btn" data-tab="results">Results & Impact</button>
        </div>

        <!-- Tab Content -->
        <div class="project-content">
          <!-- Overview Tab -->
          <div class="tab-content active" id="overview">
            <div class="section project-context">
              <h3 class="case-study-title">Project Overview</h3>
              <div class="context-grid">
                <div class="context-item">
                  <h4>Team</h4>
                  <p>${context.team}</p>
                </div>
                <div class="context-item">
                  <h4>Timeline</h4>
                  <p>${context.timeline}</p>
                </div>
                <div class="context-item">
                  <h4>Role</h4>
                  <p>${context.role}</p>
                </div>
              </div>
            </div>

            <div class="section tech-section">
              <h3 class="case-study-title">Technologies Used</h3>
              <ul class="tech-stack">${techList}</ul>
            </div>

            ${project.designs && project.designs.length > 0 ? `
              <div class="section">
                <h3 class="case-study-title">Key Design Highlights</h3>
                <div class="design-preview">
                  <img src="${project.designs[0].src}" alt="${project.designs[0].caption}" class="preview-image">
                  <p class="design-caption">${project.designs[0].caption}</p>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Challenge Tab -->
          <div class="tab-content" id="challenge">
            <div class="section">
              <h3 class="case-study-title">The Problem</h3>
              <div class="content-text">${problem.replace(/\n/g, '<br>')}</div>
            </div>
          </div>

          <!-- Process Tab -->
          <div class="tab-content" id="process">
            <div class="section">
              <h3 class="case-study-title">Research & Development Process</h3>
              <div class="content-text">${process.replace(/\n/g, '<br>')}</div>
            </div>

            ${project.designs && project.designs.length > 1 ? `
              <div class="section">
                <h3 class="case-study-title">Design Process</h3>
                <div class="designs-grid">
                  ${project.designs.slice(1, 3).map(design => `
                    <div class="design-item">
                      <img src="${design.src}" alt="${design.caption}" class="design-image">
                      <p class="design-caption">${design.caption}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Solution Tab -->
          <div class="tab-content" id="solution">
            <div class="section">
              <h3 class="case-study-title">Solution & Implementation</h3>
              <div class="content-text">${project.caseStudy.solutions ? project.caseStudy.solutions.replace(/\n/g, '<br>') : 'Solution details coming soon...'}</div>
            </div>

            ${project.designs && project.designs.length > 3 ? `
              <div class="section">
                <h3 class="case-study-title">Final Designs</h3>
                <div class="designs-grid">
                  ${project.designs.slice(3).map(design => `
                    <div class="design-item">
                      <img src="${design.src}" alt="${design.caption}" class="design-image">
                      <p class="design-caption">${design.caption}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Results Tab -->
          <div class="tab-content" id="results">
            <div class="section">
              <h3 class="case-study-title">Impact & Results</h3>
              <div class="content-text">${impact}</div>
            </div>

            ${project.caseStudy.outcomes && project.caseStudy.outcomes.length > 0 ? `
              <div class="section">
                <h3 class="case-study-title">Key Outcomes</h3>
                <ul class="outcomes-list">
                  ${project.caseStudy.outcomes.map(outcome => `<li class="outcome-item">${outcome}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            ${project.caseStudy.improvements ? `
              <div class="section">
                <h3 class="case-study-title">Lessons Learned & Future Improvements</h3>
                <div class="content-text improvements-section">${project.caseStudy.improvements.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  return {
    title: project.title,
    description: project.description,
    techList,
    caseStudyContent,
    isDetailedCaseStudy: false
  };
}

/**
 * Creates the complete projects grid
 * @returns {string} HTML string for the entire projects grid
 */
export function createProjectsGrid() {
  const projectCards = projectsData.map(project => createProjectCard(project)).join('');

  return projectCards;
}
