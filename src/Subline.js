import React, { Component } from 'react';

class Subline extends Component{
  render() {
    var subline = this.props.subline;
    var viewBox = this.props.viewBox;

    var d;
    if(subline.y === 0)
    {
      d = "M" + subline.x + "," + viewBox.y;
      d += "L" + subline.x + "," + (viewBox.y + viewBox.h);
    }
    else
    {
      d = "M" + viewBox.x + "," + subline.y;
      d += "L" + (viewBox.x + viewBox.w) + "," + subline.y;
    }

    return <path stroke="#0000ff" strokeOpacity="1" strokeWidth="1" d={d} />
  }
}

class SublineList extends Component{
  render() {
    var sublines=[];
    for (var key of this.props.sublines) {
      sublines.push(key[1]);
    }

    if (sublines.length > 0) {
      return (
        <g strokeWidth="1">
          {sublines.map((subline, index) => (
            <Subline key={index} subline={subline} viewBox={this.props.viewBox} />
          ))}
        </g>
      )
    }

    return null
  }
}

export default SublineList;
