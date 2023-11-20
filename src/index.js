import 'normalize.css';
import './styles.css';

const body = document.querySelector('body');

const element = document.createElement('h1');
const element2 = document.createElement('h2');
element.textContent = 'h1 text';
element2.textContent = 'h2 text';
body.appendChild(element);
body.appendChild(element2);
