type ArrayOfNumbers = number[] | Array<ArrayOfNumbers>
export const parseInput = (input: string): ArrayOfNumbers => {
    const pairs = input.split('\n\n')
    return pairs.map(pair => {
        const lines = pair.split('\n')
        return lines.map(line => eval(line))
    })
}