import {split} from "lodash";
import {splitLines} from "../../utils/dataReader";

export class Cave {
    private _isBigCave: boolean;

    constructor(public identifier: string) {
        this._isBigCave = identifier.toUpperCase() === identifier
    }

    public get isBig() {
        return this._isBigCave
    }
}

export class Path {
    public caves: Cave[]

    constructor(...caves: Cave[]) {
        this.caves = caves
    }
}

const isBig = (identifier: string) => {
    return identifier.toUpperCase() === identifier
}

const isUnvisited = (currentPath: string[], connectingCaves: string): boolean => !currentPath.includes(connectingCaves);

const canVisit = (currentPath: string[], potentialCaveToVisit: string): boolean => {
    const smallCavesPreviouslyVisited = currentPath
        .filter(x => !isBig(x))
        .filter(x => x !== 'start' && x !== 'end')
        .reduce((prev, curr) => {
            prev[curr] = (prev[curr] || 0) + 1
            return prev
        }, {})

    let maxNumberOfVisitsToSmallCaves = Math.max(...Object.values(smallCavesPreviouslyVisited).map(x => x as number));
    let canVisit = potentialCaveToVisit !== 'start' &&
        (maxNumberOfVisitsToSmallCaves < 2
            || (maxNumberOfVisitsToSmallCaves == 2 && !smallCavesPreviouslyVisited[potentialCaveToVisit]))

    return canVisit
};

export const parseInput = (input: string): Path[] => {
    return splitLines(input)
        .map(eachLine => eachLine.split('-').map(x => new Cave(x)))
        .reduce((prev, [caveA, caveB]) => [...prev, new Path(caveA, caveB)], [] as Path[]);
}

export const findDistinctPaths = (connections: Path[], startCave: string, endCave: string) => {
    const allPaths: string[][] = [[]]
    const buildPaths = (currentPath: string[], startCave: string) => {
        const newPath = [...currentPath, startCave]
        allPaths.push(newPath)

        const cavesFromStarCave = connections.filter(conn => conn.caves.some(cave => cave.identifier === startCave))
            .map(conn => conn.caves.find(c => c.identifier !== startCave).identifier)
            .filter(connectingCaves => isBig(connectingCaves) || isUnvisited(newPath, connectingCaves))

        cavesFromStarCave.forEach(connCave => {
            buildPaths(newPath, connCave)
        })
    }

    buildPaths([], startCave)

    let fullPaths = allPaths.filter(path => path.pop() === endCave);
    return fullPaths.length;
};

export const findDistinctPaths2 = (connections: Path[], startCave: string, endCave: string) => {
    const allPaths: string[][] = [[]]
    const buildPaths = (currentPath: string[], startCave: string) => {
        const newPath = [...currentPath, startCave]
        allPaths.push(newPath)

        if (startCave !== endCave) {
            const cavesFromStarCave = connections.filter(conn => conn.caves.some(cave => cave.identifier === startCave))
                .map(conn => conn.caves.find(c => c.identifier !== startCave).identifier)
                .filter(connectingCaves => isBig(connectingCaves) || canVisit(newPath, connectingCaves))

            cavesFromStarCave.forEach(connCave => {
                buildPaths(newPath, connCave)
            })
        }
    }
    buildPaths([], startCave)
    let fullPaths = allPaths.filter(path => path.pop() === endCave);
    return fullPaths;
};

