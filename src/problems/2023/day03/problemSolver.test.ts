import {
  findPartNumbers,
  numberSequences,
  parseInput,
  problem1,
  problem2,
  shouldBeIncluded,
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

      describe("shouldBeIncluded", () => {
        it("is false by default", () => {
          expect(shouldBeIncluded(testGrid, new Point(0, 0))).toBe(false);
        });

        it("is false for symbols", () => {
          expect(shouldBeIncluded(testGrid, new Point(3, 4))).toBe(false);
        });

        it("is false for empty spots", () => {
          expect(shouldBeIncluded(testGrid, new Point(4, 4))).toBe(false);
        });

        it("is true for numbers with a symbol above", () => {
          expect(shouldBeIncluded(testGrid, new Point(3, 2))).toBe(true);
        });

        it("is true for numbers with a symbol below", () => {
          expect(shouldBeIncluded(testGrid, new Point(6, 2))).toBe(true);
        });

        it("is true for numbers with symbol on bottom left", () => {
          //6,7
          expect(shouldBeIncluded(testGrid, new Point(6, 7))).toBe(true);
        });

      });

      describe("findPartNumbers", () => {
        const shouldNotInclude = [114, 58];

        shouldNotInclude.forEach((number) => {
          it(`should not include ${number}`, () => {
            expect(findPartNumbers(testGrid)).not.toContain(number);
          });
        });

        const shouldInclude = [467, 35, 633, 617, 592, 755, 664,598];

        shouldInclude.forEach((number) => {
          it(`should include ${number}`, () => {
            expect(findPartNumbers(testGrid)).toContain(number);
          });
        });
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
      it('should solve for testData', () => {
        expect(problem1.solve(testData)).toBe(4361);
      });
      it("should solve part 1", () => {
        expect(problem1.solve(data)).toBe(559667);
      });
      it("should solve part 2", () => {
        expect(problem2.solve(data)).toBe(42);
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
        ....................`

        expect(problem1.solve(example)).toBe(5049);
      })
    });
  });
});
