import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TShakhesReportItemType } from '@core/types/api/report.type'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetShakhesReportType = {
    StateId?: string | number | null
    RegionId?: string | number | null
}

const useGetShakhesReport = (
    params: TUseGetShakhesReportType
): UseQueryResult<TWithOutPaginateDataType<TShakhesReportItemType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.ShakhesReport, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Report/GetShakhesReport`,
                method: 'get',
                params
            })
    })

export default useGetShakhesReport
