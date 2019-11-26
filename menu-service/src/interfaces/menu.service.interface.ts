declare namespace IMenuServiceRequest {

    interface IFetchMenu {
        request: IFetchMenuData
    }

    interface IFetchMenuData {
        country: string,
        isDefault: boolean,
    }

    interface IFetchMenuRes { }
}
