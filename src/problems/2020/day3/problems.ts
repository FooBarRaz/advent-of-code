import { readLines } from '../../utils/dataReader';

const TREE = '#'

type Position = {
    row: number
    column: number
}

type Movement = { down: number; across: number };
const move = (currentPosition: Position, movement: Movement) => ({row: currentPosition.row + movement.down, column: currentPosition.column + movement.across })

const checkForTree = (plane: Array<string>, position: Position): boolean =>
    plane.length >= position.row &&
    plane[position.row][position.column % plane[position.row].length] === TREE

export const countTreesDownTheSlope = (movement: Movement): Promise<number> => {
    return readLines('src/day3/data/datafile.txt')
        .then(plane => {
            let trees = 0
            let currentPosition: Position = { row: 0, column: 0 }
            plane.forEach(
                () => {
                    if (checkForTree(plane, currentPosition)) {
                        trees++
                    }
                    currentPosition = move(currentPosition, movement)
                }
            );
            return trees
        })
}

export const run = () => Promise.all([
    {down: 1, across: 3},
    {down: 1, across: 1},
    {down: 1, across: 5},
    {down: 1, across: 7},
    {down: 2, across: 1},
].map(countTreesDownTheSlope)).then(results => results.reduce((acc, curr) => acc * curr)).then(console.log)
