import React from 'react'
import { connect } from 'react-redux'

import { send, subscribe } from 'socket'
import { navigate } from 'actions/route'
import { getState, receiveState } from 'actions/state'
import {
    LOBBY_ROUTE,
    GAMES_ROUTE,
} from 'constants/routes'


class Home extends React.Component {
    static propTypes = {
        getState: React.PropTypes.func.isRequired,
        navigate: React.PropTypes.func.isRequired,
        receiveState: React.PropTypes.func.isRequired,
        state: React.PropTypes.object.isRequired,
    };
    componentWillMount() {
        this.stateHandler = subscribe('state', this.onState.bind(this))
        send('state', {})
        this.props.getState()
    }
    componentWillUnmout() {
        this.stateHandler.destroy()
    }
    onState(data) {
        this.props.receiveState(data)
    }
    render() {
        return (
            <div>
                <h1>
                    {'Home'}
                </h1>
                {
                    this.props.state.loading
                    && <p>{'Loading'}</p>
                }
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
        state: state.state,
    }
}, {
    navigate,
    getState,
    receiveState,
})(Home)
