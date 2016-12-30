import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'

import {
    requestNewGame,
    responseNewGame,
} from 'actions/games'
import * as socket from 'api/socket'

interface INewGameProps {
    newGame: State.INewGameState
    requestNewGame: typeof requestNewGame
    responseNewGame: typeof responseNewGame
}


class NewGame extends React.Component<INewGameProps, {}> {
    public componentWillMount(): void {
        socket.subscribe('new_game', (data: State.INewGame) => {
            this.props.responseNewGame(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('new_game')
    }
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {'NewGame'}
            </div>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            newGame: state.newGame,
        }
    },
    {
        requestNewGame,
        responseNewGame,
    }
)(NewGame)
