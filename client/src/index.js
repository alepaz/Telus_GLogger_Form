import 'materialize-css/dist/css/materialize.min.css';
//Primary location for redux stuff, render root component to the DOM
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//Axios on windows scope
import axios from 'axios';
window.axios = axios;


//Create action creator are were we initiate some change inside redux to modify the state

//Reducer, initial state of my application, applyMiddleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Arguments, root component and second where we are going to try to render inside our DOM
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);

//console.log('STRIPE KEY: ', process.env.REACT_APP_STRIPE_KEY);
//console.log('ENVIRONMENT IS: ', process.env.NODE_ENV);