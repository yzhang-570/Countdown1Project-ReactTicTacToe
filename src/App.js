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

export default function Board() {
  // elements in board grid
  const [squares, setSquares] = useState(Array(9).fill(null));

  // update element on click
  const markSquare = (targetIndex) => {
    // I know the tutorial says to use splice but I wanted to practice diff :D
    const newSquares = squares.map((square, i) => (
      i === targetIndex ? square = 'X' : square = square
    ))
    setSquares(newSquares)
  }

  return (
    <> 
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
