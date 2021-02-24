export function updateUsername(item) {
    return {
        type: 'UPDATE_USERNAME',
        payload: item
    }
}
export function updateEmail(item) {
    return {
        type: 'UPDATE_EMAIL',
        payload: item
    }
}
export function updateRoutesCompleted(item) {
    return {
        type: 'UPDATE_ROUTES_COMPLETED',
        payload: item
    }
}
export function updateDistanceCompleted(item) {
    return {
        type: 'UPDATED_DISTANCE_COMPLETED',
        payload: item
    }
}
export function updateTotalTime(item) {
    return {
        type: 'UPDATE_TOTAL_TIME',
        payload: item
    }
}
