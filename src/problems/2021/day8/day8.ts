import { fillArray, sum } from "../../../utils/listOps";
import {splitLines} from "../../../utils/dataReader";

const delimiter = ' | ';

export type Signal = {
    input: Array<string>
    output: Array<string>
}

export const parseInput = (data: string): Array<Signal> => {
    return splitLines(data).map(eachLine => {
        const [rawInput, rawOutput] = eachLine.split(delimiter)
        return {
            input: rawInput.split(' ').map(each => each.split('').sort().join('')),
            output: rawOutput.split(' ').map(each => each.split('').sort().join('')),
        }
    })
}

export const groupByCharCount = (data: string[]): Record<number, string[]> => {
    return data.reduce((prev, curr) => {
        curr.split(' ')
            .forEach(each => {
                prev[each.length] = [...(prev[each.length] || []), each]
            })
        return prev
    }, {})
}

export const occurrencesByDigit = (data: string[]): Record<number, number> => {
    const uniqueCharCounts = {
        2: 1,
        4: 4,
        3: 7,
        7: 8
    }

    let groupedByCharCount = groupByCharCount(data);
    return Object.entries(groupedByCharCount)
        .map(([numOfChars, entries]) => {
            const potentialDigit = uniqueCharCounts[numOfChars] || -1
            return {[potentialDigit]: entries.length}
        })
        .filter(x => !Object.keys(x).includes('-1'))
        .reduce((prev, curr) => {
            return {...prev, ...curr}
        }, {}) as any
}

type DigitFinder = (signals: string[]) => string | undefined

export const getEncodedDigitUsingInputSignal: Record<number, DigitFinder> = {
    0: (signals) => {
        let signalFor6 = getEncodedDigitUsingInputSignal[6](signals)
        let signalFor9 = getEncodedDigitUsingInputSignal[9](signals)
        return signals
            .filter(s => s.length === 6)
            .find(s => ![signalFor6, signalFor9].includes(s))
    },
    1: (signals) => signals.find(signal => signal.length === 2),
    2: (signals) => {
        let signalFor5 = getEncodedDigitUsingInputSignal[5](signals)
        let signalFor3 = getEncodedDigitUsingInputSignal[3](signals)
        return signals
            .filter(s => s.length === 5)
            .find(s => ![signalFor3, signalFor5].includes(s))
    },
    3: (signals) => {
        let signalFor1 = getEncodedDigitUsingInputSignal[1](signals).split('');
        return signals
            .filter(signal => signal.length === 5)
            .find(fiveDigits => signalFor1.every(ch => fiveDigits.split('').includes(ch)));
    },
    4: (signals) => signals.find(signal => signal.length === 4),
    5: (signals) => {
        let signalFor1 = getEncodedDigitUsingInputSignal[1](signals).split('');
        let signalFor4 = getEncodedDigitUsingInputSignal[4](signals).split('');
        let remainingChars = signalFor4.filter(x => !signalFor1.includes(x))
        let signalFor3 = getEncodedDigitUsingInputSignal[3](signals);
        return signals
            .filter(s => s.length === 5)
            .filter(s => s !== signalFor3)
            .find(s => remainingChars.every(x => s.includes(x)))
    },
    6: (signals) => {
        const signalFor1 = getEncodedDigitUsingInputSignal[1](signals).split('')
        const signalFor8 = getEncodedDigitUsingInputSignal[8](signals).split('')
        return signals
            .filter(s => s.length === 6)
            .find(s => {
                const chars = s.split('')
                chars.push(...signalFor1)
                return signalFor8.every(s => chars.includes(s))
            })
    },
    7: (signals) => signals.find(signal => signal.length === 3),
    8: (signals) => signals.find(signal => signal.length === 7),
    9: (signals) => {
        let signalFor3 = getEncodedDigitUsingInputSignal[3](signals).split('');
        let signalFor6 = getEncodedDigitUsingInputSignal[6](signals)
        return signals.filter(s => s.length === 6)
            .filter(s => s !== signalFor6)
            .find(s => signalFor3.every(three => s.split('').includes(three)))
    }

}

export const decodeOutput = (signal: Signal): number => {
    const encodedSignalToValue = signal.input
        .reduce((prev, eachSignal) => {
            let digit = fillArray(10).find(val => getEncodedDigitUsingInputSignal[val](signal.input) === eachSignal);
            return {...prev, [eachSignal]: digit}
        }, {})

    return Number.parseInt(signal.output
        .reduce((prev, eachOutput) => {
            return prev + encodedSignalToValue[eachOutput]
        }, ''))
}

export const solveProblem1 = (data: string): number => {
    return parseInput(data).map(line => line.output)
        .map(output => occurrencesByDigit(output))
        .reduce((prev, curr) =>
            prev + sum(Object.values(curr)), 0)
}

export const solveProblem2 = (data: string): number =>
    parseInput(data)
        .reduce((prev, eachLine) => prev + decodeOutput(eachLine), 0)
