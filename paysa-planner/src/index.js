import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';
import * as serviceWorker from './tests/serviceWorker';


// BASICALLY THIS IS SAYING,
// LOOK AT INDEX.HTML
// INSIDE THE ELEMENT WITH ID 'ROOT' (WHICH IS EMPTY)
// RENDER THE 'APP' COMPONENT
// SO PUT <App /> INSIDE document.getElementById('root')

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
