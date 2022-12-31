import {Point} from "../../utils/grid";

export const parseInput = (input: string) => {
    return input.split('\n')
        .map(eachLine => {
            const coordinateMatcher = new RegExp(/(x=[-,1]\d+, y=[-,1]\d+)/g)
            const [sensorStr, beaconStr] = eachLine.match(coordinateMatcher)

            return {
                sensor: Point.fromString(sensorStr.trim()),
                closestBeacon: Point.fromString(beaconStr.trim())
            }

        })
}