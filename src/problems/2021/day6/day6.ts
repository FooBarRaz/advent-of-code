import {fillArray, sum} from "../../../utils/listOps";
import {number} from "yup";

let lanterfishIds = 0

export class LanternFish {
    public id: number

    constructor(public timer = 8) {
        this.id = lanterfishIds++
    }

    elapseDay(): Array<LanternFish> {
        if (this.timer--) {
            return [this]
        } else {
            this.timer = 6
            return [this, new LanternFish(8)]
        }
    }
}

export class School {
    private lanternFish: Array<LanternFish>;
    private fishByTimers: Record<number, number>;

    constructor(public initialState: Array<number>) {
        this.lanternFish = []
        this.fishByTimers = fillArray(9).reduce((prev, curr) => ({...prev, [curr]: 0}), {})
        // initialState.forEach(eachTimer => this.lanternFish.push(new LanternFish(eachTimer)))
        initialState.forEach(eachTimer => {
            this.fishByTimers[eachTimer] = this.fishByTimers[eachTimer] + 1
        })
    }

    tick(numberOfDays: number = 1): void {
        for (let i = 0; i < numberOfDays; i++) {
            const currentCounts = {...this.fishByTimers}
            const fishThatNeedToSpawn = currentCounts[0]

            for (let i = 0; i <= 7; i++) {
                this.fishByTimers[i] = currentCounts[i+1]
            }

            this.fishByTimers[6] += fishThatNeedToSpawn
            this.fishByTimers[8] = fishThatNeedToSpawn
        }

    };

    allFishTimers(): Array<number> {
        return this
            .lanternFish
            .sort((a, b) => a.id - b.id)
            .map(eachFish => eachFish.timer)
    }

    amountOfFish(): number {
        return sum(Object.values(this.fishByTimers))
    }
}
