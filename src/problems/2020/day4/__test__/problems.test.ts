import { parsePassportInfo, PassportInfo, validateProblem1 } from "../problems";
import { readFile } from '../../../utils/dataReader';

describe('day 4', () => {
    describe('validate passport', () => {
        describe('when passport is missing required fields', () => {
            let validPassport: PassportInfo
            beforeEach(() => {
                validPassport = {
                    hgt: 'foo',
                    ecl: 'foo',
                    eyr: 'foo',
                    hcl: 'foo',
                    byr: 'foo',
                    pid: 'foo',
                    iyr: 'foo',
                    cid: 'foo'
                };
            });

            const requiredFields = ['hgt', 'ecl', 'eyr', 'hcl', 'byr', 'pid', 'iyr'];
            requiredFields.forEach(field => {
                it(`should be invalid if ${field} is missing`, () => {
                    delete validPassport[field]
                    const isValid = validateProblem1(validPassport)
                    expect(isValid).toBeFalsy()
                });
            })

            it('should be valid if all required fields present', () => {
                expect(validateProblem1(validPassport)).toBeTruthy()
            });

        });
        it('should separate out each case from file', async () => {
            let stringPromise = await readFile('src/day4/datafile.txt');
            console.log(stringPromise);
        });
    });

    describe('parse input', () => {
        describe('it should split into key value pairs', () => {
            it('should parse it into an object', () => {
                const input = `hgt:181in ecl:grn eyr:2034 hcl:#7d3b0c byr:2018 pid:206240985 iyr:2015`;

                let result = parsePassportInfo(input);

                expect(result).toEqual({
                    hgt: '181in',
                    ecl: 'grn',
                    eyr: '2034',
                    hcl: '#7d3b0c',
                    byr: '2018',
                    pid: '206240985',
                    iyr: '2015'
                })
            });
        });
    });
});
