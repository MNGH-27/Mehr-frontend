export type TReportItemType = {
    reportItemId: number
    title: string
    description: string
    answer: {
        answerValue: number | null
        answerStr: string | null
    } | null
    reportItemType: number
    reportTypeTitle: string
    reportChart: number
    reportChartTitle: string
}

export type TReportOfProvinceItemType = {
    stateId: number
    stateName: string
    reportItemId: number
    reportItemName: string
    sum: number
}

export type TReportDataItemType = {
    userId: number
    id: number
    userFullName: string
    reportItemId: number
    reportItemTitle: string
    answerValue: number
    answerStr: null | string
    stateId: number
    stateName: string
    regionId: number
    regionName: string
    organId: number
    organName: string
}

export type TReportChartItemType = {
    reportItemId: number
    stateId: number | null
    stateName: string | null
    regionId: number | null
    regionName: string | null
    title: string
    sumTotal: number
    date: string
    dateNum: number | null
}