import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userProfileReducer from "./userProfileReducer";
import routesReducer from "./routesReducer";

export default combineReducers({
    userProfile: userProfileReducer,
    routesReducer: routesReducer,
    reducer: routerReducer
})