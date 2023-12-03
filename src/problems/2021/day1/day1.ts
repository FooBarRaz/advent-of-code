import {fillArray, sum} from "../../../utils/listOps";
import {parseNumbers} from "../../../utils/dataReader";

const threeples = (input: Array<number>): Array<Array<number>> =>
    fillArray(input.length - 2)
        .map((index) => input.slice(index, index + 3));

const countIncreases = (input: Array<number>): number =>
    input.filter((val, index) => val > input[index - 1]).length

const solveProblem1 = (data: string) => countIncreases(parseNumbers(data));

const solveProblem2 = (data: string) =>
    countIncreases(threeples(parseNumbers(data))
        .reduce((prev, curr) => [...prev, sum(curr)], []));


export {threeples, countIncreases, solveProblem1, solveProblem2}
