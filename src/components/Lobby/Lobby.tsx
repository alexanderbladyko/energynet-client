import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestLobby,
    receiveLobby,
} from 'actions/lobby'
import * as State from 'state'

import * as socket from 'api/socket'

interface ILobbyProps {
    lobby: State.ILobbyState
    userInfo: State.IUserInfoState
    requestLobby: typeof requestLobby
    receiveLobby: typeof receiveLobby
}


class Lobby extends React.Component<ILobbyProps, {}> {
    public componentWillMount(): void {
        socket.send('lobby', {})
        this.props.requestLobby()
        socket.subscribe('lobby', (data: State.ILobby) => {
            this.props.receiveLobby(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('lobby')
    }
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {'Lobby'}
                
            </div>
        )
    }
}
export default connect(
    (state: State.IState): any => {
        return {
            lobby: state.lobby,
            userInfo: state.userInfo,
        }
    },
    {
        requestLobby,
        receiveLobby,
    }
)(Lobby)
