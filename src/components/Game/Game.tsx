import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    receiveGameAction,
} from 'actions/action'
import {
    requestGameInfo,
    receiveGameInfo,
} from 'actions/game'
import {
    requestPlayers,
    receivePlayers,
} from 'actions/players'
import * as socket from 'api/socket'
import * as constants from 'constants'
import Auction from 'components/Auction/Auction'
import ColorPick from 'components/ColorPick/ColorPick'
import Map from 'components/Map/Map'
import * as State from 'state'

interface IGameProps {
    game: State.IGameState
    receiveGameAction: typeof receiveGameAction
    requestGameInfo: typeof requestGameInfo
    receiveGameInfo: typeof receiveGameInfo
    requestPlayers: typeof requestPlayers
    receivePlayers: typeof receivePlayers
}


class Game extends React.Component<IGameProps, {}> {
    public componentWillMount(): void {
        this.props.requestPlayers()
        socket.send('players', {})

        socket.subscribe('players', (data: State.IPlayer[]) => {
            this.props.receivePlayers(data)

            this.props.requestGameInfo()
            socket.send('game', {})
        })
        socket.subscribe('game', (data: State.IGame): void => {
            this.props.receiveGameInfo(data)
        })
        socket.subscribe('action', (data: State.IGameActionResponse): void => {
            this.props.receiveGameAction(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('game')
        socket.unsubscribe('players')
    }
    public render(): React.ReactElement<{}> {
        if (!this.props.game.data) {
            return null
        }
        if (this.props.game.loading) {
            return <div>{'Loading'}</div>
        }
        if (this.props.game.meta.step === constants.StepTypes.COLORS) {
            return <ColorPick />
        }
        return (
            <div>
                <Map />
                <Auction />
            </div>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
            userInfo: state.userInfo,
        }
    },
    {
        receiveGameAction,
        requestGameInfo,
        receiveGameInfo,
        requestPlayers,
        receivePlayers,
    }
)(Game)
