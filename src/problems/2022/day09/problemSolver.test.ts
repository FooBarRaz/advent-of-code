import {areTouching, machine, parseInput, problem1, problem2} from "./problemSolver";
import {Point} from "../../utils/grid";
import {data} from "./data";

const pt = (x: number, y: number) => new Point(x, y)
const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
describe('day 09', function () {
    describe('parseInput', function () {
        it('should return a list of movements', function () {
            const result = parseInput(testInput)

            expect(result).toHaveLength(8)
            expect(result[0]).toEqual({direction: 'R', distance: 4})
            expect(result[7]).toEqual({direction: 'R', distance: 2})
        });
    });


    describe('distance calculation', function () {
        const testCases = [
            {pointA: pt(0, 0), pointB: pt(0, 1), expectedToTouch: true},
            {pointA: pt(0, 0), pointB: pt(1, 0), expectedToTouch: true},
            {pointA: pt(0, 0), pointB: pt(1, 0), expectedToTouch: true},
            {pointA: pt(0, 0), pointB: pt(1, 1), expectedToTouch: true},
            {pointA: pt(0, 0), pointB: pt(0, 3), expectedToTouch: false},
            {pointA: pt(0, 0), pointB: pt(4, 0), expectedToTouch: false},
            {pointA: pt(0, 0), pointB: pt(2, 2), expectedToTouch: false},
        ]

        testCases.forEach(({pointA, pointB, expectedToTouch}) => {
            it(`should calculate distance between ${pointA} and ${pointB}`, function () {
                const result = areTouching(pointA, pointB)
                expect(result).toEqual(expectedToTouch)
            });
        })

    });

    describe('movement', function () {
        it('should move right', function () {
            const stateMachine = machine(2);
            stateMachine.move({direction: 'R', distance: 4})
            expect(stateMachine.knots[0].position).toEqual(pt(0, 4))
            expect(stateMachine.knots[stateMachine.knots.length -1].position).toEqual(pt(0, 3))
        });

        it('should move left', function () {
            const stateMachine = machine(2);
            stateMachine.move({direction: 'L', distance: 3})
            expect(stateMachine.knots[0].position).toEqual(pt(0, -3))
            expect(stateMachine.knots[stateMachine.knots.length -1].position).toEqual(pt(0, -2))
        });

        it('should move up', function () {
            const stateMachine = machine(2);
            stateMachine.move({direction: 'U', distance: 4})
            expect(stateMachine.knots[0].position).toEqual(pt(4, 0))
            expect(stateMachine.knots[stateMachine.knots.length -1].position).toEqual(pt(3, 0))
        });

        it('should move down', function () {
            const stateMachine = machine(2);
            stateMachine.move({direction: 'D', distance: 1})
            expect(stateMachine.knots[0].position).toEqual(pt(-1, 0))
            expect(stateMachine.knots[stateMachine.knots.length -1].position).toEqual(pt(0, 0))
        });

        it('should move multiple times', function () {
            const stateMachine = machine(2);
            stateMachine.move({direction: 'R', distance: 4})
            stateMachine.move({direction: 'U', distance: 4})
            expect(stateMachine.knots[0].position).toEqual(pt(4, 4))
            expect(stateMachine.knots[stateMachine.knots.length -1].position).toEqual(pt(3, 4))
        });

        it('should move diagonally', function () {
            const stateMachine = machine(2);
            stateMachine.move({direction: 'R', distance: 4})
            stateMachine.move({direction: 'U', distance: 4})
            stateMachine.move({direction: 'L', distance: 3})
            expect(stateMachine.knots[0].position).toEqual(pt(4, 1))
            expect(stateMachine.knots[stateMachine.knots.length -1].position).toEqual(pt(4, 2))
        });

        const testCases = [
            {
                numberOfMoves: 1, expectedPositions: {
                    head: pt(0, 4),
                    tail: pt(0, 3)
                }
            },
            {
                numberOfMoves: 4, expectedPositions: {
                    head: pt(3, 1),
                    tail: pt(4, 2)
                }
            },
            {
                numberOfMoves: 8,
                expectedPositions: {
                    head: pt(2, 2),
                    tail: pt(2, 1)
                }
            }
        ]

        testCases.forEach(({numberOfMoves, expectedPositions}) => {
            it(`should be in expected positions after ${numberOfMoves} moves`, function () {
                const stateMachine = machine(2);
                const moves = parseInput(testInput).slice(0, numberOfMoves)
                moves.forEach(move => stateMachine.move(move))

                expect(stateMachine.knots[0].position).toEqual(expectedPositions.head)
                expect(stateMachine.knots[stateMachine.knots.length -1].position).toEqual(expectedPositions.tail)
            });
        })
    });

    describe('print for debugs', function () {
        it('should print', function () {
            const stateMachine = machine(2);
            const moves = parseInput(testInput)
            moves.forEach(move => stateMachine.move(move))

            stateMachine.printTailMovements(60)
        });
    });

    describe('problem 1', function () {
        it('should calculate how many points visited', function () {
            const result = problem1(testInput)
            expect(result).toEqual(13)
        });

        it('should work for large dataset', function () {
            const result = problem1(data)
            expect(result).toEqual(5858)
        });
    });

    describe('problem 2', function () {
        it('should calculate how many points visited for example data set', function () {
            const result = problem2(testInput)
            expect(result).toEqual(1)
        });

        it('should calculate how many points visited for main dataset', function () {
            const result = problem2(data)
            expect(result).toEqual(5858)
        });
    });
});