
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

loadConfig(store.dispatch).then(config => {
    loadUserInfo(store.dispatch, config).then(userInfo => {
        if (userInfo.isAuthenticated) {
            connectionApp.start(store)
        }
    }).done()
}).done()

render(
    <Provider store={store}>
        <RoutesApp />
    </Provider>, document.getElementById('app')
)
