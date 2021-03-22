const initialState = {
    favouriteRoutes: [],
    allRoutes: [
        {
            image: "../assets/jog.jpg",
            routetitle: "Biking Route",
            routedescription: "A short bike ride with a refreshing view.",
            routedistance: 12,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 3,
            route: [
                { lat: 49.80554029854007, lng: -97.150297164917 },
                { lat: 49.81274857429266, lng: -97.14600563049318 },
                { lat: 49.80853463573231, lng: -97.13879585266115 },
                { lat: 49.80354397084248, lng: -97.1418857574463 },
                { lat: 49.80154756082155, lng: -97.15767860412599 },
                { lat: 49.79999474055639, lng: -97.15064048767091 }]
        },
        {
            routetitle: "Walk Route.",
            routedescription: "Birds Hill Park",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                { lat: 50.02008224325204, lng: -96.88688278198244 },
                { lat: 50.01327887054306, lng: -96.8646651128932 },
                { lat: 49.99642842322335, lng: -96.86432841832757 },
                { lat: 49.997974896688895, lng: -96.89074516296387 },
                { lat: 50.00325171726569, lng: -96.91120606853569 },
                { lat: 50.01748947298032, lng: -96.8987279138113 }]
        }, 
        {
            image: "../assets/bike.jpg",
            routetitle: "Jogging",
            routedescription: "Avoid the airplanes.",
            routedistance: 2,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 3,
            route: [
                { lat: 49.895974190573554, lng: -97.24153518676758 },
                { lat: 49.923688744592944, lng: -97.23587036132812 }]
        },
        {
            routetitle: "Walk Route.",
            routedescription: "test route",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                { lat: 49.8118610702291, lng: -97.1759605407715 },
                { lat: 49.801880020855464, lng: -97.1730422973633 }]
        },
        {
            routetitle: "Walk Route.",
            routedescription: "test route",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                { lat: 49.85707671093045, lng: -97.23054885864259 },
                { lat: 49.85608067527738, lng: -97.1953582763672 }]
        },
        {
            routetitle: "Walk Route.",
            routedescription: "test route",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                { lat: 49.868253036392865, lng: -97.24925994873048 },
                { lat: 49.86714658483774, lng: -97.22127914428711 }]
        },
        {
            routetitle: "Walk Route.",
            routedescription: "test route",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                { lat: 49.81179168856751, lng: -97.26882934570314 },
                { lat: 49.81821610594565, lng: -97.26367950439455 }]
        },
        {
            routetitle: "Walk Route.",
            routedescription: "test route",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                { lat: 49.944813166695106, lng: -97.18574523925783 },
                { lat: 49.943045639629425, lng: -97.17750549316408 }]
        },
        {
            routetitle: "Walk Route.",
            routedescription: "test route",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                { lat: 49.872291369486696, lng: -97.26608276367189 },
                { lat: 49.869193500287224, lng: -97.22488403320314 }]
        },
        {
            routetitle: "Walk Route.",
            routedescription: "test route",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                { lat: 49.899278676933456, lng: -97.11158752441408 },
                { lat: 49.89220149861141, lng: -97.13424682617189 }]
        },
        {
            routetitle: "Walk Route.",
            routedescription: "test route",
            routedistance: 8,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 4.5,
            route: [
                { lat: 49.83371980651216, lng: -97.08789825439455 },
                { lat: 49.818396454975904, lng: -97.08085970733421 }]
        },
    ],
    createdRoutes: [
        {
            image: "../assets/jog.jpg",
            routetitle: "Biking Route",
            routedescription: "A short bike ride with a refreshing view.",
            routedistance: 12,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 3,
            route: [
                { lat: 49.80554029854007, lng: -97.150297164917 },
                { lat: 49.81274857429266, lng: -97.14600563049318 },
                { lat: 49.80853463573231, lng: -97.13879585266115 },
                { lat: 49.80354397084248, lng: -97.1418857574463 },
                { lat: 49.80154756082155, lng: -97.15767860412599 },
                { lat: 49.79999474055639, lng: -97.15064048767091 }]
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
                { lat: 49.80554029854007, lng: -97.150297164917 },
                { lat: 49.81274857429266, lng: -97.14600563049318 },
                { lat: 49.80853463573231, lng: -97.13879585266115 },
                { lat: 49.80354397084248, lng: -97.1418857574463 },
                { lat: 49.80154756082155, lng: -97.15767860412599 },
                { lat: 49.79999474055639, lng: -97.15064048767091 }]
        }, {
            image: "../assets/bike.jpg",
            routetitle: "Jogging",
            routedescription: "A quick jog.",
            routedistance: 2,
            routetime: "abc",
            lat: 0,
            long: 0,
            rating: 3,
            route: [
                { lat: 49.80554029854007, lng: -97.150297164917 },
                { lat: 49.81274857429266, lng: -97.14600563049318 },
                { lat: 49.80853463573231, lng: -97.13879585266115 },
                { lat: 49.80354397084248, lng: -97.1418857574463 },
                { lat: 49.80154756082155, lng: -97.15767860412599 },
                { lat: 49.79999474055639, lng: -97.15064048767091 }]
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
                { lat: 49.80554029854007, lng: -97.150297164917 },
                { lat: 49.81274857429266, lng: -97.14600563049318 },
                { lat: 49.80853463573231, lng: -97.13879585266115 },
                { lat: 49.80354397084248, lng: -97.1418857574463 },
                { lat: 49.80154756082155, lng: -97.15767860412599 },
                { lat: 49.79999474055639, lng: -97.15064048767091 }]
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
            return { ...state, favouriteRoutes: action.payload }
        case "UPDATE_CREATED_ROUTES":
            return { ...state, createdRoutes: action.payload }
        case "UPDATE_CREATE_ROUTE_DETAILS":
            return { ...state, createRouteDetails: action.payload }
        case "ADD_CREATED_ROUTE":
            let temp = state.createdRoutes.slice()
            temp.push(action.payload)
            return { ...state, createdRoutes: temp }
        default:
            return state;
    }
}