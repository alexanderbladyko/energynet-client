import {
    NAVIGATE,
} from 'constants/actionTypes'


export function navigate(url) {
    return {
        type: NAVIGATE,
        payload: {
            url,
        },
    }
}
