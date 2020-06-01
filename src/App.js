import React from 'react';
import LandingPage from './LandingPage.js'
import GetStarted from './GetStarted.js'
import PlayGame from './PlayGame.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';


class App extends React.Component {

  render(){
    return (
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/getstarted" component={GetStarted} />
        <Route path="/play" component={PlayGame} />
      </Router>
    );
  }

}

export default App;
