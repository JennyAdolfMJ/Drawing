import React, { Component } from 'react';
import './App.css';
import PlanView from './PlanView';
import Toolbar from './Toolbar';

class App extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <PlanView />
      </div>
    );
  }
}

export default App;
