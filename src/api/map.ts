import { BaseApi, } from 'api/base'
import * as State from 'state'


export default class MapApi extends BaseApi<State.IMap> {
    public getUrl(config: State.IConfigState, game: State.IGameState): string {
        return `${config.data.gameApi}/map/${game.meta.map}/map`
    }
}
