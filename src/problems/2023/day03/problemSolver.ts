import { ProblemSolution } from "../../../core/types";
import { Grid, Point, Line, getAllPointsOnLine } from "../../../utils/grid";
import { sum } from "../../../utils/listOps";

const symbols = {};

export const findSymbolsOnLine = (line: string, row: number): Point[] => {
  const regex = /[^0-9.]/g;

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

export const shouldBeIncluded = (grid: Grid<string>, point: Point): boolean => {
  const isNumber = grid.getPointValue(point).match(/\d/);
  if (!isNumber) return false;

  const adjacentPoints = grid.getAdjacentPoints(point, true);
  return adjacentPoints.some((adjacentPoint) => {
    const doesAdjacentPointMatch = adjacentPoint.value.match(/[^0-9.]/);
    if (doesAdjacentPointMatch) {
      symbols[adjacentPoint.value] = true;
    }
    return doesAdjacentPointMatch;
  });
};

export const findNumberSequences = (input: string): { number: string, index: number }[] => {
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

    const lines = allNumbersOnRow.reduce((lines, {number, index}) => {
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
    const symbolsOnLine = findSymbolsOnLine(eachRow.join(""), index);
    return [...symbols, ...symbolsOnLine];
  }, [] as Point[]);

  const partNumbers = allNumbers
    .filter((numberPoint) =>
      allSymbols.some((eachSymbolPoint) => {
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

  return partNumbers;

  // symbolsByLine.reduce((partNumbers, symbolPoint) => {

  // }, []);

  // return numbers
  //   .filter((numberLine) => {
  //     return getAllPointsOnLine(numberLine).some((point) => {
  //       return shouldBeIncluded(grid, point);
  //     });
  //   })
  //   .map((numberLine) => {
  //     const numberAsString = getAllPointsOnLine(numberLine)
  //       .map((point) => grid.getPointValue(point))
  //       .join("");
  //     return parseInt(numberAsString, 10);
  //   });
};

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

const problem2: ProblemSolution = {
  year: 2023,
  day: 3,
  part: 2,
  solve: (input: string) => {
    return 0;
  },
};
export { problem1, problem2 };
