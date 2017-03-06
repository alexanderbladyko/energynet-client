import * as React from 'react'
import {
    connect,
} from 'react-redux'
// // Hotfix for scrollbar module
declare function require(arg: string): any;
const ReactScrollbarModule: any = require('react-scrollbar')
const ScrollArea: any = ReactScrollbarModule.default

import {
    requestAuction,
    receiveAuction,
    requestAuctionBet,
    requestAuctionFold,
    selectStation,
} from 'actions/auction'
import * as socket from 'api/socket'
import * as State from 'state'
import Station from 'components/Station/Station'

import './Auction.scss'


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
    constructor(props: any) {
        super(props)
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
                <ScrollArea
                    horizontal={true}
                    vertical={false}
                    contentClassName='auction-stations auction-stations__4'
                >
                {
                    this.props.auction.data
                    && this.props.auction.data.map(station => {
                        return (
                            <Station
                                ref='station'
                                key={station.cost}
                                stationId={station.cost}
                                onClick={() => this.handleStationSelect(station)}
                            />
                        )
                    })
                }
                </ScrollArea>
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
