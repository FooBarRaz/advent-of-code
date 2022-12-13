export class Monkey {
    private itemsInspected = 0;

    constructor(public readonly id,
                public startingItems: number[],
                public readonly operation: (number) => number,
                public readonly divisor: number,
                public readonly test: (number) => number) {
    }

    inspectItems(relief: 1 | 3) {
        this.startingItems = this.startingItems
            .map(num => {
                let newWorryVal: number = this.operation(num);
                this.itemsInspected++
                return Math.floor(newWorryVal / relief)
            })
    }

    get itemsInspectedCount() {
        return this.itemsInspected
    }
}

export const parseInput = (input: string) => {
    return input.split('\n\n')
        .map(input => {
            const {monkeyId} = input.match(/^Monkey (?<monkeyId>\d+):/).groups
            return new Monkey(monkeyId, [], () => 0,0, () => 0)
        })
}

/**
 * Monkey 0:
 Starting items: 79, 98
 Operation: new = old * 19
 Test: divisible by 23
 If true: throw to monkey 2
 If false: throw to monkey 3

 Monkey 1:
 Starting items: 54, 65, 75, 74
 Operation: new = old + 6
 Test: divisible by 19
 If true: throw to monkey 2
 If false: throw to monkey 0

 Monkey 2:
 Starting items: 79, 60, 97
 Operation: new = old * old
 Test: divisible by 13
 If true: throw to monkey 1
 If false: throw to monkey 3

 Monkey 3:
 Starting items: 74
 Operation: new = old + 3
 Test: divisible by 17
 If true: throw to monkey 0
 If false: throw to monkey 1
 */

export const generateTestMonkeys = () => ({
    0: new Monkey(0, [79, 98], (old) => old * 19, 23, (newItem) => newItem % 23 === 0 ? 2 : 3),
    1: new Monkey(1, [54, 65, 75, 74], (old) => old + 6, 19, (newItem) => newItem % 19 === 0 ? 2 : 0),
    2: new Monkey(2, [79, 60, 97], (old) => old * old, 13,(newItem) => newItem % 13 === 0 ? 1 : 3),
    3: new Monkey(3, [74], (old) => old + 3, 17, (newItem) => newItem % 17 === 0 ? 0 : 1),
})

export const generateMonkeys = () => ({
    /**
     * Monkey 0:
     Starting items: 89, 95, 92, 64, 87, 68
     Operation: new = old * 11
     Test: divisible by 2
     If true: throw to monkey 7
     If false: throw to monkey 4

     Monkey 1:
     Starting items: 87, 67
     Operation: new = old + 1
     Test: divisible by 13
     If true: throw to monkey 3
     If false: throw to monkey 6

     Monkey 2:
     Starting items: 95, 79, 92, 82, 60
     Operation: new = old + 6
     Test: divisible by 3
     If true: throw to monkey 1
     If false: throw to monkey 6

     Monkey 3:
     Starting items: 67, 97, 56
     Operation: new = old * old
     Test: divisible by 17
     If true: throw to monkey 7
     If false: throw to monkey 0

     Monkey 4:
     Starting items: 80, 68, 87, 94, 61, 59, 50, 68
     Operation: new = old * 7
     Test: divisible by 19
     If true: throw to monkey 5
     If false: throw to monkey 2

     Monkey 5:
     Starting items: 73, 51, 76, 59
     Operation: new = old + 8
     Test: divisible by 7
     If true: throw to monkey 2
     If false: throw to monkey 1

     Monkey 6:
     Starting items: 92
     Operation: new = old + 5
     Test: divisible by 11
     If true: throw to monkey 3
     If false: throw to monkey 0

     Monkey 7:
     Starting items: 99, 76, 78, 76, 79, 90, 89
     Operation: new = old + 7
     Test: divisible by 5
     If true: throw to monkey 4
     If false: throw to monkey 5
     */
    0: new Monkey(0, [89, 95, 92, 64, 87, 68], (old) => old * 11, 2, (newItem) => newItem % 2 === 0 ? 7 : 4),
    1: new Monkey(1, [87, 67], (old) => old + 1, 13, (newItem) => newItem % 13 === 0 ? 3 : 6),
    2: new Monkey(2, [95, 79, 92, 82, 60], (old) => old + 6, 3, (newItem) => newItem % 3 === 0 ? 1 : 6),
    3: new Monkey(3, [67, 97, 56], (old) => old * old, 17, (newItem) => newItem % 17 === 0 ? 7 : 0),
    4: new Monkey(4, [80, 68, 87, 94, 61, 59, 50, 68], (old) => old * 7, 19,(newItem) => newItem % 19 === 0 ? 5 : 2),
    5: new Monkey(5, [73, 51, 76, 59], (old) => old + 8,7, (newItem) => newItem % 7 === 0 ? 2 : 1),
    6: new Monkey(6, [92], (old) => old + 5, 11, (newItem) => newItem % 11 === 0 ? 3 : 0),
    7: new Monkey(7, [99, 76, 78, 76, 79, 90, 89], (old) => old + 7,5, (newItem) => newItem % 5 === 0 ? 4 : 5),
})
export const round = (monkeys: Record<number, Monkey>, relief: 1 | 3): Record<number, Monkey> => {
    const mul = Object.values(monkeys).reduce((acc, monkey) => acc * monkey.divisor, 1)
    Object.values(monkeys)
        .forEach(monkey => {
            monkey.inspectItems(relief)
            while (monkey.startingItems.length) {
                const item = monkey.startingItems.shift() % mul
                const targetMonkey = monkeys[monkey.test(item)]
                targetMonkey.startingItems.push(item)
            }
        })

    return monkeys;
}

export const problem1 = (monkeys: { [key: number]: Monkey }) => {
    // run 20 rounds
    for (let i = 0; i < 20; i++) {
        monkeys = round(monkeys, 3)
    }

    // find monkeys that inspected the most items
    const [topMonkey, secondInspectiestMonkey] = Object.values(monkeys)
        .sort((a, b) => b.itemsInspectedCount - a.itemsInspectedCount)

    return topMonkey.itemsInspectedCount * secondInspectiestMonkey.itemsInspectedCount
}

export const problem2 = (monkeys: { [key: number]: Monkey }) => {
    // run 10,000 rounds
    for (let i = 0; i < 10000; i++) {
        monkeys = round(monkeys, 1)
    }

    // find monkeys that inspected the most items
    const [topMonkey, secondInspectiestMonkey] = Object.values(monkeys)
        .sort((a, b) => b.itemsInspectedCount - a.itemsInspectedCount)

    return topMonkey.itemsInspectedCount * secondInspectiestMonkey.itemsInspectedCount
}

export const run = (monkeys: { [key: number]: Monkey }, numberOfRounds: number, reliefAfterInspection: 1|3) => {
    for (let i = 0; i < numberOfRounds; i++) {
        monkeys = round(monkeys, reliefAfterInspection)
    }

    // find monkeys that inspected the most items
    const [topMonkey, secondInspectiestMonkey] = Object.values(monkeys)
        .sort((a, b) => b.itemsInspectedCount - a.itemsInspectedCount)

    return topMonkey.itemsInspectedCount * secondInspectiestMonkey.itemsInspectedCount
}
