import * as classNames from 'classnames'
import * as React from 'react'
import {
    connect,
} from 'react-redux'

import Currency from 'components/Currency/Currency'
import Buildings from 'components/Buildings/Buildings'
import Resource from 'components/Resource/Resource'
import * as State from 'state'

import './Station.scss'


interface IStationOwnProps {
    stationId: number
    expanded?: boolean
    onClick?: (stationId: number) => void
}

interface IStationProps {
    map: State.IMapState
}


class Station extends React.Component<IStationOwnProps & IStationProps, {}> {
    public render(): React.ReactElement<{}> {
        if (!this.props.map.data) {
            return <div/>
        }
        const station: State.IMapStation = this.props.map.data.stations.find(s => s.cost === this.props.stationId)
        if (station === undefined) {
            throw new Error(`No such station: ${this.props.stationId}`)
        }
        return (
            <div
                className={
                    classNames('station', {
                        'station__expanded': this.props.expanded,
                    })
                }
                onClick={() => this.props.onClick && this.props.onClick(this.props.stationId)}
            >
                <div className='station_cost'>
                    <Currency value={station.cost} size={Currency.IconSize.SMALL}/>
                </div>
                {this.renderStationEffects(station)}
                <div className='station_buildings'>
                    <Buildings
                        value={station.efficiency}
                        size={Buildings.IconSize.SMALL}
                    />
                </div>
            </div>
        )
    }
    private renderStationEffects(station: State.IMapStation): React.ReactElement<{}> {
        const resources: React.ReactElement<{}>[] = []
        for (let i: number = 0; i < station.capacity; i++) {
            resources.push(
                <Resource
                    key={i}
                    resources={station.resources}
                    size={Resource.IconSize.SMALL}
                />
            )
        }
        return (
            <div className='station_resources'>
                {resources}
            </div>
        )
    }
}

export default connect(
    (state: State.IState, ownProps: IStationOwnProps): any => {
        return {
            map: state.map,
            stationId: ownProps.stationId,
            onClick: ownProps.onClick,
        }
    },
    {
    }
)(Station)
