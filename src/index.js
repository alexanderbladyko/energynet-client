
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from 'store/configureStore' // eslint-disable-line
import 'favicon.ico'
import 'styles/styles.scss'
import App from 'components/App'

import ConfigApp from 'apps/config/app'
import ConnectionApp from 'apps/connection/app'

const store = configureStore()

const configApp = new ConfigApp()
const connectionApp = new ConnectionApp()

configApp.start(store)
configApp.load().then(() => {
    connectionApp.start(store)
}).done()

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app')
)
