import * as React from 'react'
import {
    connect,
} from 'react-redux'
import * as mapboxgl from 'mapbox-gl'

import { BaseAdapter, } from 'components/Map/adapters/baseAdapters'
import CityMarkerAdapter from 'components/Map/adapters/cityMarkerAdapter'
import JunctionAdapter from 'components/Map/adapters/junctionAdapter'
import AreaAdapter from 'components/Map/adapters/areaAdapter'


import { setAccessToken, } from 'MapboxMap'
import { store, } from 'store'
import * as State from 'state'


const adapters: BaseAdapter<any>[] = [
    new CityMarkerAdapter(),
    new JunctionAdapter(),
    new AreaAdapter(),
]

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
        this.initMap()
    }
    public componentDidUpdate(prevProps: IMapProps): void {
        if (prevProps.geo.loading) {
            this.initMap()
        }
    }
    public render(): React.ReactElement<{}> {
        return (
            <div id='js-map' className='map'>
            </div>
        )
    }
    private initMap(): void {
        if (this.props.geo.data && this.props.geo.data.bbox) {
            const b: number[] = this.props.geo.data.bbox
            this.mapComponent.setMaxBounds([
                [ b[0], b[1], ],
                [ b[2], b[3], ],
            ])
            this.mapComponent.setMaxZoom(this.props.geo.data.properties.maxZoom)
            this.mapComponent.setMinZoom(this.props.geo.data.properties.minZoom)

            this.mapComponent.on('load', () => {
                this.mapComponent.addSource('map_data', {
                    type: 'geojson',
                    data: this.props.geo.data,
                })

                this.refreshAdapters()

                store.subscribe(this.refreshAdapters)
            })
        }
    }

    private refreshAdapters(): void {
        adapters.forEach(adapter => adapter.setState(store.getState()))

        adapters.forEach(adapter => adapter.update(this.mapComponent, this.props.geo.data.features))

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
