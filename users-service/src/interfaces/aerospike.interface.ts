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
        key: any,
        bins?: string[]
    }

    interface Scan {
        set: string,
        bins?: string[],
        nobins?: boolean,
        concurrent?: boolean,
    }
    interface Query {
        bins?: string[],
        equal?: Equal,
        range?: Range,
        geoWithinRadius?: GeoWIthinRadius,
        geoWithin?: GeoWithinPoint,
        udf?: Udf,
        set: string,
        background?: boolean,
    }

    interface Equal {
        bin: string,
        value: string | number
    }

    interface Range {
        bin: string,
        start: string,
        end: string
    }

    interface GeoWIthinRadius {
        bin: string,
        lng: string,
        lat: string,
        radius: string,
    }

    interface GeoWithinPoint {
        bin: string,
        lat: number,
        lng: number,
    }

    interface Udf {
        forEach: boolean,
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
}
