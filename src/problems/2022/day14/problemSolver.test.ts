import {Line, parseInput, problem1, problem2, toGrid} from "./problemSolver";
import {data} from "./data";
import { Point } from "../../../utils/grid";

const testInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`
describe('day 14', function () {
    describe('Line', function () {
        describe('given a flat horizontal line', function () {
            const line = new Line(new Point(0, 4), new Point(0, 1))
            it('should return all points on that line', function () {
                const actual = line.allPointsOnFlatLine();
                expect(actual).toEqual(
                    [
                        new Point(0, 1),
                        new Point(0, 2),
                        new Point(0, 3),
                        new Point(0, 4),
                    ]
                )

            });
        });
        describe('given a straight vertical line', function () {
            const line = new Line(new Point(1, 6), new Point(4, 6))
            it('should return all points on that line', function () {
                const actual = line.allPointsOnFlatLine();
                expect(actual).toEqual(
                    [
                        new Point(1, 6),
                        new Point(2, 6),
                        new Point(3, 6),
                        new Point(4, 6),
                    ]
                )
            });
        });

    });
    describe('given test input', function () {
        describe('parseInput', function () {
            it('should parse out lines', function () {
                const result = parseInput(testInput)
                expect(result[0][1]).toEqual(new Line(new Point(498, 6), new Point(496, 6)))
            });
        });

        describe('placeLinesOnGrid', function () {
            const parsed = parseInput(testInput)
            const grid = toGrid(parsed)

            it('should place lines', function () {
                expect(grid.getPointValue(new Point(498, 5))).toEqual('#')
            });


            it('should print', function () {
                expect(grid.print(' ')).toMatchSnapshot()
            });
        });

        describe('problem 1', function () {
            it('should solve', function () {
                const result = problem1(testInput)
                expect(result).toEqual(24)
            });

            describe('given large dataset', function () {
                it('should solve', function () {
                    const result = problem1(data)
                    expect(result).toEqual(638)
                });
            });
        });

        describe('problem 2', function () {
            it('should solve', function () {
                const result = problem2(testInput)
                expect(result).toEqual(93)
            });

            describe('given large dataset', function () {
                it('should solve', function () {
                    const result = problem2(testInput)
                    expect(result).toEqual(93)
                });

                it('should solve for large dataset', function () {
                    const result = problem2(data)
                    expect(result).toEqual(31722)
                });
            });
        });
    });

});