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
} from 'actions/gameState'
import * as socket from 'api/socket'

import Games from 'components/Games/Games'
import Lobby from 'components/Lobby/Lobby'

interface IBodyProps {
    gameState: State.IGameState,
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
        socket.initSocket()

        socket.subscribe('handshake', (data: any): void => {
            console.log('Socket connected')
            this.props.socketConnected()

            this.props.requestState()
            socket.send('state', {})
        })

        socket.subscribe('state', (data: State.IGameState): void => {
            this.props.receiveState(data)
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
            default:
                return <div>
                    {
                        this.props.gameState.loading
                        && 'Loading'
                    }
                    {
                        !this.props.gameState.loading
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
            socket.initSocket()

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
            gameState: state.gameState,
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
