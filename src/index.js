import { userInterface, showTodos, createProject } from './Interface';

// Show the UI of the app
document.body.appendChild(userInterface());

// Show todos for each projects if the user clicks on the project
const projects = document.querySelectorAll('.project-table > tr');
projects.forEach((project) => {
	project.addEventListener('click', (e) => {
		showTodos(e.target.dataset.id);
	});
});

// Create new project
const newProjectBtn = document.querySelector('.new-project');
newProjectBtn.addEventListener('click', () => {
	createProject();
});
