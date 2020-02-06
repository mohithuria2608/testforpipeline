declare namespace IMenuGrpcRequest {

    interface IFetchMenuReq {
        menuId?: number,
        language: string
        country: string,
        isDefault: boolean,
    }

    interface IFetchMenuRes {
        menu: IMenu[],
    }

    interface IMenu {
        id?: number,
        position?: number,
        name?: string,
        description?: string,
        inSide?: number,
        finalPrice?: number,
        specialPrice?: number,
        typeId?: string,
        originalTypeId?: string,
        catId?: number,
        metaKeyword?: string[],
        bundleProductOptions?: IBundleProductOptions[],
        selectedItem?: number,
        configurableProductOptions?: IConfigurableProductOptions[],
        items?: IItems[],
        sku?: number,
        imageSmall?: string,
        imageThumbnail?: string,
        image?: string,
        taxClassId?: number,
        virtualGroup?: number,
        visibility?: number,
        associative?: number,
    }

    interface IBundleProductOptions {
        position: number,
        isDependent: number,
        maximumQty: number,
        minimumQty: number,
        title: string,
        subtitle: string,
        ingredient: number,
        type: string,
        productLinks: IProductLinks[],
        name: string,
        imageThumbnail: string,
    }

    interface IProductLinks {
        position?: number,
        price?: number,
        id?: number,
        name?: string,
        imageThumbnail?: string,
        selectionQty?: number,
        subOptions?: ISubOptions[],
        selected?: number,
        default?: number,
        dependentSteps?: number[],
        option_id?: number,
        selection_id?: number,
        title?: string,
        sku?: number,
    }

    interface ISubOptions {
        price: number,
        selected: number,
        name: string,
        id: number,
        sku: number,
        option_id: number,
        selection_id: number,
        title: string,
    }
    interface IConfigurableProductOptions {
        id: number,
        position: number,
        title: string,
        subtitle: string,
        selIndex: number,
        options: IOptions[],
    }

    interface IOptions {
        isSelected: number,
        position: number,
        title: string,
        id: number,
        name: string,
    }

    interface IItems {
        id: number,
        position: number,
        name?: string,
        inSide?: number,
        catId?: number,
        bundleProductOptions?: IBundleProductOptions[],
        selectedItem?: number,
        configurableProductOptions?: IConfigurableProductOptions[],
        imageSmall?: string,
        image?: string
        imageThumbnail: string,
        title?: string,
        description: string,
        finalPrice: number,
        specialPrice: number,
        metaKeyword: string[],
        typeId: string,
        sel1Value: number,
        sel2Value: number,
        sel3Value: number,
        taxClassId?: number,
        virtualGroup?: number,
        visibility?: number,
        associative?: number,
        sku: number,
    }
}
