import {
    calculateRiskLevel,
    toCell,
    findBasins,
    findLowPoints,
    getAdjacentValues,
    parseInput,
    solveProblem1, solveProblem2
} from "../day9";
import {data} from "../data";


describe('Day 9', function () {
    const testData =
`
2199943210
3987894921
9856789892
8767896789
9899965678`
    const testGrid = parseInput(testData)

    describe('parse input', function () {
        it('should parse string into array of rows', function () {
            const result = parseInput(testData)
            expect(result.rows[0][0]).toEqual(2)
            expect(result.rows[0][9]).toEqual(0)
            expect(result.rows[4][0]).toEqual(9)
            expect(result.rows[4][9]).toEqual(8)
        })
    });

    describe('getting adjacent locations', function () {
        describe('central cell', function () {
            it('should get 4 adjacent locations for central cell', function () {
                const result = getAdjacentValues(testGrid, {row: 3, column: 4})
                expect(result).toHaveLength(4)
            });

            it('should get have correct values', function () {
                const result = getAdjacentValues(testGrid, {row: 3, column: 4})
                expect(result).toEqual([7, 9, 9, 7])
            });
        });

        describe('edge cell', function () {
            it('should get 3 values', function () {
                const result = getAdjacentValues(testGrid, {row: 0, column: 3})
                expect(result).toEqual([9, 7, 9])
            });
        });
    });

    describe('finding basins', function () {
        it('should find first basin', function () {
            const basins = findBasins(testGrid)
            expect(Object.keys(basins)).toHaveLength(6)
        });

        it('should sort basins by size', function () {
            const basins = findBasins(testGrid)
            expect(basins[0]).toHaveLength(14)
        });
    });

    describe('find low points', function () {
        it('should find all low points in grid', function () {
            const result = findLowPoints(testGrid)
            expect(result).toHaveLength(4)
            expect(result).toContainEqual({
                cell: { row: 0, column: 1},
                value: 1
            })
        });

        it('should calculate risk level', function () {
            const lowPoints = findLowPoints(testGrid)
            const result: number = calculateRiskLevel(lowPoints)
            expect(result).toEqual(15)
        });
    });

    describe('solve problem 1', function () {
        it('should solve for small grid', function () {
            const expectedResult = 496
            const actualResult = solveProblem1(data)
            expect(actualResult).toEqual(expectedResult)
        });
    });

    describe('solve problem 2', function () {
        it('should solve for small grid', function () {
            const expectedResult = 1134
            const actualResult = solveProblem2(testData)
            expect(actualResult).toEqual(expectedResult)
        });

        it('should solve for large grid', function () {
            const expectedResult = 902880
            const actualResult = solveProblem2(data)
            expect(actualResult).toEqual(expectedResult)
        });
    });
});
