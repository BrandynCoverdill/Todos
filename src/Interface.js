import 'normalize.css';
import './styles.css';
import Todo from './Todo';
import Project from './Project';

export default function Interface() {
	// Create a parent element that contains all dom elements
	const parent = document.createElement('div');

	const defaultProject = createDefaultProject();
	console.log(Project.projects().length);

	// return parent element
	return parent;
}

// Create a default project
function createDefaultProject() {
	const defaultProject = new Project();
	return defaultProject.getTitle;
}
