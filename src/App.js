import React from 'react';
import './css/App.css';
import Game from './Game.js';
import Config from './Config.js';

function getFieldValue(target, name){
  return Number(target[name].value);
}

// ========================================
class App extends React.Component {

  constructor(props){
    super(props);
    this.createGame = this.createGame.bind(this);
    this.supermanMode = this.supermanMode.bind(this);
    this.state = {
      game_number: 1,
      rows: 10,
      columns: 10,
      mines: 10,
      superman: false,
    };
  }

  createGame(event){
    event.preventDefault();
    const target = event.target;
    this.setState({
      game_number: this.state.game_number+1,
      rows: getFieldValue(target,'rows'),
      columns: getFieldValue(target,'columns'),
      mines: getFieldValue(target,'mines'), 
    });
  }

  renderGame(){
    const state = this.state;
    return (<Game 
      key={state.game_number}
      rows={state.rows}
      columns={state.columns}
      mines={state.mines}
      superman={state.superman}
    />);
  }

  supermanMode(event){
    this.setState({
      superman: event.target.checked
    });
  }

  render(){
    const state = this.state;
    return (
      <div className="App">
        <Config
          rows={state.rows}
          columns={state.columns}
          mines={state.mines}
          onSubmit = {(e) => this.createGame(e)}
          toggleSuperman = {(e) => this.supermanMode(e)}
        />
        {this.renderGame()}
      </div>
    );
  }  
}

export default App;
