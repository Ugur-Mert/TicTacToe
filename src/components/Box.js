import React from "react";

import "./Box.css";

export default function Box({ value, onClick }) {
  const element = value === "X" ? "button-x" : "button-o";

  return (
    <div>
      <button className={element} onClick={onClick}>
        {value}
      </button>
    </div>
  );
}
