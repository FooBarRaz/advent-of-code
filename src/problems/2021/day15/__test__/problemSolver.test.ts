import { Point, getShortestPathDistance } from "../../../../utils/grid";
import {data} from "../data";
import {parseData} from "../problemSolver";

describe('data parsing', function () {
    it('should parse out each line of data', function () {
        const result = parseData(data);
        expect(result.dimensions.rows).toBe(100)
    });
});

describe('traversal', function () {
    const testData = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

    it('should check left and bottom and return position with lowest value', function () {
        const grid = parseData(testData);
        const entryPosition = new Point(0, 0);
        let destination = new Point(9, 9);
        const shortestPath = getShortestPathDistance(grid, entryPosition, destination);
        expect(shortestPath).toEqual(40);
        // const leastRiskyPosition = grid.getLeastRiskyPath();
        // expect(leastRiskyPosition).toEqual(40);
    });
});

describe('problem 1', function () {

    it('should calculate lowest risk path', function () {
const grid = parseData(data);
        const entryPosition = new Point(0, 0);
        let destination = new Point(grid.rows.length -1, grid.columns.length -1);
        const shortestPath = getShortestPathDistance(grid, entryPosition, destination);
        expect(shortestPath).toEqual(540);
    });

});