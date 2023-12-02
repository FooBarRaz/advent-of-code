import {hex2bin} from "../../../utils/numbers";
import {decodePacket} from "../problemSolver";

describe('hex2bin', function () {
    it('should convert A to 1010', function () {
        expect(hex2bin('A')).toBe('1010');
    });
    it('should convert B to 1011', function () {
        expect(hex2bin('B')).toBe('1011');
    });

    it('should convert C to 1100', function () {
        expect(hex2bin('C')).toBe('1100');
    });
});

describe('decode packet', function () {
    const { version, id } = decodePacket('110100101111111000101000')
    expect(version).toEqual(6);
    expect(id).toEqual(4);
});