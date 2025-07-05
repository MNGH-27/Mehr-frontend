import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TIdNameType } from '@core/types/id-name/types'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetAllRegionsType = {
    StateId?: string | number
}

const useGetAllRegions = (params: TUseGetAllRegionsType): UseQueryResult<TWithOutPaginateDataType<TIdNameType[]>> =>
    useQuery({
        queryKey: [QueryKeysEnum.AllRegions, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `BasicInfo/GetAllRegions`,
                method: 'get',
                params
            }),
        enabled: !!params.StateId
    })

export default useGetAllRegions
