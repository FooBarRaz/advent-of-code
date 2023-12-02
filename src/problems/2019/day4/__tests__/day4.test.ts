import {parseInput, solveProblem1, solveProblem2} from "../day4";

describe('day 4', function () {
    describe('find matches', function () {
        const range = `145852-616942`

        describe('get range', function () {
            it('should return min and max', function () {
                const result = parseInput(range)
                expect(result.min).toEqual(145852)
                expect(result.max).toEqual(616942)
            });
        });

        describe('problem 1', function () {
            it('should filter out numbers that have decreasing digits', function () {
                const result = solveProblem1(range)
                expect(result).not.toContain(145863)
                expect(result).toHaveLength(1767)
            });
        });
        describe('problem 2', function () {
            it('should filter out numbers that have decreasing digits', function () {
                const result = solveProblem2(range)
                expect(result).not.toContain(156777)
                expect(result).toHaveLength(1767)
            });
        });

    });
});
