import {parseInput} from "./problemSolver";

const testInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`
describe('day 13', function () {
    describe('parseInput', function () {
        it('should parse as list of numbers or lists', function () {
            const result = parseInput(testInput)
            expect(result.length).toBe(8)

            expect(result[0][0]).toEqual([1,1,3,1,1])
            expect(result[2][1][0][1]).toEqual(7)
        });
    });
    describe('given test input', function () {
    });

});