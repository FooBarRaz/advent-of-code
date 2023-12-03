import {splitLines} from "../../../utils/dataReader";
import {each} from "lodash";
import {sum} from "../../../utils/listOps";

const charSets = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

const scores = {
    /**
     * ): 3 points.
     ]: 57 points.
     }: 1197 points.
     >: 25137 points.
     */

    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}
export const validateLine = (line: string) => {
    const expectedClosingChars = []
    for (let char of line.split('')) {
        if (char in charSets) {
            expectedClosingChars.push(charSets[char])
        } else if (char !== expectedClosingChars.pop()) {
            return [char]
        }
    }
    return []
}

const lineCompletionScore = {
     ')': 1,
     ']': 2,
     '}': 3,
     '>': 4,
}

export const scoreLineCompletion = (line: string):number =>  {
   return line.split('')
       .reduce((prev, curr) => {
           return (prev * 5) + lineCompletionScore[curr]
       }, 0)
}

export const completeLine = (line: string): string => {
    const expectedClosingChars = []
    for (let char of line.split('')) {
        if (char in charSets) {
            expectedClosingChars.push(charSets[char])
        }  else if (char !== expectedClosingChars.pop()) {
            throw new Error('corrupted line')
        }
    }
    return expectedClosingChars.reverse().join('')
}

export const scoreSyntaxErrors = (input: string): number => {
    return sum(splitLines(input)
        .map(eachLine => validateLine(eachLine))
        .reduce((prev, curr) => [...prev, ...curr], [])
        .map(eachIllegalChar => scores[eachIllegalChar]))
}

export const solveProblem2 = (input: string): number => {
    const sortedScores = splitLines(input)
        .filter(line => validateLine(line).length === 0)
        .map(incompleteLines => completeLine(incompleteLines))
        .map(completions => scoreLineCompletion(completions))
        .sort((a, b) => a - b)

    return sortedScores[Math.floor(sortedScores.length / 2)];
}
