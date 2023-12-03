import {groupBy} from "../../../utils/listOps";

export type BoxStacks = Record<string, string[]>

export type MoveOperation = {
    quantity: number
    from: string
    to: string
}

export type Instructions = {
    initialState: any | BoxStacks
    operations: any | Array<MoveOperation>
}

const parseOperations = (rawInstructions: string): Array<MoveOperation> => {
    return rawInstructions.split('\n').map(line => {
        const [, quantityStr, , from, , to] = line.split(' ')
        return {quantity: parseInt(quantityStr), from, to}
    })
}

export const parseRawState = (rawState: string): BoxStacks => {
    const groupedLines = rawState.split('\n').map(line => {
            return groupBy(4, line.split(''))
        }
    )
    // so we can read bottom up from box numbers
    const [boxIdsLine, ...boxStacks] = groupedLines.reverse()
    const boxIds = (boxIdsLine as string[][]).flatMap(line => line.filter(line => line.trim().length > 0))
        .reduce((acc, id, index) => {
            acc[id] = []
            return acc
        }, {});

    (boxStacks as string[][][]).forEach((stack, index) => {
        stack.map(eachColumn => eachColumn[1]).forEach((boxId, boxIndex) => {
            if(boxId.trim()) {
                boxIds[`${boxIndex + 1}`].push(boxId);
            }
        })
    })


    return boxIds;
}

export const parseInput = (input: string): Instructions => {
    const [rawState, rawInstructions] = input.split('\n\n')
    return {
        initialState: parseRawState(rawState),
        operations: parseOperations(rawInstructions)
    }
}

export const performOperation9000 = (initialState: BoxStacks, operation: MoveOperation): BoxStacks => {
    for (let i = operation.quantity; i > 0; i--) {
        const poppedBox = initialState[operation.from].pop()
        initialState[operation.to].push(poppedBox)
    }

    return initialState
}

export const performOperation9001 = (initialState: BoxStacks, operation: MoveOperation): BoxStacks => {
    const boxesToMove = initialState[operation.from].splice(initialState[operation.from].length - operation.quantity)
    initialState[operation.to].push(...boxesToMove)
    return initialState
}

export const problem1 = (input: string): string => {
    const {initialState, operations} = parseInput(input)
    const finalState = operations.reduce(performOperation9000, initialState)
    return Object.values(finalState).reduce((acc, stack: []) => `${acc}${stack.pop()}`, '') as string
}

export const problem2 = (input: string): string => {
    const {initialState, operations} = parseInput(input)
    const finalState = operations.reduce(performOperation9001, initialState)
    return Object.values(finalState).reduce((acc, stack: []) => `${acc}${stack.pop()}`, '') as string
}
