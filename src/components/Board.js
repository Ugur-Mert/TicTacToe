import Box from "./Box";

import React from "react";

import "./Board.css";

export const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((value, index) => {
        return (
          <Box
            value={value}
            key={index}
            onClick={() => value === null && onClick(index)}
          />
        );
      })}
    </div>
  );
};
