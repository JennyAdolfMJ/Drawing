import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PlanView from './PlanView';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PlanView />, document.getElementById('canvas'));
registerServiceWorker();
