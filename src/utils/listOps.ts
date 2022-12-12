export const sum = (nums: Array<number>) => {
    return nums.reduce((prev, curr) => prev + curr, 0);
}

export const fillArray  = (length: number) => Array(length).fill(null).map((_,index) => index)

export const fillRange = (min: number, max: number) => Array(++max - min)
    .fill(null)
    .map((_, i) => min+i)

export const groupBy = <T>(grouping: number, input: Array<T>): Array<Array<T>> => {
    return input.reduce((acc, item, index) => {
        if (index % grouping === 0) {
            acc.push([])
        }
        acc[acc.length - 1].push(item)
        return acc
    }, [] as Array<Array<T>>) as Array<Array<T>>
}