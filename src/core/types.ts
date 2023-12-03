export interface ProblemSolution {
  year: number;
  day: number;
  part: 1 | 2;
  solve: (input: string) => string | number;
}
