import { axiosRequestHandler } from '@core/services/axios'

const postCreateUserMutationFn = async (data: {
    firstName: string
    lastName: string
    natId: string
    phoneNumber: string
    password: string
    userName: string
    birthDate: string
}) => {
    return await axiosRequestHandler({
        url: 'SignUp/CreateUser',
        method: 'post',
        data
    })
}

export default postCreateUserMutationFn
