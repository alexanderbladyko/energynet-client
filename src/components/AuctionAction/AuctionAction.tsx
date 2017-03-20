import * as React from 'react'
import {
    connect,
} from 'react-redux'


import {
    requestAuctionBet,
    requestAuctionFold,
    selectStation,
} from 'actions/auction'
import * as socket from 'api/socket'
import * as constants from 'constants'
import * as State from 'state'
import Station from 'components/Station/Station'
import Currency from 'components/Currency/Currency'

import './AuctionAction.scss'


interface IAuctionActionProps {
    auction: State.IAuctionState
    game: State.IGameState
    userInfo: State.IUserInfoState
    requestAuctionBet: typeof requestAuctionBet
    requestAuctionFold: typeof requestAuctionFold
    selectStation: typeof selectStation
}

interface IAuctionActionState {
    bet: number
}


class AuctionAction extends React.Component<IAuctionActionProps, IAuctionActionState> {
    public refs: {
        betRange: (HTMLInputElement)
    }
    public componentWillMount(): void {
        this.setState({
            bet: 0,
        })
    }
    public componentWillReceiveProps(nextProps: IAuctionActionProps): void {
        if (nextProps.game.meta.auction) {
            this.setState({
                bet: nextProps.game.meta.auction.bet,
            })
        }
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
            <div className='action-bet'>
                <div className='action-bet_station'>
                    <Station
                        expanded={true}
                        stationId={this.props.game.meta.auction.station}
                    />
                </div>
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
            <div>
                <div className='action-bet_value'>

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

                </div>
                <div>
                    <button
                        className='button'
                        onClick={() => this.handleAuctionFold()}
                        style={{
                            visibility: user.stations.length === 0 ? 'none' : '',
                        }}
                    >{'Fold'}</button>
                    <button
                        className='button'
                        onClick={() => this.handleAuctionBet()}
                    >{'Bet'}</button>
                </div>
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
        requestAuctionBet,
        requestAuctionFold,
        selectStation,
    }
)(AuctionAction)
