import {splitLines} from "../../utils/dataReader";

type MovementType = 'forward' | 'up' | 'down'

type Command = { command: MovementType, amount: number }

type Position = {
    distance: number;
    depth: number;
    aim: number;
}

type CommandHandlers = {
    [command in MovementType]: (startPosition: Position, amount) => Position
}

const commandHandlers = (useAim?: boolean): CommandHandlers => ({
    'forward': (currentPosition: Position, amount: number): Position => ({
        ...(currentPosition),
        distance: currentPosition.distance + amount,
        depth: useAim ? currentPosition.depth + (currentPosition.aim * amount) : currentPosition.depth
    }),
    'down': (currentPosition: Position, amount: number): Position => ({
        ...(currentPosition),
        aim: useAim ? currentPosition.aim + amount : currentPosition.aim,
        depth: useAim ? currentPosition.depth : currentPosition.depth + amount
    }),
    'up': (currentPosition: Position, amount: number): Position => ({
        ...(currentPosition),
        aim: useAim ? currentPosition.aim - amount : currentPosition.aim,
        depth: useAim ? currentPosition.depth : currentPosition.depth - amount
    })
})

export const solveProblem1 = (data: string): number => solveProblem(data, commandHandlers())

export const solveProblem2 = (data: string): number => solveProblem(data, commandHandlers(true))

const solveProblem = (data: string, commandHandlers: CommandHandlers) => {
    const instructions = splitLines(data);
    const finalPosition = instructions
        .map(instruction => {
            const [command, amountAsString] = instruction.split(' ')
            return {commandHandler: commandHandlers[command], amount: Number.parseInt(amountAsString)}
        }).reduce((prev, curr) => curr.commandHandler(prev, curr.amount), {distance: 0, depth: 0, aim: 0} as Position);
    return finalPosition.depth * finalPosition.distance
}
