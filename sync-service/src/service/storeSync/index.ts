import storeStatusSequence from "./storeStatus";

export const startStoreDataSync = async function () {
    console.log("> Fetching Store Data From SDM");
    await storeStatusSequence();
    console.log("> Store Data fetch from SDM complete");
}