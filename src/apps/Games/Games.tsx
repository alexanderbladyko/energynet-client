import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as constants from 'constants'
import * as State from 'state'

import {
    requestGames,
    receiveGames,
    requestGameJoin,
    responseGameJoin,
    toggleNewGame,
} from 'actions/games'
import * as socket from 'api/socket'

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
        this.props.requestGames()

        socket.subscribe(constants.Messages.GAMES, (data: Array<State.IGame>) => {
            this.props.receiveGames(data)
        })
        socket.send(constants.Messages.GAMES, {})

        socket.subscribe('join_game', (data: State.IGameJoin) => {
            this.props.responseGameJoin(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('find_game')
        socket.unsubscribe('games')
        socket.unsubscribe('join_game')
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
                                {`${game.name} (Limit of players ${game.playersLimit})`}
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
