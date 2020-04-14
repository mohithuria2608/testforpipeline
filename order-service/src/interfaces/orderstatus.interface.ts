declare namespace IOrderstatusRequest {

    interface IAppendTodayOrderStatus {
        bin: string,
        value: number
    }

    interface IRemoveTodayOrderStatus {
        bin: string,
        value: number
    }

}
