import vGroupSequence from "./vgroup";
import vSelectorSequence from "./vselector";
import webComboSequence from "./webcombo";

import vMenuSequence from "./vmenu";

export const startMenuSyncSequence = async function (menuId: number) {
    console.log("> Fetching Pre-requisite menu data From SDM");
    await Promise.all([webComboSequence(), vGroupSequence(), vSelectorSequence()]);
    console.log("> Fetching Menu data From SDM for menuID -> ", menuId);
    await vMenuSequence(menuId);
    console.log("> Menu Data fetch from SDM complete");
}