import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TReportTableItemType } from '@core/types/api/report.type'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetReportTableType = {
    StateId?: string | number | null
    RegionId?: string | number | null
    ReportType?: string | number | null
}

const useGetReportTable = (
    params: TUseGetReportTableType
): UseQueryResult<TWithOutPaginateDataType<TReportTableItemType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.ReportTable, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Report/GetReportTable`,
                method: 'get',
                params
            }),
        enabled: !!params.ReportType
    })

export default useGetReportTable
