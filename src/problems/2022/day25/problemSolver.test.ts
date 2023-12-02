import {decimalToSnafuArray, parseInput, problem1, snafuToDecimal} from "./problemSolver";
import {data} from "./data";

const generalInput = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`
describe('day 25', function () {
    describe('parseInput', function () {
        it('should parse as number lists', function () {
            const result = parseInput(generalInput)
            expect(result[0]).toEqual([1, -2, -1, 0, -1, 2])
        });
    });


    /**
     * SNAFU  Decimal
     * 1=-0-2     1747
     *  12111      906
     *   2=0=      198
     *     21       11
     *   2=01      201
     *    111       31
     *  20012     1257
     *    112       32
     *  1=-1=      353
     *   1-12      107
     *     12        7
     *     1=        3
     *    122       37
     */
    const testCases = [
        { input: [0], expected: 0 },
        { input: [1], expected: 1 },
        { input: [2], expected: 2 },
        { input: [1, -2], expected: 3 },
        { input: [1, -1], expected: 4 },
        { input: [1,0], expected: 5 },
        { input: [1, 1], expected: 6 },
        { input: [1, 2], expected: 7 },
        { input: [2, -2], expected: 8 },
        { input: [2, -1], expected: 9 },
        { input: [2, 0], expected: 10 },
        {input: [1, -2, -1, 0, -1, 2], expected: 1747},
        {input: [1, 2, 1, 1, 1], expected: 906},
        {input: [2, -2, 0, -2], expected: 198},
        {input: [2, 1], expected: 11},
        {input: [2, -2, 0, 1], expected: 201},
        {input: [1, 1, 1], expected: 31},
        {input: [2, 0, 0, 1, 2], expected: 1257},
        {input: [1, 1, 2], expected: 32},
        {input: [1, -2, -1, 1, -2], expected: 353},
        {input: [1, -1, 1, 2], expected: 107},
        {input: [1, 2], expected: 7},
        {input: [1, -2], expected: 3},
        {input: [1, 2, 2], expected: 37},
    ];

    testCases.forEach(({input, expected}, i) => {
        describe('snafuToDecimal', function () {
            it(`${JSON.stringify(input)} to ${expected}`, function () {
                const result = snafuToDecimal(input)

                expect(result).toEqual(expected)
            });
        })

        describe('decimalToSnafu', function () {
            it(`${expected} to ${JSON.stringify(input)}`, function () {
                const result = decimalToSnafuArray(expected)
                expect(result).toEqual(input)
            });
        });
    });

    describe('problem 1', function () {
        it('should solve for general input', function () {
            const result = problem1(generalInput)
            expect(result).toEqual('2=-1=0')
        });

        it('should solve for my input', function () {
                const result = problem1(data)
                expect(result).toEqual(0)
        });
    });
});