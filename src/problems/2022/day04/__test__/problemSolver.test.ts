import {parseInput, problem1, problem2} from "../problemSolver";
import {data} from "../data";

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

describe('parseInput', function () {
    describe('given test input', function () {
        it('should parse out 6 elf pairs', function () {
            const result = parseInput(testInput)
            expect(result.length).toEqual(6)
        });

        it('should set assignment ranges to each elf', function () {
            const result = parseInput(testInput)
            expect(result[0].elf1.low).toEqual(2)
            expect(result[0].elf1.high).toEqual(4)
            expect(result[0].elf2.low).toEqual(6)
            expect(result[0].elf2.high).toEqual(8)
        });

    });

    describe('ElfPair', function () {
        it('should determine whether one elf overlaps the other', function () {
            const elfPairs = parseInput(testInput)
            expect(elfPairs[0].hasOverlappingAssignment()).toEqual(false);
            expect(elfPairs[3].hasOverlappingAssignment()).toEqual(true);
            expect(elfPairs[4].hasOverlappingAssignment()).toEqual(true);
        });

        it('should determine whether one elf overlaps the other at all', function () {
            const elfPairs = parseInput(testInput)
            const results  = elfPairs.map(eachPair => eachPair.hasAnyOverlapAtAll())
            expect(results).toEqual([false, false, true, true, true, true])
        })
    });

    describe('solve problem 1', function () {
        it('should calculate the amount of elf pairs that overlap', function () {
            expect(problem1(data)).toEqual(466)
        });
    });

    describe('solve problem 2', function () {
        it('should calculate the amount of elf pairs that overlap', function () {
            expect(problem2(data)).toEqual(3)
        });
    });
});