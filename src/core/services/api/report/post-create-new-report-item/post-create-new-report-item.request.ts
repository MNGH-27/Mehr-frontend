import { axiosRequestHandler } from '@core/services/axios'

const postCreateNewReportItemMutationFn = async (data: {
    title: string
    description: string
    reportType: number
    items: {
        id: number
        name: string
    }[]
    reportChart: number
    reportGradeType: number
}) => {
    return await axiosRequestHandler({
        url: 'Report/CreateNewReportItem',
        method: 'post',
        data
    })
}

export default postCreateNewReportItemMutationFn
