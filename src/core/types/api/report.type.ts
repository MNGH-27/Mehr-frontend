export type TReportItemType = {
    title: string
    description: string
    id: number
    reportChart: number
    type: number
    typeTitle: string
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

export type TReportTableItemType = {
    reportType: number
    reportTypeTitle: string
    reportDataTables: {
        reportItemId: number
        reportItemName: string
        organId: number | null
        organName: string | null
        regionId: number | null
        regionName: string | null
        stateId: number | null
        stateName: string | null
        answerValue: number
        answerStr: number | null
    }[]
}
