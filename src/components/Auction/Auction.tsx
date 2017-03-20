import * as React from 'react'
import {
    connect,
} from 'react-redux'
// hotfix for scrollbar module
declare function require(arg: string): any;
const ReactScrollbarModule: any = require('react-scrollbar')
const ScrollArea: any = ReactScrollbarModule.default

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

import './Auction.scss'


interface IAuctionProps {
    auction: State.IAuctionState
    game: State.IGameState
    userInfo: State.IUserInfoState
    requestAuctionBet: typeof requestAuctionBet
    requestAuctionFold: typeof requestAuctionFold
    selectStation: typeof selectStation
}

interface IAuctionState {
    bet: number
}


class Auction extends React.Component<IAuctionProps, IAuctionState> {
    public render(): React.ReactElement<{}> {
        if (this.props.auction.loading) {
            return (
                <div>{'Loading...'}</div>
            )
        }
        if (!this.props.auction.data) {
            return null
        }
        const isAuctionStep: boolean = (this.props.game.meta.step === constants.StepTypes.AUCTION)

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
                                key={station.cost}
                                expanded={true}
                                stationId={station.cost}
                            />
                        )
                    })
                }
                </ScrollArea>
            </div>
        )
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
)(Auction)
