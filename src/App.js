import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionBlock from "./QuestionBlock";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [questions, setQuestions] = useState([]); // questions its array of 5 objects
  const [choosedAnswer, setChoosedAnswer] = useState({});

  function showQuestions(response) {
    setQuestions(response.data.results);
  }

  function chooseAnswer(event) {
    console.log(event.target.checked);
    // setChoosedAnswer((prevAnswer) => ({
    //   ...prevAnswer,
    //   [event.target.name]: event.target.value,
    // }));
    setChoosedAnswer({
      [event.target.name]: event.target.value,
      isChoosen: event.target.checked,
    });
  }
  console.log(choosedAnswer);
  const newQuestions = questions.map((question) => {
    return (
      <>
        <QuestionBlock
          question={question.question}
          correct={question.correct_answer}
          incorrect={question.incorrect_answers}
          id={uuidv4()}
          key={uuidv4()}
          fun={chooseAnswer}
          name={questions.indexOf(question)}
          checked={choosedAnswer.isChoosen}
        />
        <hr />
      </>
    );
  });

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(showQuestions);
  }, []);

  return (
    <div className="App">
      <>{newQuestions}</>
      <button>Check answers</button>
    </div>
  );
}

export default App;
