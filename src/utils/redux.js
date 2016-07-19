

export function stateCompare(oldState, newState) {
    for(let key in newState) {
        if (newState[key] !== oldState[key]) {
            return true
        }
    }
    return false
}


export function storeSubscribe(store, lens, handler) {
    let state = lens(store.getState())
    return store.subscribe(function () {
        const newState = lens(store.getState())
        if (stateCompare(state, newState)) {
            handler(state, newState)
            state = newState
        }
    })
}
