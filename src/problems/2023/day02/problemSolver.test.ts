import { data } from "./data";
import {
  calculatePower,
  isHandPossible,
  leastCubesNeeded,
  parseLine,
  solveProblem1,
  solveProblem2,
} from "./problemSolver";

describe("Day 02", () => {
  describe("parseLine", () => {
    it("parses days and cubes", () => {
      const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`;
      const expectedOutput = {
        id: 1,
        hands: [
          {
            red: 4,
            blue: 3,
          },
          { red: 1, green: 2, blue: 6 },
          { green: 2 },
        ],
      };

      const result = parseLine(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("isGamePossible", () => {
    const testCases = [
      {
        name: "Possible when cubes equal hand",
        hand: {
          red: 4,
          blue: 3,
          green: 2,
        },
        cubes: {
          red: 4,
          blue: 3,
          green: 2,
        },
        isPossible: true,
      },
      {
        name: "Possible when cubes are more than hand",
        hand: {
          red: 4,
          blue: 3,
          green: 2,
        },
        cubes: {
          red: 5,
          blue: 4,
          green: 3,
        },
        isPossible: true,
      },
      {
        name: "Not possible when cubes are less than hand",
        hand: {
          red: 4,
          blue: 3,
          green: 2,
        },
        cubes: {
          red: 4,
          blue: 3,
          green: 1,
        },
        isPossible: false,
      },
    ];

    testCases.forEach((testCase) => {
      it(testCase.name, () => {
        const result = isHandPossible(testCase.hand, testCase.cubes);
        expect(result).toEqual(testCase.isPossible);
      });
    });
  });

  describe("Problem 1", () => {
    const testCases = [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
            Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
            Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
            Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        output: 8,
      },
      {
        input: data,
        output: 2204,
      },
    ];

    testCases.forEach((testCase) => {
      it("solves the problem", () => {
        const result = solveProblem1(testCase.input);
        expect(result).toEqual(testCase.output);
      });
    });
  });

  describe("leastCubesNeeded", () => {
    const testCases = [
      {
        hands: [
          {
            red: 4,
            blue: 3,
          },
          { red: 1, green: 2, blue: 6 },
          { green: 2 },
        ],
        expected: {
          red: 4,
          green: 2,
          blue: 6,
        },
      },
    ];

    testCases.forEach((testCase) => {
      it("finds the least amount of cubes needed", () => {
        const result = leastCubesNeeded(testCase.hands);
        expect(result).toEqual(testCase.expected);
      });
    });
  });

  describe("Power", () => {
    it("calculates power", () => {
      const hand = {
        red: 4,
        green: 2,
        blue: 6,
      };
      const expectedPower = 48;
      expect(calculatePower(hand)).toEqual(expectedPower);
    });
  });

  describe("Problem 2", () => {
    const testCases = [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
            Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
            Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
            Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expectedOutput: 2286,
      },
      {
        input: data,
        expectedOutput: 71036,
      },
    ];

    testCases.forEach((testCase) => {
      it("solves the problem", () => {
        const result = solveProblem2(testCase.input);
        expect(result).toEqual(testCase.expectedOutput);
      });
    });
  });
});
