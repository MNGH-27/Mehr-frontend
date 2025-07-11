import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TIdNameType } from '@core/types/id-name/types'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetAllReportItemType = {}

const useGetAllReportItem = (
    params: TUseGetAllReportItemType
): UseQueryResult<TWithOutPaginateDataType<TIdNameType[]>> =>
    useQuery({
        queryKey: [QueryKeysEnum.AllReportItem, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Report/GetAllReportItem`,
                method: 'get',
                params
            })
    })

export default useGetAllReportItem
