declare namespace IOrderstatusRequest {

    interface IAppendTodayOrderStatus {
        bin: string,
        value: any
    }

    interface IRemoveTodayOrderStatus {
        bin: string,
        value: number
    }

}
