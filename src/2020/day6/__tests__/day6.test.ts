import {answeredYes, parseTestCases} from "../day6";
import {data} from "../data";

describe('Day6', function () {
    describe('data parser', function () {
        it('should split groups by double line separations', function () {
            let groupInfo = parseTestCases(data)[0];
            expect(groupInfo).toEqual({groupAnswers: ['v', 'vx','v','vx','nclmbv'] })
        });
    });

    describe('answeredYes', function () {
        it('should extract unique answers from group answers', function () {
            expect(answeredYes(['v', 'vx','v','vx','nclmbv'] )).toEqual(['v','x','n','c','l','m','b'])
        });
    });


    describe('problem 1', function () {

        describe('for dataset', function () {
            it('should calculate total amount of questions with yes answers', function () {
                const result = parseTestCases(data).map(testCase => testCase.groupAnswers)
                    .map(answeredYes)
                    .map(yesAnswers => yesAnswers.length)
                    .reduce((prev, curr) => prev + curr);

                expect(result).toEqual(6443);
            });

        });

    });
});

