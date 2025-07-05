import { axiosRequestHandler } from '@core/services/axios'

const postCreateOrganMutationFn = async (data: {
    organName: string
    fullAddress: string
    phoneNumber: string
    code: number
    regionId: number
    stateId: number
    organLevel: number
    organTypeId: number
}) => {
    return await axiosRequestHandler({
        url: 'Organ/CreateOrgan',
        method: 'post',
        data
    })
}

export default postCreateOrganMutationFn
