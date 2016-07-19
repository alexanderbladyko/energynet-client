
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from 'store/configureStore' // eslint-disable-line
import 'favicon.ico'
import 'styles/styles.scss'
import RoutesApp from 'apps/routes/app'

import ConnectionApp from 'apps/connection/app'

import {
    loadConfig,
} from 'actions/config'
import {
    loadUserInfo,
} from 'actions/userInfo'

const store = configureStore()

const connectionApp = new ConnectionApp()

const apps = [
    connectionApp,
]

connectionApp.onConnect = () => {
    apps.forEach(app => app.connect())
}

apps.forEach(app => app.init(store))

loadConfig(store.dispatch).then(config => {
    apps.forEach(app => app.start(store))

    loadUserInfo(store.dispatch, config).done()
}).done()

render(
    <Provider store={store}>
        <RoutesApp />
    </Provider>, document.getElementById('app')
)
