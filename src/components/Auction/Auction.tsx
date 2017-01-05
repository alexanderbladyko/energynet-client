import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestAuctionBet,
} from 'actions/auction'
import * as socket from 'api/socket'
import * as constants from 'constants'
import * as State from 'state'

interface IAuctionProps {
    game: State.IGameState
    requestAuctionBet: typeof requestAuctionBet
}


class Auction extends React.Component<IAuctionProps, {}> {
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
            game: state.game,
            userInfo: state.userInfo,
        }
    },
    {
        requestAuctionBet,
    }
)(Auction)
