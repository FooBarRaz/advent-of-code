import {parseInput, problem2, VisibilityGrid} from "./problemSolver";
import {data} from "./data";
import { Point } from "../../../utils/grid";

const testInput = `30373
25512
65332
33549
35390`

describe('day 08', function () {
    describe('input parser', function () {
        it('should parse input into grid', function () {
            const result = parseInput(testInput)
            expect(result.dimensions.rows).toBe(5)
            expect(result.dimensions.columns).toBe(5)
        });
    });


    describe('isVisible', function () {
        let grid: VisibilityGrid
        beforeEach(function () {
            grid = parseInput(testInput)
        });

        it('true for all cells on boundaries', function () {
            const cellsFromFirstRow = grid.rows[0].map((_, index) => new Point(0, index))
            let lastRowIndex = grid.rows.length - 1;
            const cellsFromLastRow = grid.rows[lastRowIndex]
                .map((_, index) => new Point(lastRowIndex, index));
            const cellsFromFirstColumn = grid.columns.map((_, index) => new Point(index, 0));
            const lastColumnIndex = grid.columns.length - 1;
            const cellsFromLastColumn = grid.columns[lastColumnIndex].map((_, index) => new Point(index, lastColumnIndex));

            [...cellsFromFirstRow,
                ...cellsFromLastRow,
                ...cellsFromFirstColumn,
                ...cellsFromLastColumn].forEach(eachCell => {
                expect(grid.isVisible(eachCell)).toBe(true)
            })
        });

        it('should be true when all cells to the left are smaller', function () {
            expect(grid.isVisible(new Point(3, 2))).toBeTruthy()
        });

        const testCases: Array<{ point: Point, isVisible: boolean }> = [
            {point: new Point(1, 1), isVisible: true},
            {point: new Point(1, 2), isVisible: true},
            {point: new Point(1, 3), isVisible: false}
        ]

        testCases.forEach(({point, isVisible}) => {
                it(`point ${point} should ${isVisible ? '' : 'not '}be visible`, function () {
                    expect(grid.isVisible(point)).toEqual(isVisible)
                });
            }
        );

        describe('scenic score', function () {
            it('should count the number of trees visible from each side of a cell and multiply them', function () {
                expect(grid.scenicScore(new Point(2, 1,))).toEqual(4)
                expect(grid.scenicScore(new Point(2, 3,))).toEqual(8)
            })
        });
    });

    describe('problem 1', function () {
        it('should count number of visible trees for test input', function () {
            const result = parseInput(testInput).countVisibleCells()
            expect(result).toBe(21)
        });

        it('should count number of visible trees for real input', function () {
            const result = parseInput(data).countVisibleCells()
            expect(result).toEqual(1829)
        });
    });

    describe('problem 2', function () {
        it('should calculate highest scenic score ', function () {
            const result = problem2(testInput)
            expect(result).toEqual(8)
        });

        it('should work for real data', function () {
            const result = problem2(data)
            expect(result).toEqual(291840)
        });
    });
});