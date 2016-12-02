import 'es6-shim'
import 'es6-promise'
import 'isomorphic-fetch'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Store, } from 'redux'
import { Provider, } from 'react-redux'

import { loadConfig, } from 'actions/config'
import { loadUserInfo, } from 'actions/userInfo'
import Layout from 'components/Layout/Layout'
import { IState, } from 'state'
import { configureStore, } from 'store/init'


const store: Store<IState> = configureStore()


class Main extends React.Component<{}, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <Provider store={store}>
                <Layout/>
            </Provider>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))

loadConfig(store.dispatch).then(() => {
    loadUserInfo(store.dispatch, store.getState().config).done()
    return true
}).done()
