import {countValuesInRanges, mergeRanges, Point, Range} from "../../utils/grid";

type SensorAndClosestBeacon = {
    [sensorLocation: string]: Point
}

const extractSensorData = (eachLine: string): SensorData => {
    const coords = /x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/;
    const [sensorX, sensorY, beaconX, beaconY] = eachLine.match(coords)
        .filter((_, index) => [1, 2, 3, 4].includes(index))
        .map(each => parseInt(each))

    return {
        sensor: new Point(sensorX, sensorY),
        closestBeacon: new Point(beaconX, beaconY),
        distance: getManhattanDistance(new Point(sensorX, sensorY), new Point(beaconX, beaconY))
    }
};

export const parseInput = (input: string): SensorAndClosestBeacon => {
    return input.split('\n')
        .filter(line => line.length > 0)
        .reduce((prev, curr) => {
            const {sensor, closestBeacon} = extractSensorData(curr)
            prev[sensor.toString()] = closestBeacon
            return prev
        }, {})
}

type SensorData = {
    sensor: Point,
    closestBeacon: Point
    distance: number
}

export const getManhattanDistance = (pointA: Point, pointB: Point) => {
    return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
}

export const findXCoordinatesInRadiusAtRow = (sensor: Point, beacon: Point, row: number): Range => {
    const distanceToBeacon = getManhattanDistance(sensor, beacon)
    const distanceToRow = Math.abs(row - sensor.y)

    if (distanceToRow <= distanceToBeacon) {
        const min = sensor.x - (distanceToBeacon - distanceToRow)
        const max = sensor.x + (distanceToBeacon - distanceToRow)

        return {
            min,
            max
        }
    }
};

export const positionsWithoutBeaconInRow = (sensorData: SensorAndClosestBeacon, row: number): number => {
    const rowData: { sensorXPositions: Set<number>, beaconXPositions: Set<number>, inclusionRanges: Range[] } = Object.entries(sensorData)
        .reduce((prev, [sensor, beacon]) => {
            const sensorLocation = Point.fromString(sensor);
            const inclusionRange = findXCoordinatesInRadiusAtRow(sensorLocation, beacon, row)
            if (inclusionRange) {
                prev.inclusionRanges = mergeRanges(...prev.inclusionRanges, inclusionRange)
            }
            if (sensorLocation.y === row) {
                prev.sensorXPositions.add(sensorLocation.x)
            }
            if (beacon.y === row) {
                prev.beaconXPositions.add(beacon.x)
            }

            return prev;
        }, {beaconXPositions: new Set<number>(), sensorXPositions: new Set<number>(), inclusionRanges: []})

    const pointsInRangeOfSensor = countValuesInRanges(...rowData.inclusionRanges)
    return pointsInRangeOfSensor - rowData.beaconXPositions.size - rowData.sensorXPositions.size
}