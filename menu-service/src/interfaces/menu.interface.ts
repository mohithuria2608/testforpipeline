declare namespace IMenuRequest {

    interface IFetchMenu extends  ICommonRequest.ICordinatesOpt {
        country: string,
        isDefault: boolean,
    }
}
