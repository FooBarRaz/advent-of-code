import { readFile } from "../../../utils/dataReader";

const splitLines = (content: string): Array<string> => content.split('\n');

const convertEachLineToNumbers = (lines: Array<string>): Array<number> => lines
    .map(eachLine => Number.parseInt(eachLine))
    .filter(n => !isNaN(n));

const findNumbersThatAddUpTo = (targetSum: number, numberList: Array<number>) => {
    const set = new Set(numberList);
    let number = numberList.find(number => set.has(targetSum - number));
    return number ? [number, targetSum - number] : [];
};

const multiplyTogether = (numberList: Array<number>) => numberList.reduce((acc, curr) => acc * curr)

export const problem1 = () => readFile('day1/data/datafile.txt')
    .then(splitLines)
    .then(convertEachLineToNumbers)
    .then(nums => findNumbersThatAddUpTo(2020, nums))
    .then(multiplyTogether)
    .then(console.log)

export const problem2 = () =>
    readFile('day1/data/datafile.txt')
        .then(splitLines)
        .then(convertEachLineToNumbers)
        .then(numbers => {
            for (let i = 0; i < numbers.length; i++) {
                const number = numbers[i];
                const targetSum = 2020 - number;
                let matches = findNumbersThatAddUpTo(targetSum, numbers.filter(x => x !== number));
                if (matches.length) {
                    return multiplyTogether(matches.concat(number));
                }
            }
        })
        .then(console.log);


