import { problem1, problem2 } from "./2023/day03/problemSolver";

type Registry = {
  [year: number]: {
    [day: number]: {
      [part: number]: (input: string) => number | string;
    };
  };
};

export const registry: Registry = {
  2023: {
    1: {},
    3: {
      1: problem1.solve,
      2: problem2.solve,
    },
  },
};