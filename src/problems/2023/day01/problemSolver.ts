import { splitLines } from "../../../utils/dataReader";
import { sum } from "../../../utils/listOps";

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
export { 
    solvePart1,
    combineDigits,
    extractDigits
}