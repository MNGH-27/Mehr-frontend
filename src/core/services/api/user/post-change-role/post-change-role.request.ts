import { axiosRequestHandler } from '@core/services/axios'

const postChangeRoleMutationFn = async (data: { roleId: number; organId: number }) => {
    return await axiosRequestHandler({
        url: 'User/ChangeRole',
        method: 'post',
        data
    })
}

export default postChangeRoleMutationFn
