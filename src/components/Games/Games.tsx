import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'

import {
    requestGames,
    receiveGames,
} from 'actions/games'
import * as gamesSocket from 'api/gamesSocket'

interface IGamesProps {
    games: State.IGamesState
    userInfo: State.IUserInfoState
    requestGames: typeof requestGames
    receiveGames: typeof receiveGames
}


class Games extends React.Component<IGamesProps, {}> {
    public componentWillMount(): void {
        gamesSocket.initSocket()

        this.props.requestGames()
        gamesSocket.send('list', {})

        gamesSocket.subscribe('games', (data: Array<State.IGame>) => {
            this.props.receiveGames(data)
        })
    }
    public componentWillUnmount(): void {
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
                            <p key={game.id}>{`${game.name} (Кол-во игроков ${game.userLimit})`}</p>
                        )
                    })
                }
            </div>
        )
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
    }
)(Games)
