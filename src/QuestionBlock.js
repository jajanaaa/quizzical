// import React, { useState, useEffect } from "react";
// // import parse from "html-react-parser";

// function QuestionBlock(props) {
//   // const id = props.id;
//   const [answers, setAnswers] = useState([]);
//   //   const parsee = parse(props.question);
//   const incorrect = props.incorrect;
//   const correct = props.correct;

//   // setAnswers(incorrect.concat([correct]).sort(() => 0.5 - Math.random()));
//   useEffect(() => {
//     setAnswers(incorrect.concat([correct]));
//   }, [correct, incorrect]);

//   const answersButtons = answers.map((answer) => {
//     return (
//       <>
//         <input
//           type="radio"
//           id={answer}
//           // name={id}
//           name={props.name}
//           value={answer}
//           // onClick={props.fun}
//           // choosen={props.checked}
//           onClick={props.fun}
//         />
//         <label htmlFor={answer} className={props.checked ? "green" : null}>
//           {answer}
//         </label>
//       </>
//     );
//   });
//   return (
//     <>
//       {props.question}
//       {answersButtons}
//     </>
//   );
// }

// export default QuestionBlock;

import React, { useState } from "react";

function QuestionBlock(props) {
  //   function chooseAnswer(event) {
  //     // setChoosedAnswer((prevAnswer) => ({
  //     //   ...prevAnswer,
  //     //   [event.target.name]: event.target.value,
  //     // }));
  //     setChoosedAnswer({
  //       [event.target.name]: event.target.value,
  //       isChoosen: event.target.checked,
  //     });
  //   }
  // const [choseAnswers, setChoseAnswers] = useState([{}]);

  // function checkAnswers() {
  //   if (
  //     choseAnswers.value === props.correct &&
  //     choseAnswers.isChecked === true
  //   ) {
  //     console.log("Correct!");
  //   }
  // }

  // checkAnswers();

  // function handleChange(event) {
  //   setChoseAnswers((prevAnswer) => ({
  //     ...prevAnswer,
  //     value: event.target.value,
  //     isChecked: event.target.checked,
  //   }));
  // }

  // const renderAnswers = props.answers.map((answer) => {
  //   return (
  //     <>
  //       <input
  //         type="radio"
  //         id="huey"
  //         name={props.name}
  //         value={answer}
  //         // checked={props.name === answer}
  //         onChange={handleChange}
  //       />
  //       <label htmlFor="huey">{answer}</label>
  //     </>
  //   );
  // });
  const renderAnswers = props.answers.map((answer) => {
    return (
      <>
        <input
          type="radio"
          id="huey"
          name={props.name}
          value={answer}
          // checked={props.name === answer}
          onChange={props.fun}
          // className={ ? "green" : null}
        />
        <label htmlFor="huey">{answer}</label>
      </>
    );
  });
  return (
    <>
      <p>{props.question}</p>
      {renderAnswers}
    </>
  );
}

export default QuestionBlock;
