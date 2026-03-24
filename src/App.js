import { useState } from 'react'

export function Square({ value, handleClick }) {
  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

// ctrl + shift + j = browser console

export function Board({squares, xIsNext, onPlay}) {
  let status;
  const winner = calculateWinner(squares);
  if(winner) {
    status = "The winner is: " + winner; // winner determined
  }
  else {
    status = "Next player: " + (xIsNext ? 'X': 'O'); // next turn
  }

  // update element on click
  const markSquare = (i) => {
    // check if grid already has a move OR game is over (no more moves allows)
    if(squares[i] || winner) { //falsy - false, null, undefined, NaN, 0, '', ""
      return;
    }

    const nextSquares = squares.slice(); //make (shallow) copy of squares from index 0
    if (xIsNext) { 
      nextSquares[i] = 'X';
    }
    else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  return (
    <> 
      <h1>{status}</h1>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => markSquare(0)}/>
        <Square value={squares[1]} handleClick={() => markSquare(1)}/>
        <Square value={squares[2]} handleClick={() => markSquare(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => markSquare(3)}/>
        <Square value={squares[4]} handleClick={() => markSquare(4)}/>
        <Square value={squares[5]} handleClick={() => markSquare(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => markSquare(6)}/>
        <Square value={squares[7]} handleClick={() => markSquare(7)}/>
        <Square value={squares[8]} handleClick={() => markSquare(8)}/>
      </div>
    </>
  );
}

// helper function to determine the current winner (if any)
// returns: 'X', 'O', or null
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); //nested array - array of past boards
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  // updates history, next move, current move # when a square is clicked
  const onPlay = (nextSquares) => {
    setHistory([...history.slice(0, currentMove + 1), nextSquares]);
    setCurrentMove(currentMove + 1);
  }

  // shows history moves that can be jumped back to
  const historyDisplay = history.map((squares, move) => {
    let display;
    if(move > 0) {
      display = "Go to move " + move;
    }
    else {
      display = "Go to start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{display}</button>
      </li>
    )
  });

  // jumps to the move # passed as input
  const jumpTo = (move) => {
    setCurrentMove(move);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={onPlay} />
      </div>
      <div className="game-info">
        <ol>{historyDisplay}</ol>
      </div>
    </div>
  )
}
