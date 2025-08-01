import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TUserByNatIdType } from '@core/types/api/users.types'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetUserInfoByNatIdType = {
    NatId?: string | number
}

const useGetUserInfoByNatId = (
    params: TUseGetUserInfoByNatIdType
): UseQueryResult<TWithOutPaginateDataType<TUserByNatIdType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.UserInfoByNatId, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `User/GetUserInfoByNatId`,
                method: 'get',
                params
            }),
        enabled: !!params.NatId
    })

export default useGetUserInfoByNatId
