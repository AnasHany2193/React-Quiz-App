function NextButton({ index, answer, dispatch, numQuestions }) {
  if (answer === null) return null;

  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: `${index < numQuestions - 1 ? "nextQustion" : "finish"}`,
          })
        }
      >
        {index < numQuestions - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
}

export default NextButton;
