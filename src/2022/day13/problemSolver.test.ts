import {
    ArrayOfNumbers,
    comparePair,
    isInOrder,
    NumberOrNumberArray,
    parseInput,
    problem1,
    problem2
} from "./problemSolver";
import {data} from "./data";

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

            expect(result[0][0]).toEqual([1, 1, 3, 1, 1])
            expect(result[2][1][0][1]).toEqual(7)
        });
    });
    describe('given test input', function () {
        describe('compare', function () {
            describe('given two integers', function () {
                const testCases:
                    {
                        id?: string,
                        left: NumberOrNumberArray,
                        right: NumberOrNumberArray,
                        expectedToBeOrdered?: boolean
                    }[] = [
                    {
                        id: 'ints',
                        left: 1,
                        right: 2,
                        expectedToBeOrdered: true
                    },
                    {
                        id: 'ints',
                        left: 1,
                        right: 1,
                        expectedToBeOrdered: undefined
                    },
                    {
                        left: 3,
                        right: 2,
                        expectedToBeOrdered: false
                    },
                    {
                        id: 'array-of-ints',
                        left: [1],
                        right: [2],
                        expectedToBeOrdered: true
                    },
                    {
                        id: 'single-element-unordered',
                        left: [3],
                        right: [2],
                        expectedToBeOrdered: false
                    },
                    {
                        id: 'pair1',
                        left: [1, 1, 3, 1, 1],
                        right: [1, 1, 5, 1, 1],
                        expectedToBeOrdered: true
                    },
                    {
                        id: 'pair2',
                        // [[1],[2,3,4]] vs [[1],4]
                        left: [[1], [2, 3, 4]],
                        right: [[1], 4],
                        expectedToBeOrdered: true
                    },
                    {
                        id: 'pair3',
                        // [9] vs [[8,7,6]]
                        left: [9],
                        right: [[8, 7, 6]],
                        expectedToBeOrdered: false
                    },
                    {
                        id: 'pair4',
                        //  [[4,4],4,4] vs [[4,4],4,4,4]
                        left: [[4, 4], 4, 4],
                        right: [[4, 4], 4, 4, 4],
                        expectedToBeOrdered: true
                    },
                    {
                        id: 'pair5',
                        // [7,7,7,7] vs [7,7,7]
                        left: [7, 7, 7, 7],
                        right: [7, 7, 7],
                        expectedToBeOrdered: false
                    },
                    {
                        id: 'pair6',
                        left: [],
                        right: [3],
                        expectedToBeOrdered: true
                    },
                    {
                        id: 'pair7',
                        left: [[[]]],
                        right: [[]],
                        expectedToBeOrdered: false
                    },
                    {
                        id: 'pair8',
                        left: [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
                        right: [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
                        expectedToBeOrdered: false
                    }
                ]

                testCases
                    .forEach(testCase => {
                        const {id, left, right, expectedToBeOrdered} = testCase;
                        it(`${id} should compare pair ${JSON.stringify(left)}, ${JSON.stringify(right)} side by side`, function () {
                            const result = isInOrder(left, right)
                            expect(result).toEqual(expectedToBeOrdered)
                        });
                    })
            });
        });
    });

    describe('problem1', function () {
        it('should return sum of indices of pairs that are in order', function () {
            const result = problem1(testInput)
            expect(result).toBe(13)
        });

        it('should work for real data', function () {
            const result = problem1(data)
            expect(result).toBe(0)
        });
    })

    describe('problem2', function () {
        it('should sort packets, insert divider packets ', function () {
            const result = problem2(testInput)
            expect(result).toBe(13)
        });

        it('should work for real data', function () {
            const result = problem2(data)
            expect(result).toBe(22852)
        });
    });
});