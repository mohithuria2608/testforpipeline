declare namespace IKafkaGrpcRequest {
    interface ISyncToCMSUserData {
        aerospikeId: string,
        lastname: string
        firstname: string
        email: string
        storeId: number
        websiteId: number,
        password: string
    }

    interface ISyncToSDMUserData {
        
    }
}
