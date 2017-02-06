import {
    IMarkerProperties,
    BaseMarkerAdapter,
} from './baseAdapters'
import * as State from 'state'
import * as constants from 'constants'


interface ICityMarkerState {
    game: State.IGameState
}

export default class CityMarkerAdapter extends BaseMarkerAdapter<ICityMarkerState> {
    protected type: string = constants.FeatureTypes.CITY

    protected markerProperties: IMarkerProperties = {
        className: 'marker',
        width: '120px',
        height: '40px',
        offset: [ -60, -20, ],
    }

    protected stateLens(state: State.IState): ICityMarkerState {
        return {
            game: state.game,
        }
    }

    protected getHtml(featureProperties: State.ICityProps, state: ICityMarkerState): string {
        return `
            <div>
                <span>${featureProperties.id}</span>
                <div>${
                    featureProperties.slots.map(slot => `<div>${slot}</div>`).join('')
                }</div>
            </div>
        `
    }
}
