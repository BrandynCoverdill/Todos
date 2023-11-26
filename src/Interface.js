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
function updateProjects(id) {
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

	// Add click events for each project title except selected project
	const projects = document.querySelectorAll('.project-table tr > td');
	projects.forEach((project) => {
		project.addEventListener('click', (e) => {
			if (e.target.dataset.id === +id) {
				return;
			}
			e.preventDefault();
			showTodos(e.target.dataset.id);
		});
	});

	// TODO: Add dblclick event for each project title
	projects.forEach((project) => {
		project.addEventListener('dblclick', (e) => {
			editProject(e.target.dataset.id);
		});
	});
}

/**
 * Show a table of todos of the selected project
 * @param {Number} id project id
 */
function showTodos(id) {
	// Highlight the project in the table when selected

	// remove previously highlighted project selection
	const projects = document.querySelectorAll('.project-table > tr');
	projects.forEach((project) => {
		project.style.cssText = `
			background: none;
			color: black;
			font-weight: normal;
		`;
	});

	// Styling table for every odd project title
	const oddProjects = document.querySelectorAll(
		'.project-table tr:nth-child(odd)'
	);
	oddProjects.forEach((project) => {
		project.style.cssText = `
			background: rgb(208, 208, 208);
			margin: 0;
		`;
	});

	const selectedProject = document.querySelector(
		`.project-table tr td[data-id="${id}"]`
	);

	// Check if selected project is null, if not, continue with highlight
	if (selectedProject === null) {
		return;
	}

	selectedProject.closest('tr').style.cssText = `
		background: #50AAF7;
		color: #0D2BA6;
		font-weight: bold;
	`;

	// Todo header elements
	const todoh2 = document.createElement('h2');
	const todoHeader = document.createElement('div');
	const todoDiv = document.createElement('div');
	const newTodoBtn = document.createElement('button');
	const deleteProjectBtn = document.createElement('button');

	todoDiv.style.cssText = `
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding-inline-end: 1em;
		margin-block-start: 0.5em;
	`;
	todoh2.textContent = `${Project.getObjectTitle(id)}`;
	newTodoBtn.textContent = '+ new todo';
	deleteProjectBtn.textContent = 'Delete Project';
	todoh2.style.cssText = `
		margin: 0;
	`;
	newTodoBtn.style.cssText = `
        cursor: pointer;
        border: none;
        background: transparent;
        color: blue;
        `;
	deleteProjectBtn.style.cssText = `
		cursor: pointer;
		background: #50AAF7;
		color: #0D2BA6;
		border: 2px solid #0C7DED;
	`;
	todoHeader.style.cssText = `
        border-bottom: 1px solid black;
    `;

	deleteProjectBtn.dataset.id = id;

	// Click event for deleting projects
	deleteProjectBtn.addEventListener('click', (e) => {
		e.preventDefault();
		deleteProject(id);
	});

	// Grab container
	const divContainer = document.querySelector('.todo-container');

	// Empty container to refresh it with new data
	divContainer.textContent = '';

	// Append todo header to add todos
	todoDiv.appendChild(todoh2);
	todoDiv.appendChild(deleteProjectBtn);
	todoHeader.appendChild(todoDiv);
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
	updateProjects(projectId);

	// Replace the title with a textbox with the title selected
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
				return;
			}
			// If validation is good, replace input with title given
			newProject.setTitle = titleInput.value.trim();
			updateProjects(projectId);

			// Show todos of this newly created project
			showTodos(projectId);
		}
	});
}

/**
 * Update a project in the table
 * @param {Number} id project id
 */
function editProject(id) {
	// Grab the selected element
	let selectedProject = document.querySelector(
		`.project-table tr td[data-id="${id}"]`
	);

	// If a user dblclick's while editing a title, return
	if (selectedProject === null) {
		return;
	}

	// Grab the text from the element
	const projectTitle = selectedProject.textContent;

	// Replace the text with a textbox
	selectedProject.textContent = '';

	const titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.value = projectTitle;
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
				// Do not update name and replace textbox with title
				selectedProject.removeChild(titleInput);
				updateProjects(id);
				return;
			}
			// If validation is good, replace input with title given

			// set title for project object
			Project.projects().map((project) => {
				if (project.id === +id) {
					project.title = titleInput.value;
				}
				return project;
			});
			selectedProject.removeChild(titleInput);
			updateProjects(id);

			// Show todos of this newly created project
			showTodos(id);
		}
	});
}

function deleteProject(id) {
	// Grab user confirmation of deleting project
	let confirmation = false;
	confirm(
		'Are you sure you want to delete this project? ' +
			"Any todo's in this project will also be deleted."
	)
		? (confirmation = true)
		: (confirmation = false);

	if (confirmation) {
		// Delete the todos
		Todo.removeTodos(id);

		// Delete the project
		Project.removeProject(id);

		// Update Projects
		updateProjects();

		// Make Todo container blank
		const todoContainer = document.querySelector('.todo-container');
		todoContainer.textContent = '';
	}
}

export { userInterface, showTodos, createProject, editProject };
