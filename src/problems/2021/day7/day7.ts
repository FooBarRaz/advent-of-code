import {fillRange} from "../../../utils/listOps";

type FuelCostFunction = (fromPosition: number, toPosition: number) => number;

const calculateFuelCost = (fuelCostFunction: FuelCostFunction) => (currentPositions: number[]): number => {
    const [rangeMin, rangeMax] = [Math.min(...currentPositions), Math.max(...currentPositions)]
    return fillRange(rangeMin, rangeMax)
        .reduce((prev, position) => {
            const costToGetToPosition = currentPositions
                .reduce((acc, curr) => acc + fuelCostFunction(curr, position), 0)
            return prev === 0 || costToGetToPosition < prev ? costToGetToPosition : prev;
        }, 0)
}

const fuelCostTriangular = (fromPosition: number, toPosition: number) => {
    const numberOfMovesNeeded = Math.abs(fromPosition - toPosition);
    return (numberOfMovesNeeded * (numberOfMovesNeeded + 1)) / 2
};

const fuelCostConstant = (fromPosition: number, toPosition: number): number => Math.abs(fromPosition - toPosition)

export const optimalFuelCostConstant = (positions: number[]) => calculateFuelCost(fuelCostConstant)(positions)
export const optimalFuelCostTriangular = (positions: number[]) => calculateFuelCost(fuelCostTriangular)(positions)
