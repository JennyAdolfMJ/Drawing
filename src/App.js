import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import PlanView from './PlanView';
import Toolbar from './Toolbar';
import Util from './Util';

class App extends Component {
  constructor(props) {
    super(props);

    this.selectionChanged = this.selectionChanged.bind(this);

    this.state = {operation: Util.Operation.None};
  }

  selectionChanged(selected){
    var operation = selected ? Util.Operation.Wall : Util.Operation.None;
    this.setState({operation: operation});
  }

  render() {
    return (
      <div>
        <Toolbar selectionChanged={this.selectionChanged}/>
        <PlanView operation={this.state.operation}/>
      </div>
    );
  }
}

export default App;
