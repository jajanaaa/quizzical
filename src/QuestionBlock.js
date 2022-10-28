import parse from "html-react-parser";
import { nanoid } from "nanoid";

function QuestionBlock(props) {
  function handleClick(answer) {
    props.handleClick(props.id, answer);
  }

  const renderAnswers = props.answers.map((answer) => {
    let id = null;

    if (props.checked) {
      if (props.q.checked) {
        if (props.q.correct === answer) {
          id = "correct";
        } else if (props.q.selected === answer) {
          id = "incorrect";
        } else {
          id = "not-selected";
        }
      }
    }
    return (
      <button
        key={nanoid()}
        id={id}
        className={`button ${answer === props.q.selected ? "selected" : ""}`}
        onClick={() => handleClick(answer)}
      >
        {parse(`${answer}`)}
      </button>
      // <span key={answer} className="button">
      //   <input
      //     type="radio"
      //     id={JSON.stringify(answer)}
      //     name={props.id}
      //     value={answer}
      //     className={id}
      //     // onChange={() => handleClick(answer)}
      //     onChange={() => handleClick(answer)}
      //     // className="radioButtons"
      //   />
      //   {parse(
      //     `<label htmlFor=${JSON.stringify(
      //       answer
      //     )} className="btn btn-default" >${answer}</label>`
      //   )}
      // </span>
    );
  });
  return (
    <div className="QuestionBlock">
      {parse(`<p>${props.question}</p>`)}
      <div className="buttonsBlock">{renderAnswers}</div>
    </div>
  );
}

export default QuestionBlock;
