import citySequence from "./city";
import areaSequence from "./area";
import storeSequence from "./store";
import countrySequence from "./country";

export const startLocationSequence = async function () {

    console.log("> Fetching Data From SDM");
    await Promise.all([countrySequence(), citySequence(), areaSequence()]);
    await storeSequence();
}