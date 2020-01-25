declare namespace IAccountRequest {

    interface IAccount {
        id?: string,
        cCode?: string,
        phnNo?: string,
        sdmUserRef?: number,
        cmsUserRef?: number,
        phnVerified?: number,
        changePhnNo?: number,
        otp?: number,
        otpExpAt?: number,
        otpVerified?: number,
    }
}