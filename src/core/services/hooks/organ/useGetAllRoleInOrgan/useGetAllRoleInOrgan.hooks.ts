import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TCriticalAny } from '@core/types/type-any'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetAllRoleInOrganType = {
    OrganId?: string | number | null
}

const useGetAllRoleInOrgan = (
    params: TUseGetAllRoleInOrganType
): UseQueryResult<TWithOutPaginateDataType<TCriticalAny>> =>
    useQuery({
        queryKey: [QueryKeysEnum.AllRoleInOrgan, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Organ/GetAllRoleInOrgan`,
                method: 'get',
                params
            }),
        enabled: !!params.OrganId
    })

export default useGetAllRoleInOrgan
