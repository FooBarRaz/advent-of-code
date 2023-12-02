import {Grid} from "../../../utils/grid";
import {doStep, Octopus, OctopusGrid, parseInput, solveProblem1, solveProblem2} from "../day11";
import {splitLines} from "../../../utils/dataReader";
import {fillArray} from "../../../utils/listOps";
import {data} from "../data";

describe('Day 11', function () {
    const testData = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

    describe('parse input', function () {
        it('should convert input into a grid of octopi', function () {
            const result = parseInput(testData)
            expect(result.dimensions).toEqual({
                rows: 10,
                columns: 10
            })

            expect(result.rows[0][0].energyLevel).toEqual(5)
            expect(result.rows[9][9].energyLevel).toEqual(6)
        });
    });

    describe('given a grid of octopi', function () {
        let octopusGrid: OctopusGrid;
        beforeEach(function () {
            const smallGrid = `11111
19991
19191
19991
11111`
            octopusGrid = parseInput(smallGrid)
        });

        describe('each step', function () {

            it('should bump up all the octopi as required', function () {
                doStep(octopusGrid)
                expect(octopusGrid.rows[0][0].energyLevel).toEqual(3)
                expect(octopusGrid.rows[1][0].energyLevel).toEqual(4)
                expect(octopusGrid.rows[1][1].energyLevel).toEqual(0)
                octopusGrid.print()
            });

            describe('multiple steps', function () {
                it('should do it correctly', function () {
                    doStep(octopusGrid)
                    doStep(octopusGrid)
                    expect(octopusGrid.rows[0][0].energyLevel).toEqual(4)
                    expect(octopusGrid.rows[1][0].energyLevel).toEqual(5)
                    expect(octopusGrid.rows[1][1].energyLevel).toEqual(1)
                });

            });

        });
    });

    describe('solve problem 1', function () {

        describe('test data', function () {
            it('should count flashes for test data', function () {
                const expectedResult = 1656
                const result = solveProblem1(testData)
                expect(result).toEqual(expectedResult)
            });

            it('should count flashes for real data', function () {
                const expectedResult = 1656
                const result = solveProblem1(data)
                expect(result).toEqual(expectedResult)
            });

        });
    });

    describe('solve problem 2', function () {
        describe('find step when all octopi flash', function () {
            it('should work for test data', function () {
                const expectedResult = 195
                const result = solveProblem2(testData)
                expect(result).toEqual(expectedResult)
            });

            it('should work for real data', function () {
                const expectedResult = 502
                const result = solveProblem2(data)
                expect(result).toEqual(expectedResult)
            });

        });
    });
});
