declare namespace IUserServiceRequest {

    interface IGetUserById {
        request: IId
    }

    interface IId {
        id: string,
    }
}
