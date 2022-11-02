import React, { useState, useEffect } from "react";
import "./styles/index.css";
import axios from "axios";
import { nanoid } from "nanoid";
import QuestionBlock from "./QuestionBlock";

function App() {
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wantPlayAgain, setWantPlayAgain] = useState(0);

  // MAKE API CALL
  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(getResults);
  }, [wantPlayAgain]);

  // RENDER API CALL RESULTS
  function getResults(response) {
    let resultsArray = [];
    response.data.results.map((result) => {
      return resultsArray.push({
        id: nanoid(),
        answers: result.incorrect_answers
          .concat([result.correct_answer])
          .sort(() => Math.random() - 0.5),
        question: result.question,
        correct: result.correct_answer,
        selected: null,
        gameOver: false,
      });
    });
    setResults(resultsArray);
  }

  // RENDER QUESTION BLOCK
  const questionBlock = results.map((result) => {
    return (
      <div key={result.id}>
        <QuestionBlock
          question={result.question}
          answers={result.answers}
          id={result.id}
          result={result}
          handleClick={handleClick}
          gameOver={gameOver}
        />
      </div>
    );
  });

  // SELECT ANSWER
  function handleClick(id, answer) {
    setResults((results) =>
      results.map((result) => {
        return result.id === id
          ? {
              ...result,
              selected: answer,
            }
          : result;
      })
    );
  }

  // CHECK ANSWERS
  function handleCheck() {
    setResults((results) =>
      results.map((result) => {
        return { ...result, gameOver: true };
      })
    );
    setGameOver(true);

    // INCREMENT COUNT IF ANSWER IS CORRECT
    results.map((result) => {
      if (result.correct === result.selected) {
        setCorrectCount((prevCount) => prevCount + 1);
      }
      return correctCount;
    });
  }

  // PLAY AGAIN FUNCTION
  function playAgain() {
    setGameOver(false);
    setCorrectCount(0);
    setWantPlayAgain((prevGame) => prevGame + 1);
  }

  return (
    <div className="App">
      {questionBlock}
      {!gameOver && (
        <button onClick={handleCheck} className="checkButton">
          Check answers
        </button>
      )}
      {gameOver && (
        <div className="finishedGame">
          <span className="scoreText">
            You scored {correctCount}/5 correct answers
          </span>
          <button onClick={playAgain} className="playAgain">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
