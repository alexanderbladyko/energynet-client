import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Store, createStore, Reducer, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import config from './reducers/config'
import Counter from './components/Counter'

import { initialState } from 'state'


function configureStore(): Store<{}> {
    const reducer: Reducer<{}> = combineReducers({
        config,
    })
    const store: Store<{}> = createStore(reducer, initialState)

    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         const nextRootReducer: any = require('./reducers').counterApp
    //         store.replaceReducer(nextRootReducer)
    //     })
    // }

    return store
}

const store: Store<{}> = configureStore()


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

export function sum(a: number, b: number): number {
    return a + b
}
