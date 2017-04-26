import * as React from 'react'

import {
    IMarkerProperties,
    BaseMarkerAdapter,
} from './baseAdapters'
import {
    addCity,
    removeCity,
} from 'actions/citiesBuy'
import * as State from 'state'
import * as constants from 'constants'


interface ICityMarkerState {
    citiesBuy: State.ICitiesBuyState
    game: State.IGameState
}

interface ICityMarkerActions {
    addCity: typeof addCity
    removeCity: typeof removeCity
}

export default class CityMarkerAdapter extends BaseMarkerAdapter<ICityMarkerState, ICityMarkerActions> {
    protected type: string = constants.FeatureTypes.CITY

    protected addClickHandler: boolean = true

    protected actions: any = {
        addCity,
        removeCity,
    }

    protected markerProperties: IMarkerProperties = {
        className: 'marker',
        width: '120px',
        height: '40px',
        offset: [ -60, -20, ],
    }

    protected stateLens(state: State.IState): ICityMarkerState {
        return {
            citiesBuy: state.citiesBuy,
            game: state.game,
        }
    }

    protected renderMarker(featureProperties: State.ICityProps, state: ICityMarkerState): React.ReactElement<{}> {
        return (
            <div className='map_city' key={featureProperties.id}>
                <span className='map_title'>{featureProperties.id}</span>
                <div className='map_slots'>{
                    featureProperties.slots.map(slot => <div key={slot} className='map_slot'>{slot}</div>)
                }</div>
            </div>
        )
    }

    protected clickHandler(featureProperties: State.ICityProps , event: Event): void {
        const city: string = featureProperties.id
        if (this.state.citiesBuy.cities.indexOf(city) === -1) {
            this.dispatch.addCity(city)
        } else {
            this.dispatch.removeCity(city)
        }
    }
}
