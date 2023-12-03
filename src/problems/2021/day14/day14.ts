import {splitLines} from "../../../utils/dataReader";

export const getPairs = (input: string): string[] => {
    return input.split('').reduce((prev, curr, index, originalArray) => {
        const nextChar = originalArray[index + 1]
        if (nextChar) {
            prev.push(curr + nextChar)
        }
        return prev
    }, [])
}

type InsertionRule = {
    pair: string;
    insert: string;
}
export const parseInsertionRules = (input: string): InsertionRules => {
    return splitLines(input)
        .map(eachLine => {
            const [pair, insert] = eachLine.split(' -> ')
            return {pair, insert}
        }).reduce((prev, curr) => ({...prev, [curr.pair]: curr.insert}), {})
}

type InsertionRules = { [p: string]: string };
export const insert = (polymerTemplate: string, insertionRules: InsertionRules): string => {
    const pairs = getPairs(polymerTemplate)
        .reduce((prev, curr) => ({...prev, [curr]: (prev[curr] || 0) + 1}), {})

    let strings = getPairs(polymerTemplate)
        // .forEach((eachPair, index) => {
        //     polymerTemplateAsArray.splice(index , 0, insertionRules[eachPair])
        // })
        // .reduce((prev, curr) => {}, '')
        .map(eachPair => {
            const insert = insertionRules[eachPair]
            const [first, last] = eachPair
            return `${first}${insert}`
        });
    return strings.join('') + polymerTemplate.charAt(polymerTemplate.length - 1)
}

export const insertRecursively = (polymerTemplate: string, insertionRules: InsertionRules, triesRemaining: number): string => {
    if (triesRemaining) {
        const newString = insert(polymerTemplate, insertionRules)
        return insertRecursively(newString, insertionRules, --triesRemaining)
    }
    return polymerTemplate
}

export const problem1 = (polymerTemplate: string, insertionRules: InsertionRules): number => {
    // const resultAfter10Tries = insertRecursively(polymerTemplate, insertionRules, 10)
    // const lettersByOccurrence: { [k: string]: number } = resultAfter10Tries.split('')
    //     .reduce((prev, curr) => {
    //         prev[curr] = (prev[curr] || 0) + 1
    //         return prev
    //     }, {})
    //
    // const mostFrequentlyOccurringValue = Math.max(...Object.values(lettersByOccurrence))
    // const leastFrequentlyOccurringValue = Math.min(...Object.values(lettersByOccurrence))
    // // const [mostFrequentLetter] = Object.entries(lettersByOccurrence).find(([key, val]) => val === mostFrequentlyOccurringValue)
    // // const [leastFrequentLetter] = Object.entries(lettersByOccurrence).find(([key, val]) => val === leastFrequentlyOccurringValue)
    // return mostFrequentlyOccurringValue - leastFrequentlyOccurringValue;
    return doTheThing(polymerTemplate, insertionRules, 10)
}
const processRecursively = (pairMap: Record<string, number>, insertionRules: InsertionRules, triesRemaining: number): Record<string, number> => {
    if (triesRemaining) {
        const updatedPairCountMap = Object.keys(pairMap)
            .reduce((pairCountMap, currentPair) => {
                const [firstChar, secondChar] = currentPair
                const insertionRuleForPair = insertionRules[currentPair]
                if (insertionRuleForPair) {
                    const firstPair = `${firstChar}${insertionRuleForPair}`
                    const secondPair = `${insertionRuleForPair}${secondChar}`
                    pairCountMap[firstPair] = (pairCountMap[currentPair] || 0)+ 1
                    pairCountMap[secondPair] = (pairCountMap[currentPair] || 0) + 1
                }
                return pairCountMap
            }, {...pairMap});

        return processRecursively(updatedPairCountMap, insertionRules, --triesRemaining)
    }
    return pairMap;
}

function doTheThing(polymerTemplate: string, insertionRules: InsertionRules, iterations: number) {
    const pairs = getPairs(polymerTemplate)
        .reduce((prev, curr) => ({...prev, [curr]: (prev[curr] || 0) + 1}), {})

    const pairCounts = processRecursively(pairs, insertionRules, iterations);

    // track each letter's occurrence coarsely
    const firstPass = Object.entries(pairCounts).reduce((prev, [pair, count]) => {
        const [firstChar, secondChar] = pair
        return ({
            ...prev,
            [firstChar]: (prev[firstChar] || 0) + count,
            [secondChar]: (prev[secondChar] || 0) + count,
        })
    }, {});

    // account for first and last letters
    firstPass[polymerTemplate.charAt(0)] = (firstPass[polymerTemplate.charAt(0)] || 0) + 1
    firstPass[polymerTemplate.charAt(polymerTemplate.length - 1)] = (firstPass[polymerTemplate.charAt(polymerTemplate.length - 1)] || 0) + 1

    const lettersByOccurrence = Object.entries(firstPass).reduce((prev, [letter, count]) => {
        return {
            ...prev,
            [letter]: Math.floor(count as number / 2)
        }
    }, {...firstPass});


    const mostFrequentlyOccurringValue = Math.max(...Object.values(lettersByOccurrence) as number[])
    const leastFrequentlyOccurringValue = Math.min(...Object.values(lettersByOccurrence) as number[])
    return mostFrequentlyOccurringValue - leastFrequentlyOccurringValue;
}

export const problem2 = (polymerTemplate: string, insertionRules: InsertionRules): number => {
    return doTheThing(polymerTemplate, insertionRules, 40);
}