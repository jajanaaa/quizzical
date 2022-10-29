import parse from "html-react-parser";
import { nanoid } from "nanoid";

function QuestionBlock(props) {
  function handleClick(answer) {
    props.handleClick(props.id, answer);
  }

  const renderAnswers = props.answers.map((answer) => {
    let id = null;
    if (props.result.gameOver) {
      if (props.result.correct === answer) {
        id = "correct";
      } else if (props.result.selected === answer) {
        id = "incorrect";
      } else {
        id = "notSelected";
      }
    }

    return (
      <button
        key={nanoid()}
        id={id}
        className={`button ${
          answer === props.result.selected ? "selected" : ""
        }`}
        onClick={() => handleClick(answer)}
      >
        {parse(`${answer}`)}
      </button>
    );
  });

  return (
    <div className="QuestionBlock">
      {parse(`<p>${props.question}</p>`)}
      {renderAnswers}
    </div>
  );
}

export default QuestionBlock;
