declare namespace IKafkaGrpcRequest {
    interface IKafkaReq {
        request: IKafkaBody
    }
    interface IKafkaBody {
        set: string,
        as?: IChangeAerospike
        cms?: IChangeCMS
        sdm?: IChangeSDM
        mdb?: IChangeMongo
        count?: number,
        q?: string
    }
    interface IChangeAerospike {
        create?: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        sync?: boolean,
        argv: string
    }
    interface IChangeCMS {
        create?: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        sync?: boolean,
        argv: string
    }
    interface IChangeSDM {
        create?: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        sync?: boolean,
        argv: string
    }

    interface IChangeMongo {
        create: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        sync?: boolean,
        argv: string
    }
}
