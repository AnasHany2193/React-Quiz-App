import "./index.css";
import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom/client";
import { QuizProvidor } from "./context/QuizContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuizProvidor>
      <App />
    </QuizProvidor>
  </React.StrictMode>
);
