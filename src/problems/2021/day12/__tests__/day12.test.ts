import {Cave, Path, findPathBetween, parseInput, findDistinctPaths, findDistinctPaths2} from "../day12";
import exp from "constants";
import {data} from "../data";


describe('Day 12', function () {
    const testData = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

    describe('caves', function () {
        it('should be big cave if identifier is uppercase', function () {
            const bigCave = new Cave('AB')
            expect(bigCave.isBig).toBeTruthy()
        });

        it('should be small cave if identifier is lowercase', function () {
            const bigCave = new Cave('ab')
            expect(bigCave.isBig).toBeFalsy()
        });

    });

    describe('parsing input', function () {

        it('should parse input', function () {
            const paths = parseInput(testData)
            expect(paths).toHaveLength(7)
        });
    });

    describe('problem 1', function () {
        describe('find all distinct paths', function () {
            it('should return all paths', function () {
                const paths = findDistinctPaths(parseInput(testData), 'start', 'end')
                expect(paths).toEqual(10)
            });
            it('should work for large input', function () {
                const paths = findDistinctPaths(parseInput(data), 'start', 'end')
                expect(paths).toEqual(4549)
            });
        });
    });

    describe('problem 2', function () {
        describe('find all distinct paths', function () {
            it('should return all paths', function () {
                const paths = findDistinctPaths2(parseInput(testData), 'start', 'end')
                expect(paths.length).toEqual(36)
            });
            it('should work for large input', function () {
                const paths = findDistinctPaths2(parseInput(data), 'start', 'end')
                expect(paths.length).toEqual(120535)
            });
        });
    });
});
