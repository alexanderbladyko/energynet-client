import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'
import * as Routes from 'constants/routes'

import Loading from 'apps/Loading/Loading'
import Error from 'apps/Error/Error'
import Login from 'apps/Login/Login'
import Register from 'apps/Register/Register'
import Game from 'apps/Game/Game'
import Games from 'apps/Games/Games'
import Lobby from 'apps/Lobby/Lobby'
import Home from 'apps/Home/Home'

import Authorized from './components/Authorized'

import {
    socketConnecting,
    socketConnected,
} from 'actions/socket'
import {
    requestState,
    receiveState,
} from 'actions/status'



interface IRouterProps {
    route: State.IRouteState
    config: State.IConfigState,
    userInfo: State.IUserInfoState
    socketConnecting: typeof socketConnecting
    socketConnected: typeof socketConnected
    requestState: typeof requestState
    receiveState: typeof receiveState
}


class Router extends React.Component<IRouterProps, {}> {
    private _unauthorizedRoutes: any = {
        [Routes.LOGIN_ROUTE]: Login,
        [Routes.ERROR_ROUTE]: Error,
        [Routes.LOADING_ROUTE]: Loading,
        [Routes.REGISTER_ROUTE]: Register,
    }
    private _authorizedRoutes: any = {
        [Routes.GAME_ROUTE]: Game,
        [Routes.GAMES_ROUTE]: Games,
        [Routes.LOBBY_ROUTE]: Lobby,
        [Routes.HOME_ROUTE]: Home,
    }
    public render(): React.ReactElement<{}> {
        const path: string = this.props.route.path
        if (path in this._unauthorizedRoutes) {
            return React.createElement(this._unauthorizedRoutes[path])
        }
        if (path in this._authorizedRoutes) {
            return (
                <Authorized {...this.props}>
                    {React.createElement(this._authorizedRoutes[path])}
                </Authorized>
            )
        }
        console.error(`No view for '${path}'`)
        return (<div/>)
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            config: state.config,
            route: state.route,
            userInfo: state.userInfo,
        }
    },
    {
        socketConnecting,
        socketConnected,
        requestState,
        receiveState,
    }
)(Router)
