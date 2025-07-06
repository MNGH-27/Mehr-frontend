import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TReportByRegionItemType } from '@core/types/api/report.type'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetReportItemsByRegionIdType = {
    StateId?: string | number | null
    RegionId?: string | number | null
    ReportItemId?: string | number | null
}

const useGetReportItemsByRegionId = (
    params: TUseGetReportItemsByRegionIdType
): UseQueryResult<TWithOutPaginateDataType<TReportByRegionItemType[]>> =>
    useQuery({
        queryKey: [QueryKeysEnum.ReportItemsByRegionId, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Report/GetReportItemsByRegionId`,
                method: 'get',
                params
            })
    })

export default useGetReportItemsByRegionId
