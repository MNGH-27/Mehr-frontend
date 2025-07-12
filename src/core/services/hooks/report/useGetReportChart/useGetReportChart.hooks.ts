import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TReportChartItemType } from '@core/types/api/report.type'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetReportChartType = {
    StateId?: string | number | null
    RegionId?: string | number | null
    ReportItemId?: string | number | null
    ReportLevel?: string | number | null
}

const useGetReportChart = (
    params: TUseGetReportChartType
): UseQueryResult<TWithOutPaginateDataType<TReportChartItemType[]>> =>
    useQuery({
        queryKey: [QueryKeysEnum.ReportChart, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Report/GetReportChart`,
                method: 'get',
                params
            })
    })

export default useGetReportChart
