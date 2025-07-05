import { axiosRequestHandler } from '@core/services/axios'

const deleteRoleMutationFn = async (params: { RoleId: string | number }) => {
    return await axiosRequestHandler({
        url: 'Role/DeleteRole',
        method: 'delete',
        params
    })
}

export default deleteRoleMutationFn
