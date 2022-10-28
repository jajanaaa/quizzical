import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionBlock from "./QuestionBlock";
import { nanoid } from "nanoid";

function App() {
  const [results, setResults] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wantPlayAgain, setWantPlayAgain] = useState(0);
  // MAKE API CALL
  function getResults(response) {
    let newArray = [];
    response.data.results.map((result) => {
      return newArray.push({
        id: nanoid(),
        answers: result.incorrect_answers.concat([result.correct_answer]),
        question: result.question,
        correct: result.correct_answer,
        selected: null,
        checked: false,
      });
    });
    setResults(newArray);
  }

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(getResults);
  }, [wantPlayAgain]);

  function handleCheck() {
    setResults((results) =>
      results.map((result) => {
        return { ...result, checked: true };
      })
    );
    setChecked(true);

    results.map((result) => {
      if (result.correct === result.selected) {
        setCorrectCount((prevCount) => prevCount + 1);
      }
      return result;
    });
  }

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

  const questionBlock = results.map((result) => {
    return (
      <div key={result.id}>
        <QuestionBlock
          // key={nanoid()}
          key={result.id}
          question={result.question}
          answers={result.answers}
          handleClick={handleClick}
          id={result.id}
          q={result}
          checked={checked}
        />
      </div>
    );
  });

  function playAgain() {
    setChecked(false);
    setCorrectCount(0);
    setWantPlayAgain((prevCount) => prevCount + 1);
  }

  return (
    <div className="App">
      {questionBlock}
      {checked && (
        <div className="finishedGame">
          <span className="scoreText">
            You scored {correctCount}/5 correct answers
          </span>
          <button onClick={playAgain} className="playAgain">
            Play again
          </button>
        </div>
      )}
      {!checked && (
        <button onClick={handleCheck} className="checkButton">
          Check answers
        </button>
      )}
    </div>
  );
}
export default App;
