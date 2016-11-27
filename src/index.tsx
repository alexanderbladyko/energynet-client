import 'es6-shim'
import 'es6-promise'
import 'isomorphic-fetch'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Store, } from 'redux'
import { Provider, } from 'react-redux'

import { loadConfig, } from './actions/config'
import Counter from './components/Counter'
import { IState, } from './state'
import { configureStore, } from './store/init'


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
