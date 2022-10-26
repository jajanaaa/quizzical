// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import QuestionBlock from "./QuestionBlock";
// import { v4 as uuidv4 } from "uuid";

// function App() {
//   const [questions, setQuestions] = useState([]); // questions its array of 5 objects
//   const [choosedAnswer, setChoosedAnswer] = useState({});

//   function showQuestions(response) {
//     setQuestions(response.data.results);
//   }

//   function chooseAnswer(event) {
//     console.log(event.target.checked);
//     // setChoosedAnswer((prevAnswer) => ({
//     //   ...prevAnswer,
//     //   [event.target.name]: event.target.value,
//     // }));
//     setChoosedAnswer({
//       [event.target.name]: event.target.value,
//       isChoosen: event.target.checked,
//     });
//   }
//   const newQuestions = questions.map((question) => {
//     return (
//       <>
//         <QuestionBlock
//           question={question.question}
//           correct={question.correct_answer}
//           incorrect={question.incorrect_answers}
//           id={uuidv4()}
//           key={uuidv4()}
//           fun={chooseAnswer}
//           name={questions.indexOf(question)}
//           checked={choosedAnswer.isChoosen}
//         />
//         <hr />
//       </>
//     );
//   });

//   useEffect(() => {
//     axios
//       .get("https://opentdb.com/api.php?amount=5&type=multiple")
//       .then(showQuestions);
//   }, []);

//   return (
//     <div className="App">
//       <>{newQuestions}</>
//       <button>Check answers</button>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionBlock from "./QuestionBlock";

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => setResults(response.data.results));
  }, []);
  //
  const [choseAnswers, setChoseAnswers] = useState([{}]);

  function checkAnswers() {
    const correct = results.map((result) => result.correct_answer);

    for (let i = 0; i < correct.length; i++) {
      if (
        choseAnswers.value === correct[i] &&
        choseAnswers.isChecked === true
      ) {
        console.log("Correct!");
        setChoseAnswers((prevAnswer) => ({
          ...prevAnswer,
          isCorrect: true,
        }));
      } else console.log("Wrong");
    }
  }

  function handleChange(event) {
    setChoseAnswers((prevAnswer) => ({
      ...prevAnswer,
      value: event.target.value,
      isChecked: event.target.checked,
    }));
  }

  //
  const renderedResults = results.map((result) => {
    return (
      <>
        <QuestionBlock
          question={result.question}
          answers={result.incorrect_answers
            .concat([result.correct_answer])
            .sort(() => 0.5 - Math.random())}
          correct={result.correct_answer}
          name={results.indexOf(result)}
          fun={handleChange}
          isCorrect={choseAnswers.isCorrect}
        />
        <hr />
      </>
    );
  });

  return (
    <div className="App">
      {renderedResults}
      <button onClick={checkAnswers}>Check</button>
    </div>
  );
}

export default App;
