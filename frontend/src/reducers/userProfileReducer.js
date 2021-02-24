const initialState = {
    username:"",
    email: "",
    routesCompleted:"",
    distanceCompleted:"",
    totalTime:""
};

export default function userProfileReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_USERNAME":
            return {...state,username: action.payload}
        case "UPDATE_EMAIL":
            return {...state,email: action.payload}
        case "UPDATE_ROUTES_COMPLETED":
            return {...state,routesCompleted: action.payload}
        case "UPDATED_DISTANCE_COMPLETED":
            return {...state,distanceCompleted: action.payload}
        case "UPDATE_TOTAL_TIME":
            return {...state,totalTime: action.payload}
        default:
            return state;
    }
}