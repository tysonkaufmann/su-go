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