import { splitLines } from "../../../utils/dataReader";
import { sum } from "../../../utils/listOps";
import { data } from "./data";
import { extractDigits, combineDigits, solvePart1 } from "./problemSolver";

describe("2023 day 01 problem solver", () => {
  describe("extractDigits", () => {
    const testData = [
      { input: "123", expected: [1, 3] },
      { input: "1asd3", expected: [1, 3] },
      { input: "3asd4sdasd", expected: [3, 4] },
      { input: "zero", expected: [0, 0] },
    ];

    testData.forEach(({ input, expected }) => {
      it(`should return ${expected} for ${input}`, () => {
        expect(extractDigits(input)).toEqual(expected);
      });
    });
  });

  describe("combineDigits", () => {
    it("should return 12 for 1 and 2", () => {
      expect(combineDigits([1, 2])).toEqual(12);
    });
  });

  describe("solvePart1", () => {
    const testData = [
      {
        input: `1abc2
                pqr3stu8vwx
                a1b2c3d4e5f
                treb7uchet`,
        expected: 142,
      },

      {
        input: data,
        expected: 42,
      },
    ];

    testData.forEach(({ input, expected }) => {
      it(`should solve it`, () => {
        expect(solvePart1(input)).toEqual(expected);
      });
    });
  });
});
