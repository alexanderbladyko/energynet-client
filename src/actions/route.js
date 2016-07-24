import {
    NAVIGATE,
} from 'constants/actionTypes'


export function navigate(route) {
    return {
        type: NAVIGATE,
        payload: {
            route,
        },
    }
}
