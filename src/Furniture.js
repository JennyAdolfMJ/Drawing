import React, { Component } from 'react';
import bed from './Resource/bed.png';

class Furniture extends Component{
  render() {
    var furniture = this.props.furniture;

    return <image x={furniture.x} y={furniture.y} width="81" xlinkHref={bed}
    preserveAspectRatio="none"  stroke="#333333" stroke-width="0" 
    transform="matrix(1,0,0,1,0,0)" opacity="1" pointer-events=""></image>
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
