import {groupBy, isEqual, isNumber} from "lodash";

export type ArrayOfNumbers = number[] | Array<ArrayOfNumbers>
export const parseInput = (input: string): ArrayOfNumbers => {
    const pairs = input.split('\n\n')
    return pairs.map(pair => {
        const lines = pair.split('\n')
        return lines.map(line => eval(line))
    })
}


function compareArray(left: ArrayOfNumbers, right: ArrayOfNumbers): -1 | 0 | 1 {
    if (isEqual(left, right)) return 0;
    let itemsInLeft = left.length;
    while(itemsInLeft--) {
        if (right[itemsInLeft]) {
            const comparison = comparePair(left[itemsInLeft], right[itemsInLeft])
            if (comparison === -1) {
                return -1
            }
        }
        return -1
    }
    if (left.length < right.length) {
        return 1
    }
    // return left.every((leftItem, index) => {
    //     if (right[index]) {
    //         return comparePair(leftItem, right[index])
    //     }
    //     else return -1
    //     // return right[index] && comparePair(leftItem, right[index]) >= 0;
    // }) ? 1 : -1
}

export const comparePair = (left: number | ArrayOfNumbers, right: number | ArrayOfNumbers): -1 | 0 | 1 => {
    if (isNumber(left) && isNumber(right)) {
        if(left < right) {
            return 1
        }
        else if (right < left) {
            return -1
        }
        return 0
    }
    if (Array.isArray(left) && Array.isArray(right)) {
        return compareArray(left, right)
    }
    const intergerValues = [left, right].filter(val => isNumber(val));
    if(intergerValues.length === 1) {

       const [newLeft, newRight] =  [left, right].map(val => {
            if(isNumber(val)) {
                return [val]
            }
            else return val
        })

        return compareArray(newLeft, newRight)
    }
    throw new Error('wtf')

}