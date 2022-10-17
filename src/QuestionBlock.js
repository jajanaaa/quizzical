import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

function QuestionBlock(props) {
  const id = props.id;
  const [answers, setAnswers] = useState([]);

  //   const parsee = parse(props.question);
  const incorrect = props.incorrect;
  const correct = props.correct;

  useEffect(() => {
    setAnswers(incorrect.concat([correct]).sort(() => 0.5 - Math.random()));
  }, [correct, incorrect]);

  const answersButtons = answers.map((answer) => {
    return (
      <>
        <input
          type="radio"
          id={answer}
          name={id}
          value={answer}
          onChange={handleChange}
        />
        ;<label htmlFor={answer}>{answer}</label>
      </>
    );
  });
  let count = 0;
  function handleChange(event) {
    if (correct === event.target.value) {
      count++;
    }
    console.log(count);
  }

  return (
    <>
      {props.question}
      {answersButtons}
    </>
  );
}

export default QuestionBlock;
