import {countDots, foldLeft, foldUp, solveProblem2, toGrid, toPoints} from "../day13";
import {data} from "../data";
import { Point } from "../../../../utils/grid";

describe('Day 13', function () {
    const testData = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0`
    it('should parse input', function () {
        const result = toPoints(testData)
        expect(result).toHaveLength(18)
        expect(result).toContainEqual(new Point(6,12))
        expect(result).toContainEqual(new Point(3,4))
        expect(result).toContainEqual(new Point(8,4))
    });

    describe('toGrid', function () {
        it('should create grid from coordinates', function () {
            const result = toGrid(toPoints(testData))
            result.print('  ')
            expect(result.rows).toHaveLength(15)
            expect(result.columns).toHaveLength(11)
        });

    });

    describe('folding', function () {
        it('should fold up', function () {
            const grid = toGrid(toPoints(testData))
            const result = foldUp(grid, 7)
            result.print(' ')
            const numberOfDots = countDots(result)
            expect(numberOfDots).toEqual(17)
        });

        it('should fold left', function () {
            const grid = toGrid(toPoints(testData))
            const foldUpResult = foldUp(grid, 7)
            const foldLeftResult = foldLeft(foldUpResult, 5)
            foldLeftResult.print(' ')
            const numberOfDots = countDots(foldLeftResult)
            expect(numberOfDots).toEqual(16)
        });

    });


    describe('problem 1', function () {
        it('should solve for large dataset', function () {
            const grid = toGrid(toPoints(data))
            const result = foldLeft(grid, 655)
            result.print(' ')
            const numberOfDots = countDots(result)
            expect(numberOfDots).toEqual(17)
        });
    });

    describe('problem 2', function () {
        it('should perform folds and print result', function () {
            const grid = solveProblem2(data)
            grid.print('  ')
            const numberOfDots = countDots(grid)
            expect(numberOfDots).toEqual(97)
        });

    });
});

