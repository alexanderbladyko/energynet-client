import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'

import {
    requestGames,
    receiveGames,
    requestGameJoin,
    responseGameJoin,
    toggleNewGame,
} from 'actions/games'
import * as socket from 'api/socket'
import * as gamesSocket from 'api/gamesSocket'

import NewGame from './NewGame'


interface IGamesProps {
    newGame: State.INewGameState
    games: State.IGamesState
    userInfo: State.IUserInfoState
    requestGames: typeof requestGames
    receiveGames: typeof receiveGames
    requestGameJoin: typeof requestGameJoin
    responseGameJoin: typeof responseGameJoin
    toggleNewGame: typeof toggleNewGame
}


class Games extends React.Component<IGamesProps, {}> {
    public componentWillMount(): void {
        gamesSocket.initSocket()

        this.props.requestGames()
        gamesSocket.send('list', {})

        gamesSocket.subscribe('games', (data: Array<State.IGame>) => {
            this.props.receiveGames(data)
        })

        socket.subscribe('join_game', (data: State.IGameJoin) => {
            this.props.responseGameJoin(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('join_game')
        gamesSocket.disconnect()
    }
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {'Games'}
                {
                    this.props.games.loading
                    && 'Loading'
                }
                {
                    this.props.games.data.map(game => {
                        return (
                            <p
                                key={game.id}
                            >
                                {`${game.name} (Limit of players ${game.userLimit})`}
                                <button onClick={() => this.onJoinGame(game.id)}>{'Join'}</button>
                            </p>
                        )
                    })
                }
                <div>
                    <button onClick={() => this.props.toggleNewGame()}>
                    {
                        !this.props.newGame.opened ?
                        'Create new' :
                        'Cancel'
                    }
                    </button>
                    {this.props.newGame.opened}
                    {
                        this.props.newGame.opened
                        && <NewGame />
                    }
                </div>
            </div>
        )
    }
    private onJoinGame(id: number): void {
        socket.send('join_game', { id, })
        this.props.requestGameJoin()
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            newGame: state.newGame,
            games: state.games,
            userInfo: state.userInfo,
        }
    },
    {
        requestGames,
        receiveGames,
        requestGameJoin,
        responseGameJoin,
        toggleNewGame,
    }
)(Games)
