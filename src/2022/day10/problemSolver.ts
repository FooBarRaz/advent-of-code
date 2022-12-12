type NoOp = {
    type: 'noop'
}
type AddX = {
    type: 'addx'
    value: number
}

export type Instructions = NoOp | AddX

export const crt = (instructions: Instructions[]) => {
    let currentRegister = 1;
    let valuesToAdd = Array(instructions.length).fill(null)
    let registerValues = Array(instructions.length).fill(null)

    return {
        processInstruction(instruction: Instructions, index: number) {
            if(instruction.type === 'addx') {
                valuesToAdd[index+2] = instruction.value
            }
        },
        finishCycle(index: number) {
            const newValue = index === 0 ? 1
                : (valuesToAdd[index] || 0) + currentRegister

            currentRegister = newValue
            registerValues[index] = newValue
        },
        run() {
            instructions.forEach((instruction, i) => {
                this.processInstruction(instruction, i)
                this.finishCycle(i)
            })
        },
        getRegisterValues() {
            return registerValues
        }
    }
}


export const parseInput = (input: string): Instructions[] => {
    return input.split('\n')
        .map(line => {
            const [type, value] = line.split(' ')
            if (type === 'noop') {
                return {type: 'noop'}
            }
            if (type === 'addx') {
                return {type: 'addx', value: parseInt(value)}
            }
        })
}

export const problem1 = (input: string): number => {
    // measurements to check:
    // 20th, 60th, 100th, 140th, 180th, and 220th
    const measurements = [19, 59, 99, 139, 179, 219]
    const instructions = parseInput(input)
    const processor = crt(instructions)

    processor.run()

    return measurements
        .map(measurement => processor.getRegisterValues()[measurement] * (measurement + 1))
        .reduce((acc, val) => acc + val, 0)
}