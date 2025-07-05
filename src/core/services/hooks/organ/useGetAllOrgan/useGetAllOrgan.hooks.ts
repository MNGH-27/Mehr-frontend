import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { axiosRequestHandler } from '@core/services/axios'
import { type TOrganListItemType } from '@core/types/api/organ.types'
import { type TPaginateDataType } from '@core/types/paginate-data'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TUseGetAllOrganType = {
    Name?: string | number | null
    pageNumber: number
    pageSize: number
}

const useGetAllOrgan = (params: TUseGetAllOrganType): UseQueryResult<TPaginateDataType<TOrganListItemType>> =>
    useQuery({
        queryKey: [QueryKeysEnum.AllOrgan, { ...params }],
        queryFn: async () =>
            await axiosRequestHandler({
                url: `Organ/GetAllOrgan`,
                method: 'get',
                params
            })
    })

export default useGetAllOrgan
