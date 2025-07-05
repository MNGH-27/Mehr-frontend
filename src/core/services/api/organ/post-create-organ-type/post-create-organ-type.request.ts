import { axiosRequestHandler } from '@core/services/axios'

const postCreateOrganTypeMutationFn = async (data: { Name: string }) => {
    return await axiosRequestHandler({
        url: 'Organ/CreateOrganType',
        method: 'post',
        data
    })
}

export default postCreateOrganTypeMutationFn
