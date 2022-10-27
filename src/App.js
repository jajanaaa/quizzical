import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionBlock from "./QuestionBlock";
import { nanoid } from "nanoid";

function App() {
  const [results, setResults] = useState([]);
  const [checked, setChecked] = useState(false);

  // MAKE API CALL
  function getResults(response) {
    let newArray = [];
    response.data.results.map((result) => {
      newArray.push({
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
  }, []);

  function handleCheck() {
    setResults((results) =>
      results.map((result) => {
        return { ...result, checked: true };
      })
    );
    setChecked(true);
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
      <>
        <QuestionBlock
          key={result.id}
          question={result.question}
          answers={result.answers}
          handleClick={handleClick}
          id={result.id}
          q={result}
        />
        <hr />
      </>
    );
  });

  return (
    <div>
      {questionBlock}
      {<button onClick={handleCheck}>Check</button>}
    </div>
  );
}
export default App;
