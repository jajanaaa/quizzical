function QuestionBlock(props) {
  function handleClick(answer) {
    props.handleClick(props.id, answer);
  }

  const renderAnswers = props.answers.map((answer) => {
    let id = null;
    if (props.q.checked) {
      if (props.q.correct === answer) {
        id = "correct";
      } else if (props.q.selected === answer) {
        id = "incorrect";
      } else {
        id = "not-selected";
      }
    }
    return (
      <span>
        <input
          type="radio"
          id={id}
          name={props.id}
          value={answer}
          onChange={() => handleClick(answer)}
        />
        <label htmlFor={answer}>{answer}</label>
      </span>
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
