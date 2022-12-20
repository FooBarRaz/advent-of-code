import {Grid, initializeGrid, Point} from "../../utils/grid";
import {uniq} from "lodash";
import {fillArray} from "../../utils/listOps";

export class Line {
    constructor(public readonly pointA: Point,
                public readonly pointB: Point) {
    }

    allPointsOnFlatLine(): Point[] {
        if (this.pointA.row === this.pointB.row) {
            // flat horizontal line
            // return each point in between
            const [leftPoint, rightPoint] = [this.pointA.column, this.pointB.column].sort()
            return fillArray((rightPoint - leftPoint) + 1).map(eachPoint => {
                return new Point(this.pointA.row, leftPoint + eachPoint)
            })
        }
        if (this.pointA.column === this.pointB.column) {
            // straight vertical line
            // return each point in between
            const [bottomPoint, topPoint] = [this.pointA.row, this.pointB.row].sort()
            return fillArray((topPoint - bottomPoint) + 1).map(eachPoint => {
                return new Point(bottomPoint + eachPoint, this.pointA.column)
            })
        } else throw new Error('not a flat line, probably diagonal')
    }

    equals(line: Line) {
        return this.pointA.equals(line.pointA) && this.pointB.equals(line.pointB)
    }

}

export const toGrid = (linesOfLines: Array<Array<Line>>): Grid<string> => {
    const allLines = linesOfLines.flatMap(lol => lol.flatMap(each => each))
    const allPoints = uniq((allLines.flatMap(line => [line.pointA, line.pointB])))
    const maxXValue = Math.max(...allPoints.map(pt => pt.row))
    const maxYValue = Math.max(...allPoints.map(pt => pt.column))
    const grid = initializeGrid(maxXValue+1, maxYValue+1, '.')
    allLines.forEach(line => {
        const allPoints = line.allPointsOnFlatLine()
        allPoints.forEach(pt => {
            grid.setCell(pt, '#')
        })
    })
    return grid
}

export const parseInput = (input: string): Array<Array<Line>> => {
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