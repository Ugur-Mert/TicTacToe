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

  const [count, setCount] = useState(0);

  const [winnerPlayer, setWinnerPlayer] = useState("");

  function resetBoard() {
    setBoard(Array(9).fill(null));
    setCount(0);
  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    setCount(0);
    setScore({ scoreX: 0, scoreO: 0 });
  }

  function boxClick(boxIndex) {
    setCount(count + 1);
    const updatedBoard = board.map((value, index) => {
      if (index === boxIndex) {
        return player ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);
    setPlayer(!player);
    console.log(count);

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
      setCount(0);
      setWinnerPlayer(winner);
    } else if (winner === "O") {
      let { scoreO } = score;
      scoreO = scoreO + 1;
      setScore({ ...score, scoreO });
      toast("Winner O!", {
        icon: "🏆",
        className: "message",
      });
      resetBoard();
      setCount(0);
      setWinnerPlayer(winner);
    } else if (count === 8 && winner !== "X" && winner !== "O") {
      toast("DRAW!", {
        icon: "🤝",
        className: "message",
      });
      setWinnerPlayer("DRAW!");
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
        <p>Turn : {player ? "X" : "O"}</p>
      </div>

      <div className="score-board">
        <p>
          Player <span style={{ color: "green", fontWeight: "bold" }}>X</span> :{" "}
          {score.scoreX}
        </p>
        <p>
          Player <span style={{ color: "red", fontWeight: "bold" }}>O</span> :{" "}
          {score.scoreO}{" "}
        </p>
      </div>
      <div className="game-border">
        <div className="game-board">
          <Board board={board} onClick={boxClick} />
        </div>

        <div className="result">
          {winnerPlayer === "DRAW!" ? (
            <p>DRAW!</p>
          ) : (
            <p> Winner: {winnerPlayer}</p>
          )}
        </div>
      </div>
      <div className="section-reset">
        <button className="reset-button" onClick={resetBoard}>
          Reset Board
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset Game
        </button>
        <Toaster />
      </div>
    </div>
  );
}
