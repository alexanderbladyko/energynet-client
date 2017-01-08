import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestAuction,
    receiveAuction,
    requestAuctionBet,
} from 'actions/auction'
import * as socket from 'api/socket'
import * as State from 'state'
import Station from './Station'

interface IAuctionProps {
    auction: State.IAuctionState
    requestAuction: typeof requestAuction
    receiveAuction: typeof receiveAuction
    requestAuctionBet: typeof requestAuctionBet
}


class Auction extends React.Component<IAuctionProps, {}> {
    public componentWillMount(): void {
        this.props.requestAuction()
        socket.send('auction', {})

        socket.subscribe('auction', (data: State.IGameActionResponse): void => {
            this.props.receiveAuction(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('auction')
    }
    public render(): React.ReactElement<{}> {
        if (this.props.auction.loading) {
            return (
                <div>{'Loading...'}</div>
            )
        }
        return (
            <div>
                {
                    this.props.auction.data
                    && this.props.auction.data.map(station => {
                        return (
                            <Station key={station.cost} station={station} />
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
            auction: state.auction,
        }
    },
    {
        requestAuction,
        receiveAuction,
        requestAuctionBet,
    }
)(Auction)
