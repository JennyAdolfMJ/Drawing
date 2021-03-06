import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Wall extends Component{
  render() {
    var borders = this.props.borders;

    var d = "M" + borders[1][1].toString();
    for(var i=0; i<2; i++)
    {
      for(var j=0; j<2; j++)
      {
        d += "L" + borders[i][j].toString();
      }
    }

    return <path fill="#d5d5d5" stroke="#333333" strokeOpacity="1" strokeWidth="2"  
                 strokeLinejoin="round" strokeLinecap="round" d={d} />
  }
}

Wall.propTypes = {
  borders: PropTypes.objectOf(Array).isRequired,
}

class WallList extends Component{
  render() {
    if (this.props.borders.length > 0) {
      return (
        <g strokeWidth="1">
          {this.props.borders.map((wall, index) => (<Wall key={index} borders={wall} />))}
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
