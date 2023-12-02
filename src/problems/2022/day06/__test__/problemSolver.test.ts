import {findFirstPositionWherePreviousNCharactersWereUnique, isEntirelyDistinct} from "../problemSolver";
import {data} from "../data";

describe('day 06', function () {
    const testInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

    describe('find marker', function () {
        describe('has repeated characters', function () {
            it('should return true for fjqj', function () {
                const result = isEntirelyDistinct('fjqj'.split(''))
                expect(result).toBe(false)
            })

            it('should be false for wxyz', function () {
                const result = isEntirelyDistinct('wxyz'.split(''))
                expect(result).toBe(true)
            });
        });

        describe('position of marker', function () {
            it('should return 7 for mjqjpqmgbljsphdztnvjfqwrcgsmlb', function () {
                const result = findFirstPositionWherePreviousNCharactersWereUnique(4, testInput)
                expect(result).toBe(7)
            })
            it('should return 5 for bvwbjplbgvbhsrlpgdmjqwftvncz', function () {
                const result = findFirstPositionWherePreviousNCharactersWereUnique(4, 'bvwbjplbgvbhsrlpgdmjqwftvncz')
                expect(result).toBe(5)
            });

            it('should return 11 for zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', function () {
                const result = findFirstPositionWherePreviousNCharactersWereUnique(4, 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')
                expect(result).toBe(11)
            })

            describe('real data', function () {
                it('should determine marker position', function () {
                    const result = findFirstPositionWherePreviousNCharactersWereUnique(4, data)
                    expect(result).toBe(1640)
                });
            });
        });

        describe('start of message', function () {
            it('should return 19 for mjqjpqmgbljsphdztnvjfqwrcgsmlb', function () {
               const result = findFirstPositionWherePreviousNCharactersWereUnique(14, 'mjqjpqmgbljsphdztnvjfqwrcgsmlb')
                expect(result).toEqual(19)
            });

            it('should find position for large dataset', function () {
                const result = findFirstPositionWherePreviousNCharactersWereUnique(14, data)
                expect(result).toEqual(3613)
            });
        });
    });
});