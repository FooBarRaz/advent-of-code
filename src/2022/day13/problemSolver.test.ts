import {ArrayOfNumbers, comparePair, parseInput} from "./problemSolver";

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
        describe('compare', function () {
            describe('given two integers', function () {
                const parsedInput = parseInput(testInput);
                const testCases:
                    {
                        id?: string,
                        left: number | ArrayOfNumbers,
                        right: number | ArrayOfNumbers,
                        expectedToBeOrdered: 1 | 0 | -1
                    }[] = [
                    {
                        id: 'ints',
                        left: 1,
                        right: 2,
                        expectedToBeOrdered: 1
                    },
                    {
                        id: 'ints',
                        left: 1,
                        right: 1,
                        expectedToBeOrdered: 0
                    },
                    {
                        left: 3,
                        right: 2,
                        expectedToBeOrdered: -1
                    },
                    {
                        left: [1],
                        right: [2],
                        expectedToBeOrdered: 1
                    },
                    {
                        left: [3],
                        right: [2],
                        expectedToBeOrdered: -1
                    },
                    {
                        id: 'pair1',
                        left: parsedInput[0][0],
                        right: parsedInput[0][1],
                        expectedToBeOrdered: 1
                    },
                    {
                        id: 'pair2',
                        left: parsedInput[1][0],
                        right: parsedInput[1][1],
                        expectedToBeOrdered: 1
                    },
                    {
                        id: 'pair3',
                        left: parsedInput[2][0],
                        right: parsedInput[2][1],
                        expectedToBeOrdered: -1
                    },
                    {
                        id: 'pair4',
                        left: parsedInput[3][0],
                        right: parsedInput[3][1],
                        expectedToBeOrdered: 1
                    },
                    {
                        id: 'pair5',
                        left: parsedInput[4][0],
                        right: parsedInput[4][1],
                        expectedToBeOrdered: -1
                    },

                ]

                testCases
                    // .filter(x => x.id === 'pair2')
                    .forEach(testCase => {
                    const {id, left, right, expectedToBeOrdered} = testCase;
                    it(`${id} should compare pair ${left}, ${right} side by side`, function () {
                        const result = comparePair(left, right)
                        expect(result).toEqual(expectedToBeOrdered)
                    });
                })
            });
        });
    });

});