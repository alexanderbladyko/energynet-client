import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Store, createStore, Reducer, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import counter from './reducers/counter'
import Counter from './components/Counter'

function configureStore(): Store<{}> {
    const reducer: Reducer<{}> = combineReducers({
        counter,
    })
    const store: Store<{}> = createStore(reducer)

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
