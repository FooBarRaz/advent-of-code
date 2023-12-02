import {groupBy} from "../../utils/listOps";

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
    // let valuesToAdd = Array(instructions.length).fill(null)
    let registerValues = [] //Array(instructions.length).fill(null)
    let pixels: string[] = []
    const CRT_WIDTH = 40
    const CRT_HEIGHT = 6

    const isSpriteVisible = (): boolean => {
        const currentPixel = pixels.length % CRT_WIDTH
        return Math.abs(currentPixel - currentRegister) < 2
    }

    return {
        getRegisterValue: () => registerValues,
        pixels,
        processInstruction(instruction: Instructions, index: number) {
            if(instruction.type === 'addx') {
                this.tick()
                this.tick()
                currentRegister = currentRegister + instruction.value
            }
            if(instruction.type === 'noop') {
                this.tick()
            }
        },
        tick() {
            registerValues.push(currentRegister)
            pixels.push(isSpriteVisible() ? '#' : '.')
        },
        run() {
            instructions.forEach((instruction, i) => {
                this.processInstruction(instruction, i)
            })
        },
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
        .map(measurement => processor.getRegisterValue()[measurement] * (measurement + 1))
        .reduce((acc, curr) => acc + curr, 0)
}

export const problem2 = (input: string): string => {
    const instructions = parseInput(input)
    const processor = crt(instructions)

    processor.run()
    const pixelsGroupedByRow = groupBy(40, processor.pixels)
    const val = pixelsGroupedByRow.map(eachPixelRow => {
        return `${eachPixelRow.join('')}\n`
    })

    return val.join('')
}

