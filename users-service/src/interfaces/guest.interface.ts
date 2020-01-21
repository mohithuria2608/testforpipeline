declare namespace IGuestRequest {

    interface IGuestLogin {
    }

    interface IGuestCheckout {
        cCode: string,
        phnNo: string,
        email: string,
        name: string,
        isGuest: number
    }
}
