declare namespace IUserGrpcRequest {

    interface IGetUserById {
        request: IId
    }

    interface IId {
        id: string,
    }
}
