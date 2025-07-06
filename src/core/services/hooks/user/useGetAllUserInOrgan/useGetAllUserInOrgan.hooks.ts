import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TUserInOrganItemType } from '@core/types/api/users.types'
import { type TPaginateDataType } from '@core/types/paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetAllUserInOrganType = {
    OrganId?: string | number | null
    pageNumber: number
    pageSize: number
}

const useGetAllUserInOrgan = (
    params: TUseGetAllUserInOrganType
): UseQueryResult<TPaginateDataType<TUserInOrganItemType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.AllUserInOrgan, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `User/GetAllUserInOrgan`,
                method: 'get',
                params
            })
    })

export default useGetAllUserInOrgan
