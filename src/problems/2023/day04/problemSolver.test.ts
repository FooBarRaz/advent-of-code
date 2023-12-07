import { problem1, problem2 } from "./problemSolver";
import data from "./data";

describe("2023", () => {
  describe("day04", () => {
    describe("problemSolver", () => {
      it("should solve part 1", () => {
        expect(problem1.solve(data)).toBe(42);
      });
      it("should solve part 2", () => {
        expect(problem2.solve(data)).toBe(42);
      }); 
    });
  });
});
