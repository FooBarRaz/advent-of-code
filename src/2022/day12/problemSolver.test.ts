import {parseInput, problem1, problem2} from "./problemSolver";
import {data} from "./data";

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

            it('should work for large input', function () {
                const result = problem1(data)
                expect(result).toEqual(0)
            });
        });
    });

    describe('problem2', function () {

        it('should find shortest path from any point at elevation 0', function () {
            const result = problem2(testInput)
            expect(result).toEqual(29)
        });

        it('should work for large input', function () {
            const result = problem2(data)
            expect(result).toEqual(354)
        });
    });

});