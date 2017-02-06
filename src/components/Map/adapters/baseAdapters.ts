import * as mapboxgl from 'mapbox-gl'

import * as State from 'state'


export class BaseAdapter<T> {
    private _state: T
    private _shouldUpdate: boolean

    public setState(newState: State.IState): void {
        const lensedState: T = this.stateLens(newState)
        if (!this._state) {
            this._state = lensedState
            this._shouldUpdate = true
            return
        }
        this._shouldUpdate = this.shouldUpdate(this._state, lensedState)
    }

    public update(map: mapboxgl.Map, features: GeoJSON.Feature<GeoJSON.GeometryObject>[]): void {
        if (this._shouldUpdate) {
            this.removeAll(map)

            this.processFeatures(map, features, this._state)

            this._shouldUpdate = false
        }
    }

    protected stateLens(state: State.IState): T {
        throw new Error('Not implemented')
    }

    protected shouldUpdate(oldState: T, newState: T): boolean {
        for (let key in oldState) {
            if (oldState.hasOwnProperty(key) && oldState[key] !== newState[key]) {
                return true
            }
        }
        return false
    }

    protected removeAll(map: mapboxgl.Map): void {
        throw new Error('Not implemented')
    }

    protected processFeatures(map: mapboxgl.Map, features: GeoJSON.Feature<GeoJSON.GeometryObject>[], state: T): void {
        throw new Error('Not implemented')
    }
}


export interface IMarkerProperties {
    className: string
    width: string
    height: string
    offset: number[]
}


export class BaseMarkerAdapter<T> extends BaseAdapter<T> {
    protected markerProperties: IMarkerProperties
    protected type: string

    private _markers: mapboxgl.Marker[] = []

    protected removeAll(map: mapboxgl.Map): void {
        this._markers.forEach(marker => marker.remove())
    }

    protected processFeatures(map: mapboxgl.Map, features: GeoJSON.Feature<GeoJSON.GeometryObject>[], state: T): void {
        this._markers = features
            .filter(feature => feature.geometry.type === 'Point')
            .filter(feature => feature.properties.type === this.type)
            .map(feature => {
                const el: HTMLElement = document.createElement('DIV')
                el.className = this.markerProperties.className
                el.style.width = this.markerProperties.width
                el.style.height = this.markerProperties.height

                el.innerHTML = this.getHtml(feature.properties, state)
                const marker: mapboxgl.Marker = new mapboxgl.Marker(el, {
                    offset: this.markerProperties.offset,
                })
                marker.setLngLat(feature.geometry.coordinates)
                marker.addTo(map)
                return marker
            })
    }

    protected getHtml(featureProperties: any, state: T): string {
        return ''
    }
}


export class BaseLayerAdapter<T> extends BaseAdapter<T> {
    protected markerProperties: IMarkerProperties

    private _layers: string[]

    protected removeAll(map: mapboxgl.Map): void {
        this._layers.forEach(layer => map.removeLayer(layer))
    }

    protected processFeatures(map: mapboxgl.Map, features: GeoJSON.Feature<GeoJSON.GeometryObject>[], state: T): void {
        const layers: mapboxgl.Layer[] = this.getLayers(features, state)
        layers.forEach(layer => map.addLayer(layer))
        this._layers = layers.map(layer => layer.id)
    }

    protected getLayers(features: GeoJSON.Feature<GeoJSON.GeometryObject>[], state: T): mapboxgl.Layer[] {
        return []
    }
}
