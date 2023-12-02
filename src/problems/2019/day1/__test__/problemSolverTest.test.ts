import {calculateFuelRequirementByMass, calculateFuelRequirementByMassRecursively} from "../problemSolver";
import {data} from "../data";
import {splitLines} from "../../../utils/dataReader";

describe('Day 1', function () {

    describe('calculateFuel', function () {
        const testFuelCalculator = (moduleMass: number, expectedFuelRequirement: number) => {
            it(`should require ${expectedFuelRequirement} for module of mass ${moduleMass}`, function () {
                expect(calculateFuelRequirementByMass(moduleMass)).toEqual(expectedFuelRequirement)
            });
        }

        const testCases = {
            12: 2,
            14: 2,
            1969: 654,
            100756: 33583
        }

        Object.entries(testCases).forEach(([mass, expectedFuel]) => testFuelCalculator(Number.parseInt(mass), expectedFuel));
    });

    describe('calculateFuelRecursive', function () {
        const testFuelCalculator = (moduleMass: number, expectedFuelRequirement: number) => {
            it(`should require ${expectedFuelRequirement} for module of mass ${moduleMass}`, function () {
                expect(calculateFuelRequirementByMassRecursively(moduleMass)).toEqual(expectedFuelRequirement)
            });
        }

        const testCases = {
            12: 2,
            14: 2,
            1969: 966,
            100756: 50346
        }

        Object.entries(testCases).forEach(([mass, expectedFuel]) => testFuelCalculator(Number.parseInt(mass), expectedFuel));
    });

    describe('For given input', function () {
        it('should add all fuel requirements together', function () {
            let result = splitLines(data)
                .map(str => Number.parseInt(str))
                .map(calculateFuelRequirementByMass)
                .reduce((prev, curr) => prev + curr, 0);

            expect(result).toEqual(3454026);
        });

        it('should add all fuel requirements together including fuel required for fuel', function () {
            let result = splitLines(data)
                .map(str => Number.parseInt(str))
                .map(calculateFuelRequirementByMassRecursively)
                .reduce((prev, curr) => prev + curr, 0);

            expect(result).toEqual(5178170);
        });

    });
});
