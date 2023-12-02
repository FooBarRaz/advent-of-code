import {LanternFish, School} from "../day6";
import {data} from "../data";

describe('Day 6', function () {
    describe('LanterFish', function () {
        describe('construct', function () {
            describe('when param provided', function () {
                it('should have a timer value with given param', function () {
                    const lanternfish = new LanternFish(42)
                    expect(lanternfish.timer).toEqual(42)
                });

            });

            describe('when no params provided', function () {
                it('should have a timer value of 8', function () {
                    const lanternfish = new LanternFish()
                    expect(lanternfish.timer).toEqual(8)
                });

            });
        });

        describe('elapseDay', function () {
            let lanternFish: LanternFish;
            describe('when days left until producing new one', function () {
                beforeEach(function () {
                    lanternFish = new LanternFish(5)
                });

                it('should return itself with one fewer day left', function () {
                    let result = lanternFish.elapseDay();
                    expect(result).toContain(lanternFish)
                    expect(result[0].timer).toEqual(4)
                });
            });

            describe('when 0 days left', function () {
                let result: Array<LanternFish>;
                beforeEach(function () {
                    lanternFish = new LanternFish(0)
                    result = lanternFish.elapseDay();
                });

                it('should return itself and new lanternfish', function () {
                    expect(result).toHaveLength(2)
                });

                it('should reset its own timer', function () {
                    expect(result.map(fishes => fishes.timer)).toContain(6)
                });

                it('should have an additional fish with a timer of 8', function () {
                    expect(result.map(fishes => fishes.timer)).toContain(8)
                });

            });

        });
    });

    describe('day counter', function () {
        describe('SeaFloor', function () {
            describe('tick', function () {
                // it('should elapse days on each fish and return state', function () {
                //     const seaFloor = new School([3, 4, 3, 1, 2])
                //     seaFloor.tick(2);
                //     // let result = seaFloor.allFishTimers();
                //     expect(seaFloor.amountOfFish()).toEqual(6)
                // })
                // ;
                //
                // it('should tick by a large amount', function () {
                //     const seaFloor = new School([3, 4, 3, 1, 2])
                //     seaFloor.tick(18);
                //     // const result =  seaFloor.allFishTimers()
                //     // expect(result).toEqual([6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8])
                //     expect(seaFloor.amountOfFish()).toEqual(26)
                // });

                describe('test data', function () {
                    const testData = `After  1 day:  2,3,2,0,1
After  2 days: 1,2,1,6,0,8
After  3 days: 0,1,0,5,6,7,8
After  4 days: 6,0,6,4,5,6,7,8,8
After  5 days: 5,6,5,3,4,5,6,7,7,8
After  6 days: 4,5,4,2,3,4,5,6,6,7
After  7 days: 3,4,3,1,2,3,4,5,5,6
After  8 days: 2,3,2,0,1,2,3,4,4,5
After  9 days: 1,2,1,6,0,1,2,3,3,4,8
After 10 days: 0,1,0,5,6,0,1,2,2,3,7,8
After 11 days: 6,0,6,4,5,6,0,1,1,2,6,7,8,8,8
After 12 days: 5,6,5,3,4,5,6,0,0,1,5,6,7,7,7,8,8
After 13 days: 4,5,4,2,3,4,5,6,6,0,4,5,6,6,6,7,7,8,8
After 14 days: 3,4,3,1,2,3,4,5,5,6,3,4,5,5,5,6,6,7,7,8
After 15 days: 2,3,2,0,1,2,3,4,4,5,2,3,4,4,4,5,5,6,6,7
After 16 days: 1,2,1,6,0,1,2,3,3,4,1,2,3,3,3,4,4,5,5,6,8
After 17 days: 0,1,0,5,6,0,1,2,2,3,0,1,2,2,2,3,3,4,4,5,7,8
After 18 days: 6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8`

                    describe('cases', function () {
                        let cases: Array<{ amountOfDays: number, expectedFish: number }>
                        cases = testData.split('\n')
                            .map((eachLine) => {
                                const [, amountOfDays] = eachLine.match(/After\s+(\d+) day/)
                                const [, expectation] = eachLine.split(':')
                                return {
                                    amountOfDays: Number.parseInt(amountOfDays),
                                    expectedFish: expectation.split(',').length
                                }
                            }, {})

                        cases.forEach((eachCase) => {
                            it(`should have ${eachCase.expectedFish} after ${eachCase.amountOfDays}`, function () {
                                const seaFloor = new School([3, 4, 3, 1, 2])
                                seaFloor.tick(eachCase.amountOfDays);
                                // const result =  seaFloor.allFishTimers()
                                expect(seaFloor.amountOfFish()).toEqual(eachCase.expectedFish)
                            });
                        })
                    })
                });
                it('should tick by a larger amount', function () {
                    const seaFloor = new School([3, 4, 3, 1, 2])
                    seaFloor.tick(80);
                    // const result =  seaFloor.allFishTimers()
                    expect(seaFloor.amountOfFish()).toEqual(5934)
                });

                it('should tick by largest amount', function () {
                    const seaFloor = new School([3, 4, 3, 1, 2])
                    seaFloor.tick(256);
                    const result = seaFloor.allFishTimers()
                    expect(seaFloor.amountOfFish()).toEqual(26984457539)
                });
            });
        });
    });

    describe('problems', function () {
        describe('solve problem 1', function () {

            it('should return number of fish after 80 days', function () {
                const input = data.split(',').map(each => Number.parseInt(each))
                const seaFloor = new School(input)

                seaFloor.tick(80)

                expect(seaFloor.amountOfFish()).toEqual(386640)
            });
        });

        describe('solve problem 2', function () {

            it('should return number of fish after 80 days', function () {
                const input = data.split(',').map(each => Number.parseInt(each))
                const seaFloor = new School(input)

                seaFloor.tick(256)

                expect(seaFloor.amountOfFish()).toEqual(1733403626279)
            });
        });

    });
});
