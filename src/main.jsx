import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { IntroProvider } from "./hooks/useIntro";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IntroProvider>
      <App />
    </IntroProvider>
  </React.StrictMode>
);