import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestGameLeave,
    responseGameLeave,
} from 'actions/games'
import {
    requestLobby,
    receiveLobby,
    addUser,
    removeUser,
} from 'actions/lobby'
import * as State from 'state'

import * as socket from 'api/socket'

interface ILobbyProps {
    lobby: State.ILobbyState
    userInfo: State.IUserInfoState
    requestLobby: typeof requestLobby
    receiveLobby: typeof receiveLobby
    addUser: typeof addUser
    removeUser: typeof removeUser
    requestGameLeave: typeof requestGameLeave
    responseGameLeave: typeof responseGameLeave
}


class Lobby extends React.Component<ILobbyProps, {}> {
    public componentWillMount(): void {
        socket.send('lobby', {})
        this.props.requestLobby()
        socket.subscribe('lobby', (data: State.ILobby) => {
            this.props.receiveLobby(data)
        })
        socket.subscribe('leave_game', (data: State.IGameLeave) => {
            this.props.responseGameLeave(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('lobby')
    }
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {'Lobby'}
                {
                    this.props.lobby.loading
                    && 'Loading'
                }
                <div>
                    {'Player'}
                    {
                        this.props.lobby.data
                        && this.props.lobby.data.players.map(player => {
                            return (
                                <div key={player.id}>
                                    {player.name}
                                    {
                                        this.props.lobby.data.ownerId === this.props.userInfo.data.id
                                        && <button onClick={() => this.onUserRemove(player.id)}>
                                            {'Remove'}
                                        </button>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {'Users'}
                    {
                        this.props.lobby.data
                        && this.props.lobby.data.users.map(user => {
                            return (
                                <div key={user.id}>
                                    {user.name}
                                    {
                                        this.props.lobby.data.ownerId === this.props.userInfo.data.id
                                        && <button onClick={() => this.onUserAdd(user.id)}>
                                            {'Add'}
                                        </button>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={() => this.onLobbyLeave()}>
                    {'Leave'}
                </button>
            </div>
        )
    }
    private onLobbyLeave(): void {
        this.props.requestGameLeave()
        socket.send('leave_game', {})
    }
    private onUserAdd(id: number): void {
        this.props.addUser(id)
        socket.send('add_user', { id, })
    }
    private onUserRemove(id: number): void {
        this.props.removeUser(id)
        socket.send('remove_user', { id, })
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
        addUser,
        removeUser,
        requestGameLeave,
        responseGameLeave,
    }
)(Lobby)
