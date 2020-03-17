import citySequence from "./city";
import areaSequence from "./area";
import countrySequence from "./country";

export const startLocationForCMSSequence = async function () {
    console.log("> Fetching Data From SDM");
    await countrySequence();
    await citySequence();
    await areaSequence();
}