import { ProblemSolution } from "../../../core/types";
import { Grid, Point, Line, getAllPointsOnLine } from "../../../utils/grid";
import { sum } from "../../../utils/listOps";

export const findMatchOnLine = (
  regex: RegExp,
  line: string,
  row: number
): Point[] => {
  let match;
  let matches = [];

  while ((match = regex.exec(line)) !== null) {
    matches.push({ index: match.index, value: match[0] });
  }

  return matches.map((match) => new Point(match.index, row));
};

export const findAdjacentNumbers = (
  grid: Grid<string>,
  point: Point
): PointAndValue[] => {
  const adjacentPoints = grid.getAdjacentPoints(point, true);
  const adjacentNumbers = adjacentPoints.filter((point) => {
    return point.value.match(/\d/);
  });

  return adjacentNumbers;
};

export const findNumberSequences = (
  input: string
): { number: string; index: number }[] => {
  const regex = /\d+/g;
  let match;
  let sequences = [];

  while ((match = regex.exec(input)) !== null) {
    sequences.push({ number: match[0], index: match.index });
  }

  return sequences;
};

export const numberSequences = (grid: Grid<string>): Line[] => {
  const allNumbers = grid.rows.reduce((numberPoints, row, y) => {
    let rowAsString = row.join("");
    const allNumbersOnRow = findNumberSequences(rowAsString);
    if (!allNumbersOnRow.length) return numberPoints;

    const lines = allNumbersOnRow.reduce((lines, { number, index }) => {
      const numberOfDigits = number.length;
      const a = new Point(index, y);
      const b = new Point(index + (numberOfDigits - 1), y);
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
  const allNumbers = numberSequences(grid);
  const allSymbols = grid.rows.reduce((symbols, eachRow, index) => {
    const symbolsOnLine = findMatchOnLine(/[^0-9.]/g, eachRow.join(""), index);
    return [...symbols, ...symbolsOnLine];
  }, [] as Point[]);

  const partNumbers = findAllNumbersAdjacentToSymbols(
    grid,
    allNumbers,
    allSymbols
  );

  return partNumbers;
};

const findAllNumbersAdjacentToSymbols = (
  grid: Grid<string>,
  allNums: Line[],
  allSyms: Point[]
): number[] =>
  allNums
    .filter((numberPoint) =>
      allSyms.some((eachSymbolPoint) => {
        const adjacentPoints = grid
          .getAdjacentPoints(eachSymbolPoint, true)
          .filter((point) => point.value.match(/\d/));
        return getAllPointsOnLine(numberPoint).some((point) =>
          adjacentPoints.some((adjacentPoint) =>
            adjacentPoint.point.equals(point)
          )
        );
      })
    )
    .map((numberPoint) => {
      const numberAsString = getAllPointsOnLine(numberPoint)
        .map((point) => grid.getPointValue(point))
        .join("");
      return parseInt(numberAsString, 10);
    });

const problem1: ProblemSolution = {
  year: 2023,
  day: 3,
  part: 1,
  solve: (input: string) => {
    const grid = parseInput(input);
    const numbers = findPartNumbers(grid);
    return sum(numbers);
  },
};
const getNumberByLine = (grid: Grid<string>, line: Line) => {
  const numberAsString = getAllPointsOnLine(line)
    .map((point) => grid.getPointValue(point))
    .join("");
  return parseInt(numberAsString, 10);
};

const problem2: ProblemSolution = {
  year: 2023,
  day: 3,
  part: 2,
  solve: (input: string) => {
    const grid = parseInput(input);
    const possibleGears = grid.rows.reduce((gears, eachRow, i) => {
      const symbols = findMatchOnLine(/\*/g, eachRow.join(""), i);
      return [...gears, ...symbols];
    }, []);

    const allNumbers = numberSequences(grid);
    return possibleGears.reduce((totalGearRatios, gear: Point) => {
      // must be adjacent to exactly two numbers
      const adjacentPoints = grid.getAdjacentPoints(gear, true);
      // are any of the adjacent points in one of the number lines?
      const newNumbers = allNumbers.filter((numberLine) => {
        return adjacentPoints.some((eachAdjacentPoint) => {
          return getAllPointsOnLine(numberLine).some((point) =>
            eachAdjacentPoint.point.equals(point)
          );
        });
      });

      const pointsThatAreNumbers = newNumbers.map((numberLine) =>
        getNumberByLine(grid, numberLine)
      );

      if (pointsThatAreNumbers.length !== 2) return totalGearRatios;
      else
        return (
          totalGearRatios + pointsThatAreNumbers[0] * pointsThatAreNumbers[1]
        );
    }, 0);
  },
};
export { problem1, problem2 };
