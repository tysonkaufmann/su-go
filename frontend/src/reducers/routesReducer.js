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
            route: [
                [
                    [53.5, -0.1],
                    [53.5, -0.12],
                    [53.52, -0.12],
                ],

            ]
        },{
        image: "../assets/bike.jpg",
        routetitle: "Jogging",
        routedescription: "A quick jog.",
        routedistance: 2,
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
            routetitle: "ROUTE 2",
            routedescription: "THIS IS SOMEWHERE ELSE",
            routedistance: 7,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                [
                    [53.5, -0.1],
                    [53.5, -0.12],
                    [53.52, -0.12],
                ],

            ]
        }]
};

export default function userProfileReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_FAVOURITE_ROUTES":
            return {...state, favouriteRoutes: action.payload}
        case "UPDATE_CREATED_ROUTES":
            return {...state, createdRoutes: action.payload}
        default:
            return state;
    }
}