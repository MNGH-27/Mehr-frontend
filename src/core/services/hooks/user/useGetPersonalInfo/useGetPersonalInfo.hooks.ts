import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TUserDetailType } from '@core/types/api/users.types'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetPersonalInfoType = {}

const useGetPersonalInfo = (
    params: TUseGetPersonalInfoType
): UseQueryResult<TWithOutPaginateDataType<TUserDetailType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.PersonalInfo, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `User/GetPersonalInfo`,
                method: 'get',
                params
            })
    })

export default useGetPersonalInfo
