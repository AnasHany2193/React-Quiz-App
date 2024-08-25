import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();

  const seconds = secondsRemaining % 60;
  const min = Math.floor(secondsRemaining / 60);

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min} : {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
