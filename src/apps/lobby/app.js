import React from 'react'
import { connect } from 'react-redux'

import { send, subscribe } from 'socket'
import { getLobby, receiveLobby } from 'actions/lobby'


class Games extends React.Component {
    static propTypes = {
        getLobby: React.PropTypes.func.isRequired,
        lobby: React.PropTypes.object.isRequired,
        receiveLobby: React.PropTypes.func.isRequired,
    };
    componentWillMount() {
        this.props.getLobby()
        this.lobbyHandler = subscribe('lobby', this.onReceiveLobby.bind(this))
        send('lobby')
    }
    componentWillUnmout() {
        this.lobbyHandler.destroy()
    }
    onReceiveLobby(data) {
        this.props.receiveLobby(data)
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
                <div>
                    {this.props.lobby.data.name}
                </div>
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
    receiveLobby,
})(Games)
