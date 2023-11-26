import 'normalize.css';
import './styles.css';
import Todo from './Todo';
import Project from './Project';

/**
 * Returns the ui for the application
 * @returns parent
 */
function userInterface() {
	// Create a parent element that contains all dom elements
	const parent = document.createElement('div');

	// Default project object
	const defaultProject = createDefaultProject();

	// Default todo object
	const defaultTodo = new Todo(
		'Untitled Todo',
		'',
		undefined,
		1,
		'',
		false,
		defaultProject.getId
	);

	// Temp project objects
	const project1 = new Project('Project 1');
	const project2 = new Project('Project 2');

	// Temp todo objects
	const todo1 = new Todo(
		'Bake supper for family tonight',
		'',
		new Date().toLocaleDateString(),
		3,
		'',
		false,
		defaultProject.getId
	);
	const todo2 = new Todo(
		'Drink water',
		'',
		undefined,
		2,
		'',
		false,
		defaultProject.getId
	);
	const todo3 = new Todo(
		'Mow the lawn for extra $$$',
		'',
		undefined,
		1,
		'',
		false,
		project1.getId
	);
	const todo4 = new Todo(
		'Call Rebecca',
		'',
		undefined,
		2,
		'',
		false,
		project1.getId
	);

	// Append elements to the parent element.
	parent.appendChild(header());
	parent.appendChild(content());

	// return parent element
	return parent;
}

/**
 * Create a header for the ui
 * @returns parent
 */
function header() {
	// Create elements
	const parent = document.createElement('header');
	const h1 = document.createElement('h1');
	const newProjectBtn = document.createElement('button');
	// Add content to the elements
	h1.textContent = 'TODO UI';
	newProjectBtn.textContent = '+ new project';

	// Style elements and add attributes
	newProjectBtn.classList.add('new-project');

	newProjectBtn.style.cssText = `
        cursor: pointer;
        border: none;
        background: transparent;
        color: blue;
    `;

	h1.style.cssText = `
        margin: 0;
        padding: 0;
        margin-block-end: 0.5em;
        padding-inline: 0.5em;
    `;

	parent.style.cssText = `
        border-bottom: 3px solid black;
        padding-block-start: 0.5em;
    `;

	// Create element hierarchy
	parent.appendChild(h1);
	parent.appendChild(newProjectBtn);

	// return parent element
	return parent;
}

/**
 * Create the main content of the app - project/todo list
 * @returns parent
 */
function content() {
	// Create elements
	const parent = document.createElement('main');
	const grid = document.createElement('div');
	const projectDiv = document.createElement('div');
	const projectTbl = document.createElement('table');
	const todoDiv = document.createElement('div');

	// If there are any projects, add to projectTbl
	Project.projects().forEach((project) => {
		const tr = document.createElement('tr');
		const td = document.createElement('td');

		td.textContent = project.getTitle;
		td.dataset.id = project.getId;

		td.style.cssText = `
            font-size: 1.25em;
            white-space: nowrap;
            cursor: pointer;
        `;

		tr.appendChild(td);
		projectTbl.appendChild(tr);
	});

	// Style and add attributes to elements
	projectTbl.classList.add('project-table');
	todoDiv.classList.add('todo-container');

	parent.style.cssText = `
        min-height: 1.25em;
        border-block-end: 3px solid black;
    `;

	grid.style.cssText = `
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 1fr;
    `;

	projectDiv.style.cssText = `
        grid-column: 1 / 2;
        overflow: auto;
        border-inline-end: 3px solid black;
    `;

	projectTbl.style.cssText = `
        width: 100%;
    `;

	todoDiv.style.cssText = `
        grid-column: 2 / 3;
        overflow: auto;
    `;

	// Element hierarchy
	projectDiv.appendChild(projectTbl);
	grid.appendChild(projectDiv);
	grid.appendChild(todoDiv);
	parent.appendChild(grid);

	// Return parent
	return parent;
}

/**
 * Updates the project table
 */
function updateProjects() {
	const projectTbl = document.querySelector('.project-table');

	projectTbl.textContent = '';

	Project.projects().forEach((project) => {
		const tr = document.createElement('tr');
		const td = document.createElement('td');

		td.textContent = project.getTitle;
		td.dataset.id = project.getId;

		td.style.cssText = `
            font-size: 1.25em;
            white-space: nowrap;
            cursor: pointer;
        `;

		tr.appendChild(td);
		projectTbl.appendChild(tr);
	});
}

/**
 * Show a table of todos of the selected project
 * @param {Number} id project id
 */
function showTodos(id) {
	// Todo header elements
	const todoh2 = document.createElement('h2');
	const todoHeader = document.createElement('div');
	const newTodoBtn = document.createElement('button');

	todoh2.textContent = `${Project.projects()[id].getTitle}`;
	newTodoBtn.textContent = '+ new todo';
	todoh2.style.cssText = `
		margin: 0;
	`;
	newTodoBtn.style.cssText = `
            cursor: pointer;
            border: none;
            background: transparent;
            color: blue;
        `;
	todoHeader.style.cssText = `
        border-bottom: 1px solid black;
    `;

	// Grab container
	const divContainer = document.querySelector('.todo-container');

	// Empty container to refresh it with new data
	divContainer.textContent = '';

	// Append todo header to add todos
	todoHeader.appendChild(todoh2);
	todoHeader.appendChild(newTodoBtn);
	divContainer.appendChild(todoHeader);

	// Create elements for the table
	const todoTbl = document.createElement('table');

	// Grab todos only relavent to project
	const temp = Todo.todos().filter((todo) => {
		return todo.inProject == id;
	});

	// If there are no todos in a project
	if (temp.length === 0) {
		const p = document.createElement('p');
		p.textContent = 'No Todos';
		p.style.cssText = `
            margin: 0;
        `;
		divContainer.appendChild(p);
	}

	// Add todo to the table
	temp.forEach((todo) => {
		// Todo table elements
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		const title = document.createElement('span');
		const date = document.createElement('span');

		title.textContent = todo.getTitle;
		date.textContent = `Due: ${todo.getDueDate}`;

		td.dataset.id = todo.id;

		td.style.cssText = `
            white-space: nowrap;
            cursor: pointer;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            gap: 0.5em;
        `;

		// Color the todo's depending on priority
		switch (todo.getPriority) {
			case 1:
				// No coloring
				break;
			case 2:
				tr.style.cssText = `
                    background: #F4F28A;
                `;
				break;
			case 3:
				tr.style.cssText = `
                    background: #FF7A7A;
                    font-weight: bold;
                `;
				break;
			default:
				break;
		}

		// Append table elements to table
		td.appendChild(title);
		td.appendChild(date);
		tr.appendChild(td);
		todoTbl.appendChild(tr);
	});

	// Style table
	todoTbl.style.cssText = `
            width: 100%;
        `;

	// Element hierarchy

	// If todo table is empty
	if (temp.length > 0) {
		divContainer.appendChild(todoTbl);
	}
}

/**
 * Creates a default project
 * @returns defaultProject
 */
function createDefaultProject() {
	const defaultProject = new Project();
	return defaultProject;
}

/**
 * Creates a new project from the user event
 */
function createProject() {
	// Create Default project
	const newProject = createDefaultProject();

	// Track project id
	const projectId = newProject.getId;

	// Append the new project in the table
	updateProjects();

	// Replace the title with a textbox with the title highlighted
	const selectedProject = document.querySelector(
		`.project-table tr td[data-id="${projectId}"]`
	);
	selectedProject.textContent = '';

	const titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.value = 'Untitled Project';
	titleInput.style.cssText = `
		width: 100%;
    `;
	selectedProject.appendChild(titleInput);
	titleInput.focus();
	titleInput.select();

	// Add event for when the user presses enter
	selectedProject.addEventListener('keydown', (e) => {
		if (e.keyCode === 13 || e.key === 'Enter') {
			// Validate title entered by user
			if (titleInput.value.trim() === '') {
				Project.removeProject(projectId);
				updateProjects();

				// Add click events for each project title
				const projects = document.querySelectorAll('.project-table tr > td');
				projects.forEach((project) => {
					project.addEventListener('click', (e) => {
						showTodos(e.target.dataset.id);
					});
				});
				return;
			}
			// If validation is good, replace input with title given
			newProject.setTitle = titleInput.value.trim();
			updateProjects();

			// Add click events for each project title
			const projects = document.querySelectorAll('.project-table tr > td');
			projects.forEach((project) => {
				project.addEventListener('click', (e) => {
					showTodos(e.target.dataset.id);
				});
			});
			// Show todos of this newly created project
			showTodos(projectId);
		}
	});
}

export { userInterface, showTodos, createProject };
