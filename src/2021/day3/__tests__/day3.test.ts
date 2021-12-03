import {splitLines} from "../../../utils/dataReader";
import {epsilonRate, gammaRate, getBitsByPosition, getMostCommonBit, solveProblem1} from "../day3";
import {data} from "../data";

describe('Day 3', function () {
    describe('getMostCommonBit', function () {
        let testData: string
        let rawDiagnostics: Array<string>
        beforeEach(function () {
            testData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

            rawDiagnostics = splitLines(testData);
        });
        describe('getBitsByPosition', function () {
            it('should return array of all bits in a given position', function () {
                let bitsByPosition = getBitsByPosition(rawDiagnostics, 4);
                expect(bitsByPosition).toEqual([0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0])
            });
        });

        describe('getMostCommonBit', function () {
            it('should get most common bit from array', function () {
                let bitsByPosition = getBitsByPosition(rawDiagnostics, 0);
                let mostCommonBit = getMostCommonBit(bitsByPosition)
                expect(mostCommonBit).toEqual(1)
            });

        });

        describe('gamma rate', function () {
            it('should combine the most common digit in each position', function () {
                expect(gammaRate(rawDiagnostics)).toEqual(22)
            });

        });

        describe('epsilon rate', function () {
            it('should combine the least common digit in each position', function () {
                expect(epsilonRate(rawDiagnostics)).toEqual(9)
            });
        });
    });

    describe('problem 1', function () {
        it('should generate diagnostic report and multiply numbers together', function () {
            const result  = solveProblem1(data)
            expect(result).toEqual(3912944)
        });

    });
});
