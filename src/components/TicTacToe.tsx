import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || gameOver) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner || newBoard.every(square => square !== null)) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner}` 
    : board.every(square => square !== null)
    ? "Game Over - It's a Draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-bold">{status}</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((square, i) => (
          <button
            key={i}
            className={`w-16 h-16 text-2xl font-bold flex items-center justify-center
              ${square ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-opacity-80'}
              ${square === 'X' ? 'bg-blue-500 text-white' : square === 'O' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;