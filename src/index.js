import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import "./static/css/bootstrap.min.css";
import "./static/css/clean-blog.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Router from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
