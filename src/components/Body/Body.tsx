import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'
import * as Routes from 'constants/routes'

import Loading from 'components/Loading/Loading'
import Error from 'components/Error/Error'
import Login from 'components/Login/Login'

const routes: { [route: string]: React.Component<any, {}>} = {
    [Routes.LOADING_ROUTE]: Loading,
    [Routes.ERROR_ROUTE]: Error,
    [Routes.LOGIN_ROUTE]: Login,
}


interface IBodyProps {
    route: State.IRouteState
}


class Body extends React.Component<IBodyProps, {}> {
    public render(): React.ReactElement<{}> {
        const Component: React.Component<any, {}> = routes[this.props.route.path]
        if (Component) {
            return <Component />
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
