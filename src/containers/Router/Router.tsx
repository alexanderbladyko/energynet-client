import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'
import * as Routes from 'constants/routes'

import Body from 'containers/Body/Body'
import Loading from 'containers/Loading/Loading'
import Error from 'containers/Error/Error'
import Login from 'containers/Login/Login'
import Register from 'containers/Register/Register'

interface IRouterProps {
    route: State.IRouteState
}


class Router extends React.Component<IRouterProps, {}> {
    public render(): React.ReactElement<{}> {
        switch (this.props.route.path) {
            case Routes.LOGIN_ROUTE:
                return <Login />
            case Routes.ERROR_ROUTE:
                return <Error />
            case Routes.LOADING_ROUTE:
                return <Loading />
            case Routes.REGISTER_ROUTE:
                return <Register />
            default:
                return <Body />
        }
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            route: state.route,
        }
    }
)(Router)
