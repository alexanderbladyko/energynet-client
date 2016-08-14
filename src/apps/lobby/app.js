import React from 'react'
import { connect } from 'react-redux'

import { subscribe } from 'socket'
import { receiveLobby } from 'actions/lobby'


class Games extends React.Component {
    static propTypes = {
        lobby: React.PropTypes.object.isRequired,
        receiveLobby: React.PropTypes.func.isRequired,
    };
    componentWillMount() {
        this.lobbyHandler = subscribe('lobby', this.onReceiveLobby.bind(this))
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
    receiveLobby,
})(Games)
