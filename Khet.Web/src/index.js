//import 'bulma/css/bulma.css'
import App from './components/app';
import { h, render } from 'preact';

let root;

function init() {
    root = render(<App/>, document.body, root);
}

init();





