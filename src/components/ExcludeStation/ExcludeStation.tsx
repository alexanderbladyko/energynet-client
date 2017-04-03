import * as React from 'react'
import {
    connect,
} from 'react-redux'
// hotfix for scrollbar module
declare function require(arg: string): any;
const ReactScrollbarModule: any = require('react-scrollbar')
const ScrollArea: any = ReactScrollbarModule.default

import {
    requestGameAction,
} from 'actions/action'
import * as socket from 'api/socket'
import * as constants from 'constants'
import * as State from 'state'
import Station from 'components/Station/Station'
import { fixContainerWidth, } from 'utils/react'

import './ExcludeStation.scss'


interface IExcludeStationProps {
    game: State.IGameState
    map: State.IMapState
    userInfo: State.IUserInfoState
    requestGameAction: typeof requestGameAction
}

interface IExcludeStationState {
    selectedStation: number|void
}


class ExcludeStation extends React.Component<IExcludeStationProps, IExcludeStationState> {
    public componentWillMount(): void {
        this.setState({
            selectedStation: undefined,
        })
    }
    public componentDidMount(): void {
        fixContainerWidth('.js-exclude_station')
    }
    public componentWillUpdate(): void {
        fixContainerWidth('.js-exclude_station')
    }
    public componentDidUpdate(): void {
        fixContainerWidth('.js-exclude_station')
    }
    public render(): React.ReactElement<{}> {
        if (this.props.game.loading) {
            return (
                <div>{'Loading...'}</div>
            )
        }
        if (!this.props.game.data) {
            return null
        }

        const userId: number = this.props.userInfo.data.id
        const user: State.IGamePlayer = this.props.game.data.find(player => player.id === userId)
        return (
            <div className='exclude-station'>
                <ScrollArea
                    horizontal={true}
                    vertical={false}
                    className='exclude-station_container'
                    contentClassName={`js-exclude_station exclude-station_stations`}
                >
                {
                    user.stations.map(stationId => {
                        return (
                            <div key={stationId} className='exclude-station_station'>
                                <Station
                                    expanded={true}
                                    highlighted={stationId === this.state.selectedStation}
                                    stationId={stationId}
                                    onClick={() => this.handleStationSelect(stationId)}
                                />
                            </div>
                        )
                    })
                }
                </ScrollArea>
                <div className='exclude-station_action'>
                    <button
                        className='button exclude-station_button'
                        onClick={() => this.handleApplyClick()}
                    >{
                        'Apply'
                    }</button>
                </div>
            </div>
        )
    }
    private handleStationSelect(stationId: number): void {
        this.setState({
            selectedStation: stationId,
        })
    }
    private handleApplyClick(): void {
        if (this.state.selectedStation) {
            socket.send(constants.ActionTypes.EXCLUDE_STATION, this.state.selectedStation)
            this.props.requestGameAction(constants.ActionTypes.EXCLUDE_STATION, this.state.selectedStation)
        }
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
            map: state.map,
            userInfo: state.userInfo,
        }
    },
    {
        requestGameAction,
    }
)(ExcludeStation)
