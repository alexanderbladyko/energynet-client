import React from 'react'
import { connect } from 'react-redux'

import { send, subscribe } from 'socket'
import { leaveGame, responseLeaveGame } from 'actions/games'
import { getLobby, receiveLobby } from 'actions/lobby'


class Games extends React.Component {
    static propTypes = {
        getLobby: React.PropTypes.func.isRequired,
        leaveGame: React.PropTypes.func.isRequired,
        lobby: React.PropTypes.object.isRequired,
        receiveLobby: React.PropTypes.func.isRequired,
        responseLeaveGame: React.PropTypes.func.isRequired,
    };
    componentWillMount() {
        this.lobbyHandler = subscribe('lobby', this.onReceiveLobby.bind(this))
        this.leaveHandler = subscribe('leave_game', this.props.responseLeaveGame)
        this.props.getLobby()
        send('lobby')
    }
    componentWillUnmout() {
        this.lobbyHandler.destroy()
        this.leaveHandler.destroy()
    }
    onReceiveLobby(data) {
        this.props.receiveLobby(data)
    }
    onLeaveLobby() {
        this.props.leaveGame()
        send('leave')
    }
    render() {
        return (
            <div>
                <h1>
                    {'Lobby'}
                </h1>
                {
                    this.props.lobby.loading
                    && <p>{'Loading'}</p>
                }
                <p>
                    {this.props.lobby.data.name}
                    {JSON.stringify(this.props.lobby.data)}
                </p>
                <button
                    onClick={this.onLeaveLobby.bind(this)}
                >
                    {'Leave lobby'}
                </button>
            </div>
        )
    }
}

export default connect(state => {
    return {
        lobby: state.lobby,
    }
}, {
    getLobby,
    leaveGame,
    receiveLobby,
    responseLeaveGame,
})(Games)
