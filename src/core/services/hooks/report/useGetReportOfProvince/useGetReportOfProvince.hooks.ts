import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TReportOfProvinceItemType } from '@core/types/api/report.type'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetReportOfProvinceType = {
    StateId?: string | number | null
    RegionId?: string | number | null
    ReportItemId?: string | number | null
}

const useGetReportOfProvince = (
    params: TUseGetReportOfProvinceType
): UseQueryResult<TWithOutPaginateDataType<TReportOfProvinceItemType[]>> =>
    useQuery({
        queryKey: [QueryKeysEnum.ReportOfProvince, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Report/GetReportOfProvince`,
                method: 'get',
                params
            })
    })

export default useGetReportOfProvince
