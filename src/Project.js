import Error from './ErrorMessage';

// Global counter for project Ids
// Ids for Projects
let count = +localStorage.getItem('project-id-count');

// Array of project objects
let projects = [];

/**
 * Class to create Project Objects
 */
export default class Project {
	constructor(title = 'Untitled Project') {
		this.id = count;
		this.title = title;
		projects.push(this);
		localStorage.setItem('project-id-count', JSON.stringify(++count));
	}

	// Static method to return projects array
	static projects() {
		return projects;
	}

	static setProjectArray(value) {
		projects = value;
	}

	// Static method to return an object's title from projects
	static getObjectTitle(id) {
		const project = JSON.parse(localStorage.getItem('projects')).filter(
			(element) => {
				return +element.id === +id;
			}
		);
		return project[0].title;
	}

	// Static method to remove object from projects array
	static removeProject(id) {
		const temp = JSON.parse(localStorage.getItem('projects')).filter(
			(project) => {
				return +id !== project.id;
			}
		);
		projects = temp;
		localStorage.setItem('projects', JSON.stringify(projects));
	}

	// Accessor Methods
	get getId() {
		return this.id;
	}

	get getTitle() {
		if (this.title.trim() !== '') {
			return this.title;
		}
		return 'Untitled Project';
	}

	// Mutator methods
	set setTitle(value) {
		if (value.trim() !== '') {
			this.title = value;
		} else {
			Error.message('You cannot have a blank project title.');
		}
	}
}
