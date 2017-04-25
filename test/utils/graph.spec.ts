/// <reference path="../../node_modules/@types/jest/index.d.ts" />

import { getClosestPath, } from 'utils/graph'
import * as State from 'state'


describe('graph utils', () => {
    describe('graph utils', () => {
        it('should find closest path for triangle', () => {
            const graph: any = {
                A: {
                    B: 2,
                    C: 4,
                },
                B: {
                    A: 2,
                    C: 3,
                },
                C: {
                    A: 4,
                    B: 3,
                },
            }
            const result: any = getClosestPath(graph, ['A'], ['C'])
            expect(result).toEqual({
                C: 4,
            })
        })

        it('should find closest path for vertex in between', () => {
            const graph: any = {
                A: {
                    B: 2,
                },
                B: {
                    A: 2,
                    C: 3,
                },
                C: {
                    B: 3,
                    D: 6,
                },
                D: {
                    C: 6,
                },
            }
            const result: any = getClosestPath(graph, ['A', 'C'], ['B', 'D'])
            expect(result).toEqual({
                B: 2,
                D: 6,
            })
        })

        it('should find closest path over one vertex', () => {
            const graph: any = {
                A: {
                    B: 2,
                    C: 4,
                },
                B: {
                    A: 2,
                    C: 3,
                },
                C: {
                    A: 4,
                    B: 3,
                    D: 5,
                },
                D: {
                    C: 5,
                }
            }
            const result: any = getClosestPath(graph, ['A'], ['D'])
            expect(result).toEqual({
                D: 9,
            })
        })

        it('should find closest path for multiple vertexes', () => {
            const graph: any = {
                A: {
                    B: 3,
                    C: 10,
                    D: 5,
                },
                B: {
                    A: 3,
                    C: 8,
                    F: 7,
                },
                C: {
                    A: 10,
                    B: 8,
                    E: 12,
                    F: 10,
                    G: 13,
                },
                D: {
                    A: 5,
                    G: 6,
                },
                E: {
                    F: 8,
                    C: 12,
                    G: 7,
                },
                F: {
                    B: 7,
                    C: 10,
                    E: 8,
                },
            }
            const result: any = getClosestPath(graph, ['A', 'D'], ['C', 'F'])
            expect(result).toEqual({
                C: 10,
                F: 10,
            })
        })
    })
})
