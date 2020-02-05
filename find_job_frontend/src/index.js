import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose,combineReducers} from 'redux'

import jobReducer from './redux/jobsReducer'
import userReducer from './redux/userReducer'

const rootReducer = combineReducers({
    allInfoOnUsers: userReducer,
    allInfoOnJobs: jobReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let storeObj = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))




ReactDOM.render(
    <Provider store={storeObj}>
        <Router>
            <App />
        </Router>
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
