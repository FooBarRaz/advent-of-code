import input from './input';

const NUMBER_OF_ROWS = 128;
const NUMBER_OF_SEATS = 8;
const INITIAL_RANGE_ROWS: Range = {min: 0, max: NUMBER_OF_ROWS - 1};
const INITIAL_RANGE_SEATS: Range = {min: 0, max: NUMBER_OF_SEATS - 1};

enum RowPartition {
    F = 'Left',
    B = 'Right'
}

enum SeatPartition {
    L = 'Left',
    R = 'Right'
}

type PartitionInstructions = SeatPartition | RowPartition

type Range = {
    min: number
    max: number
}

type SeatAssignment = { seat: number; row: number };

export const findHighestSeatId = () => {
    const seatIds: number[] = parseInputAsCases()
        .map(figureOutSeatAssignment)
        .map(calculateSeatId);

    return Math.max(...seatIds)
}

const figureOutWhichSeatIsMine = (seatIds: number[]): number => {
    return seatIds.find(seat => !seatIds.includes(seat + 1) && seatIds.includes(seat + 2)) + 1
}

export const findMySeat = (): number => {
    const seatIds: number[] = parseInputAsCases()
        .map(figureOutSeatAssignment)
        .map(calculateSeatId);

    return figureOutWhichSeatIsMine(seatIds)
}

const bisectFunctions = {
    'Left': (range: Range) => ({...range, max: Math.floor(range.max - (range.max - range.min) / 2)}),
    'Right': (range: Range) => ({...range, min: Math.ceil(range.min + ((range.max - range.min) / 2))})
}

const bisectRange = (instruction: PartitionInstructions, range: Range): Range => {
    return bisectFunctions[instruction](range);
}

const parseInputAsCases: () => string[] = () => {
    return input.split('\n')
};

export const calculateSeatId = (seatAssignment: SeatAssignment): number => (seatAssignment.row * 8) + seatAssignment.seat;

export const figureOutSeatAssignment: (problems: string) => SeatAssignment = (problems: string) => {
    let {rowInstructions, seatInstructions} = parseOutInstructions(problems);
    return ({
        row: findPositionRecursively(rowInstructions, INITIAL_RANGE_ROWS),
        seat: findPositionRecursively(seatInstructions, INITIAL_RANGE_SEATS)
    });
}

const parseOutInstructions = (input: string): { rowInstructions: RowPartition[], seatInstructions: SeatPartition[] } => {
    const rowMarkers = input.substring(0, 7);
    const seatMarkers = input.substring(7);

    return {
        rowInstructions: [...rowMarkers].map(eachRowMarker => RowPartition[eachRowMarker]),
        seatInstructions: [...seatMarkers].map(eachSeatMarker => SeatPartition[eachSeatMarker])
    }
};

const findPositionRecursively = (rowInstructions: Array<PartitionInstructions>, currentRange: Range) => {
    if (currentRange.min !== currentRange.max) {
        const [nextInstruction, ...restOfInstructions] = rowInstructions
        if (nextInstruction) {
            const newRange = bisectRange(nextInstruction, currentRange);
            return findPositionRecursively(restOfInstructions, newRange)
        } else {
            new Error('could not figure out exact row')
        }
    } else {
        return currentRange.min
    }
}

const findPositionIteratively = (rowInstructions: PartitionInstructions[], range: Range) => {
    return rowInstructions.reduce((acc, curr) => bisectRange(curr, acc),
        range).min
}
