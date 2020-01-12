declare namespace ICommonRequest {

    interface IHeaders {
        language: string,
        brand: string,
        country: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
        deviceid: string
    }

    interface AuthorizationObj {
        deviceid: string,
        devicetype: string,
        tokenType: string,
        id?: string,
    }

    interface IPagination {
        page?: number,
        // skip?: number
    }

    interface ICordinatesOpt {
        lat?: number,
        lng?: number
    }

    interface IError {
        statusCode: number,
        httpCode: number,
        type: string,
        message: string
    }

    interface IKafkaReq {
        request: IKafkaBody
    }
    interface IKafkaBody {
        set: string,
        as: IChangeAerospike
        cms: IChangeCMS
        sdm: IChangeSDM
        count?: number,
    }

    interface IChangeAerospike {
        create?: boolean,
        update?: boolean,
        argv: string
    }

    interface IChangeCMS {
        create?: boolean,
        update?: boolean,
        argv: string
    }

    interface IChangeSDM {
        create?: boolean,
        update?: boolean,
        argv: string
    }
}