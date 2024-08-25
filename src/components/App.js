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
import { useQuiz } from "../context/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}

        {status === "ready" && <StartScreen />}

        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
}

export default App;
