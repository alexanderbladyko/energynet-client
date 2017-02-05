import * as React from 'react'
import {
    connect,
} from 'react-redux'
import * as mapboxgl from 'mapbox-gl'

import { setAccessToken, } from 'MapboxMap'
import * as State from 'state'
import * as constants from 'constants'

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

                this.props.geo.data.features.forEach(feature => {
                    if (feature.properties.type === constants.FeatureTypes.CITY) {
                        const el: HTMLElement = document.createElement('DIV')
                        el.className = 'marker'
                        el.style.width = '120px'
                        el.style.height = '40px'

                        el.innerHTML = `<span> \
                            ${feature.properties.id} \
                        </span>`
                        const marker: mapboxgl.Marker = new mapboxgl.Marker(el, { offset: [ -60, -20, ], })
                        marker.setLngLat(feature.geometry.coordinates)
                        marker.addTo(this.mapComponent)
                    }

                    if (feature.properties.type === constants.FeatureTypes.AREA) {
                        this.mapComponent.addLayer({
                            id: feature.properties.id,
                            type: 'fill',
                            source: 'map_data',
                            filter: [ '==', 'id', feature.properties.id, ],
                            layout: {},
                            paint: {
                                'fill-color': feature.properties.color,
                                'fill-opacity': 0.5,
                            },
                        })
                    }
                })

                this.mapComponent.addLayer({
                    id: 'junctions',
                    type: 'line',
                    source: 'map_data',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#888',
                        'line-width': 3,
                    },
                    filter: [ '==', 'type', constants.FeatureTypes.JUNCTION, ],
                })
            })

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
