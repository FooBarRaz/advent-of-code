import { Point, getShortestPath, Grid, vertexWithShortestDistance } from "../../../utils/grid";
import {ChitonGrid} from "../../2021/day15/problemSolver";

const CHAR_CODE_BASE = 97;

export class HillGrid extends ChitonGrid {
    public readonly startingPoint: Point;
    public readonly endingPoint: Point;

    constructor(rows: Array<Array<number>>) {
        super(rows);
        this.startingPoint = this.findStartingCell();
        this.endingPoint = this.findEndingCell();
        this.setCell(this.startingPoint, 0);
        this.setCell(this.endingPoint, 25);
    }

    private findStartingCell(): Point {
        return this.findCellByValue('S'.charCodeAt(0) - CHAR_CODE_BASE)
    }

    private findEndingCell(): Point {
        return this.findCellByValue('E'.charCodeAt(0) - CHAR_CODE_BASE)
    }

}

export const parseInput = (input: string): HillGrid => {
    let rows = input.split('\n').map(eachRow => eachRow.split('')
        .map(eachCell => eachCell.charCodeAt(0) - CHAR_CODE_BASE));

    return new HillGrid(rows)
}

export const problem1 = (input: string) => {
    const grid = parseInput(input)
    const result = getShortestPath(grid, grid.startingPoint, grid.endingPoint, true)
    return result.distance
}

export function getShortestPathProblem2(points: Grid<number>, start: Point, destination: (point: Point) => boolean) {
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
    let currentVertex: Point;
    while (unvisitedVertices().length) {
        currentVertex = vertexWithShortestDistance(unvisitedVertices(), distances);
        sptSet.push(currentVertex)
        if (destination(currentVertex)) {
            break
        }
        const neighbors = points.getAdjacentPoints(currentVertex, false);
        neighbors.forEach(neighbor => {
            const neighborString = neighbor.point.toString()
            const currentVertexString = currentVertex.toString()
            let distanceToNeighbor: number;
            // if neighbor is higher, or is no lower than 1 step, we can go there
            if (neighbor.value - points.getPointValue(currentVertex) > 1) {
                distanceToNeighbor = 1
            }

            if (points.getPointValue(currentVertex) - neighbor.value <= 1) {
                distanceToNeighbor = distances[currentVertexString] + 1;
            } else {
                distanceToNeighbor = Number.MAX_VALUE
            }

            if (distanceToNeighbor < distances[neighborString]) {
                distances[neighborString] = distanceToNeighbor
            }
        })
    }
    return {
        distance: distances[currentVertex.toString()],
        pathLength: new Set(sptSet).size
    }
}

export const problem2 = (input: string) => {
    const grid = parseInput(input)
    // get all points at elevation 0
    const pointsAtElevation0 = grid.allPoints().filter(eachPoint => grid.getPointValue(eachPoint) === 0)
    // get all distances from
    // const distances = pointsAtElevation0.map(eachPoint => getShortestPath(grid, eachPoint, grid.endingPoint, true).distance)
    // return Math.min(...distances)
    const distance = getShortestPathProblem2(grid, grid.endingPoint, point => grid.getPointValue(point) === 0).distance
    return distance
}