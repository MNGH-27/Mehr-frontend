import { axiosRequestHandler } from '@core/services/axios'

const deleteOrganMutationFn = async (params: { OrganId: string | number }) => {
    return await axiosRequestHandler({
        url: 'Organ/DeleteOrgan',
        method: 'delete',
        params
    })
}

export default deleteOrganMutationFn
