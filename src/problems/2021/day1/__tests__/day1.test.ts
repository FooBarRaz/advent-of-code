import {countIncreases, solveProblem1, solveProblem2, threeples} from "../day1";
import {data} from "../data";

describe('day1', function () {

    describe('countIncreases', function () {
        it('should return count of elements that are more than the previous', function () {
            const measurements = [1, 2, 3, 4, 4, 3, 6];

            expect(countIncreases(measurements)).toEqual(4);
        });
    });

    describe('extract threeples', function () {

        it('should group input by 3s', function () {
            const measurements = [1, 2, 3, 4, 5, 6, 7];
            expect(threeples(measurements)).toEqual([
                [1, 2, 3],
                [2, 3, 4],
                [3, 4, 5],
                [4, 5, 6],
                [5, 6, 7]
            ])
        });
    });


    describe('problem 1', function () {
        it('should count number of increases in dataset', function () {
            expect(solveProblem1(data)).toEqual(1195);
        });
    });

    describe('problem 2', function () {
        it('should count number of increases across threeples', function () {
            expect(solveProblem2(data)).toEqual(1235);
        });

    });
});
