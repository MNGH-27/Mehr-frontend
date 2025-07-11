import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TReportItemType } from '@core/types/api/report.type'
import { type TPaginateDataType } from '@core/types/paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetReportItemsType = {
    StateId?: string | number | null
    RegionId?: string | number | null
    ReportItemId?: string | number | null
    pageNumber: number
    pageSize: number
}

const useGetReportItems = (params: TUseGetReportItemsType): UseQueryResult<TPaginateDataType<TReportItemType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.ReportItemsByRegionId, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Report/GetReportItems`,
                method: 'get',
                params
            })
    })

export default useGetReportItems
