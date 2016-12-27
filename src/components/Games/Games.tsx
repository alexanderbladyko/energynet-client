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
} from 'actions/games'
import * as socket from 'api/socket'
import * as gamesSocket from 'api/gamesSocket'

interface IGamesProps {
    games: State.IGamesState
    userInfo: State.IUserInfoState
    requestGames: typeof requestGames
    receiveGames: typeof receiveGames
    requestGameJoin: typeof requestGameJoin
    responseGameJoin: typeof responseGameJoin
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
                                {`${game.name} (Кол-во игроков ${game.userLimit})`}
                                <button onClick={() => this.onJoinGame(game.id)}>{'Присоединиться'}</button>
                            </p>
                        )
                    })
                }
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
            games: state.games,
            userInfo: state.userInfo,
        }
    },
    {
        requestGames,
        receiveGames,
        requestGameJoin,
        responseGameJoin,
    }
)(Games)
