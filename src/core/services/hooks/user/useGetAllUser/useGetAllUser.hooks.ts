import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TUserListItemType } from '@core/types/api/users.types'
import { type TPaginateDataType } from '@core/types/paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetAllUserType = {
    NatId?: string | number | null
    pageNumber: number
    pageSize: number
}

const useGetAllUser = (params: TUseGetAllUserType): UseQueryResult<TPaginateDataType<TUserListItemType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.AllUser, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `User/GetAllUser`,
                method: 'get',
                params
            })
    })

export default useGetAllUser
