declare namespace IAerospike {

    interface CreateIndex {
        set: string,
        bin: string,
        index: string,
        type: string
    }

    interface Remove {
        key: string,
        set: string,
    }
    interface Put {
        bins?: object,
        set: string,
        key?: string,
        ttl?: number,
        create?: boolean,
        replace?: boolean,
        update?: boolean
    }

    interface Append {
        key?: string,
        bins?: object,
        set: string,
        ttl?: number,
    }
    interface Get {
        set: string,
        key: string,
        bins?: string
    }
    interface Query {
        bins?: string,
        equal?: Equal,
        range?: Range,
        geoWithinRadius?: Geo,
        udf?: Udf,
        set: string,
        background?: boolean,
    }

    interface Equal {
        bin: string,
        value: string
    }

    interface Range {
        bin: string,
        start: string,
        end: string
    }

    interface Geo {
        bin: string,
        lng: string,
        lat: string,
        radius: string,
    }


    interface Udf {
        module: any,
        func: any,
        args: any,
    }

    interface Put {
        bins?: object,
        set: string,
        key?: string,
        ttl?: number,
        create?: boolean,
        replace?: boolean,
        update?: boolean
    }

    interface ListOperation {
        key?: string,
        bins?: object,
        bin?: string,
        set: string,
        ttl?: number,
    }

    interface MapOperation {
        set: string,
        key: string,
    }

    interface GeoWithin {
        set: string,
        key: string,
        // point: any
        lat: number,
        lng: number,
    }
}
