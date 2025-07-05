import { axiosRequestHandler } from '@core/services/axios'

const deleteOrganTypeMutationFn = async (params: { OrganTypeId: string | number }) => {
    return await axiosRequestHandler({
        url: 'Organ/DeleteOrganType',
        method: 'delete',
        params
    })
}

export default deleteOrganTypeMutationFn
