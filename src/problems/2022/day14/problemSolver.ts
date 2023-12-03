import {uniq} from "lodash";
import { Point, Grid, initializeGrid } from "../../../utils/grid";
import { fillArray } from "../../../utils/listOps";

export class Line {
    constructor(public readonly pointA: Point,
                public readonly pointB: Point) {
    }

    allPointsOnFlatLine(): Point[] {
        if (this.pointA.row === this.pointB.row) {
            // flat horizontal line
            // return each point in between
            const [leftPoint, rightPoint] = [this.pointA.column, this.pointB.column].sort((a, b) => a - b)
            return fillArray((rightPoint - leftPoint) + 1).map(eachPoint => {
                return new Point(leftPoint + eachPoint, this.pointA.row)
            })
        }
        if (this.pointA.column === this.pointB.column) {
            // straight vertical line
            // return each point in between
            const [bottomPoint, topPoint] = [this.pointA.row, this.pointB.row].sort((a, b) => a - b)
            return fillArray(Math.abs((topPoint - bottomPoint)) + 1).map(eachPoint => {
                return new Point(this.pointA.column, bottomPoint + eachPoint)
            })
        } else throw new Error('not a flat line, probably diagonal')
    }

    equals(line: Line) {
        return this.pointA.equals(line.pointA) && this.pointB.equals(line.pointB)
    }

}

export class Sandlot extends Grid<string> {
    constructor(rows, private readonly origin: Point) {
        super(rows);
    }

    tick(times = 1) {
        if (times) {
            this.dropSand()
            this.tick(--times)
        }
    }

    tickUntilAbyss(timesTicked: number = 0): number {
        try {
            this.dropSand()
            return this.tickUntilAbyss(++timesTicked)
        } catch (e) {
            return timesTicked
        }
    }


    tickUntilBlocked(timesTicked: number = 0): number {
        try {
            this.dropSand()
            return this.tickUntilBlocked(++timesTicked)
        } catch (e) {
            if (e.message === 'blocked') {
                return this.tickUntilBlocked(++timesTicked)
            }
            return timesTicked;
        }
    }

    private dropSand(point = this.origin) {
        this.setCell(point, 'o')
        const nextPoint = this.getPointAbove(point)
        if (this.willFallIntoAbyss(nextPoint)) {
            throw new Error('falling-into-abyss')
        }
        if (this.isBottomRow(nextPoint.point)) {
            throw new Error('blocked')
        }
        if (this.isUnobstructed(nextPoint)) {
            this.setCell(point, '.')
            this.dropSand(nextPoint.point)
        } else {
            const pointBelowAndLeft = this.getPointAboveLeft(point)
            if (this.isUnobstructed(pointBelowAndLeft)) {
                this.setCell(point, '.')
                this.dropSand(pointBelowAndLeft.point)
            } else {
                const pointBelowAndRight = this.getPointAboveRight(point);
                if (this.isUnobstructed(pointBelowAndRight)) {
                    // if the point is beyond current bounds, then add another column
                    if (pointBelowAndRight.point.column >= this.dimensions.columns) {
                        const newColumn = fillArray(this.dimensions.rows).map(() => '.')
                        newColumn.pop()
                        newColumn.push('#')
                        this.addColumn(newColumn)
                    }
                    this.setCell(point, '.')
                    this.dropSand(pointBelowAndRight.point)
                }
            }
        }
    }

    private isUnobstructed(point: { value: string; point: Point }): boolean {
        return !['#', 'o'].includes(point.value);
    }

    private willFallIntoAbyss(point: { value: string; point: Point }) {
        return !point.value
    }

    private isBottomRow(point: Point) {
        return point.row === this.dimensions.rows - 1
    }

    print(separator: string): string {
        // slice off first 480 columns
        const rows = this.rows.map(row => row.slice(480, row.length))
        const message = rows.map(row => row.join('')).join('\n');
        console.log(message)
        return message;
    }
}

export const toGrid = (linesOfLines: Array<Array<Line>>): Grid<string> => {
        const allLines = linesOfLines.flatMap(lol => lol.flatMap(each => each))
        const allPoints = uniq((allLines.flatMap(line => [line.pointA, line.pointB])))
        const maxYValue = Math.max(...allPoints.map(pt => pt.row)) + 3
        const maxXValue = Math.max(...allPoints.map(pt => pt.column)) + 1
        const grid = initializeGrid(maxYValue, maxXValue, '.')
        const baseLine = new Line(new Point(0, maxYValue - 1), new Point(maxXValue - 1, maxYValue - 1));
        ([...allLines, baseLine]).forEach(line => {
            const allPoints = line.allPointsOnFlatLine()
            allPoints.forEach(pt => {
                grid.setCell(pt, '#')
            })
        })

        return grid
    }

export const
    parseInput = (input: string): Array<Array<Line>> => {
        return input.split('\n')
            .map(inputLine => {
                const points = inputLine.split(' -> ').map(ptStr => {
                    const [x, y] = ptStr.trim().split(',').map(x => parseInt(x))
                    return new Point(x, y)
                })
                return points.reduce((lines, point, index) => {
                    if (points[index + 1]) {
                        lines.push(new Line(point, points[index + 1]))
                    }
                    return lines;
                }, [])
            })

    }

export const problem1 = (input: string) => {
    const lines = parseInput(input)
    const grid = toGrid(lines)
    const sandlot = new Sandlot(grid.rows, new Point(500, 0))

    const result = sandlot.tickUntilAbyss()
    sandlot.print(' ')
    return result;
}

export const problem2 = (input: string) => {
    const lines = parseInput(input)
    const grid = toGrid(lines)
    const sandlot = new Sandlot(grid.rows, new Point(500, 0))
    const result = sandlot.tickUntilBlocked()

    sandlot.print(' ')
    return result;
}