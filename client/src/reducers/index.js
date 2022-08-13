import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import fileReducer from './fileReducer';
import uploadReducer from './uploadReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
   user: userReducer,
   files: fileReducer,
   upload: uploadReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))