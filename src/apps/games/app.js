import React from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client'

import Game from 'apps/games/components/Game'
import NewGame from 'apps/games/components/NewGame'

import {
    receiveGames,
    createNewGame,
    responseNewGame,
} from 'actions/games'


class Games extends React.Component {
    static propTypes = {
        createNewGame: React.PropTypes.func.isRequired,
        games: React.PropTypes.object.isRequired,
        receiveGames: React.PropTypes.func.isRequired,
        responseNewGame: React.PropTypes.func.isRequired,
    };
    componentWillMount() {
        this.socket = io('/games')
        this.socket.on('games', data => {
            this.props.receiveGames(data)
        })
        this.socket.on('new', result => {
            this.props.responseNewGame(result)
        })
    }
    componentWillUnmout() {
        this.socket.disconnect()
    }
    handleCreateNewGame(data) {
        this.props.createNewGame()
        this.socket.emit('new', data)
    }
    render() {
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
                                handleClick={() => {}}
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
})(Games)
