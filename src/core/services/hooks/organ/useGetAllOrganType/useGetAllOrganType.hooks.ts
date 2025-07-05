import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TIdNameType } from '@core/types/id-name/types'
import { type TPaginateDataType } from '@core/types/paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetAllOrganTypeType = {
    Name?: string | number | null
    pageNumber: number
    pageSize: number
}

const useGetAllOrganType = (params: TUseGetAllOrganTypeType): UseQueryResult<TPaginateDataType<TIdNameType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.GetAllOrganType, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Organ/GetAllOrganType`,
                method: 'get',
                params
            })
    })

export default useGetAllOrganType
