import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TIdNameType } from '@core/types/id-name/types'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetAllStateType = {}

const useGetAllState = (params: TUseGetAllStateType): UseQueryResult<TWithOutPaginateDataType<TIdNameType[]>> =>
    useQuery({
        queryKey: [QueryKeysEnum.AllState, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `BasicInfo/GetAllState`,
                method: 'get',
                params
            })
    })

export default useGetAllState
