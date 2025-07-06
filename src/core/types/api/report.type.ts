export type TReportByRegionItemType = {
    reportItemId: number
    title: string
    description: string
    answer: {
        answerValue: number | null
        answerStr: string | null
    } | null
    reportItemType: number
    reportTypeTitle: string
}

export type TReportOfProvinceItemType = {
    stateId: number
    stateName: string
    reportItemId: number
    reportItemName: string
    sum: number
}
