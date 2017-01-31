import * as React from 'react'
import {
    connect,
} from 'react-redux'
import * as mapboxgl from 'mapbox-gl'

import { setAccessToken, } from 'MapboxMap'
import * as State from 'state'

interface IMapProps {
    game: State.IGameState
    geo: State.IMapGeoState
}


class Map extends React.Component<IMapProps, {}> {
    private mapComponent: mapboxgl.Map
    public componentDidMount(): void {
        setAccessToken()
        this.mapComponent = new mapboxgl.Map({
            container: 'js-map',
            style: 'mapbox://styles/mapbox/streets-v9',
        })
        this.setMapBoundsAndZoom()
    }
    public componentDidUpdate(prevProps: IMapProps): void {
        if (prevProps.geo.loading) {
            this.setMapBoundsAndZoom()
        }
    }
    public render(): React.ReactElement<{}> {
        return (
            <div id='js-map' className='map'>
            </div>
        )
    }
    private setMapBoundsAndZoom(): void {
        if (this.props.geo.data && this.props.geo.data.bbox) {
            this.mapComponent.setMaxBounds(this.props.geo.data.bbox)
        }
        if (this.props.geo.data && this.props.geo.data.properties) {
            this.mapComponent.setMaxZoom(this.props.geo.data.properties.maxZoom)
            this.mapComponent.setMinZoom(this.props.geo.data.properties.minZoom)
        }
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
            geo: state.geo,
        }
    },
    {
    }
)(Map)
