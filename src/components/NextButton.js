import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { index, answer, dispatch, numQuestions } = useQuiz();

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
