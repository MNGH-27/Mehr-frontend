import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TCriticalAny } from '@core/types/type-any'
import { type TWithOutPaginateDataType } from '@core/types/with-out-paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetCaptchaType = {}

const useGetCaptcha = (params: TUseGetCaptchaType): UseQueryResult<TWithOutPaginateDataType<TCriticalAny>> =>
    useQuery({
        queryKey: [QueryKeysEnum.Captcha, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `BasicInfo/GetCaptcha`,
                method: 'get',
                params
            })
    })

export default useGetCaptcha
