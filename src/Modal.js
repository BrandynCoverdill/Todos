import 'normalize.css';
import './styles.css';
import Todo from './Todo';
import { showTodos } from './Interface';

/**
 * Returns this UI when the user adds a new todo, edits a todo, or views a todo
 */
function modal(view, id) {
	const parent = document.createElement('div');
	const container = document.createElement('div');
	const closeBtn = document.createElement('button');

	// Style the modal
	parent.style.cssText = `
        min-height: 300px;
        width: 96%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, .95);
        color: black;
        position: absolute;
        top: 20px;
        left: 2%;
        border: 3px solid black;
        pointer-events: auto;
        user-select: auto;
    `;
	parent.classList.add('modal');

	// Style the container
	container.style.cssText = `
        height: 100%;
        width: 100%;
        padding: 10px;
    `;

	// Style the close button
	closeBtn.style.cssText = `
		cursor: pointer;
		background: #50AAF7;
		color: #0D2BA6;
		border: 2px solid #0C7DED;
		position: absolute;
		bottom: 10px;
		right: 10px;
    `;

	// Add event listener to the close button to close the modal
	closeBtn.addEventListener('click', (e) => {
		e.preventDefault();

		// Remove modal
		document.body.removeChild(document.querySelector('.modal'));

		// Update styles on body element
		document.body.style.cssText = `
            opacity: 1;
			pointer-events: auto;
			user-select: auto;
        `;
	});

	// Depending on the argument being passed to modal...
	switch (view) {
		// Creating a new todo
		case 'create':
			// Create elements for the modal
			const addTodoBtn = document.createElement('button');
			const inputDiv = document.createElement('div');
			const title = document.createElement('label');
			const titleInput = document.createElement('input');
			const titleError = document.createElement('p');
			const date = document.createElement('label');
			const dateInput = document.createElement('input');
			const priority = document.createElement('label');
			const priorityRadioDiv = document.createElement('div');
			const priorityLabelLow = document.createElement('label');
			const priorityInputLow = document.createElement('input');
			const priorityLabelMedium = document.createElement('label');
			const priorityInputMedium = document.createElement('input');
			const priorityLabelHigh = document.createElement('label');
			const priorityInputHigh = document.createElement('input');
			const desc = document.createElement('label');
			const descInput = document.createElement('textarea');
			const notes = document.createElement('label');
			const notesInput = document.createElement('textarea');

			// Add content for the elements
			closeBtn.textContent = 'Cancel';

			addTodoBtn.textContent = 'Add Todo';
			addTodoBtn.style.cssText = `
				cursor: pointer;
				background: #50AAF7;
				color: #0D2BA6;
				border: 2px solid #0C7DED;
				position: absolute;
				bottom: 10px;
				left: 10px;
			`;
			// Add new todo to the project // TODO
			addTodoBtn.addEventListener('click', (e) => {
				e.preventDefault();

				// Validation of todo title
				if (titleInput.value.trim() === '') {
					titleError.style.cssText += `
						display: block;
					`;
					titleInput.style.cssText += `
						margin: 0;
						border: 1px solid red;
						outline: none;
					`;
					titleInput.value = '';
					titleInput.focus();
					return;
				}

				// Get data from the user for a new todo
				const titleValue = titleInput.value.trim();
				const dateValue = new Date(
					dateInput.value.replace(/-/g, '/').replace(/T.+/, '')
				).toLocaleDateString();
				const priorityValue = document.querySelector(
					'input[name="priority"]:checked'
				).value;
				const descValue = descInput.value.trim();
				const notesValue = notesInput.value.trim();

				// Create new todo
				if (dateValue === 'Invalid Date') {
					const todo = new Todo(
						titleValue,
						descValue,
						undefined,
						+priorityValue,
						notesValue,
						false,
						+id
					);
					console.log({ todo });
					console.log(Todo.todos());
				} else {
					const todo = new Todo(
						titleValue,
						descValue,
						dateValue,
						+priorityValue,
						notesValue,
						false,
						+id
					);
					console.log({ todo });
					console.log(Todo.todos());
				}

				// Remove modal
				document.body.removeChild(document.querySelector('.modal'));

				// Update styles on body element
				document.body.style.cssText = `
            		opacity: 1;
					pointer-events: auto;
					user-select: auto;
        		`;

				// Update todos
				showTodos(id);
			});

			inputDiv.style.cssText = `
				display: flex;
				flex-direction: column;
				overflow: auto;
				margin-block-end: 2em;
			`;

			title.textContent = 'Todo Name:';
			titleInput.style.cssText = `
				width: 10em;
				margin-block-end: 10px;
			`;
			titleError.textContent = 'Please enter a name for the todo.';
			titleError.style.cssText = `
				color: red;
				font-size: .9em;
				margin: 0;
				margin-block-end: 10px;
				font-weight: bold;
				display: none;
			`;

			date.textContent = 'Due Date:';
			dateInput.setAttribute('type', 'date');
			dateInput.style.cssText = `
				width: 10em;
				margin-block-end: 10px;
			`;

			priority.textContent = 'Priority:';
			priorityInputLow.setAttribute('type', 'radio');
			priorityInputLow.setAttribute('name', 'priority');
			priorityInputLow.setAttribute('value', '1');
			priorityInputLow.setAttribute('id', 'lowPriority');
			priorityInputLow.style.cssText = `
				margin-inline-end: 5px;
			`;
			priorityInputLow.setAttribute('checked', 'true');
			priorityLabelLow.setAttribute('for', 'lowPriority');
			priorityLabelLow.textContent = 'Low';

			priorityInputMedium.setAttribute('type', 'radio');
			priorityInputMedium.setAttribute('name', 'priority');
			priorityInputMedium.setAttribute('value', '2');
			priorityInputMedium.setAttribute('id', 'mediumPriority');
			priorityInputMedium.style.cssText = `
				margin-inline-end: 5px;
			`;
			priorityLabelMedium.setAttribute('for', 'mediumPriority');
			priorityLabelMedium.textContent = 'Medium';

			priorityInputHigh.setAttribute('type', 'radio');
			priorityInputHigh.setAttribute('name', 'priority');
			priorityInputHigh.setAttribute('value', '3');
			priorityInputHigh.setAttribute('id', 'highPriority');
			priorityInputHigh.style.cssText = `
				margin-inline-end: 5px;
			`;
			priorityLabelHigh.setAttribute('for', 'highPriority');
			priorityLabelHigh.textContent = 'High';
			priorityRadioDiv.style.cssText = `
				margin-block-end: 10px;
			`;

			desc.textContent = 'Description:';
			descInput.style.cssText = `
				resize: vertical;
				margin-block-end: 10px;
			`;

			notes.textContent = 'Notes:';
			notesInput.style.cssText = `
				resize: vertical;
				margin-block-end: 10px;
			`;

			// Append the elements to the document
			inputDiv.appendChild(title);
			inputDiv.appendChild(titleInput);
			inputDiv.appendChild(titleError);
			inputDiv.appendChild(date);
			inputDiv.appendChild(dateInput);
			inputDiv.appendChild(priority);
			inputDiv.appendChild(priorityRadioDiv);
			priorityRadioDiv.appendChild(priorityInputLow);
			priorityRadioDiv.appendChild(priorityLabelLow);
			priorityRadioDiv.appendChild(document.createElement('br'));
			priorityRadioDiv.appendChild(priorityInputMedium);
			priorityRadioDiv.appendChild(priorityLabelMedium);
			priorityRadioDiv.appendChild(document.createElement('br'));
			priorityRadioDiv.appendChild(priorityInputHigh);
			priorityRadioDiv.appendChild(priorityLabelHigh);
			inputDiv.appendChild(desc);
			inputDiv.appendChild(descInput);
			inputDiv.appendChild(notes);
			inputDiv.appendChild(notesInput);
			container.appendChild(inputDiv);
			container.appendChild(addTodoBtn);
			break;

		// Viewing a todo
		case 'view':
			// Create elements for the modal

			// Add content for the elements
			closeBtn.textContent = 'Cancel';

			// Append the elements to the container

			break;

		// Editing a todo
		case 'edit':
			// Create elements for the modal

			// Add content for the elements
			closeBtn.textContent = 'Cancel';

			// Append the elements to the container

			break;
		default:
			break;
	}

	// Element hierarchy
	container.appendChild(closeBtn);
	parent.appendChild(container);
	document.body.appendChild(parent);
}

export default modal;
