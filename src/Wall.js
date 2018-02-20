import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Line} from './Model/Point';

class Wall extends Component{
  render() {
    var vertices = this.props.vertices;

    var d = "M" + vertices[1][1].toString();
    for(var i=0; i<2; i++)
    {
      for(var j=0; j<2; j++)
      {
        d += "L" + vertices[i][j].toString();
      }
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
    if (this.props.vertices.length > 0) {
      return (
        <g strokeWidth="1">
          {this.props.vertices.map((wall, index) => (<Wall key={index} vertices={wall} />))}
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
