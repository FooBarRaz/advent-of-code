import {nanoid} from 'nanoid'
import { splitLines } from '../../../utils/dataReader';
import { sum } from '../../../utils/listOps';

export type Cell = {
    row: number;
    column: number
};

export type Grid = {
    rows: Array<Array<number>>
}


export const parseInput = (data: string): Grid => {
    return splitLines(data)
        .reduce((prev, eachLine) => {
            return {
                ...prev, rows: [
                    ...prev.rows,
                    eachLine.split('').map(eachDigit => Number.parseInt(eachDigit))
                ]
            }
        }, {rows: []})
}

const getValueAbove = (grid: Grid, cell: Cell): number | undefined => grid.rows[cell.row - 1]?.[cell.column]
const getValueBelow = (grid: Grid, cell: Cell): number | undefined => grid.rows[cell.row + 1]?.[cell.column]
const getValueLeft = (grid: Grid, cell: Cell): number | undefined => grid.rows[cell.row]?.[cell.column - 1]
const getValueRight = (grid: Grid, cell: Cell): number | undefined => grid.rows[cell.row]?.[cell.column + 1]

const getCellAbove = (grid: Grid, cell: Cell): Cell => (grid.rows[cell.row - 1]?.[cell.column] !== undefined) ? toCell(cell.row - 1, cell.column) : undefined
const getCellBelow = (grid: Grid, cell: Cell): Cell => (grid.rows[cell.row + 1]?.[cell.column] !== undefined) ? toCell(cell.row + 1, cell.column) : undefined
const getCellLeft = (grid: Grid, cell: Cell): Cell => (grid.rows[cell.row]?.[cell.column - 1] !== undefined) ? toCell(cell.row, cell.column - 1) : undefined
const getCellRight = (grid: Grid, cell: Cell): Cell => (grid.rows[cell.row]?.[cell.column + 1] !== undefined) ? toCell(cell.row, cell.column + 1) : undefined

export const getAdjacentCells = (grid: Grid, cell: Cell): Point[] => {
    let cells = [
        getCellAbove(grid, cell),
        getCellRight(grid, cell),
        getCellBelow(grid, cell),
        getCellLeft(grid, cell),
    ];
    let cells1 = cells.filter(x => x !== undefined);
    return cells1
        .reduce((prev, eachCell) => ([...prev, {cell: eachCell, value: grid.rows[eachCell.row][eachCell.column]}]), []);
}

export const getAdjacentValues = (grid: Grid, cell: Cell): number[] => [
    getValueAbove(grid, cell),
    getValueRight(grid, cell),
    getValueBelow(grid, cell),
    getValueLeft(grid, cell),
].filter(x => x !== undefined)

type Point = {
    cell: Cell,
    value: number
}

export const findLowPoints = (grid: Grid): Array<Point> => {
    return grid.rows.reduce((lowPoints, eachRow, rowIndex) => {
        return [...lowPoints, ...eachRow.reduce((lowPointCells, currColumn, columnIndex) => {
            const currentCell = {row: rowIndex, column: columnIndex}
            const adjacentCells = getAdjacentValues(grid, currentCell)
            if (currColumn < Math.min(...adjacentCells)) {
                lowPointCells.push({cell: currentCell, value: currColumn})
            }
            return lowPointCells
        }, [])]
    }, [])
}

export const calculateRiskLevel = (lowPoints: Array<Point>) => sum(lowPoints.map(pt => pt.value + 1));

export const solveProblem1 = (data: string): number =>
    calculateRiskLevel(findLowPoints(parseInput(data)))

export const toCell = (row: number, column: number) => ({row, column})
export const toCellString = (cell: Cell) => `${cell.row}:${cell.column}`

export const findBasins = (grid: Grid) => {
    const basins = {}

    grid.rows.forEach((row, rowIndex) => {
        row.forEach((columnValue, columnIndex) => {
            if (columnValue !== 9) {
                const thisCell = toCell(rowIndex, columnIndex)
                const cellStr = toCellString(thisCell)
                const basin = basins[cellStr]
                const adjacentCells = getAdjacentCells(grid, thisCell).filter(c => c.value !== 9)

                const basinId = basin || basins[adjacentCells.map(x => toCellString(x.cell)).find(x => basins[x])] || nanoid()
                basins[cellStr] = basinId
                adjacentCells.forEach(ac => basins[toCellString(ac.cell)] = basinId)
            }
        })
    })

    let allBasins: Array<Array<Cell>> = Object.values(Object.entries(basins).reduce((basinMap, [cellStr, basinId]) => {
        const [cellRow, cellColumn] = cellStr.split(':').map(str => Number.parseInt(str))
        const cellPoint = {cell: toCell(cellRow, cellColumn), value: grid.rows[cellRow][cellColumn]}
        basinMap[basinId as string] = [...(basinMap[basinId as string] || []), cellPoint]
        return basinMap
    }, {}));
    return allBasins.sort((a, b) => b.length - a.length)
}

export const solveProblem2 = (data: string) : number => {
    const input = parseInput(data)
    const basins = findBasins(input)

    let slice = basins.slice(0,3);
    console.log('3 biggest basins: ', slice.map(x => x.length));
    return slice
        .map(x => x.length)
        .reduce((prev, curr) => prev * curr, 1)
}

