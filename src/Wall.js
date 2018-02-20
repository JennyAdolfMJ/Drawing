import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Line} from './Model/Point';

var OFFSET = 16;

class Wall extends Component{
  render() {
    var line = this.props.line;
    var deltaX = OFFSET * (line.points[1].y - line.points[0].y) / line.length;
    var deltaY = OFFSET * (line.points[1].x - line.points[0].x) / line.length;
    var point = [];

    point.push({x: line.points[0].x - deltaX, y: line.points[0].y + deltaY});
    point.push({x: line.points[0].x + deltaX, y: line.points[0].y - deltaY});
    point.push({x: line.points[1].x + deltaX, y: line.points[1].y - deltaY});
    point.push({x: line.points[1].x - deltaX, y: line.points[1].y + deltaY});

    var d = "M" + point[3].x + "," + point[3].y;
    for(var i=0; i<4; i++)
    {
      d += "L" + point[i].x + "," + point[i].y;
    }

    return <path fill="#d5d5d5" stroke="#333333" strokeOpacity="1" strokeWidth="2"  
                 strokeLinejoin="round" strokeLinecap="round" d={d} />
  }
}

Wall.propTypes = {
  line: PropTypes.objectOf(Line).isRequired,
}

class WallList extends Component{
  render() {
    if (this.props.walls.length > 0) {
      return (
        <g strokeWidth="1">
          {this.props.walls.map((wall, index) => (<Wall key={index} line={wall} />))}
        </g>
      )
    }

    return null
  }
}

WallList.propTypes = {
  walls: PropTypes.arrayOf(
    PropTypes.Wall
  ).isRequired
}

export default WallList;
