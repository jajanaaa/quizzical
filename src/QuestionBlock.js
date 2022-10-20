import React, { useState, useEffect } from "react";
// import parse from "html-react-parser";

function QuestionBlock(props) {
  // const id = props.id;
  const [answers, setAnswers] = useState([]);
  console.log(answers);
  //   const parsee = parse(props.question);
  const incorrect = props.incorrect;
  const correct = props.correct;

  // setAnswers(incorrect.concat([correct]).sort(() => 0.5 - Math.random()));
  useEffect(() => {
    setAnswers(incorrect.concat([correct]));
  }, [correct, incorrect]);

  const answersButtons = answers.map((answer) => {
    return (
      <>
        <input
          type="radio"
          id={answer}
          // name={id}
          name={props.name}
          value={answer}
          // onClick={props.fun}
          // choosen={props.checked}
          onClick={props.fun}
        />
        <label htmlFor={answer} className={props.checked ? "green" : null}>
          {answer}
        </label>
      </>
    );
  });
  return (
    <>
      {props.question}
      {answersButtons}
    </>
  );
}

export default QuestionBlock;
