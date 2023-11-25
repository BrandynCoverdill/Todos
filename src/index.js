import { userInterface, updateProjects, showTodos } from './Interface';

document.body.appendChild(userInterface());

// Show todos for each projects if the user clicks on the project
const projects = document.querySelectorAll('.project-table > tr');
projects.forEach((project) => {
	project.addEventListener('click', (e) => {
		showTodos(e.target.dataset.id);
	});
});
