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
        this.props.requestGames()
        gamesSocket.initSocket()

        gamesSocket.send('list', {})

        gamesSocket.subscribe('games', (data: Array<State.IGame>) => {
            this.props.receiveGames(data)
        })
    }
    public componentWillUnmount(): void {
        gamesSocket.disconnect()
    }
    public render(): React.ReactElement<{}> {
        return <div>
            {'Games'}
        </div>
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            gamesState: state.games,
            userInfo: state.userInfo,
        }
    },
    {
        requestGames,
        receiveGames,
    }
)(Games)
