import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestAuction,
    receiveAuction,
    requestAuctionBet,
    requestAuctionFold,
    selectStation,
} from 'actions/auction'
import * as socket from 'api/socket'
import * as State from 'state'
import Station from './Station'

interface IAuctionProps {
    auction: State.IAuctionState
    game: State.IGameState
    userInfo: State.IUserInfoState
    requestAuction: typeof requestAuction
    receiveAuction: typeof receiveAuction
    requestAuctionBet: typeof requestAuctionBet
    requestAuctionFold: typeof requestAuctionFold
    selectStation: typeof selectStation
}


class Auction extends React.Component<IAuctionProps, {}> {
    public refs: {
        betRange: (HTMLInputElement)
    }
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
        const userId: number = this.props.userInfo.data.id
        const yourTurn: boolean = (this.props.game.meta.turn === userId)
        const user: State.IGamePlayer = this.props.game.data.find(player => player.id === userId)
        const lastBet: number = this.props.game.meta.auction && this.props.game.meta.auction.lastBet

        return (
            <div>
                {
                    yourTurn
                    && !lastBet
                    && 'Choose station'
                }
                {
                    yourTurn
                    && lastBet
                    && (
                        <div>
                            <input ref='betRange' type='range' min={lastBet} max={user.cash} />
                            <button onClick={() => this.handleAuctionBet()}>{'Raise'}</button>
                        </div>
                    )
                }
                {
                    yourTurn
                    && user.stations.length !== 0
                    && <div>
                        'or'
                        <button onClick={() => this.handleAuctionFold}>{'Fold'}</button>
                    </div>
                }
                {
                    this.props.auction.data
                    && this.props.auction.data.map(station => {
                        return (
                            <Station
                                key={station.cost}
                                station={station}
                                onClick={() => this.handleStationSelect(station)}
                            />
                        )
                    })
                }
            </div>
        )
    }
    private handleStationSelect(station: State.IAuctionStation): void {
        if (this.props.game.meta.turn !== this.props.userInfo.data.id) {
            return
        }
        if (this.props.auction.selectedStationId === station.cost) {
            return
        }

        this.props.selectStation(station)
    }
    private handleAuctionBet(): void {
        this.props.requestAuctionBet(parseInt(this.refs.betRange.value, 10))
    }
    private handleAuctionFold(): void {
        this.props.requestAuctionFold()
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            auction: state.auction,
            game: state.game,
            userInfo: state.userInfo,
        }
    },
    {
        requestAuction,
        receiveAuction,
        requestAuctionBet,
        requestAuctionFold,
        selectStation,
    }
)(Auction)
