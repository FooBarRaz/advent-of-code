import {fillRange} from "../../../utils/listOps";

export const parseInput = (input: string) => {
    const [min, max] = input.split('-').map(each => Number.parseInt(each))
    return {min, max}
}

export const solveProblem1 = (input: string): number[] => {
    const range = parseInput(input)
    return fillRange(range.min, range.max)
        .map(num => num.toString())
        .filter(numAsString =>
            numAsString.split('').every((digit, index, initialArray) =>
                Number.parseInt(digit) >= (initialArray[index - 1] || 0)))
        .filter(numAsString =>
            numAsString.split('').some((digit, index, initialArray) =>
                digit === (initialArray[index - 1] || '')))
        .map(str => Number.parseInt(str))
}

export const solveProblem2 = (input: string): number[] => {
    const range = parseInput(input)
    return fillRange(range.min, range.max)
        .map(num => num.toString())
        .filter(numAsString =>
            numAsString.split('').every((digit, index, initialArray) =>
                Number.parseInt(digit) >= (initialArray[index - 1] || 0)))
        .filter(numAsString =>
            numAsString.split('').some((digit, index, initialArray) => {
                const occurrencesOfDigit = initialArray.reduce((prev, curr) => curr === digit ? prev + 1 : prev, 0)
                return occurrencesOfDigit === 2
            }))
        .map(str => Number.parseInt(str))
}
