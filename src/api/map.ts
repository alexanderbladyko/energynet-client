import { BaseApi, } from 'api/base'
import * as State from 'state'


export default class MapApi extends BaseApi<State.IMap> {
    public getUrl(config: State.IConfigState, game: State.IGameState): string {
        return `${config.apiUrl}/game_api/map/${game.meta.map}/map_data`
    }
}
