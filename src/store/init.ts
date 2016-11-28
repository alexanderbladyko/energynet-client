import { Store, createStore, Reducer, combineReducers, } from 'redux'

import reducers from 'reducers'
import { initialState, IState, } from 'state'


declare const require: (name: String) => any

interface IHotModule {
    hot?: { accept: (path: string, callback: () => void) => void }
}

declare const module: IHotModule

export function configureStore(): Store<IState> {
    const reducer: Reducer<IState> = combineReducers<IState>(reducers)
    const store: Store<IState> = createStore<IState>(reducer, initialState)

    if (module.hot) {
        module.hot.accept('reducers', () => {
            const nextRootReducer: any = require('reducers').counterApp
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
