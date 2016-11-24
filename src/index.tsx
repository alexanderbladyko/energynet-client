import 'es6-shim'
// import 'es6-collections'
import 'es6-promise'
import 'isomorphic-fetch'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Store, createStore, Reducer, combineReducers, } from 'redux'
import { Provider, } from 'react-redux'

import config from './reducers/config'
import Counter from './components/Counter'
import { loadConfig, } from './actions/config'

import { initialState, IState, } from 'state'


function configureStore(): Store<IState> {
    const reducer: Reducer<IState> = combineReducers<IState>({
        config,
    })
    const store: Store<IState> = createStore<IState>(reducer, initialState)

    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         const nextRootReducer: any = require('./reducers').counterApp
    //         store.replaceReducer(nextRootReducer)
    //     })
    // }

    return store
}

const store: Store<IState> = configureStore()


class Main extends React.Component<{}, {}> {

    public render(): React.ReactElement<{}> {
        return (
            <Provider store={store}>
                <Counter/>
            </Provider>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))

loadConfig(store.dispatch).done()

export function sum(a: number, b: number): number {
    return a + b
}
