import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import './Toolbar.css';
import AppManager from './Controller/AppManager';
import wall from './Resource/wall.svg';
import furniture from './Resource/furniture.svg';

class Toolbar extends Component {
  constructor(props) {
    super(props);

		AppManager.GetInstance().toolbar = this;
		this.state = {selTool: AppManager.GetInstance().operation};
	}

	callback(svg)
	{
		svg.parentElement.parentElement.appendChild(svg);
		svg.parentElement.removeChild(svg.parentElement.firstChild);
		svg.onclick = (event) => this.onClick(event);
	}

	onClick(event)
	{
		if(this.state.selTool === event.currentTarget.id)
		{
			AppManager.GetInstance().operation = AppManager.Operation.None;
		}
		else
		{
			AppManager.GetInstance().operation = event.currentTarget.id;
		}

		this.setState({selTool: AppManager.GetInstance().operation});
	}

	getClassName(id)
	{
		return this.state.selTool === id ? "tool-selected" : "tool-normal";
	}

  render() {

    return (
      <div className="toolbar">
				<ReactSVG path={wall} className={this.getClassName("wall")} wrapperClassName="none" 
									callback={(svg) => this.callback(svg)} />
				<ReactSVG path={furniture} className={this.getClassName("furniture")} wrapperClassName="none" 
									callback={(svg) => this.callback(svg)} />
      </div>
    )
  }
}

export default Toolbar;