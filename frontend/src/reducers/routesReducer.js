const initialState = {
    favouriteRoutes: [],
    createdRoutes: [{
        image: "../assets/jog.jpg",

        routetitle: "Biking Route",
        routedescription: "A short bike ride with a refreshing view.",
        routedistance: 12,
        routetime: "abc",
        lat: 0,
        long: 0,
        rating: 3,
        route: [
            [
                [51.5, -0.1],
                [51.5, -0.12],
                [51.52, -0.12],
            ],
            [
                [51.5, -0.05],
                [51.5, -0.06],
                [51.52, -0.06],
            ],
        ]
    },
        {
            routetitle: "Walk Route.",
            routedescription: "Nearby walk to the lake.",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route:[
            {lat: 49.80554029854007, lng: -97.150297164917},
             {lat: 49.81274857429266, lng: -97.14600563049318},
            {lat: 49.80853463573231, lng: -97.13879585266115},
            {lat: 49.80354397084248, lng: -97.1418857574463},
             {lat: 49.80154756082155, lng: -97.15767860412599},
             {lat: 49.79999474055639, lng: -97.15064048767091}]
        },{
        image: "../assets/bike.jpg",
        routetitle: "Jogging",
        routedescription: "A quick jog.",
        routedistance: 2,
        routetime: "abc",
        lat: 0,
        long: 0,
        rating: 3,
            route:[
                {lat: 49.80554029854007, lng: -97.150297164917},
                {lat: 49.81274857429266, lng: -97.14600563049318},
                {lat: 49.80853463573231, lng: -97.13879585266115},
                {lat: 49.80354397084248, lng: -97.1418857574463},
                {lat: 49.80154756082155, lng: -97.15767860412599},
                {lat: 49.79999474055639, lng: -97.15064048767091}]
    },
        {
            routetitle: "ROUTE 2",
            routedescription: "THIS IS SOMEWHERE ELSE",
            routedistance: 7,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route:[
                {lat: 49.80554029854007, lng: -97.150297164917},
                {lat: 49.81274857429266, lng: -97.14600563049318},
                {lat: 49.80853463573231, lng: -97.13879585266115},
                {lat: 49.80354397084248, lng: -97.1418857574463},
                {lat: 49.80154756082155, lng: -97.15767860412599},
                {lat: 49.79999474055639, lng: -97.15064048767091}]
        }],
    createRouteDetails: {
        routetitle: "",
        routedescription: "",
        routedistance: 0,
        route: []
    }
};

export default function routesReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_FAVOURITE_ROUTES":
            return {...state, favouriteRoutes: action.payload}
        case "UPDATE_CREATED_ROUTES":
            return {...state, createdRoutes: action.payload}
        case "UPDATE_CREATE_ROUTE_DETAILS":
            return {...state, createRouteDetails: action.payload}
        case "ADD_CREATED_ROUTE":
            let temp = state.createdRoutes.slice()
            temp.push(action.payload)
            return {...state, createdRoutes: temp}
        default:
            return state;
    }
}