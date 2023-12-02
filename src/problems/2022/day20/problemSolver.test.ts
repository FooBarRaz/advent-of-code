import {mix, parseInput} from "./problemSolver";
import {data} from "./data";

const generalInput = `1
2
-3
3
-2
0
4`
describe('day 20', function () {


    describe('parseInput', function () {
        it('should parse the input', function () {
            const result = parseInput(generalInput)
            expect(result).toEqual([1, 2, -3, 3, -2, 0, 4])
        });
    });

    describe('mix', function () {
        it('should mix all the numbers', function () {
            const result = mix(parseInput(generalInput))
            expect(result).toEqual([1, 2, -3, 4, 0, 3, -2])
        });
    });

});