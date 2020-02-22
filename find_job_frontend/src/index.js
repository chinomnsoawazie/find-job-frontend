import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import jobsReducer from './redux/jobsReducer'
import userReducer from './redux/userReducer'
import notesReducer from './redux/notesReducer';
import todoReducer from './redux/todoReducer';
import preferencesReducer from './redux/preferencesReducer';

const rootReducer = combineReducers({
    allJobInfo: jobsReducer,
    allUserInfo: userReducer,
    allNoteInfo: notesReducer,
    allToDoInfo: todoReducer,
    allPreferenceInfo: preferencesReducer
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
serviceWorker.unregister();
