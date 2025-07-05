import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TIdNameType } from '@core/types/id-name/types'
import { type TPaginateDataType } from '@core/types/paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetAllRoleType = {
    pageNumber: number
    pageSize: number
}

const useGetAllRole = (params: TUseGetAllRoleType): UseQueryResult<TPaginateDataType<TIdNameType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.AllRole, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Role/GetAllRole`,
                method: 'get',
                params
            })
    })

export default useGetAllRole
