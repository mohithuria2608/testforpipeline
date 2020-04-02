import comboItem from "./combo.product";
import singleItem from "./single.product";

export default async function (menuId: number, element: any) {

    // find the element type of the element
    switch (element.Element_Type) {
        case "0": return await singleItem(element, menuId);
        case "3": return await comboItem(element, menuId);
        default: return null;
    }
}
