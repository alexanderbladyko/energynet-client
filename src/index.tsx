import 'es6-shim'
import 'es6-promise'
import 'isomorphic-fetch'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider, } from 'react-redux'

import Layout from 'components/Layout/Layout'
import { store, } from 'store'

import 'styles/base.scss'


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
