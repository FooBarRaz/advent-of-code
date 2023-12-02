import {solve1} from "../problemSolver";
import {data} from "../data";

describe('Given data', function () {
    it('should solve', function () {
        expect(solve1(data)).toEqual(3931283);
    });

});