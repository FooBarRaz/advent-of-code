import { readFile } from '../../utils/dataReader';
import * as yup from 'yup';

export type PassportInfo = {
    hgt: string
    ecl: string
    eyr: string
    hcl: string
    byr: string
    pid: string
    iyr: string
    cid?: string
}
export const parsePassportInfo = (input: string): PassportInfo => {
    return input.replace(new RegExp('\n', 'g'), ' ').split(' ').map(eachAttribute => {
        const [key, val] = eachAttribute.split(':')
        return {[key]: val}
    }).reduce((acc, curr) => ({...acc, ...curr}), {} as PassportInfo) as PassportInfo
}

export const validateProblem1 = (passportInfo: Partial<PassportInfo>): boolean => {
    const schema = yup.object({
        hgt: yup.string().required(),
        ecl: yup.string().required(),
        eyr: yup.string().required(),
        hcl: yup.string().required(),
        byr: yup.string().required(),
        pid: yup.string().required(),
        iyr: yup.string().required(),
        cid: yup.string().notRequired()
    });

    return schema.isValidSync(passportInfo);
}

export const validateProblem2 = (passportInfo: Partial<PassportInfo>): boolean => {
    const schema = yup.object({
        hgt: yup.string().required().matches(/\d+(cm$)|(in$)/).test(val => {
            if (val.includes('cm')) {
                return yup.number().min(150).max(193).isValidSync(Number.parseInt(val))
            } else if (val.includes('in')) {
                return yup.number().min(59).max(76).isValidSync(Number.parseInt(val))
            }
            else return false;
        }),
        ecl: yup.string().required().oneOf(['amb','blu','brn','gry','grn','hzl','oth']),
        eyr: yup.number().required().transform(val => Number.parseInt(val)).min(2020).max(2030),
        hcl: yup.string().required().matches(/^#[0-9a-f]{6}/i),
        byr: yup.number().required().transform((val) => Number.parseInt(val)).min(1920).max(2002),
        pid: yup.string().required().matches(/\d{9}/),
        iyr: yup.number().required().transform(val => Number.parseInt(val)).min(2010).max(2020),
        cid: yup.string().notRequired()
    });

    return schema.isValidSync(passportInfo);
}

const parseCases = (input: string): Array<string>  => input.split('\n\n')

export const problem1 = () => {
    readFile('src/day4/datafile.txt')
        .then(parseCases)
        .then(cases => cases.map(eachCase => parsePassportInfo(eachCase)))
        .then(passports => passports.filter(validateProblem1))
        .then(validPassports => validPassports.length)
        .then(numberOfValidPassports => {
            console.log(`Valid Passports: `, numberOfValidPassports)
            return numberOfValidPassports
        })
}

export const problem2 = () => {
    readFile('src/day4/datafile.txt')
        .then(parseCases)
        .then(cases => cases.map(eachCase => parsePassportInfo(eachCase)))
        .then(passports => passports.filter(validateProblem2))
        .then(validPassports => validPassports.length)
        .then(numberOfValidPassports => {
            console.log(`Valid Passports: `, numberOfValidPassports)
            return numberOfValidPassports
        })
}
