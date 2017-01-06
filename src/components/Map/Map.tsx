import * as React from 'react'
import {
    connect,
} from 'react-redux'
import * as mapboxgl from 'mapbox-gl'

import { setAccessToken, } from 'MapboxMap'
import * as State from 'state'

interface IMapProps {
    game: State.IGameState
}


class Map extends React.Component<IMapProps, {}> {
    public componentDidMount(): void {
        setAccessToken()
        new mapboxgl.Map({
            container: 'js-map',
            style: 'mapbox://styles/mapbox/streets-v9',
        })
    }
    public render(): React.ReactElement<{}> {
        return (
            <div id='js-map' className='map'>
            </div>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
        }
    },
    {
    }
)(Map)
