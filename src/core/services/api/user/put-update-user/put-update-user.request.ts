import { axiosRequestHandler } from '@core/services/axios'

const putUpdateUserMutationFn = async (data: {
    userId?: number
    password?: string
    natId?: string
    fistName?: string
    lastName?: string
    phoneNumber?: string
    birthDate?: string
}) => {
    return await axiosRequestHandler({
        url: 'User/UpdateUser',
        method: 'put',
        data
    })
}

export default putUpdateUserMutationFn
