import { splitLines } from "../../../utils/dataReader";
import { sum } from "../../../utils/listOps";

type Hand = {
  red?: number;
  green?: number;
  blue?: number;
};

type Game = {
  id: number;
  hands: Hand[];
};

const parseLine = (input: string): Game => {
  const [id, gameInfo] = input.split(":");
  const gameId = Number.parseInt(id.match(/\d+/g) as any);
  const rawHand = gameInfo.split(";");
  const hands = rawHand.map((hand) => parseHand(hand));
  return { id: gameId, hands };
};

const parseHand = (rawHand: string): Hand => {
  const hand = rawHand.split(",").map((cube) => cube.trim());
  const result: Hand = {};
  hand.forEach((cube) => {
    const [number, color] = cube.split(" ");
    result[color as keyof Hand] = Number.parseInt(number);
  });
  return result;
};

function isHandPossible(hand: Hand, cubes: Hand) {
  return Object.entries(hand).every(([color, number]) => {
    return cubes[color as keyof Hand] >= number;
  });
}

function solveProblem1(input: string) {
  const lines: string[] = splitLines(input);
  const games: Game[] = lines.map(parseLine);
  const cubes: Hand = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return sum(
    games
      .filter((game) => game.hands.every((hand) => isHandPossible(hand, cubes)))
      .map((game) => game.id)
  );
}

function leastCubesNeeded(hands: Hand[]): Hand {
  return hands.reduce(
    (acc, hand) => {
      const { red, green, blue } = hand;
      acc.red = Math.max(acc.red, red || 0);
      acc.green = Math.max(acc.green, green || 0);
      acc.blue = Math.max(acc.blue, blue || 0);
      return acc;
    },
    {
      red: 0,
      green: 0,
      blue: 0,
    }
  );
}

function calculatePower(hand: Hand): number {
  return Object.values(hand).reduce((acc, number) => acc * number, 1);
}

const solveProblem2 = (input: string): number => {
  // for each game,
  // find the least amount of cubes needed
  // then find the power of that hand
  // then sum up the powers

  const lines: string[] = splitLines(input);
  const games: Game[] = lines.map(parseLine);
  return sum(
    games.map((eachGame) => {
      const cubes = leastCubesNeeded(eachGame.hands);
      return calculatePower(cubes);
    })
  );
};

export {
  solveProblem1,
  solveProblem2,
  Hand,
  Game,
  parseLine,
  parseHand,
  leastCubesNeeded,
  isHandPossible,
  calculatePower,
};
