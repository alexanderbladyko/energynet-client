
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from 'store/configureStore' // eslint-disable-line
import 'favicon.ico'
import 'styles/styles.scss'
import RoutesApp from 'apps/routes/app'

import {
    loadConfig,
} from 'actions/config'
import {
    loadUserInfo,
} from 'actions/userInfo'

const store = configureStore()

loadConfig(store.dispatch).then(config => {
    if (!config) return
    loadUserInfo(store.dispatch, config).done()
}).done()

render(
    <Provider store={store}>
        <RoutesApp />
    </Provider>, document.getElementById('app')
)
