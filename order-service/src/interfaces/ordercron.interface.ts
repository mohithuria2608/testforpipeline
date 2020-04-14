declare namespace IOrderCronRequest {
    interface IInitiateOrderCronRequest {
        sdmOrderRef: number,
        mongoOrderRef: string,
        mongoStatus: string
        sdmOrderStatus: number,
        prevTimeInterval: number,
    }
}
