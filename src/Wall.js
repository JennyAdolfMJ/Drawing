import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Wall = ({start, end}) => (
  <path fill="#a8ceec" stroke="#a8ceec" strokeOpacity="1" strokeWidth="2" 
        d={"M" + start.x + "," + start.y + "L" + end.x + "," + end.y} />
);

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
