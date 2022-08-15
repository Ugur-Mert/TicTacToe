import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [player, setPlayer] = useState(true);

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
  }

  return (
    <div className="App">
      <Board board={board} onClick={boxClick} />
    </div>
  );
}
