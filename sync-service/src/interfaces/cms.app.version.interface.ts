declare namespace ICmsAppversionRequest {

    interface ICmsAppversion {
        type: string,
        data: ICmsAppversionData[],
    }

    interface ICmsAppversionData {
        id: string,
        type: string,
        deviceType: string,
        appversion: string,
        isActive: string,
        createdAt: string,
        updatedAt: string,
    }
}
