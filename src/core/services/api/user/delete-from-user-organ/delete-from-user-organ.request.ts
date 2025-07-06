import { axiosRequestHandler } from '@core/services/axios'

const deleteFromUserOrganMutationFn = async (params: { roleId: number; organId: number; userId: number }) => {
    return await axiosRequestHandler({
        url: 'User/DeleteFromUserOrgan',
        method: 'delete',
        params
    })
}

export default deleteFromUserOrganMutationFn
