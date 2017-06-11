import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'
import * as Routes from 'constants/routes'

import {
    navigate,
} from 'actions/route'
import {
    socketConnecting,
    socketConnected,
} from 'actions/socket'
import {
    requestState,
    receiveState,
} from 'actions/status'
import * as socket from 'api/socket'

import Game from 'containers/Game/Game'
import Games from 'containers/Games/Games'
import Lobby from 'containers/Lobby/Lobby'

interface IBodyProps {
    status: State.IStatusState,
    route: State.IRouteState
    userInfo: State.IUserInfoState
    socketConnecting: typeof socketConnecting
    socketConnected: typeof socketConnected
    requestState: typeof requestState
    receiveState: typeof receiveState
    navigate: typeof navigate
}


class Body extends React.Component<IBodyProps, {}> {
    public componentWillMount(): void {
        this.props.socketConnecting()
        socket.initSocket(this.props.userInfo.data.userToken)

        socket.subscribe('handshake', (data: any): void => {
            console.log('Socket connected')
            this.props.socketConnected()

            this.props.requestState()
            socket.send('state', {})
        })

        socket.subscribe('state', (data: State.IStatusState): void => {
            this.props.receiveState(data)
        })

        socket.subscribe('connect_timeout', () => {
            console.log('Socket timeout')
        })

    }
    public componentWillUnmount(): void {
        socket.unsubscribe('handshake')
    }
    public componentWillUpdate(nextProps: IBodyProps): void {
        if (
            nextProps.userInfo.data.isAuthenticated
            && !this.props.userInfo.data.isAuthenticated
        ) {
            this.initSocket()
        }
    }
    public render(): React.ReactElement<{}> {
        switch (this.props.route.path) {
            case Routes.GAMES_ROUTE:
                return <Games />
            case Routes.LOBBY_ROUTE:
                return <Lobby />
            case Routes.GAME_ROUTE:
                return <Game />
            default:
                return <div>
                    {
                        this.props.status.loading
                        && 'Loading'
                    }
                    {
                        !this.props.status.loading
                        && <div>
                            {'Body'}
                            <button
                                title='To games'
                                onClick={() => { this.props.navigate(Routes.GAMES_ROUTE) }}
                            >
                            {'To games'}
                            </button>
                        </div>
                    }
                </div>
        }
    }
    private initSocket(): void {
        if (this.props.userInfo.data.isAuthenticated) {
            this.props.socketConnecting()
            socket.initSocket(this.props.userInfo.data.userToken)

            socket.subscribe('handshake', (data: any): void => {
                console.log('Socket connected')
                this.props.socketConnected()
            })
        }
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            status: state.status,
            route: state.route,
            userInfo: state.userInfo,
        }
    },
    {
        socketConnecting,
        socketConnected,
        requestState,
        receiveState,
        navigate,
    }
)(Body)
