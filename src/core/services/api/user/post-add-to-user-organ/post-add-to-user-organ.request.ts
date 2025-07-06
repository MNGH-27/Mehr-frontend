import { axiosRequestHandler } from '@core/services/axios'

const postAddToUserOrganMutationFn = async (data: { userNatId: string; roleId: number; organId: number }) => {
    return await axiosRequestHandler({
        url: 'User/AddToUserOrgan',
        method: 'post',
        data
    })
}

export default postAddToUserOrganMutationFn
