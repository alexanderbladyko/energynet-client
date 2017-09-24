import * as State from 'state'


interface IQueuedVertex {
    distance: number
    vertex: string
}

class SortedQueue {
    private _queue: IQueuedVertex[] = []

    public enqueue(vertex: IQueuedVertex): void {
        this._queue = this._queue.filter(v => v.vertex !== vertex.vertex)
        this._queue.push(vertex)
        this._queue.sort((a, b) => a.distance - b.distance)
    }

    public dequeue(): IQueuedVertex {
        return this._queue.shift()
    }

    public isEmpty(): boolean {
        return this._queue.length === 0
    }
}

export function getClosestPath(junctions: State.IMapGraph, fromCities: string[], toCities: string[]): State.IMapJunction {
    const queue: SortedQueue = new SortedQueue()
    const result: State.IMapJunction = {}
    const distances: any = {}
    for (let city in junctions) {
        if (fromCities.indexOf(city) !== -1) {
            distances[city] = 0
            queue.enqueue({ distance: 0, vertex: city, })
        } else {
            distances[city] = Infinity
        }
    }

    while (!queue.isEmpty()) {
        const { vertex, distance, }: IQueuedVertex = queue.dequeue()

        if (toCities.indexOf(vertex) !== -1) {
            result[vertex] = distance
            distances[vertex] = 0
        }

        const neighbors: any = junctions[vertex]
        for (let neighbor in neighbors) {
            if (!neighbors.hasOwnProperty(neighbor)) {
                continue
            }
            const alt: number = distances[vertex] + neighbors[neighbor]

            if (alt < distances[neighbor]) {
                distances[neighbor] = alt
                queue.enqueue({ distance: alt, vertex: neighbor, })
            }
        }
    }
    return result
}
