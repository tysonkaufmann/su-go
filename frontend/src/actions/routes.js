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