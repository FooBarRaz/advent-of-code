import {fillArray} from "./listOps";
import {ChitonGrid} from "../2021/day15/problemSolver";

export class Point {
    constructor(private _row: number, private _column: number) {
    }

    static fromString(stringPoint: string): Point {
        const [row, column ] = stringPoint.replace('(', '').replace(')', '').split(',')
        return new Point(parseInt(row), parseInt(column))
    }


    public get row() {
        return this._row
    }

    public get column() {
        return this._column
    }

    equals(other: Point): boolean {
        return this.row === other.row && this.column === other.column
    }

    toString(): string {
        return `(${this.row},${this.column})`
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
            const points = row.map((_, columnIndex) => new Point(rowIndex, columnIndex))
            return [...prev, ...points]
        }, []);
        return ts as Point[];
    }

    getPointValue(point: Point): T {
        return this.rows[point.row][point.column]
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

    getPointAbove(point: Point) {
        let row = point.row - 1;
        let column = point.column;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointAboveRight(point: Point) {
        let row = point.row -1;
        let column = point.column + 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointRight(point: Point) {
        let row = point.row;
        let column = point.column + 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointBelowRight(point: Point) {
        let row = point.row +1; let column = point.column + 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointBelow(point: Point) {
        let row = point.row + 1;
        let column = point.column;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointBelowLeft(point: Point) {
        let row = point.row + 1;
        let column = point.column -1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointLeft(point: Point) {
        let row = point.row;
        let column = point.column - 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    getPointAboveLeft(point: Point) {
        let row = point.row - 1;
        let column = point.column - 1;
        return { value: this.rows[row]?.[column], point: new Point(row, column) };
    }

    setCell(point: Point, value: T) {
      this.rows[point.row][point.column] = value
    }

    print(separator = ',') {
        const text = this.rows.map(eachRow => eachRow.join(separator)).join('\n')
        console.log(text)
    }

    public get allCells(): Array<T> {
        return this.rows.reduce((prev, curr) => [...prev, ...curr ], [])
    }
}

function vertexWithShortestDistance(vertices: Point[], distances: Record<string, number>) {
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
            if (hillClimber && points.getPointValue(currentVertex) < points.getPointValue(currentVertex)) {
                distanceToNeighbor = 0
            }
            else {
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