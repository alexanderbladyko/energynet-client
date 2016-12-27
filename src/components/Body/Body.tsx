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
import * as socket from 'api/socket'

import Games from 'components/Games/Games'

interface IBodyProps {
    route: State.IRouteState
    userInfo: State.IUserInfoState
    socketConnecting: typeof socketConnecting
    socketConnected: typeof socketConnected
    navigate: typeof navigate
}


class Body extends React.Component<IBodyProps, {}> {
    public componentWillMount(): void {
        this.initSocket()
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

            // case Routes.LOBBY_ROUTE:
                // return <Login />
            case Routes.GAMES_ROUTE:
                return <Games />
            default:
                return <div>
                    {'Body'}
                    <button
                        title='To games'
                        onClick={() => { this.props.navigate(Routes.GAMES_ROUTE) }}
                    >
                    {'To games'}
                    </button>
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
            route: state.route,
            userInfo: state.userInfo,
        }
    },
    {
        socketConnecting,
        socketConnected,
        navigate,
    }
)(Body)
