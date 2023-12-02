import {
    isPointOnLine,
    isHorizontal,
    isVertical,
    line,
    Line,
    point,
    parseInput,
    solveProblem,
    solveTheDamnThing, countOverlaps, isInBetween
} from "../day5";
import {data} from "../data";

describe('Day 5', function () {
    describe('horizontal lines', function () {
        it('should be false if line is not horizontal', function () {
            const result = isHorizontal(line(3, 5, 6, 2))
            expect(result).toBeFalsy()
        });
        it('should be true if line is horizontal', function () {
            const result = isHorizontal(line(3, 7, 6, 7))
            expect(result).toBeTruthy()
        });
    });
    describe('vertical lines', function () {
        it('should be false if line is not vertical', function () {
            const result = isVertical(line(3, 5, 6, 4))
            expect(result).toBeFalsy()
        });
        it('should be true if line is vertical', function () {
            const result = isVertical(line(7, 2, 7, 4))
            expect(result).toBeTruthy()
        });
    });


    describe('determining whether a point has an overlap', function () {
        let lines: Array<Line>
        beforeEach(function () {
            lines = [
                line(0, 9, 5, 9),
                line(8, 0, 0, 8),
                line(9, 4, 3, 4),
                line(2, 2, 2, 1),
                line(7, 0, 7, 4),
                line(6, 4, 2, 0),
                line(0, 9, 2, 9),
                line(3, 4, 1, 4),
                line(0, 0, 8, 8),
                line(5, 5, 8, 2)
            ]
        });

        describe('count overlaps', function () {

            it('should be 1 for 7,0', function () {
                expect(countOverlaps(point(7, 0), lines)).toEqual(1)
            });

            it('should be 2 for 3,4', function () {
                expect(countOverlaps(point(3, 4), lines)).toEqual(2)
            });

            it('should be 0 for 15,9', function () {
                expect(countOverlaps(point(15, 9), lines)).toEqual(0)
            });

            describe('diagonal lines', function () {
                /*
                An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
                An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.
                 */
                it('should be true for 1,1', function () {
                    const result = isPointOnLine(point(1, 1), line(1, 1, 3, 3))
                    expect(result).toBeTruthy()
                });

                it('should be true when point is on reverse diagonal', function () {
                    const result = isPointOnLine(point(2,4), line(1,5,5,1))
                    expect(result).toBeTruthy()
                });

                it('should be false when point is not on reverse diagonal', function () {
                    const result = isPointOnLine(point(3,4), line(1,5,5,1))
                    expect(result).toBeFalsy()
                });
            });

        });

        it('should be false when there is no overlap', function () {
            const result = isPointOnLine(point(9, 9), lines[0])
            expect(result).toBeFalsy()
        });

        it('should be true when there is overlap on horizontal line', function () {
            const result = isPointOnLine(point(3, 8), line(0, 8, 5, 8))
            expect(result).toBeTruthy()
        });

        it('should be true when there is overlap on vertical line', function () {
            const result = isPointOnLine(point(3, 5), line(3, 2, 3, 7))
            expect(result).toBeTruthy()
        });

        // it('should be true for 0,7', function () {
        //     const result = isPointOnLine(point(0,7), line(0,8, 5, 8))
        //     expect(result).toBeTruthy()
        // });
    });

    describe('parsing input', function () {
        it('should parse lines from data', function () {
            const result = parseInput(data)
            expect(result.length).toEqual(500)
            expect(result[0]).toEqual(line(609, 367, 60, 367))
        });
    });

    describe('problem 1', function () {
        let lines: Array<Line>
        beforeEach(function () {
            lines = [
                line(0, 9, 5, 9),
                line(8, 0, 0, 8),
                line(9, 4, 3, 4),
                line(2, 2, 2, 1),
                line(7, 0, 7, 4),
                line(6, 4, 2, 0),
                line(0, 9, 2, 9),
                line(3, 4, 1, 4),
                line(0, 0, 8, 8),
                line(5, 5, 8, 2)
            ]
        });


        it('should solve', function () {
            const result = solveProblem(data)
            expect(result).toEqual(6687)
        });

        it('should solve the damn thing', function () {
            let number = solveTheDamnThing(lines);
            expect(number).toEqual(5)
        });
    });

    describe('problem 2', function () {
        it('should include diagonals', function () {
            let result = solveProblem(data, true);
            expect(result).toEqual(19851)
        });

    });
});
