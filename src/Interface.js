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

	// Default project
	const defaultProject = createDefaultProject();

	// Temp data
	const firstProject = new Project('First Project');
	const secondProject = new Project('Second Project');
	const thirdProject = new Project('Third Project');
	const fourthProject = new Project('Fourth Project');
	const fifthProject = new Project('Fifth Project');
	console.log(Project.projects());

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
	const todoHeader = document.createElement('div');
	const newTodoBtn = document.createElement('button');
	const todoTbl = document.createElement('table');

	// If there are any projects, add to projectTbl
	Project.projects().forEach((project) => {
		const tr = document.createElement('tr');
		const td = document.createElement('td');

		td.textContent = project.getTitle;

		td.style.cssText = `
            font-size: 1.25em;
            white-space: nowrap;
            cursor: pointer;
        `;

		tr.appendChild(td);
		projectTbl.appendChild(tr);
	});

	// If there are any todos, add to todoTbl

	// Style and add attributes to elements
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

	newTodoBtn.style.cssText = `
        cursor: pointer;
        border: none;
        background: transparent;
        color: blue;
    `;

	todoHeader.style.cssText = `
        border-block-end: 1px solid black;
    `;

	// Add text to elements
	newTodoBtn.textContent = '+ new todo';

	// Element hierarchy
	todoHeader.appendChild(newTodoBtn);
	todoDiv.appendChild(todoHeader);
	todoDiv.appendChild(todoTbl);
	projectDiv.appendChild(projectTbl);
	grid.appendChild(projectDiv);
	grid.appendChild(todoDiv);
	parent.appendChild(grid);

	// Return parent
	return parent;
}

function updateProjects() {}

/**
 * Creates a default project
 * @returns defaultProject
 */
function createDefaultProject() {
	const defaultProject = new Project();
	return defaultProject;
}

export { userInterface, updateProjects };
