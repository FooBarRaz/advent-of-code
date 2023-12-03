import {
    findPositionOfDistressSignal,
    findXCoordinatesInRadiusAtRow,
    getManhattanDistance,
    parseInput,
    positionsWithoutBeaconInRow, SensorAndClosestBeacon, tuningFrequency,
} from "./problemSolver";
import {data} from "./data";
import { Point } from "../../../utils/grid";

const testInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

describe('parseInput', function () {
    it('should extract coordinates', function () {
        const result = parseInput(testInput)
        const firstSensor = result['(2,18)']
        expect(firstSensor).toEqual(new Point(-2, 15))
        const lastReading = result['(20,1)']
        expect(lastReading).toEqual(new Point(15, 3))
    });
});

describe('Manhattan distance', function () {
    const testCases = [
        {pointA: new Point(0, 0), pointB: new Point(0, 0), expected: 0},
        {pointA: new Point(0, 0), pointB: new Point(0, 1), expected: 1},
        {pointA: new Point(0, 0), pointB: new Point(1, 0), expected: 1},
        {pointA: new Point(0, 0), pointB: new Point(1, 1), expected: 2},
        {pointA: new Point(0, 0), pointB: new Point(2, 2), expected: 4},
        {pointA: new Point(0, 0), pointB: new Point(3, 3), expected: 6},
    ];

    testCases.forEach(({pointA, pointB, expected}) => {
        it(`should calculate distance between ${pointA} and ${pointB}`, function () {
            const result = getManhattanDistance(pointA, pointB)
            expect(result).toEqual(expected)
        });
    })
});

describe('positionsWithoutBeacon', function () {
    describe('given an array of sensor data', function () {
        const sensorData = parseInput(testInput)


        describe('and a row', function () {
            const row = 11
            it('should return positions where a beacon cannot exist', function () {
                const result = positionsWithoutBeaconInRow(sensorData, row)
                expect(result).toEqual(26)
            });
        });

    });

    describe('given the real array of sensor data', function () {
        const sensorData = parseInput(data);

        describe('and given row where y=2000000', function () {
            it('should return positions where beacons cannot exist', function () {
                const result = positionsWithoutBeaconInRow(sensorData, 2000000)
                expect(result).toEqual(4951427)
            });
        });

    });

    describe('findYCoordinatesInRadiusAtRow', function () {
        describe('given a sensor and beacon that that 5 units apart', function () {
            const testCases = [
                {
                    distance: 9,
                    row: 0,
                    range: {min: -2, max: 2},
                }
            ]

            testCases.forEach(({distance, row, range}) => {
                it(`should return range of y coordinates at a row ${row}`, function () {
                    const sensor = new Point(0, 0)
                    const beacon = new Point(0, distance)
                    const result = findXCoordinatesInRadiusAtRow(sensor, beacon, row)
                    expect(result.min).toEqual(-9)
                    expect(result.max).toEqual(9)
                });
            });
        });
    });
});

describe('problem2', function () {
    const testData = parseInput(testInput)
    it('should find position of distress beacon', function () {
        const result = findPositionOfDistressSignal(testData, 20)
        expect(result).toEqual(new Point(14, 11))
    });

    it('should do it for big dataset', function () {
        const result = findPositionOfDistressSignal(parseInput(data), 4000000)
        expect(result).toEqual(new Point(3257428, 2573243))
    });

    it('should calculate tuning frequency', function () {
        const point = new Point(3257428, 2573243)
        const result = tuningFrequency(point)
        expect(result).toEqual(4000000)
    });
});


