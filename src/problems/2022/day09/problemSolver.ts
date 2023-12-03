import {Grid, Point} from "../../../utils/grid";

type Direction = 'U' | 'D' | 'L' | 'R';
type Movement = {
    direction: Direction
    distance: number
}

export const parseInput = (input: string): Movement[] => {
    return input.split('\n')
        .map(line => {
            const [direction, distance] = line.split(' ')
            return {
                direction: direction as Direction,
                distance: parseInt(distance)
            }
        })

}

export const areTouching = (point1: Point, point2: Point): boolean => {
    const touchingOnSameRow = point1.row === point2.row && Math.abs(point1.column - point2.column) <= 1
    const touchingOnSameColumn = point1.column === point2.column && Math.abs(point1.row - point2.row) <= 1
    const touchingDiagonally = Math.abs(point1.row - point2.row) <= 1 && Math.abs(point1.column - point2.column) <= 1
    return touchingOnSameColumn || touchingOnSameRow || touchingDiagonally

}

export const problem1 = (input: string): number => {
    const instructions = parseInput(input)
    const state = machine(2)
    instructions.forEach(instruction => {
        state.move(instruction)
    })

    return Object.keys(state.knots[state.knots.length -1].pointsVisited).length
}

export const problem2 = (input: string): number => {
    const instructions = parseInput(input)
    const state = machine(10)
    instructions.forEach(instruction => {
        state.move(instruction)
    })

    return Object.keys(state.knots[state.knots.length -1].pointsVisited).length
}


type Knot = {
    position: Point,
    pointsVisited: Record<string, number>,
    closeDistance: (target: Point) => void
};
export const machine = (numberOfKnots: number) => {
    const knot: () => Knot = () => ({
        position: new Point(0, 0),
        pointsVisited: {[new Point(0, 0).toString()]: 1},
        closeDistance(target: Point) {
            const from = this.position;
            const newPosition = () => {
                const isOnSameRow = from.row === target.row
                if (isOnSameRow) {
                    const isTargetOnLeft = target.column < from.column
                    if (isTargetOnLeft) {
                        return new Point(from.x - 1, from.y)
                    }
                    return new Point(from.x + 1, from.y)
                }
                const isInSameColumn = from.column === target.column
                if (isInSameColumn) {
                    const isTargetIsAbove = target.row > from.row
                    if (isTargetIsAbove) {
                        // move up
                        return new Point(from.x, from.y + 1)
                    }
                    // move down
                    return new Point(from.x, from.y - 1)
                }
                const isUpAndLeft = target.row > from.row && target.column < from.column
                if (isUpAndLeft) {
                    // move one step diagonally up and left to get closer
                    return new Point(from.x - 1, from.y + 1)
                }
                const isUpAndRight = target.row > from.row && target.column > from.column
                if (isUpAndRight) {
                    // move diagonally up and right
                    return new Point(from.x + 1, from.y + 1)
                }
                const isDownAndLeft = target.row < from.row && target.column < from.column
                if (isDownAndLeft) {
                    // move diagonally down and left
                    return new Point(from.x - 1, from.y - 1)
                }
                // else is down and right
                const isDownAndRight = target.row < from.row && target.column > from.column
                if (isDownAndRight) {
                    // move diagonally down and right
                    return new Point(from.x + 1, from.y - 1)
                }

                throw new Error('Unable to figure out next move')
            }

            this.position = newPosition()
            this.pointsVisited[this.position.toString()] = (this.pointsVisited[this.position.toString()] || 0) + 1
        }
    })

    const movements: {
        [key in Direction]: (point: Point) => Point
    } = {
        U(point: Point): Point {
            return new Point(point.row + 1, point.column)
        },
        D(point: Point): Point {
            return new Point(point.row - 1, point.column)
        }, L(point: Point): Point {
            return new Point(point.row, point.column - 1)
        }, R(point: Point): Point {
            return new Point(point.row, point.column + 1)
        }
    }

    const knots = Array(numberOfKnots).fill(0).map(() => knot())

    const move = (movement: Movement) => {
        const [headKnot] = knots;
        for (let i = 0; i < movement.distance; i++) {
            headKnot.position = movements[movement.direction](headKnot.position)
            moveKnots(headKnot, 1)
            // console.log({movement, step: i})
            // printState(6)
            // printTailMovements(6)
        }
    }

    const moveKnots = (headKnot: Knot, knotIndex: number) => {
        const nextKnot: Knot = knots[knotIndex];
        if (nextKnot) {
            const pointsAreNoLongerTouching = !areTouching(headKnot.position, nextKnot.position)
            if(pointsAreNoLongerTouching) {
                nextKnot.closeDistance(headKnot.position)
                moveKnots(nextKnot, knotIndex + 1)
            }
        }
    }

    const printState = (gridSize: number) => {
        const rows = Array(gridSize)
            .fill('.')
            .map((_, index) => Array(gridSize)
                .fill('.'))
        const grid = new Grid(rows)

        grid.setCell(knots[0].position, 'H')
        grid.setCell(knots[knots.length -1].position, 'T')
        grid.setCell(new Point(0, 0), 's')

        const reversedGrid = new Grid(grid.rows.reverse())

        reversedGrid.print(' ')
    }

    const printTailMovements = (gridSize: number) => {
        const rows = Array(gridSize).fill('.').map((_, index) => Array(gridSize).fill('.'))
        const grid = new Grid(rows)

        Object.keys(knot().pointsVisited).forEach(point => {
            grid.setCell(Point.fromString(point), '#')
        })
        grid.setCell(new Point(0, 0), 's')

        const reversedGrid = new Grid(grid.rows.reverse())

        reversedGrid.print(' ')
    }

    return {
        move,
        knots,
        printTailMovements
    }
}