import React, { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveSquares, setMoveSquares] = useState({});

  const getMoveOptions = (square: string) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      return;
    }

    const newSquares: { [key: string]: { background: string } } = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(255,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,255,0,.1) 85%, transparent 85%)',
      };
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };
    setMoveSquares(newSquares);
  };

  const makeMove = (move: any) => {
    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move(move);
      if (result) {
        setGame(gameCopy);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
    setMoveSquares({});
    return move;
  };

  const onSquareClick = (square: string) => {
    getMoveOptions(square);
  };

  const resetGame = () => {
    setGame(new Chess());
    setMoveSquares({});
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[400px] h-[400px] mb-4">
        <Chessboard 
          position={game.fen()} 
          onPieceDrop={onDrop}
          onSquareClick={onSquareClick}
          customSquareStyles={{
            ...moveSquares,
          }}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        />
      </div>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          onClick={resetGame}
        >
          Reset Game
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => setMoveSquares({})}
        >
          Clear Hints
        </button>
      </div>
    </div>
  );
};

export default ChessGame;