import * as React from 'react'
import {
    connect,
} from 'react-redux'

import Currency from 'components/Currency/Currency'
import Resource from 'components/Resource/Resource'
import * as State from 'state'

import './Station.scss'


interface IStationOwnProps {
    stationId: number
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
                className='station'
                onClick={() => this.props.onClick && this.props.onClick(this.props.stationId)}
            >
                <div className='station_cost'>
                    <Currency value={station.cost} size={Currency.IconSize.SMALL}/>
                </div>
                {this.renderResources(station)}
                <div className='station_efficiency'>{station.efficiency}</div>
            </div>
        )
    }
    private renderResources(station: State.IMapStation): React.ReactElement<{}> {
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
