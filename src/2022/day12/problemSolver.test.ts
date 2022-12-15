import {parseInput, problem1} from "./problemSolver";

const testInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

describe('day 12', function () {

    describe('problem 1', function () {
        describe('parseInput', function () {
            it('should parse to grid', function () {
                const result = parseInput(testInput)
                expect(result.rows).toHaveLength(5)
            });
        });
        describe('given test input', function () {
            it('should calculate most efficient route', function () {
                const result = problem1(testInput)
                expect(result).toEqual(31)
            });
        });

    });

});