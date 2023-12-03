import {splitLines} from "../../../utils/dataReader";
import {fillArray, sum} from "../../../utils/listOps";

type Line = Array<number>

export class Card {
    rows: Array<Line>
}

export type Bingo = {
    numbers: Array<number>
    boards: Array<Card>
}

const parseBoards = (boardData: Array<string>): Card[] => {
    const numberOfCards = Math.ceil(boardData.length / 5);
    let rows = fillArray(numberOfCards).map(index => [...boardData].slice(index++ * 5, 5 * index));
    const vals = rows.map(eachRow => eachRow.map(str => str.split(' ').filter(x => x.match(/\d+/)).map(num => Number.parseInt(num))));


    return vals.map(eachCard => ({rows: eachCard}));
};

export const parseInput = (data: string): Bingo => {
    const [numberStrings, ...boardData] = splitLines(data);
    let numbers = numberStrings.split(',').map(str => Number.parseInt(str));
    let boards: Card[] = parseBoards(boardData)

    return {numbers, boards}
}

export const getColumns = (card: Card): Array<Line> =>
    card.rows.map((val, index) => card.rows.map(eachRow => eachRow[index]))

export const isWinningLine = (line: Array<number>, calledNumbers: Array<number>): boolean => {
    return line.every(lineNumber => calledNumbers.includes(lineNumber))
}

export const isBingo = (card: Card, calledNumbers: Array<number>): boolean => {
    const allLines = [...card.rows, ...getColumns(card)]
    return allLines.some(line => isWinningLine(line, calledNumbers));
}

export const calculateScore = (card: Card, calledNumbers: Array<number>): number => {
    const allNumbers = card.rows.reduce((prev, curr) => [...prev, ...curr], [])
    const unmarkedNumbers = allNumbers.filter(num => !calledNumbers.includes(num));
    const sumOfUnmarkedNumbers = sum(unmarkedNumbers);
    return sumOfUnmarkedNumbers * calledNumbers.pop();
}

export const problem1 = (data: string): number => {
    const game = parseInput(data);
    const winningScore = game.numbers.reduce((prev, num, index) => {
        const calledNumbers = game.numbers.slice(0, index);
        if (!prev) {
            const winningBoard = game.boards.find(card => isBingo(card, game.numbers.slice(0, index)))
            if (winningBoard) {
                let number = calculateScore(winningBoard, calledNumbers);
                console.log('winning score: ', number)
                return number;
            }
        }
        return prev;
    }, 0)
    return winningScore;
}

export const problem2 = (data: string): number => {
    const game = parseInput(data);
    const calledNumbersRequiredForWin = game.boards.map(eachBoard => {
        const numberRequireToWin = game.numbers.find((num, index) => {
            const calledNumbers = game.numbers.slice(0, index);
            return isBingo(eachBoard, calledNumbers)
        })

        return {card: eachBoard, numbersCalled: game.numbers.slice(0, game.numbers.indexOf(numberRequireToWin))}
    })

    const mostNumbersCalledBeforeWin = Math.max(
        ...calledNumbersRequiredForWin.map(each => each.numbersCalled.length))



    const boardsWithThatManyNumbersCalled = calledNumbersRequiredForWin.find(each => each.numbersCalled.length === mostNumbersCalledBeforeWin);

    return calculateScore(boardsWithThatManyNumbersCalled.card, boardsWithThatManyNumbersCalled.numbersCalled);
}
