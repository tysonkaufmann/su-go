export function updateFavouriteRoutes(item) {
    return {
        type: 'UPDATE_FAVOURITE_ROUTES',
        payload: item
    }
}
export function updateCreatedRoutes(item) {
    return {
        type: 'UPDATE_CREATED_ROUTES',
        payload: item
    }
}
export function updateCreateRouteDetails(item) {
    return {
        type: 'UPDATE_CREATE_ROUTE_DETAILS',
        payload: item
    }
}
export function addCreatedRoute(item) {
    return {
        type: 'ADD_CREATED_ROUTE',
        payload: item
    }
}
export function removeCreatedRoute(item) {
    return {
        type: 'REMOVE_CREATED_ROUTES',
        payload: item
    }
}

export function updateAllRoutes(item) {
    return {
        type: 'UPDATE_ALL_ROUTES',
        payload: item
    }
}

export function updateCurrentRoute(item) {
    return {
        type: 'UPDATE_CURRENT_ROUTE',
        payload: item
    }
}

export function updateSelectedRoute(item) {
    return {
        type: 'UPDATE_SELECTED_ROUTE',
        payload: item
    }
}

export function updateTraffic(item) {
    return {
        type: 'UPDATE_TRAFFIC',
        payload: item
    }
}
