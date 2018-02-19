import React, { Component } from 'react';
import WallList from './Wall';
import Util from './Util';

class PlanView extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    var width = window.innerWidth;
    var height = window.innerHeight - 40;
    
    this.state = {
      lastEvent: null,
      holding : false,
      walls : [],
      viewBox : {x: -width/2, y: -height/2, w: width, h: height}};
  }

  handleMouseDown(event) {
    this.setState({lastEvent: {clientX: event.clientX, clientY: event.clientY}});
    this.setState({holding: true});
  }

  handleMouseMove(event) {
    if(!this.state.holding)
      return;

    switch(this.props.operation)
    {
      case Util.Operation.None:
        this.renderViewBox(event); break;
      case Util.Operation.Wall:
        this.renderWall(event); break;
      default:
    }
  }

  handleMouseUp(event) {
    this.setState({holding: false});
  }

  handleWheel(event) {
    var viewBox = this.state.viewBox;
    var factor = event.deltaY > 0 ? 0.01 : -0.01;

    var point = Util.convertCoordinate(event, this.state.viewBox);
    viewBox.x += (viewBox.x - point.x) * factor;
    viewBox.y += (viewBox.y - point.y) * factor;
    viewBox.w *= 1 + factor;
    viewBox.h *= 1 + factor;

    this.setState({viewBox: viewBox});
  }

  renderWall(event)
  {
    var walls = this.state.walls;
    var ep = Util.convertCoordinate(event, this.state.viewBox);

    if(this.state.lastEvent != null) {
      var sp = Util.convertCoordinate(this.state.lastEvent, this.state.viewBox);
      var wall = {start: sp, end:ep};
      walls.push(wall);
      this.setState({lastEvent: null});
    }
    else
    {
      walls[walls.length-1].end = ep;
    }

    this.setState({walls: walls});
  }

  renderViewBox(event)
  {
    var sp = Util.convertCoordinate(this.state.lastEvent, this.state.viewBox);
    var ep = Util.convertCoordinate(event, this.state.viewBox);
    var viewBox = this.state.viewBox;

    viewBox.x -= ep.x - sp.x;
    viewBox.y -= ep.y - sp.y;

    this.setState({viewBox: viewBox});
    this.setState({lastEvent: {clientX: event.clientX, clientY: event.clientY}});
  }

  getViewBox()
  {
    return this.state.viewBox.x + " " + this.state.viewBox.y + " " + this.state.viewBox.w + " " + this.state.viewBox.h;
  }

  render() {
    return (
      <div onMouseDown={(event) => this.handleMouseDown(event)} 
           onMouseMove={(event) => this.handleMouseMove(event)} 
           onMouseUp={(event) => this.handleMouseUp(event)}
           onWheel={(event) => this.handleWheel(event)}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox={this.getViewBox()}>
            <circle cx="100" cy="50" r="40" stroke="black" strokeWidth="2" fill="red" />
            <g strokeWidth="1">
              <path fill="none" stroke="#d5d5d5" d="M-6835,-68L6835,-68M-6835,68L6835,68M-6835,-137L6835,-137M-6835,137L6835,137M-6835,-205L6835,-205M-6835,205L6835,205M-6835,-273L6835,-273M-6835,273L6835,273M-6835,-410L6835,-410M-6835,410L6835,410M-6835,-478L6835,-478M-6835,478L6835,478M-6835,-547L6835,-547M-6835,547L6835,547M-6835,-615L6835,-615M-6835,615L6835,615M-6835,-752L6835,-752M-6835,752L6835,752M-6835,-820L6835,-820M-6835,820L6835,820M-6835,-889L6835,-889M-6835,889L6835,889M-6835,-957L6835,-957M-6835,957L6835,957M-6835,-1094L6835,-1094M-6835,1094L6835,1094M-6835,-1162L6835,-1162M-6835,1162L6835,1162M-6835,-1230L6835,-1230M-6835,1230L6835,1230M-6835,-1299L6835,-1299M-6835,1299L6835,1299M-6835,-1435L6835,-1435M-6835,1435L6835,1435M-6835,-1504L6835,-1504M-6835,1504L6835,1504M-6835,-1572L6835,-1572M-6835,1572L6835,1572M-6835,-1640L6835,-1640M-6835,1640L6835,1640M-6835,-1777L6835,-1777M-6835,1777L6835,1777M-6835,-1845L6835,-1845M-6835,1845L6835,1845M-6835,-1914L6835,-1914M-6835,1914L6835,1914M-6835,-1982L6835,-1982M-6835,1982L6835,1982M-6835,-2119L6835,-2119M-6835,2119L6835,2119M-6835,-2187L6835,-2187M-6835,2187L6835,2187M-6835,-2256L6835,-2256M-6835,2256L6835,2256M-6835,-2324L6835,-2324M-6835,2324L6835,2324M-6835,-2461L6835,-2461M-6835,2461L6835,2461M-6835,-2529L6835,-2529M-6835,2529L6835,2529M-6835,-2597L6835,-2597M-6835,2597L6835,2597M-6835,-2666L6835,-2666M-6835,2666L6835,2666M-6835,-2802L6835,-2802M-6835,2802L6835,2802M-6835,-2871L6835,-2871M-6835,2871L6835,2871M-6835,-2939L6835,-2939M-6835,2939L6835,2939M-6835,-3007L6835,-3007M-6835,3007L6835,3007M-6835,-3144L6835,-3144M-6835,3144L6835,3144M-6835,-3212L6835,-3212M-6835,3212L6835,3212M-6835,-3281L6835,-3281M-6835,3281L6835,3281M-6835,-3349L6835,-3349M-6835,3349L6835,3349M-6835,-3486L6835,-3486M-6835,3486L6835,3486M-6835,-3554L6835,-3554M-6835,3554L6835,3554M-6835,-3623L6835,-3623M-6835,3623L6835,3623M-6835,-3691L6835,-3691M-6835,3691L6835,3691M-6835,-3828L6835,-3828M-6835,3828L6835,3828M-6835,-3896L6835,-3896M-6835,3896L6835,3896M-6835,-3964L6835,-3964M-6835,3964L6835,3964M-6835,-4033L6835,-4033M-6835,4033L6835,4033M-6835,-4169L6835,-4169M-6835,4169L6835,4169M-6835,-4238L6835,-4238M-6835,4238L6835,4238M-6835,-4306L6835,-4306M-6835,4306L6835,4306M-6835,-4374L6835,-4374M-6835,4374L6835,4374M-6835,-4511L6835,-4511M-6835,4511L6835,4511M-6835,-4579L6835,-4579M-6835,4579L6835,4579M-6835,-4648L6835,-4648M-6835,4648L6835,4648M-6835,-4716L6835,-4716M-6835,4716L6835,4716M-6835,-4853L6835,-4853M-6835,4853L6835,4853M-6835,-4921L6835,-4921M-6835,4921L6835,4921M-6835,-4990L6835,-4990M-6835,4990L6835,4990M-6835,-5058L6835,-5058M-6835,5058L6835,5058M-6835,-5195L6835,-5195M-6835,5195L6835,5195M-6835,-5263L6835,-5263M-6835,5263L6835,5263M-6835,-5331L6835,-5331M-6835,5331L6835,5331M-6835,-5400L6835,-5400M-6835,5400L6835,5400M-6835,-5536L6835,-5536M-6835,5536L6835,5536M-6835,-5605L6835,-5605M-6835,5605L6835,5605M-6835,-5673L6835,-5673M-6835,5673L6835,5673M-6835,-5741L6835,-5741M-6835,5741L6835,5741M-6835,-5878L6835,-5878M-6835,5878L6835,5878M-6835,-5946L6835,-5946M-6835,5946L6835,5946M-6835,-6015L6835,-6015M-6835,6015L6835,6015M-6835,-6083L6835,-6083M-6835,6083L6835,6083M-6835,-6220L6835,-6220M-6835,6220L6835,6220M-6835,-6288L6835,-6288M-6835,6288L6835,6288M-6835,-6357L6835,-6357M-6835,6357L6835,6357M-6835,-6425L6835,-6425M-6835,6425L6835,6425M-6835,-6562L6835,-6562M-6835,6562L6835,6562M-6835,-6630L6835,-6630M-6835,6630L6835,6630M-6835,-6698L6835,-6698M-6835,6698L6835,6698M-6835,-6767L6835,-6767M-6835,6767L6835,6767M68,6835L68,-6835M-68,6835L-68,-6835M137,6835L137,-6835M-137,6835L-137,-6835M205,6835L205,-6835M-205,6835L-205,-6835M273,6835L273,-6835M-273,6835L-273,-6835M410,6835L410,-6835M-410,6835L-410,-6835M478,6835L478,-6835M-478,6835L-478,-6835M547,6835L547,-6835M-547,6835L-547,-6835M615,6835L615,-6835M-615,6835L-615,-6835M752,6835L752,-6835M-752,6835L-752,-6835M820,6835L820,-6835M-820,6835L-820,-6835M889,6835L889,-6835M-889,6835L-889,-6835M957,6835L957,-6835M-957,6835L-957,-6835M1094,6835L1094,-6835M-1094,6835L-1094,-6835M1162,6835L1162,-6835M-1162,6835L-1162,-6835M1230,6835L1230,-6835M-1230,6835L-1230,-6835M1299,6835L1299,-6835M-1299,6835L-1299,-6835M1435,6835L1435,-6835M-1435,6835L-1435,-6835M1504,6835L1504,-6835M-1504,6835L-1504,-6835M1572,6835L1572,-6835M-1572,6835L-1572,-6835M1640,6835L1640,-6835M-1640,6835L-1640,-6835M1777,6835L1777,-6835M-1777,6835L-1777,-6835M1845,6835L1845,-6835M-1845,6835L-1845,-6835M1914,6835L1914,-6835M-1914,6835L-1914,-6835M1982,6835L1982,-6835M-1982,6835L-1982,-6835M2119,6835L2119,-6835M-2119,6835L-2119,-6835M2187,6835L2187,-6835M-2187,6835L-2187,-6835M2256,6835L2256,-6835M-2256,6835L-2256,-6835M2324,6835L2324,-6835M-2324,6835L-2324,-6835M2461,6835L2461,-6835M-2461,6835L-2461,-6835M2529,6835L2529,-6835M-2529,6835L-2529,-6835M2597,6835L2597,-6835M-2597,6835L-2597,-6835M2666,6835L2666,-6835M-2666,6835L-2666,-6835M2802,6835L2802,-6835M-2802,6835L-2802,-6835M2871,6835L2871,-6835M-2871,6835L-2871,-6835M2939,6835L2939,-6835M-2939,6835L-2939,-6835M3007,6835L3007,-6835M-3007,6835L-3007,-6835M3144,6835L3144,-6835M-3144,6835L-3144,-6835M3212,6835L3212,-6835M-3212,6835L-3212,-6835M3281,6835L3281,-6835M-3281,6835L-3281,-6835M3349,6835L3349,-6835M-3349,6835L-3349,-6835M3486,6835L3486,-6835M-3486,6835L-3486,-6835M3554,6835L3554,-6835M-3554,6835L-3554,-6835M3623,6835L3623,-6835M-3623,6835L-3623,-6835M3691,6835L3691,-6835M-3691,6835L-3691,-6835M3828,6835L3828,-6835M-3828,6835L-3828,-6835M3896,6835L3896,-6835M-3896,6835L-3896,-6835M3964,6835L3964,-6835M-3964,6835L-3964,-6835M4033,6835L4033,-6835M-4033,6835L-4033,-6835M4169,6835L4169,-6835M-4169,6835L-4169,-6835M4238,6835L4238,-6835M-4238,6835L-4238,-6835M4306,6835L4306,-6835M-4306,6835L-4306,-6835M4374,6835L4374,-6835M-4374,6835L-4374,-6835M4511,6835L4511,-6835M-4511,6835L-4511,-6835M4579,6835L4579,-6835M-4579,6835L-4579,-6835M4648,6835L4648,-6835M-4648,6835L-4648,-6835M4716,6835L4716,-6835M-4716,6835L-4716,-6835M4853,6835L4853,-6835M-4853,6835L-4853,-6835M4921,6835L4921,-6835M-4921,6835L-4921,-6835M4990,6835L4990,-6835M-4990,6835L-4990,-6835M5058,6835L5058,-6835M-5058,6835L-5058,-6835M5195,6835L5195,-6835M-5195,6835L-5195,-6835M5263,6835L5263,-6835M-5263,6835L-5263,-6835M5331,6835L5331,-6835M-5331,6835L-5331,-6835M5400,6835L5400,-6835M-5400,6835L-5400,-6835M5536,6835L5536,-6835M-5536,6835L-5536,-6835M5605,6835L5605,-6835M-5605,6835L-5605,-6835M5673,6835L5673,-6835M-5673,6835L-5673,-6835M5741,6835L5741,-6835M-5741,6835L-5741,-6835M5878,6835L5878,-6835M-5878,6835L-5878,-6835M5946,6835L5946,-6835M-5946,6835L-5946,-6835M6015,6835L6015,-6835M-6015,6835L-6015,-6835M6083,6835L6083,-6835M-6083,6835L-6083,-6835M6220,6835L6220,-6835M-6220,6835L-6220,-6835M6288,6835L6288,-6835M-6288,6835L-6288,-6835M6357,6835L6357,-6835M-6357,6835L-6357,-6835M6425,6835L6425,-6835M-6425,6835L-6425,-6835M6562,6835L6562,-6835M-6562,6835L-6562,-6835M6630,6835L6630,-6835M-6630,6835L-6630,-6835M6698,6835L6698,-6835M-6698,6835L-6698,-6835M6767,6835L6767,-6835M-6767,6835L-6767,-6835Z" strokeWidth="1" className="thin-line"></path>
              <path fill="none" stroke="#d5d5d5" d="M-6835,-342L6835,-342M-6835,342L6835,342M-6835,-683L6835,-683M-6835,684L6835,684M-6835,-1025L6835,-1025M-6835,1025L6835,1025M-6835,-1367L6835,-1367M-6835,1367L6835,1367M-6835,-1709L6835,-1709M-6835,1709L6835,1709M-6835,-2050L6835,-2050M-6835,2051L6835,2051M-6835,-2392L6835,-2392M-6835,2392L6835,2392M-6835,-2734L6835,-2734M-6835,2734L6835,2734M-6835,-3076L6835,-3076M-6835,3076L6835,3076M-6835,-3417L6835,-3417M-6835,3417L6835,3417M-6835,-3759L6835,-3759M-6835,3759L6835,3759M-6835,-4101L6835,-4101M-6835,4101L6835,4101M-6835,-4443L6835,-4443M-6835,4443L6835,4443M-6835,-4784L6835,-4784M-6835,4785L6835,4785M-6835,-5126L6835,-5126M-6835,5126L6835,5126M-6835,-5468L6835,-5468M-6835,5468L6835,5468M-6835,-5810L6835,-5810M-6835,5810L6835,5810M-6835,-6151L6835,-6151M-6835,6151L6835,6151M-6835,-6493L6835,-6493M-6835,6493L6835,6493M-6835,-6835L6835,-6835M-6835,6835L6835,6835M342,6835L342,-6835M-342,6835L-342,-6835M684,6835L684,-6835M-683,6835L-683,-6835M1025,6835L1025,-6835M-1025,6835L-1025,-6835M1367,6835L1367,-6835M-1367,6835L-1367,-6835M1709,6835L1709,-6835M-1709,6835L-1709,-6835M2051,6835L2051,-6835M-2050,6835L-2050,-6835M2392,6835L2392,-6835M-2392,6835L-2392,-6835M2734,6835L2734,-6835M-2734,6835L-2734,-6835M3076,6835L3076,-6835M-3076,6835L-3076,-6835M3417,6835L3417,-6835M-3417,6835L-3417,-6835M3759,6835L3759,-6835M-3759,6835L-3759,-6835M4101,6835L4101,-6835M-4101,6835L-4101,-6835M4443,6835L4443,-6835M-4443,6835L-4443,-6835M4785,6835L4785,-6835M-4784,6835L-4784,-6835M5126,6835L5126,-6835M-5126,6835L-5126,-6835M5468,6835L5468,-6835M-5468,6835L-5468,-6835M5810,6835L5810,-6835M-5810,6835L-5810,-6835M6151,6835L6151,-6835M-6151,6835L-6151,-6835M6493,6835L6493,-6835M-6493,6835L-6493,-6835M6835,6835L6835,-6835M-6835,6835L-6835,-6835Z" strokeWidth="2" className="thin-line"></path>
              <path fill="none" stroke="#d5d5d5" d="M-6835,0L6835,0M-6835,0L6835,0M0,6835L0,-6835M0,6835L0,-6835Z" strokeWidth="4" className="thin-line"></path>
            </g>
            <WallList walls={this.state.walls}/>
        </svg>
      </div>
    );
  }
}

export default PlanView;
