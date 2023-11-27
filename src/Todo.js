import Error from './ErrorMessage';

// Id for todo objects
let count = 0;

// Array of todo objects
let todos = [];

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
		inProject
	) {
		this.id = count++;
		this.title = title;
		this.desc = desc;
		this.dueDate = dueDate;
		this.priority = priority;
		this.notes = notes;
		this.isCompleted = isCompleted;
		this.inProject = inProject;
		todos.push(this);
	}

	// Static method to return todos array
	static todos() {
		return todos;
	}

	// Static method to get a todo from todos
	static getTodo(id) {
		const todo = todos.filter((todo) => {
			return todo.id === +id;
		});
		return todo[0];
	}

	// Static method to remove a todo
	static removeTodo(id) {
		const temp = todos.filter((element) => {
			return +id !== element.id;
		});
		todos = temp;
	}

	// Static method to remove all todos of projectId
	static removeTodos(id) {
		todos.forEach((todo) => {
			if (todo.inProject === +id) {
				Todo.removeTodo(todo.id);
			}
		});
	}

	static markComplete(item) {
		const temp = todos.map((element) => {
			if (element.id === item.id) {
				element.isCompleted = !element.isCompleted;
			}
			return element;
		});
		todos = temp;
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

	set setInProject(value) {
		this.inProject = value;
	}
}
