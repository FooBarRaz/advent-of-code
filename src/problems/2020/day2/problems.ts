import { readFile } from '../../utils/dataReader';

type Case = {
    character: string;
    min: number;
    max: number;
    password: string;
};

const splitLines = (content: string): Array<string> => content.split('\n');
const parseInput = (lines: Array<string>): Array<Case> =>  {
    return lines.map(eachLine => {
        const [minMaxRaw, characterRaw, password] = eachLine.split(' ');
        const [character] = characterRaw;
        const [min, max] = minMaxRaw.split('-').map(x => Number.parseInt(x));
        return {
            character,
            min,
            max,
            password
        }
    })
}

const isValidPassword = (validationCase: Case): boolean => {
    const occurrencesOfString = [...validationCase.password].filter(eachChar => eachChar === validationCase.character);
    let numberOfOccurrencesOfChar = occurrencesOfString.length;
    let b = numberOfOccurrencesOfChar >= validationCase.min && numberOfOccurrencesOfChar <= validationCase.max;
    console.log('%s is valid?:  %s', validationCase, b);
    return b;
}

const isValidPerPolicy2 = (validationCase: Case) => {
    const charsAtPositions = [validationCase.password[validationCase.min -1], validationCase.password[validationCase.max -1]];
    const isValid = charsAtPositions.filter(x => x === validationCase.character).length === 1;
    console.log('%s is valid?:  %s', validationCase, isValid);
    return isValid;
};


const filterValidPasswords = (cases: Case[]) => {
   return cases.filter(isValidPassword);
}

const day2Problem1 = () => {
    readFile('src/day2/data/datafile.txt')
        .then(splitLines)
        .then(parseInput)
        .then(filterValidPasswords)
        .then(console.log)
}
