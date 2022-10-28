import React, { useState } from "react";
import App from "./App";
import "./App.css";

function Menu() {
  const [gameStart, setGameStart] = useState(false);

  function startGame() {
    setGameStart(true);
  }
  return (
    <>
      {!gameStart && (
        <div className="Menu">
          <h1>Quizzical</h1>
          <p>Are you ready to challenge yourself?</p>
          <button onClick={startGame}>Start Quiz</button>
        </div>
      )}

      {gameStart && <App />}
    </>
  );
}

export default Menu;
