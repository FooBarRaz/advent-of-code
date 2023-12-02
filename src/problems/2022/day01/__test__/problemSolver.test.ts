import {parseInput, solveProblem1, solveProblem2} from "../problemSolver";

describe('parseInput', function () {
    it('should separate by line breaks', function () {
        const data = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

        const result = parseInput(data)

        expect(result).toHaveLength(5);
        expect(result[2].totalCalories).toEqual(11000)
    });

});

describe('problem 1', function () {
    it('should find max calories', function () {
        const result = solveProblem1();
        expect(result).toEqual(67622)
    });

});

describe('problem 2', function () {
    it('should solve', function () {
        const result = solveProblem2();
        expect(result).toEqual(67622)
    });

});