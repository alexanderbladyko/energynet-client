import {
    BaseLayerAdapter,
} from './baseAdapters'
import * as constants from 'constants'


export default class AreaAdapter extends BaseLayerAdapter<{}, {}> {
    protected getLayers(features: GeoJSON.Feature<GeoJSON.GeometryObject>[], state: {}): mapboxgl.Layer[] {
        return features
            .filter(feature => feature.properties.type === constants.FeatureTypes.AREA)
            .map(feature => {
                return {
                    id: feature.properties.id,
                    type: 'fill',
                    source: 'map_data',
                    filter: [ '==', 'id', feature.properties.id, ],
                    layout: {},
                    paint: {
                        'fill-color': feature.properties.color,
                        'fill-opacity': 0.5,
                    },
                }
            })
    }
}
