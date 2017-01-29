import { BaseApi, } from 'api/base'
import * as State from 'state'


export default class GeoApi extends BaseApi<State.IFeatureCollection> {
    public getUrl(config: State.IConfigState, game: State.IGameState): string {
        return `${config.data.gameApi}/map/${game.meta.map}/geo`
    }
}
