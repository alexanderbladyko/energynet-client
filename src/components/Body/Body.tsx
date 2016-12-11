import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'
import * as Routes from 'constants/routes'

import Loading from 'components/Loading/Loading'
import Error from 'components/Error/Error'
import Login from 'components/Login/Login'
import Register from 'components/Register/Register'

interface IBodyProps {
    route: State.IRouteState
}


class Body extends React.Component<IBodyProps, {}> {
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
                return null
        }
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            route: state.route,
        }
    }
)(Body)
