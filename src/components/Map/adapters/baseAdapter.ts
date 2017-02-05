import * as mapboxgl from 'mapbox-gl'

import * as State from 'state'


export class BaseAdapter<T> {
    private _state: T
    private _shouldUpdate: boolean
    private _layers: string[]

    public setState(newState: State.IState) {
        const lensedState: T = this.stateLens(newState)
        if (!this._state) {
            this._state = lensedState
            this._shouldUpdate = true
            return
        }
        this._shouldUpdate = this.shouldUpdate(this._state, lensedState)
    }

    public update(map: mapboxgl.Map, features: GeoJSON.Feature<GeoJSON.GeometryObject>[]) {
        if (this._shouldUpdate) {
            this.removeAll(map)

            this.processFeatures(map, features, this._state)

            this._shouldUpdate = false
        }
    }

    protected stateLens(state: State.IState): T {
        throw new Error('Not implemented')
    }

    protected shouldUpdate(oldState: T, newState: T) {
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
    private _markers: mapboxgl.Marker[]

    protected markerProperties: IMarkerProperties

    protected removeAll(map: mapboxgl.Map): void {
        this._markers.forEach(marker => marker.remove())
    }

    protected processFeatures(map: mapboxgl.Map, features: GeoJSON.Feature<GeoJSON.GeometryObject>[], state: T): void {
        this._markers = features.map(feature => {
            const el: HTMLElement = document.createElement('DIV')
            el.className = this.markerProperties.className
            el.style.width = this.markerProperties.width
            el.style.height = this.markerProperties.height

            el.innerHTML = this.getHtml()
            const marker: mapboxgl.Marker = new mapboxgl.Marker(el, {
                offset: this.markerProperties.offset,
            })
            marker.setLngLat(feature.geometry.coordinates)
            marker.addTo(map)
            return marker
        })

    }

    protected getHtml() {
        return ''
    }
}
