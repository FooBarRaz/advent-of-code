export type NumberOrNumberArray = number | number[] | Array<NumberOrNumberArray>;

export const parseInput = (input: string): Array<Array<NumberOrNumberArray>> => {
    const pairs = input.split('\n\n')
    return pairs.map(pair => {
        const lines = pair.split('\n')
        return lines.map(line => eval(line))
    })
}

export const parseInput2 = (input: string): Array<NumberOrNumberArray> => {
    const lines = input.split('\n')
        .filter(line => line.length > 0)

    return lines.map(line => eval(line))
}

export function isInOrder(left: NumberOrNumberArray, right: NumberOrNumberArray): boolean {
    // If both values are integers, return whether the left integer is less than the right integer
    if (typeof left === 'number' && typeof right === 'number') {
        if (left !== right) {
            return left < right
        }
        if (left === right) {
            return undefined
        }
    }

    // If both values are arrays, compare their elements recursively
    if (Array.isArray(left) && Array.isArray(right)) {
        for (let i = 0; i < left.length && i < right.length; i++) {
            const ordered = isInOrder(left[i], right[i]);
            if (ordered !== undefined) {
                return ordered;
            }
        }
        return left.length <= right.length;
    }

    // If exactly one value is an integer, convert it to a list and retry the comparison
    if (typeof left === 'number') {
        return isInOrder([left], right);
    }
    return isInOrder(left, [right]);
}

export const problem1 = (input: string): number => {
    const pairs = parseInput(input)
    return pairs
        // sum up indices of pairs that are in order
        .reduce((prev, curr, index) => {
            const ordered = isInOrder(curr[0], curr[1])
            if (ordered) {
                return prev + index + 1
            }
            return prev
        }, 0)
}

export const problem2 = (input: string): number => {
    const allPackets = parseInput2(input)
    const dividers = [[[2]], [[6]]];
    allPackets.push(...dividers)

    const indices = allPackets.sort((left, right) => {
        const ordered = isInOrder(left, right)
        if (ordered === undefined) {
            return 0
        }
        return ordered ? -1 : 1
    })
        .reduce((prev: Array<number>, curr: NumberOrNumberArray, index) => {
            if (dividers.includes(curr as any)) {
                prev.push(index + 1)
            }
            return prev as Array<number>;
        }, [] as Array<number>) as Array<number>

    return indices.reduce((a,b) => a * b, 1)
}