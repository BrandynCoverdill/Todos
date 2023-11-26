import 'normalize.css';
import './styles.css';

/**
 * Returns the UI when the user adds a new todo or edits a todo
 */
function modal() {
	const parent = document.createElement('div');
	const container = document.createElement('div');
	const closeBtn = document.createElement('button');

	// Style the modal
	parent.style.cssText = `
        height: 50%;
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
        z-index: 1;
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
    `;
	closeBtn.textContent = 'Close';

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

	// Element hierarchy
	container.appendChild(closeBtn);
	parent.appendChild(container);
	document.body.appendChild(parent);
}

export default modal;
