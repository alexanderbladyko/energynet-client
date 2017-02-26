import {
    BaseLayerAdapter,
} from './baseAdapters'
import * as constants from 'constants'


export default class JunctionAdapter extends BaseLayerAdapter<{}> {
    protected getLayers(features: GeoJSON.Feature<GeoJSON.GeometryObject>[], state: {}): mapboxgl.Layer[] {
        return [
            {
                id: 'junctions',
                type: 'line',
                source: 'map_data',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    // 'line-color': '#888',
                    'line-width': 14,
                    'line-pattern': 'example',
                },
                filter: [ '==', 'type', constants.FeatureTypes.JUNCTION, ],
            },
        ]
    }
}
