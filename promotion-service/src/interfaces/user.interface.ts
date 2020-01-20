declare namespace IUserRequest {

    interface IUserData {
        id: string,
        sdmUserRef: number,
        cmsUserRef: number,
        // isGuest: number,
        name: string,
        cCode: string,
        phnNo: string,
        phnVerified: number,
        email: string,
        profileStep: number,
        socialKey: string,
        medium: string,
        createdAt: number,
        cartId: string,
        password: string,
        changePhnNo: number,
        switchPhnNo: number,
    }

    interface IFetchUser {
        userId: string,
    }
}