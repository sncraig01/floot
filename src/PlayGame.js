import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import GameHeader from './GameHeader.js'
import Papa from 'papaparse'
import Alert from './Alert.js'

import question_data from "./Questions.json"
import question_data_caliente from "./QuestionsCaliente.json"


class PlayGame extends React.Component {

  state = {
    ptp_list : this.props.location.state.ptp_list,
    colors : this.props.location.state.colors,

    displayed_q : '',
    questions : [ ],

    end_game_message : '',

    question_counter : 0,
    game_length: 50 // game will end after 50 questions
  }

  componentDidMount = () => {
    this.loadQuestions()
  }

  loadQuestions = () => {
    const q_array = question_data .map( (data) => {
      return { text : data.text, ptps_needed : data.ptps_needed }
    })

    console.log( q_array )

    this.setState( 
      {questions : q_array}, 
      () => {
      this.displayRandomQuestion();
      } 
    )
  }

  formatString = ( str, args ) => { 
    let return_str = str
    for ( let i = 0; i < args.length; i++ ){
      return_str = return_str.replace( '{}', args[i] )
    }
    return return_str
  }

  chooseRandomPtps = ( n ) => {
    let ptps = this.state.ptp_list

    let random_nums = []
    while (random_nums.length < n) {
      var item = ptps[Math.floor(Math.random() * ptps.length)];
      if ( !random_nums.includes( item ) ){
        random_nums.push( item )
      }
    }

    return random_nums
  }

  chooseRandomQuestion = () => {
    let qs = this.state.questions
    let item = qs[Math.floor(Math.random() * qs.length)];
    return item
  }

  endGame = () => {
    this.setState( {end_game_message : "you've finished the game! yay"})
  }

  displayRandomQuestion = () => {
    let q_counter = this.state.question_counter
    if( (q_counter >= this.state.game_length) || ( this.state.questions.length == 0 )){
      this.endGame()
    } else {
      let random_q = this.chooseRandomQuestion()
      while( random_q.ptps_needed > this.state.ptp_list.length) {
        // pick a new question
        random_q = this.chooseRandomQuestion()
      }
      let random_ptps = this.chooseRandomPtps( random_q.ptps_needed )
      let filled_q  = this.formatString( random_q.text , random_ptps )

      console.log( "filled q: ")
      console.log( filled_q )

      // remove the question from the list
      let q_list = this.state.questions
      let i = this.findQinQList( random_q, q_list )
      if ( i != null ){
        q_list.splice( i, 1)
        this.setState( {displayed_q : filled_q, questions : q_list, question_counter: q_counter + 1} )
      } else {
        console.log( "Question already not in list")
      }
    }

  }

  findQinQList = ( q, q_list ) => {
    for (let i = 0; i < q_list.length; i ++ ){
      if( q_list[i].text == q.text ){
        return i
      }
    }
    return null
  }

  completeQuestion = () => {
    this.displayRandomQuestion()
  }

  goBack = () => {
    this.props.history.push( '/getstarted' )
  }
  
  render(){
    return (
      <div className="App" >
        <br/>
        <GameHeader ptp_list={this.state.ptp_list} colors={this.state.colors}/>
        <div className="Question"> { this.state.displayed_q }</div>
        <div className="Done-Button"> 
          <Button onClick={() => this.completeQuestion()} variant="contained" color="secondary" > Done </Button>
        </div>
        { this.state.end_game_message == '' ? null : <Alert message={this.state.end_game_message} onClose={this.goBack} /> }
      </div>
    );
  }

}

export default PlayGame;
