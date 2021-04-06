const initialState = {
    favouriteRoutes: [],
    allRoutes: [],
    createdRoutes: [],
    createRouteDetails: {
        routetitle: "",
        routedescription: "",
        routedistance: 0,
        routetime: "",
        routetype: "",
        route: []
    },
    currentRoute: {},
    selectedRoute: {},
    traffic: [],
    routeExpiryTime: 0,
};

export default function routesReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_FAVOURITE_ROUTES":
            return { ...state, favouriteRoutes: action.payload }
        case "UPDATE_CREATED_ROUTES":
            return { ...state, createdRoutes: action.payload }
        case "UPDATE_ALL_ROUTES":
            return { ...state, allRoutes: action.payload }
        case "UPDATE_CREATE_ROUTE_DETAILS":
            return { ...state, createRouteDetails: action.payload }
        case "UPDATE_CURRENT_ROUTE":
            return { ...state, currentRoute: action.payload }
        case "UPDATE_SELECTED_ROUTE":
            return { ...state, selectedRoute: action.payload }
        case "UPDATE_TRAFFIC":
            return { ...state, traffic: action.payload }
        case "UPDATE_ROUTE_EXPIRY_TIME":
            return { ...state, routeExpiryTime: action.payload }
        case "UPDATE_RATING":
            let tempAllRoutes = [...state.allRoutes]
            let routeFound = tempAllRoutes.find(r => r.routeid === action.payload.routeid)
            if (routeFound) {
                routeFound.votes = [...action.payload.votes]
            }
            return { ...state, allRoutes: tempAllRoutes}
        case "ADD_CREATED_ROUTE":
            let addCreatedRoutes = state.createdRoutes.slice()
            let addAllRoutes = state.allRoutes.slice()
            addCreatedRoutes.push(action.payload)
            addAllRoutes.push(action.payload)
            return { ...state, createdRoutes: addCreatedRoutes, allRoutes: addAllRoutes }
        case "REMOVE_CREATED_ROUTES":
            let removeCreatedRoutes =  state.createdRoutes.filter(function( obj ) {
                return obj.routeid !== action.payload;
            });
            let removeAllRoutes =  state.allRoutes.filter(function( obj ) {
                return obj.routeid !== action.payload;
            });
            return { ...state, createdRoutes: removeCreatedRoutes, allRoutes: removeAllRoutes }
        default:
            return state;
    }
}