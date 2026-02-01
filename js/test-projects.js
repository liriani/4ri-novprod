/**
 * Test Module for Projects Refactoring
 * Tests the new modular projects system
 */

import { projectsData, getProjectById, getAllProjects } from './projects-data.js';
import { createProjectCard, createProjectsGrid } from './projects-components.js';

// Test data access
console.log('Testing projects data access...');
console.log('Total projects:', getAllProjects().length);
console.log('First project:', getProjectById(5));

// Test component generation
console.log('Testing component generation...');
const firstProject = getProjectById(5);
if (firstProject) {
  const cardHtml = createProjectCard(firstProject);
  console.log('Generated card HTML length:', cardHtml.length);
}

const gridHtml = createProjectsGrid();
console.log('Generated grid HTML length:', gridHtml.length);

console.log('All tests completed successfully!');
