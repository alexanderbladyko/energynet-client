import * as State from 'state'


export class Game {
    public static getCitySlots(game: State.IGameState, city: State.ICity): number[] {
        const slots: number[] = [ ...city.slots, ]
        game.data.forEach(user => {
            const userSlot: number = user.cities[city.name]
            if (userSlot) {
                slots.splice(slots.indexOf(userSlot), 1)
            }
        })
        return slots
    }
}


export class Map {
    public static getCity(map: State.IMapState, cityName: string): State.ICity {
        return map.data.cities.find(city => city.name === cityName)
    }
}
