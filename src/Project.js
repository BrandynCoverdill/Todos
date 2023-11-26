import Error from './ErrorMessage';

// Global counter for project Ids
// Ids for Projects
let count = 0;

// Array of project objects
let projects = [];

/**
 * Class to create Project Objects
 */
export default class Project {
	constructor(title = 'Untitled Project') {
		this.id = count++;
		this.title = title;
		projects.push(this);
	}

	// Static method to return projects array
	static projects() {
		return projects;
	}

	// Static method to return an object's title from projects
	static getObjectTitle(id) {
		const project = projects.filter((element) => {
			return element.id === +id;
		});
		return project[0].title;
	}

	// Static method to remove object from projects array
	static removeProject(id) {
		const temp = projects.filter((project) => {
			return +id !== project.id;
		});
		projects = temp;
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
