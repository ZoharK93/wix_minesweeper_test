import React from 'react';
import './css/Board.css';

function Square(props) {
    const square = props.square;
    const superman = props.superman;
    if(!square.revealed){
        const showValue = superman ? square.value : null
        return (<button 
            className={"square " + (superman ? "superman" : "not-revealed")} 
            onClick={props.onClick}>
            {square.flag ? 
                <img src="./images/flag.png" alt="flag" /> : 
                showValue}
        </button>);
    }     

    return (<button className="square revealed">
            {square.value}
        </button>
    );
  }
  
class Board extends React.Component {
    render() {
        const props = this.props;
        var rows = props.squares.map(function(row, rowIndex){
            return (<tr className="board-row">
                {row.map(function(square,squareIndex){
                return (<td><Square
                    square={square}
                    onClick={(e) => props.onClick(e,rowIndex,squareIndex)}
                    superman={props.superman}
                    /></td>);
                })}
            </tr>
        );})

        return (
            <div className="game-board">
                {rows}
            </div>
        );
    }
}

export default Board;