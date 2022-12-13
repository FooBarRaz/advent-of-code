import {generateMonkeys, generateTestMonkeys, parseInput, problem1, round} from "./problemSolver";

const testInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`

describe('day 11', function () {
    describe('parse input', function () {

        describe('given test input', function () {
            it('should parse out instructions', function () {
                const result = parseInput(testInput)
                expect(result[0].id).toEqual("0")
            });
        });

    });

    describe('round', function () {
        it('should run a round', function () {
            const testMonkeys = generateTestMonkeys()
            const result = round(testMonkeys)
            /**
             * Monkey 0: 20, 23, 27, 26
Monkey 1: 2080, 25, 167, 207, 401, 1046
             */

            expect(result[0].startingItems).toEqual([20, 23, 27, 26])
            expect(result[1].startingItems).toEqual([2080, 25, 167, 207, 401, 1046])
        });
    });

    describe('problem 1', function () {
        describe('given test dataset', function () {
            it('should find most active monkey', function () {
                const result = problem1(generateTestMonkeys())
                expect(result).toEqual(10605)
            });
        });

        describe('given real dataset', function () {
            it('should find most active monkey', function () {
                const result = problem1(generateMonkeys())
                expect(result).toEqual(10605)
            });
        })
    });

    describe('problem 2', function () {
        describe('given test dataset', function () {
            it('should find most active monkey', function () {

            });
        });

    });
});