import {fillArray} from "./listOps";
import {ChitonGrid} from "../2021/day15/problemSolver";
export const initializeGrid = <T>(rows: number, columns: number, placeholder: T): Grid<T> => {
    const gridRows: Array<Array<T>> = fillArray(rows).map(eachRow => {
        return fillArray(columns).map(eachColumn => placeholder)
    })

    return new Grid(gridRows)
}

export class Point {
    constructor(private _x: number, private _y: number) {
    }

    static fromString(stringPoint: string): Point {
        const [x, y] = stringPoint.replace('(', '').replace(')', '').split(',')
        return new Point(parseInt(x), parseInt(y))
    }

    public get x() {
        return this._x
    }
    public get y() {
        return this._y
    }

    public get row() {
        return this._y
    }

    public get column() {
        return this._x
    }

    equals(other: Point): boolean {
        return this.row === other.row && this.column === other.column
    }

    toString(): string {
        return `(${this._x},${this._y})`
    }

}

type PointAndValue<T> = {
    point: Point
    value: T
}

export class Grid<T> {
    private _rows: Array<Array<T>>
    private _dimensions: { rows: number, columns: number }

    constructor(rows: Array<Array<T>>) {
        const rowLengths = rows.map(everyRow => everyRow.length)
        if (Math.min(...rowLengths) !== Math.max(...rowLengths)) {
            throw new Error('Invalid grid size: each row must have same size')
        }
        this._rows = rows
        this._dimensions = {rows: rows.length, columns: rowLengths[0]}
    }

    public get dimensions() {
        return this._dimensions
    }

    public get rows(): Array<Array<T>> {
        return this._rows
    }

    public get columns(): Array<Array<T>> {
        return fillArray(this.dimensions.columns)
            .map(eachColumnIndex => {
           return this.rows.map(eachRow => eachRow[eachColumnIndex])
        })
    }

    value(point: Point): T {
        return this.rows[point.row]?.[point.column]
    }

    allPoints(): Point[] {
        let ts = this.rows.reduce((prev, row, rowIndex) => {
            const points = row.map((_, columnIndex) => new Point(columnIndex, rowIndex))
            return [...prev, ...points]
        }, []);
        return ts as Point[];
    }

    getPointValue(point: Point): T {
        return this.rows[point.row]?.[point.column]
    }

    findCellByValue(val: T): Point {
        const point = this.allPoints().find(point => this.getPointValue(point) === val)
        if (!point) {
            throw new Error(`Could not find cell with value ${val}`)
        }
        return point
    }

    getAdjacentPoints(point: Point, includeDiagonallyAdjacentCells = true): PointAndValue<T>[] {
        let adjacentCells;

        let laterallyAdjacent = [
            this.getPointAbove(point),
            this.getPointRight(point),
            this.getPointBelow(point),
            this.getPointLeft(point),
        ];

        adjacentCells = [...laterallyAdjacent];

        if (includeDiagonallyAdjacentCells) {
            const diagonallyAdjacent = [this.getPointAboveLeft,
                this.getPointAboveRight, this.getPointBelowRight, this.getPointBelowLeft].map(fn => fn(point));
            adjacentCells = [...adjacentCells, diagonallyAdjacent ];
        }

        return adjacentCells.filter(x => x.value !== undefined)
    }

    getPointAbove(from: Point) {
        const point = new Point(from.x, from.y + 1);
        return { value: this.getPointValue(point), point };
    }

    getPointRight(from: Point){
        const point = new Point(from.x + 1, from.y);
        return { value: this.getPointValue(point), point };
    }

    getPointBelow(from: Point) {
        const point = new Point(from.x, from.y - 1);
        return { value: this.getPointValue(point), point };
    }

    getPointLeft(from: Point) {
        const point = new Point(from.x - 1, from.y);
        return { value: this.getPointValue(point), point };
    }


    getPointAboveRight(from: Point) {
        const point = new Point(from.x + 1, from.y + 1);
        return { value: this.getPointValue(point), point };
    }

    getPointBelowRight(from: Point) {
        const point = new Point(from.x + 1, from.y - 1);
        return { value: this.getPointValue(point), point };
    }

    getPointBelowLeft(from: Point) {
        const point = new Point(from.x - 1, from.y - 1);
        return { value: this.getPointValue(point), point };
    }


    getPointAboveLeft(from: Point) {
        const point = new Point(from.x - 1, from.y + 1);
        return { value: this.getPointValue(point), point };
    }

    setCell(point: Point, value: T) {
      this.rows[point.row][point.column] = value
    }

    addRow(row: Array<T>) {
        if (row.length !== this.dimensions.columns) {
            throw new Error('Invalid row size')
        }
        this.rows.push(row)
    }

    addColumn(column: Array<T>) {
        if (column.length !== this.dimensions.rows) {
            throw new Error('Invalid column size')
        }
        this._rows =  this.rows.map((row, index) => {
            row.push(column[index])
            return row
        })
    }

    print(separator = ',') {
        const text = this.rows.map(eachRow => eachRow.join(separator)).join('\n')
        console.log(text)
        return text;
    }

    public get allCells(): Array<T> {
        return this.rows.reduce((prev, curr) => [...prev, ...curr ], [])
    }
}

export function vertexWithShortestDistance(vertices: Point[], distances: Record<string, number>) {
    return vertices
        .reduce((acc, vertex) => {
            if (distances[vertex.toString()] < distances[acc.toString()]) {
                return vertex
            }
            return acc
        }, vertices[0])
}

export function getShortestPath(points: Grid<number>, start: Point, destination: Point, hillClimber = false) {
    const sptSet = []
    const allPoints = points.allPoints()

    let distances: Record<string, number> = allPoints.reduce((acc, point) => {
        const pointString = point.toString()
        return {
            ...acc,
            [pointString]: point.equals(start) ? 0 : Number.MAX_VALUE
        }
    }, {});

    const unvisitedVertices = () => allPoints.filter(point => !sptSet.includes(point))
    while (unvisitedVertices().length) {
        const currentVertex = vertexWithShortestDistance(unvisitedVertices(), distances)
        sptSet.push(currentVertex)
        if (currentVertex.equals(destination)) {
            break
        }
        const neighbors = points.getAdjacentPoints(currentVertex, false);
        neighbors.forEach(neighbor => {
            const neighborString = neighbor.point.toString()
            const currentVertexString = currentVertex.toString()
            let distanceToNeighbor: number;
            if (hillClimber) {
                // if neighbor is within 1 step, we can go there
                if (neighbor.value - points.getPointValue(currentVertex) <= 1) {
                    distanceToNeighbor = distances[currentVertexString] + 1;
                }
                // if neighbor is higher, we can't go there
                else {
                    // if((neighbor.value - 1) > points.getPointValue(currentVertex)) {
                    distanceToNeighbor = Number.MAX_VALUE
                }
            } else {
                distanceToNeighbor = distances[currentVertexString] + points.getPointValue(neighbor.point);
            }

            if (distanceToNeighbor < distances[neighborString]) {
                distances[neighborString] = distanceToNeighbor
            }
        })
    }
    return {
        distance: distances[destination.toString()],
        pathLength: new Set(sptSet).size
    }
}

//Dijkstra shortest path algorithm using Prim’s Algorithm in O(V2):
export const getShortestPathDistance = (points: ChitonGrid, start: Point, destination: Point) => {
    return getShortestPath(points, start, destination).distance;
}

export type Range = {
    min: number,
    max: number
}



export const mergeRanges = (...ranges: Range[]): Range[] => {
    const sortedRanges = ranges.sort((a, b) => a.min - b.min);
    const mergedRanges: Range[] = [];
    let currentRange = sortedRanges[0];
    for (let i = 1; i < sortedRanges.length; i++) {
        const nextRange = sortedRanges[i];
        if (nextRange.min <= currentRange.max) {
            currentRange.max = Math.max(currentRange.max, nextRange.max);
        } else {
            mergedRanges.push(currentRange);
            currentRange = nextRange;
        }
    }
    mergedRanges.push(currentRange);
    return mergedRanges;
}

export const countValuesInRanges = (...ranges: Range[]): number => {
    return ranges.reduce((acc, range) => acc + (range.max - range.min + 1), 0)
}