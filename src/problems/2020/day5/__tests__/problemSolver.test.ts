import { calculateSeatId, figureOutSeatAssignment, findHighestSeatId } from '../problemSolver';

describe('day 5', () => {
    describe('figuring out row and seat', () => {
        it('should parse instructions and figure out row and seat', () => {
            const result = figureOutSeatAssignment('FBFBBFFRLR')
            expect(result).toEqual({row: 44, seat: 5});
        });

    });

    describe('calculateSeatId', () => {
        it('should multiply row by 8 then add the column', () => {
            const result = calculateSeatId({row: 44, seat: 5})
            expect(result).toEqual(357);
        });
    });

    describe('find missing seat ids', () => {
        it('should find missing seat id', () => {
            const result = calculateSeatId({row: 44, seat: 5})
            expect(result).toEqual(357);
        });

    });
});
