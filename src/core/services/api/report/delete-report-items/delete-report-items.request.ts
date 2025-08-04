import { axiosRequestHandler } from '@core/services/axios'

const deleteReportItemsMutationFn = async (params: { Id: string | number }) => {
    return await axiosRequestHandler({
        url: 'Report/RemoveReportItems',
        method: 'delete',
        params
    })
}

export default deleteReportItemsMutationFn
