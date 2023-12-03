import {splitLines} from "../../../utils/dataReader";
import {fillArray} from "../../../utils/listOps";

export type Point = {
    x: number
    y: number
}

export const point = (x: number, y: number): Point => ({x, y})
export const line = (x1: number, y1: number, x2: number, y2: number): Line => ({
    a: {x: x1, y: y1},
    b: {x: x2, y: y2}
})

export type Line = {
    a: Point
    b: Point
}

export const isVertical = (line: Line): boolean => line.a.x === line.b.x

export const isHorizontal = (line: Line): boolean => line.a.y === line.b.y

const isForwardDiagonal = (line: Line) => line.a.x === line.a.y && line.b.x == line.b.y;

const isReverseDiagonal = (line: Line) => line.a.x === line.b.y && line.b.x == line.a.y;

export const isDiagonal = (line: Line): boolean =>
    isForwardDiagonal(line) ||
    isReverseDiagonal(line)

export const isInBetween = (someValue: number, otherValues: number[]) =>
    [someValue, ...otherValues]
        .sort((a, b) => a - b)[1] === someValue

const isPointOnReverseDiagonal = (point: Point, line: Line) => {
    // y = -x + c
    const c = line.a.y + line.a.x
    return point.y === c - point.x
}

export const isPointOnLine = (point: Point, line: Line): boolean => {
    return (isHorizontal(line)
            && point.y === line.a.y
            && isInBetween(point.x, [line.a.x, line.b.x]))
        || (isVertical(line)
            && point.x === line.a.x
            && isInBetween(point.y, [line.a.y, line.b.y]))
        || // assume diagonal
        (isInBetween(point.x, [line.a.x, line.b.x])
            && isInBetween(point.y, [line.a.y, line.b.y])
        && ((isForwardDiagonal(line) && point.x === point.y) ||
                    isReverseDiagonal(line) && isPointOnReverseDiagonal(point, line)
        ))
}

export const parseInput = (data: string): Array<Line> => {
    const rawLines = splitLines(data)
    return rawLines.map(eachLine => {
        const [rawPointA, rawPointB] = eachLine.split(' -> ')
        const [x1, y1] = rawPointA.split(',').map(x => Number.parseInt(x))
        const [x2, y2] = rawPointB.split(',').map(x => Number.parseInt(x))
        return line(x1, y1, x2, y2)
    })
}

export const countOverlaps = (point: Point, lines: Array<Line>): number =>
    lines.reduce((prev, line) => isPointOnLine(point, line) ? prev + 1 : prev, 0)

export const solveTheDamnThing = (allHorizontalOrVerticalLines: Array<Line>) => {
    const maxX = Math.max(...allHorizontalOrVerticalLines.reduce((prev, curr) => {
        return [...prev, curr.a.x, curr.b.x]
    }, [])) + 1
    const maxY = Math.max(...allHorizontalOrVerticalLines.reduce((prev, curr) => {
        return [...prev, curr.a.y, curr.b.y]
    }, [])) + 1

    return fillArray(maxX)
        .reduce((pointsArray, x) =>
            [...pointsArray, ...fillArray(maxY)
                .map(y => point(x, y))], [])
        .filter(pt => countOverlaps(pt, allHorizontalOrVerticalLines) >= 2).length
};

export const solveProblem = (data: string, includeDiagonals = false): number => {
    let lines = parseInput(data);
    if (!includeDiagonals) {
        lines = lines
            .filter(line => isVertical(line) || isHorizontal(line));
    }
    return solveTheDamnThing(lines);
}
