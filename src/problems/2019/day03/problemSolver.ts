import {Program} from "../../../utils/intcode";

const updateInstructions = (value, index) => {
        if (index === 1) {
            return 12
        }
        if (index === 2) {
            return 2
        }
        return value
    };

export const solve1 = (data: Array<number>) => {
    const updatedData = data.map(updateInstructions)
    const intCode = new Program(updatedData);
    return intCode.process()[0];
}

export const solve2 = (data: Array<number>) => {
    const updatedData = data.map(updateInstructions)
    const intCode = new Program(updatedData);
}