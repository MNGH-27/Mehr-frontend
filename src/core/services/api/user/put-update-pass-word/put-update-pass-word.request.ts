import { axiosRequestHandler } from '@core/services/axios'

const putUpdatePassWordMutationFn = async (data: { Pass: string }) => {
    return await axiosRequestHandler({
        url: 'User/UpdatePassWord',
        method: 'put',
        data
    })
}

export default putUpdatePassWordMutationFn
