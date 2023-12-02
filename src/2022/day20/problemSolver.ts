export const parseInput = (input: string): number[] => {
    return input.split('\n')
        .map(Number)
}

export const mix = (numbers: number[]): number[] => {
    return numbers.reduce((acc, number, index) => {
        const originalNumber = numbers[index]
        const newIndex = (originalNumber + index) % numbers.length
        /***
         * Initial arrangement:
         * 1, 2, -3, 3, -2, 0, 4
         *
         * 1 moves between 2 and -3:
         * 2, 1, -3, 3, -2, 0, 4
         */
        acc.splice(newIndex, 0, originalNumber)

        return acc
    }, [...numbers])
}