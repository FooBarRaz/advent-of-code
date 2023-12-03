import { Grid, Point } from "../../../utils/grid";

export class VisibilityGrid extends Grid<number> {

    constructor(rows: number[][]) {
        super(rows);
    }

    countVisibleCells(): number {
        return this.allPoints().reduce((prev, point) => {
            if (this.isVisible(point)) {
                return prev + 1
            }
            return prev;
        }, 0)
    }

    isVisible(cell: Point): boolean {
        let value = this.getPointValue(cell);
        return this.isBoundaryCell(cell)
            || this.scanLeft(cell, value)
            || this.scanRight(cell, value)
            || this.scanUp(cell, value)
            || this.scanDown(cell, value);
    }

    private scanLeft(cell: Point, originalValue: number): boolean {
        if (cell.x > 0) {
            return this.getPointLeft(cell).value < originalValue
                && this.scanLeft(new Point(cell.x - 1, cell.y), originalValue)
        }
        return this.getPointValue(cell) < originalValue
    }

    private scanRight(cell: Point, originalValue: number): boolean {
        if (cell.column < this.columns.length - 1) {
            return this.getPointRight(cell).value < originalValue
                && this.scanRight(new Point(cell.x + 1, cell.y), originalValue)
        }
        return this.rows[cell.row][cell.column] < originalValue
    }

    private scanUp(cell: Point, originalValue: number): boolean {
        if (cell.row > 0) {
            return this.getPointAbove(cell).value < originalValue
                && this.scanUp(new Point(cell.x, cell.y + 1), originalValue)
        }
        return this.rows[cell.row][cell.column] < originalValue
    }

    private scanDown(cell: Point, originalValue: number): boolean {
        if (cell.row < this.rows.length - 1) {
            return this.getPointBelow(cell).value < originalValue
                && this.scanDown(new Point(cell.x, cell.y - 1), originalValue)
        }
        return this.rows[cell.row][cell.column] < originalValue
    }

    private isBoundaryCell(cell: Point) {
        return cell.row === 0 || cell.row === this.rows.length - 1 || cell.column === 0 || cell.column === this.columns.length - 1
    }

    scenicScore(point: Point): number {
        const directionizers = {
            up: (point) => new Point(point.x, point.y + 1),
            left: (point) => new Point(point.x - 1, point.y),
            down: (point) => new Point(point.x, point.y -1),
            right: (point) => new Point(point.x + 1, point.y),
        }

        return Object.entries(directionizers).reduce((prev, [key, val]) => {
            const numberOfTreesVisibleToTheDirection = this.scanInDirection(point, val, this.value(point));
            return prev * numberOfTreesVisibleToTheDirection;
        }, 1)
    }


    private scanInDirection(point: Point, directionizer: (point) => Point, originalValue: number, count = 0) {
       const nextCell = directionizer(point);
       if(nextCell.column >= 0 && nextCell.row >= 0 && nextCell.column < this.columns.length && nextCell.row < this.rows.length) {
           const nextCellValue = this.value(nextCell);
           if (nextCellValue < originalValue) {
               return this.scanInDirection(nextCell, directionizer, originalValue, ++count);
           }
           else return ++count
       }
       return count;
    }
}

export const parseInput = (input: string): VisibilityGrid => {
    const rows = input.split('\n').map(eachRow => eachRow
        .split('').map(num => parseInt(num)))
    return new VisibilityGrid(rows)
}

export const problem2 = (input: string): number  => {
   const grid = parseInput(input);
   const scenicScores = grid.allPoints().map(point => grid.scenicScore(point));
   return Math.max(...scenicScores)
}