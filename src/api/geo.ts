import { BaseApi, } from 'api/base'
import * as State from 'state'


export default class GeoApi extends BaseApi<State.IFeatureCollection> {
    public getUrl(config: State.IConfigState, game: State.IGameState): string {
        return `${config.apiUrl}/map/${game.meta.map}/geo`
    }
}
