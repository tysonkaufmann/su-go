const initialState = {
    favouriteRoutes: [],
    createdRoutes: []
};

export default function userProfileReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_FAVOURITE_ROUTES":
            return {...state,favouriteRoutes: action.payload}
        case "UPDATE_CREATED_ROUTES":
            return {...state,createdRoutes: action.payload}
        default:
            return state;
    }
}