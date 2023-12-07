import { ProblemSolution } from "../../../core/types";
import { splitLines } from "../../../utils/dataReader";
import { sum } from "../../../utils/listOps";

type Card = {
  winningNumbers: number[];
  cardNumbers: number[];
};
const hits = (card: Card) =>
  card.winningNumbers.filter((x) => card.cardNumbers.includes(x));

export function score(card: Card) {
  const winners = hits(card);
  if (winners.length === 0) return 0;
  if (winners.length === 1) return 1;
  return Math.pow(2, winners.length - 1);
}

export function score2(cards: Card[]) {}

export const parseInput = (input: string): Card[] => {
  return splitLines(input).map((line, cardNumber) => {
    const [, numbers] = line.split(":");
    const [winningNumberStrings, cardNumberStrings] = numbers.split("|");

    return {
      winningNumbers: winningNumberStrings.match(/\d+/g).map(Number),
      cardNumbers: cardNumberStrings.match(/\d+/g).map(Number),
    };
  });
};

const problem1: ProblemSolution = {
  year: 2023,
  day: 3,
  part: 1,
  solve: (input: string) => {
    const cards = parseInput(input);
    const scores = cards.map(score);
    return sum(scores);
  },
};

const problem2: ProblemSolution = {
  year: 2023,
  day: 3,
  part: 2,
  solve: (input: string) => {
    throw new Error("Not implemented yet!");
  },
};

export { problem1, problem2 };
