const initialState = {
    username:""
};

export default function userProfileReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_USERNAME":
            return {...state,username: action.payload}
        default:
            return state;
    }
}