import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userProfileReducer from "./userProfileReducer";
import routesReducer from "./routesReducer";

const rootReducer = combineReducers({
    userProfile: userProfileReducer,
    routesReducer: routesReducer,
    reducer: routerReducer
})
export default rootReducer