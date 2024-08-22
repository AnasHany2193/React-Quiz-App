import Main from "./Main";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Question from "./Question";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";

const initialState = {
  index: 0,
  questions: [],
  status: "loading", // 'error', 'loading', 'ready', 'active', 'finished'
};

function reducer(state, action) {
  switch (action.type) {
    case "dataFailed":
      return { ...state, status: "error" };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return { ...state, status: "active" };

    default:
      throw new Error("Unknown Action!");
  }
}

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:5000/questions")
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
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}

export default App;
