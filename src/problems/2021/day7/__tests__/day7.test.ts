import {optimalFuelCostConstant, optimalFuelCostTriangular} from "../day7";
import {data} from "../data";

describe('Day 7', function () {
    describe('find optimal spot for crabs to align on', function () {
        let testDataRaw: string;
        let testData: number[];
        beforeEach(function () {
            testDataRaw = `16,1,2,0,4,2,7,1,2,14`;
            testData = testDataRaw.split(',').map(str => Number.parseInt(str));
        });


        describe('constant fuel consumption', function () {

            it('should find optimal fuel cost for constant fuel burning', function () {
                const expectedFuelCost = 37
                const result = optimalFuelCostConstant(testData)
                expect(result).toEqual(expectedFuelCost)
            });
        });

        describe('solve problem 1', function () {
            it('should find correct answer for dataset', function () {
                const expectedResult = 344138
                const input = data.split(',').map(str => Number.parseInt(str))
                const result = optimalFuelCostConstant(input)
                expect(result).toEqual(expectedResult)
            });

        });

        describe('Triangular fuel consumption', function () {
            it('should find the lowest fuel cost for triangular burnage', function () {
                const expectedFuelCost = 168
                const result = optimalFuelCostTriangular(testData)
                expect(result).toEqual(expectedFuelCost)
            });

            describe('solve problem 2', function () {
                it('should find correct answer for dataset', function () {
                    const expectedResult = 94862124
                    const input = data.split(',').map(str => Number.parseInt(str))
                    const result = optimalFuelCostTriangular(input)
                    expect(result).toEqual(expectedResult)
                });
            });
        });
    });
});
