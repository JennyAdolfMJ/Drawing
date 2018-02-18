import React, { Component } from 'react';
import './Toolbar.css';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {selected: false};
  }

  render() {
    var icon;

    if (this.state.selected) {
      icon = 
      <g stroke="#a8ceec" fill="#ffffff">
        <path d="M20.714,13.919V3.093c0.55-0.204,0.944-0.73,0.944-1.35c0-0.796-0.647-1.444-1.444-1.444c-0.62,0-1.146,0.395-1.35,0.944H3.121c-0.204-0.55-0.73-0.944-1.35-0.944c-0.797,0-1.445,0.648-1.445,1.444c0,0.62,0.395,1.146,0.945,1.35v15.815c-0.55,0.204-0.945,0.73-0.945,1.35 c0,0.797,0.648,1.444,1.445,1.444c0.62,0,1.146-0.395,1.35-0.944h7.868c0.204,0.55,0.73,0.944,1.35,0.944 c0.797,0,1.444-0.647,1.444-1.444c0-0.653-0.437-1.199-1.032-1.377v-2.229c0.509-0.153,0.902-0.573,1.004-1.101h5.059 c0.129,0.665,0.714,1.168,1.416,1.168c0.797,0,1.444-0.647,1.444-1.444C21.674,14.648,21.272,14.119,20.714,13.919z M2.271,18.908 V3.093c0.393-0.146,0.704-0.457,0.85-0.85h15.743c0.146,0.394,0.457,0.704,0.85,0.85v10.836c-0.308,0.119-0.562,0.339-0.727,0.621 h-5.406c-0.251-0.429-0.711-0.721-1.243-0.721c-0.797,0-1.444,0.647-1.444,1.444c0,0.587,0.353,1.091,0.856,1.317v2.35 c-0.352,0.158-0.627,0.453-0.762,0.817H3.121C2.974,19.364,2.664,19.054,2.271,18.908z"></path>
      </g>
    }
    else {
      icon = 
      <g >
        <path d="M20.714,13.919V3.093c0.55-0.204,0.944-0.73,0.944-1.35c0-0.796-0.647-1.444-1.444-1.444c-0.62,0-1.146,0.395-1.35,0.944H3.121c-0.204-0.55-0.73-0.944-1.35-0.944c-0.797,0-1.445,0.648-1.445,1.444c0,0.62,0.395,1.146,0.945,1.35v15.815c-0.55,0.204-0.945,0.73-0.945,1.35c0,0.797,0.648,1.444,1.445,1.444 c0.62,0,1.146-0.395,1.35-0.944h7.868c0.204,0.55,0.73,0.944,1.35,0.944c0.797,0,1.444-0.647,1.444-1.444 c0-0.653-0.437-1.199-1.032-1.377v-2.229c0.509-0.153,0.902-0.573,1.004-1.101h5.059c0.129,0.665,0.714,1.168,1.416,1.168 c0.797,0,1.444-0.647,1.444-1.444C21.674,14.648,21.272,14.119,20.714,13.919z M20.214,1.298c0.245,0,0.444,0.199,0.444,0.444 s-0.199,0.445-0.444,0.445s-0.444-0.2-0.444-0.445S19.969,1.298,20.214,1.298z M1.771,1.298c0.245,0,0.444,0.199,0.444,0.444 S2.016,2.187,1.771,2.187s-0.445-0.2-0.445-0.445S1.526,1.298,1.771,1.298z M1.771,20.702c-0.245,0-0.445-0.199-0.445-0.444 s0.2-0.444,0.445-0.444s0.444,0.199,0.444,0.444S2.016,20.702,1.771,20.702z M2.271,18.908V3.093 c0.393-0.146,0.704-0.457,0.85-0.85h15.743c0.146,0.394,0.457,0.704,0.85,0.85v10.836c-0.308,0.119-0.562,0.339-0.727,0.621h-5.406 c-0.251-0.429-0.711-0.721-1.243-0.721c-0.797,0-1.444,0.647-1.444,1.444c0,0.587,0.353,1.091,0.856,1.317v2.35 c-0.352,0.158-0.627,0.453-0.762,0.817H3.121C2.974,19.364,2.664,19.054,2.271,18.908z M12.338,20.702 c-0.245,0-0.444-0.199-0.444-0.444s0.199-0.444,0.444-0.444s0.444,0.199,0.444,0.444S12.583,20.702,12.338,20.702z M12.338,15.719 c-0.245,0-0.444-0.199-0.444-0.444s0.199-0.444,0.444-0.444s0.444,0.199,0.444,0.444S12.583,15.719,12.338,15.719z M20.23,15.719 c-0.245,0-0.444-0.199-0.444-0.444s0.199-0.444,0.444-0.444s0.444,0.199,0.444,0.444S20.475,15.719,20.23,15.719z"></path>
      </g>
    }

    return (
      <div className="none" onClick={() => {
        this.setState({selected: !this.state.selected}); 
        this.props.selectionChanged(!this.state.selected);
        }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="Toolbar" viewBox="0 0 22 22" >
        {icon}
      </svg>
      </div>
    )
  }
}

export default Toolbar;