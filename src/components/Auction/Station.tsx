import * as React from 'react'

import * as State from 'state'

interface IStationProps {
    station: State.IAuctionStation
    onClick: any
}


export default class Station extends React.Component<IStationProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div
                onClick={this.props.onClick}
                style={{
                    width: 200,
                    height: 300,
                    borderWidth: 1,
                    borderColor: '#123123',
                    borderStyle: 'solid',
                    borderRadius: 3,
                }}
            >
                <p>{this.props.station.cost}</p>
                <p>{this.props.station.capacity}</p>
                <p>{this.props.station.efficiency}</p>
                <p>{this.props.station.resources}</p>
            </div>
        )
    }
}
