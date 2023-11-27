import 'normalize.css';
import './styles.css';
import Todo from './Todo';
import { showTodos } from './Interface';

/**
 * Returns this UI when the user adds a new todo or views a todo
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
	// Elements for each modal argument being passed
	let inputDiv = document.createElement('div');
	let title = document.createElement('label');
	let titleInput = document.createElement('input');
	let titleError = document.createElement('p');
	let date = document.createElement('label');
	let dateInput = document.createElement('input');
	let priority = document.createElement('label');
	let priorityRadioDiv = document.createElement('div');
	let priorityLabelLow = document.createElement('label');
	let priorityInputLow = document.createElement('input');
	let priorityLabelMedium = document.createElement('label');
	let priorityInputMedium = document.createElement('input');
	let priorityLabelHigh = document.createElement('label');
	let priorityInputHigh = document.createElement('input');
	let desc = document.createElement('label');
	let descInput = document.createElement('textarea');
	let notes = document.createElement('label');
	let notesInput = document.createElement('textarea');
	switch (view) {
		// Creating a new todo
		case 'create':
			// Add elements specific for this argument
			let addTodoBtn = document.createElement('button');

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
			// Add new todo to the project
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
			let todo = Todo.getTodo(id);
			// Create elements for the modal
			let markComplete = document.createElement('button');
			let deleteTodoBtn = document.createElement('button');
			let editTodoBtn = document.createElement('button');

			// Add content for the elements
			markComplete.style.cssText = `
				cursor: pointer;
				background: #50AAF7;
				color: #0D2BA6;
				border: 2px solid #0C7DED;
				position: absolute;
				bottom: 10px;
				left: 10px;
			`;
			switch (todo.getIsCompleted) {
				case true:
					markComplete.textContent = 'Mark Incomplete';
					break;
				case false:
					markComplete.textContent = 'Mark Complete';
					break;
				default:
					break;
			}
			// Event to mark a todo as complete
			markComplete.addEventListener('click', (e) => {
				e.preventDefault();
				Todo.markComplete(todo);

				// Remove modal
				document.body.removeChild(document.querySelector('.modal'));

				// Update styles on body element
				document.body.style.cssText = `
            		opacity: 1;
					pointer-events: auto;
					user-select: auto;
        		`;

				// Update todos
				showTodos(todo.inProject);
			});

			editTodoBtn.textContent = 'Edit';
			editTodoBtn.style.cssText = `
				cursor: pointer;
				background: #50AAF7;
				color: #0D2BA6;
				border: 2px solid #0C7DED;
				position: absolute;
				bottom: 10px;
				left: 140px;
			`;
			// Event to edit a todo
			editTodoBtn.addEventListener('click', (e) => {
				e.preventDefault();
				// TODO: Edit Todo
			});

			deleteTodoBtn.textContent = 'Delete Todo';
			deleteTodoBtn.style.cssText = `
				cursor: pointer;
				background: #50AAF7;
				color: #0D2BA6;
				border: 2px solid #0C7DED;
				position: absolute;
				top: 10px;
				right: 10px;
			`;
			// Event to delete a todo from a project
			deleteTodoBtn.addEventListener('click', (e) => {
				e.preventDefault();
				// Delete Todo
				const confirmation = confirm(
					'Are you sure you want to delete this todo?'
				);
				if (confirmation) {
					Todo.removeTodo(todo.id);

					// Remove modal
					document.body.removeChild(document.querySelector('.modal'));

					// Update styles on body element
					document.body.style.cssText = `
            		opacity: 1;
					pointer-events: auto;
					user-select: auto;
        		`;

					// Update todos
					showTodos(+todo.inProject);
				}
			});

			closeBtn.textContent = 'Close';

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
			titleInput.setAttribute('disabled', 'true');
			titleInput.value = todo.getTitle;

			date.textContent = 'Due Date:';
			dateInput.setAttribute('disabled', 'true');
			dateInput.style.cssText = `
				width: 10em;
				margin-block-end: 10px;
			`;
			dateInput.value = todo.getDueDate;

			switch (todo.getPriority) {
				case 1:
					priority.textContent = `Priority: ${'Low'}`;
					break;
				case 2:
					priority.textContent = `Priority: ${'Medium'}`;
					break;
				case 3:
					priority.textContent = `Priority: ${'High'}`;
					break;
				default:
					break;
			}

			priority.style.cssText = `
				margin-block-end: 10px;
			`;

			desc.textContent = 'Description:';
			descInput.style.cssText = `
				resize: vertical;
				margin-block-end: 10px;
			`;
			descInput.setAttribute('disabled', 'true');
			descInput.value = todo.getDesc;

			notes.textContent = 'Notes:';
			notesInput.style.cssText = `
				resize: vertical;
				margin-block-end: 10px;
			`;
			notesInput.setAttribute('disabled', 'true');
			notesInput.value = todo.getNotes;

			// Append the elements to the document
			inputDiv.appendChild(title);
			inputDiv.appendChild(titleInput);
			inputDiv.appendChild(date);
			inputDiv.appendChild(dateInput);
			inputDiv.appendChild(priority);
			inputDiv.appendChild(desc);
			inputDiv.appendChild(descInput);
			inputDiv.appendChild(notes);
			inputDiv.appendChild(notesInput);
			container.appendChild(inputDiv);
			container.appendChild(markComplete);
			container.appendChild(editTodoBtn);
			container.appendChild(deleteTodoBtn);
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
