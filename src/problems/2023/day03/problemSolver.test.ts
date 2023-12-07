import {
  findAdjacentNumbers,
  findPartNumbers,
  findMatchOnLine,
  numberSequences,
  parseInput,
  problem1,
  problem2
} from "./problemSolver";
import data from "./data";
import { Grid, Point } from "../../../utils/grid";

describe("2023", () => {
  describe("day03", () => {
    const testData = `467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`;
    let testGrid: Grid<string>;
    beforeEach(() => {
      testGrid = parseInput(testData);
    });
    describe("parseInput", () => {
      it("should convert a string to a grid", () => {
        const result: Grid<string> = parseInput(testData);
        result.print("");
        expect(result.getPointValue(new Point(0, 0))).toBe("4");
        expect(result.getPointValue(new Point(0, 4))).toBe("6");
      });

      describe("findPartNumbers", () => {
        const shouldNotInclude = [114, 58];

        shouldNotInclude.forEach((number) => {
          it(`should not include ${number}`, () => {
            expect(findPartNumbers(testGrid)).not.toContain(number);
          });
        });

        const shouldInclude = [467, 35, 633, 617, 592, 755, 664, 598];

        shouldInclude.forEach((number) => {
          it(`should include ${number}`, () => {
            expect(findPartNumbers(testGrid)).toContain(number);
          });
        });
      });

      describe("findSymbolsOnLine", () => {
        it("should find symbols on a line", () => {
          const line = "...*......";
          const result = findMatchOnLine(line, 0);
          expect(result).toEqual([new Point(3, 0)]);
        });

        it("should find  multiple symbols on a line", () => {
          const line = `..*..&..$..##..!..`;
          const result = findMatchOnLine(line, 0);
          expect(result).toHaveLength(6);
          expect(result).toEqual([
            new Point(2, 0),
            new Point(5, 0),
            new Point(8, 0),
            new Point(11, 0),
            new Point(12, 0),
            new Point(15, 0),
          ]);
        });
      });

      describe.skip('find adjacent numbers', () => {
        it('should find adjacent numbers', () => {
          const grid = parseInput(`1.2.3$.4.5.6`);
          const result = findAdjacentNumbers(grid, new Point(5,0));
          expect(result).toEqual([3]);
        });

        it('should combine adjacent numeric strings', () => {
          const grid = parseInput(`1.223$.4.5.6`);

          const result = findAdjacentNumbers(grid, new Point(5,0));
          expect(result).toEqual([223]);
        })
      });
      describe("find number sequences", () => {
        describe("given a grid", () => {
          it("should return the points at which a number is found", () => {
            const result = numberSequences(testGrid);
            const firstNumber = result[0];
            expect(firstNumber.a).toEqual(new Point(0, 0));
            expect(firstNumber.b).toEqual(new Point(2, 0));

            const secondNumber = result[1];
            expect(secondNumber.a).toEqual(new Point(5, 0));
            expect(secondNumber.b).toEqual(new Point(7, 0));
          });
        });
      });
    });
    describe("problemSolver", () => {
      it("should solve for testData", () => {
        expect(problem1.solve(testData)).toBe(4361);
      });

      it("should solve part 1", () => {
        expect(problem1.solve(data)).toBe(559667);
      });
      it("should solve part 2", () => {
        expect(problem2.solve(data)).toBe(42);
      });

      it("should solve part 2 for test data", () => {
        expect(problem2.solve(testData)).toBe(467835);
      });

      describe("More examples", () => {
        const examples = [
          {
            input: `12.......*..
            +.........34
            .......-12..
            ..78........
            ..*....60...
            78.........9
            .5.....23..$
            8...90*12...
            ............
            2.2......12.
            .*.........*
            1.1..503+.56`,
            expected: {
              part1: 925,
            },
          },
          {
            input: `.......5......
            ..7*..*.....4*
            ...*13*......9
            .......15.....
            ..............
            ..............
            ..............
            ..............
            ..............
            ..............
            21............
            ...*9.........`,
            expected: {
              part1: 62,
            },
          },
          {
            input: `........
            .24..4..
            ......*.`,
            expected: {
              part1: 4,
            },
          },
          {
            input: `......
            .23.23
            .....$`,
            expected: {
              part1: 23,
            },
          },
        ];

        examples.forEach((example) => {
          it(`should solve example`, () => {
            expect(problem1.solve(example.input)).toBe(example.expected.part1);
          });
        });
      });

      it("should solve some dude's example", () => {
        const example = `..616...............
        ...*....49.....-....
        ...863.....%.72.....
        .........171........
        ..............308..5
        ..............*.....
        .......582..335...26
        ......*.............
        ....827.............
        ........@......278*.
        .....990...........7
        ....................`;

        expect(problem1.solve(example)).toBe(5049);
      });
    });
  });
});
