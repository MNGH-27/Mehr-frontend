import { axiosRequestHandler } from '@core/services/axios'

const postFillReportItemForRegionMutationFn = async (data: {
    reportItemId: number
    answerStr?: string
    answerValue?: number
}) => {
    return await axiosRequestHandler({
        url: 'Report/UpdateReport',
        method: 'post',
        data
    })
}

export default postFillReportItemForRegionMutationFn
