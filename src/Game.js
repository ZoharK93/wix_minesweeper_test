import React from 'react';
import Board from './Board.js';
import './css/Game.css';

 
const MINE_VALUE = <img src="./images/mine.png" alt="mine" />;
const game_status = {
    IN_PROGRESS: '',
    WIN: 'You win!',
    LOSE: 'You lose!' 
};

function initBoard(rows, columns, mines){
    var squares = []
    for(let i = 0; i < rows; i++)
        squares.push(Array.from({length: columns}, u => ({value: null, revealed: false, flag: false})));
    
    for(let i = 0; i < mines; i++){ 
        do {
        var x = Math.floor(Math.random() * rows);
        var y = Math.floor(Math.random() * columns);
        } while(squares[x][y].value === MINE_VALUE); 
        squares[x][y].value = MINE_VALUE;
    }

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            if(squares[i][j].value === MINE_VALUE) continue;
            
            var neighbour_mines = 0;
            for(let x = Math.max(i - 1, 0); x <= Math.min(i + 1, rows - 1); x++){
                for(let y = Math.max(j - 1, 0); y <= Math.min(j + 1, columns-1); y++){
                    if(x === i && y === j) continue;
                    if(squares[x][y].value === MINE_VALUE) neighbour_mines++;
                }
            }

            if(neighbour_mines > 0) squares[i][j].value = neighbour_mines;
        }
    }

    return squares;
}

class Game extends React.Component {
    constructor(props) {
        super(props);       
        var squares = initBoard(props.rows, props.columns, props.mines); 
        this.state = {
            squares: squares,
            flags: props.mines,
            mines: props.mines,
            superman: props.superman,
            status: game_status.IN_PROGRESS
        };
    }

    revealArea(i, j){
        const squares = this.state.squares.slice();
        var square = squares[i][j];
        var squares_to_reveal = [square];
        var n = 0;
        while(n<squares_to_reveal.length){
            var next_square = squares_to_reveal[n];
            if(square.value === null){
                for(let x = Math.max(i - 1, 0); x <= Math.min(i + 1, squares.length - 1); x++){
                    for(let y = Math.max(j - 1, 0); y <= Math.min(j + 1, squares[i].length - 1); y++){
                        if(squares_to_reveal.includes(next_square)) continue;
                        this.reveal(x, y);
                    }
                }
            }
        }
        
    }

    reveal(i, j) {
        const squares = this.state.squares.slice();
        var square = squares[i][j];
        if (square.flag) return;
        square.revealed = true;
  
        if(square.value === null){
            for(let x = Math.max(i - 1, 0); x <= Math.min(i + 1, squares.length - 1); x++){
                for(let y = Math.max(j - 1, 0); y <= Math.min(j + 1, squares[i].length - 1); y++){
                    if(squares[x][y].revealed) continue;
                    this.reveal(x, y);
                }
            }
        }
  
        this.setState({status: square.value === MINE_VALUE ? game_status.LOSE : game_status.IN_PROGRESS});
    }
  
    flag(i, j) {
        const square = this.state.squares.slice()[i][j];
        var flags = this.state.flags;
        var mines = this.state.mines;
        
        if (square.revealed) return;
        if (!square.flag && flags <= 0){
            alert("You have no remaining flags. Remove a flag before placing another one.");
            return;
        }

        square.flag = !square.flag;
        const change = square.flag ? -1 : 1;
        flags += change;
        if(square.value === MINE_VALUE) mines += change;
        
        this.setState({flags: flags, 
            mines: mines,
            status: mines === 0 ? game_status.WIN : game_status.IN_PROGRESS
        });
    }
  
    handleClick(e, i, j){
        if(this.state.status !== game_status.IN_PROGRESS) return;
        if(e.shiftKey){
            this.flag(i, j);
            return;
        }
        this.reveal(i, j);
    }

    render() {
        if(this.props.superman !== this.state.superman)
            this.setState({superman: this.props.superman});
  
        return (
            <div className="game">
                Flags remaining: {this.state.flags}
                <Board
                    squares={this.state.squares}
                    onClick={(e, i, j) => this.handleClick(e, i, j)}
                    superman={this.state.superman}
                />
                <div>{this.state.status}</div>
            </div>
        );
    }
}

export default Game;