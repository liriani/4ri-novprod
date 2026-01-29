/**
 * Projects Controller Module
 * Handles all projects-related functionality, rendering, and interactions
 */

import { getProjectById, getAllProjects } from './projects-data.js';
import { createProjectsGrid, createCallToAction, createProjectDetail } from './projects-components.js';

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

    // Render project cards and next adventure card
    this.projectsGrid.innerHTML = createProjectsGrid();

    // Add CTA if it doesn't exist
    if (!this.projectsContainer.querySelector('.text-center.p-8')) {
      this.projectsContainer.innerHTML += createCallToAction();
    }

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
      // Update page content
      document.getElementById('project-title').textContent = detail.title;
      document.getElementById('project-description').textContent = detail.description;
      document.getElementById('project-tech-list').innerHTML = detail.techList;
      document.getElementById('case-study-content').innerHTML = detail.caseStudyContent;

      // Initialize tab functionality
      this.initializeProjectTabs();

      // Refresh cursor effects for new elements
      if (window.refreshCursorEffects) {
        window.refreshCursorEffects();
      }
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
      this.renderProjectDetail(projectId);

      // Navigate to project detail page using the existing navigation system
      window.location.hash = `project-${projectId}`;
      if (window.showPage) {
        window.showPage('project-detail');
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
