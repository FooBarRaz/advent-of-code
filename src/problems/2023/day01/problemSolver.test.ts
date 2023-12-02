import { splitLines } from "../../../utils/dataReader";
import { sum } from "../../../utils/listOps";
import { data } from "./data";

describe.only("2023 day 01 problem solver", () => {
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

const digitsToValue = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

function extractDigits(input: string): Array<number> {
  const regex = /(\d|zero|one|two|three|four|five|six|seven|eight|nine)/gi;
  const digits = input.match(regex);
  // if only one digit, copy it to the second digit
  if (!digits) {
    throw new Error("No digits found");
  }
  if (digits.length === 1) {
    digits.push(digits[0]);
  }

  const first = digits[0];
  const last = digits[digits.length - 1];

  return [first, last].map((n) => digitsToValue[n]);
}
function combineDigits(numbers: number[]): number {
  return Number.parseInt(numbers.join(""));
}
function solvePart1(input: string): any {
  const lines = splitLines(input);
  const numbers = lines.map(extractDigits).map(combineDigits);
  return sum(numbers);
}
