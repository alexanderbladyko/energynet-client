import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


function getGraph(junctions: State.IJunction[]): State.IMapGraph {
    const graph: any = {}
    junctions.forEach(junction => {
        graph[junction.between[0]] = {}
        graph[junction.between[1]] = {}
    })
    junctions.forEach(junction => {
        const city1: string = junction.between[0]
        const city2: string = junction.between[1]
        graph[city1][city2] = junction.cost
        graph[city2][city1] = junction.cost
    })
    return graph
}


export default {
    [actionTypes.MAP_INFO_REQUEST]: function(state: State.IMapState, action: IBaseAction): State.IMapState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.MAP_INFO_RESPONSE]: function(state: State.IMapState, action: IDataAction<State.IMap>): State.IMapState {
        return {
            ...state,
            data: {
                ...action.payload.data,
                graph: getGraph(action.payload.data.junctions),
            },
            loading: false,
        }
    },

    [actionTypes.MAP_INFO_ERROR]: function(state: State.IMapState, action: IErrorAction): State.IMapState {
        return {
            ...state,
            loading: false,
            message: action.payload.message,
        }
    },
}
