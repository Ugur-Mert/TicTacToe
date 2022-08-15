import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";

import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const winStatus = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [0, 3, 6],
    [2, 4, 8],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));

  const [player, setPlayer] = useState(true);

  const [score, setScore] = useState({ scoreX: 0, scoreO: 0 });

  function resetBoard() {
    setBoard(Array(9).fill(null));
  }

  function boxClick(boxIndex) {
    const updatedBoard = board.map((value, index) => {
      if (index === boxIndex) {
        return player ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);
    setPlayer(!player);

    const winner = winnerController(updatedBoard);

    if (winner === "X") {
      let { scoreX } = score;
      scoreX = scoreX + 1;
      setScore({ ...score, scoreX });
      toast("Winner X!", {
        icon: "🏆",
        className: "message",
      });
      resetBoard();
    } else if (winner === "O") {
      let { scoreO } = score;
      scoreO = scoreO + 1;
      setScore({ ...score, scoreO });
      toast("Winner O!", {
        icon: "🏆",
        className: "message",
      });
      resetBoard();
    }

    console.log(winner);
  }

  function winnerController(board) {
    for (let i = 0; i < winStatus.length; i++) {
      const [x, y, z] = winStatus[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Tic Tac Toe !</h1>
        <p>Player: {player ? "X" : "O"}</p>
      </div>

      <div className="score-board">
        <p>Player X : {score.scoreX}</p>
        <p>Player O : {score.scoreO} </p>
      </div>

      <Board board={board} onClick={boxClick} />
      <div className="section-reset">
        <button className="reset-button" onClick={resetBoard}>
          Reset Board
        </button>
        <Toaster />
      </div>
    </div>
  );
}
