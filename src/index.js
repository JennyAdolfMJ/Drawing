import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import PlanView from './PlanView';
import Toolbar from './Toolbar';

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Toolbar />, document.getElementById('toolbar'));
//ReactDOM.render(<PlanView />, document.getElementById('canvas'));
registerServiceWorker();
