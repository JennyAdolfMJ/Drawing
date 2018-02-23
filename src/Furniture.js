import React, { Component } from 'react';
import bed from './Resource/bed.png';

class Furniture extends Component{
  render() {
    var furniture = this.props.furniture;

    return <image x={furniture.x} y={furniture.y} width="81" xlinkHref={bed}></image>
  }
}

class FurnitureList extends Component{
  render() {
    if (this.props.furnitures.length > 0) {
      return (
        <g>
          {this.props.furnitures.map((furniture, index) => (<Furniture key={index} furniture={furniture} />))}
        </g>
      )
    }

    return null
  }
}

export default FurnitureList;
