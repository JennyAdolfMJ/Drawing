import React, { Component } from 'react';
import './Toolbar.css';
import wall from './Resource/wall.svg';
import furniture from './Resource/furniture.svg';
import ReactSVG from 'react-svg';

var tool_selected =  {
	stroke: "#a8ceec",
	fill: "#ffffff",
	height: "30px",
	margin: "5px"
}

class Toolbar extends Component {
  constructor(props) {
    super(props);

		this.state = {selTool: ""};
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
			this.setState({selTool: ""});
		}
		else
		{
			this.setState({selTool: event.currentTarget.id});
		}

		this.props.selectionChanged(this.state.selTool);
	}

	getClassName(id)
	{
		return this.state.selTool === id ? "tool-selected" : "tool-normal";
	}

  render() {

    return (
      <div className="none">
				<ReactSVG path={wall} className={this.getClassName("wall")} wrapperClassName="none" 
									callback={(svg) => this.callback(svg)} />
				<ReactSVG path={furniture} className={this.getClassName("furniture")} wrapperClassName="none" 
									callback={(svg) => this.callback(svg)} />
      </div>
    )
  }
}

export default Toolbar;