import {calculateScore, getColumns, isBingo, isWinningLine, parseInput, problem1, problem2} from "../day4";
import {data} from "../data";

describe('Day 4', function () {
    describe('Parse input', function () {
        let sample: string;
        beforeEach(function () {
            sample = `1,2,3,4,5,6,7
        
14 86 50 89 49
10 85 33 46 87
82 91 54 13 90
63 88 75 99 79
74 31  4  0 71

56  3 70  2 22
44 63 10 95  8
92 62 83  4 93
74 80  5 11 68
24 50 42 65 72 `;
        });

        it('should parse first line into sequence of numbers', function () {
            const bingo = parseInput(sample)
            expect(bingo.numbers).toEqual([1, 2, 3, 4, 5, 6, 7])
        });

        it('should parse out board', function () {
            const bingo = parseInput(sample)
            expect(bingo.boards[1]).toEqual({
                rows: [
                    [56, 3, 70, 2, 22],
                    [44, 63, 10, 95, 8],
                    [92, 62, 83, 4, 93],
                    [74, 80, 5, 11, 68],
                    [24, 50, 42, 65, 72],
                ]
            })
        });
    });

    describe('getColumns', function () {
        it('should return each row as an element', function () {
            const smallCard = [
                [1, 2, 3],
                [7, 8, 9],
                [10, 11, 12]
            ]
            let columns = getColumns({rows: smallCard});
            expect(columns).toEqual([
                [1, 7, 10], [2, 8, 11], [3, 9, 12]
            ])
        });

    });

    describe('Bingo', function () {
        describe('isWinningLine', function () {
            it('false when there isnt a full match', function () {
                const calledNums = [1, 2, 3, 4, 5];
                const row = [1, 2, 3, 4, 6]
                expect(isWinningLine(row, calledNums)).toBeFalsy();
            });

            it('should be true when there is a full match', function () {
                const calledNums = [1, 2, 3, 4, 5];
                const row = [1, 2, 3, 4, 5]
                expect(isWinningLine(row, calledNums)).toBeTruthy();
            });

        });

        describe('isBingo', function () {
            let card: { rows: number[][] };
            beforeEach(function () {
                card = {
                    rows: [
                        [1, 2, 3, 4, 5],
                        [31, 32, 33, 34, 35],
                        [11, 12, 13, 14, 15],
                        [41, 42, 43, 44, 45],
                        [21, 22, 23, 24, 25],
                    ]
                };
            });

            it('false when there isnt a full match', function () {
                const calledNums = [1, 2, 3, 4, 6]
                expect(isBingo(card, calledNums)).toBeFalsy();
            });

            it('should be true when there is a winning row', function () {
                const calledNums = [31, 32, 33, 34, 35]
                expect(isBingo(card, calledNums)).toBeTruthy();
            });

            it('should be true when there is a winning column', function () {
                const calledNums = [2, 32, 42, 22, 12]
                expect(isBingo(card, calledNums)).toBeTruthy();
            });

            describe('calculate score', function () {
                it('should find sum of all unmarked numbers and multiply with most recent called number', function () {
                    const calledNums = [2, 32, 42, 22, 12]
                    expect(calculateScore(card, calledNums)).toEqual(5580);
                });
            });

        });

    });

    describe('problem 1', function () {
        it('should calculate score', function () {
            const result = problem1(data);
            expect(result).toEqual(32844)
        });
    });

    describe('problem 2', function () {
        it('should calculate score for last winning board', function () {
            const result = problem2(data);
            expect(result).toEqual(32844)
        });
    });

});
