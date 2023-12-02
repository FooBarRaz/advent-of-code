import {getPairs, insert, insertRecursively, parseInsertionRules, problem1, problem2} from "../day14";
import {pairInsertionRules, polymerTemplate} from "../data";

describe('Day 14', function () {
    const testTemplate = 'NNCB'
    const testInsertionRules = `CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`
    describe('get pairs', function () {
        it('should get pairs from character sequence', function () {
            const pairs = getPairs(testTemplate)
            expect(pairs[0]).toEqual('NN')
            expect(pairs[1]).toEqual('NC')
            expect(pairs[2]).toEqual('CB')
        });
    });

    describe('parseInsertionRules', function () {
        it('should parse insertion rules into object', function () {
            const rules = parseInsertionRules(testInsertionRules)
            expect(Object.keys(rules)).toHaveLength(16)
        });

    });

    describe('insert', function () {
        it('should insert polymer based on pairs', function () {
            const result = insert(testTemplate, parseInsertionRules(testInsertionRules));
            expect(result).toEqual('NCNBCHB')
        });

        it('it should perform iterations', function () {
            const result = insertRecursively(testTemplate, parseInsertionRules(testInsertionRules), 3);
            expect(result).toEqual('NBBBCNCCNBBNBNBBCHBHHBCHB')
        });
    });

    describe('problem 1', function () {
        it('should do the thing', function () {
            const result = problem1(testTemplate, parseInsertionRules(testInsertionRules))
            expect(result).toEqual(1588)
        });

        it('should do the thing for large dataset', function () {
            const result = problem1(polymerTemplate, parseInsertionRules(pairInsertionRules))
            expect(result).toEqual(2602)
        });

    });

    describe.skip('problem 2', function () {
        it('should do the thing', function () {
            const result = problem2(testTemplate, parseInsertionRules(testInsertionRules))
            expect(result).toEqual(1588)
        });

    });

});
