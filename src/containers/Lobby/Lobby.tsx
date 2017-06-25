import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestGameLeave,
    responseGameLeave,
} from 'actions/games'
import {
    requestGameStart,
    receiveGameStart,
} from 'actions/game'
import {
    requestLobby,
    receiveLobby,
    addUser,
    removeUser,
} from 'actions/lobby'
import * as constants from 'constants'
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
    requestGameStart: typeof requestGameStart
    receiveGameStart: typeof receiveGameStart
}


class Lobby extends React.Component<ILobbyProps, {}> {
    public componentWillMount(): void {
        socket.send(constants.Messages.LOBBY, {})
        this.props.requestLobby()
        socket.subscribe(constants.Messages.LOBBY, (data: State.ILobby) => {
            this.props.receiveLobby(data)
        })
        socket.subscribe('leave_game', (data: State.IGameLeave) => {
            this.props.responseGameLeave(data)
        })
        socket.subscribe(constants.Messages.START_GAME, (data: State.IStartGame) => {
            this.props.receiveGameStart(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe(constants.Messages.LOBBY)
    }
    public render(): React.ReactElement<{}> {
        if (this.props.lobby.loading) {
            return <div>'Loading'</div>
        }
        if (!this.props.lobby.loaded) {
            return null
        }
        return (
            <div>
                {'Lobby'}
                <div>
                    {'Player'}
                    {
                        this.props.lobby.data.players.map(player => {
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
                        this.props.lobby.data.users.map(user => {
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
                {
                    this.props.lobby.data.ownerId === this.props.userInfo.data.id
                    && <button onClick={() => this.onGameStart()}>
                        {'Start'}
                    </button>
                }
            </div>
        )
    }
    private onLobbyLeave(): void {
        this.props.requestGameLeave()
        socket.send(constants.Messages.LEAVE_GAME, {})
    }
    private onUserAdd(id: number): void {
        this.props.addUser(id)
        socket.send('add_user', { id, })
    }
    private onUserRemove(id: number): void {
        this.props.removeUser(id)
        socket.send('remove_user', { id, })
    }
    private onGameStart(): void {
        this.props.requestGameStart()
        socket.send(constants.Messages.START_GAME, {})
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
        requestGameStart,
        receiveGameStart,
    }
)(Lobby)
