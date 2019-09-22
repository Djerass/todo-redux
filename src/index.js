import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import todoReducer from "./store/todoReducer";
import authReducer from "./store/authReducer";
import { Provider } from "react-redux";
import { combineReducers } from "redux";

const reducer = combineReducers({ authReducer, todoReducer });

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
