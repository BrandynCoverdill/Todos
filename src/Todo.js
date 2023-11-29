import Error from './ErrorMessage';

// Id for todo objects
let count = +localStorage.getItem('todo-id-count');

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
		this.id = count;
		this.title = title;
		this.desc = desc;
		this.dueDate = dueDate;
		this.priority = priority;
		this.notes = notes;
		this.isCompleted = isCompleted;
		this.inProject = inProject;
		todos.push(this);
		localStorage.setItem('todo-id-count', JSON.parse(++count));
	}

	// Static method to return todos array
	static todos() {
		return todos;
	}

	static setTodoArray(value) {
		todos = value;
	}

	// Static method to get a todo from todos
	static getTodo(id) {
		const todo = JSON.parse(localStorage.getItem('todos')).filter((todo) => {
			return todo.id === +id;
		});
		return todo[0];
	}

	// Static method to remove a todo
	static removeTodo(id) {
		const temp = JSON.parse(localStorage.getItem('todos')).filter((element) => {
			return +id !== element.id;
		});
		todos = temp;
		localStorage.setItem('todos', JSON.stringify(temp));
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
		const temp = JSON.parse(localStorage.getItem('todos')).map((element) => {
			if (+element.id === item.id) {
				element.isCompleted = !element.isCompleted;
			}
			return element;
		});
		todos = temp;
		localStorage.setItem('todos', JSON.stringify(temp));
	}

	static setTitle(item, value) {
		const temp = JSON.parse(localStorage.getItem('todos')).map((element) => {
			if (item.id === +element.id) {
				element.title = value;
			}
			return element;
		});
		todos = temp;
		localStorage.setItem('todos', JSON.stringify(temp));
	}

	static setDueDate(item, value) {
		const temp = JSON.parse(localStorage.getItem('todos')).map((element) => {
			if (item.id === +element.id) {
				element.dueDate = value;
			}
			return element;
		});
		todos = temp;
		localStorage.setItem('todos', JSON.stringify(temp));
	}

	static setPriority(item, value) {
		const temp = JSON.parse(localStorage.getItem('todos')).map((element) => {
			if (item.id === +element.id) {
				element.priority = value;
			}
			return element;
		});
		todos = temp;
		localStorage.setItem('todos', JSON.stringify(temp));
	}

	static setDesc(item, value) {
		const temp = JSON.parse(localStorage.getItem('todos')).map((element) => {
			if (item.id === +element.id) {
				element.desc = value;
			}
			return element;
		});
		todos = temp;
		localStorage.setItem('todos', JSON.stringify(temp));
	}

	static setNotes(item, value) {
		const temp = JSON.parse(localStorage.getItem('todos')).map((element) => {
			if (item.id === +element.id) {
				element.notes = value;
			}
			return element;
		});
		todos = temp;
		localStorage.setItem('todos', JSON.stringify(temp));
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
