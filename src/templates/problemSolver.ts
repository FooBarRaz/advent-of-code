import { ProblemSolution } from '../core/types';

export solve: ProblemSolution = {
    year: 2020,
    day: 1,
    part: 1,
    solve(input: string) {
        const numbers = input.split('\n').map(Number);
        const result = numbers.reduce((acc, x) => {
            const y = 2020 - x;
            if (numbers.includes(y)) {
                return x * y;
            }
            return acc;
        }, 0);
        return result;
    }
};
