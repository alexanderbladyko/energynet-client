import React from 'react'
import { connect } from 'react-redux'

import { send, subscribe } from 'socket'
import { navigate } from 'actions/route'
import {
    LOBBY_ROUTE,
    GAMES_ROUTE,
} from 'constants/routes'


class Home extends React.Component {
    static propTypes = {
        lobby: React.PropTypes.object.isRequired,
        navigate: React.PropTypes.func.isRequired,
    };
    componentWillMount() {
        send('state', {})
        this.stateHandler = subscribe('state', this.onState.bind(this))
    }
    componentWillUnmout() {
        this.stateHandler.destroy()
    }
    onState(data) {
        console.log(data)
        // this.props.receiveLobby(data)
    }
    render() {
        return (
            <div>
                <h1>
                    {'Home'}
                </h1>
                <div>
                    <button
                        onClick={() => this.props.navigate(LOBBY_ROUTE)}
                    >
                        {'Go to lobby'}
                    </button>
                    <button
                        onClick={() => this.props.navigate(GAMES_ROUTE)}
                    >
                        {'Go to games'}
                    </button>
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
    navigate,
})(Home)
