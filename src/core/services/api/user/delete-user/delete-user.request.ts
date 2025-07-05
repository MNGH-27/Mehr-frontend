import { axiosRequestHandler } from '@core/services/axios'

const deleteUserMutationFn = async (params: { UserId: string | number }) => {
    return await axiosRequestHandler({
        url: 'User/DeleteUser',
        method: 'delete',
        params
    })
}

export default deleteUserMutationFn
