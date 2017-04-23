import * as mapboxgl from 'mapbox-gl'
import * as ReactDOM from 'react-dom'
import {
    Dispatch,
    bindActionCreators,
} from 'redux'

import * as State from 'state'


export abstract class BaseAdapter<T, TActions> {
    protected actions: any
    protected state: T
    protected dispatch: TActions

    private _shouldUpdate: boolean

    public bindActions(dispatch: Dispatch<State.IState>): void {
        const dispatchObject: any = {}
        for (let key in this.actions) {
            if (this.actions.hasOwnProperty(key)) {
                dispatchObject[key] = bindActionCreators(this.actions[key], dispatch)
            }
        }
        this.dispatch = dispatchObject
    }

    public setState(newState: State.IState): void {
        const lensedState: T = this.stateLens(newState)
        if (!this.state) {
            this._shouldUpdate = true
            this.state = lensedState
            return
        }
        this._shouldUpdate = this.shouldUpdate(this.state, lensedState)
        this.state = lensedState
    }

    public update(map: mapboxgl.Map, features: GeoJSON.Feature<GeoJSON.GeometryObject>[]): void {
        if (this._shouldUpdate) {
            this.removeAll(map)


            this.processFeatures(map, features, this.state)

            this._shouldUpdate = false
        }
    }

    protected stateLens(state: State.IState): T {
        return undefined
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


export class BaseMarkerAdapter<T, TActions> extends BaseAdapter<T, TActions> {
    protected markerProperties: IMarkerProperties
    protected type: string
    protected addClickHandler: boolean = false

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

                if (this.addClickHandler) {
                    el.addEventListener('click', this.clickHandler.bind(this, feature.properties))
                }
                ReactDOM.render(this.renderMarker(feature.properties, state), el)
                const marker: mapboxgl.Marker = new mapboxgl.Marker(el, {
                    offset: this.markerProperties.offset,
                })
                marker.setLngLat(feature.geometry.coordinates)
                marker.addTo(map)
                return marker
            })
    }

    protected renderMarker(featureProperties: any, state: T): React.ReactElement<any> {
        return null
    }

    protected clickHandler(featureProperties: any, event: Event): void {
        return
    }
}


export class BaseLayerAdapter<T, TActions> extends BaseAdapter<T, TActions> {
    protected markerProperties: IMarkerProperties

    private _layers: string[] = []

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
