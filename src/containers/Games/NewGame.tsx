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
import * as constants from 'constants'

interface INewGameProps {
    newGame: State.INewGameState
    requestNewGame: typeof requestNewGame
    responseNewGame: typeof responseNewGame
}

interface INewGameComponentState {
    playersLimit: number
}


class NewGame extends React.Component<INewGameProps, INewGameComponentState> {
    public refs: {
        name: (HTMLInputElement)
        loginForm: (HTMLFormElement)
        playersRange: (HTMLInputElement)
        playersNumber: (HTMLInputElement)
    }

    public componentWillMount(): void {
        this.setState({
            playersLimit: 4,
        })
        socket.subscribe('new_game', (data: State.INewGame) => {
            this.props.responseNewGame(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('new_game')
    }
    public render(): React.ReactElement<{}> {
        return (
            <form
                className='login'
                ref='loginForm'
            >
                <h1>
                    {'New game'}
                </h1>
                <h3>
                    <input
                        name='name'
                        ref='name'
                        type='text'
                    />
                </h3>
                <h3>
                    <input
                        max='6'
                        min='2'
                        name='playersRange'
                        onChange={
                            () => this.onPlayersLimitChanged(this.refs.playersRange.value)
                        }
                        ref='playersRange'
                        type='range'
                        value={this.state.playersLimit}
                    />
                    <input
                        max='6'
                        min='2'
                        name='playersNumber'
                        onChange={
                            () => this.onPlayersLimitChanged(this.refs.playersNumber.value)
                        }
                        ref='playersNumber'
                        type='number'
                        value={this.state.playersLimit}
                    />
                </h3>
                <button
                    onClick={() => this.onFormSubmit()}
                    type='button'
                >
                    {'Create'}
                </button>
            </form>
        )
    }
    private onPlayersLimitChanged(newValue: string): void {
        let number: number = parseInt(newValue, 10)
        number = (number < constants.MIN_PLAYERS ? constants.MIN_PLAYERS : number)
        number = (number > constants.MAX_PLAYERS ? constants.MAX_PLAYERS : number)
        number = (number ? number : 4)
        this.setState({
            playersLimit: number,
        })

    }
    private onFormSubmit(): void {
        this.props.requestNewGame()
        socket.send('new_game', {
            name: this.refs.name.value,
            playersLimit: this.state.playersLimit,
        })
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
