import { axiosRequestHandler } from '@core/services/axios'

const postCreateRoleMutationFn = async (data: { roleName: string; description: string; organTypes: number[] }) => {
    return await axiosRequestHandler({
        url: 'Role/CreateRole',
        method: 'post',
        data
    })
}

export default postCreateRoleMutationFn
