import {isEqual, isNumber} from "lodash";

export type ArrayOfNumbers = number[] | Array<ArrayOfNumbers>
export const parseInput = (input: string): ArrayOfNumbers => {
    const pairs = input.split('\n\n')
    return pairs.map(pair => {
        const lines = pair.split('\n')
        return lines.map(line => eval(line))
    })
}


function compareArray(left: ArrayOfNumbers, right: ArrayOfNumbers): boolean | undefined {
    if (isEqual(left, right)) return undefined;
    let itemsChecked = 0;
    let lastComparison: boolean | undefined;
    while (itemsChecked < left.length) {
        if (right[itemsChecked]) {
            lastComparison = comparePair(left[itemsChecked], right[itemsChecked])
            if (lastComparison === false) {
                return lastComparison
            }
            itemsChecked = itemsChecked + 1
        } else {
            return false
        }
    }
    // if (left.length < right.length) {
    return true
    // }
    // return lastComparison
    // return left.every((leftItem, index) => {
    //     if (right[index]) {
    //         return comparePair(leftItem, right[index])
    //     }
    //     else return -1
    //     // return right[index] && comparePair(leftItem, right[index]) >= 0;
    // }) ? 1 : -1
}

export const comparePair = (left: number | ArrayOfNumbers, right: number | ArrayOfNumbers): boolean | undefined => {
    if (isNumber(left) && isNumber(right)) {
        if (left < right) {
            return true
        } else if (right < left) {
            return false
        }
        return undefined
    }
    if (Array.isArray(left) && Array.isArray(right)) {
        return compareArray(left, right)
    }
    const integerValues = [left, right].filter(val => isNumber(val));
    if (integerValues.length === 1) {

        const [newLeft, newRight] = [left, right].map(val => {
            if (isNumber(val)) {
                return [val]
            } else return val
        })

        return compareArray(newLeft, newRight)
    }
    throw new Error('wtf')

}