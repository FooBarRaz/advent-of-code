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

    equals(other: GridPosition3D) {
        return this.x === other.x && this.y === other.y && this.z === other.z
    }

    blockedOnSides(): number {
        return [this.x, this.y].reduce((acc, curr) => acc + (curr === 0 ? 1 : 0), 0)
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
        const blockedSides =  0//cube.blockedOnSides()
        const numberOfExposedSides = maxExposedSides - touchingCubes.length - blockedSides

        return acc + numberOfExposedSides
    }, 0)

    return cubeData
}