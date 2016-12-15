import { Store, createStore, Reducer, combineReducers, } from 'redux'

import reducers from 'reducers'
import { initialState, IState, } from 'state'


// declaring global objects
declare const require: (name: String) => any

interface IHotModule {
    hot?: { accept: (path: string, callback: () => void) => void }
}
declare const module: IHotModule

declare const __REDUX_DEVTOOLS_EXTENSION__: any


export function configureStore(): Store<IState> {
    const reducer: Reducer<IState> = combineReducers<IState>(reducers)
    let enhancer: any
    if (window.hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION__')) {
        enhancer = __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
    }
    const store: Store<IState> = createStore<IState>(reducer, initialState, enhancer)

    if (module.hot) {
        module.hot.accept('reducers', () => {
            const nextRootReducer: any = require('reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
