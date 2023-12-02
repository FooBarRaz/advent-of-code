export const isEntirelyDistinct = (array: string[]) => new Set(array).size === array.length;

export const findFirstPositionWherePreviousNCharactersWereUnique = (numberOfChars: number, input: string): number => {
    return input.split('')
        .slice(numberOfChars - 1) // skip the first n characters
        .findIndex((_, index) => {
            const previousNChars = input.slice(index, index + numberOfChars)
            return isEntirelyDistinct(previousNChars.split(''))
        }) + numberOfChars // re-align the index bc of the skip
}

export const problem1 = (data: string) => findFirstPositionWherePreviousNCharactersWereUnique(4, data)
export const problem2 = (data: string) => findFirstPositionWherePreviousNCharactersWereUnique(14, data)