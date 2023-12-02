import {parseInput, outcomeScore, roundScore, problem1, problem2} from "../problemSolver";
import exp from "constants";
import {data} from "../data";

const input = `A Y
B X
C Z`

describe('parseInput', function () {
    it('should split lines', function () {
        const result = parseInput(input);
        expect(result).toHaveLength(3)
    });

    it('should evaluate opponent moves', function () {
        const result = parseInput(input);
        const opponentMoves = result.map(r => r.opponentMove)
        expect(opponentMoves).toEqual(['rock', 'paper', 'scissors'])
    });

});

describe('calculate score', function () {

    // it('should calculate score', function () {
    //     const moves = parseInput(input);
    //     let scoresByRound = moves
    //         .map(({opponentMove, myMove}) => roundScore(myMove, opponentMove));
    //     const result = scoresByRound
    //         .reduce((a, b) => a + b, 0)
    //
    //     expect(result).toEqual(15)
    // })
});

describe('solve problem 1', function () {
    it('should solve for example', function () {
        const result = problem1(input);
        expect(result).toEqual(15)
    });

    it('should solve for large dataset', function () {
        const result = problem1(data);
        expect(result).toEqual(17189)
    });
});

describe('solve problem2', function () {
    it('should solve for example', function () {
        const result = problem2(input);
        expect(result).toEqual(12)
    });

    it('should solve for large dataset', function () {
        const result = problem2(data);
        expect(result).toEqual(13490);
    });
});