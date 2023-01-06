export class GridPosition3D {
    static fromObject(obj: { x: number, y: number, z: number }): GridPosition3D {
        return new GridPosition3D(obj.x, obj.y, obj.z)
    }

    static fromString(str: string): GridPosition3D {
        const [x, y, z] = str.split(',').map(Number)
        return new GridPosition3D(x, y, z)
    }

    constructor(public x: number, public y: number, public z: number) {
    }

    toString() {
        return `${this.x},${this.y},${this.z}`
    }

    isTouching(right: GridPosition3D): boolean {
        //false is cubes are diagonally adjacent
        return this.x === right.x && this.y === right.y && Math.abs(this.z - right.z) === 1 ||
            this.x === right.x && this.z === right.z && Math.abs(this.y - right.y) === 1 ||
            this.y === right.y && this.z === right.z && Math.abs(this.x - right.x) === 1
    }

    isTouchingOutside(that: GridPosition3D): boolean {
        // right is touching outside if x, y or z is 1 more and the other two are equal
        const dimensions = ['x', 'y', 'z']
        return dimensions.some((dimension, index) => {
            const otherDims = [...dimensions]
            otherDims.splice(index, 1)

            return (this[dimension] - that[dimension] === -1)
                && otherDims.every(otherDim => this[otherDim] === that[otherDim])
        })

    }

    equals(other: GridPosition3D) {
        return this.x === other.x && this.y === other.y && this.z === other.z
    }
}


export const parseInput = (input: string): GridPosition3D[] => {
    return input.split('\n')
        .map(GridPosition3D.fromString)
}

export const totalSurfaceArea = (cubes: GridPosition3D[]): number => {
    const maxExposedSides = 6;
    const cubeData = cubes.reduce((acc, cube, index) => {
        const cubesCopy = [...cubes]
        cubesCopy.splice(index, 1)
        const touchingCubes = cubesCopy.filter(otherCube => otherCube.isTouching(cube))
        const numberOfExposedSides = maxExposedSides - touchingCubes.length;

        return acc + numberOfExposedSides
    }, 0)

    return cubeData
}

const totalExteriorSurfaceArea = (cubes: GridPosition3D[]): number => {
    const maxExposedSides = 6;
    const cubeData = cubes.reduce((acc, cube, index) => {
        const cubesCopy = [...cubes]
        cubesCopy.splice(index, 1)
        //only count sides that are exposed to exterior
        const touchingCubes = cubesCopy.filter(otherCube => otherCube.isTouchingOutside(cube))
        const numberOfExposedSides = maxExposedSides - touchingCubes.length;

        return acc + numberOfExposedSides;
    }, 0)

    return cubeData
}

export type Coordinate = [number, number, number];

// export function calculateSurfaceArea(coords: GridPosition3D[]): number {
//     let surfaceArea = 0;
//
//     for (const coord of coords) {
//         for (let i = 0; i < 3; i++) {
//             for (let j = -1; j <= 1; j += 2) {
//                 const tempCoord = { ...coord };
//                 tempCoord[['x', 'y', 'z'][i]] += j;
//
//                 if (!coords.some(c => c.x === tempCoord.x && c.y === tempCoord.y && c.z === tempCoord.z)) {
//                     surfaceArea++;
//                 }
//             }
//         }
//     }
//
//     return surfaceArea;
// }
export function calculateSurfaceArea(coords: GridPosition3D[]): number {
    let surfaceArea = 0;

    for (const coord of coords) {
        for (let i = 0; i < 3; i++) {
            for (let j = -1; j <= 1; j += 2) {
                const tempCoord = { ...coord };
                tempCoord[['x', 'y', 'z'][i]] += j;

                // Check if the adjacent cube is occupied
                const isAdjacentCubeOccupied = coords.some(c => c.x === tempCoord.x && c.y === tempCoord.y && c.z === tempCoord.z);

                // Check if the adjacent cube is not surrounded by other cubes in all dimensions
                const isAdjacentCubeSurrounded = coords.some(c => c.x === tempCoord.x && c.y === tempCoord.y && c.z !== tempCoord.z) &&
                    coords.some(c => c.x === tempCoord.x && c.y !== tempCoord.y && c.z === tempCoord.z) &&
                    coords.some(c => c.x !== tempCoord.x && c.y === tempCoord.y && c.z === tempCoord.z);

                if (!isAdjacentCubeOccupied && !isAdjacentCubeSurrounded) {
                    surfaceArea++;
                }
            }
        }
    }

    return surfaceArea;
}
