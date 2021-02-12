import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
    userProfile: userProfileReducer,
    reducer: routerReducer
})