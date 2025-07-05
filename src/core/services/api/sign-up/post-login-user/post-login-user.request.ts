import { axiosRequestHandler } from '@core/services/axios'

const postLoginUserMutationFn = async (data: {
    userName: string
    password: string
    isRememberMe: boolean
    captchaValue: string
    captchaKey: string
}) => {
    return await axiosRequestHandler({
        url: 'SignUp/LoginUser',
        method: 'post',
        data
    })
}

export default postLoginUserMutationFn
