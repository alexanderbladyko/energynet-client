import * as React from 'react'
import {
    connect,
} from 'react-redux'
import * as mapboxgl from 'mapbox-gl'

import { BaseAdapter, } from './adapters/baseAdapters'
import CityMarkerAdapter from './adapters/cityMarkerAdapter'
import JunctionAdapter from './adapters/junctionAdapter'
import AreaAdapter from './adapters/areaAdapter'


import { setAccessToken, } from 'MapboxMap'
import { store, } from 'store'
import * as State from 'state'


const adapters: BaseAdapter<any, any>[] = [
    new CityMarkerAdapter(),
    new AreaAdapter(),
    new JunctionAdapter(),
]

interface IMapProps {
    game: State.IGameState
    geo: State.IMapGeoState
    handleMapDragEnd: Function,
    handleMapDragStart: Function,
}

class Map extends React.Component<IMapProps, {}> {
    private mapComponent: mapboxgl.Map
    public componentDidMount(): void {
        setAccessToken()
        this.mapComponent = new mapboxgl.Map({
            container: 'js-map',
            style: 'mapbox://styles/sanechekz/ciz4hu5gc00982rmergetmqt5',
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

                adapters.forEach(adapter => adapter.bindActions(store.dispatch))
                this.refreshAdapters()

                store.subscribe(this.refreshAdapters.bind(this))
            })
            this.mapComponent.on('dragstart', this.props.handleMapDragStart.bind(this))
            this.mapComponent.on('dragend', this.props.handleMapDragEnd.bind(this))
        }
    }

    private refreshAdapters(): void {
        adapters.forEach(adapter => adapter.setState(store.getState()))
        adapters.forEach(adapter => adapter.update(this.mapComponent, this.props.geo.data.features))

    }
}

export default connect<any, any, {
    handleMapDragStart: Function,
    handleMapDragEnd: Function,
}>(
    (state: State.IState): any => {
        return {
            game: state.game,
            geo: state.geo,
        }
    },
    {
    }
)(Map)
