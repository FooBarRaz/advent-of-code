import { ProblemSolution } from "../../../core/types";
import { Grid, Point, Line, getAllPointsOnLine } from "../../../utils/grid";
import { sum } from "../../../utils/listOps";

export const shouldBeIncluded = (grid: Grid<string>, point: Point): boolean => {
  const isNumber = grid.getPointValue(point).match(/\d/);
  if (!isNumber) return false;

  const adjacentPoints = grid.getAdjacentPoints(point, true);
  return adjacentPoints.some((adjacentPoint) => {
    return adjacentPoint.value.match(/[^0-9.]/);
  });
};
export const numberSequences = (grid: Grid<string>): Line[] => {
  const allNumbers = grid.rows.reduce((numberPoints, row, y) => {
    const rowAsString = row.join("");
    const allNumbersOnRow = rowAsString.match(/\d+/g);
    if (!allNumbersOnRow) return numberPoints;

    const lines = allNumbersOnRow.reduce((lines, number) => {
      const a = new Point(rowAsString.indexOf(number), y);
      const b = new Point(rowAsString.indexOf(number) + number.length - 1, y);
      lines.push({ a, b });
      return lines;
    }, []);
    return [...numberPoints, ...lines];
  }, [] as any);
  return allNumbers;
};

export const parseInput = (input: string): Grid<string> => {
  const rows = input.split("\n").map((row) => row.trim().split(""));
  return new Grid(rows);
};

export const findPartNumbers = (grid: Grid<string>): number[] => {
  const numbers = numberSequences(grid);
  return numbers
    .filter((numberLine) => {
      return getAllPointsOnLine(numberLine).some((point) => {
        return shouldBeIncluded(grid, point);
      });
    })
    .map((numberLine) => {
      const numberAsString = getAllPointsOnLine(numberLine)
        .map((point) => grid.getPointValue(point))
        .join("");
      return parseInt(numberAsString, 10);
    });
};

const problem1: ProblemSolution = {
  year: 2023,
  day: 3,
  part: 1,
  solve: (input: string) => {
    const grid = parseInput(input);
    const numbers = findPartNumbers(grid);
    console.log(numbers);
    return sum(numbers);
  },
};

const problem2: ProblemSolution = {
  year: 2023,
  day: 3,
  part: 2,
  solve: (input: string) => {
    return 0;
  },
};
export { problem1, problem2 };
