import {
    decodeOutput,
    getEncodedDigitUsingInputSignal,
    groupByCharCount,
    occurrencesByDigit,
    parseInput,
    solveProblem1,
    solveProblem2
} from "../day8";
import {data} from "../data";

describe('Day 8', function () {
    const testData = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

    describe('parse input', function () {
        it('should split input and output signals from each line and order them alphabetically', function () {
            const result = parseInput(testData)
            expect(result[2].input[3]).toEqual('abdfg')
            expect(result[4].output[1]).toEqual('abcdefg')
        });
    });

    describe('Guess Digits', function () {
        describe('groupByCharacterCount', function () {
            it('should group a string array by char count', function () {
                const input = 'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb'.split(' ')
                const result = groupByCharCount(input)
                expect(result[2]).toHaveLength(1)
                expect(result[3]).toHaveLength(1)
                expect(result[5]).toHaveLength(3)
                expect(result[6]).toHaveLength(3)
                expect(result[7]).toHaveLength(1)
                expect(result[4]).toHaveLength(1)
            });
        });

        describe('occurrencesByDigit', function () {
            it('should show number of occurrences for each digit', function () {
                const input = 'be be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb be'.split(' ')
                const result = occurrencesByDigit(input)
                expect(result[1]).toEqual(3)
                expect(result[4]).toEqual(1)
                expect(result[7]).toEqual(1)
                expect(result[8]).toEqual(1)
            });
        });
    });

    describe('determining signals for numbers', function () {
        const testInput = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab`.split(' ')

        it('should figure out 0', function () {
            const result = getEncodedDigitUsingInputSignal[0](testInput)
            expect(result).toEqual('cagedb')
        });

        it('should figure out 1', function () {
            const result = getEncodedDigitUsingInputSignal[1](testInput)
            expect(result).toEqual('ab')
        });

        it('should figure out 2', function () {
            const result = getEncodedDigitUsingInputSignal[2](testInput)
            expect(result).toEqual('gcdfa')
        });

        it('should figure out 3', function () {
            const result = getEncodedDigitUsingInputSignal[3](testInput)
            expect(result).toEqual('fbcad')
        });

        it('should figure out 4', function () {
            const result = getEncodedDigitUsingInputSignal[4](testInput)
            expect(result).toEqual('eafb')
        });

        it('should figure out 5', function () {
            const result = getEncodedDigitUsingInputSignal[5](testInput)
            expect(result).toEqual('cdfbe')
        });

        it('should figure out 6', function () {
            const result = getEncodedDigitUsingInputSignal[6](testInput)
            expect(result).toEqual('cdfgeb')
        });

        it('should figure out 7', function () {
            const result = getEncodedDigitUsingInputSignal[7](testInput)
            expect(result).toEqual('dab')
        });

        it('should figure out 8', function () {
            const result = getEncodedDigitUsingInputSignal[8](testInput)
            expect(result).toEqual('acedgfb')
        });

        it('should figure out 9', function () {
            const result = getEncodedDigitUsingInputSignal[9](testInput)
            expect(result).toEqual('cefabd')
        });

    });

    describe('decode output', function () {
        const testInput = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`

        it('should decode output based on input', function () {
            const expectedResult = 5353
            const actualResult = decodeOutput(parseInput(testInput)[0])
            expect(actualResult).toEqual(expectedResult)
        });
    });


    describe('problem 1', function () {
        describe('count the number of unique digits in each output and sum it up', function () {
            it('should work for test data', function () {
                const result = solveProblem1(testData)
                expect(result).toEqual(26)
            });

            it('should work for real data', function () {
                const result = solveProblem1(data)
                expect(result).toEqual(514)
            });
        });
    });

    describe('problem 2', function () {

        describe('figure out ouput values and add them all up', function () {
            it('should work for test data set', function () {
                const expectedResult =  61229
                const actualResult = solveProblem2(testData)
                expect(actualResult).toEqual(expectedResult)
            });

            it('should work for large data set', function () {
                const expectedResult = 1012272
                const actualResult = solveProblem2(data)
                expect(actualResult).toEqual(expectedResult)
            });
        });
    });
});
