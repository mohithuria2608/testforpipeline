declare namespace IKafkaGrpcRequest {

    interface ICreateUserData {
        lastname: string
        firstname: string
        email: string
        storeId: number
        websiteId: number
        addresses: any
    }

    interface ICmsCustomer {
        id: number
    }
}
