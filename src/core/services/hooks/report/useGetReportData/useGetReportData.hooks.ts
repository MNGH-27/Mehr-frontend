import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TReportDataItemType } from '@core/types/api/report.type'
import { type TPaginateDataType } from '@core/types/paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetReportDataType = {
    pageNumber: number
    pageSize: number
    ReportItemId?: string | number | null
}

const useGetReportData = (params: TUseGetReportDataType): UseQueryResult<TPaginateDataType<TReportDataItemType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.ReportData, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Report/GetReportData`,
                method: 'get',
                params
            })
    })

export default useGetReportData
