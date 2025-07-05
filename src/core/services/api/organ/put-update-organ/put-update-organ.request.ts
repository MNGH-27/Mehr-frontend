import { axiosRequestHandler } from '@core/services/axios'

const putUpdateOrganMutationFn = async (data: {
    organId: number
    organName: string
    fullAddress: string
    phoneNumber: string
    code: number
}) => {
    return await axiosRequestHandler({
        url: 'Organ/UpdateOrgan',
        method: 'put',
        data
    })
}

export default putUpdateOrganMutationFn
