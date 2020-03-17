import citySequence from "./city";
import webAreaSequence from "./web_area";
import countrySequence from "./country";

export const startLocationForCMSSequence = async function () {
    console.log("> Fetching Data From SDM");
    await countrySequence();
    await citySequence();
    await webAreaSequence();
}