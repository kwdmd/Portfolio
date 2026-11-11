import { projects } from './projects.js';
import { query } from './dom-utils.js';
import { renderProjectCards } from './project-renderer.js';
import { initHomeInteractions } from './home-interactions.js';
import { initNavigation } from './navigation.js';

const validProjects = projects.filter(
  (project) => /^[a-z0-9-]+$/.test(project.id) && project.id !== 'portfolio',
);

renderProjectCards(validProjects, query('#additional-projects'));
initHomeInteractions();
initNavigation(validProjects);
