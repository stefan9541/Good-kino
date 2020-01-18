import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import GoodKinoService from "./services";
import store from "./store";
import GoodKinoServiceContext from "./components/good-kino-service-context/good-kino-service-context";

const goodKinoService = new GoodKinoService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <GoodKinoServiceContext.Provider value={goodKinoService}>
        <Router>
          <App />
        </Router>
      </GoodKinoServiceContext.Provider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
