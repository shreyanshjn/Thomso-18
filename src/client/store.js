import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import {loadState} from './LocalStorage';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistedState = loadState();
// console.log(persistedState);
const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
