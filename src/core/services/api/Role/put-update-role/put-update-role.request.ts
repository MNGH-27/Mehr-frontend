import { axiosRequestHandler } from '@core/services/axios'

const putUpdateRoleMutationFn = async (data: { roleId: number; roleName: string }) => {
    return await axiosRequestHandler({
        url: 'Role/UpdateRole',
        method: 'put',
        data
    })
}

export default putUpdateRoleMutationFn
