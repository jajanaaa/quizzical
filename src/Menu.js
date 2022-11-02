import React, { useState } from "react";
import App from "./App";
import "./styles/index.css";

function Menu() {
  const [startGame, setStartGame] = useState(false);
  return (
    <>
      {!startGame && (
        <div className="Menu">
          <h1>Quizzical</h1>
          <p>Are you ready to challenge yourself?</p>
          <button onClick={() => setStartGame(true)}>Start Quiz</button>
        </div>
      )}
      {startGame && <App />}
    </>
  );
}

export default Menu;
