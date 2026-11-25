import { projects } from './projects.js?v=20261126-stage-fade-fix';
import { query } from './dom-utils.js?v=20261126-stage-fade-fix';
import { renderProjectCards } from './project-renderer.js?v=20261126-stage-fade-fix';
import { initHomeInteractions } from './home-interactions.js?v=20261126-stage-fade-fix';
import { initNavigation } from './navigation.js?v=20261126-stage-fade-fix';

const validProjects = projects.filter(
  (project) => /^[a-z0-9-]+$/.test(project.id) && project.id !== 'portfolio',
);

renderProjectCards(validProjects, query('#additional-projects'));
initHomeInteractions();
initNavigation(validProjects);
