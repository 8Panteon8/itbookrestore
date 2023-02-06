import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ErrorBoundry>
      <Router>
        <App />
      </Router>
    </ErrorBoundry>
  </Provider>
);
