import React, { Component } from 'react';
import PropTypes from 'prop-types';

var OFFSET = 16;

class Wall extends Component{
  render() {
    var start = this.props.start;
    var end = this.props.end;
    var length = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
    var deltaX = OFFSET * (end.y - start.y) / length;
    var deltaY = OFFSET * (end.x - start.x) / length;
    var point = [];

    point.push({x: start.x - deltaX, y: start.y + deltaY});
    point.push({x: start.x + deltaX, y: start.y - deltaY});
    point.push({x: end.x + deltaX, y: end.y - deltaY});
    point.push({x: end.x - deltaX, y: end.y + deltaY});

    var d = "M" + point[3].x + "," + point[3].y;
    for(var i=0; i<4; i++)
    {
      d += "L" + point[i].x + "," + point[i].y;
    }

    return <path fill="#a8ceec" stroke="#333333" strokeOpacity="1" strokeWidth="2"  
                 strokeLinejoin="round" strokeLinecap="round" d={d} />
  }
}

Wall.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired
}

class WallList extends Component{
  render() {
    if (this.props.walls.length > 0) {
      return (
        <g strokeWidth="1">
          {this.props.walls.map((wall, index) => (<Wall key={index} start={wall.start} end={wall.end} />))}
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
