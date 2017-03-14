import * as React from 'react'
import {
    connect,
} from 'react-redux'
// hotfix for scrollbar module
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
import Currency from 'components/Currency/Currency'

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

interface IAuctionState {
    bet: number
}


class Auction extends React.Component<IAuctionProps, IAuctionState> {
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
        this.setState({
            bet: 0,
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('auction')
    }
    public componentWillReceiveProps(nextProps: IAuctionProps): void {
        this.setState({
            bet: nextProps.game.meta.auction.bet,
        })
    }
    public render(): React.ReactElement<{}> {
        if (this.props.auction.loading) {
            return (
                <div>{'Loading...'}</div>
            )
        }
        if (!this.props.auction.data) {
            return null
        }
        const userId: number = this.props.userInfo.data.id
        const yourTurn: boolean = (this.props.game.meta.turn === userId)
        const lastBet: number = this.props.game.meta.auction && this.props.game.meta.auction.bet

        return (
            <div className='auction'>
                <ScrollArea
                    horizontal={true}
                    vertical={false}
                    contentClassName={`auction_stations auction_stations__${this.props.auction.data.length}`}
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
                {
                    yourTurn
                    && lastBet
                    && this.renderYourTurnAction()
                }
            </div>
        )
    }
    private renderYourTurnAction(): React.ReactElement<{}> {
        const minBet: number = this.props.game.meta.auction.bet
        const userId: number = this.props.userInfo.data.id
        const user: State.IGamePlayer = this.props.game.data.find(player => player.id === userId)
        return (
            <div className='auction_action'>
                <button
                    className='button'
                    onClick={() => this.handleAuctionFold()}
                    style={{
                        visibility: user.stations.length === 0 ? 'none' : '',
                    }}
                >{'Fold'}</button>
                <button
                    className='button'
                    onClick={() => this.handleBetChange(-1)}
                    disabled={this.state.bet === minBet}
                >{'-'}</button>
                <div className='auction_control'>
                    <input
                        className=' '
                        type='range'
                        min={minBet}
                        max={user.cash}
                        value={this.state.bet}
                        onChange={this.handleSliderChange.bind(this)}
                    />
                    <span className='auction_bet'>
                        <Currency value={this.state.bet} size={Currency.IconSize.SMALL} />
                    </span>
                </div>
                <button
                    className='button'
                    onClick={() => this.handleBetChange(1)}
                    disabled={this.state.bet === user.cash}
                >{'+'}</button>
                <button
                    className='button'
                    onClick={() => this.handleAuctionBet()}
                >{'Bet'}</button>
            </div>
        )
    }
    private handleSliderChange(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            bet: parseInt(event.currentTarget.value, 10),
        })
    }
    private handleBetChange(delta: number): void {
        const newValue: number = this.state.bet + delta
        this.setState({
            bet: newValue,
        })
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
        this.props.requestAuctionBet(this.state.bet)
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
