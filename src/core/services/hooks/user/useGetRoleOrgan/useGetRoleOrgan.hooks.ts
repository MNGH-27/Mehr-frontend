import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TUserRoleListItem } from '@core/types/api/user-role.types'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetRoleOrganType = {
    UserId?: string | number | null
}

const useGetRoleOrgan = (params: TUseGetRoleOrganType): UseQueryResult<TWithOutPaginateDataType<TUserRoleListItem[]>> =>
    useQuery({
        queryKey: [QueryKeysEnum.RoleOrgan, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `User/GetRoleOrgan`,
                method: 'get',
                params
            }),
        enabled: !!params.UserId
    })

export default useGetRoleOrgan
