import App from "./App";
import { Provider } from "react-redux";
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
