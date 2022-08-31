import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// import { createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducer';

// export const store = createStore(rootReducer, applyMiddleware(thunk));

