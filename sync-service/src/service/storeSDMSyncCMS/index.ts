import citySequence from "./city";
import areaSequence from "./area";
import countrySequence from "./country";
import storeSequence from "./store";

export const startLocationForCMSSequence = async function () {
    console.log("> Fetching Data From SDM");
    await countrySequence();
    await citySequence();
    await areaSequence();
    await storeSequence();
    console.log("> Data fetch from SDM complete");
}