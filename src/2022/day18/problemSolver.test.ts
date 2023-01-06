import {
    calculateSurfaceArea,
    GridPosition3D,
    parseInput,
    totalSurfaceArea
} from "./problemSolver";
import {data} from "./data";

const generalInput = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`

const sampleInput = `1,1,1
2,1,1
3,1,1
4,1,1
5,1,1
6,1,1
1,2,1
2,2,1
3,2,1
4,2,1
5,2,1
6,2,1
1,3,1
2,3,1
3,3,1
4,3,1
5,3,1
6,3,1
1,1,2
2,1,2
3,1,2
4,1,2
5,1,2
6,1,2
1,2,2
6,2,2
1,3,2
2,3,2
3,3,2
4,3,2
5,3,2
6,3,2
1,1,3
2,1,3
3,1,3
4,1,3
5,1,3
6,1,3
1,2,3
2,2,3
3,2,3
4,2,3
5,2,3
6,2,3
1,3,3
2,3,3
3,3,3
4,3,3
5,3,3
6,3,3`

describe('day 18', function () {

    describe('parseInput', function () {
        it('should read each line of input as a grid position', function () {
            const result = parseInput(generalInput)
            expect(result).toHaveLength(13)
        });
    });

    describe('areCubesTouching', function () {
        const testCases = [
            {
                left: GridPosition3D.fromObject({x: 1, y: 1, z: 1}),
                right: GridPosition3D.fromObject({x: 2, y: 1, z: 1}),
                areTouching: true,
            },
            {
                left: GridPosition3D.fromObject({x: 1, y: 1, z: 1}),
                right: GridPosition3D.fromObject({x: 3, y: 1, z: 1}),
                areTouching: false
            },
            {
                left: GridPosition3D.fromObject({x: 1, y: 1, z: 1}),
                right: GridPosition3D.fromObject({x: 1, y: 3, z: 1}),
                areTouching: false
            },
            {
                left: GridPosition3D.fromObject({x: 1, y: 1, z: 1}),
                right: GridPosition3D.fromObject({x: 1, y: 1, z: 3}),
                areTouching: false
            },
            {
                left: GridPosition3D.fromObject({x: 1, y: 1, z: 1}),
                right: GridPosition3D.fromObject({x: 1, y: 2, z: 1}),
                areTouching: true
            },
            {
                left: GridPosition3D.fromObject({x: 1, y: 1, z: 1}),
                right: GridPosition3D.fromObject({x: 1, y: 1, z: 2}),
                areTouching: true
            },
            // diagonally adjacent cubes should not be touching
            {
                left: GridPosition3D.fromObject({x: 1, y: 1, z: 1}),
                right: GridPosition3D.fromObject({x: 2, y: 2, z: 1}),
                areTouching: false
            },
            {
                left: GridPosition3D.fromObject({x: 1, y: 1, z: 1}),
                right: GridPosition3D.fromObject({x: 2, y: 1, z: 2}),
                areTouching: false
            }
        ]

        testCases.forEach(({left, right, areTouching}) => {
            describe(`for cubes ${left} & ${right}`, function () {

                it(`should return areTouching as ${areTouching}`, function () {
                    expect(left.isTouching(right)).toBe(areTouching)
                });
            });
        });

        describe('isTouchingOutside', function () {
            const testCases = [
                {
                    description: 'in front on x axis',
                    thisCube: GridPosition3D.fromString('1,1,1'),
                    otherCube: GridPosition3D.fromString('2,1,1'),
                    isTouchingOutside: true
                },
                {
                    description: 'behind on x axis',
                    thisCube: GridPosition3D.fromString('2,1,1'),
                    otherCube: GridPosition3D.fromString('1,1,1'),
                    isTouchingOutside: false
                },
                {
                    description: 'in front on y axis',
                    thisCube: GridPosition3D.fromString('1,1,1'),
                    otherCube: GridPosition3D.fromString('1,2,1'),
                    isTouchingOutside: true
                },
                {
                    description: 'behind on y axis',
                    thisCube: GridPosition3D.fromString('1,2,1'),
                    otherCube: GridPosition3D.fromString('1,1,1'),
                    isTouchingOutside: false
                },
                {
                    description: 'in front on z axis',
                    thisCube: GridPosition3D.fromString('1,1,1'),
                    otherCube: GridPosition3D.fromString('1,1,2'),
                    isTouchingOutside: true
                },
                {
                    description: 'behind on z axis',
                    thisCube: GridPosition3D.fromString('1,1,2'),
                    otherCube: GridPosition3D.fromString('1,1,1'),
                    isTouchingOutside: false
                }
            ]

            testCases.forEach(({description, thisCube, otherCube, isTouchingOutside}) => {
                describe(description, function () {
                    it(`should return ${isTouchingOutside}`, function () {
                        expect(thisCube.isTouchingOutside(otherCube)).toBe(isTouchingOutside)
                    });
                });
            });
        });

        describe('exposedSides', function () {

            const testCases = [
                {
                    description: '2 cubes on same row',
                    cubes: [
                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('2,1,1'),
                    ],
                    expectedExposedSides: 10
                },
                {
                    description: '2 cubes on same column',
                    cubes: [
                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('1,2,1'),
                    ],
                    expectedExposedSides: 10
                },
                {
                    description: '2 cubes on same depth',
                    cubes: [

                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('1,1,2'),
                    ],
                    expectedExposedSides: 10
                },
                {
                    description: '3 cubes side by side on same row',
                    cubes: [
                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('2,1,1'),
                        GridPosition3D.fromString('3,1,1'),
                    ],
                    expectedExposedSides: 14
                },
                {
                    description: '4 cubes side by side on same row',
                    cubes: [
                        GridPosition3D.fromString('0,1,1'),
                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('2,1,1'),
                        GridPosition3D.fromString('3,1,1'),
                    ],
                    expectedExposedSides: 18
                },
                {
                    description: '4 cubes side by side on same column',
                    cubes: [
                        GridPosition3D.fromString('1,0,1'),
                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('1,2,1'),
                        GridPosition3D.fromString('1,3,1'),
                    ],
                    expectedExposedSides: 18
                },
                {
                    description: '3 cubes in _| shape',
                    cubes: [
                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('1,2,1'),
                        GridPosition3D.fromString('1,3,1'),
                    ],
                    expectedExposedSides: 14
                },
                {
                    description: '4 cubes in square arrangement',
                    cubes: [
                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('1,2,1'),
                        GridPosition3D.fromString('2,1,1'),
                        GridPosition3D.fromString('2,2,1'),
                    ],
                    expectedExposedSides: 16
                },
                {
                    description: '2x2x2 cube',
                    cubes: [
                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('1,2,1'),
                        GridPosition3D.fromString('2,1,1'),
                        GridPosition3D.fromString('2,2,1'),
                        GridPosition3D.fromString('1,1,2'),
                        GridPosition3D.fromString('1,2,2'),
                        GridPosition3D.fromString('2,1,2'),
                        GridPosition3D.fromString('2,2,2'),
                    ],
                    expectedExposedSides: 24
                },
                {
                    description: 'hollow 3x3x3 cube',
                    cubes: [
                        GridPosition3D.fromString('1,1,1'),
                        GridPosition3D.fromString('1,2,1'),
                        GridPosition3D.fromString('1,3,1'),
                        GridPosition3D.fromString('2,1,1'),
                        GridPosition3D.fromString('2,2,1'),
                        GridPosition3D.fromString('2,3,1'),
                        GridPosition3D.fromString('3,1,1'),
                        GridPosition3D.fromString('3,2,1'),
                        GridPosition3D.fromString('3,3,1'),
                        GridPosition3D.fromString('1,1,2'),
                        GridPosition3D.fromString('1,2,2'),
                        GridPosition3D.fromString('1,3,2'),
                        GridPosition3D.fromString('2,1,2'),
                        // GridPosition3D.fromString('2,2,2'),
                        GridPosition3D.fromString('2,3,2'),
                        GridPosition3D.fromString('3,1,2'),
                        GridPosition3D.fromString('3,2,2'),
                        GridPosition3D.fromString('3,3,2'),
                        GridPosition3D.fromString('1,1,3'),
                        GridPosition3D.fromString('1,2,3'),
                        GridPosition3D.fromString('1,3,3'),
                        GridPosition3D.fromString('2,1,3'),
                        GridPosition3D.fromString('2,2,3'),
                        GridPosition3D.fromString('2,3,3'),
                        GridPosition3D.fromString('3,1,3'),
                        GridPosition3D.fromString('3,2,3'),
                        GridPosition3D.fromString('3,3,3'),
                    ],
                    expectedExposedSides: 60,
                    expectedExteriorSurfaceArea: 54
                },
                {
                    description: 'general input',
                    cubes: parseInput(generalInput),
                    expectedExposedSides: 64,
                    expectedExteriorSurfaceArea: 58
                },
                {
                    description: 'my input',
                    cubes: parseInput(data),
                    expectedExposedSides: 3412,
                    expectedExteriorSurfaceArea: 591,
                },
                {
                    description: 'sample input',
                    cubes: parseInput(sampleInput),
                    expectedExposedSides: 108,
                    expectedExteriorSurfaceArea: 90,
                }
            ]

            testCases
                // .filter((each, index)=> index === testCases.length -1)
                .forEach(({description, cubes, expectedExposedSides, expectedExteriorSurfaceArea}) => {
                    describe(description, function () {
                        it(`should find exposed sides for ${description}`, function () {
                            expect(totalSurfaceArea(cubes)).toBe(expectedExposedSides)
                        })
                        if (expectedExteriorSurfaceArea !== undefined) {
                            it('should find exterior surface area', function () {
                                expect(calculateSurfaceArea(cubes)).toBe(expectedExteriorSurfaceArea)
                            });
                        }
                    });
                });
        });
    });
});

