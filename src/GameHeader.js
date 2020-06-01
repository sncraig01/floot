import React from 'react';
import './App.css';


class GameHeader extends React.Component {

  state = {
    ptp_list : this.props.ptp_list,
    colors : this.props.colors
  }

  mapPtpsToBubbles = () => {
    let colors = Array.from(new Set(this.state.colors));

    return this.state.ptp_list.map((ptp) => {
      var bubble_color = colors.shift()
      return <div className="Ptp-Bubble-Small"  style={{ backgroundColor: bubble_color }}> {ptp} </div>
    })
  }

  render(){
    return (
      <div className="App">
        <div className="Game-Header"> {this.mapPtpsToBubbles()} </div>        
      </div>
    );
  }

}

export default GameHeader;
