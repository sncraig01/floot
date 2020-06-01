import React from 'react';
import './App.css';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from './Alert.js'
import COLORS from './Colors.js'

class GetStarted extends React.Component {

  state = {
    current_ptp : '',
    ptp_list : [],
    message : '', 

    colors : [ COLORS.teal, COLORS.coral, COLORS.deep_teal, COLORS.tea_green, COLORS.light_coral, COLORS.light_gray, COLORS.green, COLORS.medium_teal  ]
  }

  mapPtps() {
    let colors = Array.from(new Set(this.state.colors));

    return this.state.ptp_list.map((ptp) => {
      var bubble_color = colors.shift()
      return <div className="Ptp-Bubble" style={{ backgroundColor: bubble_color }}>
          <div className="Bubble-Text" > {ptp} </div>
          <div >
            <IconButton onClick={() => this.onDeletePtp(ptp)} aria-label="delete"> 
              <DeleteIcon/>
            </IconButton>
          </div>
        </div>
    })
  }

  
  clearMessage = () => {
    this.setState( {message : ''} )
  } 

  onDeletePtp = (ptp) => {
    var list = this.state.ptp_list
    for ( let i = 0; i < list.length; i++ ){
      if( list[i] == ptp ){
        list.splice(list.indexOf(ptp), 1 )
      }
    }
    this.setState({ ptp_list : list })
  }


  updateField(field, newValue) {
    console.log( newValue )
    this.setState({
      ...this.state,
      [field]: newValue
    });
  }

  addToPtpList = ( ptp ) => {
    let list = this.state.ptp_list

    if (list.includes(ptp)) {
      this.onDeletePtp(ptp)
      this.setState( { message : 'Sorry, there is already a player with that name!' } )
    }

    if( list.length == 8 ) {
      this.setState({ message : "Sorry! There is a maximum of 8 participants." })
    } else {
      let new_list = list.concat( ptp )
      this.setState({ current_ptp: '', ptp_list : new_list})
    }
  }

  onLetsPlay = () => {
    if ( this.state.ptp_list.length > 1 ){
      this.props.history.push( {
        pathname: "/play",
        state: {
          ptp_list : this.state.ptp_list,
          colors : this.state.colors
        }
      } )
    } else {
      this.setState({ message : "You need at least 2 people to play!"})
    }
  }

  clearTextField = (event) => {
    event.target.value = ''
  }

  render(){
    return (
      <div className="App">
        <div className="Welcome"> Let's get started! </div>
        { this.state.message == '' ? null : <Alert message={this.state.message} onClose={this.clearMessage} /> }
        <p>Enter the name of a player</p>
        <br/>
        <div className="TextField">
          <Input
            id="outlined-helperText"
            placeholder="Name"
            fullWidth="true"
            onChange={e =>
              this.updateField("current_ptp", e.target.value)
            }
            onKeyPress={e => {
              if (e.key === 'Enter') {
                this.addToPtpList(this.state.current_ptp)
                this.clearTextField(e)
              }
            }}
          />
        </div>
        <br/>
        <br/>
        <div className="Bubble-Region"> 
          {this.mapPtps()} 
        </div>
        <div className="Footer"> 
          <Button onClick={() => this.onLetsPlay()} variant="contained" color="secondary">Let's Play!</Button>
        </div>
      </div>
    );
  }

}

export default GetStarted;