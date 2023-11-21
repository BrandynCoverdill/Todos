import Error from './ErrorMessage';

/**
 * Class that creates Todo Objects
 */
export default class Todo {
	constructor(
		title = 'Untitled Todo',
		desc = '',
		dueDate,
		priority = 3,
		notes = '',
		isCompleted = false,
		inProject = 0
	) {
		this.title = title;
		this.desc = desc;
		this.dueDate = dueDate;
		this.priority = priority;
		this.notes = notes;
		this.isCompleted = isCompleted;
		this.inProject = inProject;
	}

	// Accessor Methods
	get getTitle() {
		if (this.title.trim() !== '') {
			return this.title;
		}
		return 'Untitled Todo';
	}

	get getDesc() {
		if (this.desc.trim() === '') {
			return 'None';
		}
		return this.desc;
	}

	get getDueDate() {
		if (this.dueDate === undefined) {
			return 'No Due Date';
		}
		return this.dueDate;
	}

	get getPriority() {
		return this.priority;
	}

	get getNotes() {
		if (this.notes.trim() === '') {
			return 'None';
		}
		return this.notes;
	}

	get getIsCompleted() {
		return this.isCompleted;
	}

	get getInProject() {
		return this.inProject;
	}

	// Mutator Methods
	set setTitle(value) {
		if (value.trim() !== '') {
			this.title = value;
		} else {
			Error.message('You cannot have a blank todo title.');
		}
	}

	set setDesc(value) {
		this.desc = value;
	}

	set setDueDate(date) {
		this.dueDate = date;
	}

	set setPriority(value) {
		if (typeof value !== 'number' || value <= 0 || value >= 4) {
			Error.message('The priority you specified is not a valid argument.');
		} else {
			this.priority = value;
		}
	}

	set setNotes(value) {
		this.notes = value;
	}

	set setIsCompleted(value) {
		if (value) {
			this.isCompleted = false;
		} else {
			this.isCompleted = true;
		}
	}

	set setInProject(value) {
		this.inProject = value;
	}
}