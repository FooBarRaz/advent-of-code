import {Grid, Point} from "../../utils/grid";
import {splitLines} from "../../utils/dataReader";
import {fillArray} from "../../utils/listOps";

export class OctopusGrid extends Grid<Octopus> {
    private _flashCount: number;

    constructor(octopi: Array<Array<Octopus>>) {
        super(octopi);
        this._flashCount = 0
    }

    countFlash() {
        this._flashCount += 1
    }

    public get flashes() {
        return this._flashCount
    }
}

export class Octopus {
    private _hasFlashedInThisStep: boolean

    constructor(public energyLevel: number) {
        this._hasFlashedInThisStep = false;
    }

    resetFlashFlag() {
        this._hasFlashedInThisStep = false
    }

    public get hasFlashed() {
        return this._hasFlashedInThisStep
    }

    tick() {
        this.energyLevel += 1
    }

    flash(grid: OctopusGrid, position: Point) {
        this.energyLevel = 0
        grid.countFlash()
        this._hasFlashedInThisStep = true
        grid.getAdjacentPoints(position)
            .forEach(adjacentOctopus => adjacentOctopus.value.receiveFlash(grid, adjacentOctopus.point))
    }

    receiveFlash(grid: OctopusGrid, position: Point) {
        if (!this.hasFlashed) {
            this.energyLevel += 1
            if (this.energyLevel > 9) {
                this.flash(grid, position)
            }
        }
    }

    toString() {
        return this.energyLevel
    }
}


export const parseInput = (input: string): OctopusGrid => {
    let rowsOfOctopi = splitLines(input)
        .map(eachRowOfNumbers => {
            return eachRowOfNumbers.split('').map(str => Number.parseInt(str))
                .map(eachNumber => new Octopus(eachNumber))
        });
    return new OctopusGrid(rowsOfOctopi);
}

export const doStep = (grid: OctopusGrid) => {
    grid.rows.forEach(octopusRow => octopusRow.forEach(octopus => {
        octopus.resetFlashFlag()
        octopus.tick();
    }))

    grid.rows.forEach((octopusRow, row) => octopusRow.forEach((octopus, column) => {
        if (octopus.energyLevel > 9) {
            octopus.flash(grid, new Point(row, column))
        }
    }))
}

export const solveProblem1 = (input: string): number => {
    const grid = parseInput(input)
    fillArray(100).forEach(x => doStep(grid))
    return grid.flashes;
}

export const solveProblem2 = (input: string): number => {
    const grid = parseInput(input)
    let allOctopiFlashed = false;
    let counter = 0
    while (!allOctopiFlashed) {
        doStep(grid)
        counter++
        allOctopiFlashed = grid.allCells.every(cell => cell.energyLevel === 0)
    }

    return counter;
}
