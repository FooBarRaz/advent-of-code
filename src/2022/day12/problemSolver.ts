import {getShortestPath, getShortestPathDistance, Point} from "../../utils/grid";
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
    return result.pathLength
}