import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as socket from 'api/socket'
import * as State from 'state'

interface IColorPickProps {
    config: State.IConfigState
    game: State.IGameState
    players: State.IPlayersState
}


class ColorPick extends React.Component<IColorPickProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {
                    this.props.config.data.colors.map(color => {
                        return (
                            <div key={color}>
                                <div
                                    style={{
                                        width: 25,
                                        height: 25,
                                        margin: 20,
                                        backgroundColor: color,
                                        opacity: this.colorIsPicked(color) ? 0.3 : 1,
                                    }}
                                    onClick={() => this.selectColor(color)}
                                >
                                </div>
                                {
                                    this.colorIsPicked(color)
                                    && 'Taken'
                                }
                            </div>
                        )
                    })
                }
                {
                    this.props.game.data.map(playerInfo => {
                        return (
                            <div key={playerInfo.id}>
                                {
                                    'Player: ' +
                                    this.props.players.data.find(player => player.id === playerInfo.id).name
                                }
                                {
                                    playerInfo.color
                                    &&
                                    <div
                                        style={{
                                            width: 25,
                                            height: 25,
                                            margin: 20,
                                            backgroundColor: playerInfo.color,
                                        }}
                                    >
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    private colorIsPicked(color: string): boolean {
        return this.props.game.data.some(player => player.color === color)
    }
    private selectColor(color: string): void {
        if (this.colorIsPicked(color)) {
            return
        }

        socket.send('select_color', { color, })
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            config: state.config,
            game: state.game,
            players: state.players,
            // userInfo: state.userInfo,
        }
    },
    {
    }
)(ColorPick)
