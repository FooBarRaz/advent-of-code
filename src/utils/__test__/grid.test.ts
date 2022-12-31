import {getShortestPath, Grid, Point} from "../grid";

describe('grid', function () {
    describe('getShortestPath', function () {

        describe('given a 3x3 grid', function () {
            it('should calculate the shortest distance between two points', function () {
                const grid = new Grid([
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8]
                ])
                const result = getShortestPath(grid, new Point(0, 2), new Point(2, 0))
                expect(result.distance).toEqual(16)
                expect(result.pathLength).toEqual(4)
            });
        });

        describe('given a 4x4 grid', function () {
            it('should calculate the shortest distance between two points', function () {
                const grid = new Grid([
                    [0, 1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9, 10, 11],
                    [12, 13, 14, 15]
                ])
                const result = getShortestPath(grid, new Point(0, 0), new Point(3, 3))
                expect(result.distance).toEqual(39)
                expect(result.pathLength).toEqual(6)
            });
        });
    });
});