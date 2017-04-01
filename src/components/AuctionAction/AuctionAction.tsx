import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestGameAction,
} from 'actions/action'
import * as constants from 'constants'
import * as State from 'state'
import Station from 'components/Station/Station'
import Currency from 'components/Currency/Currency'

import './AuctionAction.scss'


interface IAuctionActionProps {
    auction: State.IAuctionState
    game: State.IGameState
    userInfo: State.IUserInfoState
    requestGameAction: typeof requestGameAction
}

interface IAuctionActionState {
    bet: number
}


class AuctionAction extends React.Component<IAuctionActionProps, IAuctionActionState> {
    public refs: {
        betRange: (HTMLInputElement)
    }
    public componentWillMount(): void {
        if (this.props.game.meta.auction) {
            this.setState({
                bet: this.props.game.meta.auction.bet,
            })
        }
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
                {
                    !yourTurn
                    && lastBet
                    && this.renderWaitForAction()
                }
            </div>
        )
    }
    private renderYourTurnAction(): React.ReactElement<{}> {
        const minBet: number = this.props.game.meta.auction.bet
        const userId: number = this.props.userInfo.data.id
        const user: State.IGamePlayer = this.props.game.data.find(player => player.id === userId)
        return (
            <div className='action-bet_action'>
                <div className='action-bet_value'>
                    <div className='action-bet_value-button'>
                        <button
                            className='button'
                            onClick={() => this.handleBetChange(-1)}
                            disabled={this.state.bet === minBet}
                        >{'-'}</button>
                    </div>
                    <div className='action-bet_control'>
                        <input
                            className=' '
                            type='range'
                            min={minBet}
                            max={user.cash}
                            value={this.state.bet}
                            onChange={this.handleSliderChange.bind(this)}
                        />
                        <span className='action-bet_bet'>
                            <Currency value={this.state.bet} size={Currency.IconSize.SMALL} />
                        </span>
                    </div>
                    <div className='action-bet_value-button'>
                        <button
                            className='button'
                            onClick={() => this.handleBetChange(1)}
                            disabled={this.state.bet === user.cash}
                        >{'+'}</button>
                    </div>
                </div>
                <div className='action-bet_action-button'>
                    <button
                        className='button'
                        onClick={() => this.handleAuctionFold()}
                        style={{
                            visibility: user.stations.length === 0 ? 'none' : '',
                        }}
                    >{'Fold'}</button>
                </div>
                <div className='action-bet_action-button action-bet_action-button__right'>
                    <button
                        className='button'
                        onClick={() => this.handleAuctionBet()}
                    >{'Bet'}</button>
                </div>
            </div>
        )
    }
    private renderWaitForAction(): React.ReactElement<{}> {
        const bet: number = this.props.game.meta.auction.bet
        const userId: number = this.props.userInfo.data.id
        const user: State.IGamePlayer = this.props.game.data.find(player => player.id === userId)
        return (
            <div className='action-bet_action'>
                <span className='action-bet_value'>
                    {'Current bet: '}
                    <Currency value={bet} size={Currency.IconSize.SMALL} />
                </span>
                <span className='action-bet_user'>
                    {'Waiting for '}
                    <span style={{color: user.color,}}>{user.id}</span>
                    {' to bet'}
                </span>
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
    private handleAuctionBet(): void {
        this.props.requestGameAction(constants.ActionTypes.AUCTION_BET, this.state.bet)
    }
    private handleAuctionFold(): void {
        this.props.requestGameAction(constants.ActionTypes.AUCTION_FOLD, undefined)
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
        requestGameAction,
    }
)(AuctionAction)
