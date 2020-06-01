import React from 'react';
import Button from '@material-ui/core/Button';
import logo from './floot_white.png'

class LandingPage extends React.Component {


  state = {
  }

  onGetStarted = () => {
    this.props.history.push('/getstarted')
  }



  render(){
    return (
      <div className="App">
          <div className="Landing-Page"> 
            <div>
              <div className="Welcome"> Welcome to Floot! </div>
            </div>
            <br/>
            <div className="App-logo">
              <img src={logo}/>
            </div>
            
            <div className="Get-Started">
              <Button variant="contained" color="secondary" onClick={this.onGetStarted}> Get Started </Button> 
            </div>
          </div>
      </div>
    );
  }

}

export default LandingPage;
