import { parseInput, problem1, problem2, score } from "./problemSolver";
import data from "./data";

describe("2023", () => {
  const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

  describe("parseInput", () => {
    it("should organize lines by card", () => {
      const result = parseInput(testInput);
      expect(result).toHaveLength(6);
    });

    it('should parse the winning numbers', () => {
      const result = parseInput(testInput);
      expect(result[0].winningNumbers).toEqual([41, 48, 83, 86, 17]);
    });
  });

  describe('score', () => {
    it('should be 1 point for 1 hit', () => {
      const result = score({
        winningNumbers: [1,2,3],
        cardNumbers: [1,4,5]
      })
      expect(result).toBe(1);
    });

    it('should be 2 points for 2 hits', () => {
      const result = score({
        winningNumbers: [1,2,3],
        cardNumbers: [1,2,5]
      })
      expect(result).toBe(2);
    });

    it('should be 4 points for 3 hits', () => {
      const result = score({
        winningNumbers: [1,2,3],
        cardNumbers: [1,2,3]
      })
      expect(result).toBe(4);
    });
  });
  describe("day04", () => {
    describe("problemSolver", () => {
      it('should solve part 1 for test input', () => {
        expect(problem1.solve(testInput)).toBe(13);
      });
      it("should solve part 1", () => {
        expect(problem1.solve(data)).toBe(42);
      });
      it("should solve part 2", () => {
        expect(problem2.solve(data)).toBe(42);
      });
    });
  });
});

