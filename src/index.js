import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PlanView from './PlanView';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<PlanView />, document.getElementById('root'));
registerServiceWorker();
