import {splitLines} from "../../utils/dataReader";
import {Grid, Point} from "../../utils/grid";
import {fillArray} from "../../utils/listOps";

type GridContents = '#' | '.'
export const toPoints = (input: string) => {
    let coords = splitLines(input).map(str => {
        if (!str.startsWith('fold')) {
            const [y, x] = str.split(',').map(each => Number.parseInt(each))
            return new Point(x, y)
        }
    })
        .filter(x => !!x);
    return coords
}

const dimensions = (points: Point[]): Point => new Point(Math.max(...points.map(pt => pt.row)) + 1,
    Math.max(...points.map(pt => pt.column)) + 1)

export const toGrid = (points: Point[]): Grid<GridContents> => {
    const dims = dimensions(points)
    let gridRows = fillArray(dims.row).map(() => fillArray(dims.column).map(() => '.' as '.'));
    let grid = new Grid<GridContents>(gridRows);
    points.forEach(pt => grid.setCell(pt, '#'))
    return grid
}

export function foldUp(grid: Grid<GridContents>, foldPoint: number): Grid<GridContents> {
    let topHalf = grid.rows.slice(0, foldPoint);
    let bottomHalf = grid.rows.slice(foldPoint + 1);
    const gridFromTopHalf = new Grid(topHalf)
    const linesInTopHalf = gridFromTopHalf.rows.length;

    bottomHalf.forEach((row, bottomRowIndex) => row.forEach((cell, columnIndex) => {
        if (cell === '#') {
            gridFromTopHalf.setCell(new Point(linesInTopHalf - 1 - bottomRowIndex, columnIndex), '#')
        }
    }))

    return gridFromTopHalf
}

export function foldLeft(grid: Grid<GridContents>, foldPoint: number): Grid<GridContents> {
    let leftHalf = grid.rows.map(eachRow => eachRow.slice(0, foldPoint))
    let rightHalf = grid.rows.map(eachRow => eachRow.slice(foldPoint + 1))
    const gridFromLeftHalf = new Grid(leftHalf)
    const columnsInLeftHalf = leftHalf[0].length;

    rightHalf.forEach((row, rowIndex) => row.forEach((cell, columnIndex) => {
        if (cell === '#') {
            gridFromLeftHalf.setCell(new Point(rowIndex, columnsInLeftHalf - 1 - columnIndex), '#')
        }
    }))

    return gridFromLeftHalf
}

export const countDots = (grid: Grid<GridContents>): number => {
    return grid.allCells.reduce((prev, curr) => curr === '#' ? prev + 1 : prev, 0)
}

export const parseFoldInstructions = (input: string): { axis: 'x' | 'y', foldPoint: number }[] => {
    return splitLines(input)
        .filter(line => line.startsWith('fold'))
        .map(eachLine => {
            const [foldInstructions] = eachLine.split(' ').reverse()
            const [axis, foldPoint] = foldInstructions.split('=')
            return {axis: axis as 'x' | 'y', foldPoint: Number.parseInt(foldPoint)}
        })

}

export const solveProblem2 = (input: string): Grid<GridContents> => {
    let grid = toGrid(toPoints(input))
    const foldInstructions = parseFoldInstructions(input)
    const foldOperation = { x: foldLeft, y: foldUp }

    foldInstructions.forEach(instruction => {
        grid = foldOperation[instruction.axis](grid, instruction.foldPoint)
    })

    return grid;
}
