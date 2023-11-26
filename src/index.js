import {
	userInterface,
	showTodos,
	createProject,
	editProject,
} from './Interface';

// Show the UI of the app
document.body.appendChild(userInterface());

// Global variables
const projects = document.querySelectorAll('.project-table > tr');
const newProjectBtn = document.querySelector('.new-project');

// Show todos for each projects if the user clicks on the project
projects.forEach((project) => {
	project.addEventListener('click', (e) => {
		showTodos(e.target.dataset.id);
	});
});

// Create new project
newProjectBtn.addEventListener('click', () => {
	createProject();
});

// Modify existing project when the user dbl clicks on a project title
projects.forEach((project) => {
	project.addEventListener('dblclick', (e) => {
		editProject(e.target.dataset.id);
	});
});
