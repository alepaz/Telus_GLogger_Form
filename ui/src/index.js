import "materialize-css/dist/css/materialize.min.css";
//Primary location for redux stuff, render root component to the DOM
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import configureStore from "./helpers/configureStore";

//Create action creator are were we initiate some change inside redux to modify the state

//Reducer, initial state of my application, applyMiddleware
const store = configureStore();

//Arguments, root component and second where we are going to try to render inside our DOM
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
