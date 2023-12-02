import {binaryToNumber} from "../../utils/numbers";

export const decodePacket = (binaryString: string) => {
    const versionAsBinary = binaryString.slice(0, 3)
    const idAsBinary = binaryString.slice(3, 6)
    return {
        version:  binaryToNumber(versionAsBinary),
        id:  binaryToNumber(idAsBinary),
    }
}