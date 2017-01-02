import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'
import * as socket from 'api/socket'

interface IGameProps {
}


class Game extends React.Component<IGameProps, {}> {
    public componentWillMount(): void {
        socket.subscribe('players', (data: State.IPlayer[]) => {
        })
        socket.subscribe('game', (data: State.IGame): void => {
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('game')
        socket.unsubscribe('players')
    }
    public render(): React.ReactElement<{}> {
        return (
            <div>
            </div>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            route: state.route,
            userInfo: state.userInfo,
        }
    },
    {
    }
)(Game)
