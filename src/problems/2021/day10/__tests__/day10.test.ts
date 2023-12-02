import {completeLine, scoreLineCompletion, scoreSyntaxErrors, solveProblem2, validateLine} from "../day10";
import exp from "constants";
import {data} from "../data";

describe('Day 10', function () {
    describe('validation', function () {
        describe('valid lines', function () {

            //([]), {()()()}, <([{}])>, [<>({}){}[([])<>]], and even (((((((((())))))))))
            const cases = ['()', '([])', '{()()()}', '<([{}])>', '[<>({}){}[([])<>]]', '(((((((((())))))))))']


            const testValidLine = (testCase: string) => {
                it(`should return empty array for valid line: ${testCase}`, function () {
                    const validationErrors = validateLine(testCase)
                    expect(validationErrors).toHaveLength(0)
                });
            }

            cases.forEach((testCase) => testValidLine(testCase))
        });

        it('should be valid for incomplete lines', function () {
            const line = '[({(<(())[]>[[{[]{<()<>>'
            const validationErrors = validateLine(line)
            expect(validationErrors).toHaveLength(0)
        });

        describe('finding corrupted lines', function () {
            const cases = ['(]', '{()()()>', '(((()))}', '<([]){()}[{}])'];
            const testInvalidLIne = (testCase: string) => {
                it(`should detect invalid lines: ${testCase}`, function () {
                    const validationErrors = validateLine(testCase)
                    expect(validationErrors).toHaveLength(1)
                });
            }

            cases.forEach(testCase => testInvalidLIne(testCase))
        });
    });

    describe('completing lines', function () {
        /**

         */
        const cases = [
            {line: '[({(<(())[]>[[{[]{<()<>>', completion: '}}]])})]'},
            {line: '[(()[<>])]({[<{<<[]>>(', completion: ')}>]})'},
            {line: '(((({<>}<{<{<>}{[]{[]{}', completion: '}}>}>))))'},
            {line: '{<[[]]>}<{[{[{[]{()[[[]', completion: ']]}}]}]}>'},
            {line: '<{([{{}}[<[[[<>{}]]]>[]]', completion: '])}>'}
        ]

        const testCompletion = (testCase: { line: string, completion: string }) => {
            it(`should complete ${testCase.line} with ${testCase.completion}`, function () {
                const incompleteLine = testCase.line
                const expectedResult = testCase.completion
                const actualResult = completeLine(incompleteLine)
                expect(actualResult).toEqual(expectedResult)
            });
        }

        cases.forEach(testCompletion)

        describe('scoring', function () {
            it('should score correctly', function () {
                const expectedScore = 294
                const actualScore = scoreLineCompletion('])}>')
                expect(actualScore).toEqual(expectedScore)
            });

        });
    });

    describe('problems', function () {
        const testData = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

        describe('solving problem 1', function () {
            describe('for small data set', function () {
                it('should score invalid chars for small dataset', function () {
                    const expectedResult = 26397
                    const actualScore = scoreSyntaxErrors(testData)
                    expect(actualScore).toEqual(expectedResult)
                });

                it('should score for large dataset', function () {
                    const expectedResult = 168417
                    const actualScore = scoreSyntaxErrors(data)
                    expect(actualScore).toEqual(expectedResult)
                });
            });
        });

        describe('solving problem 2', function () {
            describe('discard corrupted lines, complete incomplete lines, score them, sort them, and return middle score', function () {
                it('should work for small dataset', function () {
                    const expectedResult = 288957
                    const actualResult = solveProblem2(testData)
                    expect(actualResult).toEqual(expectedResult)
                });

                it('should work for large dataset', function () {
                    const expectedResult = 288957
                    const actualResult = solveProblem2(data)
                    expect(actualResult).toEqual(expectedResult)
                });
            });

        });
    });
});
