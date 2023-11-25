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
