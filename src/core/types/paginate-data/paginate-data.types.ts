import { type TCriticalAny } from '../type-any'

type TPaginateDataType<TData> = {
    code: string
    data: {
        data: TData[]
        metaData: {
            pageNumber: number
            pageSize: number
            totalRow: number
            totalPage: number
        }
        err: { [key: string]: TCriticalAny }
    }
    status: number
}

export type { TPaginateDataType }
