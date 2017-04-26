import * as React from 'react'
import {
    connect,
} from 'react-redux'
// hotfix for scrollbar module
declare function require(arg: string): any;
const ReactScrollbarModule: any = require('react-scrollbar')
const ScrollArea: any = ReactScrollbarModule.default

import * as State from 'state'
import Station from 'components/Station/Station'
import { fixContainerWidth, } from 'utils/react'

import './Auction.scss'


interface IAuctionProps {
    auction: State.IAuctionState
    game: State.IGameState
    userInfo: State.IUserInfoState
}

interface IAuctionState {
    bet: number
}


class Auction extends React.Component<IAuctionProps, IAuctionState> {
    public componentDidMount(): void {
        fixContainerWidth('.js-auction')
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

        return (
            <ScrollArea
                horizontal={true}
                vertical={false}
                contentClassName={`js-auction auction`}
            >
            {
                this.props.auction.data
                && this.props.auction.data.map(station => {
                    return (
                        <div key={station.cost} className='auction_station'>
                            <Station
                                expanded={true}
                                stationId={station.cost}
                            />
                        </div>
                    )
                })
            }
            </ScrollArea>
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
    }
)(Auction)
