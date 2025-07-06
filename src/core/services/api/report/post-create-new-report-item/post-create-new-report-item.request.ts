import { axiosRequestHandler } from '@core/services/axios'

const postCreateNewReportItemMutationFn = async (data: {
    title: string
    description: string
    reportItemType: number
    items: {
        id: number
        name: string
    }[]
}) => {
    return await axiosRequestHandler({
        url: 'Report/CreateNewReportItem',
        method: 'post',
        data
    })
}

export default postCreateNewReportItemMutationFn
