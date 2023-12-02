class Elf {
    constructor(public low: number, public high: number) { }
}

class ElfPair {
    constructor(public elf1: Elf, public elf2: Elf) { }

    hasOverlappingAssignment(): boolean {
        return this.elf1.low <= this.elf2.low && this.elf1.high >= this.elf2.high
    || this.elf2.low <= this.elf1.low && this.elf2.high >= this.elf1.high;
    }

    hasAnyOverlapAtAll(): boolean {
        return (this.elf1.high <= this.elf2.high && this.elf1.high >= this.elf2.low)
        || (this.elf2.high <= this.elf1.high && this.elf2.high >= this.elf1.low)
    }
}

export const parseInput = (input: string): ElfPair[] => {
    return input.split('\n')
        .map(line => {
            const elves = line.split(',')
            const [elf1, elf2] = elves.map(eachPair => eachPair.split('-'))
            return new ElfPair(new Elf(parseInt(elf1[0]), parseInt(elf1[1])), new Elf(parseInt(elf2[0]), parseInt(elf2[1])))
        })
}


export const problem1 = (input: string): number => {
    return parseInput(input).filter(eachPair => eachPair.hasOverlappingAssignment()).length
}

export const problem2 = (input: string): number => {
    return parseInput(input).filter(eachPair => eachPair.hasAnyOverlapAtAll()).length
}
