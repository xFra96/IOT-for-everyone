import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/bootstrap.css";
import "./assets/index.css";
import App from "./App";
import FunctionsProvider from "./functions.provider";

const html_root_element = document.getElementById("root");
const root = ReactDOM.createRoot(html_root_element);
root.render(
  <FunctionsProvider>
    <App />
  </FunctionsProvider>
);
