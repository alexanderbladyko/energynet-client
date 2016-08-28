import React from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client'

import { send, subscribe } from 'socket'
import Game from 'apps/games/components/Game'
import NewGame from 'apps/games/components/NewGame'

import {
    receiveGames,
    createNewGame,
    responseNewGame,
    joinGame,
    responseJoinGame,
} from 'actions/games'


class Games extends React.Component {
    static propTypes = {
        createNewGame: React.PropTypes.func.isRequired,
        games: React.PropTypes.object.isRequired,
        joinGame: React.PropTypes.func.isRequired,
        receiveGames: React.PropTypes.func.isRequired,
        responseJoinGame: React.PropTypes.func.isRequired,
        responseNewGame: React.PropTypes.func.isRequired,
    };
    componentWillMount() {
        this.socket = io('/games')
        this.socket.on('games', data => {
            this.props.receiveGames(data)
        })
        this.socket.on('new_game', result => {
            this.props.responseNewGame(result)
        })
        this.joinHandler = subscribe('join_game', this.props.responseJoinGame)
    }
    componentWillUnmout() {
        this.socket.disconnect()
        this.joinHandler.destroy()
    }
    handleCreateNewGame(data) {
        this.props.createNewGame()
        this.socket.emit('new', data)
    }
    handleJoinGame(id) {
        send('join', { id })
        this.props.joinGame()
    }
    render() {
        if (this.props.games.loading) {
            return <div>{'Loading'}</div>
        }
        return (
            <div className="games">
                <h1>
                    {'Games list'}
                </h1>
                <div>
                {
                    this.props.games.data.map(game => {
                        return (
                            <Game
                                game={game}
                                handleClick={() => { this.handleJoinGame(game.id) }}
                                key={game.id}
                            />
                        )
                    })
                }
                </div>
                <div>
                    <NewGame createNewGame={this.handleCreateNewGame.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        games: state.games,
    }
}, {
    receiveGames,
    createNewGame,
    responseNewGame,
    joinGame,
    responseJoinGame,
})(Games)
