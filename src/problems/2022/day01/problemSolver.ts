import {data} from "./data";

type ElfPack = {
    food: Array<number>
    totalCalories: number
};
export const parseInput = (data: string): Array<ElfPack> =>  {
    return data.split('\n\n').map((eachElf) => {
        const foodItems = eachElf.split('\n').map(item => Number.parseInt(item))
        const totalCalories = foodItems.reduce((acc, curr) => acc + curr, 0)
        return {
            food: foodItems,
            totalCalories
        }
    });
}

const getMaxCalories = (elfPack: Array<ElfPack>): number => {
    return Math.max(...elfPack.map(eachElf => eachElf.totalCalories));
}

const sortByCalories = (elfPack: Array<ElfPack>): Array<ElfPack> => {
    return elfPack.sort((a, b) => b.totalCalories - a.totalCalories);
}

export const solveProblem1 =  () => {
    const elfPack  = parseInput(data)
    return getMaxCalories(elfPack)
}

export const solveProblem2 =  () => {
    const elfPack  = parseInput(data)
    const sortedElfPack = sortByCalories(elfPack)
    const top3Elves = sortedElfPack.slice(0, 3)
    const totalCalories = top3Elves.map(x => x.totalCalories).reduce((acc, curr) => acc + curr, 0)
    return totalCalories
}
