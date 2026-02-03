/**
 * Projects Controller Module
 * Handles all projects-related functionality, rendering, and interactions
 */

import { getProjectById, getAllProjects } from './projects-data.js';
import { createProjectsGrid, createProjectDetail } from './projects-components.js';
import { initializeCaseStudyNavigation } from './case-study-template.js';

export class ProjectsController {
  constructor() {
    this.projectsGrid = null;
    this.projectDetailPage = null;
    this.currentProject = null;
    this.init();
  }

  /**
   * Initialize the projects controller
   */
  init() {
    this.cacheSelectors();
    this.renderProjectsPage();
    this.attachEventListeners();
  }

  /**
   * Cache DOM selectors for better performance
   */
  cacheSelectors() {
    this.projectsGrid = document.querySelector('#projects-page .grid');
    this.projectDetailPage = document.querySelector('#project-detail-page');
    this.projectsContainer = document.querySelector('#projects-page');
  }

  /**
   * Render the main projects page
   */
  renderProjectsPage() {
    if (!this.projectsGrid) return;

    // Clear existing content
    this.projectsGrid.innerHTML = '';

    // Render project cards
    this.projectsGrid.innerHTML = createProjectsGrid();


    // Re-attach event listeners after rendering
    this.attachProjectCardListeners();

    // Refresh cursor effects for new elements
    if (window.refreshCursorEffects) {
      window.refreshCursorEffects();
    }
  }

  /**
   * Render project detail page
   * @param {string|number} projectId - The project ID to display
   */
  renderProjectDetail(projectId) {
    const project = getProjectById(projectId);
    if (!project || !this.projectDetailPage) return;

    this.currentProject = project;
    const detail = createProjectDetail(project);

    if (detail) {
      if (detail.isDetailedCaseStudy) {
        // For detailed case studies, replace the entire content
        this.projectDetailPage.innerHTML = `
          <a href="#projects" class="page-link text-lg text-accent-color mb-4 inline-block hover:underline" data-page="projects">
            &larr; Back to Projects
          </a>
          ${detail.caseStudyContent}
        `;

        // Initialize detailed case study navigation
        initializeCaseStudyNavigation();
      } else {
        // For regular case studies, restore original structure if needed
        this.restoreOriginalStructure();

        // Use the original structure
        document.getElementById('project-title').textContent = detail.title;
        document.getElementById('project-description').textContent = detail.description;
        document.getElementById('project-tech-list').innerHTML = detail.techList;
        document.getElementById('case-study-content').innerHTML = detail.caseStudyContent;

        // Initialize tab functionality
        this.initializeProjectTabs();
      }

      // Refresh cursor effects for new elements
      if (window.refreshCursorEffects) {
        window.refreshCursorEffects();
      }
    }
  }

  /**
   * Restore the original project detail page structure
   */
  restoreOriginalStructure() {
    const originalStructure = `
      <a href="#projects" class="page-link text-lg text-accent-color mb-4 inline-block hover:underline" data-page="projects">
        &larr; Back to Projects
      </a>
      <h2 id="project-title" class="section-title"></h2>
      <p id="project-description" class="body-text mb-8"></p>

      <h3 class="case-study-title">Technologies Used</h3>
      <ul id="project-tech-list" class="tag-list-container body-text mb-8"></ul>

      <!-- Main Case Study Content -->
      <div id="case-study-content" class="case-study-section"></div>
    `;

    // Only restore if the current content doesn't have the expected structure
    if (!document.getElementById('project-title')) {
      this.projectDetailPage.innerHTML = originalStructure;
    }
  }

  /**
   * Initialize project detail tabs
   */
  initializeProjectTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.classList.add('active');
        }

        // Refresh cursor effects after tab change
        if (window.refreshCursorEffects) {
          setTimeout(() => window.refreshCursorEffects(), 100);
        }
      });
    });
  }

  /**
   * Attach event listeners for projects functionality
   */
  attachEventListeners() {
    this.attachProjectCardListeners();
  }

  /**
   * Attach event listeners to project cards
   */
  attachProjectCardListeners() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      // Remove existing listeners to prevent duplicates
      card.removeEventListener('click', this.handleProjectCardClick.bind(this));

      // Add click listener
      card.addEventListener('click', this.handleProjectCardClick.bind(this));
    });
  }

  /**
   * Handle project card click
   * @param {Event} e - Click event
   */
  handleProjectCardClick(e) {
    const projectId = e.currentTarget.dataset.projectId;
    if (projectId) {
      const project = getProjectById(projectId);

      // If project has a dedicated case study HTML file, navigate to it
      if (project && project.caseStudyUrl) {
        window.location.href = project.caseStudyUrl;
      } else {
        // Fallback to old inline detail view for projects without dedicated pages
        this.renderProjectDetail(projectId);
        window.location.hash = `project-${projectId}`;
        if (window.showPage) {
          window.showPage('project-detail');
        }
      }
    }
  }


  /**
   * Refresh projects display (useful for dynamic updates)
   */
  refresh() {
    this.renderProjectsPage();
  }

  /**
   * Get current project data
   * @returns {Object|null} Current project object or null
   */
  getCurrentProject() {
    return this.currentProject;
  }

  /**
   * Get all projects data
   * @returns {Array} Array of all projects
   */
  getAllProjects() {
    return getAllProjects();
  }

  /**
   * Search projects by term
   * @param {string} searchTerm - Term to search for
   * @returns {Array} Array of matching projects
   */
  searchProjects(searchTerm) {
    if (!searchTerm) return getAllProjects();

    const term = searchTerm.toLowerCase();
    return getAllProjects().filter(project =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.tech.some(tech => tech.toLowerCase().includes(term))
    );
  }
}

// Export singleton instance
export const projectsController = new ProjectsController();
