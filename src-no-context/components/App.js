import Main from "./Main";
import Error from "./Error";
import Timer from "./Timer";
import Header from "./Header";
import Loader from "./Loader";
import Footer from "./Footer";
import Progress from "./Progress";
import Question from "./Question";
import NextButton from "./NextButton";
import StartScreen from "./StartScreen";
import FinishedScreen from "./FinishedScreen";
import { useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 30;

const initialState = {
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
  questions: [],
  status: "loading", // 'error', 'loading', 'ready', 'active', 'finished'
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataFailed":
      return { ...state, status: "error" };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQustion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown Action!");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/AnasHany219/data/main/react-quize-app-data/questions.json"
    )
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}

        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              points={points}
              answer={answer}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />

            <Question
              answer={answer}
              dispatch={dispatch}
              question={questions[index]}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

              <NextButton
                index={index}
                answer={answer}
                dispatch={dispatch}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            dispatch={dispatch}
            highscore={highscore}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
