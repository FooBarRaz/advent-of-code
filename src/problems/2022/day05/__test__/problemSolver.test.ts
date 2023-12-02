import {parseInput, performOperation9000, problem1, problem2} from "../problemSolver";
import {data} from "../data";

const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`


describe('day 05', function () {

    describe('parseInput', function () {
        it('should separate box stack state from instructions', function () {
            const result = parseInput(testInput)

            expect(result).toHaveProperty('initialState')
            expect(result).toHaveProperty('operations')
        });

        it('should parse initial state', function () {
            const result = parseInput(testInput)

            const initialState = result.initialState

            expect(initialState['1']).toEqual(['Z', 'N'])
            expect(initialState['2']).toEqual(['M', 'C', 'D'])
            expect(initialState['3']).toEqual(['P'])
        });

        it('should parse instructions', function () {
            const result = parseInput(testInput)

            const operations = result.operations

            expect(operations[0]).toEqual({quantity: 1, from: '2', to: '1'})
            expect(operations[1]).toEqual({quantity: 3, from: '1', to: '3'})
        });
    });

    describe('perform operation', function () {
        it('should move boxes', function () {
            const {initialState, operations} = parseInput(testInput)
            const [firstOperation] = operations
            expect(performOperation9000(initialState, firstOperation)).toEqual({
                '1': ['Z', 'N', 'D'],
                '2': ['M', 'C'],
                '3': ['P'],
            })
        });
    });

    describe('problem 1', function () {
        describe('test input', function () {
            it('should determine the top boxes from each stack', function () {
                const result = problem1(testInput)
                expect(result).toEqual('CMZ')
            });
        });

        describe('real input', function () {
            it('should determine the top boxes from each stack', function () {
                const result = problem1(data)
                expect(result).toEqual('SHQWSRBDL')
            });
        })
    });

    describe('problem 2', function () {
        describe('test input', function () {
            it('should determine the top boxes from each stack', function () {
                const result = problem2(testInput)
                expect(result).toEqual('MCD')
            });
        });

        describe('real input', function () {
            it('should determine the top boxes from each stack', function () {
                const result = problem2(data)
                expect(result).toEqual('CDTQZHBRS')
            });
        })
    });
});
