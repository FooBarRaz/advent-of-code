export const parseInput = (input: string): number[][] => input.split('\n').map(eachLine => {
    return eachLine.split('').reduce((arr, eachChar) => {
        if (eachChar === '-') {
            return [...arr, -1]
        } else if (eachChar === '=') {
            return [...arr, -2]
        } else {
            return [...arr, parseInt(eachChar)]
        }
    }, [])
})

export const snafuToDecimal = (input: number[]) => {
    // scan from right to left
    return input
        .reduceRight((acc, eachDigit, i) => {
            // the index + 1 is the power of 5
            const power = input.length - 1 - i
            const number = acc + (eachDigit * Math.pow(5, power));
            return number
        }, 0)
}

export const decimalToSnafuArray = (input: number) => {
    // given a number, convert it to base 5
    // but we can only use values of -2, -1, 0, 1, 2 for each digit
    // e.g. for input: 3, output: [1, -2] instead of [0, 3]
    // e.g. for input: 4, output: [1, -1] instead of [0, 4]
    // e.g. for input: 8, output: [2, -2] instead of [1, 3]

    const base5CharStrings = input
        .toString(5)
        .split('')
        .map(x => parseInt(x))

    // walk the array from right to left
    // if value is less than 3, then keep it
    // else, subtract 5 from value, and increment next value by 1
    base5CharStrings.reverse()
    const result = [...base5CharStrings]
    for (let i = 0; i < base5CharStrings.length; i++) {
        const eachVal = result[i]

        if (eachVal < 3) {
            result[i] = eachVal
        } else {
            result[i + 1] = (result[i + 1] === undefined) ? 1 : (base5CharStrings[i + 1] + 1);
            result[i] = eachVal - 5
        }
    }

    return result.reverse();
}


// base5CharStrings
//     .map()
// .reduceRight((acc, eachDigit, index, arr) => {
//     if (eachDigit === '0') {
//         return [...acc, 0]
//     } else if (eachDigit === '1') {
//         return [...acc, 1]
//     } else if (eachDigit === '2') {
//         return [...acc, 2]
//     } else if (eachDigit > '2') {
//         // increment next char by 1, and decrement this by 5
//         const nextChar = parseInt(arr[index - 1] || '0') + 1
//         return [...acc, parseInt(eachDigit) - 5, nextChar]
//     }
// }, []).reverse()
//
export const problem1 = (input: string): string => {
    const parsedInput = parseInput(input)
    const decimalNumbers = parsedInput.map(snafuToDecimal)
    const sum = decimalNumbers.reduce((acc, eachNumber) => acc + eachNumber, 0)

    const snafu = decimalToSnafuArray(sum)
    // convert snafu array to chars
    return snafu.map(eachDigit => {
        if (eachDigit === -2) {
            return '='
        } else if (eachDigit === -1) {
            return '-'
        } else {
            return eachDigit.toString()
        }
    }).join('')
}