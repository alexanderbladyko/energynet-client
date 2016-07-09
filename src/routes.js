import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import HomePage from 'components/HomePage'
import NotFoundPage from 'components/NotFoundPage'

export default (
    <Route
        component={App}
        path="/"
    >
        <IndexRoute component={HomePage}/>
        <Route
            component={NotFoundPage}
            path="*"
        />
    </Route>
)
